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
import { useTranslation } from 'react-i18next';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PremiumAgePickerProps {
  minAge?: number;
  maxAge?: number;
  initialAge?: number;
  onAgeChange: (age: number) => void;
  primaryColor?: string;
}

export default function PremiumAgePicker({
  minAge = 10,
  maxAge = 100,
  initialAge = 25,
  onAgeChange,
  primaryColor = Colors.primary,
}: PremiumAgePickerProps) {
  const { t } = useTranslation();
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastAge = useRef(initialAge);
  const lastHapticAge = useRef(initialAge);

  const ITEM_HEIGHT = 50;
  const VISIBLE_ITEMS = 5;
  const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
  const totalItems = maxAge - minAge + 1;

  useEffect(() => {
    const initialIndex = initialAge - minAge;
    scrollY.setValue(-initialIndex * ITEM_HEIGHT);
  }, []);

  const triggerHaptic = useCallback(async (age: number) => {
    if (age !== lastHapticAge.current) {
      lastHapticAge.current = age;
      if (age % 10 === 0) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        await Haptics.selectionAsync();
      }
    }
  }, []);

  const updateAge = useCallback((scrollValue: number) => {
    const newIndex = Math.round(-scrollValue / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
    const newAge = minAge + clampedIndex;

    if (newAge !== lastAge.current) {
      lastAge.current = newAge;
      setSelectedAge(newAge);
      onAgeChange(newAge);
      triggerHaptic(newAge);
    }
  }, [minAge, totalItems, onAgeChange, triggerHaptic]);

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
        updateAge(currentScroll);
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

        const finalAge = minAge + clampedIndex;
        setSelectedAge(finalAge);
        onAgeChange(finalAge);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
    })
  ).current;

  const selectAge = async (age: number) => {
    const newIndex = age - minAge;
    Animated.spring(scrollY, {
      toValue: -newIndex * ITEM_HEIGHT,
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();
    setSelectedAge(age);
    onAgeChange(age);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const quickAdjust = async (amount: number) => {
    const newAge = Math.max(minAge, Math.min(maxAge, selectedAge + amount));
    await selectAge(newAge);
  };

  // Yaş kategorisi
  const getAgeCategory = (age: number) => {
    if (age < 18) return { label: 'Genç', emoji: '🧒' };
    if (age < 30) return { label: 'Genç Yetişkin', emoji: '🧑' };
    if (age < 45) return { label: 'Yetişkin', emoji: '👨' };
    if (age < 60) return { label: 'Orta Yaş', emoji: '👨‍🦳' };
    return { label: 'Yaşlı', emoji: '👴' };
  };

  const ageCategory = getAgeCategory(selectedAge);

  const renderPickerItems = () => {
    const items = [];
    for (let i = 0; i < totalItems; i++) {
      const age = minAge + i;

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
          key={age}
          style={[
            styles.pickerItem,
            {
              opacity,
              transform: [{ scale }, { rotateX }],
            },
          ]}
        >
          <Text style={[styles.pickerItemText, { color: Colors.darkText }]}>
            {age}
          </Text>
        </Animated.View>
      );
    }
    return items;
  };

  return (
    <View style={styles.wrapper}>
      {/* Value Display */}
      <LinearGradient
        colors={[primaryColor, primaryColor + 'DD']}
        style={styles.valueContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.emojiText}>{ageCategory.emoji}</Text>
        <View style={styles.valueRow}>
          <Text style={styles.valueText}>{selectedAge}</Text>
          <Text style={styles.unitText}>{t('age') || 'yaş'}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{ageCategory.label}</Text>
        </View>
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

      {/* Quick Age Selection */}
      <View style={styles.quickAgesContainer}>
        <Text style={styles.quickAgesTitle}>{t('quickSelect') || 'Hızlı Seçim'}</Text>
        <View style={styles.quickAgesRow}>
          {[18, 25, 30, 40, 50].map((age) => (
            <TouchableOpacity
              key={age}
              style={[
                styles.quickAgeBtn,
                selectedAge === age
                  ? { backgroundColor: primaryColor, borderColor: primaryColor }
                  : { borderColor: primaryColor + '60' },
              ]}
              onPress={() => selectAge(age)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.quickAgeBtnText,
                  { color: selectedAge === age ? '#FFFFFF' : primaryColor },
                ]}
              >
                {age}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 24,
    alignItems: 'center',
    minWidth: 200,
  },
  emojiText: {
    fontSize: 32,
    marginBottom: 8,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    opacity: 0.9,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
  quickAgesContainer: {
    marginTop: 24,
    width: '100%',
  },
  quickAgesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 12,
  },
  quickAgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  quickAgeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: Colors.white,
    minWidth: 50,
    alignItems: 'center',
  },
  quickAgeBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
