import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';
import { Colors } from '../../constants/Colors';
import WatchAdModal from '../../components/WatchAdModal';
import { needsAdForRecipe, incrementRecipeViews, showRewardedAd, getRecipeViews } from '../../utils/adSystem';
import {
  getAllRecipeMetadata,
  getRecipesByCategory,
  getFeaturedRecipes,
  getRecipesByTag,
  getAllCategories,
  getCategoryLabel,
  getDifficultyLabel,
  RecipeId,
  RECIPE_CATEGORIES,
  CATEGORY_LABELS,
  getAllAthleteRecipeMetadata,
  ATHLETE_RECIPE_NAMES,
  ATHLETE_RECIPE_NUTRITION,
} from '../../content/recipes';
import type { RecipeMetadata, RecipeCategory } from '../../types/recipe';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// Özel Koleksiyonlar (Collections)
const RECIPE_COLLECTIONS = {
  favorites: {
    id: 'favorites',
    labelTr: 'Favori Tarifler',
    labelEn: 'Favorite Recipes',
    icon: 'heart',
    color: '#e11d48',
    descTr: 'Kaydettiğiniz tarifler',
    descEn: 'Your saved recipes',
    filter: (_recipes: RecipeMetadata[], favoriteIds: string[]) => 
      _recipes.filter(r => favoriteIds.includes(r.id)),
  },
  athlete: {
    id: 'athlete',
    labelTr: 'Sporcu Tarifleri',
    labelEn: 'Athlete Recipes',
    icon: 'barbell-outline',
    color: '#E53935',
    descTr: 'Yüksek protein, kas yapıcı tarifler',
    descEn: 'High protein muscle building recipes',
    filter: (_recipes: RecipeMetadata[]) => getAllAthleteRecipeMetadata(),
  },
  traditional: {
    id: 'traditional',
    labelTr: 'Yöresel Tarifler',
    labelEn: 'Traditional Recipes',
    icon: 'home-outline',
    color: '#8D6E63',
    descTr: 'Türk mutfağından lezzetler',
    descEn: 'Flavors from Turkish cuisine',
    filter: (recipes: RecipeMetadata[]) => recipes.filter(r => 
      ['lentil_soup', 'stuffed_peppers', 'lentil_curry', 'hummus'].includes(r.id) ||
      r.tags.includes('mediterranean')
    ),
  },
  dessert: {
    id: 'dessert',
    labelTr: 'Tatlı Tarifleri',
    labelEn: 'Dessert Recipes',
    icon: 'ice-cream-outline',
    color: '#EC407A',
    descTr: 'Sağlıklı ve lezzetli tatlılar',
    descEn: 'Healthy and delicious desserts',
    filter: (recipes: RecipeMetadata[]) => recipes.filter(r => r.category === 'dessert'),
  },
  quick: {
    id: 'quick',
    labelTr: 'Hızlı Tarifler',
    labelEn: 'Quick Recipes',
    icon: 'flash-outline',
    color: '#FF9800',
    descTr: '30 dakika altında hazır',
    descEn: 'Ready in under 30 minutes',
    filter: (recipes: RecipeMetadata[]) => recipes.filter(r => r.tags.includes('quick')),
  },
  vegan: {
    id: 'vegan',
    labelTr: 'Vegan Tarifler',
    labelEn: 'Vegan Recipes',
    icon: 'leaf-outline',
    color: '#4CAF50',
    descTr: 'Tamamen bitkisel tarifler',
    descEn: 'Fully plant-based recipes',
    filter: (recipes: RecipeMetadata[]) => recipes.filter(r => r.tags.includes('vegan')),
  },
  lowcarb: {
    id: 'lowcarb',
    labelTr: 'Düşük Karbonhidrat',
    labelEn: 'Low Carb',
    icon: 'analytics-outline',
    color: '#2196F3',
    descTr: 'Keto ve düşük karbonhidrat',
    descEn: 'Keto and low carb friendly',
    filter: (recipes: RecipeMetadata[]) => recipes.filter(r => r.tags.includes('low_carb') || r.tags.includes('keto')),
  },
};

