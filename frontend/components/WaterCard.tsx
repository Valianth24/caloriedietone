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
  const totalGlasses = Math.ceil(goal / glassSize);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/details/water-detail')}
      activeOpacity={0.9}
    >
      <Text style={styles.title}>{t('waterTracking')}</Text>

      <View style={styles.glassContainer}>
        {/* Damla sayısı bardak sayısına eşit - sınırsız */}
        {[...Array(Math.min(glassCount, 10))].map((_, index) => (
          <Ionicons
            key={index}
            name="water"
            size={24}
            color={Colors.teal}
          />
        ))}
        {glassCount > 10 && (
          <Text style={styles.moreText}>+{glassCount - 10}</Text>
        )}
      </View>

      <Text style={styles.amount} numberOfLines={1}>
        {glassCount} / {totalGlasses} {t('glass')}
      </Text>
      <Text style={styles.amountMl}>
        {(current / 1000).toFixed(1)} / {(goal / 1000).toFixed(1)} L
      </Text>

      <View style={styles.detailButton}>
        <Ionicons name="add-circle" size={20} color={Colors.teal} />
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
  glassContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    marginVertical: 8,
    maxWidth: '100%',
  },
  moreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.teal,
    marginLeft: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  amountMl: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 2,
    marginBottom: 12,
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
