/**
 * Skeleton Loading Components
 * Shimmer efektli yükleme iskeletleri
 */

import React, { useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

// Base shimmer skeleton
export const Skeleton = memo(({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8,
  style 
}: SkeletonProps) => {
  const shimmerX = useSharedValue(-SCREEN_WIDTH);

  useEffect(() => {
    shimmerX.value = withRepeat(
      withTiming(SCREEN_WIDTH, { 
        duration: 1500, 
        easing: Easing.bezier(0.4, 0, 0.6, 1) 
      }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateX: shimmerX.value }],
    };
  });

  return (
    <View 
      style={[
        styles.skeletonBase, 
        { width, height, borderRadius },
        style
      ]}
    >
      <Animated.View style={[styles.shimmerContainer, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shimmerGradient}
        />
      </Animated.View>
    </View>
  );
});

// Card skeleton for dashboard cards
export const CardSkeleton = memo(({ style }: { style?: any }) => {
  return (
    <View style={[styles.cardSkeleton, style]}>
      <View style={styles.cardHeader}>
        <Skeleton width={120} height={16} />
        <Skeleton width={40} height={24} borderRadius={12} />
      </View>
      <View style={styles.cardBody}>
        <Skeleton width={80} height={80} borderRadius={40} />
      </View>
      <View style={styles.cardFooter}>
        <Skeleton width="30%" height={12} />
        <Skeleton width="30%" height={12} />
        <Skeleton width="30%" height={12} />
      </View>
    </View>
  );
});

// List item skeleton
export const ListItemSkeleton = memo(({ count = 3 }: { count?: number }) => {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.listItem}>
          <Skeleton width={48} height={48} borderRadius={24} />
          <View style={styles.listItemText}>
            <Skeleton width="70%" height={14} />
            <Skeleton width="50%" height={12} style={{ marginTop: 8 }} />
          </View>
          <Skeleton width={60} height={28} borderRadius={14} />
        </View>
      ))}
    </View>
  );
});

// Full dashboard skeleton
export const DashboardSkeleton = memo(() => {
  return (
    <View style={styles.dashboardContainer}>
      {/* Header skeleton */}
      <View style={styles.dashboardHeader}>
        <View>
          <Skeleton width={100} height={14} />
          <Skeleton width={150} height={24} style={{ marginTop: 4 }} />
        </View>
        <Skeleton width={40} height={40} borderRadius={20} />
      </View>
      
      {/* Cards grid */}
      <View style={styles.cardsGrid}>
        <View style={styles.cardRow}>
          <CardSkeleton style={styles.halfCard} />
          <CardSkeleton style={styles.halfCard} />
        </View>
        <View style={styles.cardRow}>
          <CardSkeleton style={styles.halfCard} />
          <CardSkeleton style={styles.halfCard} />
        </View>
      </View>
      
      {/* Full width card */}
      <Skeleton width="100%" height={180} borderRadius={24} />
    </View>
  );
});

// Recipe card skeleton
export const RecipeCardSkeleton = memo(() => {
  return (
    <View style={styles.recipeCard}>
      <Skeleton width="100%" height={150} borderRadius={16} />
      <View style={styles.recipeInfo}>
        <Skeleton width="80%" height={16} style={{ marginTop: 12 }} />
        <Skeleton width="60%" height={12} style={{ marginTop: 8 }} />
        <View style={styles.recipeStats}>
          <Skeleton width={50} height={20} borderRadius={10} />
          <Skeleton width={50} height={20} borderRadius={10} />
          <Skeleton width={50} height={20} borderRadius={10} />
        </View>
      </View>
    </View>
  );
});

// Meal item skeleton
export const MealItemSkeleton = memo(() => {
  return (
    <View style={styles.mealItem}>
      <Skeleton width={60} height={60} borderRadius={12} />
      <View style={styles.mealInfo}>
        <Skeleton width="70%" height={16} />
        <Skeleton width="40%" height={12} style={{ marginTop: 6 }} />
      </View>
      <View style={styles.mealCalories}>
        <Skeleton width={60} height={20} borderRadius={10} />
      </View>
    </View>
  );
});

// Pulse animation skeleton (alternative to shimmer)
export const PulseSkeleton = memo(({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8,
  style 
}: SkeletonProps) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 800 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View 
      style={[
        styles.pulseSkeleton, 
        { width, height, borderRadius },
        pulseStyle,
        style
      ]}
    />
  );
});

const styles = StyleSheet.create({
  skeletonBase: {
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
  },
  shimmerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shimmerGradient: {
    width: 100,
    height: '100%',
  },
  pulseSkeleton: {
    backgroundColor: '#E0E0E0',
  },
  cardSkeleton: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 16,
    gap: 12,
  },
  listItemText: {
    flex: 1,
  },
  dashboardContainer: {
    padding: 16,
    gap: 16,
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardsGrid: {
    gap: 12,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfCard: {
    flex: 1,
    minHeight: 200,
  },
  recipeCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeStats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 16,
    gap: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealCalories: {
    alignItems: 'flex-end',
  },
});

export default Skeleton;
