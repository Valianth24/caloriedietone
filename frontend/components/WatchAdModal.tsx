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
  type?: 'recipe' | 'calorie' | 'diet' | 'general';
  title?: string;
  description?: string;
}

export default function WatchAdModal({
  visible,
  onClose,
  onWatchAd,
  type = 'general',
  title,
  description,
}: WatchAdModalProps) {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const lang = i18n.language === 'tr' ? 'tr' : 'en';

  const handleWatchAd = async () => {
    setLoading(true);
    try {
      await onWatchAd();
    } catch (error) {
      console.error('Error watching ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'recipe': return 'restaurant';
      case 'calorie': return 'camera';
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
      ? 'İçeriğe erişmek için kısa bir reklam izleyin.'
      : 'Watch a short ad to access the content.';
  };

  const getGradientColors = (): [string, string] => {
    switch (type) {
      case 'recipe': return ['#FF6B6B', '#FF8E53'];
      case 'calorie': return ['#667eea', '#764ba2'];
      case 'diet': return ['#4CAF50', '#8BC34A'];
      default: return ['#667eea', '#764ba2'];
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
                      {lang === 'tr' ? 'Reklam İzle' : 'Watch Ad'}
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
    marginBottom: 24,
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
