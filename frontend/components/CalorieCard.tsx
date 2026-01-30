import React, { useEffect, useCallback, memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import Svg, { Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { SPRING_CONFIGS, triggerHaptic } from '../utils/animations';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CalorieCardProps {
  current: number;
  goal: number;
  protein: number;
  carbs: number;
  fat: number;
  index?: number;
}

function CalorieCard({ current, goal, protein, carbs, fat, index = 0 }: CalorieCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  
  // Animation values
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);
  const progressAnim = useSharedValue(0);
  const calorieCount = useSharedValue(0);
  const macroScale = useSharedValue(0);
  
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  const remaining = Math.max(goal - current, 0);

  // Circle dimensions
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  // Entrance animation
  useEffect(() => {
    const delay = index * 100;
    
    // Card entrance
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, SPRING_CONFIGS.gentle));
    
    // Progress ring animation
    progressAnim.value = withDelay(delay + 200, withTiming(percentage, { duration: 1200 }));
    
    // Counter animation
    calorieCount.value = withDelay(delay + 300, withTiming(current, { duration: 1500 }));
    
    // Macro badges pop
    macroScale.value = withDelay(delay + 600, withSpring(1, SPRING_CONFIGS.bouncy));
  }, [current, goal, percentage, index]);

  // Press handlers
  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, SPRING_CONFIGS.snappy);
    runOnJS(triggerHaptic)('light');
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, SPRING_CONFIGS.bouncy);
  }, []);

  const handlePress = useCallback(() => {
    router.push('/details/meals');
  }, [router]);

  // Animated styles
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const progressAnimatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (progressAnim.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  const calorieTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(calorieCount.value, [0, current * 0.5, current], [0, 0.7, 1]),
  }));

  const macroAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: macroScale.value }],
    opacity: macroScale.value,
  }));

  // Get progress color based on percentage
  const getProgressColor = () => {
    if (percentage >= 100) return Colors.error;
    if (percentage >= 80) return Colors.warning;
    return Colors.primary;
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[styles.container, cardAnimatedStyle]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{t('dailyCalories')}</Text>
        {percentage >= 100 && (
          <Animated.View style={[styles.goalReachedBadge, { transform: [{ scale: macroScale.value }] }]}>
            <Text style={styles.goalReachedText}>✓</Text>
          </Animated.View>
        )}
      </View>

      {/* Circular Progress */}
      <View style={styles.progressContainer}>
        <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
          {/* Background Circle */}
          <Circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke="#E8E8E8"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Progress Circle */}
          <AnimatedCircle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke={getProgressColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            animatedProps={progressAnimatedProps}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
          />
        </Svg>
        
        {/* Center Text */}
        <View style={styles.progressText}>
          <Animated.Text style={[styles.currentCalories, calorieTextStyle]}>
            {current}
          </Animated.Text>
          <Text style={styles.goalCalories}>/ {goal}</Text>
        </View>
      </View>

      {/* Macro Nutrients */}
      <Animated.View style={[styles.macros, macroAnimatedStyle]}>
        <View style={[styles.macroItem, styles.proteinItem]}>
          <Text style={styles.macroValue}>{protein}g</Text>
          <Text style={[styles.macroLabel, { color: '#FF6B6B' }]}>P</Text>
        </View>
        <View style={[styles.macroItem, styles.carbsItem]}>
          <Text style={styles.macroValue}>{carbs}g</Text>
          <Text style={[styles.macroLabel, { color: '#4ECDC4' }]}>C</Text>
        </View>
        <View style={[styles.macroItem, styles.fatItem]}>
          <Text style={styles.macroValue}>{fat}g</Text>
          <Text style={[styles.macroLabel, { color: '#FFE66D' }]}>F</Text>
        </View>
      </Animated.View>

      {/* Remaining calories hint */}
      {remaining > 0 && (
        <Animated.Text style={[styles.remainingText, { opacity: macroScale.value }]}>
          {remaining} {t('kcal')} {t('remaining') || 'kalan'}
        </Animated.Text>
      )}
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
    minHeight: 230,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.darkText,
    letterSpacing: -0.3,
  },
  goalReachedBadge: {
    backgroundColor: Colors.success + '20',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalReachedText: {
    color: Colors.success,
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  progressText: {
    position: 'absolute',
    alignItems: 'center',
  },
  currentCalories: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.darkText,
    letterSpacing: -0.5,
  },
  goalCalories: {
    fontSize: 11,
    color: Colors.lightText,
    fontWeight: '500',
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  macroItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  proteinItem: {
    backgroundColor: '#FF6B6B15',
  },
  carbsItem: {
    backgroundColor: '#4ECDC415',
  },
  fatItem: {
    backgroundColor: '#FFE66D15',
  },
  macroValue: {
    fontSize: 14,
    color: Colors.darkText,
    fontWeight: '700',
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  remainingText: {
    fontSize: 11,
    color: Colors.lightText,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default memo(CalorieCard);
