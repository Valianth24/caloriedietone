import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import i18n from '../utils/i18n';

interface WaterCardProps {
  current: number;
  goal: number;
}

export default function WaterCard({ current, goal }: WaterCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  // TR: 200ml, EN: 250ml per glass
  const glassSize = i18n.language === 'tr' ? 200 : 250;
  const glassCount = Math.floor(current / glassSize);
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/details/water-detail')}
      activeOpacity={0.9}
    >
      <Text style={styles.title}>{t('waterTracking')}</Text>

      {/* Progress Bar - İçtikçe doluyor */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
      </View>

      {/* Su damlası ikonu */}
      <View style={styles.waterIconContainer}>
        <Ionicons name="water" size={40} color={Colors.teal} />
      </View>

      <Text style={styles.amount} numberOfLines={1}>
        {(current / 1000).toFixed(1)} / {(goal / 1000).toFixed(1)} L
      </Text>
      <Text style={styles.glassText}>
        {glassCount} {t('glass')}
      </Text>

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
    alignItems: 'center',
    minHeight: 220,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkText,
    alignSelf: 'flex-start',
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
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
    backgroundColor: Colors.teal,
    borderRadius: 6,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.teal,
    minWidth: 36,
    textAlign: 'right',
  },
  waterIconContainer: {
    marginVertical: 8,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  glassText: {
    fontSize: 12,
    color: Colors.lightText,
    marginBottom: 8,
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
