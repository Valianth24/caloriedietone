/**
 * AnimatedCard Component
 * Gelişmiş animasyonlu kart wrapper'ı
 * 
 * Features:
 * - Staggered entrance animation
 * - Press scale effect with haptic feedback
 * - Smooth progress animations
 */

import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  interpolate,
  Extrapolation,
  runOnJS,
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInRight,
  Layout,
} from 'react-native-reanimated';
import { SPRING_CONFIGS, TIMING_CONFIGS, triggerHaptic } from '../utils/animations';

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  enterAnimation?: 'fadeUp' | 'fadeDown' | 'slideRight' | 'scale' | 'none';
  pressEffect?: 'scale' | 'opacity' | 'both' | 'none';
  hapticFeedback?: boolean;
  staggerDelay?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedCard({
  children,
  index = 0,
  onPress,
  style,
  disabled = false,
  enterAnimation = 'fadeUp',
  pressEffect = 'scale',
  hapticFeedback = true,
  staggerDelay = 80,
}: AnimatedCardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const progress = useSharedValue(0);

  // Entrance animation
  useEffect(() => {
    if (enterAnimation !== 'none') {
      progress.value = 0;
      progress.value = withDelay(
        index * staggerDelay,
        withTiming(1, { duration: 500 })
      );
    }
  }, []);

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    
    if (hapticFeedback) {
      runOnJS(triggerHaptic)('light');
    }
    
    if (pressEffect === 'scale' || pressEffect === 'both') {
      scale.value = withSpring(0.96, SPRING_CONFIGS.snappy);
    }
    if (pressEffect === 'opacity' || pressEffect === 'both') {
      opacity.value = withTiming(0.8, { duration: 100 });
    }
  }, [disabled, hapticFeedback, pressEffect]);

  const handlePressOut = useCallback(() => {
    if (pressEffect === 'scale' || pressEffect === 'both') {
      scale.value = withSpring(1, SPRING_CONFIGS.bouncy);
    }
    if (pressEffect === 'opacity' || pressEffect === 'both') {
      opacity.value = withTiming(1, { duration: 150 });
    }
  }, [pressEffect]);

  const handlePress = useCallback(() => {
    if (!disabled && onPress) {
      onPress();
    }
  }, [disabled, onPress]);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    // Entrance animation interpolation
    const enterOpacity = enterAnimation !== 'none' 
      ? interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP)
      : 1;
    
    const enterTranslateY = enterAnimation === 'fadeUp'
      ? interpolate(progress.value, [0, 1], [30, 0], Extrapolation.CLAMP)
      : enterAnimation === 'fadeDown'
      ? interpolate(progress.value, [0, 1], [-30, 0], Extrapolation.CLAMP)
      : 0;
    
    const enterScale = enterAnimation === 'scale'
      ? interpolate(progress.value, [0, 1], [0.9, 1], Extrapolation.CLAMP)
      : 1;

    return {
      opacity: enterOpacity * opacity.value,
      transform: [
        { translateY: enterTranslateY + translateY.value },
        { scale: scale.value * enterScale },
      ] as const,
    };
  });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[styles.container, style, animatedStyle]}
      disabled={disabled && !onPress}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // Base styles inherited from children
  },
});

// ============================================
// Specialized Animated Components
// ============================================

/**
 * Animated Progress Bar
 */
export function AnimatedProgressBar({
  progress,
  color,
  backgroundColor = '#E0E0E0',
  height = 8,
  borderRadius = 4,
  animated = true,
}: {
  progress: number;
  color: string;
  backgroundColor?: string;
  height?: number;
  borderRadius?: number;
  animated?: boolean;
}) {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      animatedProgress.value = withDelay(
        300,
        withTiming(progress, { duration: 1000 })
      );
    } else {
      animatedProgress.value = progress;
    }
  }, [progress, animated]);

  const progressStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      width: `${Math.min(animatedProgress.value, 100)}%`,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height,
          backgroundColor,
          borderRadius,
          overflow: 'hidden',
        },
      ]}
    >
      <Animated.View
        style={[
          {
            height: '100%',
            backgroundColor: color,
            borderRadius,
          },
          progressStyle,
        ]}
      />
    </Animated.View>
  );
}

/**
 * Animated Number Counter
 */
export function AnimatedCounter({
  value,
  duration = 1500,
  style,
  suffix = '',
  prefix = '',
}: {
  value: number;
  duration?: number;
  style?: any;
  suffix?: string;
  prefix?: string;
}) {
  const animatedValue = useSharedValue(0);
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration });
  }, [value, duration]);

  // Update display value using React Native Reanimated's runOnJS
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue(Math.round(animatedValue.value));
    }, 16);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.Text style={style}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </Animated.Text>
  );
}

/**
 * Shimmer Loading Effect
 */
export function ShimmerPlaceholder({
  width,
  height,
  borderRadius = 8,
}: {
  width: number | string;
  height: number;
  borderRadius?: number;
}) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: interpolate(
        shimmer.value,
        [0, 0.5, 1],
        [0.3, 0.7, 0.3],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#E0E0E0',
        },
        shimmerStyle,
      ]}
    />
  );
}

// Re-export withRepeat for ShimmerPlaceholder
import { withRepeat } from 'react-native-reanimated';
