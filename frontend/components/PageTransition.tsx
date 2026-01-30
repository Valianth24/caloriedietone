/**
 * Page Transition Component
 * Sayfa geçişlerinde gösterilecek animasyonlu loading
 */

import React, { useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  withDelay,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PageTransitionProps {
  visible: boolean;
  message?: string;
  type?: 'loading' | 'saving' | 'analyzing' | 'success';
}

// Ana spinner component
const AnimatedSpinner = memo(({ type }: { type: string }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const innerRotation = useSharedValue(0);

  useEffect(() => {
    // Dış halka rotasyonu
    rotation.value = withRepeat(
      withTiming(360, { duration: 1200, easing: Easing.linear }),
      -1,
      false
    );
    
    // İç halka ters rotasyon
    innerRotation.value = withRepeat(
      withTiming(-360, { duration: 800, easing: Easing.linear }),
      -1,
      false
    );
    
    // Scale pulse
    scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0.8, { duration: 600 })
      ),
      -1,
      true
    );
  }, []);

  const outerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const innerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ rotate: `${innerRotation.value}deg` }],
    };
  });

  const getIconName = () => {
    switch (type) {
      case 'saving': return 'save-outline';
      case 'analyzing': return 'scan-outline';
      case 'success': return 'checkmark-circle';
      default: return 'refresh-outline';
    }
  };

  return (
    <View style={styles.spinnerContainer}>
      {/* Dış halka */}
      <Animated.View style={[styles.outerRing, outerStyle]}>
        <View style={styles.ringSegment} />
        <View style={[styles.ringSegment, styles.ringSegment2]} />
        <View style={[styles.ringSegment, styles.ringSegment3]} />
      </Animated.View>
      
      {/* İç halka */}
      <Animated.View style={[styles.innerRing, innerStyle]}>
        <View style={styles.innerRingSegment} />
      </Animated.View>
      
      {/* Merkez ikon */}
      <View style={styles.centerIcon}>
        <Ionicons name={getIconName() as any} size={24} color={Colors.primary} />
      </View>
    </View>
  );
});

// Pulse dots animasyonu
const PulseDots = memo(() => {
  const dot1 = useSharedValue(0.4);
  const dot2 = useSharedValue(0.4);
  const dot3 = useSharedValue(0.4);

  useEffect(() => {
    dot1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.4, { duration: 400 })
      ),
      -1,
      true
    );
    
    dot2.value = withDelay(150, withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.4, { duration: 400 })
      ),
      -1,
      true
    ));
    
    dot3.value = withDelay(300, withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.4, { duration: 400 })
      ),
      -1,
      true
    ));
  }, []);

  const dot1Style = useAnimatedStyle(() => ({ opacity: dot1.value, transform: [{ scale: dot1.value }] }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: dot2.value, transform: [{ scale: dot2.value }] }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: dot3.value, transform: [{ scale: dot3.value }] }));

  return (
    <View style={styles.dotsContainer}>
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </View>
  );
});

export default function PageTransition({ 
  visible, 
  message, 
  type = 'loading' 
}: PageTransitionProps) {
  const { colors } = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.9, { duration: 150 });
    }
  }, [visible]);

  const containerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.background + 'F5' }, containerStyle]}>
      <View style={[styles.card, { backgroundColor: colors.white }]}>
        <AnimatedSpinner type={type} />
        {message && (
          <Text style={[styles.message, { color: colors.darkText }]}>{message}</Text>
        )}
        <PulseDots />
      </View>
    </Animated.View>
  );
}

// Inline loading spinner - küçük alanlarda kullanım için
export function InlineSpinner({ size = 24, color = Colors.primary }: { size?: number; color?: string }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const spinnerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={spinnerStyle}>
      <Ionicons name="refresh-outline" size={size} color={color} />
    </Animated.View>
  );
}

// Button loading state
export function ButtonSpinner({ size = 20, color = '#fff' }: { size?: number; color?: string }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 600, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const spinnerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.buttonSpinner, spinnerStyle]}>
      <View style={[styles.buttonSpinnerArc, { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        borderColor: color,
      }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  card: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
    minWidth: 180,
  },
  spinnerContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  outerRing: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  ringSegment: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: Colors.primary,
  },
  ringSegment2: {
    transform: [{ rotate: '120deg' }],
    borderTopColor: Colors.primary + '60',
  },
  ringSegment3: {
    transform: [{ rotate: '240deg' }],
    borderTopColor: Colors.primary + '30',
  },
  innerRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  innerRingSegment: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRightColor: Colors.teal,
    borderBottomColor: Colors.teal + '50',
  },
  centerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  buttonSpinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpinnerArc: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderRightColor: 'rgba(255,255,255,0.3)',
  },
});
