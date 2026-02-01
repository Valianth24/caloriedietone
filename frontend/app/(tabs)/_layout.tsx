import { Tabs } from 'expo-router';
import { View, Platform, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useCallback, useEffect } from 'react';
import * as Haptics from 'expo-haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Custom animated tab bar button
interface AnimatedTabButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  isFocused: boolean;
  color: string;
  accessibilityLabel?: string;
  testID?: string;
}

function AnimatedTabButton({ 
  children, 
  onPress, 
  onLongPress,
  isFocused, 
  color,
  accessibilityLabel,
  testID,
}: AnimatedTabButtonProps) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isFocused) {
      translateY.value = withSpring(-2, { damping: 15, stiffness: 300 });
      scale.value = withSpring(1.1, { damping: 15, stiffness: 300 });
    } else {
      translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  }, [isFocused]);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, { damping: 10, stiffness: 400 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(isFocused ? 1.1 : 1, { damping: 15, stiffness: 300 });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, animatedStyle]}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
    >
      {children}
    </AnimatedPressable>
  );
}

// Animated center add button
function AnimatedAddButton({ onPress, colors, bottomPadding }: { 
  onPress: () => void; 
  colors: any; 
  bottomPadding: number;
}) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, { damping: 10, stiffness: 400 });
    rotation.value = withSpring(45, { damping: 15, stiffness: 300 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
    rotation.value = withSpring(0, { damping: 15, stiffness: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[{
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30 + bottomPadding,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }, animatedStyle]}
    >
      <Ionicons name="add" size={30} color={colors.white} />
    </AnimatedPressable>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Edge-to-edge için dinamik bottom padding - SDK 54'te otomatik
  const bottomPadding = Platform.OS === 'android' 
    ? Math.max(insets.bottom, 12) // Android için minimum 12
    : insets.bottom;
  
  const tabBarHeight = 60 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightText,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: bottomPadding,
          paddingTop: 8,
          height: tabBarHeight,
          // Edge-to-edge için position absolute
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        // İçeriğin tab bar altında kalmaması için
        tabBarHideOnKeyboard: true,
        // Custom tab button with animation
        tabBarButton: (props) => {
          const { children, onPress, onLongPress, accessibilityLabel, testID, ...rest } = props;
          const isFocused = rest.accessibilityState?.selected || false;
          
          return (
            <AnimatedTabButton
              onPress={onPress as () => void}
              onLongPress={onLongPress as () => void}
              isFocused={isFocused}
              color={isFocused ? colors.primary : colors.lightText}
              accessibilityLabel={accessibilityLabel}
              testID={testID}
            >
              {children}
            </AnimatedTabButton>
          );
        },
      }}
      // Ekranların tab bar yüksekliği kadar padding almasını sağla
      sceneContainerStyle={{
        paddingBottom: tabBarHeight,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: t('recipes'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "book" : "book-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40 + bottomPadding,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 10,
              borderWidth: 4,
              borderColor: colors.white,
            }}>
              <Ionicons name="camera" size={30} color={colors.white} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="diets"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: t('achievements') || 'Achievements',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "trophy" : "trophy-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile-old-backup"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
