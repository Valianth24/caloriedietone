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
 * Tarif için çift reklam göster (AdMob)
 * İki reklam arka arkaya, tek reklam gibi
 */
export const showRewardedAd = async (type: 'recipe' | 'calorie', recipeId?: string): Promise<boolean> => {
  const { showDoubleRewardedAd, areAdsLoaded } = await import('./admobService');
  
  console.log(`[AdMob] Showing double rewarded ad for ${type}${recipeId ? ` - Recipe: ${recipeId}` : ''}`);
  
  return new Promise((resolve) => {
    showDoubleRewardedAd(
      async (success) => {
        if (success) {
          await resetAfterAd(type, recipeId);
          console.log(`[AdMob] Double ad completed successfully for ${type}`);
        }
        resolve(success);
      },
      (current, total) => {
        console.log(`[AdMob] Ad progress: ${current}/${total}`);
      }
    );
  });
};


// ========================================
// TEMA KİLİDİ AÇMA SİSTEMİ (3 Reklam = 24 Saat)
// ========================================

/**
 * Tema kilidi verilerini al
 */
export const getThemeUnlockData = async (): Promise<ThemeUnlockData> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.THEME_UNLOCK_DATA);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error getting theme unlock data:', error);
    return {};
  }
};

/**
 * Tema kilidi verilerini kaydet
 */
const saveThemeUnlockData = async (data: ThemeUnlockData): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME_UNLOCK_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving theme unlock data:', error);
  }
};

/**
 * Tema aktif mi kontrol et (24 saat içinde mi?)
 */
export const isThemeUnlocked = async (themeName: string): Promise<boolean> => {
  if (themeName === 'default') return true; // Varsayılan tema her zaman açık
  
  const data = await getThemeUnlockData();
  const themeData = data[themeName];
  
  if (!themeData || !themeData.unlockedUntil) return false;
  
  const now = new Date();
  const unlockedUntil = new Date(themeData.unlockedUntil);
  
  return now < unlockedUntil;
};

/**
 * Tema için izlenen reklam sayısını al
 */
export const getThemeAdCount = async (themeName: string): Promise<number> => {
  const data = await getThemeUnlockData();
  return data[themeName]?.adsWatched || 0;
};

/**
 * Tema için kalan süreyi al (saat cinsinden)
 */
export const getThemeRemainingHours = async (themeName: string): Promise<number> => {
  const data = await getThemeUnlockData();
  const themeData = data[themeName];
  
  if (!themeData || !themeData.unlockedUntil) return 0;
  
  const now = new Date();
  const unlockedUntil = new Date(themeData.unlockedUntil);
  const diffMs = unlockedUntil.getTime() - now.getTime();
  
  if (diffMs <= 0) return 0;
  
  return Math.ceil(diffMs / (1000 * 60 * 60));
};

/**
 * Tema için reklam izle
 * 3 reklam tamamlanınca 24 saat açılır
 */
export const watchAdForTheme = async (themeName: string): Promise<{ success: boolean; adsWatched: number; unlocked: boolean }> => {
  // MOCK: Reklam simülasyonu
  console.log(`[AD MOCK] Watching ad for theme: ${themeName}`);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const data = await getThemeUnlockData();
  
  if (!data[themeName]) {
    data[themeName] = { adsWatched: 0, unlockedUntil: null };
  }
  
  // Eğer tema zaten açıksa, reklam sayısını sıfırla ve süreyi uzat
  const isUnlocked = await isThemeUnlocked(themeName);
  if (isUnlocked) {
    // Süreyi uzat
    const newUnlockTime = new Date();
    newUnlockTime.setHours(newUnlockTime.getHours() + THEME_UNLOCK_CONFIG.UNLOCK_DURATION_HOURS);
    data[themeName].unlockedUntil = newUnlockTime.toISOString();
    await saveThemeUnlockData(data);
    return { success: true, adsWatched: THEME_UNLOCK_CONFIG.ADS_REQUIRED, unlocked: true };
  }
  
  // Reklam sayısını artır
  data[themeName].adsWatched = (data[themeName].adsWatched || 0) + 1;
  
  // 3 reklam tamamlandıysa kilidi aç
  if (data[themeName].adsWatched >= THEME_UNLOCK_CONFIG.ADS_REQUIRED) {
    const unlockTime = new Date();
    unlockTime.setHours(unlockTime.getHours() + THEME_UNLOCK_CONFIG.UNLOCK_DURATION_HOURS);
    data[themeName].unlockedUntil = unlockTime.toISOString();
    data[themeName].adsWatched = 0; // Sıfırla
    await saveThemeUnlockData(data);
    
    console.log(`[AD MOCK] Theme ${themeName} unlocked for 24 hours`);
    return { success: true, adsWatched: THEME_UNLOCK_CONFIG.ADS_REQUIRED, unlocked: true };
  }
  
  await saveThemeUnlockData(data);
  return { success: true, adsWatched: data[themeName].adsWatched, unlocked: false };
};

/**
 * Tema kilidini sıfırla (süre dolduğunda)
 */
export const resetThemeUnlock = async (themeName: string): Promise<void> => {
  const data = await getThemeUnlockData();
  if (data[themeName]) {
    data[themeName] = { adsWatched: 0, unlockedUntil: null };
    await saveThemeUnlockData(data);
  }
};
