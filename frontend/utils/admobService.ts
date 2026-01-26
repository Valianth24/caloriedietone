/**
 * AdMob Reklam Servisi
 * Development: Mock reklamlar
 * Production: Gerçek AdMob reklamları
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Production build kontrolü
const isExpoGo = Constants.appOwnership === 'expo';
const isDevelopment = __DEV__;

// MOCK MODU KAPALI - Her zaman gerçek reklamlar gösterilecek
// Eğer test etmek istiyorsanız USE_MOCK = true yapın
const USE_MOCK = false; // ❌ MOCK KAPALI - Gerçek reklamlar aktif

// Debug için log
console.log('[AdMob Config]', {
  isExpoGo,
  isDevelopment,
  USE_MOCK,
  platform: Platform.OS,
  appOwnership: Constants.appOwnership,
});

// TEST MODE: AdMob doğrulaması tamamlanana kadar test ID'leri kullan
// Uygulama doğrulandıktan sonra bu değeri false yapın
const USE_TEST_ADS = false; // ✅ PRODUCTION MODE - Gerçek reklamlar aktif

// Google'ın resmi test ID'leri - her zaman çalışır
const TEST_AD_UNIT_IDS = {
  REWARDED_INTERSTITIAL: 'ca-app-pub-3940256099942544/5354046379',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
};

// Gerçek (production) Ad Unit ID'leri - AdMob doğrulaması sonrası kullanılacak
const PROD_AD_UNIT_IDS = {
  REWARDED_INTERSTITIAL: 'ca-app-pub-6980942787991808/2514158595',
  REWARDED: 'ca-app-pub-6980942787991808/8616532511',
  INTERSTITIAL: 'ca-app-pub-6980942787991808/1408960486',
};

// Hangi ID'leri kullanacağımızı belirle
const AD_UNIT_IDS = USE_TEST_ADS ? TEST_AD_UNIT_IDS : PROD_AD_UNIT_IDS;

console.log('[AdMob] Using', USE_TEST_ADS ? 'TEST' : 'PRODUCTION', 'ad IDs');

// Reklam durumları
let isShowingAds = false;

/**
 * Mock reklam göster (development için)
 */
const showMockAd = async (): Promise<boolean> => {
  console.log('[AdMob MOCK] Showing mock ad...');
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('[AdMob MOCK] Mock ad completed');
  return true;
};

/**
 * Reklamları önceden yükle
 */
export const preloadAds = async (): Promise<void> => {
  if (USE_MOCK) {
    console.log('[AdMob] Mock mode - skipping preload');
    return;
  }

  try {
    // Lazy import - sadece production'da
    const { 
      RewardedAd, 
      RewardedInterstitialAd,
      TestIds 
    } = await import('react-native-google-mobile-ads');
    
    console.log('[AdMob] Preloading ads...');
    // Production preload logic here
  } catch (error) {
    console.log('[AdMob] Native module not available, using mock');
  }
};

/**
 * ÜÇ reklamı arka arkaya göster (tek reklam deneyimi gibi)
 * Kullanıcı 1 kez "Reklam İzle" butonuna basar, 3 reklam otomatik oynar
 * Sıra: Rewarded Interstitial → Rewarded → Interstitial
 */
export const showDoubleRewardedAd = (
  onComplete: (success: boolean) => void,
  onProgress?: (current: number, total: number) => void
): void => {
  if (isShowingAds) {
    console.log('[AdMob] Ads already showing');
    return;
  }

  isShowingAds = true;

  if (USE_MOCK) {
    // Mock: Üç reklam simüle et
    (async () => {
      onProgress?.(0, 3);
      
      await showMockAd();
      onProgress?.(1, 3);
      
      await showMockAd();
      onProgress?.(2, 3);
      
      await showMockAd();
      onProgress?.(3, 3);
      
      isShowingAds = false;
      onComplete(true);
    })();
    return;
  }

  // Production: Gerçek AdMob reklamları (3 reklam arka arkaya)
  showRealTripleAd(onComplete, onProgress);
};

