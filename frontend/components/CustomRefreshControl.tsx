/**
 * Custom Refresh Control with Lottie-like animation
 * Özel pull-to-refresh animasyonu
 */

import React, { useEffect, useCallback, memo } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface CustomRefreshProps {
  refreshing: boolean;
  onRefresh: () => void;
  colors?: string[];
  tintColor?: string;
}

// Custom refresh indicator
export function CustomRefreshIndicator({ refreshing }: { refreshing: boolean }) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const pulseOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (refreshing) {
      // Continuous rotation
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
      
      // Scale pulse
      scale.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.8, { duration: 400 })
        ),
        -1,
        true
      );
      
      // Pulse opacity
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 500 }),
          withTiming(0.2, { duration: 500 })
        ),
        -1,
        true
      );
    } else {
      rotation.value = withTiming(0, { duration: 300 });
      scale.value = withSpring(0.8, { damping: 15, stiffness: 200 });
    }
  }, [refreshing]);

  const spinnerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: pulseOpacity.value,
      transform: [{ scale: interpolate(pulseOpacity.value, [0.2, 0.6], [1, 1.5]) }],
    };
  });

  if (!refreshing) return null;

  return (
    <View style={styles.container}>
      {/* Pulse ring */}
      <Animated.View style={[styles.pulseRing, pulseStyle]} />
      
      {/* Spinner */}
      <Animated.View style={[styles.spinner, spinnerStyle]}>
        <Ionicons name="refresh" size={24} color={Colors.primary} />
      </Animated.View>
    </View>
  );
}

// Food-themed refresh animation
export function FoodRefreshIndicator({ refreshing }: { refreshing: boolean }) {
  const bounceY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const foodEmojis = ['🍎', '🥗', '🥑', '🍊', '🥕'];
  const [currentEmoji, setCurrentEmoji] = React.useState(0);

  useEffect(() => {
    if (refreshing) {
      // Bounce animation
      bounceY.value = withRepeat(
        withSequence(
          withTiming(-15, { duration: 300, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 300, easing: Easing.in(Easing.quad) })
        ),
        -1,
        false
      );
      
      // Wiggle rotation
      rotation.value = withRepeat(
        withSequence(
          withTiming(15, { duration: 150 }),
          withTiming(-15, { duration: 150 }),
          withTiming(0, { duration: 150 })
        ),
        -1,
        false
      );
      
      // Emoji cycling
      const interval = setInterval(() => {
        setCurrentEmoji(prev => (prev + 1) % foodEmojis.length);
      }, 600);
      
      return () => clearInterval(interval);
    } else {
      bounceY.value = withSpring(0);
      rotation.value = withSpring(0);
    }
  }, [refreshing]);

  const emojiStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { translateY: bounceY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  if (!refreshing) return null;

  return (
    <View style={styles.foodContainer}>
      <Animated.Text style={[styles.foodEmoji, emojiStyle]}>
        {foodEmojis[currentEmoji]}
      </Animated.Text>
    </View>
  );
}

// Factory function to create custom RefreshControl
export function createCustomRefreshControl(
  refreshing: boolean,
  onRefresh: () => void,
  type: 'default' | 'food' = 'default'
) {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[Colors.primary, Colors.teal, Colors.success]}
      tintColor={Colors.primary}
      progressBackgroundColor={Colors.white}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  pulseRing: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  foodEmoji: {
    fontSize: 36,
  },
});

export default CustomRefreshIndicator;
