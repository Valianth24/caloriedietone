import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  gradient: [string, string];
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    iconName: 'restaurant',
    titleTr: 'Yemeklerini Takip Et',
    titleEn: 'Track Your Meals',
    descriptionTr: 'Kalori, protein, karbonhidrat ve yağ miktarını kolayca takip et. 102+ hazır tarif ile beslenmen çok kolay!',
    descriptionEn: 'Easily track calories, protein, carbs, and fats. 102+ ready recipes make nutrition simple!',
    gradient: ['#4CAF50', '#81C784'],
  },
  {
    id: '2',
    iconName: 'trophy',
    titleTr: 'Seviye Atla, Rozet Kazan',
    titleEn: 'Level Up, Earn Badges',
    descriptionTr: 'Her gün hedeflerini tamamla, XP kazan ve ligde yüksel! 6 farklı lig, 16 rozet seni bekliyor.',
    descriptionEn: 'Complete daily goals, earn XP and climb the leagues! 6 leagues, 16 badges await you.',
    gradient: ['#FFD700', '#FFA500'],
  },
  {
    id: '3',
    iconName: 'flame',
    titleTr: 'Günlük Seri Oluştur',
    titleEn: 'Build Your Streak',
    descriptionTr: 'Her gün giriş yap, hedeflerini tamamla. 7, 30, 100 günlük serilerde özel rozetler kazan!',
    descriptionEn: 'Login daily, complete your goals. Earn special badges at 7, 30, 100 day streaks!',
    gradient: ['#FF6B6B', '#FF8E53'],
  },
  {
    id: '4',
    iconName: 'podium',
    titleTr: 'Sıralamada Yarış',
    titleEn: 'Compete on Leaderboard',
    descriptionTr: 'Tüm kullanıcılarla yarış! Puan kazan, ligde yüksel ve zirvede yer al.',
    descriptionEn: 'Race with all users! Earn points, climb leagues and reach the top.',
    gradient: ['#667eea', '#764ba2'],
  },
  {
    id: '5',
    iconName: 'nutrition',
    titleTr: 'Diyet Programları',
    titleEn: 'Diet Programs',
    descriptionTr: 'Keto, Vegan, Akdeniz ve daha fazlası! Hedefine uygun diyet programını seç ve başla.',
    descriptionEn: 'Keto, Vegan, Mediterranean and more! Choose your diet program and start.',
    gradient: ['#11998e', '#38ef7d'],
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
  language: 'tr' | 'en';
}

export default function OnboardingScreen({ onComplete, language }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<any>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    await AsyncStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>
            {language === 'tr' ? 'Atla' : 'Skip'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {slides.map((slide, index) => (
          <SlideItem
            key={slide.id}
            slide={slide}
            index={index}
            scrollX={scrollX}
            language={language}
          />
        ))}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <PaginationDot
            key={index}
            index={index}
            scrollX={scrollX}
            currentIndex={currentIndex}
          />
        ))}
      </View>

      {/* Next/Get Started Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <LinearGradient
          colors={slides[currentIndex].gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.nextButtonGradient}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1
              ? language === 'tr' ? 'Başla' : 'Get Started'
              : language === 'tr' ? 'İleri' : 'Next'}
          </Text>
          <Ionicons 
            name={currentIndex === slides.length - 1 ? 'checkmark-circle' : 'arrow-forward'} 
            size={24} 
            color="#FFF" 
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

interface SlideItemProps {
  slide: OnboardingSlide;
  index: number;
  scrollX: Animated.SharedValue<number>;
  language: 'tr' | 'en';
}

function SlideItem({ slide, index, scrollX, language }: SlideItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [100, 0, 100],
      Extrapolation.CLAMP
    );

    const rotate = interpolate(
      scrollX.value,
      inputRange,
      [-20, 0, 20],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateY },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  return (
    <View style={styles.slide}>
      <Animated.View style={[styles.slideContent, animatedStyle]}>
        <Animated.View style={iconAnimatedStyle}>
          <LinearGradient
            colors={slide.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Ionicons name={slide.iconName} size={80} color="#FFF" />
          </LinearGradient>
        </Animated.View>

        <Text style={styles.title}>
          {language === 'tr' ? slide.titleTr : slide.titleEn}
        </Text>

        <Text style={styles.description}>
          {language === 'tr' ? slide.descriptionTr : slide.descriptionEn}
        </Text>
      </Animated.View>
    </View>
  );
}

interface PaginationDotProps {
  index: number;
  scrollX: Animated.SharedValue<number>;
  currentIndex: number;
}

function PaginationDot({ index, scrollX, currentIndex }: PaginationDotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [8, 24, 8],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );

    return {
      width: dotWidth,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        animatedStyle,
        { backgroundColor: currentIndex === index ? Colors.primary : Colors.lightText },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 12,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.darkText,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.lightText,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 18,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});
