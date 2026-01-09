import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTodayMeals, getDailySummary, addMeal, deleteMeal } from '../../utils/api';
import { Colors } from '../../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useStore } from '../../store/useStore';
import i18n from '../../utils/i18n';
import { FOOD_COUNT } from '../../content/foodDatabase';

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
  const params = useLocalSearchParams();
  const { user, refreshData, triggerRefresh } = useStore();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [summary, setSummary] = useState({ total_calories: 0, total_protein: 0, total_carbs: 0, total_fat: 0 });
  const [loading, setLoading] = useState(true);
  
  // Add Food Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState(params.meal_type as string || 'lunch');
  
  // Manual Entry State
  const [manualFood, setManualFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });
  
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  useEffect(() => {
    loadData();
  }, [refreshData]);

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
    // Alt bardaki meals listesine meal_type parametresi ile yönlendir
    router.push({
      pathname: '/(tabs)/meals',
      params: { meal_type: selectedMealType }
    });
  };
  
  const handleAddFromCamera = () => {
    setShowAddModal(false);
    router.push('/(tabs)/camera');
  };
  
  const handleManualEntry = () => {
    setShowAddModal(false);
    setShowManualEntry(true);
  };
  
  const handleManualAdd = async () => {
    if (!manualFood.name || !manualFood.calories) {
      alert(lang === 'en' ? 'Please enter food name and calories' : 'Lütfen yemek adı ve kalori girin');
      return;
    }

    try {
      await addMeal({
        name: manualFood.name,
        calories: parseInt(manualFood.calories) || 0,
        protein: parseFloat(manualFood.protein) || 0,
        carbs: parseFloat(manualFood.carbs) || 0,
        fat: parseFloat(manualFood.fat) || 0,
        image_base64: '',
        meal_type: selectedMealType,
      });

      alert(lang === 'en' ? 'Meal added!' : 'Yemek eklendi!');
      setShowManualEntry(false);
      setManualFood({ name: '', calories: '', protein: '', carbs: '', fat: '' });
      triggerRefresh();
      loadData();
    } catch (error: any) {
      alert(error.message || (lang === 'en' ? 'Could not add meal' : 'Yemek eklenemedi'));
    }
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
                <View style={styles.sectionRight}>
                  <Text style={styles.sectionCalories}>{typeCalories} {t('kcal')}</Text>
                  <TouchableOpacity
                    style={styles.addMealBtn}
                    onPress={() => {
                      setSelectedMealType(key);
                      setShowAddModal(true);
                    }}
                  >
                    <Ionicons name="add" size={20} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>

              {typeMeals.length === 0 ? (
                <TouchableOpacity 
                  style={styles.emptyMeal}
                  onPress={() => {
                    setSelectedMealType(key);
                    setShowAddModal(true);
                  }}
                >
                  <Ionicons name="add-circle-outline" size={28} color={Colors.lightText} />
                  <Text style={styles.emptyText}>{t('noMealsYet')}</Text>
                </TouchableOpacity>
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

        <View style={{ height: 40 }} />
      </ScrollView>
      
      {/* Add Meal Options Modal */}
      <Modal visible={showAddModal} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowAddModal(false)}
        >
          <View style={styles.addOptionsContainer}>
            {/* Show selected meal type */}
            <View style={styles.selectedMealHeader}>
              <Ionicons 
                name={getMealTypeIcon(selectedMealType) === '🌅' ? 'sunny' : 
                      getMealTypeIcon(selectedMealType) === '☀️' ? 'restaurant' :
                      getMealTypeIcon(selectedMealType) === '🌙' ? 'moon' : 'cafe'} 
                size={24} 
                color={Colors.primary} 
              />
              <Text style={styles.selectedMealTitle}>
                {selectedMealType === 'breakfast' ? (lang === 'en' ? 'Breakfast' : 'Kahvaltı') :
                 selectedMealType === 'lunch' ? (lang === 'en' ? 'Lunch' : 'Öğle Yemeği') :
                 selectedMealType === 'dinner' ? (lang === 'en' ? 'Dinner' : 'Akşam Yemeği') :
                 (lang === 'en' ? 'Snack' : 'Ara Öğün')}
              </Text>
            </View>
            <Text style={styles.addOptionsSubtitle}>{t('howToAddMeal') || 'Nasıl eklemek istersiniz?'}</Text>
            
            {/* Add Options */}
            <TouchableOpacity style={styles.addOptionButton} onPress={handleAddFromList}>
              <View style={styles.addOptionIconContainer}>
                <Ionicons name="list" size={28} color={Colors.primary} />
              </View>
              <View style={styles.addOptionTextContainer}>
                <Text style={styles.addOptionTitle}>{t('selectFromList') || 'Listeden Seç'}</Text>
                <Text style={styles.addOptionDesc}>{FOOD_COUNT.toLocaleString()}+ {lang === 'en' ? 'food options' : 'yemek seçeneği'}</Text>
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
            
            <TouchableOpacity style={styles.addOptionButton} onPress={handleManualEntry}>
              <View style={[styles.addOptionIconContainer, { backgroundColor: '#f59e0b20' }]}>
                <Ionicons name="create" size={28} color="#f59e0b" />
              </View>
              <View style={styles.addOptionTextContainer}>
                <Text style={styles.addOptionTitle}>{lang === 'en' ? 'Manual Entry' : 'Manuel Giriş'}</Text>
                <Text style={styles.addOptionDesc}>{lang === 'en' ? 'Enter calorie values manually' : 'Kalori değerlerini manuel girin'}</Text>
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
      
      {/* Manual Entry Modal */}
      <Modal visible={showManualEntry} animationType="slide">
        <SafeAreaView style={styles.foodListModal} edges={['top']}>
          <View style={styles.foodListHeader}>
            <TouchableOpacity onPress={() => setShowManualEntry(false)} style={styles.backButton}>
              <Ionicons name="close" size={28} color={Colors.darkText} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{lang === 'en' ? 'Manual Entry' : 'Manuel Giriş'}</Text>
            <View style={{ width: 40 }} />
          </View>
          
          <ScrollView style={styles.manualForm} showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                {lang === 'en' ? 'Food Name' : 'Yemek Adı'} *
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder={lang === 'en' ? 'e.g. Homemade pasta' : 'örn. Ev yapımı makarna'}
                value={manualFood.name}
                onChangeText={(text) => setManualFood({ ...manualFood, name: text })}
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                {lang === 'en' ? 'Calories' : 'Kalori'} (kcal) *
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="0"
                value={manualFood.calories}
                onChangeText={(text) => setManualFood({ ...manualFood, calories: text })}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Protein (g)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0"
                  value={manualFood.protein}
                  onChangeText={(text) => setManualFood({ ...manualFood, protein: text })}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                <Text style={styles.inputLabel}>{lang === 'en' ? 'Carbs' : 'Karb'} (g)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0"
                  value={manualFood.carbs}
                  onChangeText={(text) => setManualFood({ ...manualFood, carbs: text })}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                <Text style={styles.inputLabel}>{lang === 'en' ? 'Fat' : 'Yağ'} (g)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0"
                  value={manualFood.fat}
                  onChangeText={(text) => setManualFood({ ...manualFood, fat: text })}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.manualAddButton}
              onPress={handleManualAdd}
            >
              <Text style={styles.manualAddButtonText}>{t('add')}</Text>
            </TouchableOpacity>
          </ScrollView>
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
  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  addMealBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealTypeIcon: {
    fontSize: 24,
  },
  emptyMeal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 24,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'dashed',
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
  selectedMealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 4,
  },
  selectedMealTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  addOptionsSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 20,
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
  // Manual Entry Styles
  manualForm: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.darkText,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  manualAddButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  manualAddButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});
