import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

interface BadgeDetailModalProps {
  visible: boolean;
  badge: {
    id: string;
    emoji: string;
    name_tr: string;
    name_en: string;
    xp: number;
    earned?: boolean;
  } | null;
  onClose: () => void;
  language: 'tr' | 'en';
}

// Rozet kazanma koşulları
const BADGE_CONDITIONS: Record<string, { tr: string; en: string; difficulty: number }> = {
  first_login: {
    tr: 'İlk defa uygulamaya giriş yap',
    en: 'Login to the app for the first time',
    difficulty: 1,
  },
  streak_7: {
    tr: '7 gün üst üste uygulamaya giriş yap',
    en: 'Login for 7 consecutive days',
    difficulty: 2,
  },
  streak_30: {
    tr: '30 gün üst üste uygulamaya giriş yap',
    en: 'Login for 30 consecutive days',
    difficulty: 4,
  },
  streak_100: {
    tr: '100 gün üst üste uygulamaya giriş yap',
    en: 'Login for 100 consecutive days',
    difficulty: 5,
  },
  goal_streak_7: {
    tr: '7 gün üst üste günlük hedefleri tamamla',
    en: 'Complete daily goals for 7 consecutive days',
    difficulty: 3,
  },
  water_hero: {
    tr: '7 gün üst üste su hedefini tamamla',
    en: 'Complete water goal for 7 consecutive days',
    difficulty: 2,
  },
  calorie_master: {
    tr: '7 gün üst üste kalori hedefini tamamla',
    en: 'Complete calorie goal for 7 consecutive days',
    difficulty: 3,
  },
  photo_hunter: {
    tr: '50 yemek fotoğrafı çek',
    en: 'Take 50 food photos',
    difficulty: 3,
  },
  recipe_explorer: {
    tr: '30 farklı tarif dene',
    en: 'Try 30 different recipes',
    difficulty: 4,
  },
  diet_guru: {
    tr: 'Bir diyet programını başarıyla tamamla',
    en: 'Successfully complete a diet program',
    difficulty: 5,
  },
  bronze_league: {
    tr: 'Bronz Lige ulaş (0-499 puan)',
    en: 'Reach Bronze League (0-499 points)',
    difficulty: 1,
  },
  silver_league: {
    tr: 'Gümüş Lige ulaş (500-1499 puan)',
    en: 'Reach Silver League (500-1499 points)',
    difficulty: 2,
  },
  gold_league: {
    tr: 'Altın Lige ulaş (1500-2999 puan)',
    en: 'Reach Gold League (1500-2999 points)',
    difficulty: 3,
  },
  platinum_league: {
    tr: 'Platin Lige ulaş (3000-4999 puan)',
    en: 'Reach Platinum League (3000-4999 points)',
    difficulty: 4,
  },
  diamond_league: {
    tr: 'Elmas Lige ulaş (5000-9999 puan)',
    en: 'Reach Diamond League (5000-9999 points)',
    difficulty: 5,
  },
  legend_league: {
    tr: 'Efsane Lige ulaş (10000+ puan)',
    en: 'Reach Legend League (10000+ points)',
    difficulty: 5,
  },
};

