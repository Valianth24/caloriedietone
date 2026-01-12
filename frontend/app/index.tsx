import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Animated floating particle component
const FloatingParticle = ({ delay, startX, startY, size }: { delay: number; startX: number; startY: number; size: number }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(0.6, { duration: 800 }));
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-30, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: startX,
          top: startY,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        animatedStyle,
      ]}
    />
  );
};

export default function SplashScreen() {
  // Animation values
  const logoScale = useSharedValue(0);
  const logoRotate = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const ringScale = useSharedValue(0.8);
  const ringOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Logo animation
    logoScale.value = withDelay(200, withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) }));
    logoRotate.value = withDelay(200, withTiming(360, { duration: 1000, easing: Easing.out(Easing.cubic) }));
    
    // Ring animation
    ringScale.value = withDelay(400, withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }));
    ringOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    
    // Pulse animation
    pulseScale.value = withDelay(
      1000,
      withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );

    // Title animation
    titleOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    titleTranslateY.value = withDelay(600, withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) }));

    // Subtitle animation
    subtitleOpacity.value = withDelay(900, withTiming(1, { duration: 800 }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotate.value}deg` },
    ],
  }));

  const ringAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value * pulseScale.value }],
    opacity: ringOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  // Generate particles
  const particles = [
    { delay: 500, startX: width * 0.15, startY: height * 0.2, size: 8 },
    { delay: 700, startX: width * 0.8, startY: height * 0.15, size: 6 },
    { delay: 900, startX: width * 0.1, startY: height * 0.7, size: 10 },
    { delay: 1100, startX: width * 0.85, startY: height * 0.65, size: 7 },
    { delay: 600, startX: width * 0.25, startY: height * 0.85, size: 5 },
    { delay: 800, startX: width * 0.7, startY: height * 0.8, size: 9 },
    { delay: 1000, startX: width * 0.5, startY: height * 0.1, size: 6 },
    { delay: 1200, startX: width * 0.9, startY: height * 0.4, size: 8 },
  ];

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Floating particles */}
      {particles.map((particle, index) => (
        <FloatingParticle key={index} {...particle} />
      ))}

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo container with rings */}
        <View style={styles.logoContainer}>
          {/* Outer ring */}
          <Animated.View style={[styles.outerRing, ringAnimatedStyle]} />
          
          {/* Inner ring */}
          <Animated.View style={[styles.innerRing, ringAnimatedStyle]} />
          
          {/* Logo */}
          <Animated.View style={[styles.logoWrapper, logoAnimatedStyle]}>
            <LinearGradient
              colors={['#4CAF50', '#8BC34A', '#CDDC39']}
              style={styles.logoBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="nutrition" size={60} color="#fff" />
            </LinearGradient>
          </Animated.View>
        </View>

        {/* App name */}
        <Animated.View style={titleAnimatedStyle}>
          <Text style={styles.title}>CalorieDiet</Text>
          <View style={styles.titleUnderline}>
            <LinearGradient
              colors={['#4CAF50', '#8BC34A']}
              style={styles.underlineGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>
          Sağlıklı Yaşam İçin Akıllı Beslenme
        </Animated.Text>

        {/* Feature icons */}
        <Animated.View style={[styles.featuresContainer, subtitleAnimatedStyle]}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconWrapper}>
              <Ionicons name="camera-outline" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.featureText}>Fotoğraf</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconWrapper}>
              <Ionicons name="analytics-outline" size={24} color="#8BC34A" />
            </View>
            <Text style={styles.featureText}>Analiz</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconWrapper}>
              <Ionicons name="trophy-outline" size={24} color="#CDDC39" />
            </View>
            <Text style={styles.featureText}>Hedef</Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom branding */}
      <Animated.View style={[styles.bottomBranding, subtitleAnimatedStyle]}>
        <Text style={styles.brandingText}>Premium Kalori Takibi</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(76, 175, 80, 0.4)',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    width: 180,
    height: 180,
  },
  outerRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  innerRing: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'rgba(139, 195, 74, 0.4)',
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  logoBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(76, 175, 80, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  titleUnderline: {
    height: 4,
    width: 120,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
    alignSelf: 'center',
  },
  underlineGradient: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 16,
    letterSpacing: 1,
  },
  featuresContainer: {
    flexDirection: 'row',
    marginTop: 50,
    gap: 30,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  bottomBranding: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  brandingText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});
