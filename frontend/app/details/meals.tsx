import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTodayMeals, getDailySummary, addMeal, deleteMeal } from '../../utils/api';
import { Colors } from '../../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useStore } from '../../store/useStore';
import i18n from '../../utils/i18n';
import { FOOD_DATABASE, searchFoods, FOOD_COUNT } from '../../content/foodDatabase';

interface Meal {
  meal_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: string;
  image_base64?: string;
  created_at: string;
}

export default function MealsDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, refreshData, triggerRefresh } = useStore();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [summary, setSummary] = useState({ total_calories: 0, total_protein: 0, total_carbs: 0, total_fat: 0 });
  const [loading, setLoading] = useState(true);
  
  // Add Food Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFoodListModal, setShowFoodListModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('lunch');
  const [searchQuery, setSearchQuery] = useState('');
  
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  useEffect(() => {
    loadData();
  }, [refreshData]);

  // Filter foods based on search query - using local database
  const filteredFoods = useMemo(() => {
    if (searchQuery.length >= 2) {
      return searchFoods(searchQuery, lang, 100);
    }
    // Show first 50 foods by default
    return FOOD_DATABASE.slice(0, 50).map(food => ({
      food_id: food.food_id,
      name: lang === 'en' ? food.name_en : food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    }));
  }, [searchQuery, lang]);

  const loadData = async () => {
    try {
      const [mealsData, summaryData] = await Promise.all([
        getTodayMeals(),
        getDailySummary()
      ]);
      setMeals(Array.isArray(mealsData) ? mealsData as any[] : []);
      if (summaryData && typeof summaryData === 'object') {
        setSummary(summaryData as any);
      }
    } catch (error) {
      console.error('Error loading meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const getMealsByType = (type: string) => meals.filter(m => m.meal_type === type);
  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return '🌅';
      case 'lunch': return '🌞';
      case 'dinner': return '🌙';
      case 'snack': return '☕';
      default: return '🍽️';
    }
  };

  const getMealTypeCalories = (type: string) => {
    return getMealsByType(type).reduce((sum, m) => sum + m.calories, 0);
  };

  const calorieGoal = user?.daily_calorie_goal || 2000;
  const percentage = Math.round((summary.total_calories / calorieGoal) * 100);

  const mealTypes = [
    { key: 'breakfast', label: t('breakfast') },
    { key: 'lunch', label: t('lunch') },
    { key: 'dinner', label: t('dinner') },
    { key: 'snack', label: t('snack') },
  ];
  
  const handleAddFromList = () => {
    setShowAddModal(false);
    setShowFoodListModal(true);
  };
  
  const handleAddFromCamera = () => {
    setShowAddModal(false);
    router.push('/(tabs)/camera');
  };
  
  const handleSelectFood = (food: any) => {
    setShowFoodListModal(false);
    router.push({
      pathname: '/details/meal-detail',
      params: {
        food_id: food.food_id,
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        meal_type: selectedMealType,
      },
    });
  };
  
  const handleDeleteMeal = async (mealId: string) => {
    try {
      await deleteMeal(mealId);
      triggerRefresh();
      loadData();
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('todaysMeals')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryTitle}>{t('totalCalories')}</Text>
              <Text style={styles.summaryValue}>
                {summary.total_calories} / {calorieGoal} {t('kcal')}
              </Text>
            </View>
            <View style={styles.percentageCircle}>
              <Text style={styles.percentageText}>{percentage}%</Text>
            </View>
          </View>

          <View style={styles.macrosRow}>
            <View style={styles.macroItem}>
              <View style={[styles.macroIndicator, { backgroundColor: '#FF6B6B' }]} />
              <Text style={styles.macroLabel}>{t('protein')}</Text>
              <Text style={styles.macroValue}>{summary.total_protein.toFixed(1)}g</Text>
            </View>
            <View style={styles.macroItem}>
              <View style={[styles.macroIndicator, { backgroundColor: '#4ECDC4' }]} />
              <Text style={styles.macroLabel}>{t('carbs')}</Text>
              <Text style={styles.macroValue}>{summary.total_carbs.toFixed(1)}g</Text>
            </View>
            <View style={styles.macroItem}>
              <View style={[styles.macroIndicator, { backgroundColor: '#FFE66D' }]} />
              <Text style={styles.macroLabel}>{t('fat')}</Text>
              <Text style={styles.macroValue}>{summary.total_fat.toFixed(1)}g</Text>
            </View>
          </View>
        </View>

        {/* Meal Sections */}
        {mealTypes.map(({ key, label }) => {
          const typeMeals = getMealsByType(key);
          const typeCalories = getMealTypeCalories(key);
          
          return (
            <View key={key} style={styles.mealSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionLeft}>
                  <Text style={styles.mealTypeIcon}>{getMealTypeIcon(key)}</Text>
                  <Text style={styles.sectionTitle}>{label}</Text>
                </View>
                <Text style={styles.sectionCalories}>{typeCalories} {t('kcal')}</Text>
              </View>

              {typeMeals.length === 0 ? (
                <View style={styles.emptyMeal}>
                  <Ionicons name="restaurant-outline" size={24} color={Colors.lightText} />
                  <Text style={styles.emptyText}>{t('noMealsYet')}</Text>
                </View>
              ) : (
                typeMeals.map(meal => (
                  <View key={meal.meal_id} style={styles.mealItem}>
                    {meal.image_base64 ? (
                      <Image source={{ uri: meal.image_base64 }} style={styles.mealImage} />
                    ) : (
                      <View style={[styles.mealImage, styles.mealImagePlaceholder]}>
                        <Ionicons name="fast-food" size={24} color={Colors.lightText} />
                      </View>
                    )}
                    <View style={styles.mealInfo}>
                      <Text style={styles.mealName} numberOfLines={1}>{meal.name}</Text>
                      <Text style={styles.mealMacros}>
                        P: {meal.protein.toFixed(1)}g • K: {meal.carbs.toFixed(1)}g • Y: {meal.fat.toFixed(1)}g
                      </Text>
                    </View>
                    <View style={styles.mealCalories}>
                      <Text style={styles.mealCaloriesValue}>{meal.calories}</Text>
                      <Text style={styles.mealCaloriesUnit}>{t('kcal')}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Floating Action Button - Add Meal */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color={Colors.white} />
      </TouchableOpacity>
      
      {/* Add Meal Options Modal */}
      <Modal visible={showAddModal} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowAddModal(false)}
        >
          <View style={styles.addOptionsContainer}>
            <Text style={styles.addOptionsTitle}>{t('addMeal') || 'Öğün Ekle'}</Text>
            <Text style={styles.addOptionsSubtitle}>{t('howToAddMeal') || 'Nasıl eklemek istersiniz?'}</Text>
            
            {/* Meal Type Selection */}
            <Text style={styles.mealTypeLabel}>{t('selectMealType') || 'Öğün Tipi Seçin'}</Text>
            <View style={styles.mealTypeRow}>
              {[
                { key: 'breakfast', icon: 'sunny', label: t('breakfast') || 'Kahvaltı' },
                { key: 'lunch', icon: 'restaurant', label: t('lunch') || 'Öğle' },
                { key: 'dinner', icon: 'moon', label: t('dinner') || 'Akşam' },
                { key: 'snack', icon: 'cafe', label: t('snack') || 'Atıştırma' },
              ].map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.mealTypeCard,
                    selectedMealType === type.key && styles.mealTypeCardActive,
                  ]}
                  onPress={() => setSelectedMealType(type.key)}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={24}
                    color={selectedMealType === type.key ? Colors.white : Colors.primary}
                  />
                  <Text
                    style={[
                      styles.mealTypeText,
                      selectedMealType === type.key && styles.mealTypeTextActive,
                    ]}
                    numberOfLines={1}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Add Options */}
            <TouchableOpacity style={styles.addOptionButton} onPress={handleAddFromList}>
              <View style={styles.addOptionIconContainer}>
                <Ionicons name="list" size={28} color={Colors.primary} />
              </View>
              <View style={styles.addOptionTextContainer}>
                <Text style={styles.addOptionTitle}>{t('selectFromList') || 'Listeden Seç'}</Text>
                <Text style={styles.addOptionDesc}>{t('selectFromListDesc') || '80+ hazır yemek seçeneği'}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Colors.lightText} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addOptionButton} onPress={handleAddFromCamera}>
              <View style={[styles.addOptionIconContainer, { backgroundColor: Colors.teal + '20' }]}>
                <Ionicons name="camera" size={28} color={Colors.teal} />
              </View>
              <View style={styles.addOptionTextContainer}>
                <Text style={styles.addOptionTitle}>{t('calculateWithPhoto') || 'Fotoğraf ile Hesapla'}</Text>
                <Text style={styles.addOptionDesc}>{t('calculateWithPhotoDesc') || 'AI ile otomatik kalori tahmini'}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Colors.lightText} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.cancelButtonText}>{t('cancel') || 'Vazgeç'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      
      {/* Food List Modal */}
      <Modal visible={showFoodListModal} animationType="slide">
        <SafeAreaView style={styles.foodListModal} edges={['top']}>
          <View style={styles.foodListHeader}>
            <TouchableOpacity onPress={() => setShowFoodListModal(false)} style={styles.backButton}>
              <Ionicons name="close" size={28} color={Colors.darkText} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t('selectFood') || 'Yiyecek Seç'}</Text>
            <View style={{ width: 40 }} />
          </View>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.lightText} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('searchFood') || 'Yiyecek ara...'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.lightText}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={Colors.lightText} />
              </TouchableOpacity>
            )}
          </View>
          
          <FlatList
            data={filteredFoods}
            keyExtractor={(item) => item.food_id}
            contentContainerStyle={styles.foodListContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.foodListItem}
                onPress={() => handleSelectFood(item)}
              >
                <View style={styles.foodListItemInfo}>
                  <Text style={styles.foodListItemName}>{item.name}</Text>
                  <Text style={styles.foodListItemMacros}>
                    {item.calories} kcal • P: {item.protein}g • K: {item.carbs}g • Y: {item.fat}g
                  </Text>
                </View>
                <Ionicons name="add-circle" size={28} color={Colors.primary} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyList}>
                <Ionicons name="search-outline" size={48} color={Colors.lightText} />
                <Text style={styles.emptyListText}>{t('noFoodFound') || 'Yiyecek bulunamadı'}</Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 14,
    color: Colors.lightText,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginTop: 4,
  },
  percentageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: Colors.lightText,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    marginTop: 2,
  },
  mealSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealTypeIcon: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  sectionCalories: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  emptyMeal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.lightText,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  mealImagePlaceholder: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 4,
  },
  mealMacros: {
    fontSize: 12,
    color: Colors.lightText,
  },
  mealCalories: {
    alignItems: 'flex-end',
  },
  mealCaloriesValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  mealCaloriesUnit: {
    fontSize: 10,
    color: Colors.lightText,
  },
  // FAB Styles
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 999,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  addOptionsContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  addOptionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkText,
    textAlign: 'center',
    marginBottom: 4,
  },
  addOptionsSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 20,
  },
  mealTypeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 12,
  },
  mealTypeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
  },
  mealTypeCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 70,
    justifyContent: 'center',
  },
  mealTypeCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  mealTypeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.darkText,
    marginTop: 4,
    textAlign: 'center',
  },
  mealTypeTextActive: {
    color: Colors.white,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  addOptionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addOptionTextContainer: {
    flex: 1,
  },
  addOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 4,
  },
  addOptionDesc: {
    fontSize: 12,
    color: Colors.lightText,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: Colors.lightText,
    fontWeight: '600',
  },
  // Food List Modal Styles
  foodListModal: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  foodListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: Colors.darkText,
  },
  foodListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  foodListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  foodListItemInfo: {
    flex: 1,
  },
  foodListItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 4,
  },
  foodListItemMacros: {
    fontSize: 12,
    color: Colors.lightText,
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyListText: {
    fontSize: 16,
    color: Colors.lightText,
    marginTop: 12,
  },
});
