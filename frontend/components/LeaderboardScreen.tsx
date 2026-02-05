import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import { getLeaderboard } from '../utils/api';

const LEAGUE_COLORS: Record<string, string[]> = {
  bronze: ['#CD7F32', '#8B4513'],
  silver: ['#C0C0C0', '#808080'],
  gold: ['#FFD700', '#FFA500'],
  platinum: ['#E5E4E2', '#71797E'],
  diamond: ['#B9F2FF', '#00CED1'],
  legend: ['#FF6B6B', '#FF8E53'],
};

const LEAGUE_EMOJIS: Record<string, string> = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '💎',
  diamond: '👑',
  legend: '🔥',
};

// Demo leaderboard data for when API is not available
const DEMO_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, user_id: '1', name: 'Eylül', level: 15, total_points: 12500, league: 'gold', daily_streak: 45, achievements_count: 28 },
  { rank: 2, user_id: '2', name: 'Yusuf', level: 14, total_points: 11200, league: 'gold', daily_streak: 38, achievements_count: 25 },
  { rank: 3, user_id: '3', name: 'Mehmet A.', level: 12, total_points: 9800, league: 'silver', daily_streak: 30, achievements_count: 22 },
  { rank: 4, user_id: '4', name: 'Ayşe D.', level: 11, total_points: 8500, league: 'silver', daily_streak: 25, achievements_count: 20 },
  { rank: 5, user_id: '5', name: 'Can B.', level: 10, total_points: 7200, league: 'silver', daily_streak: 21, achievements_count: 18 },
  { rank: 6, user_id: '6', name: 'Zeynep M.', level: 9, total_points: 6100, league: 'bronze', daily_streak: 18, achievements_count: 15 },
  { rank: 7, user_id: '7', name: 'Ali T.', level: 8, total_points: 5400, league: 'bronze', daily_streak: 14, achievements_count: 12 },
  { rank: 8, user_id: '8', name: 'Fatma S.', level: 7, total_points: 4200, league: 'bronze', daily_streak: 10, achievements_count: 10 },
  { rank: 9, user_id: '9', name: 'Hasan K.', level: 6, total_points: 3500, league: 'bronze', daily_streak: 8, achievements_count: 8 },
  { rank: 10, user_id: '10', name: 'Selin Y.', level: 5, total_points: 2800, league: 'bronze', daily_streak: 5, achievements_count: 6 },
];

interface LeaderboardUser {
  rank: number;
  user_id: string;
  name: string;
  level: number;
  total_points: number;
  league: string;
  daily_streak: number;
  achievements_count: number;
}

interface LeaderboardScreenProps {
  selectedLeague?: string;
}

