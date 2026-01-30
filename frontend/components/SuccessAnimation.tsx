/**
 * Success Animation Component
 * Konfeti ve kutlama efektleri için
 */

import React, { useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SuccessAnimationProps {
  visible: boolean;
  onComplete?: () => void;
  message?: string;
  type?: 'success' | 'celebration' | 'achievement';
}

// Konfeti parçacığı
const ConfettiPiece = memo(({ delay, color, startX, startY }: { 
  delay: number; 
  color: string; 
  startX: number;
  startY: number;
}) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    // Random horizontal movement
    const randomX = (Math.random() - 0.5) * 200;
    
    opacity.value = withDelay(delay, withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(1500, withTiming(0, { duration: 500 }))
    ));
    
    scale.value = withDelay(delay, withSpring(1, { damping: 10, stiffness: 300 }));
    
    translateY.value = withDelay(delay, withTiming(300, { duration: 2000 }));
    translateX.value = withDelay(delay, withTiming(randomX, { duration: 2000 }));
    rotation.value = withDelay(delay, withRepeat(
      withTiming(360, { duration: 1000 }),
      3,
      false
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: opacity.value,
      transform: [
        { translateX: startX + translateX.value },
        { translateY: startY + translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.confettiPiece,
        { backgroundColor: color },
        animatedStyle,
      ]}
    />
  );
});

// Ana başarı rozeti
const SuccessBadge = memo(({ type }: { type: string }) => {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(-30);
  const innerScale = useSharedValue(0);

  useEffect(() => {
    // Haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Badge entrance animation
    scale.value = withSpring(1, { damping: 8, stiffness: 200 });
    rotation.value = withSpring(0, { damping: 12, stiffness: 150 });
    innerScale.value = withDelay(200, withSpring(1, { damping: 8, stiffness: 300 }));
  }, []);

  const badgeStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const innerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: innerScale.value }],
    };
  });

  const iconName = type === 'achievement' ? 'trophy' : type === 'celebration' ? 'sparkles' : 'checkmark-circle';
  const iconColor = type === 'achievement' ? '#FFD700' : Colors.white;

  return (
    <Animated.View style={[styles.badge, badgeStyle]}>
      <Animated.View style={[styles.badgeInner, innerStyle]}>
        <Ionicons name={iconName as any} size={48} color={iconColor} />
      </Animated.View>
    </Animated.View>
  );
});

export default function SuccessAnimation({ 
  visible, 
  onComplete, 
  message = 'Success!',
  type = 'success'
}: SuccessAnimationProps) {
  const containerOpacity = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(20);

  useEffect(() => {
    if (visible) {
      containerOpacity.value = withTiming(1, { duration: 300 });
      messageOpacity.value = withDelay(400, withTiming(1, { duration: 300 }));
      messageTranslateY.value = withDelay(400, withSpring(0, { damping: 15, stiffness: 200 }));

      // Auto dismiss
      const timer = setTimeout(() => {
        containerOpacity.value = withTiming(0, { duration: 300 });
        if (onComplete) {
          setTimeout(() => runOnJS(onComplete)(), 300);
        }
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      containerOpacity.value = 0;
      messageOpacity.value = 0;
      messageTranslateY.value = 20;
    }
  }, [visible, onComplete]);

  const containerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: containerOpacity.value,
    };
  });

  const messageStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: messageOpacity.value,
      transform: [{ translateY: messageTranslateY.value }],
    };
  });

  if (!visible) return null;

  // Konfeti renkleri
  const confettiColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'];
  
  // Rastgele konfeti parçacıkları oluştur
  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: confettiColors[i % confettiColors.length],
    delay: Math.random() * 500,
    startX: Math.random() * SCREEN_WIDTH - SCREEN_WIDTH / 2,
    startY: -50,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]} pointerEvents="none">
      {/* Konfeti */}
      {type !== 'success' && confettiPieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          delay={piece.delay}
          color={piece.color}
          startX={piece.startX}
          startY={piece.startY}
        />
      ))}

      {/* Merkez rozet */}
      <View style={styles.centerContent}>
        <SuccessBadge type={type} />
        <Animated.Text style={[styles.message, messageStyle]}>
          {message}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  badgeInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  confettiPiece: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});
