import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Ücretsiz Reklam Sistemini Yönetir
 * NOT: Reklam entegrasyonu yayından sonra eklenecek (AdMob)
 * Şimdilik MOCK - uygulama çökmesin
 */

const STORAGE_KEYS = {
  RECIPE_VIEWS: 'free_recipe_views',
  CALORIE_SCANS: 'free_calorie_scans',
  LAST_RESET: 'last_ad_reset',
  WATCHED_ADS_FOR_RECIPES: 'watched_ads_for_recipes', // Reklam izlenmiş tarifler
};

export interface AdSystemState {
  recipeViewsRemaining: number;
  calorieScanRemaining: number;
  lastResetDate: string;
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
 * Tarif için reklam izlemesi gerekli mi?
 */
export const needsAdForRecipe = async (): Promise<boolean> => {
  const views = await getRecipeViews();
  return views >= FREE_LIMITS.RECIPES_PER_AD;
};

/**
 * Reklam izlendikten sonra sıfırla
 */
export const resetAfterAd = async (type: 'recipe' | 'calorie'): Promise<void> => {
  try {
    if (type === 'recipe') {
      await AsyncStorage.setItem(STORAGE_KEYS.RECIPE_VIEWS, '0');
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
 * MOCK: Reklam göster (yayından sonra gerçek entegrasyon)
 * Şimdilik sadece simüle ediyor
 */
export const showRewardedAd = async (type: 'recipe' | 'calorie'): Promise<boolean> => {
  // TODO: Yayından sonra gerçek reklam SDK entegrasyonu
  // AdMob veya başka bir reklam network
  
  console.log(`[AD] Showing rewarded ad for ${type}`);
  
  // Simülasyon: 2 saniye bekle
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Başarılı kabul et ve sıfırla
  await resetAfterAd(type);
  
  console.log(`[AD] Rewarded ad completed for ${type}`);
  return true;
};
