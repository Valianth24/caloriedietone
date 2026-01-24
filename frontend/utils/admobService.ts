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
    const {
      RewardedAd,
      RewardedAdEventType,
      RewardedInterstitialAd,
      RewardedInterstitialAdEventType,
      AdEventType,
    } = await import('react-native-google-mobile-ads');

    const AD_UNIT_IDS = {
      REWARDED_INTERSTITIAL: 'ca-app-pub-6980942787991808/2514158595',
      REWARDED: 'ca-app-pub-6980942787991808/8616532511',
    };

    onProgress?.(0, 2);

    // İlk reklam (Rewarded Interstitial)
    const firstAd = RewardedInterstitialAd.createForAdRequest(AD_UNIT_IDS.REWARDED_INTERSTITIAL);
    
    await new Promise<void>((resolve, reject) => {
      firstAd.addAdEventListener(RewardedInterstitialAdEventType.LOADED, () => {
        firstAd.show().then(() => resolve()).catch(reject);
      });
      firstAd.addAdEventListener(AdEventType.ERROR, reject);
      firstAd.addAdEventListener(AdEventType.CLOSED, () => {
        onProgress?.(1, 2);
        resolve();
      });
      firstAd.load();
    });

    // İkinci reklam (Rewarded)
    const secondAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED);
    
    await new Promise<void>((resolve, reject) => {
      secondAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        secondAd.show().then(() => resolve()).catch(reject);
      });
      secondAd.addAdEventListener(AdEventType.ERROR, reject);
      secondAd.addAdEventListener(AdEventType.CLOSED, () => {
        onProgress?.(2, 2);
        resolve();
      });
      secondAd.load();
    });

    isShowingAds = false;
    onComplete(true);
  } catch (error) {
    console.error('[AdMob] Error showing real ads:', error);
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