/**
 * Gerçek ÜÇ reklam göster (production)
 * Sıra: Rewarded Interstitial → Rewarded → Interstitial
 * Kullanıcı hiçbir şeye basmadan 3 reklam arka arkaya oynar
 */
const showRealTripleAd = async (
  onComplete: (success: boolean) => void,
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  try {
    console.log('[AdMob] Loading react-native-google-mobile-ads module...');
    
    const {
      RewardedAd,
      RewardedAdEventType,
      RewardedInterstitialAd,
      RewardedInterstitialAdEventType,
      InterstitialAd,
      AdEventType,
    } = await import('react-native-google-mobile-ads');

    console.log('[AdMob] Module loaded successfully');
    console.log('[AdMob] Starting triple ad sequence...');

    onProgress?.(0, 3);

    // ========== 1. REKLAM: Rewarded Interstitial ==========
    console.log('[AdMob] Creating ad 1/3 (Rewarded Interstitial)...');
    const firstAd = RewardedInterstitialAd.createForAdRequest(AD_UNIT_IDS.REWARDED_INTERSTITIAL);
    
    await new Promise<void>((resolve, reject) => {
      const loadedListener = firstAd.addAdEventListener(RewardedInterstitialAdEventType.LOADED, () => {
        console.log('[AdMob] Ad 1/3 loaded, showing...');
        firstAd.show().catch((showError: Error) => {
          console.error('[AdMob] Error showing ad 1/3:', showError);
          reject(showError);
        });
      });
      
      const errorListener = firstAd.addAdEventListener(AdEventType.ERROR, (error: Error) => {
        console.error('[AdMob] Ad 1/3 error:', error);
        loadedListener();
        errorListener();
        reject(error);
      });
      
      const closedListener = firstAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('[AdMob] Ad 1/3 closed');
        onProgress?.(1, 3);
        loadedListener();
        errorListener();
        closedListener();
        resolve();
      });
      
      console.log('[AdMob] Loading ad 1/3...');
      firstAd.load();
    });

    // ========== 2. REKLAM: Rewarded ==========
    console.log('[AdMob] Creating ad 2/3 (Rewarded)...');
    const secondAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED);
    
    await new Promise<void>((resolve, reject) => {
      const loadedListener = secondAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('[AdMob] Ad 2/3 loaded, showing...');
        secondAd.show().catch((showError: Error) => {
          console.error('[AdMob] Error showing ad 2/3:', showError);
          reject(showError);
        });
      });
      
      const errorListener = secondAd.addAdEventListener(AdEventType.ERROR, (error: Error) => {
        console.error('[AdMob] Ad 2/3 error:', error);
        loadedListener();
        errorListener();
        reject(error);
      });
      
      const closedListener = secondAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('[AdMob] Ad 2/3 closed');
        onProgress?.(2, 3);
        loadedListener();
        errorListener();
        closedListener();
        resolve();
      });
      
      console.log('[AdMob] Loading ad 2/3...');
      secondAd.load();
    });

    // ========== 3. REKLAM: Interstitial ==========
    console.log('[AdMob] Creating ad 3/3 (Interstitial)...');
    const thirdAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.INTERSTITIAL);
    
    await new Promise<void>((resolve, reject) => {
      const loadedListener = thirdAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('[AdMob] Ad 3/3 loaded, showing...');
        thirdAd.show().catch((showError: Error) => {
          console.error('[AdMob] Error showing ad 3/3:', showError);
          reject(showError);
        });
      });
      
      const errorListener = thirdAd.addAdEventListener(AdEventType.ERROR, (error: Error) => {
        console.error('[AdMob] Ad 3/3 error:', error);
        loadedListener();
        errorListener();
        reject(error);
      });
      
      const closedListener = thirdAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('[AdMob] Ad 3/3 closed');
        onProgress?.(3, 3);
        loadedListener();
        errorListener();
        closedListener();
        resolve();
      });
      
      console.log('[AdMob] Loading ad 3/3...');
      thirdAd.load();
    });

    isShowingAds = false;
    console.log('[AdMob] All 3 ads completed successfully! ✅');
    onComplete(true);
  } catch (error) {
    console.error('[AdMob] Error in triple ad sequence:', error);
    isShowingAds = false;
    onComplete(false);
  }
};

