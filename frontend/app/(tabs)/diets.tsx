import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import PremiumPaywall from '../../components/PremiumPaywall';
import DietRecommendationModal from '../../components/DietRecommendationModal';
import { activatePremium } from '../../utils/api';
import { allDiets, Diet } from '../../content/diets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function DietsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user, setUser } = useStore();
  const [showPaywall, setShowPaywall] = useState(false);
  const [showDietRecommendation, setShowDietRecommendation] = useState(false);
  const [hasActiveDiet, setHasActiveDiet] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const lang = i18n.language === 'tr' ? 'tr' : 'en';

  // Check premium and guest status
  const isPremium = user?.is_premium || false;
  const isGuest = user?.user_id?.startsWith('guest_') || false;

  useEffect(() => {
    checkActiveDiet();
  }, []);

  const checkActiveDiet = async () => {
    const data = await AsyncStorage.getItem('active_diet');
    setHasActiveDiet(!!data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await checkActiveDiet();
    setRefreshing(false);
  };

  const handleDietClick = (diet: Diet) => {
    if (diet.isPremium && !isPremium) {
      setShowPaywall(true);
    } else {
      router.push({
        pathname: '/details/premium-diet-detail',
        params: { id: diet.id }
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return Colors.success;
      case 'medium': return Colors.warning;
      case 'hard': return Colors.error;
      default: return Colors.primary;
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return lang === 'en' ? 'Easy' : 'Kolay';
      case 'medium': return lang === 'en' ? 'Medium' : 'Orta';
      case 'hard': return lang === 'en' ? 'Hard' : 'Zor';
      default: return difficulty;
    }
  };

  const handleSubscribe = async () => {
    try {
      const updatedUser = await activatePremium() as any;
      
      if (updatedUser && setUser) {
        setUser({ ...user, ...updatedUser, is_premium: true });
      }
      
      Alert.alert(
        '🎉 ' + (lang === 'en' ? 'Success' : 'Başarılı'), 
        lang === 'en' ? 'Premium activated! All features unlocked.' : 'Premium üyeliğiniz aktif edildi! Tüm özelliklere erişebilirsiniz.'
      );
      setShowPaywall(false);
      
    } catch (error: any) {
      console.error('Premium activation error:', error);
      Alert.alert(
        lang === 'en' ? 'Error' : 'Hata', 
        lang === 'en' ? 'Premium activation failed. Please try again.' : 'Premium aktivasyonu başarısız. Lütfen tekrar deneyin.'
      );
    }
  };

  const handleOpenRecommendation = async () => {
    // Önceki gösterim kaydını sil ki her seferinde gösterilsin
    await AsyncStorage.removeItem('diet_recommendation_shown');
    setShowDietRecommendation(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Back Button Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.darkText} />
        </TouchableOpacity>
        {/* Premium button - temporarily hidden
        <TouchableOpacity 
          style={styles.premiumButton}
          onPress={() => setShowPaywall(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="diamond" size={20} color={Colors.white} />
          <Text style={styles.premiumButtonText}>Premium</Text>
        </TouchableOpacity>
        */}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{lang === 'en' ? 'Diets' : 'Diyetler'}</Text>
            <Text style={styles.subtitle}>{lang === 'en' ? 'Nutrition plans just for you' : 'Size özel beslenme planları'}</Text>
          </View>
        </View>

        {/* Premium Badge if user has premium - temporarily hidden
        {isPremium && (
          <View style={styles.premiumBanner}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
            <Text style={styles.premiumBannerText}>
              {lang === 'en' ? 'You are a Premium member! All features unlocked.' : 'Premium üyesiniz! Tüm özelliklere erişebilirsiniz.'}
            </Text>
          </View>
        )}
        */}

        {/* Personalized Diet Recommendation Button */}
        <TouchableOpacity 
          style={styles.recommendationCard}
          onPress={handleOpenRecommendation}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[Colors.primary, '#7c3aed']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.recommendationGradient}
          >
            <View style={styles.recommendationContent}>
              <View style={styles.recommendationIcon}>
                <Ionicons name="sparkles" size={28} color="#FFF" />
              </View>
              <View style={styles.recommendationText}>
                <Text style={styles.recommendationTitle}>
                  {lang === 'en' ? 'Personalized Diet' : 'Size Özel Diyet'}
                </Text>
                <Text style={styles.recommendationSubtitle}>
                  {lang === 'en' 
                    ? 'We recommend the best diet based on your profile' 
                    : 'Profilinize göre en uygun diyeti öneriyoruz'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </View>
            
            <View style={styles.recommendationBadges}>
              <View style={styles.recBadge}>
                <Ionicons name="body" size={14} color="#FFF" />
                <Text style={styles.recBadgeText}>{lang === 'en' ? 'BMI' : 'BMI'}</Text>
              </View>
              <View style={styles.recBadge}>
                <Ionicons name="trending-down" size={14} color="#FFF" />
                <Text style={styles.recBadgeText}>{lang === 'en' ? 'Goal' : 'Hedef'}</Text>
              </View>
              <View style={styles.recBadge}>
                <Ionicons name="star" size={14} color="#FFF" />
                <Text style={styles.recBadgeText}>{lang === 'en' ? 'Best Match' : 'En Uygun'}</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Active Diet Banner */}
        {hasActiveDiet && (
          <TouchableOpacity 
            style={styles.activeDietBanner}
            onPress={() => router.push('/details/active-diet')}
          >
            <Ionicons name="fitness" size={24} color={Colors.white} />
            <View style={styles.activeDietText}>
              <Text style={styles.activeDietTitle}>
                {lang === 'en' ? 'Active Diet' : 'Aktif Diyetiniz'}
              </Text>
              <Text style={styles.activeDietSubtitle}>
                {lang === 'en' ? 'Tap to continue' : 'Devam etmek için dokunun'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}

        {/* Premium Diets Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={24} color={Colors.warning} />
            <Text style={styles.sectionTitle}>{lang === 'en' ? 'Premium Diets' : 'Premium Diyetler'}</Text>
            {!isPremium && (
              <View style={styles.lockBadge}>
                <Ionicons name="lock-closed" size={14} color={Colors.white} />
              </View>
            )}
          </View>
          <Text style={styles.sectionSubtitle}>
            {lang === 'en' ? 'Prepared by expert dietitians' : 'Uzman diyetisyenler tarafından hazırlanmış'}
          </Text>
          
          <View style={styles.dietGrid}>
            {allDiets.map((diet) => (
              <TouchableOpacity
                key={diet.id}
                style={[styles.dietCard, !isPremium && diet.isPremium && styles.dietCardLocked]}
                onPress={() => handleDietClick(diet)}
              >
                <View style={styles.dietEmojiContainer}>
                  <Text style={styles.dietEmoji}>{diet.emoji}</Text>
                </View>
                {!isPremium && diet.isPremium && (
                  <View style={styles.lockOverlay}>
                    <Ionicons name="lock-closed" size={32} color={Colors.white} />
                  </View>
                )}
                <View style={styles.premiumDietBadge}>
                  <Ionicons name="star" size={12} color={Colors.white} />
                  <Text style={styles.premiumDietText}>Premium</Text>
                </View>
                <View style={styles.dietInfo}>
                  <Text style={styles.dietName}>{diet.name[lang]}</Text>
                  <Text style={styles.dietDescription} numberOfLines={2}>
                    {diet.description[lang].substring(0, 80)}...
                  </Text>
                  <View style={styles.dietMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="calendar-outline" size={14} color={Colors.lightText} />
                      <Text style={styles.metaText}>{diet.duration} {lang === 'en' ? 'days' : 'gün'}</Text>
                    </View>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(diet.difficulty) + '20' }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(diet.difficulty) }]}>
                        {getDifficultyText(diet.difficulty)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Premium Paywall */}
      <PremiumPaywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSubscribe={handleSubscribe}
      />

      {/* Diet Recommendation Modal */}
      <DietRecommendationModal
        visible={showDietRecommendation}
        onClose={() => setShowDietRecommendation(false)}
        onSelectDiet={(dietId) => {
          console.log('Selected diet:', dietId);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 12,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightText,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  premiumButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '20',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  premiumBannerText: {
    flex: 1,
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
  },
  
  // Recommendation Card
  recommendationCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recommendationGradient: {
    padding: 20,
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  recommendationText: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  recommendationBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  recBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
  },
  recBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFF',
  },
  
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
    flex: 1,
  },
  lockBadge: {
    backgroundColor: Colors.lightText,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 16,
  },
  dietGrid: {
    gap: 16,
  },
  dietCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dietCardLocked: {
    opacity: 0.7,
  },
  dietEmojiContainer: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dietEmoji: {
    fontSize: 56,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  premiumDietBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.warning,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 2,
  },
  premiumDietText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeDietBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
  },
  activeDietText: {
    flex: 1,
  },
  activeDietTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeDietSubtitle: {
    color: Colors.white,
    fontSize: 13,
    opacity: 0.9,
  },
  dietInfo: {
    padding: 16,
  },
  dietName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 4,
  },
  dietDescription: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 12,
  },
  dietMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.lightText,
  },
});
