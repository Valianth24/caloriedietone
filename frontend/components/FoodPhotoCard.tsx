import React, { useEffect, useCallback, memo } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SPRING_CONFIGS, triggerHaptic } from '../utils/animations';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

interface FoodPhotoCardProps {
  index?: number;
}

function FoodPhotoCard({ index = 0 }: FoodPhotoCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  // Animation values
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(40);
  const buttonScale = useSharedValue(0.8);
  const iconPulse = useSharedValue(1);
  const shimmer = useSharedValue(0);
  const imageScale = useSharedValue(1.1);

  // Entrance animations
  useEffect(() => {
    const delay = index * 100;
    
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, SPRING_CONFIGS.gentle));
    
    // Image zoom effect
    imageScale.value = withDelay(delay, withTiming(1, { duration: 8000 }));
    
    // Button pop
    buttonScale.value = withDelay(delay + 400, withSpring(1, SPRING_CONFIGS.bouncy));
    
    // Icon pulse animation
    iconPulse.value = withDelay(delay + 600, withRepeat(
      withSequence(
        withTiming(1.15, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    ));
    
    // Shimmer effect on button
    shimmer.value = withDelay(delay + 800, withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      false
    ));
  }, [index]);

  // Press handlers
  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.97, SPRING_CONFIGS.snappy);
    runOnJS(triggerHaptic)('medium');
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, SPRING_CONFIGS.bouncy);
  }, []);

  const handlePress = useCallback(() => {
    // Button press animation
    buttonScale.value = withSequence(
      withSpring(0.9, { damping: 10, stiffness: 400 }),
      withSpring(1, SPRING_CONFIGS.bouncy)
    );
    
    setTimeout(() => {
      router.push('/(tabs)/camera');
    }, 150);
  }, [router]);

  // Animated styles
  const cardAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: cardOpacity.value,
      transform: [
        { translateY: cardTranslateY.value },
        { scale: cardScale.value },
      ] as const,
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: imageScale.value }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: iconPulse.value }],
    };
  });

  const shimmerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: interpolate(shimmer.value, [0, 0.5, 1], [0, 0.3, 0]),
      transform: [
        { translateX: interpolate(shimmer.value, [0, 1], [-100, 200]) },
      ],
    };
  });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[styles.container, cardAnimatedStyle]}
    >
      <Animated.View style={[styles.imageContainer, imageStyle]}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            <View style={styles.overlay}>
              {/* Content */}
              <View style={styles.content}>
                <Text style={styles.title}>{t('takePhotoOfYourMeal')}</Text>
                <Text style={styles.subtitle}>{t('toCalculateCalories')}</Text>

                <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
                  <LinearGradient
                    colors={[Colors.primary, '#7C3AED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}
                  >
                    <Animated.View style={iconStyle}>
                      <Ionicons name="camera" size={24} color={Colors.white} />
                    </Animated.View>
                    <Text style={styles.buttonText}>{t('takePhoto')}</Text>
                    
                    {/* Shimmer overlay */}
                    <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                  </LinearGradient>
                </Animated.View>
              </View>

              {/* AI Badge */}
              <View style={styles.aiBadge}>
                <Ionicons name="sparkles" size={12} color="#FFD700" />
                <Text style={styles.aiBadgeText}>AI Powered</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 24,
  },
  background: {
    width: '100%',
    height: 220,
  },
  backgroundImage: {
    borderRadius: 24,
  },
  gradient: {
    flex: 1,
    borderRadius: 24,
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    alignSelf: 'flex-start',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50,
    gap: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.4)',
    transform: [{ skewX: '-20deg' }],
  },
  aiBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  aiBadgeText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '700',
  },
});

export default memo(FoodPhotoCard);
