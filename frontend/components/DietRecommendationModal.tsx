import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import i18n from '../utils/i18n';
import { useStore } from '../store/useStore';
import { allDiets, Diet } from '../content/diets';

const { width: screenWidth } = Dimensions.get('window');

interface DietRecommendation {
  diet_id: string;
  name: string;
  description: string;
  duration_days: number;
  category: string;
  difficulty: string;
  macros: { protein: number; carbs: number; fat: number };
  is_premium: boolean;
  score: number;
  reasons: string[];
  match_percentage: number;
  emoji?: string;
}

interface UserProfile {
  bmi: number;
  bmi_category: string;
  weight_goal: string;
  weight_to_lose: number;
  weight_to_gain: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectDiet?: (dietId: string) => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  weight_loss: 'trending-down',
  muscle_building: 'barbell',
  balanced: 'leaf',
  vegetarian: 'leaf',
  special: 'star',
};

const CATEGORY_COLORS: Record<string, string[]> = {
  weight_loss: ['#ef4444', '#dc2626'],
  muscle_building: ['#3b82f6', '#2563eb'],
  balanced: ['#22c55e', '#16a34a'],
  vegetarian: ['#10b981', '#059669'],
  special: ['#8b5cf6', '#7c3aed'],
};

const DIFFICULTY_TEXT: Record<string, { tr: string; en: string; color: string }> = {
  easy: { tr: 'Kolay', en: 'Easy', color: '#22c55e' },
  medium: { tr: 'Orta', en: 'Medium', color: '#f59e0b' },
  hard: { tr: 'Zor', en: 'Hard', color: '#ef4444' },
};

