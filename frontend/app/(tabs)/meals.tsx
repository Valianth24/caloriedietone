import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { searchFoods, FOOD_DATABASE, FoodItem, getHighProteinFoods, getLowCalorieFoods } from '../../content/foodDatabase';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Kategoriler
const FOOD_CATEGORIES = [
  { id: 'all', name: 'Tümü', name_en: 'All', icon: 'apps', color: '#667eea' },
  { id: 'meat', name: 'Et & Tavuk', name_en: 'Meat & Poultry', icon: 'nutrition', color: '#e74c3c', keywords: ['tavuk', 'et', 'dana', 'kuzu', 'biftek', 'köfte', 'pirzola', 'kıyma', 'chicken', 'beef', 'lamb', 'meat'] },
  { id: 'fish', name: 'Balık & Deniz', name_en: 'Fish & Seafood', icon: 'fish', color: '#3498db', keywords: ['balık', 'somon', 'ton', 'levrek', 'karides', 'fish', 'salmon', 'tuna', 'seafood'] },
  { id: 'dairy', name: 'Süt Ürünleri', name_en: 'Dairy', icon: 'water', color: '#f1c40f', keywords: ['süt', 'yoğurt', 'peynir', 'ayran', 'kefir', 'milk', 'yogurt', 'cheese'] },
  { id: 'grains', name: 'Tahıllar', name_en: 'Grains', icon: 'leaf', color: '#e67e22', keywords: ['ekmek', 'makarna', 'pirinç', 'pilav', 'bulgur', 'yulaf', 'bread', 'pasta', 'rice'] },
  { id: 'veggies', name: 'Sebzeler', name_en: 'Vegetables', icon: 'leaf', color: '#27ae60', keywords: ['salata', 'domates', 'havuç', 'brokoli', 'ıspanak', 'kabak', 'patlıcan', 'salad', 'tomato', 'carrot'] },
  { id: 'fruits', name: 'Meyveler', name_en: 'Fruits', icon: 'nutrition', color: '#9b59b6', keywords: ['elma', 'muz', 'portakal', 'çilek', 'karpuz', 'apple', 'banana', 'orange', 'strawberry'] },
  { id: 'soup', name: 'Çorbalar', name_en: 'Soups', icon: 'cafe', color: '#1abc9c', keywords: ['çorba', 'mercimek', 'soup'] },
  { id: 'fastfood', name: 'Fast Food', name_en: 'Fast Food', icon: 'fast-food', color: '#e74c3c', keywords: ['pizza', 'hamburger', 'döner', 'lahmacun', 'burger', 'kebab'] },
  { id: 'dessert', name: 'Tatlılar', name_en: 'Desserts', icon: 'ice-cream', color: '#fd79a8', keywords: ['tatlı', 'baklava', 'dondurma', 'çikolata', 'kek', 'kurabiye', 'dessert', 'cake', 'chocolate', 'ice cream'] },
  { id: 'drinks', name: 'İçecekler', name_en: 'Drinks', icon: 'wine', color: '#00cec9', keywords: ['kahve', 'çay', 'meyve suyu', 'kola', 'coffee', 'tea', 'juice', 'drink'] },
  { id: 'nuts', name: 'Kuruyemiş', name_en: 'Nuts', icon: 'ellipse', color: '#fdcb6e', keywords: ['ceviz', 'badem', 'fındık', 'fıstık', 'walnut', 'almond', 'hazelnut', 'nut'] },
];

