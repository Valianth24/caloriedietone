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
  type: 'recipe' | 'calorie';
  remainingFree?: number;
}

export default function WatchAdModal({
  visible,
  onClose,
  onWatchAd,
  type,
}: WatchAdModalProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

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

  const getTitle = () => {
    if (type === 'recipe') {
      return t('watchAdForRecipe') || 'Premium İçerik';
    }
    return t('watchAdForCalorie') || 'Kalori Hesaplama';
  };

  const getDescription = () => {
    if (type === 'recipe') {
      return t('watchAdRecipeDesc') || 'Bu tarife erişmek için kısa bir video izleyin.';
    }
    return t('watchAdCalorieDesc') || 'Kalori hesaplama için kısa bir video izleyin.';
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
          {/* Premium Header */}
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <View style={styles.starContainer}>
              <Ionicons name="star" size={32} color="#FFD700" />
            </View>
            <Text style={styles.headerTitle}>{getTitle()}</Text>
          </LinearGradient>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#FFF" />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            {/* Description */}
            <Text style={styles.description}>{getDescription()}</Text>

            {/* Feature List */}
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>
                  {type === 'recipe' 
                    ? t('unlockRecipeAccess') || 'Tarife tam erişim'
                    : t('unlockCalorieAccess') || 'Sınırsız hesaplama'
                  }
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="time-outline" size={20} color="#667eea" />
                <Text style={styles.featureText}>
                  {t('shortVideoTime') || 'Sadece 15 saniye'}
                </Text>
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttons}>
              <TouchableOpacity 
                style={styles.watchButton}
                onPress={handleWatchAd}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
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
                        {t('watchVideo') || 'Video İzle'}
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
                  {t('notNow') || 'Şimdi Değil'}
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
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  featureList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    marginBottom: 8,
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
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