export default function BadgeDetailModal({ visible, badge, onClose, language }: BadgeDetailModalProps) {
  const scale = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible && badge) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 10 }),
        withSpring(1, { damping: 12 })
      );
      
      glowOpacity.value = withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0.6, { duration: 600 }),
        withTiming(1, { duration: 600 })
      );
    } else {
      scale.value = 0;
      glowOpacity.value = 0;
    }
  }, [visible, badge]);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  if (!badge) return null;

  const condition = BADGE_CONDITIONS[badge.id];
  const difficulty = condition?.difficulty || 1;
  const difficultyStars = '⭐'.repeat(difficulty);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={32} color="#FFF" />
          </TouchableOpacity>

          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Badge Display */}
            <View style={styles.badgeContainer}>
              {/* Glow Effect */}
              <Animated.View 
                style={[
                  styles.glowCircle, 
                  glowAnimatedStyle,
                  { 
                    backgroundColor: badge.earned 
                      ? 'rgba(76, 175, 80, 0.3)' 
                      : 'rgba(117, 117, 117, 0.2)' 
                  }
                ]} 
              />
              
              {/* Badge Emoji */}
              <Animated.View style={[styles.badgeEmojiContainer, badgeAnimatedStyle]}>
                <Text 
                  style={[
                    styles.badgeEmoji,
                    !badge.earned && styles.badgeEmojiLocked
                  ]}
                >
                  {badge.emoji}
                </Text>
              </Animated.View>

              {/* Lock Icon for Unearned */}
              {!badge.earned && (
                <View style={styles.lockIconContainer}>
                  <Ionicons name="lock-closed" size={32} color="#FFF" />
                </View>
              )}
            </View>

            {/* Badge Name */}
            <Text style={styles.badgeName}>
              {language === 'tr' ? badge.name_tr : badge.name_en}
            </Text>

            {/* Status Badge */}
            <View style={[
              styles.statusBadge,
              { backgroundColor: badge.earned ? Colors.success : Colors.lightText }
            ]}>
              <Text style={styles.statusText}>
                {badge.earned 
                  ? (language === 'tr' ? 'Kazanıldı ✓' : 'Earned ✓')
                  : (language === 'tr' ? 'Kilitli 🔒' : 'Locked 🔒')}
              </Text>
            </View>

            {/* XP Value */}
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.xpCard}
            >
              <Ionicons name="star" size={24} color="#FFF" />
              <Text style={styles.xpValue}>+{badge.xp} XP</Text>
              <Text style={styles.xpLabel}>
                {language === 'tr' ? 'Kazanılan Puan' : 'Points Earned'}
              </Text>
            </LinearGradient>

            {/* Condition */}
            {condition && (
              <View style={styles.conditionCard}>
                <View style={styles.conditionHeader}>
                  <Ionicons name="checkmark-circle-outline" size={24} color={Colors.primary} />
                  <Text style={styles.conditionTitle}>
                    {language === 'tr' ? 'Nasıl Kazanılır?' : 'How to Earn?'}
                  </Text>
                </View>
                <Text style={styles.conditionText}>
                  {language === 'tr' ? condition.tr : condition.en}
                </Text>

                {/* Difficulty */}
                <View style={styles.difficultyContainer}>
                  <Text style={styles.difficultyLabel}>
                    {language === 'tr' ? 'Zorluk:' : 'Difficulty:'}
                  </Text>
                  <Text style={styles.difficultyStars}>{difficultyStars}</Text>
                </View>
              </View>
            )}

            {/* Tips Card */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb" size={24} color={Colors.warning} />
                <Text style={styles.tipsTitle}>
                  {language === 'tr' ? 'İpucu' : 'Tip'}
                </Text>
              </View>
              <Text style={styles.tipsText}>
                {badge.earned
                  ? language === 'tr'
                    ? 'Bu rozet profilinde görünüyor ve seni leaderboard\'da öne çıkarıyor!'
                    : 'This badge is visible on your profile and highlights you on the leaderboard!'
                  : language === 'tr'
                    ? 'Bu rozeti kazanmak için günlük görevlerini tamamlamaya devam et!'
                    : 'Keep completing daily tasks to earn this badge!'}
              </Text>
            </View>

            {/* Action Button */}
            {!badge.earned && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={onClose}
              >
                <LinearGradient
                  colors={[Colors.primary, '#81C784']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.actionButtonGradient}
                >
                  <Text style={styles.actionButtonText}>
                    {language === 'tr' ? 'Şimdi Başla' : 'Start Now'}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    maxHeight: '85%',
    backgroundColor: Colors.background,
    borderRadius: 24,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  glowCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  badgeEmojiContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  badgeEmoji: {
    fontSize: 80,
  },
  badgeEmojiLocked: {
    opacity: 0.3,
  },
  lockIconContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.darkText,
    textAlign: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  xpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  xpValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
  },
  xpLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
    bottom: 4,
  },
  conditionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  conditionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.darkText,
  },
  conditionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.lightText,
    lineHeight: 20,
    marginBottom: 12,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  difficultyLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkText,
  },
  difficultyStars: {
    fontSize: 16,
  },
  tipsCard: {
    backgroundColor: Colors.warning + '15',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.warning + '30',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.warning,
  },
  tipsText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.darkText,
    lineHeight: 18,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
