import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getDietById, Diet, DietDay, DietMeal } from '../../content/diets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WatchAdModal from '../../components/WatchAdModal';
import { isDietDayUnlocked, showAdsForDietDay } from '../../utils/adSystem';

interface ActiveDietData {
  dietId: string;
  startDate: string;
  selectedDays: number[];
  currentDay: number;
}

export default function ActiveDietScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [activeDiet, setActiveDiet] = useState<ActiveDietData | null>(null);
  const [diet, setDiet] = useState<Diet | null>(null);
  const [currentDayData, setCurrentDayData] = useState<DietDay | null>(null);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  
  // Reklam state'leri
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingDayChange, setPendingDayChange] = useState<number | null>(null);
  const [unlockedDays, setUnlockedDays] = useState<number[]>([1]); // Gün 1 her zaman açık

  const lang = i18n.language === 'tr' ? 'tr' : 'en';

  useEffect(() => {
    loadActiveDiet();
  }, []);

  const loadActiveDiet = async () => {
    try {
      const data = await AsyncStorage.getItem('active_diet');
      if (data) {
        const parsed: ActiveDietData = JSON.parse(data);
        setActiveDiet(parsed);
        
        const foundDiet = getDietById(parsed.dietId);
        if (foundDiet) {
          setDiet(foundDiet);
          
          // Mevcut günün verisini bul
          const dayData = foundDiet.days.find(d => d.day === parsed.currentDay);
          setCurrentDayData(dayData || null);
        }
      }
    } catch (error) {
      console.error('Error loading active diet:', error);
    }
  };

  const handleNextDay = async () => {
    if (!activeDiet || !diet) return;
    
    const currentIndex = activeDiet.selectedDays.indexOf(activeDiet.currentDay);
    if (currentIndex < activeDiet.selectedDays.length - 1) {
      const nextDay = activeDiet.selectedDays[currentIndex + 1];
      const updated = { ...activeDiet, currentDay: nextDay };
      await AsyncStorage.setItem('active_diet', JSON.stringify(updated));
      setActiveDiet(updated);
      
      const dayData = diet.days.find(d => d.day === nextDay);
      setCurrentDayData(dayData || null);
    } else {
      Alert.alert(
        t('congratulations'),
        t('dietCompleted'),
        [{ text: t('ok') }]
      );
    }
  };

  const handlePrevDay = async () => {
    if (!activeDiet || !diet) return;
    
    const currentIndex = activeDiet.selectedDays.indexOf(activeDiet.currentDay);
    if (currentIndex > 0) {
      const prevDay = activeDiet.selectedDays[currentIndex - 1];
      const updated = { ...activeDiet, currentDay: prevDay };
      await AsyncStorage.setItem('active_diet', JSON.stringify(updated));
      setActiveDiet(updated);
      
      const dayData = diet.days.find(d => d.day === prevDay);
      setCurrentDayData(dayData || null);
    }
  };

  const handleEndDiet = () => {
    Alert.alert(
      t('endDiet'),
      t('endDietConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('end'),
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('active_diet');
            router.back();
          }
        },
      ]
    );
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return 'sunny';
      case 'lunch': return 'restaurant';
      case 'dinner': return 'moon';
      case 'snack': return 'cafe';
      default: return 'restaurant';
    }
  };

  const getMealColor = (type: string) => {
    switch (type) {
      case 'breakfast': return Colors.warning;
      case 'lunch': return Colors.primary;
      case 'dinner': return Colors.teal;
      case 'snack': return Colors.success;
      default: return Colors.primary;
    }
  };

  if (!activeDiet || !diet) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant-outline" size={64} color={Colors.lightText} />
          <Text style={styles.emptyTitle}>
            {t('noActiveDiet')}
          </Text>
          <Text style={styles.emptySubtitle}>
            {t('selectDietToStart')}
          </Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={() => router.push('/(tabs)/diets')}
          >
            <Text style={styles.emptyButtonText}>
              {t('goToDiets')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentIndex = activeDiet.selectedDays.indexOf(activeDiet.currentDay);
  const progress = ((currentIndex + 1) / activeDiet.selectedDays.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{diet.emoji} {diet.name[lang]}</Text>
        <TouchableOpacity onPress={handleEndDiet}>
          <Ionicons name="close-circle" size={28} color={Colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>
              {t('progress')}
            </Text>
            <Text style={styles.progressText}>
              {currentIndex + 1} / {activeDiet.selectedDays.length} {t('days')}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Day Navigation */}
        <View style={styles.dayNavigation}>
          <TouchableOpacity 
            style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
            onPress={handlePrevDay}
            disabled={currentIndex === 0}
          >
            <Ionicons name="chevron-back" size={24} color={currentIndex === 0 ? Colors.lightText : Colors.primary} />
          </TouchableOpacity>
          
          <View style={styles.dayInfo}>
            <Text style={styles.dayNumber}>
              {t('day')} {activeDiet.currentDay}
            </Text>
            {currentDayData && (
              <Text style={styles.dayTitle}>{currentDayData.title}</Text>
            )}
          </View>
          
          <TouchableOpacity 
            style={[styles.navButton, currentIndex === activeDiet.selectedDays.length - 1 && styles.navButtonDisabled]}
            onPress={handleNextDay}
            disabled={currentIndex === activeDiet.selectedDays.length - 1}
          >
            <Ionicons name="chevron-forward" size={24} color={currentIndex === activeDiet.selectedDays.length - 1 ? Colors.lightText : Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Day Note */}
        {currentDayData?.note && (
          <View style={styles.noteCard}>
            <Ionicons name="information-circle" size={20} color={Colors.primary} />
            <Text style={styles.noteText}>{currentDayData.note}</Text>
          </View>
        )}

        {/* Calories Summary */}
        {currentDayData && (
          <View style={styles.caloriesCard}>
            <Ionicons name="flame" size={28} color={Colors.error} />
            <Text style={styles.caloriesValue}>{currentDayData.totalCalories}</Text>
            <Text style={styles.caloriesLabel}>
              {t('dailyCalories')}
            </Text>
          </View>
        )}

        {/* Meals */}
        <Text style={styles.sectionTitle}>
          <Ionicons name="restaurant" size={20} color={Colors.primary} /> {t('meals')}
        </Text>

        {currentDayData?.meals.map((meal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.mealCard}
            onPress={() => setExpandedMeal(expandedMeal === meal.type ? null : meal.type)}
          >
            <View style={styles.mealHeader}>
              <View style={[styles.mealIcon, { backgroundColor: getMealColor(meal.type) + '20' }]}>
                <Ionicons name={getMealIcon(meal.type) as any} size={24} color={getMealColor(meal.type)} />
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealCalories}>{meal.totalCalories} kcal</Text>
              </View>
              <Ionicons 
                name={expandedMeal === meal.type ? "chevron-up" : "chevron-down"} 
                size={24} 
                color={Colors.lightText} 
              />
            </View>

            {expandedMeal === meal.type && meal.foods.length > 0 && (
              <View style={styles.foodsList}>
                {meal.foods.map((food, foodIndex) => (
                  <View key={foodIndex} style={styles.foodRow}>
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>{food.name}</Text>
                      <Text style={styles.foodPortion}>{food.portion}</Text>
                    </View>
                    <Text style={styles.foodCalories}>{food.calories} kcal</Text>
                  </View>
                ))}
              </View>
            )}

            {expandedMeal === meal.type && meal.foods.length === 0 && (
              <View style={styles.emptyFoods}>
                <Text style={styles.emptyFoodsText}>
                  {t('foodInfoNotAdded')}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Complete Day Button */}
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={handleNextDay}
        >
          <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
          <Text style={styles.completeButtonText}>
            {currentIndex === activeDiet.selectedDays.length - 1
              ? t('completeDiet')
              : t('completeDay')
            }
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  emptyButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  progressText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  dayNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  dayInfo: {
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  dayTitle: {
    fontSize: 14,
    color: Colors.lightText,
    marginTop: 4,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.primary + '15',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: Colors.darkText,
    lineHeight: 20,
  },
  caloriesCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  caloriesValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginTop: 8,
  },
  caloriesLabel: {
    fontSize: 14,
    color: Colors.lightText,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 12,
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
  },
  mealIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealInfo: {
    flex: 1,
    marginLeft: 12,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  mealCalories: {
    fontSize: 14,
    color: Colors.lightText,
    marginTop: 2,
  },
  foodsList: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    color: Colors.darkText,
  },
  foodPortion: {
    fontSize: 12,
    color: Colors.lightText,
  },
  foodCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  emptyFoods: {
    marginTop: 12,
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyFoodsText: {
    fontSize: 13,
    color: Colors.lightText,
    fontStyle: 'italic',
  },
  completeButton: {
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 16,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