export default function LeaderboardScreen({ selectedLeague }: LeaderboardScreenProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'tr' ? 'tr' : 'en';
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('all');

  useEffect(() => {
    loadLeaderboard();
  }, [selectedTab]);

  const loadLeaderboard = async () => {
    try {
      const league = selectedTab === 'all' ? undefined : selectedTab;
      const data = await getLeaderboard(league, 100);
      
      // Use API data if available, otherwise use demo data
      if (data.leaderboard && data.leaderboard.length > 0) {
        setLeaderboard(data.leaderboard);
        setCurrentUser(data.current_user || null);
      } else {
        // Filter demo data by league if needed
        const filteredDemo = selectedTab === 'all' 
          ? DEMO_LEADERBOARD 
          : DEMO_LEADERBOARD.filter(u => u.league === selectedTab);
        setLeaderboard(filteredDemo);
        // Set current user as demo user
        setCurrentUser({
          rank: 15,
          user_id: 'current',
          name: 'Sen',
          level: 3,
          total_points: 1500,
          league: 'bronze',
          daily_streak: 3,
          achievements_count: 4,
        });
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      // Use demo data on error
      const filteredDemo = selectedTab === 'all' 
        ? DEMO_LEADERBOARD 
        : DEMO_LEADERBOARD.filter(u => u.league === selectedTab);
      setLeaderboard(filteredDemo);
      setCurrentUser({
        rank: 15,
        user_id: 'current',
        name: 'Sen',
        level: 3,
        total_points: 1500,
        league: 'bronze',
        daily_streak: 3,
        achievements_count: 4,
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadLeaderboard();
  };

  const renderTopThree = () => {
    if (leaderboard.length < 3) return null;

    const top3 = leaderboard.slice(0, 3);
    const [first, second, third] = [top3[0], top3[1], top3[2]];

    return (
      <View style={styles.topThreeContainer}>
        {/* 2nd Place */}
        {second && (
          <View style={styles.podiumItem}>
            <View style={[styles.podiumRank, { backgroundColor: '#C0C0C0' }]}>
              <Text style={styles.podiumRankText}>2</Text>
            </View>
            <View style={[styles.podiumBar, { height: 80, backgroundColor: '#C0C0C0' }]}>
              <Text style={styles.podiumName} numberOfLines={1}>{second.name}</Text>
              <Text style={styles.podiumPoints}>{second.total_points}</Text>
            </View>
          </View>
        )}

        {/* 1st Place */}
        {first && (
          <View style={styles.podiumItem}>
            <Ionicons name="trophy" size={32} color="#FFD700" style={styles.crownIcon} />
            <View style={[styles.podiumRank, { backgroundColor: '#FFD700' }]}>
              <Text style={styles.podiumRankText}>1</Text>
            </View>
            <View style={[styles.podiumBar, { height: 120, backgroundColor: '#FFD700' }]}>
              <Text style={styles.podiumName} numberOfLines={1}>{first.name}</Text>
              <Text style={styles.podiumPoints}>{first.total_points}</Text>
            </View>
          </View>
        )}

        {/* 3rd Place */}
        {third && (
          <View style={styles.podiumItem}>
            <View style={[styles.podiumRank, { backgroundColor: '#CD7F32' }]}>
              <Text style={styles.podiumRankText}>3</Text>
            </View>
            <View style={[styles.podiumBar, { height: 60, backgroundColor: '#CD7F32' }]}>
              <Text style={styles.podiumName} numberOfLines={1}>{third.name}</Text>
              <Text style={styles.podiumPoints}>{third.total_points}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardUser; index: number }) => {
    if (index < 3) return null; // Top 3 already shown

    const isCurrentUser = currentUser && item.user_id === currentUser.user_id;
    const leagueColors = LEAGUE_COLORS[item.league] || LEAGUE_COLORS.bronze;

    return (
      <LeaderboardItem
        user={item}
        index={index}
        isCurrentUser={isCurrentUser}
        leagueColors={leagueColors}
        lang={lang}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* League Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
            {lang === 'tr' ? 'Tümü' : 'All'}
          </Text>
        </TouchableOpacity>
        {Object.keys(LEAGUE_EMOJIS).map((league) => (
          <TouchableOpacity
            key={league}
            style={[styles.tab, selectedTab === league && styles.tabActive]}
            onPress={() => setSelectedTab(league)}
          >
            <Text style={styles.tabEmoji}>{LEAGUE_EMOJIS[league]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={leaderboard}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.user_id}
        ListHeaderComponent={renderTopThree}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
          />
        }
      />

      {/* Current User Card */}
      {currentUser && currentUser.rank > 3 && (
        <View style={styles.currentUserCard}>
          <LinearGradient
            colors={LEAGUE_COLORS[currentUser.league] || LEAGUE_COLORS.bronze}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.currentUserGradient}
          >
            <View style={styles.currentUserContent}>
              <View style={styles.currentUserLeft}>
                <Text style={styles.currentUserRank}>#{currentUser.rank}</Text>
                <Text style={styles.currentUserName}>{currentUser.name}</Text>
              </View>
              <View style={styles.currentUserRight}>
                <Text style={styles.currentUserLeague}>{LEAGUE_EMOJIS[currentUser.league]}</Text>
                <Text style={styles.currentUserPoints}>{currentUser.total_points}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

interface LeaderboardItemProps {
  user: LeaderboardUser;
  index: number;
  isCurrentUser: boolean;
  leagueColors: string[];
  lang: 'tr' | 'en';
}

function LeaderboardItem({ user, index, isCurrentUser, leagueColors, lang }: LeaderboardItemProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      index * 50,
      withSpring(1, { damping: 15, stiffness: 100 })
    );
    opacity.value = withDelay(index * 50, withSpring(1));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View style={[styles.leaderboardItem, isCurrentUser && styles.currentUserItem]}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemRank}>#{user.rank}</Text>
          <Text style={styles.itemName} numberOfLines={1}>{user.name}</Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.itemLeague}>{LEAGUE_EMOJIS[user.league]}</Text>
          <View style={styles.itemStats}>
            <Text style={styles.itemLevel}>Lv.{user.level}</Text>
            <Text style={styles.itemPoints}>{user.total_points}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.card,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightText,
  },
  tabTextActive: {
    color: '#FFF',
  },
  tabEmoji: {
    fontSize: 18,
  },
  listContent: {
    paddingBottom: 100,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 12,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  crownIcon: {
    marginBottom: 8,
  },
  podiumRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  podiumRankText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFF',
  },
  podiumBar: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  currentUserItem: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  itemRank: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
    width: 40,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    flex: 1,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemLeague: {
    fontSize: 24,
  },
  itemStats: {
    alignItems: 'flex-end',
  },
  itemLevel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.lightText,
  },
  itemPoints: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.darkText,
  },
  currentUserCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  currentUserGradient: {
    padding: 16,
  },
  currentUserContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentUserLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currentUserRank: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
  },
  currentUserName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  currentUserRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currentUserLeague: {
    fontSize: 28,
  },
  currentUserPoints: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
  },
});
