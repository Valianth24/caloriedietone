/**
 * AdMob Reklam Servisi
 * Ocak 2026 - Güncellenmiş versiyon
 * İki farklı reklam tipi:
 * - Ödüllü (Rewarded): Yıldızlı tarifler, kalori hesaplama
 * - Ödüllü Geçiş (Rewarded Interstitial): Yıldızsız tarifler, diyetler
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Debug modu
const isDevelopment = __DEV__;
const isExpoGo = Constants.appOwnership === 'expo';
const USE_MOCK = false;

// Reklam Birimi ID'leri
const AD_UNITS = {
  // Ödüllü Reklam - Yıldızlı tarifler ve kalori hesaplama için
  REWARDED: 'ca-app-pub-6980942787991808/1382918054',
  // Ödüllü Geçiş Reklamı - Yıldızsız tarifler, daha önce görülenler ve diyetler için
  REWARDED_INTERSTITIAL: 'ca-app-pub-6980942787991808/3429358823',
  // Test ID'leri
  TEST_REWARDED: 'ca-app-pub-3940256099942544/5224354917',
  TEST_REWARDED_INTERSTITIAL: 'ca-app-pub-3940256099942544/5354046379',
};

// Hangi ID'leri kullanacağız
const getAdUnitId = (type: 'rewarded' | 'rewarded_interstitial'): string => {
  if (USE_MOCK) {
    return type === 'rewarded' ? AD_UNITS.TEST_REWARDED : AD_UNITS.TEST_REWARDED_INTERSTITIAL;
  }
  return type === 'rewarded' ? AD_UNITS.REWARDED : AD_UNITS.REWARDED_INTERSTITIAL;
};

// Debug log
console.log('[AdMob] Config:', {
  isDevelopment,
  isExpoGo,
  USE_MOCK,
  platform: Platform.OS,
  rewardedId: getAdUnitId('rewarded'),
  rewardedInterstitialId: getAdUnitId('rewarded_interstitial'),
});

// Reklam durumu
let isShowingAd = false;

/**
 * Mock reklam göster (test için)
 */
const showMockAd = async (): Promise<boolean> => {
  console.log('[AdMob MOCK] Showing mock ad...');
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('[AdMob MOCK] Mock ad completed');
  return true;
};

// ============================================
// ÖDÜLLÜ REKLAM (Rewarded)
// Kullanım: Yıldızlı tarifler, kalori hesaplama
// ============================================

/**
 * Ödüllü reklam göster
 */
export const showRewardedAd = (
  onComplete: (success: boolean) => void
): void => {
  if (isShowingAd) {
    console.log('[AdMob] Ad already showing');
    onComplete(false);
    return;
  }

  isShowingAd = true;

  if (USE_MOCK) {
    showMockAd().then(() => {
      isShowingAd = false;
      onComplete(true);
    });
    return;
  }

  showRealRewardedAd(onComplete);
};

const showRealRewardedAd = async (onComplete: (success: boolean) => void): Promise<void> => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  try {
    const { RewardedAd, RewardedAdEventType, AdEventType } = await import('react-native-google-mobile-ads');
    const adUnitId = getAdUnitId('rewarded');
    
    console.log('[AdMob] Creating Rewarded ad:', adUnitId);
    
    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    let rewardEarned = false;
    let completed = false;

    const finish = (success: boolean) => {
      if (completed) return;
      completed = true;
      if (timeoutId) clearTimeout(timeoutId);
      cleanup();
      isShowingAd = false;
      console.log('[AdMob] Rewarded ad finished, success:', success);
      onComplete(success);
    };

    const loadedUnsub = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('[AdMob] Rewarded ad loaded, showing...');
      if (timeoutId) clearTimeout(timeoutId);
      rewarded.show();
    });

    const earnedUnsub = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('[AdMob] Reward earned:', reward);
      rewardEarned = true;
    });

    const errorUnsub = rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('[AdMob] Rewarded ad error:', error);
      finish(false);
    });

    const closedUnsub = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('[AdMob] Rewarded ad closed, reward earned:', rewardEarned);
      finish(rewardEarned);
    });

    const cleanup = () => {
      loadedUnsub();
      earnedUnsub();
      errorUnsub();
      closedUnsub();
    };

    timeoutId = setTimeout(() => {
      console.error('[AdMob] Rewarded ad timeout');
      finish(false);
    }, 15000);

    console.log('[AdMob] Loading Rewarded ad...');
    rewarded.load();

  } catch (error) {
    console.error('[AdMob] Rewarded ad error:', error);
    if (timeoutId) clearTimeout(timeoutId);
    isShowingAd = false;
    onComplete(false);
  }
};

