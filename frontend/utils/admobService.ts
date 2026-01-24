/**
 * AdMob Reklam Servisi
 * İki reklam arka arkaya izletilir, kullanıcıya tek reklam gibi görünür
 */

import {
  RewardedAd,
  RewardedAdEventType,
  RewardedInterstitialAd,
  RewardedInterstitialAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

// Production Ad Unit IDs
const AD_UNIT_IDS = {
  // Ödüllü Geçiş Reklamı (Rewarded Interstitial)
  REWARDED_INTERSTITIAL: __DEV__ 
    ? TestIds.REWARDED_INTERSTITIAL 
    : 'ca-app-pub-6980942787991808/2514158595',
  
  // Ödüllü Reklam (Rewarded)
  REWARDED: __DEV__ 
    ? TestIds.REWARDED 
    : 'ca-app-pub-6980942787991808/8616532511',
};

// Reklam instance'ları
let rewardedInterstitialAd: RewardedInterstitialAd | null = null;
let rewardedAd: RewardedAd | null = null;

// Reklam durumları
let isRewardedInterstitialLoaded = false;
let isRewardedLoaded = false;
let isShowingAds = false;

// Callback'ler
let onAdCompleteCallback: ((success: boolean) => void) | null = null;
let onAdProgressCallback: ((current: number, total: number) => void) | null = null;

/**
 * Reklamları önceden yükle
 */
export const preloadAds = async (): Promise<void> => {
  console.log('[AdMob] Preloading ads...');
  
  try {
    await Promise.all([
      loadRewardedInterstitial(),
      loadRewarded(),
    ]);
    console.log('[AdMob] Ads preloaded successfully');
  } catch (error) {
    console.error('[AdMob] Error preloading ads:', error);
  }
};

/**
 * Ödüllü Geçiş Reklamı yükle
 */
const loadRewardedInterstitial = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (rewardedInterstitialAd) {
      rewardedInterstitialAd.removeAllListeners();
    }
    
    rewardedInterstitialAd = RewardedInterstitialAd.createForAdRequest(
      AD_UNIT_IDS.REWARDED_INTERSTITIAL,
      {
        requestNonPersonalizedAdsOnly: false,
      }
    );

    const unsubscribeLoaded = rewardedInterstitialAd.addAdEventListener(
      RewardedInterstitialAdEventType.LOADED,
      () => {
        console.log('[AdMob] Rewarded Interstitial loaded');
        isRewardedInterstitialLoaded = true;
        resolve();
      }
    );

    const unsubscribeError = rewardedInterstitialAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error('[AdMob] Rewarded Interstitial error:', error);
        isRewardedInterstitialLoaded = false;
        reject(error);
      }
    );

    rewardedInterstitialAd.load();
  });
};

/**
 * Ödüllü Reklam yükle
 */
const loadRewarded = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (rewardedAd) {
      rewardedAd.removeAllListeners();
    }
    
    rewardedAd = RewardedAd.createForAdRequest(
      AD_UNIT_IDS.REWARDED,
      {
        requestNonPersonalizedAdsOnly: false,
      }
    );

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('[AdMob] Rewarded Ad loaded');
        isRewardedLoaded = true;
        resolve();
      }
    );

    const unsubscribeError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error('[AdMob] Rewarded Ad error:', error);
        isRewardedLoaded = false;
        reject(error);
      }
    );

    rewardedAd.load();
  });
};

/**
 * İki reklamı arka arkaya göster (tek reklam gibi)
 * Tarifler için kullanılır
 */
export const showDoubleRewardedAd = (
  onComplete: (success: boolean) => void,
  onProgress?: (current: number, total: number) => void
): void => {
  if (isShowingAds) {
    console.log('[AdMob] Ads already showing');
    return;
  }

  onAdCompleteCallback = onComplete;
  onAdProgressCallback = onProgress || null;
  isShowingAds = true;

  // Progress: 0/2
  onAdProgressCallback?.(0, 2);

  showFirstAd();
};

/**
 * İlk reklam (Rewarded Interstitial)
 */
