/**
 * AdMob Reklam Servisi
 * Ocak 2026 - Güncellenmiş versiyon
 * Tek ödüllü reklam kullanımı
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Production build kontrolü
const isExpoGo = Constants.appOwnership === 'expo';
const isDevelopment = __DEV__;

// MOCK MODU - Production'da kapalı
const USE_MOCK = false;

// Reklam Birimi ID'leri
const AD_UNIT_ID = {
  // Production - Gerçek reklam birimi
  REWARDED: 'ca-app-pub-6980942787991808/1382918054',
  // Test ID (geliştirme için)
  TEST_REWARDED: 'ca-app-pub-3940256099942544/5224354917',
};

// Hangi ID kullanılacak
const REWARDED_AD_ID = USE_MOCK ? AD_UNIT_ID.TEST_REWARDED : AD_UNIT_ID.REWARDED;

// Debug log
console.log('[AdMob] Config:', {
  isExpoGo,
  isDevelopment,
  USE_MOCK,
  platform: Platform.OS,
  adUnitId: REWARDED_AD_ID,
});

// Reklam durumu
let isShowingAd = false;

/**
 * Mock reklam göster (test için)
 */
const showMockAd = async (): Promise<boolean> => {
  console.log('[AdMob MOCK] Showing mock rewarded ad...');
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('[AdMob MOCK] Mock ad completed');
  return true;
};

/**
 * Ödüllü reklam göster
 * Tüm uygulama genelinde bu fonksiyon kullanılır
 */
export const showRewardedAd = (
  onComplete: (success: boolean, reward?: { type: string; amount: number }) => void
): void => {
  if (isShowingAd) {
    console.log('[AdMob] Ad already showing, skipping...');
    onComplete(false);
    return;
  }

  isShowingAd = true;

  // Mock mod (test için)
  if (USE_MOCK) {
    showMockAd().then(() => {
      isShowingAd = false;
      onComplete(true, { type: 'reward', amount: 1 });
    });
    return;
  }

  // Production: Gerçek AdMob reklamı
  showRealRewardedAd(onComplete);
};

/**
 * Gerçek ödüllü reklam göster
 */
const showRealRewardedAd = async (
  onComplete: (success: boolean, reward?: { type: string; amount: number }) => void
): Promise<void> => {
  try {
    console.log('[AdMob] Loading react-native-google-mobile-ads...');
    
    const { RewardedAd, RewardedAdEventType, AdEventType } = await import('react-native-google-mobile-ads');

    console.log('[AdMob] Creating rewarded ad with ID:', REWARDED_AD_ID);
    
    const rewarded = RewardedAd.createForAdRequest(REWARDED_AD_ID, {
      requestNonPersonalizedAdsOnly: false,
    });

    let rewardEarned = false;
    let earnedReward: { type: string; amount: number } | undefined;

    // Reklam yüklendi
    const loadedUnsubscribe = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('[AdMob] Rewarded ad loaded, showing...');
      rewarded.show();
    });

    // Ödül kazanıldı
    const earnedUnsubscribe = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('[AdMob] Reward earned:', reward);
      rewardEarned = true;
      earnedReward = { type: reward.type, amount: reward.amount };
    });

    // Hata oluştu
    const errorUnsubscribe = rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('[AdMob] Ad error:', error);
      cleanup();
      isShowingAd = false;
      onComplete(false);
    });

    // Reklam kapandı
    const closedUnsubscribe = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('[AdMob] Ad closed, reward earned:', rewardEarned);
      cleanup();
      isShowingAd = false;
      onComplete(rewardEarned, earnedReward);
    });

    // Cleanup fonksiyonu
    const cleanup = () => {
      loadedUnsubscribe();
      earnedUnsubscribe();
      errorUnsubscribe();
      closedUnsubscribe();
    };

    // Timeout (15 saniye)
    const timeout = setTimeout(() => {
      console.error('[AdMob] Ad load timeout');
      cleanup();
      isShowingAd = false;
      onComplete(false);
    }, 15000);

    // Yükleme başladığında timeout'u temizle
    const originalCleanup = cleanup;
    const cleanupWithTimeout = () => {
      clearTimeout(timeout);
      originalCleanup();
    };

    // Reklamı yükle
    console.log('[AdMob] Loading ad...');
    rewarded.load();

  } catch (error) {
    console.error('[AdMob] Error:', error);
    isShowingAd = false;
    onComplete(false);
  }
};

/**
 * Promise tabanlı reklam gösterme (async/await için)
 */
export const showRewardedAdAsync = (): Promise<boolean> => {
  return new Promise((resolve) => {
    showRewardedAd((success) => {
      resolve(success);
    });
  });
};

/**
 * Reklam durumunu kontrol et
 */
export const isAdShowing = (): boolean => {
  return isShowingAd;
};

// Eski fonksiyon isimleri için uyumluluk (geriye dönük)
export const showDoubleRewardedAd = (
  onComplete: (success: boolean) => void,
  _onProgress?: (current: number, total: number) => void
): void => {
  showRewardedAd((success) => {
    onComplete(success);
  });
};

export const showInterstitialAd = (
  onComplete: (success: boolean) => void
): void => {
  showRewardedAd((success) => {
    onComplete(success);
  });
};

export const showSingleRewardedAd = (
  onComplete: (success: boolean) => void
): void => {
  showRewardedAd((success) => {
    onComplete(success);
  });
};

// Legacy exports
export const preloadAds = async (): Promise<void> => {
  console.log('[AdMob] Preload called (not needed with new API)');
};

export const areAdsLoaded = (): boolean => {
  return true;
};