// ============================================
// ÖDÜLLÜ GEÇİŞ REKLAMI (Rewarded Interstitial)
// Kullanım: Yıldızsız tarifler, daha önce görülenler, diyetler
// ============================================

/**
 * Ödüllü geçiş reklamı göster
 */
export const showRewardedInterstitialAd = (
  onComplete: (success: boolean) => void
): void => {
  if (isShowingAd) {
    console.log('[AdMob] Ad already showing');
    onComplete(false);
    return;
  }

  isShowingAd = true;

  if (USE_MOCK) {
    showMockAd().then(() => {
      isShowingAd = false;
      onComplete(true);
    });
    return;
  }

  showRealRewardedInterstitialAd(onComplete);
};

const showRealRewardedInterstitialAd = async (onComplete: (success: boolean) => void): Promise<void> => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  try {
    const { RewardedInterstitialAd, RewardedInterstitialAdEventType, AdEventType } = await import('react-native-google-mobile-ads');
    const adUnitId = getAdUnitId('rewarded_interstitial');
    
    console.log('[AdMob] Creating Rewarded Interstitial ad:', adUnitId);
    
    const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    let rewardEarned = false;
    let completed = false;

    const finish = (success: boolean) => {
      if (completed) return;
      completed = true;
      if (timeoutId) clearTimeout(timeoutId);
      cleanup();
      isShowingAd = false;
      console.log('[AdMob] Rewarded Interstitial finished, success:', success);
      onComplete(success);
    };

    const loadedUnsub = rewardedInterstitial.addAdEventListener(RewardedInterstitialAdEventType.LOADED, () => {
      console.log('[AdMob] Rewarded Interstitial loaded, showing...');
      if (timeoutId) clearTimeout(timeoutId);
      rewardedInterstitial.show();
    });

    const earnedUnsub = rewardedInterstitial.addAdEventListener(RewardedInterstitialAdEventType.EARNED_REWARD, (reward) => {
      console.log('[AdMob] Interstitial reward earned:', reward);
      rewardEarned = true;
    });

    const errorUnsub = rewardedInterstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('[AdMob] Rewarded Interstitial error:', error);
      finish(false);
    });

    const closedUnsub = rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('[AdMob] Rewarded Interstitial closed, reward earned:', rewardEarned);
      finish(rewardEarned);
    });

    const cleanup = () => {
      loadedUnsub();
      earnedUnsub();
      errorUnsub();
      closedUnsub();
    };

    timeoutId = setTimeout(() => {
      console.error('[AdMob] Rewarded Interstitial timeout');
      finish(false);
    }, 15000);

    console.log('[AdMob] Loading Rewarded Interstitial...');
    rewardedInterstitial.load();

  } catch (error) {
    console.error('[AdMob] Rewarded Interstitial error:', error);
    if (timeoutId) clearTimeout(timeoutId);
    isShowingAd = false;
    onComplete(false);
  }
};

// ============================================
// ASYNC WRAPPER'LAR
// ============================================

/**
 * Ödüllü reklam (Promise)
 */
export const showRewardedAdAsync = (): Promise<boolean> => {
  return new Promise((resolve) => {
    showRewardedAd(resolve);
  });
};

/**
 * Ödüllü geçiş reklamı (Promise)
 */
export const showRewardedInterstitialAdAsync = (): Promise<boolean> => {
  return new Promise((resolve) => {
    showRewardedInterstitialAd(resolve);
  });
};

// ============================================
// LEGACY EXPORTS (Geriye Uyumluluk)
// ============================================

export const showDoubleRewardedAd = (
  onComplete: (success: boolean) => void,
  _onProgress?: (current: number, total: number) => void
): void => {
  showRewardedAd(onComplete);
};

export const showInterstitialAd = (
  onComplete: (success: boolean) => void
): void => {
  showRewardedInterstitialAd(onComplete);
};

/**
 * Tek Ödüllü Reklam
 * Her tıklamada sadece 1 ödüllü reklam gösterir
 * 2 tıklama = 2 reklam = içerik açılır
 */
export const showSingleRewardedAd = (
  onComplete: (success: boolean) => void
): void => {
  console.log('[AdMob] Showing single rewarded ad');
  showRewardedAd(onComplete);
};

export const isAdShowing = (): boolean => isShowingAd;
export const preloadAds = async (): Promise<void> => {};
export const areAdsLoaded = (): boolean => true;
