import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useStore } from '../../store/useStore';
import { getDietById, Diet, DietDay } from '../../content/diets';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PremiumDietDetailScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useStore();
  const [diet, setDiet] = useState<Diet | null>(null);
  const [showDaysModal, setShowDaysModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'foods' | 'exercises'>('info');

  const lang = i18n.language === 'tr' ? 'tr' : 'en';

  useEffect(() => {
    if (id) {
      const foundDiet = getDietById(id);
      if (foundDiet) {
        setDiet(foundDiet);
        // Varsayılan olarak tüm günleri seç
        setSelectedDays(foundDiet.days.map(d => d.day));
      }
    }
  }, [id]);

  if (!diet) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>{t('loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleStartDiet = () => {
    if (!user?.is_premium) {
      Alert.alert(t('premium'), t('premiumRequired'));
      return;
    }
    setShowDaysModal(true);
  };

  const handleConfirmStart = async () => {
    if (selectedDays.length === 0) {
      Alert.alert(t('warning'), t('selectAtLeastOneDay'));
      return;
    }

    try {
      // Seçilen günleri kaydet
      const activeDiet = {
        dietId: diet.id,
        startDate: new Date().toISOString(),
        selectedDays: selectedDays,
        currentDay: 1,
      };
      await AsyncStorage.setItem('active_diet', JSON.stringify(activeDiet));
      
      setShowDaysModal(false);
      Alert.alert(
        t('success'),
        t('dietStarted'),
        [{ text: t('ok'), onPress: () => router.push('/details/active-diet') }]
      );
    } catch (error) {
      console.error('Error starting diet:', error);
      Alert.alert(t('error'), t('errorOccurredTryAgain'));
    }
  };

  const toggleDaySelection = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort((a, b) => a - b)
    );
  };

  const selectAllDays = () => {
    setSelectedDays(diet.days.map(d => d.day));
  };

  const clearAllDays = () => {
    setSelectedDays([]);
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{diet.name[lang]}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.emoji}>{diet.emoji}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Diet Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={24} color={Colors.primary} />
              <Text style={styles.infoValue}>{diet.duration}</Text>
              <Text style={styles.infoLabel}>{t('days')}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="fitness" size={24} color={getDifficultyColor(diet.difficulty)} />
              <Text style={[styles.infoValue, { color: getDifficultyColor(diet.difficulty) }]}>
                {getDifficultyText(diet.difficulty)}
              </Text>
              <Text style={styles.infoLabel}>{t('difficulty')}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="star" size={24} color={Colors.warning} />
              <Text style={styles.infoValue}>Premium</Text>
              <Text style={styles.infoLabel}>{t('type')}</Text>
            </View>
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'info' && styles.tabButtonActive]}
            onPress={() => setActiveTab('info')}
          >
            <Ionicons name="information-circle" size={20} color={activeTab === 'info' ? Colors.white : Colors.primary} />
            <Text style={[styles.tabText, activeTab === 'info' && styles.tabTextActive]}>
              {t('info')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'foods' && styles.tabButtonActive]}
            onPress={() => setActiveTab('foods')}
          >
            <Ionicons name="nutrition" size={20} color={activeTab === 'foods' ? Colors.white : Colors.primary} />
            <Text style={[styles.tabText, activeTab === 'foods' && styles.tabTextActive]}>
              {t('foods')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'exercises' && styles.tabButtonActive]}
            onPress={() => setActiveTab('exercises')}
          >
            <Ionicons name="barbell" size={20} color={activeTab === 'exercises' ? Colors.white : Colors.primary} />
            <Text style={[styles.tabText, activeTab === 'exercises' && styles.tabTextActive]}>
              {t('exercises')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'info' && (
          <View style={styles.tabContent}>
            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="document-text" size={20} color={Colors.primary} /> {lang === 'tr' ? 'Açıklama' : 'Description'}
              </Text>
              <Text style={styles.sectionText}>{diet.description[lang]}</Text>
            </View>

            {/* Scientific Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="flask" size={20} color={Colors.primary} /> {lang === 'tr' ? 'Bilimsel Bilgi' : 'Scientific Info'}
              </Text>
              <Text style={styles.sectionText}>{diet.scientificInfo[lang]}</Text>
            </View>

            {/* Benefits */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} /> {lang === 'tr' ? 'Faydaları' : 'Benefits'}
              </Text>
              {diet.benefits[lang].map((benefit, index) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="checkmark" size={18} color={Colors.success} />
                  <Text style={styles.listText}>{benefit}</Text>
                </View>
              ))}
            </View>

            {/* Warnings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="warning" size={20} color={Colors.warning} /> {lang === 'tr' ? 'Dikkat Edilmesi Gerekenler' : 'Warnings'}
              </Text>
              {diet.warnings[lang].map((warning, index) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="alert-circle" size={18} color={Colors.warning} />
                  <Text style={styles.listText}>{warning}</Text>
                </View>
              ))}
            </View>

            {/* Expected Results */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="trending-up" size={20} color={Colors.primary} /> {lang === 'tr' ? 'Beklenen Sonuçlar' : 'Expected Results'}
              </Text>
              <Text style={styles.sectionText}>{diet.expectedResults[lang]}</Text>
            </View>
          </View>
        )}

        {activeTab === 'foods' && (
          <View style={styles.tabContent}>
            {/* Allowed Foods */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} /> {lang === 'tr' ? 'Yenebilecek Besinler' : 'Allowed Foods'}
              </Text>
              {diet.allowedFoods[lang].map((food, index) => (
                <View key={index} style={styles.foodItem}>
                  <Text style={styles.foodText}>{food}</Text>
                </View>
              ))}
            </View>

            {/* Forbidden Foods */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="close-circle" size={20} color={Colors.error} /> {lang === 'tr' ? 'Yasak Besinler' : 'Forbidden Foods'}
              </Text>
              {diet.forbiddenFoods[lang].map((food, index) => (
                <View key={index} style={styles.foodItemForbidden}>
                  <Text style={styles.foodTextForbidden}>{food}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'exercises' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="barbell" size={20} color={Colors.primary} /> {lang === 'tr' ? 'Önerilen Egzersizler' : 'Recommended Exercises'}
              </Text>
              {diet.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseCard}>
                  <View style={styles.exerciseHeader}>
                    <Ionicons name="fitness" size={24} color={Colors.primary} />
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                  </View>
                  <View style={styles.exerciseDetails}>
                    <View style={styles.exerciseDetail}>
                      <Ionicons name="time" size={16} color={Colors.lightText} />
                      <Text style={styles.exerciseDetailText}>{exercise.duration}</Text>
                    </View>
                    <View style={styles.exerciseDetail}>
                      <Ionicons name="repeat" size={16} color={Colors.lightText} />
                      <Text style={styles.exerciseDetailText}>{exercise.frequency}</Text>
                    </View>
                  </View>
                  {exercise.note && (
                    <Text style={styles.exerciseNote}>{exercise.note}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Spacer for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Start Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartDiet}>
          <Ionicons name="play" size={24} color={Colors.white} />
          <Text style={styles.startButtonText}>
            {lang === 'tr' ? 'Diyete Başla' : 'Start Diet'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Days Selection Modal */}
      <Modal
        visible={showDaysModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDaysModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {lang === 'tr' ? 'Günleri Seçin' : 'Select Days'}
              </Text>
              <TouchableOpacity onPress={() => setShowDaysModal(false)}>
                <Ionicons name="close" size={28} color={Colors.darkText} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              {lang === 'tr' 
                ? `${diet.duration} günlük programdan uygulamak istediğiniz günleri seçin`
                : `Select which days you want to follow from the ${diet.duration}-day program`
              }
            </Text>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickButton} onPress={selectAllDays}>
                <Text style={styles.quickButtonText}>
                  {lang === 'tr' ? 'Tümünü Seç' : 'Select All'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickButtonOutline} onPress={clearAllDays}>
                <Text style={styles.quickButtonOutlineText}>
                  {lang === 'tr' ? 'Temizle' : 'Clear'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Days Grid */}
            <FlatList
              data={diet.days}
              numColumns={5}
              keyExtractor={(item) => item.day.toString()}
              contentContainerStyle={styles.daysGrid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dayButton,
                    selectedDays.includes(item.day) && styles.dayButtonSelected
                  ]}
                  onPress={() => toggleDaySelection(item.day)}
                >
                  <Text style={[
                    styles.dayButtonText,
                    selectedDays.includes(item.day) && styles.dayButtonTextSelected
                  ]}>
                    {item.day}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.selectedCount}>
              {lang === 'tr' 
                ? `${selectedDays.length} gün seçildi`
                : `${selectedDays.length} days selected`
              }
            </Text>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmStart}>
              <Text style={styles.confirmButtonText}>
                {lang === 'tr' ? 'Diyeti Başlat' : 'Start Diet'}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  emoji: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginTop: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  tabContent: {
    marginBottom: 16,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: Colors.darkText,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: Colors.darkText,
    lineHeight: 20,
  },
  foodItem: {
    backgroundColor: Colors.success + '15',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  foodText: {
    fontSize: 14,
    color: Colors.darkText,
  },
  foodItemForbidden: {
    backgroundColor: Colors.error + '15',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  foodTextForbidden: {
    fontSize: 14,
    color: Colors.darkText,
  },
  exerciseCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    flex: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: 20,
  },
  exerciseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exerciseDetailText: {
    fontSize: 14,
    color: Colors.lightText,
  },
  exerciseNote: {
    fontSize: 13,
    color: Colors.lightText,
    fontStyle: 'italic',
    marginTop: 8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  startButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  quickButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  quickButtonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickButtonOutlineText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  daysGrid: {
    paddingVertical: 8,
  },
  dayButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  dayButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  dayButtonTextSelected: {
    color: Colors.white,
  },
  selectedCount: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.lightText,
    marginVertical: 12,
  },
  confirmButton: {
    backgroundColor: Colors.success,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
