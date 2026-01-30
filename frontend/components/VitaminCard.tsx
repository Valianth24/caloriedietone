import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  FadeInDown,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { getUserVitamins, addVitamin, getVitaminTemplates } from '../utils/api';
import { useStore } from '../store/useStore';
import { useRouter } from 'expo-router';
import { SPRING_CONFIGS, triggerHaptic } from '../utils/animations';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Vitamin {
  vitamin_id: string;
  name: string;
  time: string;
  is_taken: boolean;
}

interface VitaminCardProps {
  index?: number;
}

function VitaminCard({ index = 0 }: VitaminCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { refreshData } = useStore();
  const [vitamins, setVitamins] = useState<Vitamin[]>([]);
  const [loading, setLoading] = useState(true);
  const initializedRef = useRef(false);
  const isMountedRef = useRef(true);

  // Animation values
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);
  const itemsOpacity = useSharedValue(0);
  const checkmarkScales = useSharedValue<number[]>([0, 0, 0]);

  const loadVitamins = async (isInitial: boolean = false) => {
    if (!isMountedRef.current) return;
    
    try {
      if (isInitial) setLoading(true);
      const userVitamins = await getUserVitamins() as Vitamin[] | null;
      
      if (!isMountedRef.current) return;
      
      if ((!userVitamins || !Array.isArray(userVitamins) || userVitamins.length === 0) && isInitial && !initializedRef.current) {
        const templates = await getVitaminTemplates() as Array<{name: string, default_time: string}> | null;
        if (templates && Array.isArray(templates)) {
          for (const template of templates) {
            await addVitamin(template.name, template.default_time);
          }
        }
        if (!isMountedRef.current) return;
        const newUserVitamins = await getUserVitamins() as Vitamin[] | null;
        if (isMountedRef.current) {
          setVitamins(Array.isArray(newUserVitamins) ? newUserVitamins : []);
          initializedRef.current = true;
        }
      } else {
        if (isMountedRef.current) {
          setVitamins(Array.isArray(userVitamins) ? userVitamins : []);
          if (isInitial) initializedRef.current = true;
        }
      }
    } catch (error) {
      console.error('Error loading vitamins:', error);
      if (isMountedRef.current) setVitamins([]);
    } finally {
      if (isMountedRef.current && isInitial) setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    isMountedRef.current = true;
    loadVitamins(true);
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Refresh when refreshData changes
  useEffect(() => {
    if (initializedRef.current) {
      loadVitamins(false);
    }
  }, [refreshData]);

  // Entrance animations
  useEffect(() => {
    const delay = index * 100;
    
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, SPRING_CONFIGS.gentle));
    itemsOpacity.value = withDelay(delay + 300, withTiming(1, { duration: 400 }));
  }, [index]);

  // Animate checkmarks when vitamins load
  useEffect(() => {
    if (vitamins.length > 0) {
      vitamins.slice(0, 3).forEach((vitamin, idx) => {
        if (vitamin.is_taken) {
          setTimeout(() => {
            checkmarkScales.value = checkmarkScales.value.map((v, i) => 
              i === idx ? 1 : v
            ) as number[];
          }, 400 + idx * 100);
        }
      });
    }
  }, [vitamins]);

  // Press handlers
  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, SPRING_CONFIGS.snappy);
    runOnJS(triggerHaptic)('light');
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, SPRING_CONFIGS.bouncy);
  }, []);

  const handlePress = useCallback(() => {
    router.push('/details/vitamins');
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

  const itemsStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: itemsOpacity.value,
    };
  });

  // Count taken vitamins
  const takenCount = vitamins.filter(v => v.is_taken).length;
  const totalCount = vitamins.length;

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[styles.container, cardAnimatedStyle]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{t('vitaminTracking')}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{takenCount}/{totalCount}</Text>
        </View>
      </View>

      {/* Vitamin List */}
      <Animated.View style={[styles.list, itemsStyle]}>
        {loading ? (
          // Skeleton loading
          <View style={styles.skeletonContainer}>
            {[1, 2, 3].map((_, idx) => (
              <View key={idx} style={styles.skeletonItem}>
                <View style={styles.skeletonCircle} />
                <View style={styles.skeletonLines}>
                  <View style={styles.skeletonLine} />
                  <View style={[styles.skeletonLine, { width: '60%' }]} />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
            {vitamins.slice(0, 3).map((vitamin, idx) => (
              <VitaminItem 
                key={vitamin.vitamin_id} 
                vitamin={vitamin} 
                index={idx}
              />
            ))}
          </ScrollView>
        )}
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        <Text style={styles.footerText}>{t('tapForDetails')}</Text>
      </View>
    </AnimatedPressable>
  );
}

// Animated Vitamin Item
const VitaminItem = memo(({ vitamin, index }: { vitamin: Vitamin; index: number }) => {
  const itemScale = useSharedValue(0.8);
  const itemOpacity = useSharedValue(0);
  const checkScale = useSharedValue(0);

  useEffect(() => {
    itemOpacity.value = withDelay(index * 80, withTiming(1, { duration: 300 }));
    itemScale.value = withDelay(index * 80, withSpring(1, SPRING_CONFIGS.gentle));
    
    if (vitamin.is_taken) {
      checkScale.value = withDelay(index * 80 + 200, withSpring(1, SPRING_CONFIGS.bouncy));
    }
  }, [vitamin.is_taken, index]);

  const itemStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: itemOpacity.value,
      transform: [{ scale: itemScale.value }],
    };
  });

  const checkStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: checkScale.value }],
    };
  });

  return (
    <Animated.View style={[styles.vitaminItem, itemStyle]}>
      <Animated.View style={[styles.checkContainer, checkStyle]}>
        <Ionicons
          name={vitamin.is_taken ? 'checkmark-circle' : 'ellipse-outline'}
          size={22}
          color={vitamin.is_taken ? Colors.success : Colors.lightText}
        />
      </Animated.View>
      <View style={styles.vitaminInfo}>
        <Text style={styles.vitaminName} numberOfLines={1}>{vitamin.name}</Text>
        <Text style={styles.vitaminTime} numberOfLines={1}>{vitamin.time}</Text>
      </View>
      <View style={[
        styles.statusBadge, 
        { backgroundColor: vitamin.is_taken ? Colors.success + '15' : Colors.lightText + '15' }
      ]}>
        <Text style={[
          styles.statusText,
          { color: vitamin.is_taken ? Colors.success : Colors.lightText }
        ]}>
          {vitamin.is_taken ? '✓' : '○'}
        </Text>
      </View>
    </Animated.View>
  );
});

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
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.darkText,
    letterSpacing: -0.3,
  },
  countBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  list: {
    flex: 1,
    marginBottom: 8,
  },
  skeletonContainer: {
    gap: 12,
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  skeletonCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E8E8E8',
  },
  skeletonLines: {
    flex: 1,
    gap: 6,
  },
  skeletonLine: {
    height: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    width: '80%',
  },
  vitaminItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  checkContainer: {
    width: 28,
    alignItems: 'center',
  },
  vitaminInfo: {
    flex: 1,
  },
  vitaminName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkText,
  },
  vitaminTime: {
    fontSize: 11,
    color: Colors.lightText,
    marginTop: 2,
  },
  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default memo(VitaminCard);
