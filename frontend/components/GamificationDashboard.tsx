import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

interface GamificationData {
  level: number;
  xp: number;
  total_points: number;
  daily_streak: number;
  goal_streak: number;
  league: string;
  league_info: {
    name: string;
    emoji: string;
    min_points: number;
    max_points: number;
  };
  level_progress: number;
  next_level_xp: number;
}

interface GamificationDashboardProps {
  data: GamificationData;
  onRefresh?: () => void;
}

const LEAGUE_COLORS: Record<string, string[]> = {
  bronze: ['#CD7F32', '#8B4513'],
  silver: ['#C0C0C0', '#808080'],
  gold: ['#FFD700', '#FFA500'],
  platinum: ['#E5E4E2', '#71797E'],
  diamond: ['#B9F2FF', '#00CED1'],
  legend: ['#FF6B6B', '#FF8E53'],
};

export default function GamificationDashboard({ data, onRefresh }: GamificationDashboardProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'tr' ? 'tr' : 'en';
  
  // Animations
  const progressWidth = useSharedValue(0);
  const levelScale = useSharedValue(1);
  const streakScale = useSharedValue(1);
  const leagueOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Smooth progress bar animation
    progressWidth.value = withTiming((data.level_progress / 100) * (width - 80), {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    
    // Level pulse
    levelScale.value = withSequence(
      withTiming(1.1, { duration: 200 }),
      withTiming(1, { duration: 200 })
    );
    
    // Streak pulse with delay
    streakScale.value = withDelay(
      300,
      withSequence(
        withTiming(1.1, { duration: 200 }),
        withTiming(1, { duration: 200 })
      )
    );
    
    // League fade in
    leagueOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 400 })
    );
  }, [data]);
  
  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });
  
  const levelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: levelScale.value }],
    };
  });
  
  const streakAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: streakScale.value }],
    };
  });
  
  const leagueAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: leagueOpacity.value,
    };
  });
  
  const leagueColors = LEAGUE_COLORS[data.league] || LEAGUE_COLORS.bronze;
  
  return (
    <View style={styles.container}>
      {/* Level & League Card */}
      <TouchableOpacity 
        style={styles.mainCard}
        activeOpacity={0.9}
        onPress={onRefresh}
      >
        <LinearGradient
          colors={leagueColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Top Section - Level & League */}
          <View style={styles.topSection}>
            <Animated.View style={[styles.levelContainer, levelAnimatedStyle]}>
              <Text style={styles.levelLabel}>
                {lang === 'tr' ? 'SEVİYE' : 'LEVEL'}
              </Text>
              <Text style={styles.levelNumber}>{data.level}</Text>
            </Animated.View>
            
            <Animated.View style={[styles.leagueContainer, leagueAnimatedStyle]}>
              <Text style={styles.leagueEmoji}>{data.league_info.emoji}</Text>
              <Text style={styles.leagueName}>
                {lang === 'tr' 
                  ? data.league_info.name === 'Bronze' ? 'Bronz'
                  : data.league_info.name === 'Silver' ? 'Gümüş'
                  : data.league_info.name === 'Gold' ? 'Altın'
                  : data.league_info.name === 'Platinum' ? 'Platin'
                  : data.league_info.name === 'Diamond' ? 'Elmas'
                  : 'Efsane'
                  : data.league_info.name}
              </Text>
            </Animated.View>
          </View>
          
          {/* XP Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>
                {lang === 'tr' ? 'Sonraki Seviye' : 'Next Level'}
              </Text>
              <Text style={styles.progressPercentage}>
                {Math.round(data.level_progress)}%
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <Animated.View 
                style={[
                  styles.progressBarFill,
                  progressAnimatedStyle,
                  { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                ]} 
              />
            </View>
            <Text style={styles.xpText}>
              {data.xp} / {data.next_level_xp} XP
            </Text>
          </View>
          
          {/* Bottom Stats */}
          <View style={styles.statsRow}>
            <Animated.View style={[styles.statItem, streakAnimatedStyle]}>
              <Ionicons name="flame" size={20} color="#FFF" />
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>{data.daily_streak}</Text>
                <Text style={styles.statLabel}>
                  {lang === 'tr' ? 'Günlük Seri' : 'Day Streak'}
                </Text>
              </View>
            </Animated.View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Ionicons name="trophy" size={20} color="#FFF" />
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>{data.total_points}</Text>
                <Text style={styles.statLabel}>
                  {lang === 'tr' ? 'Puan' : 'Points'}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  mainCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    padding: 20,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  levelContainer: {
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  levelNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  leagueContainer: {
    alignItems: 'center',
  },
  leagueEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  leagueName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressPercentage: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statTextContainer: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
