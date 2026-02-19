import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert, RefreshControl, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import DietRecommendationModal from '../../components/DietRecommendationModal';
import { allDiets, Diet } from '../../content/diets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  isRecipeFreePassActive, 
  getRecipeFreePassRemainingMinutes, 
  getRecipePassAdsWatched, 
  watchAdForRecipeFreePass 
} from '../../utils/adSystem';

export default function DietsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user, setUser } = useStore();
  const [showDietRecommendation, setShowDietRecommendation] = useState(false);
  const [hasActiveDiet, setHasActiveDiet] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Free Pass state'leri
  const [showFreePassModal, setShowFreePassModal] = useState(false);
  const [freePassActive, setFreePassActive] = useState(false);
  const [freePassRemainingMinutes, setFreePassRemainingMinutes] = useState(0);
  const [freePassAdsWatched, setFreePassAdsWatched] = useState(0);
  const [freePassLoading, setFreePassLoading] = useState(false);

  const lang = i18n.language === 'tr' ? 'tr' : 'en';

  // Check guest status
  const isGuest = user?.user_id?.startsWith('guest_') || false;

  useEffect(() => {
    checkActiveDiet();
    checkFreePassStatus();
    
    // Her 1 dakikada free pass süresini güncelle
    const interval = setInterval(() => {
      checkFreePassStatus();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const checkActiveDiet = async () => {
    const data = await AsyncStorage.getItem('active_diet');
    setHasActiveDiet(!!data);
  };

  // Free Pass durumunu kontrol et
  const checkFreePassStatus = async () => {
    const isActive = await isRecipeFreePassActive();
    setFreePassActive(isActive);
    
    if (isActive) {
      const remaining = await getRecipeFreePassRemainingMinutes();
      setFreePassRemainingMinutes(remaining);
    } else {
      const adsWatched = await getRecipePassAdsWatched();
      setFreePassAdsWatched(adsWatched);
    }
  };

  // Free Pass için reklam izle
  const handleWatchFreePassAd = async () => {
    setFreePassLoading(true);
    
    try {
      const result = await watchAdForRecipeFreePass();
      
      if (result.success) {
        setFreePassAdsWatched(result.adsWatched);
        
        if (result.activated) {
          setFreePassActive(true);
          setFreePassRemainingMinutes(result.remainingMinutes);
          setShowFreePassModal(false);
          
          Alert.alert(
            lang === 'tr' ? 'Tebrikler!' : 'Congratulations!',
            lang === 'tr' 
              ? 'Tüm tarifler 1 saat boyunca ücretsiz! İyi keşifler!' 
              : 'All recipes are free for 1 hour! Enjoy exploring!'
          );
        }
      } else {
        Alert.alert(
          lang === 'tr' ? 'Reklam Hatası' : 'Ad Error',
          lang === 'tr' ? 'Reklam yüklenemedi. Tekrar deneyin.' : 'Ad failed to load. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error watching free pass ad:', error);
    } finally {
      setFreePassLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await checkActiveDiet();
    setRefreshing(false);
  };

  const handleDietClick = (diet: Diet) => {
    // All diets are accessible
    router.push({
      pathname: '/details/premium-diet-detail',
      params: { id: diet.id }
    });
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
      case 'easy': return t('easy');
      case 'medium': return t('medium');
      case 'hard': return t('hard');
      default: return difficulty;
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
            <Text style={styles.title}>{t('diets')}</Text>
            <Text style={styles.subtitle}>{t('dietsSubtitle')}</Text>
          </View>
        </View>

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
                  {t('personalizedDiet')}
                </Text>
                <Text style={styles.recommendationSubtitle}>
                  {t('personalizedDietDesc')}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </View>
            
            <View style={styles.recommendationBadges}>
              <View style={styles.recBadge}>
                <Ionicons name="body" size={14} color="#FFF" />
                <Text style={styles.recBadgeText}>{t('bmi')}</Text>
              </View>
              <View style={styles.recBadge}>
                <Ionicons name="trending-down" size={14} color="#FFF" />
                <Text style={styles.recBadgeText}>{t('goalLabel')}</Text>
              </View>
              <View style={styles.recBadge}>
                <Ionicons name="star" size={14} color="#FFF" />
                <Text style={styles.recBadgeText}>{t('bestMatch')}</Text>
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
                {t('activeDiet')}
              </Text>
              <Text style={styles.activeDietSubtitle}>
                {t('tapToContinue')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}

        {/* Diet Programs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={24} color={Colors.warning} />
            <Text style={styles.sectionTitle}>{t('dietPrograms')}</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            {t('preparedByExperts')}
          </Text>
          
          <View style={styles.dietGrid}>
            {allDiets.map((diet) => (
              <TouchableOpacity
                key={diet.id}
                style={styles.dietCard}
                onPress={() => handleDietClick(diet)}
              >
                <View style={styles.dietEmojiContainer}>
                  <Text style={styles.dietEmoji}>{diet.emoji}</Text>
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

      {/* Diet Recommendation Modal */}
      <DietRecommendationModal
        visible={showDietRecommendation}
        onClose={() => setShowDietRecommendation(false)}
        onSelectDiet={(dietId) => {
          console.log('Selected diet:', dietId);
        }}
      />
      
      {/* Free Pass Modal */}
      <Modal
        visible={showFreePassModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFreePassModal(false)}
      >
        <View style={styles.freePassModalOverlay}>
          <View style={styles.freePassModalContent}>
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.freePassCloseButton}
              onPress={() => setShowFreePassModal(false)}
            >
              <Ionicons name="close" size={24} color={Colors.lightText} />
            </TouchableOpacity>
            
            {/* Icon */}
            <View style={styles.freePassIconContainer}>
              <Ionicons name="gift" size={48} color={Colors.primary} />
            </View>
            
            {/* Title */}
            <Text style={styles.freePassTitle}>
              {lang === 'tr' ? '1 Saat Ücretsiz!' : '1 Hour Free!'}
            </Text>
            
            {/* Description */}
            <Text style={styles.freePassDescription}>
              {lang === 'tr' 
                ? '2 kısa reklam izleyerek tüm içeriklere 1 saat boyunca ücretsiz erişin!'
                : 'Watch 2 short ads to unlock all content for 1 hour!'}
            </Text>
            
            {/* Progress */}
            <View style={styles.freePassProgress}>
              <View style={styles.freePassProgressDots}>
                <View style={[
                  styles.freePassDot, 
                  freePassAdsWatched >= 1 && styles.freePassDotActive
                ]}>
                  {freePassAdsWatched >= 1 && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>
                <View style={styles.freePassProgressLine} />
                <View style={[
                  styles.freePassDot, 
                  freePassAdsWatched >= 2 && styles.freePassDotActive
                ]}>
                  {freePassAdsWatched >= 2 && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>
              </View>
              <Text style={styles.freePassProgressText}>
                {freePassAdsWatched}/2 {lang === 'tr' ? 'reklam izlendi' : 'ads watched'}
              </Text>
            </View>
            
            {/* Button */}
            <TouchableOpacity
              style={[styles.freePassButton, freePassLoading && styles.freePassButtonDisabled]}
              onPress={handleWatchFreePassAd}
              disabled={freePassLoading}
            >
              {freePassLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="play-circle" size={24} color="#fff" />
                  <Text style={styles.freePassButtonText}>
                    {lang === 'tr' ? 'Reklam İzle' : 'Watch Ad'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
            
            {/* Skip */}
            <TouchableOpacity
              style={styles.freePassSkipButton}
              onPress={() => setShowFreePassModal(false)}
            >
              <Text style={styles.freePassSkipText}>
                {lang === 'tr' ? 'Şimdilik Geç' : 'Skip for Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
