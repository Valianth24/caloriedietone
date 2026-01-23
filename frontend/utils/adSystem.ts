import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Reklam Sistemini Yönetir
 * NOT: Reklam entegrasyonu yayından sonra eklenecek (AdMob)
 * Şimdilik MOCK - uygulama çökmesin
 */

const STORAGE_KEYS = {
  RECIPE_VIEWS: 'free_recipe_views',
  CALORIE_SCANS: 'free_calorie_scans',
  LAST_RESET: 'last_ad_reset',
  WATCHED_ADS_FOR_RECIPES: 'watched_ads_for_recipes',
  THEME_UNLOCK_DATA: 'theme_unlock_data', // Tema kilidi açma verileri
};

export interface AdSystemState {
  recipeViewsRemaining: number;
  calorieScanRemaining: number;
  lastResetDate: string;
}

// Tema kilidi açma için gerekli reklam sayısı ve süre
export const THEME_UNLOCK_CONFIG = {
  ADS_REQUIRED: 3, // 3 reklam izle
  UNLOCK_DURATION_HOURS: 24, // 24 saat kullanım
};

export interface ThemeUnlockData {
  [themeName: string]: {
    adsWatched: number;
    unlockedUntil: string | null; // ISO date string
  };
}

/**
 * Ücretsiz tarif limiti - her kategoride ilk 3 tarif reklamsız
 */
export const FREE_RECIPES_PER_CATEGORY = 3;

export const FREE_LIMITS = {
  RECIPES_PER_AD: 1,
  CALORIES_PER_AD: 1,
};

/**
 * Tarif görüntüleme sayısını al
 */
export const getRecipeViews = async (): Promise<number> => {
  try {
    const views = await AsyncStorage.getItem(STORAGE_KEYS.RECIPE_VIEWS);
    return views ? parseInt(views) : 0;
  } catch (error) {
    console.error('Error getting recipe views:', error);
    return 0;
  }
};

/**
 * Tarif görüntüleme sayısını artır
 */
export const incrementRecipeViews = async (): Promise<number> => {
  try {
    const current = await getRecipeViews();
    const newCount = current + 1;
    await AsyncStorage.setItem(STORAGE_KEYS.RECIPE_VIEWS, newCount.toString());
    return newCount;
  } catch (error) {
    console.error('Error incrementing recipe views:', error);
    return 0;
  }
};

/**
 * Tarif için reklam izlemesi gerekli mi? (Kategori bazlı)
 * Her kategoride ilk 3 tarif reklamsız
 */
export const needsAdForRecipe = async (recipeId: string, recipeIndex: number): Promise<boolean> => {
  // İlk 3 tarif her kategoride reklamsız (index 0, 1, 2)
  if (recipeIndex < FREE_RECIPES_PER_CATEGORY) {
    return false;
  }
  
  // Daha önce bu tarif için reklam izlendi mi?
  const watchedRecipes = await getWatchedAdRecipes();
  return !watchedRecipes.includes(recipeId);
};

/**
 * Tarif reklamsız mı kontrol et (UI için)
 */
export const isRecipeFree = (recipeIndex: number): boolean => {
  return recipeIndex < FREE_RECIPES_PER_CATEGORY;
};

/**
 * Reklam izlenmiş tarifleri al
 */
export const getWatchedAdRecipes = async (): Promise<string[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.WATCHED_ADS_FOR_RECIPES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting watched ad recipes:', error);
    return [];
  }
};

/**
 * Tarif için reklam izlendi olarak işaretle
 */
export const markRecipeAdWatched = async (recipeId: string): Promise<void> => {
  try {
    const watched = await getWatchedAdRecipes();
    if (!watched.includes(recipeId)) {
      watched.push(recipeId);
      await AsyncStorage.setItem(STORAGE_KEYS.WATCHED_ADS_FOR_RECIPES, JSON.stringify(watched));
    }
  } catch (error) {
    console.error('Error marking recipe ad watched:', error);
  }
};

/**
 * Reklam izlendikten sonra sıfırla
 */
export const resetAfterAd = async (type: 'recipe' | 'calorie', recipeId?: string): Promise<void> => {
  try {
    if (type === 'recipe' && recipeId) {
      await markRecipeAdWatched(recipeId);
    } else if (type === 'calorie') {
      await AsyncStorage.setItem(STORAGE_KEYS.CALORIE_SCANS, '0');
    }
  } catch (error) {
    console.error('Error resetting ad counter:', error);
  }
};

/**
 * Kalori tarama sayısını al
 */
export const getCalorieScans = async (): Promise<number> => {
  try {
    const scans = await AsyncStorage.getItem(STORAGE_KEYS.CALORIE_SCANS);
    return scans ? parseInt(scans) : 0;
  } catch (error) {
    console.error('Error getting calorie scans:', error);
    return 0;
  }
};

/**
 * Kalori tarama sayısını artır
 */
export const incrementCalorieScans = async (): Promise<number> => {
  try {
    const current = await getCalorieScans();
    const newCount = current + 1;
    await AsyncStorage.setItem(STORAGE_KEYS.CALORIE_SCANS, newCount.toString());
    return newCount;
  } catch (error) {
    console.error('Error incrementing calorie scans:', error);
    return 0;
  }
};

/**
 * Kalori için reklam izlemesi gerekli mi?
 */
export const needsAdForCalorie = async (): Promise<boolean> => {
  const scans = await getCalorieScans();
  return scans >= FREE_LIMITS.CALORIES_PER_AD;
};

/**
 * Ad system state'ini al
 */
export const getAdSystemState = async (): Promise<AdSystemState> => {
  const recipeViews = await getRecipeViews();
  const calorieScans = await getCalorieScans();
  
  return {
    recipeViewsRemaining: Math.max(0, FREE_LIMITS.RECIPES_PER_AD - recipeViews),
    calorieScanRemaining: Math.max(0, FREE_LIMITS.CALORIES_PER_AD - calorieScans),
    lastResetDate: new Date().toISOString(),
  };
};

/**
 * MOCK: Reklam göster (yayından sonra gerçek AdMob entegrasyonu)
 * Şimdilik sadece simüle ediyor - uygulama çökmesin
 */
export const showRewardedAd = async (type: 'recipe' | 'calorie', recipeId?: string): Promise<boolean> => {
  // TODO: Yayından sonra gerçek AdMob entegrasyonu
  // google.com, pub-6980942787991808, DIRECT, f08c47fec0942fa0
  
  console.log(`[AD MOCK] Showing rewarded ad for ${type}${recipeId ? ` - Recipe: ${recipeId}` : ''}`);
  
  // Simülasyon: 2 saniye bekle (gerçek reklamda 15-30 saniye)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Başarılı kabul et ve işaretle
  await resetAfterAd(type, recipeId);
  
  console.log(`[AD MOCK] Rewarded ad completed for ${type}`);
  return true;
};
