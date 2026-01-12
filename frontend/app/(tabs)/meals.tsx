import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { searchFoods, FOOD_DATABASE, FoodItem, FOOD_COUNT } from '../../content/foodDatabase';
import { addMeal } from '../../utils/api';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Kategoriler - Profesyonel ikonlar
const FOOD_CATEGORIES = [
  { id: 'all', name: 'Tümü', name_en: 'All', icon: 'grid-outline', color: '#667eea' },
  { id: 'favorites', name: 'Favoriler', name_en: 'Favorites', icon: 'heart', color: '#e11d48' },
  { id: 'popular', name: 'Popüler', name_en: 'Popular', icon: 'star-outline', color: '#f59e0b', keywords: ['tavuk', 'pilav', 'salata', 'yumurta', 'ekmek'] },
  { id: 'meat', name: 'Et', name_en: 'Meat', icon: 'restaurant-outline', color: '#dc2626', keywords: ['et', 'dana', 'kuzu', 'biftek', 'köfte', 'pirzola', 'kıyma'] },
  { id: 'chicken', name: 'Tavuk', name_en: 'Chicken', icon: 'restaurant-outline', color: '#ea580c', keywords: ['tavuk', 'piliç', 'chicken'] },
  { id: 'fish', name: 'Balık', name_en: 'Fish', icon: 'fish-outline', color: '#0891b2', keywords: ['balık', 'somon', 'ton', 'levrek', 'karides'] },
  { id: 'veggies', name: 'Sebze', name_en: 'Veggies', icon: 'leaf-outline', color: '#16a34a', keywords: ['salata', 'domates', 'havuç', 'brokoli', 'ıspanak', 'kabak'] },
  { id: 'fruits', name: 'Meyve', name_en: 'Fruits', icon: 'nutrition-outline', color: '#c026d3', keywords: ['elma', 'muz', 'portakal', 'çilek', 'karpuz'] },
  { id: 'dairy', name: 'Süt Ürünleri', name_en: 'Dairy', icon: 'water-outline', color: '#0284c7', keywords: ['süt', 'yoğurt', 'peynir', 'ayran'] },
  { id: 'grains', name: 'Tahıl', name_en: 'Grains', icon: 'layers-outline', color: '#b45309', keywords: ['ekmek', 'makarna', 'pirinç', 'pilav', 'bulgur'] },
  { id: 'soup', name: 'Çorba', name_en: 'Soup', icon: 'cafe-outline', color: '#ca8a04', keywords: ['çorba', 'mercimek'] },
  { id: 'fastfood', name: 'Fast Food', name_en: 'Fast Food', icon: 'fast-food-outline', color: '#e11d48', keywords: ['pizza', 'hamburger', 'döner', 'lahmacun'] },
  { id: 'dessert', name: 'Tatlı', name_en: 'Dessert', icon: 'ice-cream-outline', color: '#db2777', keywords: ['tatlı', 'baklava', 'dondurma', 'kek'] },
  { id: 'drinks', name: 'İçecek', name_en: 'Drinks', icon: 'wine-outline', color: '#7c3aed', keywords: ['kahve', 'çay', 'meyve suyu', 'su'] },
];

type RecentFood = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: number;
};

type ScreenMode = 'actionSheet' | 'foodList' | 'manualEntry';

