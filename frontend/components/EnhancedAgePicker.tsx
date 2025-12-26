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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface EnhancedAgePickerProps {
  minAge?: number;
  maxAge?: number;
  initialAge?: number;
  onAgeChange: (age: number) => void;
  primaryColor?: string;
}

export default function EnhancedAgePicker({
  minAge = 10,
  maxAge = 100,
  initialAge = 25,
  onAgeChange,
  primaryColor = Colors.primary,
}: EnhancedAgePickerProps) {
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const scrollX = useRef(new Animated.Value(0)).current;
  const lastAge = useRef(initialAge);

  const ITEM_WIDTH = 60;
  const CENTER_OFFSET = (SCREEN_WIDTH - 60 - ITEM_WIDTH) / 2;
  const totalItems = maxAge - minAge + 1;

  // Initialize position
  useEffect(() => {
    const initialIndex = initialAge - minAge;
    scrollX.setValue(-initialIndex * ITEM_WIDTH);
  }, []);

  const updateAge = useCallback((scrollValue: number) => {
    const newIndex = Math.round(-scrollValue / ITEM_WIDTH);
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
    const newAge = minAge + clampedIndex;

    if (newAge !== lastAge.current) {
      lastAge.current = newAge;
      setSelectedAge(newAge);
      onAgeChange(newAge);
    }
  }, [minAge, totalItems, onAgeChange]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        scrollX.stopAnimation();
        scrollX.setOffset((scrollX as any)._value);
        scrollX.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        scrollX.setValue(gestureState.dx);
        const currentScroll = (scrollX as any)._offset + gestureState.dx;
        updateAge(currentScroll);
      },
      onPanResponderRelease: (_, gestureState) => {
        scrollX.flattenOffset();
        
        const currentScroll = (scrollX as any)._value;
        const newIndex = Math.round(-currentScroll / ITEM_WIDTH);
        const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
        const targetScroll = -clampedIndex * ITEM_WIDTH;
        const finalAge = minAge + clampedIndex;

        Animated.spring(scrollX, {
          toValue: targetScroll,
          useNativeDriver: true,
          tension: 50,
          friction: 10,
        }).start();

        setSelectedAge(finalAge);
        onAgeChange(finalAge);
      },
    })
  ).current;

  const selectAge = (age: number) => {
    const newIndex = age - minAge;
    Animated.spring(scrollX, {
      toValue: -newIndex * ITEM_WIDTH,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
    setSelectedAge(age);
    onAgeChange(age);
  };

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
        outputRange: [0.5, 0.7, 1.2, 0.7, 0.5],
        extrapolate: 'clamp',
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 0.5, 1, 0.5, 0.3],
        extrapolate: 'clamp',
      });

      items.push(
        <Animated.View
          key={age}
          style={[
            styles.ageItem,
            {
              transform: [{ scale }],
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
      {/* Selected Age Display */}
      <View style={styles.valueDisplayContainer}>
        <LinearGradient
          colors={[primaryColor, adjustColor(primaryColor, -30)]}
          style={styles.valueGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.valueText}>{selectedAge}</Text>
          <Text style={styles.unitText}>yaş</Text>
        </LinearGradient>
      </View>

      {/* Wheel Container */}
      <View style={styles.wheelContainer}>
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
          <View style={[styles.centerLine, { backgroundColor: primaryColor }]} />
        </View>

        {/* Fade overlays */}
        <View style={styles.fadeLeft} pointerEvents="none" />
        <View style={styles.fadeRight} pointerEvents="none" />
      </View>

      {/* Quick Age Buttons */}
      <View style={styles.quickAgesRow}>
        {[18, 25, 30, 40, 50, 60].map((age) => (
          <TouchableOpacity
            key={age}
            style={[
              styles.quickAgeBtn,
              selectedAge === age 
                ? { backgroundColor: primaryColor, borderColor: primaryColor }
                : { borderColor: primaryColor }
            ]}
            onPress={() => selectAge(age)}
          >
            <Text style={[
              styles.quickAgeBtnText,
              { color: selectedAge === age ? '#FFFFFF' : primaryColor }
            ]}>
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH - 60,
    alignItems: 'center',
  },
  valueDisplayContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  valueGradient: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unitText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
    opacity: 0.9,
  },
  wheelContainer: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    position: 'relative',
  },
  wheelContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  ageItem: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageText: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.lightText,
  },
  ageTextSelected: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  centerHighlight: {
    position: 'absolute',
    left: '50%',
    marginLeft: -35,
    top: 0,
    bottom: 0,
    width: 70,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLine: {
    width: 40,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: 10,
  },
  fadeLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 50,
    backgroundColor: Colors.white,
    opacity: 0.8,
  },
  fadeRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 50,
    backgroundColor: Colors.white,
    opacity: 0.8,
  },
  quickAgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  quickAgeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: Colors.white,
  },
  quickAgeBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
