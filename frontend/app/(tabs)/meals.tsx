import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
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
  Image,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { searchFoods, FOOD_DATABASE, FoodItem, getHighProteinFoods, getLowCalorieFoods } from '../../content/foodDatabase';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Premium Kategoriler - Emoji ve Gradient ile
const FOOD_CATEGORIES = [
  { id: 'all', name: 'Tümü', name_en: 'All', emoji: '🍽️', gradient: ['#667eea', '#764ba2'] },
  { id: 'popular', name: 'Popüler', name_en: 'Popular', emoji: '⭐', gradient: ['#f093fb', '#f5576c'], keywords: ['tavuk', 'pilav', 'salata', 'yumurta', 'ekmek'] },
  { id: 'meat', name: 'Et', name_en: 'Meat', emoji: '🥩', gradient: ['#eb3349', '#f45c43'], keywords: ['et', 'dana', 'kuzu', 'biftek', 'köfte', 'pirzola', 'kıyma', 'beef', 'lamb', 'steak'] },
  { id: 'chicken', name: 'Tavuk', name_en: 'Chicken', emoji: '🍗', gradient: ['#ff9966', '#ff5e62'], keywords: ['tavuk', 'piliç', 'chicken', 'wings'] },
  { id: 'fish', name: 'Balık', name_en: 'Fish', emoji: '🐟', gradient: ['#4facfe', '#00f2fe'], keywords: ['balık', 'somon', 'ton', 'levrek', 'karides', 'fish', 'salmon'] },
  { id: 'veggies', name: 'Sebze', name_en: 'Veggies', emoji: '🥗', gradient: ['#11998e', '#38ef7d'], keywords: ['salata', 'domates', 'havuç', 'brokoli', 'ıspanak', 'kabak', 'patlıcan'] },
  { id: 'fruits', name: 'Meyve', name_en: 'Fruits', emoji: '🍎', gradient: ['#ee0979', '#ff6a00'], keywords: ['elma', 'muz', 'portakal', 'çilek', 'karpuz', 'üzüm'] },
  { id: 'dairy', name: 'Süt', name_en: 'Dairy', emoji: '🧀', gradient: ['#ffecd2', '#fcb69f'], keywords: ['süt', 'yoğurt', 'peynir', 'ayran', 'kefir', 'milk', 'cheese'] },
  { id: 'grains', name: 'Tahıl', name_en: 'Grains', emoji: '🍞', gradient: ['#d4a574', '#c9a86c'], keywords: ['ekmek', 'makarna', 'pirinç', 'pilav', 'bulgur', 'yulaf'] },
  { id: 'soup', name: 'Çorba', name_en: 'Soup', emoji: '🍲', gradient: ['#f7971e', '#ffd200'], keywords: ['çorba', 'mercimek', 'soup'] },
  { id: 'fastfood', name: 'Fast Food', name_en: 'Fast Food', emoji: '🍔', gradient: ['#ff416c', '#ff4b2b'], keywords: ['pizza', 'hamburger', 'döner', 'lahmacun', 'burger'] },
  { id: 'dessert', name: 'Tatlı', name_en: 'Dessert', emoji: '🍰', gradient: ['#a18cd1', '#fbc2eb'], keywords: ['tatlı', 'baklava', 'dondurma', 'çikolata', 'kek'] },
  { id: 'drinks', name: 'İçecek', name_en: 'Drinks', emoji: '☕', gradient: ['#2c3e50', '#4ca1af'], keywords: ['kahve', 'çay', 'meyve suyu', 'kola', 'su'] },
  { id: 'snacks', name: 'Atıştırma', name_en: 'Snacks', emoji: '🥜', gradient: ['#c79081', '#dfa579'], keywords: ['ceviz', 'badem', 'fındık', 'fıstık', 'çerez', 'kraker'] },
];

