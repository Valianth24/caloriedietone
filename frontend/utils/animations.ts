/**
 * Advanced Animation Utilities
 * React Native Reanimated 4 ile gelişmiş animasyonlar
 * 
 * @author CalorieDiet App
 * @version 2.0.0
 */

import {
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  Easing,
  interpolate,
  Extrapolation,
  SharedValue,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

// ============================================
// SPRING CONFIGURATIONS
// ============================================

export const SPRING_CONFIGS = {
  // Bouncy - kartlar ve butonlar için
  bouncy: {
    damping: 12,
    stiffness: 180,
    mass: 1,
  },
  // Gentle - modal ve overlay için
  gentle: {
    damping: 20,
    stiffness: 120,
    mass: 1,
  },
  // Snappy - hızlı mikro etkileşimler için
  snappy: {
    damping: 15,
    stiffness: 400,
    mass: 0.8,
  },
  // Wobbly - kutlama animasyonları için
  wobbly: {
    damping: 8,
    stiffness: 200,
    mass: 1,
  },
  // Stiff - hassas kontroller için
  stiff: {
    damping: 25,
    stiffness: 300,
    mass: 1,
  },
};

// ============================================
// TIMING CONFIGURATIONS
// ============================================

export const TIMING_CONFIGS = {
  fast: { duration: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
  normal: { duration: 350, easing: Easing.bezier(0.4, 0, 0.2, 1) },
  slow: { duration: 500, easing: Easing.bezier(0.4, 0, 0.2, 1) },
  entrance: { duration: 400, easing: Easing.out(Easing.cubic) },
  exit: { duration: 250, easing: Easing.in(Easing.cubic) },
};

// ============================================
// STAGGER DELAYS
// ============================================

export const STAGGER_DELAY = {
  fast: 50,
  normal: 80,
  slow: 120,
};

// ============================================
// ANIMATION BUILDERS
// ============================================

/**
 * Staggered entrance animation için delay hesapla
 */
export const getStaggerDelay = (index: number, baseDelay: number = STAGGER_DELAY.normal) => {
  return index * baseDelay;
};

/**
 * Scale press animation
 */
export const createPressAnimation = (
  scale: SharedValue<number>,
  pressed: boolean,
  intensity: 'light' | 'medium' | 'heavy' = 'medium'
) => {
  'worklet';
  const scaleValues = {
    light: 0.98,
    medium: 0.95,
    heavy: 0.90,
  };
  
  scale.value = withSpring(pressed ? scaleValues[intensity] : 1, SPRING_CONFIGS.snappy);
};

/**
 * Bounce animation
 */
export const createBounceAnimation = (value: SharedValue<number>) => {
  'worklet';
  value.value = withSequence(
    withTiming(1.1, { duration: 100 }),
    withSpring(1, SPRING_CONFIGS.bouncy)
  );
};

/**
 * Shake animation (error feedback)
 */
export const createShakeAnimation = (translateX: SharedValue<number>) => {
  'worklet';
  translateX.value = withSequence(
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(0, { duration: 50 })
  );
};

/**
 * Pulse animation (attention grabber)
 */
export const createPulseAnimation = (scale: SharedValue<number>) => {
  'worklet';
  scale.value = withRepeat(
    withSequence(
      withTiming(1.05, { duration: 500 }),
      withTiming(1, { duration: 500 })
    ),
    -1, // infinite
    true
  );
};

/**
 * Progress bar animation
 */
export const animateProgress = (
  progress: SharedValue<number>,
  targetValue: number,
  duration: number = 1000
) => {
  'worklet';
  progress.value = withTiming(targetValue, {
    duration,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
};

/**
 * Counter animation (sayı artırma efekti)
 */
export const createCounterAnimation = (
  value: SharedValue<number>,
  from: number,
  to: number,
  duration: number = 1500
) => {
  'worklet';
  value.value = from;
  value.value = withTiming(to, {
    duration,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
};

// ============================================
// INTERPOLATION HELPERS
// ============================================

/**
 * Opacity fade interpolation
 */
export const fadeInterpolation = (
  animatedValue: number,
  inputRange: [number, number] = [0, 1]
): number => {
  'worklet';
  return interpolate(animatedValue, inputRange, [0, 1], Extrapolation.CLAMP);
};

/**
 * Scale interpolation
 */
export const scaleInterpolation = (
  animatedValue: number,
  inputRange: [number, number] = [0, 1],
  outputRange: [number, number] = [0.8, 1]
): number => {
  'worklet';
  return interpolate(animatedValue, inputRange, outputRange, Extrapolation.CLAMP);
};

/**
 * Slide Y interpolation
 */
export const slideYInterpolation = (
  animatedValue: number,
  inputRange: [number, number] = [0, 1],
  outputRange: [number, number] = [50, 0]
): number => {
  'worklet';
  return interpolate(animatedValue, inputRange, outputRange, Extrapolation.CLAMP);
};

// ============================================
// HAPTIC FEEDBACK
// ============================================

export const triggerHaptic = (
  type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light'
) => {
  try {
    switch (type) {
      case 'light':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch (e) {
    // Haptics not available
  }
};

// ============================================
// LAYOUT ANIMATION PRESETS
// ============================================

export const ENTERING_ANIMATIONS = {
  // Fade + Slide Up
  fadeSlideUp: {
    initialValues: {
      opacity: 0,
      transform: [{ translateY: 30 }],
    },
    animations: {
      opacity: withTiming(1, TIMING_CONFIGS.entrance),
      transform: [{ translateY: withSpring(0, SPRING_CONFIGS.gentle) }],
    },
  },
  
  // Scale + Fade
  scaleFade: {
    initialValues: {
      opacity: 0,
      transform: [{ scale: 0.9 }],
    },
    animations: {
      opacity: withTiming(1, TIMING_CONFIGS.entrance),
      transform: [{ scale: withSpring(1, SPRING_CONFIGS.bouncy) }],
    },
  },
  
  // Slide from Right
  slideFromRight: {
    initialValues: {
      opacity: 0,
      transform: [{ translateX: 50 }],
    },
    animations: {
      opacity: withTiming(1, TIMING_CONFIGS.entrance),
      transform: [{ translateX: withSpring(0, SPRING_CONFIGS.gentle) }],
    },
  },
};

// ============================================
// CARD ANIMATION STYLES
// ============================================

export const CARD_SHADOW_PRESSED = {
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 1,
};

export const CARD_SHADOW_DEFAULT = {
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
};

export const CARD_SHADOW_HOVER = {
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 5,
};
