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
import { Colors } from '../constants/Colors';
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
  remainingFree = 0,
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
      return t('watchAdForRecipe') || 'Reklam İzleyerek Devam Et';
    }
    return t('watchAdForCalorie') || 'Reklam İzleyerek Kalori Hesapla';
  };

  const getDescription = () => {
    if (type === 'recipe') {
      return t('watchAdRecipeDesc') || 'Bu tarifi görmek için kısa bir reklam izleyin. İlk 3 tarif her kategoride ücretsiz!';
    }
    return t('watchAdCalorieDesc') || 'Ücretsiz kalori hesaplama için kısa bir reklam izleyin.';
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
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.darkText} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <Ionicons 
              name={type === 'recipe' ? 'play-circle' : 'camera'} 
              size={80} 
              color={Colors.primary} 
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{getTitle()}</Text>

          {/* Description */}
          <Text style={styles.description}>{getDescription()}</Text>

          {/* Info box */}
          <View style={styles.infoBox}>
            <Ionicons name="gift-outline" size={24} color={Colors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>
                {t('100PercentFree') || '%100 Ücretsiz'}
              </Text>
              <Text style={styles.infoDesc}>
                {t('supportWithAds') || 'Reklamları izleyerek bizi destekleyin'}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity 
              style={styles.watchButton}
              onPress={handleWatchAd}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Ionicons name="play-circle" size={24} color="#FFF" />
                  <Text style={styles.watchButtonText}>
                    {t('watchAd') || 'Reklam İzle'} (15s)
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>
                {t('cancel') || 'İptal'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer note */}
          <Text style={styles.footerNote}>
            {type === 'recipe' 
              ? t('first3Free') || 'Her kategoride ilk 3 tarif reklamsız!'
              : t('freeWithAds') || 'Reklamlarla tamamen ücretsiz'
            }
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    width: width - 40,
    maxWidth: 400,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 4,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.darkText,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Colors.primary + '10',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 14,
    color: Colors.lightText,
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  watchButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  watchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.darkText,
    fontSize: 16,
    fontWeight: '500',
  },
  footerNote: {
    fontSize: 12,
    color: Colors.lightText,
    textAlign: 'center',
    marginTop: 16,
  },
});
