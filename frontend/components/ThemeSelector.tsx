import React, { memo, useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { themes, themeMetadata, ThemeName } from '../constants/Themes';
import { useTranslation } from 'react-i18next';
import { 
  isThemeUnlocked, 
  getThemeAdCount, 
  getThemeRemainingHours, 
  watchAdForTheme,
  THEME_UNLOCK_CONFIG 
} from '../utils/adSystem';

const { width } = Dimensions.get('window');

function ThemeSelector() {
  const { currentTheme, setTheme, isPremium } = useTheme();
  const { t } = useTranslation();
  const [themeStates, setThemeStates] = useState<Record<string, { unlocked: boolean; adsWatched: number; remainingHours: number }>>({});
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName | null>(null);
  const [loading, setLoading] = useState(false);

  // Tema durumlarını yükle
  const loadThemeStates = useCallback(async () => {
    const states: Record<string, { unlocked: boolean; adsWatched: number; remainingHours: number }> = {};
    const themeList = Object.keys(themeMetadata) as ThemeName[];
    
    for (const themeName of themeList) {
      if (themeName === 'default') {
        states[themeName] = { unlocked: true, adsWatched: 0, remainingHours: 0 };
      } else {
        const [unlocked, adsWatched, remainingHours] = await Promise.all([
          isThemeUnlocked(themeName),
          getThemeAdCount(themeName),
          getThemeRemainingHours(themeName)
        ]);
        states[themeName] = { unlocked, adsWatched, remainingHours };
      }
    }
    
    setThemeStates(states);
  }, []);

  useEffect(() => {
    loadThemeStates();
    // Her dakika kontrol et (süre dolmuş mu?)
    const interval = setInterval(loadThemeStates, 60000);
    return () => clearInterval(interval);
  }, [loadThemeStates]);

  const handleThemePress = useCallback((themeName: ThemeName) => {
    // Premium kullanıcılar her zaman erişebilir
    if (isPremium || themeName === 'default') {
      setTheme(themeName);
      return;
    }

    const state = themeStates[themeName];
    
    // Tema kilidi açıksa seç
    if (state?.unlocked) {
      setTheme(themeName);
      return;
    }

    // Modal göster
    setSelectedTheme(themeName);
    setShowUnlockModal(true);
  }, [setTheme, isPremium, themeStates]);

  const handleWatchAd = async () => {
    if (!selectedTheme) return;
    
    setLoading(true);
    try {
      const result = await watchAdForTheme(selectedTheme);
      
      if (result.unlocked) {
        setTheme(selectedTheme);
        setShowUnlockModal(false);
      }
      
      await loadThemeStates();
    } catch (error) {
      console.error('Error watching ad for theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const themeList = Object.keys(themeMetadata) as ThemeName[];

  const renderUnlockModal = () => {
    if (!selectedTheme) return null;
    
    const meta = themeMetadata[selectedTheme];
    const state = themeStates[selectedTheme] || { unlocked: false, adsWatched: 0, remainingHours: 0 };
    const adsRemaining = THEME_UNLOCK_CONFIG.ADS_REQUIRED - state.adsWatched;

    return (
      <Modal
        visible={showUnlockModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUnlockModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <LinearGradient
              colors={[meta.color, meta.color + 'CC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalHeader}
            >
              <View style={styles.themeIconLarge}>
                <Ionicons name={meta.icon as any} size={36} color="#FFF" />
              </View>
              <Text style={styles.modalTitle}>{meta.name}</Text>
              <Text style={styles.modalSubtitle}>{t('unlockTheme') || 'Temayı Aç'}</Text>
            </LinearGradient>

            {/* Close */}
            <TouchableOpacity 
              style={styles.modalClose} 
              onPress={() => setShowUnlockModal(false)}
            >
              <Ionicons name="close" size={22} color="#FFF" />
            </TouchableOpacity>

            {/* Content */}
            <View style={styles.modalBody}>
              {/* Progress */}
              <View style={styles.progressSection}>
                <Text style={styles.progressTitle}>
                  {t('watchAdsToUnlock') || 'Video izleyerek aç'}
                </Text>
                
                <View style={styles.progressBar}>
                  {[1, 2, 3].map((num) => (
                    <View 
                      key={num} 
                      style={[
                        styles.progressDot,
                        num <= state.adsWatched && { backgroundColor: meta.color }
                      ]}
                    >
                      {num <= state.adsWatched ? (
                        <Ionicons name="checkmark" size={14} color="#FFF" />
                      ) : (
                        <Text style={styles.progressNumber}>{num}</Text>
                      )}
                    </View>
                  ))}
                </View>

                <Text style={styles.progressText}>
                  {state.adsWatched}/{THEME_UNLOCK_CONFIG.ADS_REQUIRED} {t('videosWatched') || 'video izlendi'}
                </Text>
              </View>

              {/* Info */}
              <View style={styles.infoSection}>
                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={20} color="#667eea" />
                  <Text style={styles.infoText}>
                    {t('unlockFor24Hours') || '24 saat kullanım hakkı'}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="refresh-outline" size={20} color="#667eea" />
                  <Text style={styles.infoText}>
                    {t('extendAnytime') || 'İstediğiniz zaman uzatın'}
                  </Text>
                </View>
              </View>

              {/* Button */}
              <TouchableOpacity 
                style={styles.watchAdButton}
                onPress={handleWatchAd}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[meta.color, meta.color + 'DD']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.watchAdGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <>
                      <Ionicons name="play" size={22} color="#FFF" />
                      <Text style={styles.watchAdText}>
                        {t('watchVideo') || 'Video İzle'} ({adsRemaining} {t('remaining') || 'kaldı'})
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Başlık */}
      <View style={styles.header}>
        <Ionicons name="color-palette-outline" size={22} color="#4CAF50" />
        <Text style={styles.headerText}>{t('themes') || 'Temalar'}</Text>
        {isPremium && (
          <View style={styles.proBadge}>
            <Text style={styles.proText}>PRO</Text>
          </View>
        )}
      </View>

      {/* Tema Kartları */}
      <View style={styles.grid}>
        {themeList.map((themeName) => {
          const meta = themeMetadata[themeName];
          const isActive = currentTheme === themeName;
          const state = themeStates[themeName] || { unlocked: false, adsWatched: 0, remainingHours: 0 };
          const isLocked = themeName !== 'default' && !isPremium && !state.unlocked;
          const hasProgress = !isPremium && state.adsWatched > 0 && !state.unlocked;

          return (
            <TouchableOpacity
              key={themeName}
              style={[
                styles.card,
                isActive && { borderColor: meta.color, borderWidth: 2 },
              ]}
              onPress={() => handleThemePress(themeName)}
              activeOpacity={0.8}
            >
              {/* Aktif Badge */}
              {isActive && (
                <View style={[styles.badge, { backgroundColor: meta.color }]}>
                  <Ionicons name="checkmark" size={12} color="#FFF" />
                </View>
              )}
              
              {/* Kilit Badge */}
              {isLocked && !hasProgress && (
                <View style={[styles.badge, { backgroundColor: '#9CA3AF' }]}>
                  <Ionicons name="star" size={10} color="#FFD700" />
                </View>
              )}

              {/* Progress Badge */}
              {hasProgress && (
                <View style={[styles.progressBadge, { backgroundColor: meta.color }]}>
                  <Text style={styles.progressBadgeText}>
                    {state.adsWatched}/3
                  </Text>
                </View>
              )}

              {/* Kalan Süre */}
              {state.unlocked && state.remainingHours > 0 && !isPremium && (
                <View style={[styles.timeBadge, { backgroundColor: meta.color }]}>
                  <Ionicons name="time-outline" size={10} color="#FFF" />
                  <Text style={styles.timeBadgeText}>{state.remainingHours}h</Text>
                </View>
              )}

              {/* İkon */}
              <View style={[styles.iconCircle, { backgroundColor: meta.color }]}>
                <Ionicons name={meta.icon as any} size={24} color="#FFF" />
              </View>

              {/* İsim */}
              <Text style={[styles.themeName, isLocked && styles.lockedText]}>
                {meta.name}
              </Text>

              {/* Renk Noktası */}
              <View style={[styles.colorDot, { backgroundColor: meta.color }]} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Unlock Modal */}
      {renderUnlockModal()}
    </View>
  );
}

export default memo(ThemeSelector);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  proBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  proText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  progressBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  timeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 2,
  },
  timeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  themeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  lockedText: {
    color: '#666',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: width - 48,
    maxWidth: 380,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  themeIconLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  modalSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    padding: 24,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  progressText: {
    fontSize: 13,
    color: '#666',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    marginBottom: 8,
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  watchAdButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  watchAdGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  watchAdText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