// Food emoji mapping based on keywords
const getFoodEmoji = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('tavuk') || n.includes('chicken') || n.includes('piliç')) return '🍗';
  if (n.includes('et') || n.includes('köfte') || n.includes('beef') || n.includes('biftek')) return '🥩';
  if (n.includes('balık') || n.includes('fish') || n.includes('somon')) return '🐟';
  if (n.includes('salata') || n.includes('salad')) return '🥗';
  if (n.includes('çorba') || n.includes('soup')) return '🍲';
  if (n.includes('makarna') || n.includes('pasta') || n.includes('spagetti')) return '🍝';
  if (n.includes('pilav') || n.includes('pirinç') || n.includes('rice')) return '🍚';
  if (n.includes('ekmek') || n.includes('bread') || n.includes('tost')) return '🍞';
  if (n.includes('yumurta') || n.includes('egg') || n.includes('omlet')) return '🥚';
  if (n.includes('pizza')) return '🍕';
  if (n.includes('hamburger') || n.includes('burger')) return '🍔';
  if (n.includes('döner') || n.includes('kebab') || n.includes('kebap')) return '🌯';
  if (n.includes('süt') || n.includes('milk')) return '🥛';
  if (n.includes('yoğurt') || n.includes('yogurt')) return '🥣';
  if (n.includes('peynir') || n.includes('cheese')) return '🧀';
  if (n.includes('elma') || n.includes('apple')) return '🍎';
  if (n.includes('muz') || n.includes('banana')) return '🍌';
  if (n.includes('portakal') || n.includes('orange')) return '🍊';
  if (n.includes('kahve') || n.includes('coffee')) return '☕';
  if (n.includes('çay') || n.includes('tea')) return '🍵';
  if (n.includes('su') || n.includes('water')) return '💧';
  if (n.includes('tatlı') || n.includes('pasta') || n.includes('kek') || n.includes('cake')) return '🍰';
  if (n.includes('dondurma') || n.includes('ice cream')) return '🍦';
  if (n.includes('çikolata') || n.includes('chocolate')) return '🍫';
  return '🍽️';
};

type RecentFood = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: number;
};