type RecentScan = {
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
  const [activeTab, setActiveTab] = useState<'main' | 'search' | 'recent'>('main');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentScans, setRecentScans] = useState<RecentScan[]>([]);
  const [loading, setLoading] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddItem, setQuickAddItem] = useState<FoodItem | null>(null);
  const [portion, setPortion] = useState(1);
  
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  useEffect(() => {
    loadRecentScans();
  }, []);

  const loadRecentScans = async () => {
    try {
      const stored = await AsyncStorage.getItem('recent_food_scans');
      if (stored) {
        setRecentScans(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recent scans:', error);
    }
  };

  // Filtrelenmiş yemekler
  const filteredFoods = useMemo(() => {
    let results: FoodItem[] = [];
    
    if (searchQuery.length >= 2) {
      results = searchFoods(searchQuery, lang, 100);
    } else if (selectedCategory !== 'all') {
      const category = FOOD_CATEGORIES.find(c => c.id === selectedCategory);
      if (category?.keywords) {
        results = FOOD_DATABASE.filter(food => {
          const name = lang === 'en' ? food.name_en.toLowerCase() : food.name.toLowerCase();
          return category.keywords!.some(kw => name.includes(kw.toLowerCase()));
        }).slice(0, 100);
      }
    } else {
      // Varsayılan: popüler yemekler
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

      // Son eklenenler listesine kaydet
      const newRecent: RecentScan = {
        id: food.food_id,
        name: lang === 'en' ? food.name_en : food.name,
        calories: Math.round(food.calories * portionMultiplier),
        protein: Math.round(food.protein * portionMultiplier * 10) / 10,
        carbs: Math.round(food.carbs * portionMultiplier * 10) / 10,
        fat: Math.round(food.fat * portionMultiplier * 10) / 10,
        timestamp: Date.now(),
      };
      
      const updatedRecents = [newRecent, ...recentScans.filter(r => r.id !== food.food_id)].slice(0, 20);
      setRecentScans(updatedRecents);
      await AsyncStorage.setItem('recent_food_scans', JSON.stringify(updatedRecents));

      Alert.alert(
        t('success') || '✅ Başarılı', 
        `${lang === 'en' ? food.name_en : food.name} ${t('added') || 'eklendi'}!`
      );
      setShowQuickAdd(false);
      setQuickAddItem(null);
      setPortion(1);
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Add meal error:', error);
      Alert.alert(t('error') || 'Hata', error.message || t('mealAddError') || 'Yemek eklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const openQuickAddModal = (food: FoodItem) => {
    setQuickAddItem(food);
    setPortion(1);
    setShowQuickAdd(true);
  };

  // Makro bar komponenti
  const MacroBar = ({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) => {
    const total = protein + carbs + fat;
    if (total === 0) return null;
    
    return (
      <View style={styles.macroBar}>
        <View style={[styles.macroSegment, { flex: protein, backgroundColor: '#3498db' }]} />
        <View style={[styles.macroSegment, { flex: carbs, backgroundColor: '#f1c40f' }]} />
        <View style={[styles.macroSegment, { flex: fat, backgroundColor: '#e74c3c' }]} />
      </View>
    );
  };

  // Yemek kartı
  const FoodCard = ({ item, onPress, onQuickAdd }: { item: FoodItem; onPress: () => void; onQuickAdd: () => void }) => (
    <TouchableOpacity style={styles.premiumFoodCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.foodCardLeft}>
        <View style={styles.foodEmoji}>
          <Text style={styles.foodEmojiText}>🍽️</Text>
        </View>
        <View style={styles.foodCardInfo}>
          <Text style={styles.foodCardName} numberOfLines={2}>
            {lang === 'en' ? item.name_en : item.name}
          </Text>
          <View style={styles.macroRow}>
            <Text style={styles.macroText}>
              <Text style={{ color: '#3498db' }}>P:</Text> {item.protein}g  
              <Text style={{ color: '#f1c40f' }}> K:</Text> {item.carbs}g  
              <Text style={{ color: '#e74c3c' }}> Y:</Text> {item.fat}g
            </Text>
          </View>
          <MacroBar protein={item.protein} carbs={item.carbs} fat={item.fat} />
        </View>
      </View>
      <View style={styles.foodCardRight}>
        <Text style={styles.caloriesBadge}>{item.calories}</Text>
        <Text style={styles.kcalText}>kcal</Text>
        <TouchableOpacity 
          style={styles.quickAddBtn} 
          onPress={(e) => { e.stopPropagation(); onQuickAdd(); }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="add-circle" size={32} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Hızlı Ekle Modal
  const QuickAddModal = () => {
    if (!quickAddItem) return null;
    
    const adjustedCalories = Math.round(quickAddItem.calories * portion);
    const adjustedProtein = Math.round(quickAddItem.protein * portion * 10) / 10;
    const adjustedCarbs = Math.round(quickAddItem.carbs * portion * 10) / 10;
    const adjustedFat = Math.round(quickAddItem.fat * portion * 10) / 10;
    
    return (
      <Modal visible={showQuickAdd} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {lang === 'en' ? quickAddItem.name_en : quickAddItem.name}
              </Text>
              <TouchableOpacity onPress={() => setShowQuickAdd(false)}>
                <Ionicons name="close-circle" size={28} color={Colors.lightText} />
              </TouchableOpacity>
            </View>
            
            {/* Porsiyon Ayarı */}
            <View style={styles.portionSection}>
              <Text style={styles.portionLabel}>{t('portion') || 'Porsiyon'}</Text>
              <View style={styles.portionControls}>
                <TouchableOpacity 
                  style={styles.portionBtn} 
                  onPress={() => setPortion(Math.max(0.25, portion - 0.25))}
                >
                  <Ionicons name="remove" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <View style={styles.portionDisplay}>
                  <Text style={styles.portionValue}>{portion}x</Text>
                </View>
                <TouchableOpacity 
                  style={styles.portionBtn} 
                  onPress={() => setPortion(Math.min(5, portion + 0.25))}
                >
                  <Ionicons name="add" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              
              {/* Hızlı Porsiyon Seçimleri */}
              <View style={styles.quickPortions}>
                {[0.5, 1, 1.5, 2].map(p => (
                  <TouchableOpacity 
                    key={p} 
                    style={[styles.quickPortionBtn, portion === p && styles.quickPortionBtnActive]}
                    onPress={() => setPortion(p)}
                  >
                    <Text style={[styles.quickPortionText, portion === p && styles.quickPortionTextActive]}>
                      {p === 0.5 ? '½' : p === 1.5 ? '1½' : p}x
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Besin Değerleri */}
            <View style={styles.nutritionGrid}>
              <View style={[styles.nutritionItem, { backgroundColor: '#667eea15' }]}>
                <Ionicons name="flame" size={20} color="#667eea" />
                <Text style={styles.nutritionValue}>{adjustedCalories}</Text>
                <Text style={styles.nutritionLabel}>kcal</Text>
              </View>
              <View style={[styles.nutritionItem, { backgroundColor: '#3498db15' }]}>
                <Text style={styles.nutritionIcon}>P</Text>
                <Text style={styles.nutritionValue}>{adjustedProtein}g</Text>
                <Text style={styles.nutritionLabel}>{t('protein') || 'Protein'}</Text>
              </View>
              <View style={[styles.nutritionItem, { backgroundColor: '#f1c40f15' }]}>
                <Text style={styles.nutritionIcon}>K</Text>
                <Text style={styles.nutritionValue}>{adjustedCarbs}g</Text>
                <Text style={styles.nutritionLabel}>{t('carbs') || 'Karb'}</Text>
              </View>
              <View style={[styles.nutritionItem, { backgroundColor: '#e74c3c15' }]}>
                <Text style={styles.nutritionIcon}>Y</Text>
                <Text style={styles.nutritionValue}>{adjustedFat}g</Text>
                <Text style={styles.nutritionLabel}>{t('fat') || 'Yağ'}</Text>
              </View>
            </View>
            
            {/* Ekle Butonu */}
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addMealToDay(quickAddItem, portion)}
              disabled={loading}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Ionicons name="add-circle" size={22} color="#FFF" />
                    <Text style={styles.addButtonText}>
                      {t('addMeal') || 'Yemeği Ekle'} ({adjustedCalories} kcal)
                    </Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Ana ekran
  const renderMainOptions = () => (
    <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerSection}>
        <Text style={styles.mainHeaderTitle}>{t('addCalorie') || 'Kalori Ekle'}</Text>
        <Text style={styles.headerSubtitle}>
          {FOOD_DATABASE.length.toLocaleString()} {t('foodsAvailable') || 'yemek mevcut'}
        </Text>
      </View>

      <View style={styles.optionCards}>
        {/* Fotoğraf */}
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => router.push('/(tabs)/camera')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionGradient}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="camera" size={28} color="#FFF" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle} numberOfLines={1}>{t('photoCalc') || 'Fotoğrafla Hesapla'}</Text>
              <Text style={styles.optionDescription} numberOfLines={2}>{t('photoCalcDesc') || 'AI ile kalori hesapla'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Son Hesaplananlar */}
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => setActiveTab('recent')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#11998e', '#38ef7d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionGradient}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="time" size={28} color="#FFF" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle} numberOfLines={1}>{t('recentCalc') || 'Son Hesaplananlar'}</Text>
              <Text style={styles.optionDescription} numberOfLines={1}>{recentScans.length} {t('records') || 'kayıt'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Listeden Seç */}
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => setActiveTab('search')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionGradient}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="search" size={28} color="#FFF" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle} numberOfLines={1}>{t('selectFromList') || 'Listeden Seç'}</Text>
              <Text style={styles.optionDescription} numberOfLines={1}>{FOOD_DATABASE.length.toLocaleString()}+ {t('foods') || 'yemek'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Hızlı Ekle */}
      <View style={styles.quickAddSection}>
        <Text style={styles.quickAddTitle}>{t('quickAdd') || 'Hızlı Ekle'}</Text>
        <View style={styles.quickAddButtons}>
          {[
            { icon: 'water', label: t('water') || 'Su', color: Colors.teal, cal: 0 },
            { icon: 'cafe', label: t('coffee') || 'Kahve', color: '#8B4513', cal: 5 },
            { icon: 'nutrition', label: t('apple') || 'Elma', color: '#FF6B6B', cal: 52 },
            { icon: 'pizza', label: t('snack') || 'Atıştırma', color: '#FFA500', cal: 150 },
          ].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.quickAddButton}
              onPress={() => {
                const quickFood: FoodItem = {
                  food_id: `quick_${index}`,
                  name: item.label,
                  name_en: item.label,
                  calories: item.cal,
                  protein: 0, carbs: 0, fat: 0,
                };
                addMealToDay(quickFood, 1);
              }}
            >
              <View style={[styles.quickAddIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>
              <Text style={styles.quickAddLabel} numberOfLines={1}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );

  // Son Hesaplananlar
  const renderRecentScans = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity style={styles.backRow} onPress={() => setActiveTab('main')}>
        <Ionicons name="arrow-back" size={22} color={Colors.darkText} />
        <Text style={styles.backText}>{t('back') || 'Geri'}</Text>
      </TouchableOpacity>

      {recentScans.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="time-outline" size={48} color={Colors.lightText} />
          <Text style={styles.emptyText}>{t('noRecords') || 'Henüz kayıt yok'}</Text>
        </View>
      ) : (
        <FlatList
          data={recentScans}
          keyExtractor={(item) => item.id + item.timestamp}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.premiumFoodCard} 
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
                openQuickAddModal(food);
              }}
            >
              <View style={styles.foodCardLeft}>
                <View style={styles.foodEmoji}>
                  <Ionicons name="time" size={24} color={Colors.primary} />
                </View>
                <View style={styles.foodCardInfo}>
                  <Text style={styles.foodCardName} numberOfLines={2}>{item.name}</Text>
                  <View style={styles.macroRow}>
                    <Text style={styles.macroText}>
                      <Text style={{ color: '#3498db' }}>P:</Text> {item.protein}g  
                      <Text style={{ color: '#f1c40f' }}> K:</Text> {item.carbs}g  
                      <Text style={{ color: '#e74c3c' }}> Y:</Text> {item.fat}g
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.foodCardRight}>
                <Text style={styles.caloriesBadge}>{item.calories}</Text>
                <Text style={styles.kcalText}>kcal</Text>
                <Ionicons name="add-circle" size={32} color={Colors.primary} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );

  // Premium Arama Ekranı
  const renderSearchTab = () => (
    <View style={styles.searchTabContainer}>
      {/* Header */}
      <View style={styles.searchHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { setActiveTab('main'); setSearchQuery(''); setSelectedCategory('all'); }}>
          <Ionicons name="arrow-back" size={24} color={Colors.darkText} />
        </TouchableOpacity>
        
        {/* Arama Kutusu */}
        <View style={styles.premiumSearchBox}>
          <Ionicons name="search" size={20} color={Colors.primary} />
          <TextInput
            style={styles.premiumSearchInput}
            placeholder={t('searchFood') || 'Yemek ara... (6000+ yemek)'}
            placeholderTextColor={Colors.lightText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.lightText} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Kategoriler */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {FOOD_CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              selectedCategory === cat.id && { backgroundColor: cat.color }
            ]}
            onPress={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
          >
            <Ionicons 
              name={cat.icon as any} 
              size={16} 
              color={selectedCategory === cat.id ? '#FFF' : cat.color} 
            />
            <Text style={[
              styles.categoryChipText,
              selectedCategory === cat.id && { color: '#FFF' }
            ]}>
              {lang === 'en' ? cat.name_en : cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Sonuç Sayısı */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredFoods.length} {t('resultsFound') || 'sonuç bulundu'}
        </Text>
        {searchQuery.length > 0 && (
          <Text style={styles.searchingFor}>"{searchQuery}"</Text>
        )}
      </View>

      {/* Yemek Listesi */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.food_id}
        contentContainerStyle={styles.foodListContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={Colors.lightText} />
            <Text style={styles.emptyText}>
              {searchQuery.length > 0 
                ? (t('noResults') || 'Sonuç bulunamadı') 
                : (t('typeToSearch') || 'Aramak için yazın veya kategori seçin')}
            </Text>
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearSearchBtn}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearSearchText}>{t('clearSearch') || 'Aramayı Temizle'}</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <FoodCard 
            item={item} 
            onPress={() => router.push({
              pathname: '/details/meal-detail',
              params: { 
                food_id: item.food_id, 
                name: lang === 'en' ? item.name_en : item.name, 
                calories: item.calories, 
                protein: item.protein, 
                carbs: item.carbs, 
                fat: item.fat 
              },
            })}
            onQuickAdd={() => openQuickAddModal(item)}
          />
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="close" size={26} color={Colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitleText} numberOfLines={1}>
          {activeTab === 'recent' ? (t('recentCalc') || 'Son Hesaplananlar') : 
           activeTab === 'search' ? (t('searchFood') || 'Yemek Ara') : (t('addCalorie') || 'Kalori Ekle')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}

      {activeTab === 'main' && renderMainOptions()}
      {activeTab === 'recent' && renderRecentScans()}
      {activeTab === 'search' && renderSearchTab()}
      
      <QuickAddModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerButton: { padding: 6 },
  headerTitleText: { fontSize: 17, fontWeight: '600', color: Colors.darkText, flex: 1, textAlign: 'center' },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  
  // Ana Ekran
  optionsContainer: { flex: 1, paddingHorizontal: 16 },
  headerSection: { alignItems: 'center', paddingVertical: 16 },
  mainHeaderTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.darkText, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: Colors.lightText, textAlign: 'center' },
  optionCards: { gap: 12, marginBottom: 20 },
  optionCard: { borderRadius: 16, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  optionGradient: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16 },
  optionIconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  optionContent: { flex: 1 },
  optionTitle: { fontSize: 17, fontWeight: '600', color: '#FFF', marginBottom: 3 },
  optionDescription: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  
  // Hızlı Ekle
  quickAddSection: { marginTop: 8 },
  quickAddTitle: { fontSize: 17, fontWeight: '600', color: Colors.darkText, marginBottom: 14 },
  quickAddButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  quickAddButton: { alignItems: 'center', width: (screenWidth - 64) / 4 },
  quickAddIcon: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  quickAddLabel: { fontSize: 12, color: Colors.darkText, fontWeight: '500', textAlign: 'center' },
  
  // Tab Content
  tabContent: { flex: 1, padding: 16 },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  backText: { fontSize: 16, color: Colors.darkText, fontWeight: '500' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 15, color: Colors.lightText, marginTop: 12, textAlign: 'center' },
  listContent: { paddingBottom: 100 },
  
  // Premium Arama
  searchTabContainer: { flex: 1 },
  searchHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  backBtn: { padding: 4 },
  premiumSearchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  premiumSearchInput: { flex: 1, fontSize: 16, color: Colors.darkText, padding: 0 },
  
  // Kategoriler
  categoriesScroll: { maxHeight: 50, marginTop: 4 },
  categoriesContent: { paddingHorizontal: 12, gap: 8, alignItems: 'center' },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  categoryChipText: { fontSize: 13, fontWeight: '500', color: Colors.darkText },
  
  // Sonuçlar
  resultsHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  resultsCount: { fontSize: 13, color: Colors.lightText },
  searchingFor: { fontSize: 13, color: Colors.primary, fontWeight: '500' },
  foodListContent: { paddingHorizontal: 12, paddingBottom: 100 },
  
  // Premium Yemek Kartı
  premiumFoodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  foodCardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  foodEmoji: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  foodEmojiText: { fontSize: 22 },
  foodCardInfo: { flex: 1 },
  foodCardName: { fontSize: 15, fontWeight: '600', color: Colors.darkText, marginBottom: 4, lineHeight: 20 },
  macroRow: { marginBottom: 4 },
  macroText: { fontSize: 12, color: Colors.lightText },
  macroBar: { flexDirection: 'row', height: 4, borderRadius: 2, overflow: 'hidden', backgroundColor: '#F0F0F0' },
  macroSegment: { height: '100%' },
  foodCardRight: { alignItems: 'center', marginLeft: 8 },
  caloriesBadge: { fontSize: 20, fontWeight: 'bold', color: Colors.primary },
  kcalText: { fontSize: 11, color: Colors.lightText, marginBottom: 4 },
  quickAddBtn: { marginTop: 2 },
  
  // Clear Search
  clearSearchBtn: { marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Colors.primary + '15', borderRadius: 20 },
  clearSearchText: { color: Colors.primary, fontWeight: '600' },
  
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.darkText, flex: 1, marginRight: 12 },
  
  // Porsiyon
  portionSection: { marginBottom: 20 },
  portionLabel: { fontSize: 15, fontWeight: '600', color: Colors.darkText, marginBottom: 12 },
  portionControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  portionBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  portionDisplay: { paddingHorizontal: 24, paddingVertical: 8, backgroundColor: Colors.primary + '15', borderRadius: 12 },
  portionValue: { fontSize: 24, fontWeight: 'bold', color: Colors.primary },
  quickPortions: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 12 },
  quickPortionBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#E8E8E8' },
  quickPortionBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  quickPortionText: { fontSize: 14, fontWeight: '500', color: Colors.darkText },
  quickPortionTextActive: { color: '#FFF' },
  
  // Nutrition Grid
  nutritionGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  nutritionItem: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 12 },
  nutritionIcon: { fontSize: 16, fontWeight: 'bold', color: Colors.darkText },
  nutritionValue: { fontSize: 18, fontWeight: 'bold', color: Colors.darkText, marginTop: 4 },
  nutritionLabel: { fontSize: 11, color: Colors.lightText, marginTop: 2 },
  
  // Add Button
  addButton: { borderRadius: 14, overflow: 'hidden' },
  addButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, gap: 8 },
  addButtonText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
});
