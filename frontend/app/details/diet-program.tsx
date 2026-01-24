import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DietProgramScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [program, setProgram] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const backendUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL || '';

  useEffect(() => {
    loadProgram();
  }, [params.dietId, params.programId]);

  const loadProgram = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('session_token');

      // If we have a programId, load the active program
      if (params.programId) {
        const response = await fetch(`${backendUrl}/api/diet/active`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.program) {
          setProgram(data.program);
        }
      } 
      // If we have a dietId, load the diet plan
      else if (params.dietId) {
        const response = await fetch(`${backendUrl}/api/diet/my-diets`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const diet = data.diets?.find((d: any) => d.diet_id === params.dietId);
        if (diet) {
          setProgram(diet);
        }
      }
    } catch (error) {
      console.error('Error loading program:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDiet = async () => {
    if (!program?.diet_id) return;

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('session_token');

      const response = await fetch(`${backendUrl}/api/diet/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ diet_id: program.diet_id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to start diet');
      }

      setProgram(data.program);
      Alert.alert(
        '🎉 ' + t('success'),
        t('dietStarted'),
        [{ text: t('ok') }]
      );
    } catch (error: any) {
      Alert.alert(t('error'), error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDayPress = async (dayNumber: number) => {
    const day = program?.days?.[dayNumber - 1];
    if (!day) return;

    // Check if day is accessible
    if (!day.unlocked && dayNumber > 1) {
      Alert.alert(
        t('locked') || 'Kilitli',
        t('completePreviousDay') || 'Önceki günü tamamlamanız gerekiyor.'
      );
      return;
    }

    setSelectedDay(dayNumber);
  };

  const handleCompleteDay = async () => {
    if (!selectedDay || !program?.program_id) return;

    try {
      const token = await AsyncStorage.getItem('session_token');

      const response = await fetch(
        `${backendUrl}/api/diet/program/${program.program_id}/day/${selectedDay}/complete`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to complete day');
      }

      // Reload program
      await loadProgram();
      setSelectedDay(null);

      Alert.alert(
        '✅ ' + (t('completed') || 'Tamamlandı'),
        `${selectedDay}. gün tamamlandı!${data.next_day ? ` ${data.next_day}. gün açıldı.` : ''}`
      );
    } catch (error: any) {
      Alert.alert(t('error') || 'Hata', error.message);
    }
  };

  const renderDayDetails = () => {
    if (!selectedDay || !program?.days) return null;

    const day = program.days[selectedDay - 1];
    if (!day) return null;

    const meals = [
      { key: 'breakfast', name: 'Kahvaltı', icon: '🌅' },
      { key: 'morning_snack', name: 'Kuşluk', icon: '🍎' },
      { key: 'lunch', name: 'Öğle', icon: '🍽️' },
      { key: 'afternoon_snack', name: 'İkindi', icon: '🥜' },
      { key: 'dinner', name: 'Akşam', icon: '🌙' },
      { key: 'evening_snack', name: 'Gece', icon: '🥛' },
    ];

    return (
      <View style={styles.dayDetailModal}>
        <View style={styles.dayDetailHeader}>
          <Text style={styles.dayDetailTitle}>
            {selectedDay}. Gün - {day.day_name || `Gün ${selectedDay}`}
          </Text>
          <TouchableOpacity onPress={() => setSelectedDay(null)}>
            <Ionicons name="close-circle" size={28} color={Colors.lightText} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.dayDetailContent} showsVerticalScrollIndicator={false}>
          <View style={styles.dayCalorieCard}>
            <Ionicons name="flame" size={24} color={Colors.primary} />
            <Text style={styles.dayCalorieText}>
              {day.total_calories || program.target_calories} kcal
            </Text>
          </View>

          {meals.map((meal) => {
            const mealData = day[meal.key];
            if (!mealData) return null;

            return (
              <View key={meal.key} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <Text style={styles.mealIcon}>{meal.icon}</Text>
                  <View style={styles.mealHeaderText}>
                    <Text style={styles.mealType}>{meal.name}</Text>
                    <Text style={styles.mealName}>{mealData.name}</Text>
                  </View>
                  <Text style={styles.mealCalories}>{mealData.calories} kcal</Text>
                </View>

                {mealData.description && (
                  <Text style={styles.mealDescription}>{mealData.description}</Text>
                )}

                {mealData.ingredients && mealData.ingredients.length > 0 && (
                  <View style={styles.ingredientsList}>
                    <Text style={styles.ingredientsTitle}>Malzemeler:</Text>
                    {mealData.ingredients.map((ing: string, idx: number) => (
                      <View key={idx} style={styles.ingredientItem}>
                        <Ionicons name="checkmark" size={14} color={Colors.success} />
                        <Text style={styles.ingredientText}>{ing}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.macrosRow}>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>P</Text>
                    <Text style={styles.macroValue}>{mealData.protein || 0}g</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>K</Text>
                    <Text style={styles.macroValue}>{mealData.carbs || 0}g</Text>
                  </View>
                  <View style={styles.macroItem}>
                    <Text style={styles.macroLabel}>Y</Text>
                    <Text style={styles.macroValue}>{mealData.fat || 0}g</Text>
                  </View>
                </View>
              </View>
            );
          })}

          {/* Complete Day Button */}
          {program.program_id && !day.completed && day.unlocked && (
            <TouchableOpacity style={styles.completeDayButton} onPress={handleCompleteDay}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
              <Text style={styles.completeDayText}>{t('completeDay')}</Text>
            </TouchableOpacity>
          )}

          {day.completed && (
            <View style={styles.completedBadge}>
              <Ionicons name="trophy" size={24} color={Colors.warning} />
              <Text style={styles.completedText}>{t('dayCompleted')}</Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  };

  const renderCalendar = () => {
    if (!program?.days || program.days.length === 0) return null;

    const totalDays = program.total_days || program.days.length;
    const rows = Math.ceil(totalDays / 7);

    return (
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>30 Günlük Program</Text>
        
        {/* Day labels */}
        <View style={styles.dayLabelsRow}>
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((label, i) => (
            <Text key={i} style={styles.dayLabel}>{label}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.calendarRow}>
            {[...Array(7)].map((_, colIndex) => {
              const dayNumber = rowIndex * 7 + colIndex + 1;
              if (dayNumber > totalDays) {
                return <View key={colIndex} style={styles.emptyDay} />;
              }

              const day = program.days[dayNumber - 1];
              const isCompleted = day?.completed;
              const isUnlocked = day?.unlocked || dayNumber === 1;
              const isToday = dayNumber === program.current_day;

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.calendarDay,
                    isCompleted && styles.calendarDayCompleted,
                    isToday && styles.calendarDayToday,
                    !isUnlocked && styles.calendarDayLocked,
                  ]}
                  onPress={() => handleDayPress(dayNumber)}
                  disabled={!isUnlocked && !isCompleted}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={20} color={Colors.white} />
                  ) : !isUnlocked ? (
                    <Ionicons name="lock-closed" size={16} color={Colors.lightText} />
                  ) : (
                    <Text style={[
                      styles.calendarDayText,
                      isToday && styles.calendarDayTextToday
                    ]}>
                      {dayNumber}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.success }]} />
            <Text style={styles.legendText}>Tamamlandı</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
            <Text style={styles.legendText}>{t('today')}</Text>
          </View>
          <View style={styles.legendItem}>
            <Ionicons name="lock-closed" size={12} color={Colors.lightText} />
            <Text style={styles.legendText}>Kilitli</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!program) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.title}>Diyet Programı</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant-outline" size={64} color={Colors.lightText} />
          <Text style={styles.emptyText}>Program bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{program.name}</Text>
      </View>

      {selectedDay ? (
        renderDayDetails()
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Diet Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.dietDescription}>{program.description}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="flame" size={24} color={Colors.primary} />
                <Text style={styles.statValue}>{program.target_calories}</Text>
                <Text style={styles.statLabel}>kcal/gün</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="calendar" size={24} color={Colors.primary} />
                <Text style={styles.statValue}>{program.duration_days || 7}</Text>
                <Text style={styles.statLabel}>gün</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={24} color={Colors.warning} />
                <Text style={styles.statValue}>{program.goal || 'Dengeli'}</Text>
                <Text style={styles.statLabel}>hedef</Text>
              </View>
            </View>
          </View>

          {/* Start Diet Button (if not started) */}
          {!program.program_id && (
            <TouchableOpacity style={styles.startButton} onPress={handleStartDiet}>
              <Ionicons name="rocket" size={24} color={Colors.white} />
              <Text style={styles.startButtonText}>30 Günlük Programa Başla</Text>
            </TouchableOpacity>
          )}

          {/* Calendar (if started) */}
          {program.program_id && renderCalendar()}

          {/* 7-Day Preview (if not started) */}
          {!program.program_id && program.days && (
            <View style={styles.previewSection}>
              <Text style={styles.sectionTitle}>7 Günlük Önizleme</Text>
              {program.days.slice(0, 7).map((day: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={styles.previewDayCard}
                  onPress={() => setSelectedDay(index + 1)}
                >
                  <View style={styles.previewDayNumber}>
                    <Text style={styles.previewDayNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.previewDayContent}>
                    <Text style={styles.previewDayName}>{day.day_name || `${index + 1}. Gün`}</Text>
                    <Text style={styles.previewDayCalories}>
                      {day.total_calories || program.target_calories} kcal
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.lightText} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Tips */}
          {program.tips && program.tips.length > 0 && (
            <View style={styles.tipsSection}>
              <Text style={styles.sectionTitle}>💡 İpuçları</Text>
              {program.tips.map((tip: string, index: number) => (
                <View key={index} style={styles.tipItem}>
                  <Ionicons name="bulb" size={18} color={Colors.warning} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.lightText,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.lightText,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  dietDescription: {
    fontSize: 15,
    color: Colors.darkText,
    lineHeight: 22,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.lightText,
  },
  startButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 16,
    textAlign: 'center',
  },
  dayLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayLabel: {
    width: (SCREEN_WIDTH - 64) / 7,
    textAlign: 'center',
    fontSize: 12,
    color: Colors.lightText,
    fontWeight: '600',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calendarDay: {
    width: (SCREEN_WIDTH - 80) / 7,
    height: (SCREEN_WIDTH - 80) / 7,
    borderRadius: 8,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayCompleted: {
    backgroundColor: Colors.success,
  },
  calendarDayToday: {
    backgroundColor: Colors.primary,
  },
  calendarDayLocked: {
    backgroundColor: Colors.background,
    opacity: 0.5,
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
  },
  calendarDayTextToday: {
    color: Colors.white,
  },
  emptyDay: {
    width: (SCREEN_WIDTH - 80) / 7,
    height: (SCREEN_WIDTH - 80) / 7,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: Colors.lightText,
  },
  previewSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 12,
  },
  previewDayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  previewDayNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  previewDayNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  previewDayContent: {
    flex: 1,
  },
  previewDayName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  previewDayCalories: {
    fontSize: 14,
    color: Colors.lightText,
  },
  tipsSection: {
    backgroundColor: Colors.warning + '15',
    borderRadius: 16,
    padding: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.darkText,
    lineHeight: 20,
  },
  // Day Details Modal
  dayDetailModal: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  dayDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dayDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  dayDetailContent: {
    flex: 1,
    padding: 16,
  },
  dayCalorieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 8,
  },
  dayCalorieText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  mealCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  mealHeaderText: {
    flex: 1,
  },
  mealType: {
    fontSize: 12,
    color: Colors.lightText,
    fontWeight: '600',
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  mealCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  mealDescription: {
    fontSize: 14,
    color: Colors.darkText,
    lineHeight: 20,
    marginBottom: 12,
  },
  ingredientsList: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  ingredientsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.lightText,
    marginBottom: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  ingredientText: {
    fontSize: 14,
    color: Colors.darkText,
  },
  macrosRow: {
    flexDirection: 'row',
    gap: 16,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.lightText,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
  },
  completeDayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    borderRadius: 16,
    padding: 18,
    marginTop: 16,
    gap: 10,
  },
  completeDayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.warning + '20',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    gap: 10,
  },
  completedText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.warning,
  },
});
