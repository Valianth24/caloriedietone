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

// Mock modu: Expo Go veya development
const USE_MOCK = isExpoGo || isDevelopment;

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
const USE_TEST_ADS = true;

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
 * İki reklamı arka arkaya göster (tek reklam gibi)
 * İlk kez tarif açılırken kullanılır
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
    // Mock: İki reklam simüle et
    (async () => {
      onProgress?.(0, 2);
      
      await showMockAd();
      onProgress?.(1, 2);
      
      await showMockAd();
      onProgress?.(2, 2);
      
      isShowingAds = false;
      onComplete(true);
    })();
    return;
  }

  // Production: Gerçek AdMob reklamları
  showRealDoubleAd(onComplete, onProgress);
};

/**
 * Gerçek çift reklam göster (production)
 */
const showRealDoubleAd = async (
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
      AdEventType,
    } = await import('react-native-google-mobile-ads');

    console.log('[AdMob] Module loaded successfully');
    console.log('[AdMob] Using ad unit IDs:', AD_UNIT_IDS);

    onProgress?.(0, 2);

    // İlk reklam (Rewarded Interstitial)
    console.log('[AdMob] Creating first ad (Rewarded Interstitial)...');
    const firstAd = RewardedInterstitialAd.createForAdRequest(AD_UNIT_IDS.REWARDED_INTERSTITIAL);
    
    await new Promise<void>((resolve, reject) => {
      const loadedListener = firstAd.addAdEventListener(RewardedInterstitialAdEventType.LOADED, () => {
        console.log('[AdMob] First ad loaded, showing...');
        firstAd.show().then(() => {
          console.log('[AdMob] First ad shown successfully');
        }).catch((showError: Error) => {
          console.error('[AdMob] Error showing first ad:', showError);
          reject(showError);
        });
      });
      
      const errorListener = firstAd.addAdEventListener(AdEventType.ERROR, (error: Error) => {
        console.error('[AdMob] First ad error:', error);
        reject(error);
      });
      
      const closedListener = firstAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('[AdMob] First ad closed');
        onProgress?.(1, 2);
        // Clean up listeners
        loadedListener();
        errorListener();
        closedListener();
        resolve();
      });
      
      console.log('[AdMob] Loading first ad...');
      firstAd.load();
    });

    // İkinci reklam (Rewarded)
    console.log('[AdMob] Creating second ad (Rewarded)...');
    const secondAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED);
    
    await new Promise<void>((resolve, reject) => {
      const loadedListener = secondAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('[AdMob] Second ad loaded, showing...');
        secondAd.show().then(() => {
          console.log('[AdMob] Second ad shown successfully');
        }).catch((showError: Error) => {
          console.error('[AdMob] Error showing second ad:', showError);
          reject(showError);
        });
      });
      
      const errorListener = secondAd.addAdEventListener(AdEventType.ERROR, (error: Error) => {
        console.error('[AdMob] Second ad error:', error);
        reject(error);
      });
      
      const closedListener = secondAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('[AdMob] Second ad closed');
        onProgress?.(2, 2);
        // Clean up listeners
        loadedListener();
        errorListener();
        closedListener();
        resolve();
      });
      
      console.log('[AdMob] Loading second ad...');
      secondAd.load();
    });

    isShowingAds = false;
    console.log('[AdMob] Both ads completed successfully');
    onComplete(true);
  } catch (error) {
    console.error('[AdMob] Error in showRealDoubleAd:', error);
    console.error('[AdMob] Error details:', JSON.stringify(error, null, 2));
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

    // TARİF3 - Geçiş Reklamı (Interstitial)
    const AD_UNIT_ID = 'ca-app-pub-6980942787991808/1408960486';
    const ad = InterstitialAd.createForAdRequest(AD_UNIT_ID);

    await new Promise<void>((resolve, reject) => {
      ad.addAdEventListener(AdEventType.LOADED, () => {
        ad.show().then(() => resolve()).catch(reject);
      });
      ad.addAdEventListener(AdEventType.ERROR, reject);
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

    const AD_UNIT_ID = 'ca-app-pub-6980942787991808/8616532511';
    const ad = RewardedAd.createForAdRequest(AD_UNIT_ID);

    await new Promise<void>((resolve, reject) => {
      ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        ad.show().then(() => resolve()).catch(reject);
      });
      ad.addAdEventListener(AdEventType.ERROR, reject);
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