type CollectionId = keyof typeof RECIPE_COLLECTIONS;

export default function RecipesScreen() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();
  const locale = i18n.language?.startsWith('tr') ? 'tr' : 'en';

  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'all'>('all');
  const [selectedCollection, setSelectedCollection] = useState<CollectionId | null>(null);
  const [recipes, setRecipes] = useState<RecipeMetadata[]>([]);
  const [featuredRecipes, setFeaturedRecipes] = useState<RecipeMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingRecipe, setPendingRecipe] = useState<RecipeMetadata | null>(null);
  const [recipeViewCount, setRecipeViewCount] = useState(0);
  
  // Favori tarifler
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  const isPremium = user?.is_premium || false;
  const allRecipes = getAllRecipeMetadata();

  useEffect(() => {
    loadFavoriteRecipes();
  }, []);

  useEffect(() => {
    loadRecipes();
    loadViewCount();
  }, [selectedCategory, selectedCollection, favoriteRecipes]);
  
  const loadFavoriteRecipes = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorite_recipes_v2');
      if (stored) setFavoriteRecipes(JSON.parse(stored));
    } catch (e) { console.error(e); }
  };

  const toggleFavoriteRecipe = async (recipeId: string) => {
    const newFavorites = favoriteRecipes.includes(recipeId)
      ? favoriteRecipes.filter(id => id !== recipeId)
      : [...favoriteRecipes, recipeId];
    setFavoriteRecipes(newFavorites);
    await AsyncStorage.setItem('favorite_recipes_v2', JSON.stringify(newFavorites));
  };

  const loadViewCount = async () => {
    const count = await getRecipeViews();
    setRecipeViewCount(count);
  };

  const loadRecipes = () => {
    setLoading(true);
    try {
      if (selectedCollection) {
        const collection = RECIPE_COLLECTIONS[selectedCollection];
        if (selectedCollection === 'favorites') {
          setRecipes(collection.filter(allRecipes, favoriteRecipes));
        } else {
          setRecipes(collection.filter(allRecipes, []));
        }
      } else if (selectedCategory === 'all') {
        setRecipes(allRecipes);
      } else {
        setRecipes(getRecipesByCategory(selectedCategory));
      }
      setFeaturedRecipes(getFeaturedRecipes());
    } catch (error) {
      console.error('Error loading recipes:', error);
      setRecipes([]);
      setFeaturedRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionPress = (collectionId: CollectionId) => {
    if (selectedCollection === collectionId) {
      setSelectedCollection(null);
      setSelectedCategory('all');
    } else {
      setSelectedCollection(collectionId);
      setSelectedCategory('all');
    }
  };

  const handleRecipePress = async (recipe: RecipeMetadata) => {
    try {
      // Reklam gerekli mi kontrol et
      const needsAd = await needsAdForRecipe();
      
      if (needsAd) {
        // Reklam modal göster
        setPendingRecipe(recipe);
        setShowAdModal(true);
        return;
      }

      // View count artır ve yönlendir
      const newCount = await incrementRecipeViews();
      setRecipeViewCount(newCount);
      
      router.push({
        pathname: '/details/recipe-detail',
        params: { recipeId: recipe.id },
      });
    } catch (error) {
      console.error('Error navigating to recipe detail:', error);
    }
  };
  
  const handleWatchAd = async () => {
    try {
      // Reklam göster (simülasyon - yayından sonra gerçek entegrasyon)
      await showRewardedAd('recipe');
      
      // Count'u sıfırla
      setRecipeViewCount(0);
      
      // Bekleyen tarife git
      if (pendingRecipe) {
        router.push({
          pathname: '/details/recipe-detail',
          params: { recipeId: pendingRecipe.id },
        });
        setPendingRecipe(null);
      }
    } catch (error) {
      console.error('Error watching ad:', error);
      Alert.alert('Hata', 'Reklam yüklenemedi. Lütfen tekrar deneyin.');
    }
  };

  const categories = getAllCategories(locale);

  const renderCollectionCard = (collectionId: CollectionId) => {
    const collection = RECIPE_COLLECTIONS[collectionId];
    // Favoriler için özel sayı hesaplama
    const collectionRecipes = collectionId === 'favorites' 
      ? collection.filter(allRecipes, favoriteRecipes)
      : collection.filter(allRecipes, []);
    const isSelected = selectedCollection === collectionId;
    
    return (
      <TouchableOpacity
        key={collectionId}
        style={[
          styles.collectionCard,
          { borderColor: collection.color },
          isSelected && { backgroundColor: collection.color + '20', borderWidth: 2 },
        ]}
        onPress={() => handleCollectionPress(collectionId)}
        activeOpacity={0.7}
      >
        <View style={[styles.collectionIconContainer, { backgroundColor: collection.color + '20' }]}>
          <Ionicons name={collection.icon as any} size={28} color={collection.color} />
        </View>
        <Text style={styles.collectionTitle}>
          {locale === 'tr' ? collection.labelTr : collection.labelEn}
        </Text>
        <Text style={styles.collectionDesc} numberOfLines={2}>
          {locale === 'tr' ? collection.descTr : collection.descEn}
        </Text>
        <View style={styles.collectionCount}>
          <Text style={[styles.collectionCountText, { color: collection.color }]}>
            {collectionRecipes.length} {t('recipe')}
          </Text>
        </View>
        {isSelected && (
          <View style={[styles.selectedBadge, { backgroundColor: collection.color }]}>
            <Ionicons name="checkmark" size={12} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item }: { item: { id: RecipeCategory | 'all'; label: string; icon: string; color: string; count: number } }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && { backgroundColor: item.color || Colors.primary },
      ]}
      onPress={() => setSelectedCategory(item.id as RecipeCategory | 'all')}
    >
      <Ionicons
        name={item.icon as any}
        size={18}
        color={selectedCategory === item.id ? '#fff' : Colors.text}
      />
      <Text
        style={[
          styles.categoryChipText,
          selectedCategory === item.id && { color: '#fff' },
        ]}
      >
        {item.label}
      </Text>
      <View style={[styles.countBadge, selectedCategory === item.id && { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
        <Text style={[styles.countText, selectedCategory === item.id && { color: '#fff' }]}>
          {item.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Recipe Card Component
  const RecipeCard = React.memo(({ item }: { item: RecipeMetadata }) => {
    const isFav = favoriteRecipes.includes(item.id);
    const [imageError, setImageError] = React.useState(false);
    
    // Fallback image URL
    const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80';
    
    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => handleRecipePress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageError ? fallbackImage : item.imageUrl }}
            style={styles.recipeImage}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
          {/* Fallback icon when no image */}
          {(!item.imageUrl || imageError) && (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="restaurant-outline" size={32} color="#ccc" />
            </View>
          )}
          {/* Favori Butonu */}
          <TouchableOpacity 
            style={styles.favoriteBtn}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavoriteRecipe(item.id);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name={isFav ? 'heart' : 'heart-outline'} 
              size={20} 
              color={isFav ? '#e11d48' : '#fff'} 
            />
          </TouchableOpacity>
          {item.isPremium && !isPremium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="lock-closed" size={12} color="#fff" />
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          )}
          {item.featured && (
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
            </View>
          )}
          <View style={[styles.difficultyBadge, { backgroundColor: item.color }]}>
            <Text style={styles.difficultyText}>
              {getDifficultyLabel(item.difficulty, locale)}
            </Text>
          </View>
        </View>
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName} numberOfLines={2}>
            {locale === 'tr' ? getRecipeNameTR(item.id) : getRecipeNameEN(item.id)}
          </Text>
          <View style={styles.categoryTag}>
            <Ionicons
              name={CATEGORY_LABELS[item.category].icon as any}
              size={12}
              color={CATEGORY_LABELS[item.category].color}
            />
            <Text style={[styles.categoryTagText, { color: CATEGORY_LABELS[item.category].color }]}>
              {getCategoryLabel(item.category, locale)}
            </Text>
          </View>
          <View style={styles.tagsRow}>
            {item.tags.slice(0, 2).map((tag, idx) => (
              <View key={idx} style={styles.tagChip}>
                <Text style={styles.tagChipText}>
                  {getTagLabelShort(tag, locale)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFeaturedCard = ({ item }: { item: RecipeMetadata }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => handleRecipePress(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.featuredImage}
        resizeMode="cover"
      />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredBadgeContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.featuredBadgeText2}>
            {t('featured')}
          </Text>
        </View>
        <Text style={styles.featuredName}>
          {locale === 'tr' ? getRecipeNameTR(item.id) : getRecipeNameEN(item.id)}
        </Text>
        <Text style={styles.featuredCategory}>
          {getCategoryLabel(item.category, locale)}
        </Text>
      </View>
      {item.isPremium && !isPremium && (
        <View style={styles.featuredLock}>
          <Ionicons name="lock-closed" size={20} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <WatchAdModal
        visible={showAdModal}
        onClose={() => {
          setShowAdModal(false);
          setPendingRecipe(null);
        }}
        onWatchAd={handleWatchAd}
        type="recipe"
        remainingFree={Math.max(0, 1 - recipeViewCount)}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t('recipes')}
        </Text>
        <View style={styles.headerRight}>
          {/* Free with Ads Badge */}
          <View style={styles.freeAdBadge}>
            <Ionicons name="gift-outline" size={16} color={Colors.primary} />
            <Text style={styles.freeAdText}>{t('100PercentFree')}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recipe Collections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('recipeCollections')}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {t('curatedRecipeGroups')}
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsRow}
          >
            {(Object.keys(RECIPE_COLLECTIONS) as CollectionId[]).map(renderCollectionCard)}
          </ScrollView>
        </View>

        {/* Featured Recipes */}
        {featuredRecipes.length > 0 && !selectedCollection && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t('featuredRecipes')}
            </Text>
            <FlatList
              horizontal
              data={featuredRecipes}
              renderItem={renderFeaturedCard}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            />
          </View>
        )}

        {/* Categories */}
        {!selectedCollection && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t('categories')}
            </Text>
            <FlatList
              horizontal
              data={[
                { id: 'all', label: t('all'), icon: 'grid-outline', color: Colors.primary, count: getAllRecipeMetadata().length },
                ...categories,
              ]}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>
        )}

        {/* Recipe Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCollection
              ? (locale === 'tr' 
                  ? RECIPE_COLLECTIONS[selectedCollection].labelTr 
                  : RECIPE_COLLECTIONS[selectedCollection].labelEn)
              : selectedCategory === 'all'
                ? t('allRecipes')
                : getCategoryLabel(selectedCategory, locale)}
            {' '}({recipes.length})
          </Text>
          
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
          ) : (
            <View style={styles.recipeGrid}>
              {recipes.map((recipe) => (
                <View key={recipe.id} style={styles.gridItem}>
                  <RecipeCard item={recipe} />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Premium CTA */}
        {!isPremium && (
          <TouchableOpacity
            style={styles.premiumCta}
            onPress={() => router.push('/(tabs)/diets')}
          >
            <Ionicons name="diamond-outline" size={24} color={Colors.premium} />
            <View style={styles.premiumCtaContent}>
              <Text style={styles.premiumCtaTitle}>
                {t('accessAllRecipesWithPremium')}
              </Text>
              <Text style={styles.premiumCtaSubtitle}>
                {t('unlockPremiumRecipes')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.premium} />
          </TouchableOpacity>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper functions for recipe names
const getRecipeNameTR = (id: string): string => {
  if (ATHLETE_RECIPE_NAMES[id as keyof typeof ATHLETE_RECIPE_NAMES]) {
    return ATHLETE_RECIPE_NAMES[id as keyof typeof ATHLETE_RECIPE_NAMES].tr;
  }
  
  const names: Record<string, string> = {
    avocado_toast: 'Avokadolu Tost',
    protein_pancakes: 'Proteinli Pankek',
    overnight_oats: 'Gece Yulafı',
    veggie_omelette: 'Sebzeli Omlet',
    chia_pudding: 'Chia Puding',
    shakshuka: 'Şakşuka',
    acai_bowl: 'Açai Bowl',
    turkish_menemen: 'Türk Menemen',
    grilled_chicken_salad: 'Izgara Tavuklu Salata',
    salmon_vegetables: 'Sebzeli Somon',
    turkey_meatballs: 'Hindi Köfte',
    stuffed_peppers: 'Dolma Biber',
    lentil_curry: 'Mercimekli Köri',
    quinoa_bowl: 'Kinoa Bowl',
    baked_cod: 'Fırında Morina',
    chicken_stir_fry: 'Tavuklu Stir Fry',
    butter_chicken: 'Tereyağlı Tavuk',
    lamb_kofta: 'Kuzu Köfte',
    shrimp_garlic_pasta: 'Karidesli Sarımsaklı Makarna',
    beef_bulgogi: 'Kore Usulü Bulgogi',
    chicken_biryani: 'Tavuklu Biryani',
    falafel_wrap: 'Falafel Wrap',
    lentil_soup: 'Mercimek Çorbası',
    chicken_vegetable_soup: 'Tavuklu Sebze Çorbası',
    tomato_basil_soup: 'Domates Fesleğen Çorbası',
    broccoli_soup: 'Brokoli Çorbası',
    mushroom_soup: 'Mantar Çorbası',
    pumpkin_soup: 'Bal Kabağı Çorbası',
    greek_salad: 'Yunan Salatası',
    caesar_salad: 'Sezar Salata',
    quinoa_salad: 'Kinoa Salatası',
    tuna_salad: 'Ton Balıklı Salata',
    fattoush_salad: 'Fettuş Salatası',
    avocado_chickpea_salad: 'Avokadolu Nohut Salatası',
    hummus: 'Humus',
    energy_balls: 'Enerji Topları',
    greek_yogurt_parfait: 'Yoğurtlu Parfait',
    veggie_sticks: 'Sebze Çubukları',
    baba_ganoush: 'Baba Ganuş',
    stuffed_dates: 'Dolgulu Hurma',
    green_smoothie: 'Yeşil Smoothie',
    berry_smoothie: 'Meyveli Smoothie',
    protein_smoothie: 'Protein Smoothie',
    tropical_smoothie: 'Tropik Smoothie',
    mango_lassi: 'Mango Lassi',
    peanut_butter_banana_smoothie: 'Fıstık Ezmeli Muzlu Smoothie',
    banana_nice_cream: 'Muzlu Dondurma',
    dark_chocolate_mousse: 'Bitter Çikolatalı Mus',
    fruit_salad: 'Meyve Salatası',
    rice_pudding: 'Sütlaç',
    baklava_oatmeal: 'Baklavalı Yulaf Ezmesi',
  };
  return names[id] || id;
};

const getRecipeNameEN = (id: string): string => {
  if (ATHLETE_RECIPE_NAMES[id as keyof typeof ATHLETE_RECIPE_NAMES]) {
    return ATHLETE_RECIPE_NAMES[id as keyof typeof ATHLETE_RECIPE_NAMES].en;
  }
  
  const names: Record<string, string> = {
    avocado_toast: 'Avocado Toast',
    protein_pancakes: 'Protein Pancakes',
    overnight_oats: 'Overnight Oats',
    veggie_omelette: 'Veggie Omelette',
    chia_pudding: 'Chia Pudding',
    shakshuka: 'Shakshuka',
    acai_bowl: 'Açai Bowl',
    turkish_menemen: 'Turkish Menemen',
    grilled_chicken_salad: 'Grilled Chicken Salad',
    salmon_vegetables: 'Salmon with Vegetables',
    turkey_meatballs: 'Turkey Meatballs',
    stuffed_peppers: 'Stuffed Peppers',
    lentil_curry: 'Lentil Curry',
    quinoa_bowl: 'Quinoa Bowl',
    baked_cod: 'Baked Cod',
    chicken_stir_fry: 'Chicken Stir Fry',
    butter_chicken: 'Butter Chicken',
    lamb_kofta: 'Lamb Kofta',
    shrimp_garlic_pasta: 'Garlic Shrimp Pasta',
    beef_bulgogi: 'Korean Beef Bulgogi',
    chicken_biryani: 'Chicken Biryani',
    falafel_wrap: 'Falafel Wrap',
    lentil_soup: 'Lentil Soup',
    chicken_vegetable_soup: 'Chicken Vegetable Soup',
    tomato_basil_soup: 'Tomato Basil Soup',
    broccoli_soup: 'Broccoli Soup',
    mushroom_soup: 'Mushroom Soup',
    pumpkin_soup: 'Pumpkin Soup',
    greek_salad: 'Greek Salad',
    caesar_salad: 'Caesar Salad',
    quinoa_salad: 'Quinoa Salad',
    tuna_salad: 'Tuna Salad',
    fattoush_salad: 'Fattoush Salad',
    avocado_chickpea_salad: 'Avocado Chickpea Salad',
    hummus: 'Hummus',
    energy_balls: 'Energy Balls',
    greek_yogurt_parfait: 'Greek Yogurt Parfait',
    veggie_sticks: 'Veggie Sticks',
    baba_ganoush: 'Baba Ganoush',
    stuffed_dates: 'Stuffed Dates',
    green_smoothie: 'Green Smoothie',
    berry_smoothie: 'Berry Smoothie',
    protein_smoothie: 'Protein Smoothie',
    tropical_smoothie: 'Tropical Smoothie',
    mango_lassi: 'Mango Lassi',
    peanut_butter_banana_smoothie: 'Peanut Butter Banana Smoothie',
    banana_nice_cream: 'Banana Nice Cream',
    dark_chocolate_mousse: 'Dark Chocolate Mousse',
    fruit_salad: 'Fruit Salad',
    rice_pudding: 'Rice Pudding',
    baklava_oatmeal: 'Baklava Oatmeal',
  };
  return names[id] || id;
};

const getTagLabelShort = (tag: string, locale: string): string => {
  const labels: Record<string, { tr: string; en: string }> = {
    vegetarian: { tr: 'Vejetaryen', en: 'Vegetarian' },
    vegan: { tr: 'Vegan', en: 'Vegan' },
    gluten_free: { tr: 'Glutensiz', en: 'GF' },
    dairy_free: { tr: 'Sütsüz', en: 'DF' },
    low_carb: { tr: 'Low Carb', en: 'Low Carb' },
    high_protein: { tr: 'Protein', en: 'Protein' },
    keto: { tr: 'Keto', en: 'Keto' },
    mediterranean: { tr: 'Akdeniz', en: 'Med' },
    quick: { tr: 'Hızlı', en: 'Quick' },
    meal_prep: { tr: 'Hazırlık', en: 'Prep' },
    budget_friendly: { tr: 'Ekonomik', en: 'Budget' },
    kid_friendly: { tr: 'Çocuklar', en: 'Kids' },
  };
  return labels[tag]?.[locale as 'tr' | 'en'] || tag;
};

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
    paddingVertical: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  freeAdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  freeAdText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  getPremiumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginHorizontal: 16,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.lightText,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  collectionsRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  collectionCard: {
    width: 140,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  collectionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  collectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  collectionDesc: {
    fontSize: 11,
    color: Colors.lightText,
    lineHeight: 14,
    marginBottom: 8,
    minHeight: 28,
  },
  collectionCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredList: {
    paddingHorizontal: 16,
  },
  featuredCard: {
    width: 280,
    height: 160,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  featuredBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featuredBadgeText2: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  featuredName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  featuredCategory: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  featuredLock: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 20,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 6,
  },
  countBadge: {
    backgroundColor: Colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  countText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.lightText,
  },
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  recipeCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  recipeImage: {
    width: '100%',
    height: 120,
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 16,
    zIndex: 10,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 4,
    borderRadius: 10,
  },
  difficultyBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  recipeInfo: {
    padding: 10,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    minHeight: 36,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tagChip: {
    backgroundColor: Colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagChipText: {
    fontSize: 9,
    color: Colors.lightText,
    fontWeight: '500',
  },
  loader: {
    marginVertical: 40,
  },
  premiumCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.premium,
  },
  premiumCtaContent: {
    flex: 1,
    marginLeft: 12,
  },
  premiumCtaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  premiumCtaSubtitle: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 2,
  },
  bottomPadding: {
    height: 100,
  },
});
