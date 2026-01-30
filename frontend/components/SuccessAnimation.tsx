/**
 * Success Animation Component
 * Profesyonel ve minimal başarı animasyonu
 */

import React, { useEffect, memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Extrapolation,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Circle, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SuccessAnimationProps {
  visible: boolean;
  onComplete?: () => void;
  message?: string;
  type?: 'success' | 'saved' | 'added' | 'deleted';
  duration?: number;
}

export default function SuccessAnimation({ 
  visible, 
  onComplete, 
  message,
  type = 'success',
  duration = 1800
}: SuccessAnimationProps) {
  const containerOpacity = useSharedValue(0);
  const containerScale = useSharedValue(0.9);
  const circleProgress = useSharedValue(0);
  const checkmarkProgress = useSharedValue(0);
  const iconScale = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(10);

  useEffect(() => {
    if (visible) {
      // Haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Container fade in
      containerOpacity.value = withTiming(1, { duration: 200 });
      containerScale.value = withSpring(1, { damping: 15, stiffness: 200 });
      
      // Circle drawing animation
      circleProgress.value = withDelay(100, withTiming(1, { 
        duration: 400, 
        easing: Easing.out(Easing.cubic) 
      }));
      
      // Checkmark drawing animation
      checkmarkProgress.value = withDelay(400, withTiming(1, { 
        duration: 300, 
        easing: Easing.out(Easing.cubic) 
      }));
      
      // Icon bounce
      iconScale.value = withDelay(600, withSequence(
        withSpring(1.15, { damping: 8, stiffness: 300 }),
        withSpring(1, { damping: 12, stiffness: 200 })
      ));
      
      // Message fade in
      messageOpacity.value = withDelay(500, withTiming(1, { duration: 200 }));
      messageTranslateY.value = withDelay(500, withSpring(0, { damping: 15, stiffness: 200 }));

      // Auto dismiss
      const timer = setTimeout(() => {
        containerOpacity.value = withTiming(0, { duration: 200 });
        containerScale.value = withTiming(0.95, { duration: 200 });
        if (onComplete) {
          setTimeout(() => runOnJS(onComplete)(), 200);
        }
      }, duration);

      return () => clearTimeout(timer);
    } else {
      containerOpacity.value = 0;
      containerScale.value = 0.9;
      circleProgress.value = 0;
      checkmarkProgress.value = 0;
      iconScale.value = 0;
      messageOpacity.value = 0;
      messageTranslateY.value = 10;
    }
  }, [visible, onComplete, duration]);

  const containerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: containerOpacity.value,
      transform: [{ scale: containerScale.value }],
    };
  });

  const iconContainerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: iconScale.value }],
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

  // Icon ve renk seçimi
  const getConfig = () => {
    switch (type) {
      case 'saved':
        return { icon: 'checkmark', color: Colors.success, bgColor: Colors.success + '15' };
      case 'added':
        return { icon: 'checkmark', color: Colors.primary, bgColor: Colors.primary + '15' };
      case 'deleted':
        return { icon: 'checkmark', color: Colors.error, bgColor: Colors.error + '15' };
      default:
        return { icon: 'checkmark', color: Colors.success, bgColor: Colors.success + '15' };
    }
  };

  const config = getConfig();

  // Circle parametreleri
  const size = 72;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={[styles.card, { backgroundColor: config.bgColor }]}>
        {/* Animated Circle with Checkmark */}
        <Animated.View style={[styles.iconContainer, iconContainerStyle]}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={config.color + '30'}
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Animated progress circle */}
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={config.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - circleProgress.value)}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          
          {/* Checkmark icon */}
          <View style={styles.checkmarkContainer}>
            <Ionicons name="checkmark" size={32} color={config.color} />
          </View>
        </Animated.View>

        {/* Message */}
        {message && (
          <Animated.Text style={[styles.message, { color: config.color }, messageStyle]}>
            {message}
          </Animated.Text>
        )}
      </View>
    </Animated.View>
  );
}

// Compact toast-style success indicator
export function SuccessToast({ 
  visible, 
  message, 
  onComplete,
  duration = 2000 
}: {
  visible: boolean;
  message: string;
  onComplete?: () => void;
  duration?: number;
}) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });

      const timer = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 200 });
        translateY.value = withTiming(-100, { duration: 200 });
        if (onComplete) {
          setTimeout(() => runOnJS(onComplete)(), 200);
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onComplete]);

  const toastStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, toastStyle]}>
      <View style={styles.toastIcon}>
        <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
      </View>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
  },
  card: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 160,
  },
  iconContainer: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Toast styles
  toast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9999,
  },
  toastIcon: {
    marginRight: 12,
  },
  toastText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
  },
});