/**
 * Kısa geçiş reklamı göster (Interstitial)
 * Daha önce açılmış tarifler için kullanılır
 */
export const showInterstitialAd = (
  onComplete: (success: boolean) => void
): void => {
  if (isShowingAds) {
    console.log('[AdMob] Ads already showing');
    return;
  }

  isShowingAds = true;

  if (USE_MOCK) {
    (async () => {
      console.log('[AdMob MOCK] Showing interstitial ad...');
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('[AdMob MOCK] Interstitial ad completed');
      isShowingAds = false;
      onComplete(true);
    })();
    return;
  }

  // Production: Gerçek interstitial reklam
  showRealInterstitialAd(onComplete);
};

/**
 * Gerçek interstitial reklam göster (production)
 */
const showRealInterstitialAd = async (onComplete: (success: boolean) => void): Promise<void> => {
  try {
    const {
      InterstitialAd,
      AdEventType,
    } = await import('react-native-google-mobile-ads');

    console.log('[AdMob] Creating interstitial ad with ID:', AD_UNIT_IDS.INTERSTITIAL);
    const ad = InterstitialAd.createForAdRequest(AD_UNIT_IDS.INTERSTITIAL);

    await new Promise<void>((resolve, reject) => {
      ad.addAdEventListener(AdEventType.LOADED, () => {
        console.log('[AdMob] Interstitial ad loaded, showing...');
        ad.show().then(() => resolve()).catch(reject);
      });
      ad.addAdEventListener(AdEventType.ERROR, (error: Error) => {
        console.error('[AdMob] Interstitial ad error:', error);
        reject(error);
      });
      ad.addAdEventListener(AdEventType.CLOSED, resolve);
      ad.load();
    });

    isShowingAds = false;
    onComplete(true);
  } catch (error) {
    console.error('[AdMob] Error showing interstitial ad:', error);
    isShowingAds = false;
    onComplete(false);
  }
};

/**
 * Tek ödüllü reklam göster (temalar için)
 */
export const showSingleRewardedAd = (
  onComplete: (success: boolean) => void
): void => {
  if (isShowingAds) {
    console.log('[AdMob] Ads already showing');
    return;
  }

  isShowingAds = true;

  if (USE_MOCK) {
    (async () => {
      await showMockAd();
      isShowingAds = false;
      onComplete(true);
    })();
    return;
  }

  // Production: Gerçek reklam
  showRealSingleAd(onComplete);
};

/**
 * Gerçek tek reklam göster (production)
 */
const showRealSingleAd = async (onComplete: (success: boolean) => void): Promise<void> => {
  try {
    const {
      RewardedAd,
      RewardedAdEventType,
      AdEventType,
    } = await import('react-native-google-mobile-ads');

    console.log('[AdMob] Creating single rewarded ad with ID:', AD_UNIT_IDS.REWARDED);
    const ad = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED);

    await new Promise<void>((resolve, reject) => {
      ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('[AdMob] Single rewarded ad loaded, showing...');
        ad.show().then(() => resolve()).catch(reject);
      });
      ad.addAdEventListener(AdEventType.ERROR, (error: Error) => {
        console.error('[AdMob] Single rewarded ad error:', error);
        reject(error);
      });
      ad.addAdEventListener(AdEventType.CLOSED, resolve);
      ad.load();
    });

    isShowingAds = false;
    onComplete(true);
  } catch (error) {
    console.error('[AdMob] Error showing single ad:', error);
    isShowingAds = false;
    onComplete(false);
  }
};

/**
 * Reklamlar yüklü mü?
 */
export const areAdsLoaded = (): boolean => {
  return true; // Mock modda her zaman hazır
};

/**
 * Reklam gösteriliyor mu?
 */
export const isAdShowing = (): boolean => {
  return isShowingAds;
};