const showFirstAd = async (): Promise<void> => {
  console.log('[AdMob] Showing first ad (Rewarded Interstitial)...');
  
  // Yüklü değilse yükle
  if (!isRewardedInterstitialLoaded) {
    try {
      await loadRewardedInterstitial();
    } catch (error) {
      console.error('[AdMob] Failed to load first ad, trying second...');
      showSecondAd();
      return;
    }
  }

  if (!rewardedInterstitialAd) {
    showSecondAd();
    return;
  }

  let earnedReward = false;

  const unsubscribeEarned = rewardedInterstitialAd.addAdEventListener(
    RewardedInterstitialAdEventType.EARNED_REWARD,
    (reward) => {
      console.log('[AdMob] First ad reward earned:', reward);
      earnedReward = true;
    }
  );

  const unsubscribeClosed = rewardedInterstitialAd.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      console.log('[AdMob] First ad closed');
      unsubscribeEarned();
      unsubscribeClosed();
      isRewardedInterstitialLoaded = false;
      
      // Progress: 1/2
      onAdProgressCallback?.(1, 2);
      
      // İkinci reklamı göster
      setTimeout(() => {
        showSecondAd();
      }, 300); // Kısa gecikme, geçiş yumuşak olsun
    }
  );

  try {
    await rewardedInterstitialAd.show();
  } catch (error) {
    console.error('[AdMob] Error showing first ad:', error);
    unsubscribeEarned();
    unsubscribeClosed();
    showSecondAd();
  }
};

/**
 * İkinci reklam (Rewarded)
 */
const showSecondAd = async (): Promise<void> => {
  console.log('[AdMob] Showing second ad (Rewarded)...');
  
  // Yüklü değilse yükle
  if (!isRewardedLoaded) {
    try {
      await loadRewarded();
    } catch (error) {
      console.error('[AdMob] Failed to load second ad');
      finishAds(true); // İlk reklam izlendi, başarılı say
      return;
    }
  }

  if (!rewardedAd) {
    finishAds(true);
    return;
  }

  let earnedReward = false;

  const unsubscribeEarned = rewardedAd.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    (reward) => {
      console.log('[AdMob] Second ad reward earned:', reward);
      earnedReward = true;
    }
  );

  const unsubscribeClosed = rewardedAd.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      console.log('[AdMob] Second ad closed');
      unsubscribeEarned();
      unsubscribeClosed();
      isRewardedLoaded = false;
      
      // Progress: 2/2
      onAdProgressCallback?.(2, 2);
      
      // Tamamlandı
      finishAds(earnedReward);
    }
  );

  try {
    await rewardedAd.show();
  } catch (error) {
    console.error('[AdMob] Error showing second ad:', error);
    unsubscribeEarned();
    unsubscribeClosed();
    finishAds(true); // İlk reklam izlendi, başarılı say
  }
};

/**
 * Reklamları bitir
 */
const finishAds = (success: boolean): void => {
  console.log('[AdMob] Ads finished, success:', success);
  isShowingAds = false;
  
  // Callback çağır
  onAdCompleteCallback?.(success);
  onAdCompleteCallback = null;
  onAdProgressCallback = null;
  
  // Reklamları tekrar yükle (sonraki kullanım için)
  preloadAds();
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

  showRewardedAdOnly(onComplete);
};

/**
 * Sadece ödüllü reklam göster
 */
const showRewardedAdOnly = async (onComplete: (success: boolean) => void): Promise<void> => {
  if (!isRewardedLoaded) {
    try {
      await loadRewarded();
    } catch (error) {
      console.error('[AdMob] Failed to load rewarded ad');
      isShowingAds = false;
      onComplete(false);
      return;
    }
  }

  if (!rewardedAd) {
    isShowingAds = false;
    onComplete(false);
    return;
  }

  let earnedReward = false;

  const unsubscribeEarned = rewardedAd.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    (reward) => {
      console.log('[AdMob] Rewarded ad reward earned:', reward);
      earnedReward = true;
    }
  );

  const unsubscribeClosed = rewardedAd.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      console.log('[AdMob] Rewarded ad closed');
      unsubscribeEarned();
      unsubscribeClosed();
      isRewardedLoaded = false;
      isShowingAds = false;
      
      onComplete(earnedReward);
      
      // Reklamı tekrar yükle
      loadRewarded();
    }
  );

  try {
    await rewardedAd.show();
  } catch (error) {
    console.error('[AdMob] Error showing rewarded ad:', error);
    unsubscribeEarned();
    unsubscribeClosed();
    isShowingAds = false;
    onComplete(false);
  }
};

/**
 * Reklamlar yüklü mü?
 */
export const areAdsLoaded = (): boolean => {
  return isRewardedInterstitialLoaded || isRewardedLoaded;
};

/**
 * Reklam gösteriliyor mu?
 */
export const isAdShowing = (): boolean => {
  return isShowingAds;
};
