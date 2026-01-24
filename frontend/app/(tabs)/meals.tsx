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
        t('success'), 
        `${lang === 'en' ? food.name_en : food.name} ${t('added')}`
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
      Alert.alert(t('error'), error.message || t('mealAddError'));
    } finally {
      setLoading(false);
    }
  };

  const handleManualAdd = async () => {
    if (!manualFood.name || !manualFood.calories) {
      Alert.alert(
        t('error'),
        t('pleaseEnterFoodNameAndCalories')
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
        t('success'),
        t('mealAdded')
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
      Alert.alert(t('error'), error.message);
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
        t('success'), 
        `${cart.length} ${t('itemsAdded')}`
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
      Alert.alert(t('error'), error.message || t('mealAddError'));
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

  // Quick Add Modal - Premium Design
  const QuickAddModal = () => {
    if (!quickAddItem) return null;
    
    const cal = Math.round(quickAddItem.calories * portion);
    const pro = Math.round(quickAddItem.protein * portion * 10) / 10;
    const carb = Math.round(quickAddItem.carbs * portion * 10) / 10;
    const fat = Math.round(quickAddItem.fat * portion * 10) / 10;
    const isFav = favorites.includes(quickAddItem.food_id);
    
    // Progress percentages for visual bars
    const maxPro = 50, maxCarb = 100, maxFat = 40;
    const proPercent = Math.min((pro / maxPro) * 100, 100);
    const carbPercent = Math.min((carb / maxCarb) * 100, 100);
    const fatPercent = Math.min((fat / maxFat) * 100, 100);
    
    return (
      <Modal visible={showQuickAdd} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            activeOpacity={1} 
            onPress={() => setShowQuickAdd(false)} 
          />
          <Animated.View style={styles.premiumModalContent}>
            {/* Premium Handle */}
            <View style={styles.premiumHandle} />
            
            {/* Header with gradient accent */}
            <View style={styles.premiumHeader}>
              <View style={styles.premiumHeaderLeft}>
                <View style={styles.foodIconContainer}>
                  <Ionicons name="restaurant" size={24} color="#FFF" />
                </View>
                <View style={styles.premiumTitleContainer}>
                  <Text style={styles.premiumTitle} numberOfLines={2}>
                    {lang === 'en' ? quickAddItem.name_en : quickAddItem.name}
                  </Text>
                  <Text style={styles.premiumSubtitle}>
                    100g • {quickAddItem.calories} kcal
                  </Text>
                </View>
              </View>
              <View style={styles.premiumHeaderRight}>
                <TouchableOpacity 
                  style={styles.premiumFavBtn}
                  onPress={() => toggleFavorite(quickAddItem.food_id)}
                >
                  <Ionicons 
                    name={isFav ? 'heart' : 'heart-outline'} 
                    size={22} 
                    color={isFav ? '#e11d48' : '#999'} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.premiumCloseBtn}
                  onPress={() => setShowQuickAdd(false)}
                >
                  <Ionicons name="close" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Premium Calorie Display */}
            <View style={styles.premiumCalorieCard}>
              <View style={styles.calorieGlowContainer}>
                <Text style={styles.premiumCalorieValue}>{cal}</Text>
                <Text style={styles.premiumCalorieUnit}>kcal</Text>
              </View>
              <View style={styles.calorieRing}>
                <View style={[styles.calorieRingFill, { 
                  width: `${Math.min((cal / 500) * 100, 100)}%` 
                }]} />
              </View>
            </View>
            
            {/* Premium Portion Selector */}
            <View style={styles.premiumPortionSection}>
              <Text style={styles.premiumSectionLabel}>
                {lang === 'en' ? 'Portion Size' : 'Porsiyon Miktarı'}
              </Text>
              
              <View style={styles.premiumPortionControl}>
                <TouchableOpacity 
                  style={styles.premiumPortionBtnMinus}
                  onPress={() => setPortion(Math.max(0.25, portion - 0.25))}
                  activeOpacity={0.7}
                >
                  <Ionicons name="remove" size={28} color="#FFF" />
                </TouchableOpacity>
                
                <View style={styles.premiumPortionDisplay}>
                  <Text style={styles.premiumPortionValue}>{portion}</Text>
                  <Text style={styles.premiumPortionLabel}>
                    {lang === 'en' ? 'portion' : 'porsiyon'}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.premiumPortionBtnPlus}
                  onPress={() => setPortion(Math.min(5, portion + 0.25))}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add" size={28} color="#FFF" />
                </TouchableOpacity>
              </View>
              
              {/* Quick Select Pills */}
              <View style={styles.premiumQuickSelect}>
                {[
                  { val: 0.5, label: '½' },
                  { val: 1, label: '1' },
                  { val: 1.5, label: '1½' },
                  { val: 2, label: '2' },
                  { val: 3, label: '3' },
                ].map(item => (
                  <TouchableOpacity
                    key={item.val}
                    style={[
                      styles.premiumQuickPill,
                      portion === item.val && styles.premiumQuickPillActive
                    ]}
                    onPress={() => setPortion(item.val)}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.premiumQuickPillText,
                      portion === item.val && styles.premiumQuickPillTextActive
                    ]}>
                      {item.label}x
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Premium Macros Display */}
            <View style={styles.premiumMacrosSection}>
              <Text style={styles.premiumSectionLabel}>
                {lang === 'en' ? 'Nutrition Facts' : 'Besin Değerleri'}
              </Text>
              
              <View style={styles.premiumMacrosGrid}>
                {/* Protein */}
                <View style={styles.premiumMacroCard}>
                  <View style={styles.macroIconCircle}>
                    <Ionicons name="fitness" size={16} color="#3b82f6" />
                  </View>
                  <Text style={styles.premiumMacroValue}>{pro}g</Text>
                  <Text style={styles.premiumMacroLabel}>Protein</Text>
                  <View style={styles.macroProgressBar}>
                    <View style={[styles.macroProgressFill, { 
                      width: `${proPercent}%`,
                      backgroundColor: '#3b82f6' 
                    }]} />
                  </View>
                </View>
                
                {/* Carbs */}
                <View style={styles.premiumMacroCard}>
                  <View style={[styles.macroIconCircle, { backgroundColor: '#fef3c7' }]}>
                    <Ionicons name="flash" size={16} color="#f59e0b" />
                  </View>
                  <Text style={styles.premiumMacroValue}>{carb}g</Text>
                  <Text style={styles.premiumMacroLabel}>
                    {lang === 'en' ? 'Carbs' : 'Karbonhidrat'}
                  </Text>
                  <View style={styles.macroProgressBar}>
                    <View style={[styles.macroProgressFill, { 
                      width: `${carbPercent}%`,
                      backgroundColor: '#f59e0b' 
                    }]} />
                  </View>
                </View>
                
                {/* Fat */}
                <View style={styles.premiumMacroCard}>
                  <View style={[styles.macroIconCircle, { backgroundColor: '#fee2e2' }]}>
                    <Ionicons name="water" size={16} color="#ef4444" />
                  </View>
                  <Text style={styles.premiumMacroValue}>{fat}g</Text>
                  <Text style={styles.premiumMacroLabel}>
                    {lang === 'en' ? 'Fat' : 'Yağ'}
                  </Text>
                  <View style={styles.macroProgressBar}>
                    <View style={[styles.macroProgressFill, { 
                      width: `${fatPercent}%`,
                      backgroundColor: '#ef4444' 
                    }]} />
                  </View>
                </View>
              </View>
            </View>
            
            {/* Premium Action Buttons */}
            <View style={styles.premiumActionsContainer}>
              <TouchableOpacity 
                style={styles.premiumCartBtn}
                onPress={() => addToCart(quickAddItem, portion)}
                activeOpacity={0.8}
              >
                <View style={styles.premiumCartIconBg}>
                  <Ionicons name="bag-add-outline" size={20} color={Colors.primary} />
                </View>
                <Text style={styles.premiumCartBtnText}>
                  {lang === 'en' ? 'Add to Cart' : 'Sepete Ekle'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.premiumAddBtn}
                onPress={() => addMealToDay(quickAddItem, portion)}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Text style={styles.premiumAddBtnText}>
                      {lang === 'en' ? 'Add Now' : 'Hemen Ekle'}
                    </Text>
                    <View style={styles.premiumAddBtnIcon}>
                      <Ionicons name="checkmark" size={18} color="#FFF" />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  };

  // Sepet Modal
  const CartModal = () => {
    if (cart.length === 0) return null;
    
    return (
      <Modal visible={showCart} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            activeOpacity={1} 
            onPress={() => setShowCart(false)} 
          />
          <View style={styles.cartContent}>
            <View style={styles.modalHandle} />
            
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>
                {lang === 'en' ? 'Your Cart' : 'Sepetiniz'} ({cart.length})
              </Text>
              <TouchableOpacity onPress={() => setShowCart(false)}>
                <Ionicons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.cartList}>
              {cart.map((item, index) => (
                <View key={item.food.food_id + index} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName} numberOfLines={1}>
                      {lang === 'en' ? item.food.name_en : item.food.name}
                    </Text>
                    <Text style={styles.cartItemDetails}>
                      {item.portion}x • {Math.round(item.food.calories * item.portion)} kcal
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.removeCartItem}
                    onPress={() => removeFromCart(item.food.food_id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            
            {/* Cart Totals */}
            <View style={styles.cartTotals}>
              <Text style={styles.cartTotalsTitle}>
                {lang === 'en' ? 'Total' : 'Toplam'}
              </Text>
              <View style={styles.cartTotalsRow}>
                <View style={styles.cartTotalItem}>
                  <Text style={styles.cartTotalValue}>{cartTotals.calories}</Text>
                  <Text style={styles.cartTotalLabel}>kcal</Text>
                </View>
                <View style={styles.cartTotalItem}>
                  <Text style={[styles.cartTotalValue, { color: '#3b82f6' }]}>{cartTotals.protein}g</Text>
                  <Text style={styles.cartTotalLabel}>Protein</Text>
                </View>
                <View style={styles.cartTotalItem}>
                  <Text style={[styles.cartTotalValue, { color: '#f59e0b' }]}>{cartTotals.carbs}g</Text>
                  <Text style={styles.cartTotalLabel}>{lang === 'en' ? 'Carbs' : 'Karb'}</Text>
                </View>
                <View style={styles.cartTotalItem}>
                  <Text style={[styles.cartTotalValue, { color: '#ef4444' }]}>{cartTotals.fat}g</Text>
                  <Text style={styles.cartTotalLabel}>{lang === 'en' ? 'Fat' : 'Yağ'}</Text>
                </View>
              </View>
            </View>
            
            {/* Add All Button */}
            <TouchableOpacity 
              style={styles.addAllButton}
              onPress={addAllFromCart}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.addAllButtonText}>
                  {lang === 'en' ? `Add All (${cart.length} items)` : `Hepsini Ekle (${cart.length} yemek)`}
                </Text>
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
        {/* Sepet butonu */}
        <TouchableOpacity 
          style={[styles.headerBtn, cart.length > 0 && styles.cartBtnActive]} 
          onPress={() => cart.length > 0 && setShowCart(true)}
        >
          <Ionicons name="cart" size={24} color={cart.length > 0 ? Colors.primary : Colors.lightText} />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
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
              {selectedCategory === 'favorites' && favorites.length === 0
                ? (lang === 'en' ? 'No favorites yet' : 'Henüz favori yok')
                : (lang === 'en' ? 'No results found' : 'Sonuç bulunamadı')}
            </Text>
          </View>
        }
        renderItem={({ item }) => <FoodCard item={item} />}
      />
      
      <QuickAddModal />
      <CartModal />
      
      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <TouchableOpacity 
          style={styles.floatingCartBtn}
          onPress={() => setShowCart(true)}
          activeOpacity={0.9}
        >
          <Ionicons name="cart" size={22} color="#FFF" />
          <Text style={styles.floatingCartText}>
            {cart.length} {lang === 'en' ? 'items' : 'yemek'} • {cartTotals.calories} kcal
          </Text>
          <Ionicons name="chevron-up" size={18} color="#FFF" />
        </TouchableOpacity>
      )}
      
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
  modalBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  
  // ============ PREMIUM MODAL STYLES ============
  premiumModalContent: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 28, 
    borderTopRightRadius: 28,
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  premiumHandle: { 
    width: 40, 
    height: 5, 
    borderRadius: 3, 
    backgroundColor: '#E0E0E0', 
    alignSelf: 'center', 
    marginTop: 12, 
    marginBottom: 16 
  },
  
  // Premium Header
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  premiumHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  foodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  premiumTitleContainer: {
    flex: 1,
    paddingTop: 2,
  },
  premiumTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: Colors.darkText,
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  premiumSubtitle: { 
    fontSize: 13, 
    color: Colors.lightText, 
    marginTop: 4,
    fontWeight: '500',
  },
  premiumHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  premiumFavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Premium Calorie Card
  premiumCalorieCard: {
    marginHorizontal: 20,
    backgroundColor: 'linear-gradient(135deg, #f8fffe 0%, #f0fdf4 100%)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  calorieGlowContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  premiumCalorieValue: { 
    fontSize: 56, 
    fontWeight: '800', 
    color: Colors.primary,
    letterSpacing: -2,
  },
  premiumCalorieUnit: { 
    fontSize: 18, 
    fontWeight: '600',
    color: Colors.primary + '80',
    marginLeft: 6,
  },
  calorieRing: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary + '15',
    overflow: 'hidden',
  },
  calorieRingFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  
  // Premium Portion Section
  premiumPortionSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  premiumSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.darkText,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  premiumPortionControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  premiumPortionBtnMinus: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  premiumPortionBtnPlus: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  premiumPortionDisplay: {
    alignItems: 'center',
    minWidth: 100,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  premiumPortionValue: { 
    fontSize: 40, 
    fontWeight: '800', 
    color: Colors.darkText,
    letterSpacing: -1,
  },
  premiumPortionLabel: { 
    fontSize: 12, 
    fontWeight: '600',
    color: Colors.lightText,
    marginTop: 2,
  },
  
  // Premium Quick Select Pills
  premiumQuickSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  premiumQuickPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  premiumQuickPillActive: {
    backgroundColor: Colors.primary + '15',
    borderColor: Colors.primary,
  },
  premiumQuickPillText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.lightText,
  },
  premiumQuickPillTextActive: {
    color: Colors.primary,
  },
  
  // Premium Macros Section
  premiumMacrosSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  premiumMacrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  premiumMacroCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  macroIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  premiumMacroValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.darkText,
    letterSpacing: -0.5,
  },
  premiumMacroLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.lightText,
    marginTop: 2,
    marginBottom: 10,
  },
  macroProgressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
  },
  macroProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  
  // Premium Action Buttons
  premiumActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  premiumCartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '10',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
  },
  premiumCartIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumCartBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  premiumAddBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    gap: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  premiumAddBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  premiumAddBtnIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // ============ OLD QUICK ADD STYLES (keeping for compatibility) ============
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
  
  // Cart Badge in Header
  cartBtnActive: {
    backgroundColor: Colors.primary + '15',
    borderRadius: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  
  // Add Buttons Row
  addButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '15',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  addToCartButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  
  // Cart Modal
  cartContent: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
    maxHeight: screenHeight * 0.7,
  },
  cartHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 16,
  },
  cartTitle: { fontSize: 20, fontWeight: '700', color: Colors.darkText },
  cartList: {
    maxHeight: screenHeight * 0.35,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: 15, fontWeight: '600', color: Colors.darkText },
  cartItemDetails: { fontSize: 13, color: Colors.lightText, marginTop: 2 },
  removeCartItem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  
  // Cart Totals
  cartTotals: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  cartTotalsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 12,
  },
  cartTotalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cartTotalItem: { alignItems: 'center' },
  cartTotalValue: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  cartTotalLabel: { fontSize: 11, color: Colors.lightText, marginTop: 2 },
  
  // Add All Button
  addAllButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addAllButtonText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
  
  // Floating Cart Button
  floatingCartBtn: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingCartText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
});
