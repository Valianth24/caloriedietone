import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';
import GamificationDashboard from '../../components/GamificationDashboard';
import DailyTasksCard from '../../components/DailyTasksCard';
import LevelUpModal from '../../components/LevelUpModal';
import LeaderboardScreen from '../../components/LeaderboardScreen';
import { 
  getGamificationStatus, 
  checkDailyLogin,
  getAchievements,
  completeGoal 
} from '../../utils/api';
import { useStore } from '../../store/useStore';

export default function AchievementsScreen() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'tr' ? 'tr' : 'en';
  const { user, dailySummary, waterData, stepData } = useStore();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [gamificationData, setGamificationData] = useState<any>(null);
  const [achievements, setAchievements] = useState<any>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard'>('overview');
  
  // Günlük görevler - Adım hedefi dahil!
  const [dailyTasks, setDailyTasks] = useState([
    {
      id: 'login',
      icon: 'calendar' as const,
      titleTr: 'Uygulamaya Giriş Yap',
      titleEn: 'Login to App',
      xp: 10,
      completed: false,
    },
    {
      id: 'water',
      icon: 'water' as const,
      titleTr: 'Su Hedefini Tamamla',
      titleEn: 'Complete Water Goal',
      xp: 20,
      completed: false,
      progress: 0,
      total: 2500,
    },
    {
      id: 'steps',
      icon: 'footsteps' as const,
      titleTr: 'Adım Hedefini Tamamla',
      titleEn: 'Complete Step Goal',
      xp: 30,
      completed: false,
      progress: 0,
      total: 10000,
    },
    {
      id: 'calorie',
      icon: 'flame' as const,
      titleTr: 'Kalori Hedefini Tamamla',
      titleEn: 'Complete Calorie Goal',
      xp: 50,
      completed: false,
      progress: 0,
      total: 2000,
    },
    {
      id: 'photo',
      icon: 'camera' as const,
      titleTr: 'Yemek Fotoğrafı Çek',
      titleEn: 'Take Food Photo',
      xp: 15,
      completed: false,
    },
  ]);

  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    // Görevlerin durumunu güncelle
    updateTasksStatus();
  }, [dailySummary, waterData, stepData, user]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Günlük giriş kontrolü yap
      const dailyCheck = await checkDailyLogin();
      
      // Seviye atlama kontrolü
      if (dailyCheck?.rewards?.level_up) {
        setNewLevel(dailyCheck.rewards.new_level);
        setShowLevelUp(true);
      }
      
      // Gamification durumunu al
      const status = await getGamificationStatus();
      setGamificationData(status);
      
      // Rozetleri al
      const achievementsData = await getAchievements();
      setAchievements(achievementsData);
      
      // Görevlerin durumunu güncelle
      await updateTasksStatus();
    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTasksStatus = async () => {
    setDailyTasks(prev => prev.map(task => {
      if (task.id === 'login') {
        return { ...task, completed: true };
      }
      
      if (task.id === 'water') {
        const current = waterData?.total_amount || 0;
        const goal = user?.water_goal || 2500;
        return {
          ...task,
          completed: current >= goal,
          progress: current,
          total: goal,
        };
      }
      
      if (task.id === 'steps') {
        const current = stepData?.steps || 0;
        const goal = user?.step_goal || 10000;
        return {
          ...task,
          completed: current >= goal,
          progress: current,
          total: goal,
        };
      }
      
      if (task.id === 'calorie') {
        const current = dailySummary?.total_calories || 0;
        const goal = user?.daily_calorie_goal || 2000;
        return {
          ...task,
          completed: current >= goal * 0.8, // %80'i yeterli
          progress: current,
          total: goal,
        };
      }
      
      return task;
    }));
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleTaskPress = async (taskId: string) => {
    const task = dailyTasks.find(t => t.id === taskId);
    if (!task || task.completed) return;
    
    // Görev tamamlandıysa backend'e bildir
    if (taskId === 'water' && task.progress && task.total && task.progress >= task.total) {
      try {
        await completeGoal('water');
        await loadData();
      } catch (error) {
        console.error('Error completing water goal:', error);
      }
    }
    
    if (taskId === 'steps' && task.progress && task.total && task.progress >= task.total) {
      try {
        await completeGoal('steps');
        await loadData();
      } catch (error) {
        console.error('Error completing steps goal:', error);
      }
    }
    
    if (taskId === 'calorie' && task.progress && task.total && task.progress >= task.total * 0.8) {
      try {
        await completeGoal('calorie');
        await loadData();
      } catch (error) {
        console.error('Error completing calorie goal:', error);
      }
    }
  };

  if (loading && !gamificationData) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              {lang === 'tr' ? 'Başarılarım' : 'My Achievements'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {lang === 'tr' ? 'İlerlemeni takip et' : 'Track your progress'}
            </Text>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={28} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Gamification Dashboard */}
        {gamificationData && (
          <GamificationDashboard 
            data={gamificationData} 
            onRefresh={loadData}
          />
        )}

        {/* Daily Tasks */}
        <DailyTasksCard 
          tasks={dailyTasks}
          onTaskPress={handleTaskPress}
        />

        {/* Achievements Section */}
        {achievements && (
          <View style={styles.achievementsSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="trophy" size={24} color={Colors.primary} />
              <Text style={styles.sectionTitle}>
                {lang === 'tr' ? 'Rozetler' : 'Badges'}
              </Text>
            </View>

            {/* Earned Badges */}
            {achievements.earned.length > 0 && (
              <View style={styles.badgesGrid}>
                {achievements.earned.map((achievement: any) => (
                  <View key={achievement.id} style={styles.badgeCard}>
                    <Text style={styles.badgeEmoji}>{achievement.emoji}</Text>
                    <Text style={styles.badgeName} numberOfLines={2}>
                      {lang === 'tr' ? achievement.name_tr : achievement.name_en}
                    </Text>
                    <Text style={styles.badgeXp}>+{achievement.xp} XP</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Locked Badges */}
            {achievements.unearned.length > 0 && (
              <>
                <Text style={styles.lockedTitle}>
                  {lang === 'tr' ? 'Kilitli Rozetler' : 'Locked Badges'}
                </Text>
                <View style={styles.badgesGrid}>
                  {achievements.unearned.slice(0, 6).map((achievement: any) => (
                    <View key={achievement.id} style={[styles.badgeCard, styles.lockedBadge]}>
                      <Text style={styles.badgeEmojiLocked}>{achievement.emoji}</Text>
                      <Text style={[styles.badgeName, styles.badgeNameLocked]} numberOfLines={2}>
                        {lang === 'tr' ? achievement.name_tr : achievement.name_en}
                      </Text>
                      <Ionicons name="lock-closed" size={16} color={Colors.lightText} />
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        {/* Stats Summary */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>
            {lang === 'tr' ? 'İstatistikler' : 'Statistics'}
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={32} color={Colors.primary} />
              <Text style={styles.statValue}>
                {gamificationData?.daily_streak || 0}
              </Text>
              <Text style={styles.statLabel}>
                {lang === 'tr' ? 'Günlük Seri' : 'Day Streak'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={32} color={Colors.success} />
              <Text style={styles.statValue}>
                {gamificationData?.goal_streak || 0}
              </Text>
              <Text style={styles.statLabel}>
                {lang === 'tr' ? 'Hedef Serisi' : 'Goal Streak'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={32} color={Colors.premium} />
              <Text style={styles.statValue}>
                {achievements?.total_earned || 0}
              </Text>
              <Text style={styles.statLabel}>
                {lang === 'tr' ? 'Rozet' : 'Badges'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Level Up Modal */}
      <LevelUpModal
        visible={showLevelUp}
        level={newLevel}
        onClose={() => setShowLevelUp(false)}
      />
    </SafeAreaView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.darkText,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.lightText,
    marginTop: 2,
  },
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.darkText,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    width: '31%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  badgeEmojiLocked: {
    fontSize: 36,
    marginBottom: 6,
    opacity: 0.4,
  },
  badgeName: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.darkText,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeNameLocked: {
    color: Colors.lightText,
  },
  badgeXp: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  lockedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.lightText,
    marginTop: 20,
    marginBottom: 12,
  },
  statsSection: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.darkText,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.lightText,
    marginTop: 4,
    textAlign: 'center',
  },
});
