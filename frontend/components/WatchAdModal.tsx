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

const { width } = Dimensions.get('window');

interface WatchAdModalProps {
  visible: boolean;
  onClose: () => void;
  onWatchAd: () => Promise<void>;
  type: 'recipe' | 'calorie' | 'calorie_calculation' | 'diet_entry' | 'diet_day';
  isFirstTime?: boolean;
  dietDay?: number; // Diet günü için
}

export default function WatchAdModal({
  visible,
  onClose,
  onWatchAd,
  type,
  isFirstTime = true,
  dietDay,
}: WatchAdModalProps) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const lang = i18n.language === 'tr' ? 'tr' : 'en';

  const handleWatchAd = async () => {
    setLoading(true);
    try {
      await onWatchAd();
      onClose();
    } catch (error) {
      console.error('Error watching ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'recipe': return 'restaurant';
      case 'calorie': return 'flame';
      case 'calorie_calculation': return 'camera';
      case 'diet_entry': return 'fitness';
      case 'diet_day': return 'calendar';
      default: return 'star';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'recipe':
        return t('watchAdForRecipe');
      case 'calorie':
        return t('watchAdForCalorie');
      case 'calorie_calculation':
        return lang === 'tr' ? 'Kalori Hesaplama' : 'Calorie Calculation';
      case 'diet_entry':
        return lang === 'tr' ? 'Diyet Programına Eriş' : 'Access Diet Program';
      case 'diet_day':
        return lang === 'tr' ? `Gün ${dietDay} Kilidi Aç` : `Unlock Day ${dietDay}`;
      default:
        return t('watchAd');
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'recipe':
        return t('watchAdToViewRecipe');
      case 'calorie':
        return t('watchAdToCalculate');
      case 'calorie_calculation':
        return lang === 'tr' 
          ? 'Fotoğrafınızdan kalori hesaplamak için kısa bir reklam izleyin. 3 reklam arka arkaya gösterilecektir.'
          : 'Watch a short ad to calculate calories from your photo. 3 ads will be shown in sequence.';
      case 'diet_entry':
        return lang === 'tr'
          ? 'Diyet programına erişmek için kısa bir reklam izleyin. 3 reklam arka arkaya gösterilecektir.'
          : 'Watch a short ad to access the diet program. 3 ads will be shown in sequence.';
      case 'diet_day':
        return lang === 'tr'
          ? `Gün ${dietDay} içeriğini görmek için kısa bir reklam izleyin. 3 reklam arka arkaya gösterilecektir.`
          : `Watch a short ad to see Day ${dietDay} content. 3 ads will be shown in sequence.`;
      default:
        return t('watchAdDescription');
    }
  };

  const getGradientColors = (): [string, string] => {
    switch (type) {
      case 'calorie_calculation':
        return ['#FF6B6B', '#FF8E53'];
      case 'diet_entry':
        return ['#4CAF50', '#8BC34A'];
      case 'diet_day':
        return ['#2196F3', '#03A9F4'];
      default:
        return ['#667eea', '#764ba2'];
    }
  };

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
            <View style={styles.starContainer}>
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
            {/* Ad count indicator */}
            <View style={styles.adCountContainer}>
              <View style={styles.adCountBadge}>
                <Ionicons name="videocam" size={16} color="#667eea" />
                <Text style={styles.adCountText}>
                  {lang === 'tr' ? '3 Reklam' : '3 Ads'}
                </Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>{getDescription()}</Text>

            {/* Buttons */}
            <View style={styles.buttons}>
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
                        {t('watchAd')}
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={onClose}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>
                  {t('notNow')}
                </Text>
              </TouchableOpacity>
            </View>
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
  starContainer: {
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
  adCountContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  adCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#667eea15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  adCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttons: {
    gap: 12,
  },
  watchButton: {
    borderRadius: 12,
    overflow: 'hidden',
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
