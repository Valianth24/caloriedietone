import React, { useEffect, useState, useCallback, memo } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { pedometerService } from '../services/pedometerService';
import { SPRING_CONFIGS, triggerHaptic } from '../utils/animations';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface StepCardProps {
  current: number;
  goal: number;
  index?: number;
}

function StepCard({ current, goal, index = 0 }: StepCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [liveSteps, setLiveSteps] = useState<number>(current);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Animation values
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);
  const progressWidth = useSharedValue(0);
  const stepIconBounce = useSharedValue(1);
  const livePulse = useSharedValue(1);
  const stepCountScale = useSharedValue(0.8);

  // Initialize pedometer service
  useEffect(() => {
    const initPedometer = async () => {
      try {
        const available = await pedometerService.initialize();
        setIsAvailable(available);
        setIsInitialized(true);
        
        if (available) {
          const currentSteps = pedometerService.getCurrentSteps();
          if (currentSteps > 0) {
            setLiveSteps(currentSteps);
          }
        }
      } catch (error) {
        console.error('[StepCard] Error initializing pedometer:', error);
        setIsInitialized(true);
      }
    };
    
    initPedometer();
  }, []);

  // Subscribe to step updates
  const handleStepUpdate = useCallback((steps: number) => {
    if (steps > 0) {
      setLiveSteps(steps);
      // Bounce animation on step update
      stepIconBounce.value = withSequence(
        withSpring(1.3, { damping: 8, stiffness: 400 }),
        withSpring(1, SPRING_CONFIGS.bouncy)
      );
    }
  }, []);

  useEffect(() => {
    if (isAvailable) {
      pedometerService.subscribe(handleStepUpdate);
      return () => {
        pedometerService.unsubscribe(handleStepUpdate);
      };
    }
  }, [isAvailable, handleStepUpdate]);

  useEffect(() => {
    if (current > liveSteps) {
      setLiveSteps(current);
    }
  }, [current]);

  const displaySteps = Math.max(liveSteps, current);
  const percentage = goal > 0 ? Math.min((displaySteps / goal) * 100, 100) : 0;

  // Entrance animations
  useEffect(() => {
    const delay = index * 100;
    
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, SPRING_CONFIGS.gentle));
    progressWidth.value = withDelay(delay + 200, withTiming(percentage, { duration: 1000 }));
    stepCountScale.value = withDelay(delay + 300, withSpring(1, SPRING_CONFIGS.bouncy));
    
    // Step icon walking animation
    stepIconBounce.value = withDelay(delay + 400, withRepeat(
      withSequence(
        withTiming(1.1, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      3,
      true
    ));
    
    // Live pulse animation
    if (isAvailable) {
      livePulse.value = withDelay(delay + 500, withRepeat(
        withSequence(
          withTiming(1.3, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      ));
    }
  }, [displaySteps, goal, percentage, index, isAvailable]);

  // Press handlers
  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, SPRING_CONFIGS.snappy);
    runOnJS(triggerHaptic)('light');
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, SPRING_CONFIGS.bouncy);
  }, []);

  const handlePress = useCallback(() => {
    router.push('/details/steps');
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

  const progressBarStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: stepIconBounce.value }],
    };
  });

  const stepCountStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: stepCountScale.value }],
      opacity: stepCountScale.value,
    };
  });

  const livePulseStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: livePulse.value }],
      opacity: interpolate(livePulse.value, [1, 1.3], [1, 0.5]),
    };
  });

  const sourceIcon = Platform.OS === 'ios' ? 'logo-apple' : 'logo-google';
  const sourceName = Platform.OS === 'ios' ? 'Apple Health' : 'Google Fit';

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[styles.container, cardAnimatedStyle]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{t('stepCounter')}</Text>
        {isAvailable && (
          <View style={styles.liveContainer}>
            <Animated.View style={[styles.liveDot, livePulseStyle]} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          <Ionicons name="footsteps" size={36} color={Colors.primary} />
          {isAvailable && (
            <View style={styles.liveIndicator} />
          )}
        </Animated.View>
        <Animated.View style={[styles.stepsContainer, stepCountStyle]}>
          <Text style={styles.steps}>{displaySteps.toLocaleString()}</Text>
          <Text style={styles.goal}>/ {goal.toLocaleString()} {t('steps') || 'adım'}</Text>
        </Animated.View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill, 
              progressBarStyle,
              { backgroundColor: percentage >= 100 ? Colors.success : Colors.primary }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{Math.round(percentage)}%</Text>
      </View>

      {/* Source */}
      <View style={styles.source}>
        {isAvailable ? (
          <>
            <Ionicons name={sourceIcon as any} size={14} color={Colors.primary} />
            <Text style={styles.sourceText}>{sourceName}</Text>
          </>
        ) : (
          <>
            <Ionicons name="hand-left-outline" size={14} color={Colors.lightText} />
            <Text style={styles.sourceText}>{t('manual') || 'Manuel'}</Text>
          </>
        )}
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 230,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.darkText,
    letterSpacing: -0.3,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.success,
    letterSpacing: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 12,
  },
  iconContainer: {
    position: 'relative',
    backgroundColor: Colors.primary + '10',
    padding: 12,
    borderRadius: 16,
  },
  liveIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  stepsContainer: {
    flex: 1,
  },
  steps: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.darkText,
    letterSpacing: -1,
  },
  goal: {
    fontSize: 12,
    color: Colors.lightText,
    fontWeight: '500',
    marginTop: 2,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    minWidth: 36,
    textAlign: 'right',
  },
  source: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sourceText: {
    fontSize: 11,
    color: Colors.lightText,
    fontWeight: '500',
  },
});

export default memo(StepCard);
