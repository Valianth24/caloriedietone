import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AgeWheelPickerProps {
  minAge?: number;
  maxAge?: number;
  initialAge?: number;
  onAgeChange: (age: number) => void;
  primaryColor?: string;
}

export default function AgeWheelPicker({
  minAge = 10,
  maxAge = 100,
  initialAge = 25,
  onAgeChange,
  primaryColor = Colors.primary,
}: AgeWheelPickerProps) {
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const lastHapticAge = useRef(initialAge);
  const scrollX = useRef(new Animated.Value(0)).current;
  const isScrolling = useRef(false);

  const ITEM_WIDTH = 70;
  const VISIBLE_ITEMS = 5;
  const CENTER_OFFSET = (SCREEN_WIDTH - 48 - ITEM_WIDTH) / 2;
  const totalItems = maxAge - minAge + 1;

  // Initialize position
  useEffect(() => {
    const initialIndex = initialAge - minAge;
    scrollX.setValue(-initialIndex * ITEM_WIDTH);
  }, []);

  // Haptic feedback
  const triggerHaptic = useCallback((age: number) => {
    if (Platform.OS !== 'web' && age !== lastHapticAge.current) {
      const isMultipleOf10 = age % 10 === 0;
      const isMultipleOf5 = age % 5 === 0;

      if (isMultipleOf10) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else if (isMultipleOf5) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      lastHapticAge.current = age;
    }
  }, []);

  const updateAge = useCallback((scrollValue: number) => {
    const newIndex = Math.round(-scrollValue / ITEM_WIDTH);
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
    const newAge = minAge + clampedIndex;

    if (newAge !== selectedAge) {
      setSelectedAge(newAge);
      triggerHaptic(newAge);
      onAgeChange(newAge);
    }
  }, [minAge, totalItems, selectedAge, triggerHaptic, onAgeChange]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        scrollX.stopAnimation();
        scrollX.setOffset((scrollX as any)._value);
        scrollX.setValue(0);
        isScrolling.current = true;
      },
      onPanResponderMove: (_, gestureState) => {
        scrollX.setValue(gestureState.dx);
        const currentScroll = (scrollX as any)._offset + gestureState.dx;
        updateAge(currentScroll);
      },
      onPanResponderRelease: (_, gestureState) => {
        scrollX.flattenOffset();
        isScrolling.current = false;

        const currentScroll = (scrollX as any)._value;
        
        // Calculate momentum
        const momentumDistance = gestureState.vx * 200;
        let momentumIndex = Math.round(-(currentScroll + momentumDistance) / ITEM_WIDTH);
        momentumIndex = Math.max(0, Math.min(totalItems - 1, momentumIndex));
        const momentumTarget = -momentumIndex * ITEM_WIDTH;

        // Simple snap without momentum for better control
        const newIndex = Math.round(-currentScroll / ITEM_WIDTH);
        const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
        const targetScroll = -clampedIndex * ITEM_WIDTH;

        // Use momentum if swipe was fast enough
        const finalTarget = Math.abs(gestureState.vx) > 0.5 ? momentumTarget : targetScroll;
        const finalIndex = Math.round(-finalTarget / ITEM_WIDTH);
        const finalAge = minAge + finalIndex;

        Animated.spring(scrollX, {
          toValue: finalTarget,
          useNativeDriver: true,
          tension: 50,
          friction: 12,
          velocity: gestureState.vx,
        }).start(() => {
          setSelectedAge(finalAge);
          onAgeChange(finalAge);
          if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        });
      },
    })
  ).current;

  const renderAgeItems = () => {
    const items = [];
    for (let i = 0; i < totalItems; i++) {
      const age = minAge + i;
      const inputRange = [
        -(i + 2) * ITEM_WIDTH,
        -(i + 1) * ITEM_WIDTH,
        -i * ITEM_WIDTH,
        -(i - 1) * ITEM_WIDTH,
        -(i - 2) * ITEM_WIDTH,
      ];

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.6, 0.8, 1.2, 0.8, 0.6],
        extrapolate: 'clamp',
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 0.6, 1, 0.6, 0.3],
        extrapolate: 'clamp',
      });

      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [15, 8, 0, 8, 15],
        extrapolate: 'clamp',
      });

      const rotateX = scrollX.interpolate({
        inputRange,
        outputRange: ['25deg', '15deg', '0deg', '-15deg', '-25deg'],
        extrapolate: 'clamp',
      });

      items.push(
        <Animated.View
          key={age}
          style={[
            styles.ageItem,
            {
              transform: [
                { scale },
                { translateY },
                { perspective: 1000 },
              ],
              opacity,
            },
          ]}
        >
          <Text
            style={[
              styles.ageText,
              age === selectedAge && [styles.ageTextSelected, { color: primaryColor }],
            ]}
          >
            {age}
          </Text>
        </Animated.View>
      );
    }
    return items;
  };

  return (
    <View style={styles.wrapper}>
      {/* Title with icon */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleIcon}>🎂</Text>
        <Text style={styles.titleText}>Yaşınız</Text>
      </View>

      {/* Selected Age Display */}
      <View style={styles.selectedDisplayContainer}>
        <LinearGradient
          colors={[primaryColor, adjustColor(primaryColor, -30)]}
          style={styles.selectedGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.selectedAgeText}>{selectedAge}</Text>
          <Text style={styles.yearsText}>yaş</Text>
        </LinearGradient>
      </View>

      {/* Wheel Container */}
      <View style={styles.wheelContainer}>
        {/* Age Wheel */}
        <Animated.View
          style={[
            styles.wheelContent,
            {
              transform: [
                {
                  translateX: Animated.add(
                    scrollX,
                    new Animated.Value(CENTER_OFFSET)
                  ),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {renderAgeItems()}
        </Animated.View>

        {/* Center Highlight */}
        <View style={[styles.centerHighlight, { borderColor: primaryColor + '40' }]} pointerEvents="none">
          <View style={[styles.centerIndicatorTop, { backgroundColor: primaryColor }]} />
          <View style={[styles.centerIndicatorBottom, { backgroundColor: primaryColor }]} />
        </View>

        {/* Gradient Overlays */}
        <LinearGradient
          colors={[Colors.background, 'rgba(245,245,245,0)']}
          style={[styles.gradientOverlay, styles.gradientLeft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          pointerEvents="none"
        />
        <LinearGradient
          colors={['rgba(245,245,245,0)', Colors.background]}
          style={[styles.gradientOverlay, styles.gradientRight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          pointerEvents="none"
        />
      </View>

      {/* Quick Age Buttons */}
      <View style={styles.quickAgesContainer}>
        {[18, 25, 30, 40, 50].map((age) => (
          <QuickAgeButton
            key={age}
            age={age}
            isSelected={selectedAge === age}
            onPress={() => {
              const newIndex = age - minAge;
              Animated.spring(scrollX, {
                toValue: -newIndex * ITEM_WIDTH,
                useNativeDriver: true,
                tension: 60,
                friction: 10,
              }).start();
              setSelectedAge(age);
              onAgeChange(age);
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
            }}
            primaryColor={primaryColor}
          />
        ))}
      </View>

      {/* Age Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoIcon}>💡</Text>
        <Text style={styles.infoText}>
          Yaşınız kalori hesaplamasında önemli bir faktördür. Metabolizma hızı yaşla birlikte değişir.
        </Text>
      </View>
    </View>
  );
}

// Quick age button component
const QuickAgeButton = ({
  age,
  isSelected,
  onPress,
  primaryColor,
}: {
  age: number;
  isSelected: boolean;
  onPress: () => void;
  primaryColor: string;
}) => (
  <View
    style={[
      styles.quickAgeButton,
      isSelected && { backgroundColor: primaryColor, borderColor: primaryColor },
    ]}
  >
    <Text
      style={[
        styles.quickAgeText,
        { color: isSelected ? '#FFFFFF' : primaryColor },
      ]}
      onPress={onPress}
    >
      {age}
    </Text>
  </View>
);

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH - 48,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleIcon: {
    fontSize: 32,
    marginRight: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.darkText,
  },
  selectedDisplayContainer: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  selectedGradient: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  selectedAgeText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  yearsText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
    opacity: 0.9,
  },
  wheelContainer: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    position: 'relative',
  },
  wheelContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  ageItem: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageText: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.lightText,
  },
  ageTextSelected: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  centerHighlight: {
    position: 'absolute',
    left: '50%',
    marginLeft: -38,
    top: 0,
    bottom: 0,
    width: 76,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  centerIndicatorTop: {
    width: 30,
    height: 4,
    borderRadius: 2,
  },
  centerIndicatorBottom: {
    width: 30,
    height: 4,
    borderRadius: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
  },
  gradientLeft: {
    left: 0,
  },
  gradientRight: {
    right: 0,
  },
  quickAgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  quickAgeButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  quickAgeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#2E7D32',
    lineHeight: 18,
  },
});
