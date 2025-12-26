import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PremiumHeightPickerProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  unit?: string;
  onValueChange: (value: number) => void;
  primaryColor?: string;
}

export default function PremiumHeightPicker({
  min = 100,
  max = 250,
  step = 1,
  initialValue = 170,
  unit = 'cm',
  onValueChange,
  primaryColor = Colors.primary,
}: PremiumHeightPickerProps) {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastValue = useRef(initialValue);
  const lastHapticValue = useRef(initialValue);

  const ITEM_HEIGHT = 50;
  const VISIBLE_ITEMS = 5;
  const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
  const totalItems = Math.floor((max - min) / step) + 1;

  useEffect(() => {
    const initialIndex = Math.round((initialValue - min) / step);
    scrollY.setValue(-initialIndex * ITEM_HEIGHT);
  }, []);

  const triggerHaptic = useCallback(async (value: number) => {
    if (value !== lastHapticValue.current) {
      lastHapticValue.current = value;
      if (value % 10 === 0) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        await Haptics.selectionAsync();
      }
    }
  }, []);

  const updateValue = useCallback((scrollValue: number) => {
    const newIndex = Math.round(-scrollValue / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
    const newValue = min + clampedIndex * step;

    if (newValue !== lastValue.current) {
      lastValue.current = newValue;
      setSelectedValue(newValue);
      onValueChange(newValue);
      triggerHaptic(newValue);
    }
  }, [min, step, totalItems, onValueChange, triggerHaptic]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        scrollY.stopAnimation();
        scrollY.setOffset((scrollY as any)._value);
        scrollY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        scrollY.setValue(gestureState.dy);
        const currentScroll = (scrollY as any)._offset + gestureState.dy;
        updateValue(currentScroll);
      },
      onPanResponderRelease: (_, gestureState) => {
        scrollY.flattenOffset();
        const currentScroll = (scrollY as any)._value;
        const newIndex = Math.round(-currentScroll / ITEM_HEIGHT);
        const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
        const targetScroll = -clampedIndex * ITEM_HEIGHT;

        Animated.spring(scrollY, {
          toValue: targetScroll,
          useNativeDriver: true,
          tension: 100,
          friction: 12,
        }).start();

        const finalValue = min + clampedIndex * step;
        setSelectedValue(finalValue);
        onValueChange(finalValue);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
    })
  ).current;

  const quickAdjust = async (amount: number) => {
    const newValue = Math.max(min, Math.min(max, selectedValue + amount));
    const newIndex = Math.round((newValue - min) / step);

    Animated.spring(scrollY, {
      toValue: -newIndex * ITEM_HEIGHT,
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();

    setSelectedValue(newValue);
    onValueChange(newValue);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderPickerItems = () => {
    const items = [];
    for (let i = 0; i < totalItems; i++) {
      const value = min + i * step;
      
      const inputRange = [
        -(i + 2) * ITEM_HEIGHT,
        -(i + 1) * ITEM_HEIGHT,
        -i * ITEM_HEIGHT,
        -(i - 1) * ITEM_HEIGHT,
        -(i - 2) * ITEM_HEIGHT,
      ];

      const scale = scrollY.interpolate({
        inputRange,
        outputRange: [0.7, 0.85, 1, 0.85, 0.7],
        extrapolate: 'clamp',
      });

      const opacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.3, 0.5, 1, 0.5, 0.3],
        extrapolate: 'clamp',
      });

      const rotateX = scrollY.interpolate({
        inputRange,
        outputRange: ['30deg', '15deg', '0deg', '-15deg', '-30deg'],
        extrapolate: 'clamp',
      });

      items.push(
        <Animated.View
          key={i}
          style={[
            styles.pickerItem,
            {
              opacity,
              transform: [{ scale }, { rotateX }],
            },
          ]}
        >
          <Text style={[styles.pickerItemText, { color: Colors.darkText }]}>
            {value}
          </Text>
        </Animated.View>
      );
    }
    return items;
  };

  // feet/inches dönüşümü
  const heightInInches = selectedValue / 2.54;
  const feet = Math.floor(heightInInches / 12);
  const inches = Math.round(heightInInches % 12);

  return (
    <View style={styles.wrapper}>
      {/* Value Display */}
      <LinearGradient
        colors={[primaryColor, primaryColor + 'DD']}
        style={styles.valueContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.valueRow}>
          <Text style={styles.valueText}>{selectedValue}</Text>
          <Text style={styles.unitText}>{unit}</Text>
        </View>
        <Text style={styles.convertedText}>{feet}'{inches}"</Text>
      </LinearGradient>

      {/* Picker Wheel */}
      <View style={[styles.pickerContainer, { height: CONTAINER_HEIGHT }]}>
        <Animated.View
          style={[
            styles.pickerContent,
            {
              paddingVertical: CONTAINER_HEIGHT / 2 - ITEM_HEIGHT / 2,
              transform: [{
                translateY: scrollY.interpolate({
                  inputRange: [-(totalItems - 1) * ITEM_HEIGHT, 0],
                  outputRange: [-(totalItems - 1) * ITEM_HEIGHT, 0],
                  extrapolate: 'clamp',
                }),
              }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {renderPickerItems()}
        </Animated.View>

        {/* Selection Indicator */}
        <View style={[styles.selectionIndicator, { borderColor: primaryColor }]} pointerEvents="none" />
        
        {/* Gradient Overlays */}
        <LinearGradient
          colors={['#FFFFFF', 'rgba(255,255,255,0)']}
          style={[styles.gradientTop, { height: CONTAINER_HEIGHT * 0.35 }]}
          pointerEvents="none"
        />
        <LinearGradient
          colors={['rgba(255,255,255,0)', '#FFFFFF']}
          style={[styles.gradientBottom, { height: CONTAINER_HEIGHT * 0.35 }]}
          pointerEvents="none"
        />
      </View>

      {/* Quick Adjust */}
      <View style={styles.quickButtonsRow}>
        <TouchableOpacity
          style={[styles.quickBtn, { borderColor: primaryColor }]}
          onPress={() => quickAdjust(-5)}
          activeOpacity={0.7}
        >
          <Text style={[styles.quickBtnText, { color: primaryColor }]}>-5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickBtn, { borderColor: primaryColor }]}
          onPress={() => quickAdjust(-1)}
          activeOpacity={0.7}
        >
          <Text style={[styles.quickBtnText, { color: primaryColor }]}>-1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickBtn, { borderColor: primaryColor }]}
          onPress={() => quickAdjust(1)}
          activeOpacity={0.7}
        >
          <Text style={[styles.quickBtnText, { color: primaryColor }]}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickBtn, { borderColor: primaryColor }]}
          onPress={() => quickAdjust(5)}
          activeOpacity={0.7}
        >
          <Text style={[styles.quickBtnText, { color: primaryColor }]}>+5</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH - 64,
    alignItems: 'center',
  },
  valueContainer: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valueText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unitText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    opacity: 0.9,
  },
  convertedText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  pickerContent: {
    width: '100%',
  },
  pickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 28,
    fontWeight: '600',
  },
  selectionIndicator: {
    position: 'absolute',
    top: '50%',
    left: 16,
    right: 16,
    height: 50,
    marginTop: -25,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  quickButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },
  quickBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: Colors.white,
  },
  quickBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