export default function MealsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentFoods, setRecentFoods] = useState<RecentFood[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddItem, setQuickAddItem] = useState<FoodItem | null>(null);
  const [portion, setPortion] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  
  const searchInputRef = useRef<TextInput>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const searchAnim = useRef(new Animated.Value(0)).current;
  
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  useEffect(() => {
    loadRecentFoods();
    loadFavorites();
  }, []);

  useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: showSearch ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    if (showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

  const loadRecentFoods = async () => {
    try {
      const stored = await AsyncStorage.getItem('recent_foods_premium');
      if (stored) setRecentFoods(JSON.parse(stored));
    } catch (e) { console.error(e); }
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorite_foods');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (e) { console.error(e); }
  };

  const toggleFavorite = async (foodId: string) => {
    const newFavorites = favorites.includes(foodId)
      ? favorites.filter(id => id !== foodId)
      : [...favorites, foodId];
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorite_foods', JSON.stringify(newFavorites));
  };

  // Filtrelenmiş yemekler
  const filteredFoods = useMemo(() => {
    let results: FoodItem[] = [];
    
    if (searchQuery.length >= 2) {
      results = searchFoods(searchQuery, lang, 100);
    } else if (selectedCategory === 'popular') {
      // En popüler yemekler
      results = FOOD_DATABASE.slice(0, 30);
    } else if (selectedCategory !== 'all') {
      const category = FOOD_CATEGORIES.find(c => c.id === selectedCategory);
      if (category?.keywords) {
        results = FOOD_DATABASE.filter(food => {
          const name = lang === 'en' ? food.name_en.toLowerCase() : food.name.toLowerCase();
          return category.keywords!.some(kw => name.includes(kw.toLowerCase()));
        }).slice(0, 80);
      }
    } else {
      results = FOOD_DATABASE.slice(0, 50);
    }
    
    return results;
  }, [searchQuery, selectedCategory, lang]);

  const addMealToDay = async (food: FoodItem, portionMultiplier: number = 1) => {
    try {
      setLoading(true);
      const { addMeal } = require('../../utils/api');
      
      await addMeal({
        name: lang === 'en' ? food.name_en : food.name,
        calories: Math.round(food.calories * portionMultiplier),
        protein: Math.round(food.protein * portionMultiplier * 10) / 10,
        carbs: Math.round(food.carbs * portionMultiplier * 10) / 10,
        fat: Math.round(food.fat * portionMultiplier * 10) / 10,
        image_base64: '',
        meal_type: 'snack',
      });

      // Son eklenenler
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
      await AsyncStorage.setItem('recent_foods_premium', JSON.stringify(updatedRecents));

      setShowQuickAdd(false);
      setQuickAddItem(null);
      setPortion(1);
      
      Alert.alert('✅', `${lang === 'en' ? food.name_en : food.name} eklendi!`);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert(t('error') || 'Hata', error.message || 'Yemek eklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const openQuickAdd = (food: FoodItem) => {
    setQuickAddItem(food);
    setPortion(1);
    setShowQuickAdd(true);
  };

  // Premium Kategori Kartı
  const CategoryCard = ({ item, isSelected }: { item: typeof FOOD_CATEGORIES[0]; isSelected: boolean }) => (
    <TouchableOpacity
      style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
      onPress={() => { setSelectedCategory(item.id); setSearchQuery(''); }}
      activeOpacity={0.7}
    >
      {isSelected ? (
        <LinearGradient
          colors={item.gradient as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.categoryGradient}
        >
          <Text style={styles.categoryEmoji}>{item.emoji}</Text>
          <Text style={styles.categoryNameSelected}>{lang === 'en' ? item.name_en : item.name}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.categoryInner}>
          <Text style={styles.categoryEmoji}>{item.emoji}</Text>
          <Text style={styles.categoryName}>{lang === 'en' ? item.name_en : item.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Premium Yemek Kartı
  const PremiumFoodCard = ({ item }: { item: FoodItem }) => {
    const isFav = favorites.includes(item.food_id);
    const emoji = getFoodEmoji(lang === 'en' ? item.name_en : item.name);
    
    return (
      <TouchableOpacity 
        style={styles.premiumCard} 
        onPress={() => openQuickAdd(item)}
        activeOpacity={0.8}
      >
        <View style={styles.cardLeft}>
          <View style={styles.emojiContainer}>
            <Text style={styles.foodEmoji}>{emoji}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName} numberOfLines={2}>
              {lang === 'en' ? item.name_en : item.name}
            </Text>
            <View style={styles.macrosRow}>
              <View style={styles.macroChip}>
                <View style={[styles.macroDot, { backgroundColor: '#3498db' }]} />
                <Text style={styles.macroText}>{item.protein}g</Text>
              </View>
              <View style={styles.macroChip}>
                <View style={[styles.macroDot, { backgroundColor: '#f39c12' }]} />
                <Text style={styles.macroText}>{item.carbs}g</Text>
              </View>
              <View style={styles.macroChip}>
                <View style={[styles.macroDot, { backgroundColor: '#e74c3c' }]} />
                <Text style={styles.macroText}>{item.fat}g</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.cardRight}>
          <TouchableOpacity 
            style={styles.favButton}
            onPress={() => toggleFavorite(item.food_id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name={isFav ? 'heart' : 'heart-outline'} 
              size={18} 
              color={isFav ? '#e74c3c' : '#ccc'} 
            />
          </TouchableOpacity>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.caloriesBadge}
          >
            <Text style={styles.caloriesValue}>{item.calories}</Text>
            <Text style={styles.caloriesUnit}>kcal</Text>
          </LinearGradient>
          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => openQuickAdd(item)}
          >
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Premium Quick Add Modal
  const QuickAddModal = () => {
    if (!quickAddItem) return null;
    
    const cal = Math.round(quickAddItem.calories * portion);
    const pro = Math.round(quickAddItem.protein * portion * 10) / 10;
    const carb = Math.round(quickAddItem.carbs * portion * 10) / 10;
    const fat = Math.round(quickAddItem.fat * portion * 10) / 10;
    const emoji = getFoodEmoji(lang === 'en' ? quickAddItem.name_en : quickAddItem.name);
    
    return (
      <Modal visible={showQuickAdd} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={() => setShowQuickAdd(false)} />
          <View style={styles.modalCard}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalEmojiBox}>
                <Text style={styles.modalEmoji}>{emoji}</Text>
              </View>
              <View style={styles.modalTitleBox}>
                <Text style={styles.modalTitle} numberOfLines={2}>
                  {lang === 'en' ? quickAddItem.name_en : quickAddItem.name}
                </Text>
                <Text style={styles.modalSubtitle}>1 porsiyon = {quickAddItem.calories} kcal</Text>
              </View>
              <TouchableOpacity onPress={() => setShowQuickAdd(false)} style={styles.modalClose}>
                <Ionicons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            
            {/* Portion Selector */}
            <View style={styles.portionSection}>
              <Text style={styles.portionLabel}>{t('portion') || 'Porsiyon Seç'}</Text>
              <View style={styles.portionRow}>
                <TouchableOpacity 
                  style={styles.portionBtnLarge}
                  onPress={() => setPortion(Math.max(0.25, portion - 0.25))}
                >
                  <Ionicons name="remove" size={28} color={Colors.primary} />
                </TouchableOpacity>
                
                <View style={styles.portionDisplay}>
                  <Text style={styles.portionValue}>{portion}</Text>
                  <Text style={styles.portionX}>×</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.portionBtnLarge}
                  onPress={() => setPortion(Math.min(5, portion + 0.25))}
                >
                  <Ionicons name="add" size={28} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              
              {/* Quick Portions */}
              <View style={styles.quickPortions}>
                {[0.5, 1, 1.5, 2, 3].map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.quickPortionChip, portion === p && styles.quickPortionActive]}
                    onPress={() => setPortion(p)}
                  >
                    <Text style={[styles.quickPortionText, portion === p && styles.quickPortionTextActive]}>
                      {p === 0.5 ? '½' : p === 1.5 ? '1½' : p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Nutrition Summary */}
            <View style={styles.nutritionSummary}>
              <View style={styles.nutritionMain}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.calorieCircle}
                >
                  <Text style={styles.calorieNumber}>{cal}</Text>
                  <Text style={styles.calorieLabel}>kcal</Text>
                </LinearGradient>
              </View>
              
              <View style={styles.macroBoxes}>
                <View style={[styles.macroBox, { borderLeftColor: '#3498db' }]}>
                  <Text style={styles.macroBoxValue}>{pro}g</Text>
                  <Text style={styles.macroBoxLabel}>Protein</Text>
                </View>
                <View style={[styles.macroBox, { borderLeftColor: '#f39c12' }]}>
                  <Text style={styles.macroBoxValue}>{carb}g</Text>
                  <Text style={styles.macroBoxLabel}>Karb</Text>
                </View>
                <View style={[styles.macroBox, { borderLeftColor: '#e74c3c' }]}>
                  <Text style={styles.macroBoxValue}>{fat}g</Text>
                  <Text style={styles.macroBoxLabel}>Yağ</Text>
                </View>
              </View>
            </View>
            
            {/* Add Button */}
            <TouchableOpacity 
              style={styles.addMealBtn}
              onPress={() => addMealToDay(quickAddItem, portion)}
              disabled={loading}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addMealGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="add-circle" size={24} color="#FFF" />
                    <Text style={styles.addMealText}>Bugüne Ekle</Text>
                  </>
                )}
              </LinearGradient>
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
          <Text style={styles.sectionTitle}>⏱️ Son Eklenenler</Text>
          <TouchableOpacity onPress={() => {
            setRecentFoods([]);
            AsyncStorage.removeItem('recent_foods_premium');
          }}>
            <Text style={styles.clearText}>Temizle</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentFoods.slice(0, 10).map((item, idx) => (
            <TouchableOpacity 
              key={item.id + idx}
              style={styles.recentCard}
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
              <Text style={styles.recentEmoji}>{getFoodEmoji(item.name)}</Text>
              <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.recentCal}>{item.calories} kcal</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.darkText} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Yemek Ekle</Text>
          <Text style={styles.headerSubtitle}>{FOOD_DATABASE.length.toLocaleString()} yemek</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => setShowSearch(!showSearch)} 
          style={[styles.searchToggle, showSearch && styles.searchToggleActive]}
        >
          <Ionicons name={showSearch ? "close" : "search"} size={22} color={showSearch ? "#FFF" : Colors.primary} />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar (Animated) */}
      <Animated.View style={[
        styles.searchContainer,
        {
          height: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 60] }),
          opacity: searchAnim,
          marginBottom: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 12] }),
        }
      ]}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={Colors.lightText} />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Yemek ara... (örn: tavuk, pilav, salata)"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      
      {/* Kategoriler */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {FOOD_CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} item={cat} isSelected={selectedCategory === cat.id} />
          ))}
        </ScrollView>
      </View>
      
      {/* Son Eklenenler */}
      <RecentSection />
      
      {/* Sonuç Bilgisi */}
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>
          {searchQuery.length > 0 
            ? `"${searchQuery}" için ${filteredFoods.length} sonuç`
            : `${FOOD_CATEGORIES.find(c => c.id === selectedCategory)?.emoji || '🍽️'} ${filteredFoods.length} yemek`
          }
        </Text>
      </View>
      
      {/* Yemek Listesi */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.food_id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>Sonuç bulunamadı</Text>
            <Text style={styles.emptyText}>Farklı kelimeler deneyin</Text>
          </View>
        }
        renderItem={({ item }) => <PremiumFoodCard item={item} />}
      />
      
      {/* Quick Add Modal */}
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
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.darkText },
  headerSubtitle: { fontSize: 12, color: Colors.lightText, marginTop: 2 },
  searchToggle: { 
    width: 40, height: 40, borderRadius: 20, 
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center', alignItems: 'center' 
  },
  searchToggleActive: { backgroundColor: Colors.primary },
  
  // Search
  searchContainer: { paddingHorizontal: 16, overflow: 'hidden' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 16, color: Colors.darkText },
  
  // Categories
  categoriesContainer: { backgroundColor: '#FFF', paddingVertical: 12 },
  categoriesScroll: { paddingHorizontal: 12, gap: 8 },
  categoryCard: { 
    borderRadius: 12, 
    overflow: 'hidden',
    minWidth: 70,
  },
  categoryCardSelected: { 
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryGradient: { 
    paddingHorizontal: 14, 
    paddingVertical: 10, 
    alignItems: 'center',
    minWidth: 70,
  },
  categoryInner: { 
    paddingHorizontal: 14, 
    paddingVertical: 10, 
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    minWidth: 70,
  },
  categoryEmoji: { fontSize: 22, marginBottom: 4 },
  categoryName: { fontSize: 12, fontWeight: '600', color: Colors.darkText },
  categoryNameSelected: { fontSize: 12, fontWeight: '600', color: '#FFF' },
  
  // Recent
  recentSection: { padding: 16, paddingBottom: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.darkText },
  clearText: { fontSize: 13, color: Colors.primary },
  recentCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    width: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentEmoji: { fontSize: 28, marginBottom: 6 },
  recentName: { fontSize: 11, color: Colors.darkText, textAlign: 'center', fontWeight: '500' },
  recentCal: { fontSize: 10, color: Colors.lightText, marginTop: 4 },
  
  // Results
  resultsInfo: { paddingHorizontal: 16, paddingBottom: 8 },
  resultsText: { fontSize: 13, color: Colors.lightText, fontWeight: '500' },
  
  // List
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },
  
  // Premium Card
  premiumCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  emojiContainer: {
    width: 50, height: 50, borderRadius: 14,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  foodEmoji: { fontSize: 28 },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '600', color: Colors.darkText, marginBottom: 6, lineHeight: 20 },
  macrosRow: { flexDirection: 'row', gap: 8 },
  macroChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  macroDot: { width: 6, height: 6, borderRadius: 3 },
  macroText: { fontSize: 11, color: Colors.lightText, fontWeight: '500' },
  cardRight: { alignItems: 'center', gap: 6 },
  favButton: { padding: 4 },
  caloriesBadge: { 
    paddingHorizontal: 10, paddingVertical: 6, 
    borderRadius: 10, alignItems: 'center',
    minWidth: 55,
  },
  caloriesValue: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  caloriesUnit: { fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: -2 },
  addBtn: { 
    width: 32, height: 32, borderRadius: 16, 
    backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  
  // Empty
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: Colors.darkText, marginBottom: 4 },
  emptyText: { fontSize: 14, color: Colors.lightText },
  
  // Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalCard: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  modalEmojiBox: { 
    width: 56, height: 56, borderRadius: 16, 
    backgroundColor: '#f5f5f5', 
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  modalEmoji: { fontSize: 32 },
  modalTitleBox: { flex: 1 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: Colors.darkText, marginBottom: 4 },
  modalSubtitle: { fontSize: 13, color: Colors.lightText },
  modalClose: { padding: 4 },
  
  // Portion
  portionSection: { marginBottom: 24 },
  portionLabel: { fontSize: 15, fontWeight: '600', color: Colors.darkText, marginBottom: 16, textAlign: 'center' },
  portionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  portionBtnLarge: { 
    width: 52, height: 52, borderRadius: 26, 
    backgroundColor: '#f0f0f0',
    justifyContent: 'center', alignItems: 'center',
  },
  portionDisplay: { flexDirection: 'row', alignItems: 'baseline' },
  portionValue: { fontSize: 48, fontWeight: '700', color: Colors.primary },
  portionX: { fontSize: 24, color: Colors.lightText, marginLeft: 4 },
  quickPortions: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16 },
  quickPortionChip: { 
    paddingHorizontal: 16, paddingVertical: 8, 
    borderRadius: 20, backgroundColor: '#f5f5f5',
  },
  quickPortionActive: { backgroundColor: Colors.primary },
  quickPortionText: { fontSize: 14, fontWeight: '600', color: Colors.darkText },
  quickPortionTextActive: { color: '#FFF' },
  
  // Nutrition
  nutritionSummary: { marginBottom: 24 },
  nutritionMain: { alignItems: 'center', marginBottom: 16 },
  calorieCircle: { 
    width: 100, height: 100, borderRadius: 50,
    justifyContent: 'center', alignItems: 'center',
  },
  calorieNumber: { fontSize: 28, fontWeight: '700', color: '#FFF' },
  calorieLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: -2 },
  macroBoxes: { flexDirection: 'row', gap: 12 },
  macroBox: { 
    flex: 1, backgroundColor: '#f8f8f8', borderRadius: 12, 
    padding: 12, alignItems: 'center',
    borderLeftWidth: 3,
  },
  macroBoxValue: { fontSize: 18, fontWeight: '700', color: Colors.darkText },
  macroBoxLabel: { fontSize: 11, color: Colors.lightText, marginTop: 2 },
  
  // Add Button
  addMealBtn: { borderRadius: 14, overflow: 'hidden' },
  addMealGradient: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16, gap: 8,
  },
  addMealText: { fontSize: 17, fontWeight: '600', color: '#FFF' },
  
  // Loading
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center', alignItems: 'center',
  },
});
