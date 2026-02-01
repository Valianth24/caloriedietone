import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

interface LevelUpModalProps {
  visible: boolean;
  level: number;
  onClose: () => void;
}

export default function LevelUpModal({ visible, level, onClose }: LevelUpModalProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'tr' ? 'tr' : 'en';
  
  // Animations
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const raysRotation = useSharedValue(0);
  
  useEffect(() => {
    if (visible) {
      // Main card entrance
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
      });
      opacity.value = withTiming(1, { duration: 300 });
      
      // Level number rotation
      rotation.value = withSequence(
        withDelay(200, withSpring(360, { damping: 10 })),
        withTiming(0, { duration: 0 })
      );
      
      // Glow pulse
      glowOpacity.value = withDelay(
        400,
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.6, { duration: 600 }),
          withTiming(1, { duration: 600 })
        )
      );
      
      // Background rays rotation
      raysRotation.value = withDelay(
        200,
        withTiming(360, {
          duration: 20000,
          easing: Easing.linear,
        })
      );
    } else {
      scale.value = 0;
      opacity.value = 0;
      rotation.value = 0;
      glowOpacity.value = 0;
      raysRotation.value = 0;
    }
  }, [visible]);
  
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const levelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: interpolate(rotation.value, [0, 180, 360], [1, 1.2, 1]) }
      ],
    };
  });
  
  const glowAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
    };
  });
  
  const raysAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${raysRotation.value}deg` }],
    };
  });
  
  if (!visible) return null;
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, containerAnimatedStyle]}>
        {/* Background Rays */}
        <Animated.View style={[styles.raysContainer, raysAnimatedStyle]}>
          {[...Array(12)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.ray,
                {
                  transform: [{ rotate: `${i * 30}deg` }],
                },
              ]}
            />
          ))}
        </Animated.View>
        
        {/* Main Card */}
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          <LinearGradient
            colors={['#4CAF50', '#81C784']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            {/* Glow Effect */}
            <Animated.View style={[styles.glowCircle, glowAnimatedStyle]} />
            
            {/* Content */}
            <View style={styles.content}>
              {/* Success Icon */}
              <View style={styles.iconContainer}>
                <Ionicons name="trophy" size={60} color="#FFD700" />
              </View>
              
              {/* Title */}
              <Text style={styles.title}>
                {lang === 'tr' ? 'SEVİYE ATLADIN!' : 'LEVEL UP!'}
              </Text>
              
              {/* Level Number */}
              <Animated.View style={[styles.levelContainer, levelAnimatedStyle]}>
                <Text style={styles.levelNumber}>{level}</Text>
              </Animated.View>
              
              {/* Subtitle */}
              <Text style={styles.subtitle}>
                {lang === 'tr' 
                  ? 'Harika iş! Devam et!' 
                  : 'Great job! Keep going!'}
              </Text>
              
              {/* Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Ionicons name="star" size={24} color="#FFD700" />
                  <Text style={styles.statLabel}>
                    {lang === 'tr' ? 'Yeni Seviye' : 'New Level'}
                  </Text>
                </View>
              </View>
              
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>
                  {lang === 'tr' ? 'Devam Et' : 'Continue'}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  raysContainer: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ray: {
    position: 'absolute',
    width: 4,
    height: width * 0.75,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 2,
  },
  card: {
    width: width - 60,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  gradient: {
    padding: 32,
  },
  glowCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    marginLeft: -100,
    marginTop: -100,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ scale: 1.5 }],
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  levelContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  levelNumber: {
    fontSize: 56,
    fontWeight: '900',
    color: '#4CAF50',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  closeButton: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
});