export default function MealsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Meal type from params (from meal detail screen)
  const mealTypeParam = params.meal_type as string || null;
  
  // Screen Mode - her zaman action sheet ile başla
  const [screenMode, setScreenMode] = useState<ScreenMode>('actionSheet');
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Food List State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentFoods, setRecentFoods] = useState<RecentFood[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Quick Add Modal
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddItem, setQuickAddItem] = useState<FoodItem | null>(null);
  const [portion, setPortion] = useState(1);
  
  // Multi-select Cart State (Birden fazla yemek ekleme)
  const [cart, setCart] = useState<{food: FoodItem, portion: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  
  // Manual Entry State
  const [manualFood, setManualFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });
  
  const searchInputRef = useRef<TextInput>(null);
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  // Her sayfa odağa geldiğinde action sheet'i göster
  useFocusEffect(
    useCallback(() => {
      // Reset to action sheet when screen comes into focus
      setScreenMode('actionSheet');
      setSearchQuery('');
      setSelectedCategory('all');
      setCart([]); // Sepeti temizle
      
      // Animate action sheet
      slideAnim.setValue(0);
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
      
      return () => {
        // Cleanup when leaving
      };
    }, [])
  );

  useEffect(() => {
    loadRecentFoods();
    loadFavorites();
  }, []);

  const loadRecentFoods = async () => {
    try {
      const stored = await AsyncStorage.getItem('recent_foods_v2');
      if (stored) setRecentFoods(JSON.parse(stored));
    } catch (e) { console.error(e); }
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorite_foods_v2');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (e) { console.error(e); }
  };

  const toggleFavorite = async (foodId: string) => {
    const newFavorites = favorites.includes(foodId)
      ? favorites.filter(id => id !== foodId)
      : [...favorites, foodId];
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorite_foods_v2', JSON.stringify(newFavorites));
  };

  // Filtreleme - TÜM 6000+ yemek gösterilsin
  const filteredFoods = useMemo(() => {
    let results: FoodItem[] = [];
    
    if (searchQuery.length >= 2) {
      // Arama yapılıyorsa - 200'e kadar sonuç göster
      results = searchFoods(searchQuery, lang, 200);
    } else if (selectedCategory === 'favorites') {
      // Favoriler - favori yemekleri göster
      results = FOOD_DATABASE.filter(food => favorites.includes(food.food_id));
    } else if (selectedCategory === 'popular') {
      // Popüler - ilk 50
      results = FOOD_DATABASE.slice(0, 50);
    } else if (selectedCategory !== 'all') {
      // Kategori seçiliyse - o kategorideki tüm yemekler
      const category = FOOD_CATEGORIES.find(c => c.id === selectedCategory);
      if (category?.keywords) {
        results = FOOD_DATABASE.filter(food => {
          const name = lang === 'en' ? food.name_en.toLowerCase() : food.name.toLowerCase();
          return category.keywords!.some(kw => name.includes(kw.toLowerCase()));
        });
      }
    } else {
      // "Tümü" seçiliyse - TÜM 6000+ yemek göster
      results = FOOD_DATABASE;
    }
    
    return results;
  }, [searchQuery, selectedCategory, lang, favorites]);

  const handleCloseActionSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      router.back();
    });
  };

  const handleSelectFromList = () => {
    setScreenMode('foodList');
  };

  const handlePhotoCalc = () => {
    router.push('/(tabs)/camera');
  };

  const handleManualEntry = () => {
    setScreenMode('manualEntry');
  };

  const handleBackToActionSheet = () => {
    setScreenMode('actionSheet');
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const addMealToDay = async (food: FoodItem, portionMultiplier: number = 1) => {
    try {
      setLoading(true);
      
      await addMeal({
        name: lang === 'en' ? food.name_en : food.name,
        calories: Math.round(food.calories * portionMultiplier),
        protein: Math.round(food.protein * portionMultiplier * 10) / 10,
        carbs: Math.round(food.carbs * portionMultiplier * 10) / 10,
        fat: Math.round(food.fat * portionMultiplier * 10) / 10,
        image_base64: '',
        meal_type: mealTypeParam || 'snack', // Parametre varsa kullan, yoksa snack
      });

      const newRecent: RecentFood = {
        id: food.food_id,
        name: lang === 'en' ? food.name_en : food.name,
        calories: Math.round(food.calories * portionMultiplier),
        protein: Math.round(food.protein * portionMultiplier * 10) / 10,
        carbs: Math.round(food.carbs * portionMultiplier * 10) / 10,
        fat: Math.round(food.fat * portionMultiplier * 10) / 10,
        timestamp: Date.now(),
      };
      
      const updatedRecents = [newRecent, ...recentFoods.filter(r => r.id !== food.food_id)].slice(0, 20);
      setRecentFoods(updatedRecents);
      await AsyncStorage.setItem('recent_foods_v2', JSON.stringify(updatedRecents));

      setShowQuickAdd(false);
      setQuickAddItem(null);
      setPortion(1);
      
      Alert.alert(
        lang === 'en' ? 'Success' : 'Başarılı', 
        `${lang === 'en' ? food.name_en : food.name} ${lang === 'en' ? 'added' : 'eklendi'}`
      );
      
      // Eğer meal detail'den geldiyse oraya geri dön
      if (mealTypeParam) {
        router.push({
          pathname: '/details/meals',
          params: { meal_type: mealTypeParam }
        });
      } else {
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert(lang === 'en' ? 'Error' : 'Hata', error.message || (lang === 'en' ? 'Could not add meal' : 'Yemek eklenemedi'));
    } finally {
      setLoading(false);
    }
  };

  const handleManualAdd = async () => {
    if (!manualFood.name || !manualFood.calories) {
      Alert.alert(
        lang === 'en' ? 'Error' : 'Hata',
        lang === 'en' ? 'Please enter food name and calories' : 'Lütfen yemek adı ve kalori girin'
      );
      return;
    }

    try {
      setLoading(true);
      
      await addMeal({
        name: manualFood.name,
        calories: parseInt(manualFood.calories) || 0,
        protein: parseFloat(manualFood.protein) || 0,
        carbs: parseFloat(manualFood.carbs) || 0,
        fat: parseFloat(manualFood.fat) || 0,
        image_base64: '',
        meal_type: mealTypeParam || 'snack',
      });

      Alert.alert(
        lang === 'en' ? 'Success' : 'Başarılı',
        lang === 'en' ? 'Meal added' : 'Yemek eklendi'
      );
      
      // Eğer meal detail'den geldiyse oraya geri dön
      if (mealTypeParam) {
        router.push({
          pathname: '/details/meals',
          params: { meal_type: mealTypeParam }
        });
      } else {
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert(lang === 'en' ? 'Error' : 'Hata', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sepete ekle (Birden fazla yemek)
  const addToCart = (food: FoodItem, portionMultiplier: number = 1) => {
    const existingIndex = cart.findIndex(item => item.food.food_id === food.food_id);
    if (existingIndex >= 0) {
      // Var olan öğenin porsiyonunu güncelle
      const newCart = [...cart];
      newCart[existingIndex].portion = portionMultiplier;
      setCart(newCart);
    } else {
      // Yeni öğe ekle
      setCart([...cart, { food, portion: portionMultiplier }]);
    }
    setShowQuickAdd(false);
    setQuickAddItem(null);
    setPortion(1);
  };

  // Sepetten kaldır
  const removeFromCart = (foodId: string) => {
    setCart(cart.filter(item => item.food.food_id !== foodId));
  };

  // Sepetteki tüm yemekleri ekle
  const addAllFromCart = async () => {
    if (cart.length === 0) return;
    
    try {
      setLoading(true);
      
      for (const item of cart) {
        await addMeal({
          name: lang === 'en' ? item.food.name_en : item.food.name,
          calories: Math.round(item.food.calories * item.portion),
          protein: Math.round(item.food.protein * item.portion * 10) / 10,
          carbs: Math.round(item.food.carbs * item.portion * 10) / 10,
          fat: Math.round(item.food.fat * item.portion * 10) / 10,
          image_base64: '',
          meal_type: mealTypeParam || 'snack',
        });

        // Son eklenenler listesine ekle
        const newRecent: RecentFood = {
          id: item.food.food_id,
          name: lang === 'en' ? item.food.name_en : item.food.name,
          calories: Math.round(item.food.calories * item.portion),
          protein: Math.round(item.food.protein * item.portion * 10) / 10,
          carbs: Math.round(item.food.carbs * item.portion * 10) / 10,
          fat: Math.round(item.food.fat * item.portion * 10) / 10,
          timestamp: Date.now(),
        };
        
        const updatedRecents = [newRecent, ...recentFoods.filter(r => r.id !== item.food.food_id)].slice(0, 20);
        setRecentFoods(updatedRecents);
        await AsyncStorage.setItem('recent_foods_v2', JSON.stringify(updatedRecents));
      }

      setCart([]);
      setShowCart(false);
      
      Alert.alert(
        lang === 'en' ? 'Success' : 'Başarılı', 
        `${cart.length} ${lang === 'en' ? 'items added' : 'yemek eklendi'}`
      );
      
      if (mealTypeParam) {
        router.push({
          pathname: '/details/meals',
          params: { meal_type: mealTypeParam }
        });
      } else {
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert(lang === 'en' ? 'Error' : 'Hata', error.message || (lang === 'en' ? 'Could not add meals' : 'Yemekler eklenemedi'));
    } finally {
      setLoading(false);
    }
  };

  // Sepet toplamları
  const cartTotals = useMemo(() => {
    return cart.reduce((acc, item) => ({
      calories: acc.calories + Math.round(item.food.calories * item.portion),
      protein: acc.protein + Math.round(item.food.protein * item.portion * 10) / 10,
      carbs: acc.carbs + Math.round(item.food.carbs * item.portion * 10) / 10,
      fat: acc.fat + Math.round(item.food.fat * item.portion * 10) / 10,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }, [cart]);

  const openQuickAdd = (food: FoodItem) => {
    setQuickAddItem(food);
    setPortion(1);
    setShowQuickAdd(true);
  };

  // Kategori Chip
  const CategoryChip = ({ item, isSelected }: { item: typeof FOOD_CATEGORIES[0]; isSelected: boolean }) => (
    <TouchableOpacity
      style={[styles.categoryChip, isSelected && { backgroundColor: item.color }]}
      onPress={() => { setSelectedCategory(item.id); setSearchQuery(''); }}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={item.icon as any} 
        size={14} 
        color={isSelected ? '#FFF' : item.color} 
      />
      <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]} numberOfLines={1}>
        {lang === 'en' ? item.name_en : item.name}
      </Text>
    </TouchableOpacity>
  );

  // Yemek Kartı
  const FoodCard = ({ item }: { item: FoodItem }) => {
    const isFav = favorites.includes(item.food_id);
    
    return (
      <TouchableOpacity 
        style={styles.foodCard} 
        onPress={() => openQuickAdd(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.foodName} numberOfLines={2}>
              {lang === 'en' ? item.name_en : item.name}
            </Text>
            <TouchableOpacity 
              onPress={() => toggleFavorite(item.food_id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons 
                name={isFav ? 'bookmark' : 'bookmark-outline'} 
                size={20} 
                color={isFav ? Colors.primary : '#ccc'} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.macroRow}>
            <View style={styles.macroItem}>
              <View style={[styles.macroDot, { backgroundColor: '#3b82f6' }]} />
              <Text style={styles.macroValue}>{item.protein}g</Text>
              <Text style={styles.macroLabel}>P</Text>
            </View>
            <View style={styles.macroDivider} />
            <View style={styles.macroItem}>
              <View style={[styles.macroDot, { backgroundColor: '#f59e0b' }]} />
              <Text style={styles.macroValue}>{item.carbs}g</Text>
              <Text style={styles.macroLabel}>K</Text>
            </View>
            <View style={styles.macroDivider} />
            <View style={styles.macroItem}>
              <View style={[styles.macroDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.macroValue}>{item.fat}g</Text>
              <Text style={styles.macroLabel}>Y</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.cardAction}>
          <View style={styles.calorieBox}>
            <Text style={styles.calorieValue}>{item.calories}</Text>
            <Text style={styles.calorieUnit}>kcal</Text>
          </View>
          <TouchableOpacity style={styles.addIconBtn} onPress={() => openQuickAdd(item)}>
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Quick Add Modal
  const QuickAddModal = () => {
    if (!quickAddItem) return null;
    
    const cal = Math.round(quickAddItem.calories * portion);
    const pro = Math.round(quickAddItem.protein * portion * 10) / 10;
    const carb = Math.round(quickAddItem.carbs * portion * 10) / 10;
    const fat = Math.round(quickAddItem.fat * portion * 10) / 10;
    
    return (
      <Modal visible={showQuickAdd} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            activeOpacity={1} 
            onPress={() => setShowQuickAdd(false)} 
          />
          <View style={styles.quickAddContent}>
            <View style={styles.modalHandle} />
            
            <View style={styles.quickAddHeader}>
              <Text style={styles.quickAddTitle} numberOfLines={2}>
                {lang === 'en' ? quickAddItem.name_en : quickAddItem.name}
              </Text>
              <TouchableOpacity onPress={() => setShowQuickAdd(false)}>
                <Ionicons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.quickAddSubtitle}>1 {lang === 'en' ? 'portion' : 'porsiyon'} = {quickAddItem.calories} kcal</Text>
            
            {/* Portion Selector */}
            <View style={styles.portionContainer}>
              <Text style={styles.portionTitle}>{lang === 'en' ? 'Portion' : 'Porsiyon'}</Text>
              <View style={styles.portionSelector}>
                <TouchableOpacity 
                  style={styles.portionBtn}
                  onPress={() => setPortion(Math.max(0.25, portion - 0.25))}
                >
                  <Ionicons name="remove" size={24} color={Colors.primary} />
                </TouchableOpacity>
                
                <View style={styles.portionValueBox}>
                  <Text style={styles.portionValue}>{portion}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.portionBtn}
                  onPress={() => setPortion(Math.min(5, portion + 0.25))}
                >
                  <Ionicons name="add" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.portionPresets}>
                {[0.5, 1, 1.5, 2].map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.presetBtn, portion === p && styles.presetBtnActive]}
                    onPress={() => setPortion(p)}
                  >
                    <Text style={[styles.presetText, portion === p && styles.presetTextActive]}>
                      {p === 0.5 ? '½' : p === 1.5 ? '1½' : p}x
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Nutrition */}
            <View style={styles.nutritionBox}>
              <View style={styles.nutritionMain}>
                <Text style={styles.nutritionCalorie}>{cal}</Text>
                <Text style={styles.nutritionCalorieUnit}>kcal</Text>
              </View>
              
              <View style={styles.nutritionMacros}>
                <View style={styles.nutritionMacroItem}>
                  <Text style={[styles.nutritionMacroValue, { color: '#3b82f6' }]}>{pro}g</Text>
                  <Text style={styles.nutritionMacroLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionMacroItem}>
                  <Text style={[styles.nutritionMacroValue, { color: '#f59e0b' }]}>{carb}g</Text>
                  <Text style={styles.nutritionMacroLabel}>{lang === 'en' ? 'Carbs' : 'Karb'}</Text>
                </View>
                <View style={styles.nutritionMacroItem}>
                  <Text style={[styles.nutritionMacroValue, { color: '#ef4444' }]}>{fat}g</Text>
                  <Text style={styles.nutritionMacroLabel}>{lang === 'en' ? 'Fat' : 'Yağ'}</Text>
                </View>
              </View>
            </View>
            
            {/* Add Button */}
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addMealToDay(quickAddItem, portion)}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.addButtonText}>{t('add')}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Son Eklenenler
  const RecentSection = () => {
    if (recentFoods.length === 0) return null;
    
    return (
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('recentMeals')}</Text>
          <TouchableOpacity onPress={() => {
            setRecentFoods([]);
            AsyncStorage.removeItem('recent_foods_v2');
          }}>
            <Text style={styles.clearBtn}>{lang === 'en' ? 'Clear' : 'Temizle'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScroll}>
          {recentFoods.slice(0, 8).map((item, idx) => (
            <TouchableOpacity 
              key={item.id + idx}
              style={styles.recentItem}
              onPress={() => {
                const food: FoodItem = {
                  food_id: item.id,
                  name: item.name,
                  name_en: item.name,
                  calories: item.calories,
                  protein: item.protein,
                  carbs: item.carbs,
                  fat: item.fat,
                };
                openQuickAdd(food);
              }}
            >
              <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.recentCal}>{item.calories} kcal</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  // ============= RENDER BASED ON SCREEN MODE =============

  // Action Sheet View
  if (screenMode === 'actionSheet') {
    return (
      <View style={styles.actionSheetContainer}>
        <TouchableOpacity 
          style={styles.actionSheetBackdrop} 
          activeOpacity={1} 
          onPress={handleCloseActionSheet}
        />
        <Animated.View 
          style={[
            styles.actionSheetContent,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [400, 0],
                }),
              }],
            },
          ]}
        >
          <View style={styles.modalHandle} />
          
          <Text style={styles.actionSheetTitle}>
            {t('addCalorie')}
          </Text>
          <Text style={styles.actionSheetSubtitle}>
            {lang === 'en' ? 'How would you like to add?' : 'Nasıl eklemek istersiniz?'}
          </Text>
          
          {/* Option: Select from List */}
          <TouchableOpacity style={styles.optionButton} onPress={handleSelectFromList}>
            <View style={[styles.optionIcon, { backgroundColor: Colors.primary + '20' }]}>
              <Ionicons name="list" size={28} color={Colors.primary} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>
                {lang === 'en' ? 'Select from List' : 'Listeden Seç'}
              </Text>
              <Text style={styles.optionDesc}>
                {FOOD_COUNT.toLocaleString()}+ {lang === 'en' ? 'food options' : 'yemek seçeneği'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.lightText} />
          </TouchableOpacity>
          
          {/* Option: Photo */}
          <TouchableOpacity style={styles.optionButton} onPress={handlePhotoCalc}>
            <View style={[styles.optionIcon, { backgroundColor: Colors.teal + '20' }]}>
              <Ionicons name="camera" size={28} color={Colors.teal} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>
                {lang === 'en' ? 'Calculate with Photo' : 'Fotoğrafla Hesapla'}
              </Text>
              <Text style={styles.optionDesc}>
                {lang === 'en' ? 'AI auto calorie estimation' : 'AI ile otomatik kalori tahmini'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.lightText} />
          </TouchableOpacity>
          
          {/* Option: Manual Entry */}
          <TouchableOpacity style={styles.optionButton} onPress={handleManualEntry}>
            <View style={[styles.optionIcon, { backgroundColor: '#f59e0b20' }]}>
              <Ionicons name="create" size={28} color="#f59e0b" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>
                {lang === 'en' ? 'Manual Entry' : 'Manuel Giriş'}
              </Text>
              <Text style={styles.optionDesc}>
                {lang === 'en' ? 'Enter calorie values manually' : 'Kalori değerlerini manuel girin'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.lightText} />
          </TouchableOpacity>
          
          {/* Cancel */}
          <TouchableOpacity style={styles.cancelButton} onPress={handleCloseActionSheet}>
            <Text style={styles.cancelButtonText}>
              {lang === 'en' ? 'Cancel' : 'Vazgeç'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  // Manual Entry View
  if (screenMode === 'manualEntry') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackToActionSheet} style={styles.headerBtn}>
              <Ionicons name="chevron-back" size={24} color={Colors.darkText} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {lang === 'en' ? 'Manual Entry' : 'Manuel Giriş'}
            </Text>
            <View style={styles.headerBtn} />
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
              style={styles.addButton}
              onPress={handleManualAdd}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.addButtonText}>{t('add')}</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Food List View
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToActionSheet} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {lang === 'en' ? 'Select Food' : 'Yemek Seç'}
        </Text>
        <View style={styles.headerBtn} />
      </View>
      
      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder={lang === 'en' ? 'Search food...' : 'Yemek ara...'}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {FOOD_CATEGORIES.map(cat => (
            <CategoryChip key={cat.id} item={cat} isSelected={selectedCategory === cat.id} />
          ))}
        </ScrollView>
      </View>
      
      {/* Recent */}
      <RecentSection />
      
      {/* Results Count */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>
          {searchQuery ? `"${searchQuery}" ${lang === 'en' ? 'for' : 'için'} ` : ''}{filteredFoods.length.toLocaleString()} {lang === 'en' ? 'results' : 'sonuç'}
        </Text>
      </View>
      
      {/* Food List */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.food_id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 90,
          offset: 90 * index,
          index,
        })}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#ddd" />
            <Text style={styles.emptyText}>
              {lang === 'en' ? 'No results found' : 'Sonuç bulunamadı'}
            </Text>
          </View>
        }
        renderItem={({ item }) => <FoodCard item={item} />}
      />
      
      <QuickAddModal />
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  // Action Sheet
  actionSheetContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  actionSheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  actionSheetContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  actionSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkText,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSheetSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 13,
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
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.darkText },
  
  // Search
  searchSection: { padding: 16, paddingBottom: 12, backgroundColor: '#FFF' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 16, color: Colors.darkText },
  
  // Categories
  categoriesWrapper: {
    backgroundColor: '#FFF',
    paddingBottom: 12,
  },
  categoriesContent: { 
    paddingHorizontal: 16, 
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    gap: 4,
    minWidth: 60,
  },
  categoryText: { 
    fontSize: 12, 
    fontWeight: '500', 
    color: Colors.darkText,
  },
  categoryTextActive: { color: '#FFF' },
  
  // Recent
  recentSection: { paddingTop: 16, paddingBottom: 8 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: Colors.darkText },
  clearBtn: { fontSize: 13, color: Colors.primary },
  recentScroll: { paddingLeft: 16 },
  recentItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  recentName: { fontSize: 13, fontWeight: '500', color: Colors.darkText, marginBottom: 4 },
  recentCal: { fontSize: 12, color: Colors.lightText },
  
  // Results
  resultsRow: { paddingHorizontal: 16, paddingVertical: 12 },
  resultsText: { fontSize: 13, color: Colors.lightText },
  
  // List
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },
  
  // Food Card
  foodCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    minHeight: 82,
  },
  cardContent: { flex: 1, marginRight: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 },
  foodName: { fontSize: 15, fontWeight: '600', color: Colors.darkText, flex: 1, marginRight: 8, lineHeight: 20 },
  macroRow: { flexDirection: 'row', alignItems: 'center' },
  macroItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  macroDot: { width: 6, height: 6, borderRadius: 3 },
  macroValue: { fontSize: 13, fontWeight: '600', color: Colors.darkText },
  macroLabel: { fontSize: 11, color: Colors.lightText },
  macroDivider: { width: 1, height: 12, backgroundColor: '#E8E8E8', marginHorizontal: 10 },
  cardAction: { alignItems: 'center', gap: 8 },
  calorieBox: { alignItems: 'center' },
  calorieValue: { fontSize: 20, fontWeight: '700', color: Colors.primary },
  calorieUnit: { fontSize: 11, color: Colors.lightText, marginTop: -2 },
  addIconBtn: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: Colors.primary,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  
  // Empty
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 15, color: Colors.lightText, marginTop: 12 },
  
  // Modal Handle
  modalHandle: { 
    width: 36, height: 4, borderRadius: 2, 
    backgroundColor: '#E0E0E0', 
    alignSelf: 'center', 
    marginTop: 12, marginBottom: 16 
  },
  
  // Modal Overlay
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  
  // Quick Add Modal
  quickAddContent: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  quickAddHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  quickAddTitle: { fontSize: 18, fontWeight: '700', color: Colors.darkText, flex: 1, marginRight: 12 },
  quickAddSubtitle: { fontSize: 13, color: Colors.lightText, marginBottom: 24 },
  
  // Portion
  portionContainer: { marginBottom: 24 },
  portionTitle: { fontSize: 14, fontWeight: '600', color: Colors.darkText, marginBottom: 12 },
  portionSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  portionBtn: { 
    width: 48, height: 48, borderRadius: 24, 
    backgroundColor: '#F5F5F5',
    justifyContent: 'center', alignItems: 'center',
  },
  portionValueBox: { 
    width: 80, height: 56, 
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
  },
  portionValue: { fontSize: 32, fontWeight: '700', color: Colors.primary },
  portionPresets: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16 },
  presetBtn: { 
    paddingHorizontal: 18, paddingVertical: 8, 
    borderRadius: 20, backgroundColor: '#F5F5F5',
  },
  presetBtnActive: { backgroundColor: Colors.primary },
  presetText: { fontSize: 14, fontWeight: '600', color: Colors.darkText },
  presetTextActive: { color: '#FFF' },
  
  // Nutrition
  nutritionBox: { 
    backgroundColor: '#F8F8F8', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 20 
  },
  nutritionMain: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginBottom: 16 },
  nutritionCalorie: { fontSize: 36, fontWeight: '700', color: Colors.primary },
  nutritionCalorieUnit: { fontSize: 16, color: Colors.lightText, marginLeft: 4 },
  nutritionMacros: { flexDirection: 'row', justifyContent: 'space-around' },
  nutritionMacroItem: { alignItems: 'center' },
  nutritionMacroValue: { fontSize: 18, fontWeight: '700' },
  nutritionMacroLabel: { fontSize: 11, color: Colors.lightText, marginTop: 2 },
  
  // Add Button
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
  
  // Manual Entry Form
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
    backgroundColor: '#FFF',
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
  
  // Loading
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center', alignItems: 'center',
  },
});
