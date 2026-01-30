import React, { useEffect, useCallback, memo } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import i18n from '../utils/i18n';
import { SPRING_CONFIGS, triggerHaptic } from '../utils/animations';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const { width: screenWidth } = Dimensions.get('window');

interface WaterEntry {
  date: string;
  total_amount: number;
}

interface WaterCardProps {
  current: number;
  goal: number;
  weeklyData?: WaterEntry[];
  index?: number;
}

function WaterCard({ current, goal, weeklyData = [], index = 0 }: WaterCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  // Animation values
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);
  const progressWidth = useSharedValue(0);
  const waterWave = useSharedValue(0);
  const iconBounce = useSharedValue(1);
  const chartBarsScale = useSharedValue(0);

  // TR: 200ml, EN: 250ml per glass
  const glassSize = i18n.language === 'tr' ? 200 : 250;
  const glassCount = Math.floor(current / glassSize);
  const progress = Math.min((current / goal) * 100, 100);

  // Haftalık grafik için son 7 günü al
  const chartData = weeklyData.slice(-7);
  const maxAmount = Math.max(...chartData.map(d => d.total_amount || 0), goal);

  // Günleri kısa göster
  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = i18n.language === 'tr' 
      ? ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']
      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return days[date.getDay()];
  };

  // Entrance animation
  useEffect(() => {
    const delay = index * 100;
    
    // Card entrance
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, SPRING_CONFIGS.gentle));
    
    // Progress bar animation
    progressWidth.value = withDelay(delay + 200, withTiming(progress, { duration: 1000 }));
    
    // Icon bounce
    iconBounce.value = withDelay(delay + 300, withSequence(
      withSpring(1.2, SPRING_CONFIGS.bouncy),
      withSpring(1, SPRING_CONFIGS.bouncy)
    ));
    
    // Water wave effect
    waterWave.value = withDelay(delay + 400, withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    ));
    
    // Chart bars animation
    chartBarsScale.value = withDelay(delay + 500, withSpring(1, SPRING_CONFIGS.bouncy));
  }, [current, goal, progress, index]);

  // Press handlers
  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, SPRING_CONFIGS.snappy);
    runOnJS(triggerHaptic)('light');
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, SPRING_CONFIGS.bouncy);
  }, []);

  const handlePress = useCallback(() => {
    router.push('/details/water-detail');
  }, [router]);

  // Animated styles
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconBounce.value },
      { 
        rotate: `${interpolate(
          waterWave.value,
          [0, 0.5, 1],
          [-5, 5, -5]
        )}deg` 
      },
    ],
  }));

  const chartBarContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: chartBarsScale.value }],
    opacity: chartBarsScale.value,
  }));

  // Get progress color based on percentage
  const getProgressColor = () => {
    if (progress >= 100) return Colors.success;
    if (progress >= 70) return Colors.teal;
    return Colors.teal;
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[styles.container, cardAnimatedStyle]}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t('waterTracking')}</Text>
        <Animated.View style={iconStyle}>
          <Ionicons name="water" size={24} color={Colors.teal} />
        </Animated.View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarFill, progressBarStyle, { backgroundColor: getProgressColor() }]}>
            {/* Wave effect inside progress */}
            <Animated.View style={[styles.waveEffect, {
              opacity: waterWave.value,
            }]} />
          </Animated.View>
        </View>
        <View style={styles.progressBadge}>
          <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
        </View>
      </View>

      {/* Ana Bilgi */}
      <View style={styles.mainInfo}>
        <Text style={styles.amount}>
          {(current / 1000).toFixed(1)} / {(goal / 1000).toFixed(1)} L
        </Text>
        <View style={styles.glassContainer}>
          <Ionicons name="cafe-outline" size={14} color={Colors.lightText} />
          <Text style={styles.glassText}>
            {glassCount} {t('glass')}
          </Text>
        </View>
      </View>

      {/* Haftalık Mini Grafik */}
      {chartData.length > 0 && (
        <View style={styles.chartSection}>
          <Text style={styles.chartLabel}>{t('thisWeek') || 'Bu Hafta'}</Text>
          <Animated.View style={[styles.miniChart, chartBarContainerStyle]}>
            {chartData.map((day, idx) => {
              const height = maxAmount > 0 ? (day.total_amount / maxAmount) * 40 : 0;
              const isToday = idx === chartData.length - 1;
              return (
                <View key={day.date || idx} style={styles.chartBarContainer}>
                  <View style={styles.chartBarBg}>
                    <Animated.View 
                      style={[
                        styles.chartBar, 
                        { height: Math.max(4, height) },
                        isToday && styles.chartBarToday
                      ]} 
                    />
                  </View>
                  <Text style={[styles.chartDayLabel, isToday && styles.chartDayLabelToday]}>
                    {getDayLabel(day.date)}
                  </Text>
                </View>
              );
            })}
          </Animated.View>
        </View>
      )}

      {/* Add Water Button */}
      <Animated.View style={[styles.detailButton, { transform: [{ scale: chartBarsScale.value }] }]}>
        <Ionicons name="add-circle" size={18} color={Colors.teal} />
        <Text style={styles.detailButtonText}>{t('addWater') || 'Su Ekle'}</Text>
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 280,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.darkText,
    letterSpacing: -0.3,
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  waveEffect: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
  },
  progressBadge: {
    backgroundColor: Colors.teal + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.teal,
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  amount: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.darkText,
    letterSpacing: -0.5,
  },
  glassContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  glassText: {
    fontSize: 12,
    color: Colors.lightText,
    fontWeight: '500',
  },
  // Haftalık Mini Grafik
  chartSection: {
    marginBottom: 12,
  },
  chartLabel: {
    fontSize: 11,
    color: Colors.lightText,
    marginBottom: 8,
    fontWeight: '600',
  },
  miniChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 60,
    paddingHorizontal: 4,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarBg: {
    width: 14,
    height: 40,
    backgroundColor: '#E8F5E9',
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartBar: {
    width: '100%',
    backgroundColor: Colors.teal,
    borderRadius: 7,
    opacity: 0.6,
  },
  chartBarToday: {
    backgroundColor: Colors.teal,
    opacity: 1,
  },
  chartDayLabel: {
    fontSize: 9,
    color: Colors.lightText,
    marginTop: 4,
    fontWeight: '500',
  },
  chartDayLabelToday: {
    color: Colors.teal,
    fontWeight: '700',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.teal + '12',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 8,
  },
  detailButtonText: {
    color: Colors.teal,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default memo(WaterCard);
