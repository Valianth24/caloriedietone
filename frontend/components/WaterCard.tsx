import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import i18n from '../utils/i18n';

const { width: screenWidth } = Dimensions.get('window');

interface WaterEntry {
  date: string;
  total_amount: number;
}

interface WaterCardProps {
  current: number;
  goal: number;
  weeklyData?: WaterEntry[];
}

export default function WaterCard({ current, goal, weeklyData = [] }: WaterCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

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

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/details/water-detail')}
      activeOpacity={0.9}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t('waterTracking')}</Text>
        <Ionicons name="water" size={24} color={Colors.teal} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
      </View>

      {/* Ana Bilgi */}
      <View style={styles.mainInfo}>
        <Text style={styles.amount}>
          {(current / 1000).toFixed(1)} / {(goal / 1000).toFixed(1)} L
        </Text>
        <Text style={styles.glassText}>
          {glassCount} {t('glass')}
        </Text>
      </View>

      {/* Haftalık Mini Grafik - Premium Feature */}
      {chartData.length > 0 && (
        <View style={styles.chartSection}>
          <Text style={styles.chartLabel}>{t('thisWeek') || 'Bu Hafta'}</Text>
          <View style={styles.miniChart}>
            {chartData.map((day, index) => {
              const height = maxAmount > 0 ? (day.total_amount / maxAmount) * 40 : 0;
              const isToday = index === chartData.length - 1;
              return (
                <View key={day.date || index} style={styles.chartBarContainer}>
                  <View style={styles.chartBarBg}>
                    <View 
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
          </View>
        </View>
      )}

      <View style={styles.detailButton}>
        <Ionicons name="add-circle" size={18} color={Colors.teal} />
        <Text style={styles.detailButtonText}>{t('addWater') || 'Su Ekle'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.teal,
    borderRadius: 5,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.teal,
    minWidth: 36,
    textAlign: 'right',
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  glassText: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 2,
  },
  // Haftalık Mini Grafik
  chartSection: {
    marginBottom: 12,
  },
  chartLabel: {
    fontSize: 11,
    color: Colors.lightText,
    marginBottom: 6,
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
    width: 12,
    height: 40,
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartBar: {
    width: '100%',
    backgroundColor: Colors.teal,
    borderRadius: 6,
    opacity: 0.7,
  },
  chartBarToday: {
    backgroundColor: Colors.teal,
    opacity: 1,
  },
  chartDayLabel: {
    fontSize: 9,
    color: Colors.lightText,
    marginTop: 4,
  },
  chartDayLabelToday: {
    color: Colors.teal,
    fontWeight: '600',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.teal + '15',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
    width: '100%',
  },
  detailButtonText: {
    color: Colors.teal,
    fontSize: 14,
    fontWeight: '600',
  },
});