export default function DietRecommendationModal({ visible, onClose, onSelectDiet }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<DietRecommendation[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [topPick, setTopPick] = useState<DietRecommendation | null>(null);
  
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  useEffect(() => {
    if (visible) {
      loadRecommendations();
    }
  }, [visible]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      
      // Kullanıcı bilgilerinden öneri oluştur
      const weight = user?.weight || 70;
      const height = user?.height || 170;
      const targetWeight = user?.target_weight || weight;
      const goal = user?.goal || 'maintain';
      
      // BMI hesapla
      const heightM = height / 100;
      const bmi = weight / (heightM * heightM);
      const weightDiff = weight - targetWeight;
      
      // Hedef belirleme
      let userGoal = 'maintain';
      if (weightDiff > 5) {
        userGoal = 'lose_weight';
      } else if (weightDiff < -5) {
        userGoal = 'gain_weight';
      } else if (goal === 'build_muscle' || goal === 'muscle') {
        userGoal = 'build_muscle';
      }
      
      // Profil bilgisi
      setUserProfile({
        bmi: Math.round(bmi * 10) / 10,
        bmi_category: bmi >= 30 ? 'obez' : bmi >= 25 ? 'fazla kilolu' : bmi >= 18.5 ? 'normal' : 'zayıf',
        weight_goal: userGoal,
        weight_to_lose: weightDiff > 0 ? weightDiff : 0,
        weight_to_gain: weightDiff < 0 ? Math.abs(weightDiff) : 0,
      });
      
      // Frontend diyetlerini skorla
      const scored = allDiets.map(diet => {
        let score = 0;
        const reasons: string[] = [];
        
        // Hedef uyumu - suitableFor alanına göre
        const suitableGoals = getSuitableGoals(diet);
        if (suitableGoals.includes(userGoal)) {
          score += 50;
          if (userGoal === 'lose_weight') {
            reasons.push(lang === 'en' ? 'Matches your weight loss goal' : 'Kilo verme hedefinize uygun');
          } else if (userGoal === 'build_muscle') {
            reasons.push(lang === 'en' ? 'Matches your muscle building goal' : 'Kas yapma hedefinize uygun');
          }
        }
        
        // BMI uyumu
        if (bmi >= 25 && (diet.id.includes('keto') || diet.id.includes('low-carb') || diet.id.includes('intermittent'))) {
          score += 30;
          reasons.push(lang === 'en' ? 'Recommended for your weight' : 'Kilonuz için önerilen');
        } else if (bmi < 25) {
          score += 20;
        }
        
        // Zorluk seviyesi
        if (diet.difficulty === 'easy') {
          score += 15;
          reasons.push(lang === 'en' ? 'Easy to start' : 'Başlaması kolay');
        } else if (diet.difficulty === 'medium') {
          score += 10;
        }
        
        // Premium olmayan diyetlere bonus
        if (!diet.isPremium) {
          score += 10;
          reasons.push(lang === 'en' ? 'Free access' : 'Ücretsiz erişim');
        }
        
        return {
          diet_id: diet.id,
          name: diet.name[lang],
          description: diet.description[lang].substring(0, 100) + '...',
          duration_days: diet.duration,
          category: diet.category || 'weight_loss',
          difficulty: diet.difficulty,
          macros: diet.macros,
          is_premium: diet.isPremium,
          score,
          reasons: reasons.slice(0, 2),
          match_percentage: Math.min(100, score),
          emoji: diet.emoji,
        };
      });
      
      // Skora göre sırala
      scored.sort((a, b) => b.score - a.score);
      
      const topDiets = scored.slice(0, 5);
      setRecommendations(topDiets);
      setTopPick(topDiets[0] || null);
      
    } catch (error) {
      console.error('Error loading diet recommendations:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Diyetin uygun olduğu hedefleri belirle
  const getSuitableGoals = (diet: Diet): string[] => {
    const goals: string[] = [];
    const name = diet.name.en.toLowerCase();
    const desc = diet.description.en.toLowerCase();
    
    if (name.includes('keto') || name.includes('low carb') || name.includes('fasting') || desc.includes('weight loss')) {
      goals.push('lose_weight');
    }
    if (name.includes('protein') || name.includes('muscle') || desc.includes('muscle')) {
      goals.push('build_muscle');
    }
    if (name.includes('mediterranean') || name.includes('balanced') || name.includes('mind')) {
      goals.push('maintain');
    }
    if (name.includes('bulk') || desc.includes('gain weight')) {
      goals.push('gain_weight');
    }
    
    // Default olarak tüm diyetler kilo verme ve korumaya uygun
    if (goals.length === 0) {
      goals.push('lose_weight', 'maintain');
    }
    
    return goals;
  };

  const handleSelectDiet = async (dietId: string) => {
    // Seçilen diyeti kaydet
    await AsyncStorage.setItem('selected_diet_id', dietId);
    await AsyncStorage.setItem('diet_recommendation_shown', 'true');
    
    onSelectDiet?.(dietId);
    onClose();
    
    // Diyet detay sayfasına yönlendir
    router.push({
      pathname: '/details/premium-diet-detail',
      params: { id: dietId }
    });
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('diet_recommendation_shown', 'true');
    onClose();
  };

  const getGoalText = () => {
    if (!userProfile) return '';
    
    if (userProfile.weight_to_lose > 0) {
      return lang === 'en' 
        ? `Goal: Lose ${userProfile.weight_to_lose} kg`
        : `Hedef: ${userProfile.weight_to_lose} kg vermek`;
    }
    if (userProfile.weight_to_gain > 0) {
      return lang === 'en'
        ? `Goal: Gain ${userProfile.weight_to_gain} kg`
        : `Hedef: ${userProfile.weight_to_gain} kg almak`;
    }
    return lang === 'en' ? 'Goal: Maintain weight' : 'Hedef: Kiloyu korumak';
  };

  const DietCard = ({ diet, isTopPick = false }: { diet: DietRecommendation; isTopPick?: boolean }) => {
    const colors = CATEGORY_COLORS[diet.category] || ['#667eea', '#764ba2'];
    const icon = CATEGORY_ICONS[diet.category] || 'nutrition';
    const difficulty = DIFFICULTY_TEXT[diet.difficulty] || DIFFICULTY_TEXT.medium;
    
    return (
      <TouchableOpacity 
        style={[styles.dietCard, isTopPick && styles.dietCardTopPick]}
        onPress={() => handleSelectDiet(diet.diet_id)}
        activeOpacity={0.8}
      >
        {isTopPick && (
          <View style={styles.topPickBadge}>
            <Ionicons name="star" size={12} color="#FFF" />
            <Text style={styles.topPickText}>
              {lang === 'en' ? 'Best Match' : 'En Uygun'}
            </Text>
          </View>
        )}
        
        <View style={styles.dietCardHeader}>
          <LinearGradient
            colors={colors as [string, string]}
            style={styles.dietIconBox}
          >
            <Ionicons name={icon as any} size={20} color="#FFF" />
          </LinearGradient>
          
          <View style={styles.dietCardInfo}>
            <Text style={styles.dietName}>{diet.name}</Text>
            <View style={styles.dietMeta}>
              <Text style={styles.dietDuration}>{diet.duration_days} {lang === 'en' ? 'days' : 'gün'}</Text>
              <View style={styles.metaDivider} />
              <Text style={[styles.dietDifficulty, { color: difficulty.color }]}>
                {lang === 'en' ? difficulty.en : difficulty.tr}
              </Text>
              {diet.is_premium && (
                <>
                  <View style={styles.metaDivider} />
                  <Ionicons name="diamond" size={12} color="#f59e0b" />
                </>
              )}
            </View>
          </View>
          
          <View style={styles.matchBox}>
            <Text style={styles.matchPercent}>{diet.match_percentage}%</Text>
            <Text style={styles.matchLabel}>{lang === 'en' ? 'match' : 'uyum'}</Text>
          </View>
        </View>
        
        <Text style={styles.dietDescription} numberOfLines={2}>{diet.description}</Text>
        
        {diet.reasons.length > 0 && (
          <View style={styles.reasonsRow}>
            {diet.reasons.map((reason, idx) => (
              <View key={idx} style={styles.reasonChip}>
                <Ionicons name="checkmark-circle" size={12} color="#22c55e" />
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.macrosRow}>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: '#3b82f6' }]}>{diet.macros.protein}%</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: '#f59e0b' }]}>{diet.macros.carbs}%</Text>
            <Text style={styles.macroLabel}>{lang === 'en' ? 'Carbs' : 'Karb'}</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: '#ef4444' }]}>{diet.macros.fat}%</Text>
            <Text style={styles.macroLabel}>{lang === 'en' ? 'Fat' : 'Yağ'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleBox}>
            <Ionicons name="nutrition" size={24} color={Colors.primary} />
            <Text style={styles.headerTitle}>
              {lang === 'en' ? 'Recommended For You' : 'Size Özel Öneriler'}
            </Text>
          </View>
          <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
            <Text style={styles.skipText}>{lang === 'en' ? 'Skip' : 'Atla'}</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>
              {lang === 'en' ? 'Checking your profile...' : 'Profiliniz kontrol ediliyor...'}
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* User Profile Summary */}
            {userProfile && (
              <View style={styles.profileSummary}>
                <View style={styles.profileRow}>
                  <View style={styles.profileItem}>
                    <Text style={styles.profileValue}>{userProfile.bmi}</Text>
                    <Text style={styles.profileLabel}>BMI</Text>
                  </View>
                  <View style={styles.profileDivider} />
                  <View style={styles.profileItem}>
                    <Text style={styles.profileValue}>{userProfile.bmi_category}</Text>
                    <Text style={styles.profileLabel}>{lang === 'en' ? 'Category' : 'Kategori'}</Text>
                  </View>
                </View>
                <Text style={styles.goalText}>{getGoalText()}</Text>
              </View>
            )}
            
            {/* Top Pick */}
            {topPick && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {lang === 'en' ? 'Our Top Recommendation' : 'En İyi Önerimiz'}
                </Text>
                <DietCard diet={topPick} isTopPick />
              </View>
            )}
            
            {/* Other Recommendations */}
            {recommendations.length > 1 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {lang === 'en' ? 'Other Options' : 'Diğer Seçenekler'}
                </Text>
                {recommendations.slice(1).map(diet => (
                  <DietCard key={diet.diet_id} diet={diet} />
                ))}
              </View>
            )}
            
            {/* Empty State */}
            {recommendations.length === 0 && !loading && (
              <View style={styles.emptyState}>
                <Ionicons name="nutrition-outline" size={48} color="#ddd" />
                <Text style={styles.emptyText}>
                  {lang === 'en' ? 'No recommendations available' : 'Öneri bulunamadı'}
                </Text>
              </View>
            )}
            
            <View style={{ height: 40 }} />
          </ScrollView>
        )}
        
        {/* Bottom CTA */}
        {!loading && recommendations.length > 0 && (
          <View style={styles.bottomBox}>
            <TouchableOpacity 
              style={styles.browseBtn}
              onPress={handleSkip}
            >
              <Text style={styles.browseBtnText}>
                {lang === 'en' ? 'Browse All Diets' : 'Tüm Diyetlere Göz At'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitleBox: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.darkText },
  skipBtn: { padding: 8 },
  skipText: { fontSize: 15, color: Colors.primary, fontWeight: '500' },
  
  // Loading
  loadingBox: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  loadingText: { fontSize: 15, color: Colors.lightText },
  
  // Content
  content: { flex: 1, paddingHorizontal: 16 },
  
  // Profile Summary
  profileSummary: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  profileRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  profileItem: { alignItems: 'center', paddingHorizontal: 24 },
  profileValue: { fontSize: 24, fontWeight: '700', color: Colors.primary },
  profileLabel: { fontSize: 12, color: Colors.lightText, marginTop: 2 },
  profileDivider: { width: 1, height: 30, backgroundColor: '#E8E8E8' },
  goalText: { fontSize: 14, color: Colors.darkText, textAlign: 'center', fontWeight: '500' },
  
  // Section
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.darkText, marginBottom: 12 },
  
  // Diet Card
  dietCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  dietCardTopPick: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  topPickBadge: {
    position: 'absolute',
    top: -1,
    right: 12,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    gap: 4,
  },
  topPickText: { fontSize: 10, fontWeight: '600', color: '#FFF' },
  dietCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  dietIconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  dietCardInfo: { flex: 1, marginLeft: 12 },
  dietName: { fontSize: 16, fontWeight: '600', color: Colors.darkText },
  dietMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6 },
  dietDuration: { fontSize: 12, color: Colors.lightText },
  dietDifficulty: { fontSize: 12, fontWeight: '500' },
  metaDivider: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#DDD' },
  matchBox: { alignItems: 'center' },
  matchPercent: { fontSize: 20, fontWeight: '700', color: Colors.primary },
  matchLabel: { fontSize: 10, color: Colors.lightText },
  dietDescription: { fontSize: 13, color: Colors.lightText, lineHeight: 18, marginBottom: 10 },
  reasonsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  reasonChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f0fdf4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  reasonText: { fontSize: 11, color: '#166534' },
  macrosRow: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  macroItem: { alignItems: 'center' },
  macroValue: { fontSize: 16, fontWeight: '700' },
  macroLabel: { fontSize: 11, color: Colors.lightText, marginTop: 2 },
  
  // Empty
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 15, color: Colors.lightText, marginTop: 12 },
  
  // Bottom
  bottomBox: { padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  browseBtn: { paddingVertical: 14, alignItems: 'center' },
  browseBtnText: { fontSize: 15, color: Colors.primary, fontWeight: '600' },
});
