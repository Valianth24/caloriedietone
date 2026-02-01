import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

interface WatchAdModalProps {
  visible: boolean;
  onClose: () => void;
  onWatchAd: () => Promise<void>;
  type?: 'recipe' | 'calorie' | 'calorie_calculation' | 'diet' | 'general';
  title?: string;
  description?: string;
  adsWatched?: number;
  loading?: boolean;
  singleAd?: boolean; // Tek reklam modu (progress bar gösterme)
}

export default function WatchAdModal({
  visible,
  onClose,
  onWatchAd,
  type = 'general',
  title,
  description,
  adsWatched: externalAdsWatched,
  loading: externalLoading,
  singleAd = false, // Varsayılan olarak çoklu reklam modu
}: WatchAdModalProps) {
  const { i18n } = useTranslation();
  const [internalLoading, setInternalLoading] = useState(false);
  const lang = i18n.language === 'tr' ? 'tr' : 'en';
  
  // Dışarıdan kontrol ediliyorsa dış değeri kullan
  const adsWatched = externalAdsWatched ?? 0;
  const loading = externalLoading ?? internalLoading;

  const handleWatchAd = async () => {
    if (loading) return;
    
    if (externalLoading === undefined) {
      setInternalLoading(true);
    }
    
    try {
      await onWatchAd();
    } catch (error) {
      console.error('Error watching ad:', error);
    } finally {
      if (externalLoading === undefined) {
        setInternalLoading(false);
      }
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'recipe': return 'restaurant';
      case 'calorie': 
      case 'calorie_calculation': return 'camera';
      case 'diet': return 'fitness';
      default: return 'play-circle';
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case 'recipe':
        return lang === 'tr' ? 'Tarifi Aç' : 'Unlock Recipe';
      case 'calorie':
      case 'calorie_calculation':
        return lang === 'tr' ? 'Kalori Hesapla' : 'Calculate Calories';
      case 'diet':
        return lang === 'tr' ? 'Diyete Eriş' : 'Access Diet';
      default:
        return lang === 'tr' ? 'İçeriği Aç' : 'Unlock Content';
    }
  };

  const getDescription = () => {
    if (description) return description;
    return lang === 'tr' 
      ? '2 kısa reklam izleyerek içeriğe erişin.'
      : 'Watch 2 short ads to access the content.';
  };

  const getGradientColors = (): [string, string] => {
    switch (type) {
      case 'recipe': return ['#FF6B6B', '#FF8E53'];
      case 'calorie': 
      case 'calorie_calculation': return ['#667eea', '#764ba2'];
      case 'diet': return ['#4CAF50', '#8BC34A'];
      default: return ['#667eea', '#764ba2'];
    }
  };

  const remainingAds = 2 - adsWatched;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={getIcon() as any} size={32} color="#FFF" />
            </View>
            <Text style={styles.headerTitle}>{getTitle()}</Text>
          </LinearGradient>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#FFF" />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.description}>{getDescription()}</Text>

            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressDots}>
                <View style={[styles.progressDot, adsWatched >= 1 && styles.progressDotActive]}>
                  {adsWatched >= 1 ? (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  ) : (
                    <Text style={styles.progressDotText}>1</Text>
                  )}
                </View>
                <View style={[styles.progressLine, adsWatched >= 1 && styles.progressLineActive]} />
                <View style={[styles.progressDot, adsWatched >= 2 && styles.progressDotActive]}>
                  {adsWatched >= 2 ? (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  ) : (
                    <Text style={styles.progressDotText}>2</Text>
                  )}
                </View>
              </View>
              <Text style={styles.progressText}>
                {adsWatched}/2 {lang === 'tr' ? 'reklam izlendi' : 'ads watched'}
              </Text>
            </View>

            {/* Watch Ad Button */}
            <TouchableOpacity 
              style={styles.watchButton}
              onPress={handleWatchAd}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={getGradientColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.watchButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Ionicons name="play" size={22} color="#FFF" />
                    <Text style={styles.watchButtonText}>
                      {lang === 'tr' 
                        ? `Reklam İzle (${remainingAds} kaldı)` 
                        : `Watch Ad (${remainingAds} left)`}
                    </Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>
                {lang === 'tr' ? 'Şimdi Değil' : 'Not Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
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
  header: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  // Progress styles
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    backgroundColor: Colors.success,
  },
  progressDotText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
  },
  progressLine: {
    width: 50,
    height: 3,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: Colors.success,
  },
  progressText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  watchButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  watchButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  watchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#999',
    fontSize: 15,
    fontWeight: '500',
  },
});
