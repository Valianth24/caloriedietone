import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
  Modal,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/Colors';
import { updateProfile, updateGoals, getGamificationStatus } from '../../utils/api';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import i18n, { languageList, changeLanguage } from '../../utils/i18n';
import ThemeSelector from '../../components/ThemeSelector';
import Constants from 'expo-constants';

// Privacy Policy & Terms URLs
const PRIVACY_POLICY_URL = 'https://sites.google.com/view/calorie-diet-tracker/ana-sayfa';
const TERMS_OF_SERVICE_URL = 'https://sites.google.com/view/calorie-diet-tracker/ana-sayfa';

const { width } = Dimensions.get('window');

const API_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL 
  || process.env.EXPO_PUBLIC_BACKEND_URL 
  || 'https://caloriediet-backend.onrender.com';

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

export default function ModernProfileScreen() {
  const { t, i18n: i18nInstance } = useTranslation();
  const lang = i18nInstance.language === 'tr' ? 'tr' : 'en';
  const { user, logout } = useAuth();
  const { setUser } = useStore();
  const router = useRouter();
  
  const [editing, setEditing] = useState(false);
  const [gamificationData, setGamificationData] = useState<any>(null);
  const [formData, setFormData] = useState({
    height: user?.height?.toString() || '',
    weight: user?.weight?.toString() || '',
    age: user?.age?.toString() || '',
    gender: user?.gender || 'male',
    activity_level: user?.activity_level || 'moderate',
    daily_calorie_goal: user?.daily_calorie_goal?.toString() || '',
    water_goal: user?.water_goal?.toString() || '',
    step_goal: user?.step_goal?.toString() || '',
  });

  useEffect(() => {
    loadGamificationData();
  }, []);

  const loadGamificationData = async () => {
    try {
      const data = await getGamificationStatus();
      setGamificationData(data);
    } catch (error) {
      console.log('Gamification data not available');
    }
  };

  const handleSave = async () => {
    try {
      const height = parseFloat(formData.height);
      const weight = parseFloat(formData.weight);
      const age = parseInt(formData.age);
      
      if (isNaN(height) || height < 100 || height > 250) {
        Alert.alert(t('error'), lang === 'tr' ? 'Geçerli bir boy girin' : 'Please enter a valid height');
        return;
      }
      if (isNaN(weight) || weight < 30 || weight > 300) {
        Alert.alert(t('error'), lang === 'tr' ? 'Geçerli bir kilo girin' : 'Please enter a valid weight');
        return;
      }
      if (isNaN(age) || age < 10 || age > 120) {
        Alert.alert(t('error'), lang === 'tr' ? 'Geçerli bir yaş girin' : 'Please enter a valid age');
        return;
      }
      
      const calorieGoal = parseInt(formData.daily_calorie_goal) || 2000;
      if (calorieGoal < 1600) {
        Alert.alert(
          lang === 'tr' ? 'Uyarı' : 'Warning',
          lang === 'tr' 
            ? 'Sağlık açısından günlük kalori hedefi 1600\'den düşük olmamalıdır.' 
            : 'Daily calorie goal should not be below 1600 for health reasons.'
        );
      }
      
      const profileData = {
        height,
        weight,
        age,
        gender: formData.gender,
        activity_level: formData.activity_level,
      };

      const goalsData = {
        daily_calorie_goal: Math.max(calorieGoal, 1600),
        water_goal: parseInt(formData.water_goal) || 2500,
        step_goal: parseInt(formData.step_goal) || 10000,
      };

      const [updatedProfile, updatedGoals] = await Promise.all([
        updateProfile(profileData),
        updateGoals(goalsData),
      ]);
      
      if (updatedGoals) {
        setUser(updatedGoals as any);
      }
      setEditing(false);
      Alert.alert(
        lang === 'tr' ? 'Başarılı' : 'Success', 
        lang === 'tr' ? 'Profil güncellendi' : 'Profile updated'
      );
    } catch (error: any) {
      console.error('Error updating profile:', error);
      Alert.alert(
        lang === 'tr' ? 'Hata' : 'Error', 
        lang === 'tr' ? 'Profil güncellenemedi' : 'Profile update failed'
      );
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      lang === 'tr' ? 'Çıkış Yap' : 'Logout',
      lang === 'tr' 
        ? 'Çıkış yapmak istediğinizden emin misiniz?\n\n⚠️ 35 gün içinde tekrar giriş yapmazsanız tüm verileriniz silinecektir.'
        : 'Are you sure you want to logout?\n\n⚠️ Your data will be deleted if you don\'t login within 35 days.',
      [
        { text: lang === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
        { 
          text: lang === 'tr' ? 'Çıkış Yap' : 'Logout', 
          style: 'destructive', 
          onPress: logout
        },
      ]
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      lang === 'tr' ? 'Hesabı Sil' : 'Delete Account',
      lang === 'tr' 
        ? 'Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz?' 
        : 'Are you sure you want to permanently delete your account?',
      [
        { text: lang === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
        { 
          text: lang === 'tr' ? 'Sil' : 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('session_token');
              
              const response = await fetch(`${API_BASE_URL}/api/auth/account`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              
              if (response.ok) {
                await AsyncStorage.multiRemove(['session_token', 'app_theme', 'is_premium', 'user_data', 'first_launch']);
                Alert.alert(
                  lang === 'tr' ? 'Başarılı' : 'Success',
                  lang === 'tr' ? 'Hesap silindi' : 'Account deleted',
                  [{ text: 'OK', onPress: logout }]
                );
              } else {
                throw new Error('Delete failed');
              }
            } catch (error) {
              Alert.alert(
                lang === 'tr' ? 'Hata' : 'Error', 
                lang === 'tr' ? 'Hesap silinemedi' : 'Account deletion failed'
              );
            }
          }
        },
      ]
    );
  };

  const handleLanguageChange = async (langCode: string) => {
    try {
      await changeLanguage(langCode);
      Alert.alert(
        lang === 'tr' ? 'Başarılı' : 'Success', 
        lang === 'tr' ? 'Dil değiştirildi' : 'Language changed'
      );
    } catch (error) {
      Alert.alert(
        lang === 'tr' ? 'Hata' : 'Error', 
        lang === 'tr' ? 'Dil değiştirilemedi' : 'Language change failed'
      );
    }
  };

  const leagueColors = gamificationData 
    ? LEAGUE_COLORS[gamificationData.league] || LEAGUE_COLORS.bronze 
    : LEAGUE_COLORS.bronze;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header with Gamification */}
        <LinearGradient
          colors={leagueColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}
        >
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            {user?.picture ? (
              <Image source={{ uri: user.picture }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="person" size={48} color="#FFF" />
              </View>
            )}
            {gamificationData && (
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{gamificationData.level}</Text>
              </View>
            )}
          </View>

          {/* User Info */}
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>

          {/* League Badge */}
          {gamificationData && (
            <View style={styles.leagueBadge}>
              <Text style={styles.leagueEmoji}>
                {LEAGUE_EMOJIS[gamificationData.league]}
              </Text>
              <Text style={styles.leagueName}>
                {lang === 'tr' 
                  ? gamificationData.league_info.name === 'Bronze' ? 'Bronz'
                  : gamificationData.league_info.name === 'Silver' ? 'Gümüş'
                  : gamificationData.league_info.name === 'Gold' ? 'Altın'
                  : gamificationData.league_info.name === 'Platinum' ? 'Platin'
                  : gamificationData.league_info.name === 'Diamond' ? 'Elmas'
                  : 'Efsane'
                  : gamificationData.league_info.name}
              </Text>
            </View>
          )}

          {/* Stats Row */}
          {gamificationData && (
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="flame" size={20} color="#FFF" />
                <Text style={styles.statValue}>{gamificationData.daily_streak}</Text>
                <Text style={styles.statLabel}>
                  {lang === 'tr' ? 'Seri' : 'Streak'}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={20} color="#FFF" />
                <Text style={styles.statValue}>{gamificationData.total_points}</Text>
                <Text style={styles.statLabel}>
                  {lang === 'tr' ? 'Puan' : 'Points'}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="ribbon" size={20} color="#FFF" />
                <Text style={styles.statValue}>{gamificationData.achievements?.length || 0}</Text>
                <Text style={styles.statLabel}>
                  {lang === 'tr' ? 'Rozet' : 'Badges'}
                </Text>
              </View>
            </View>
          )}
        </LinearGradient>

        {/* Quick Stats Cards */}
        <View style={styles.quickStatsContainer}>
          <TouchableOpacity 
            style={styles.quickStatCard}
            onPress={() => router.push('/(tabs)/achievements')}
          >
            <Ionicons name="trophy" size={28} color={Colors.premium} />
            <Text style={styles.quickStatValue}>
              {lang === 'tr' ? 'Başarılarım' : 'Achievements'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickStatCard}
            onPress={() => router.push('/details/active-diet')}
          >
            <Ionicons name="nutrition" size={28} color={Colors.success} />
            <Text style={styles.quickStatValue}>
              {lang === 'tr' ? 'Diyetim' : 'My Diet'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.lightText} />
          </TouchableOpacity>
        </View>

        {/* Profile Info Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {lang === 'tr' ? 'Profil Bilgileri' : 'Profile Information'}
            </Text>
            <TouchableOpacity 
              onPress={() => editing ? handleSave() : setEditing(true)}
              style={styles.editButton}
            >
              <Ionicons 
                name={editing ? 'checkmark-circle' : 'create'} 
                size={24} 
                color={Colors.primary} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            {/* Height & Weight */}
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  {lang === 'tr' ? 'Boy (cm)' : 'Height (cm)'}
                </Text>
                <TextInput
                  style={[styles.textInput, !editing && styles.inputDisabled]}
                  value={formData.height}
                  onChangeText={(text) => setFormData({ ...formData, height: text })}
                  keyboardType="numeric"
                  editable={editing}
                  placeholderTextColor={Colors.lightText}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  {lang === 'tr' ? 'Kilo (kg)' : 'Weight (kg)'}
                </Text>
                <TextInput
                  style={[styles.textInput, !editing && styles.inputDisabled]}
                  value={formData.weight}
                  onChangeText={(text) => setFormData({ ...formData, weight: text })}
                  keyboardType="numeric"
                  editable={editing}
                  placeholderTextColor={Colors.lightText}
                />
              </View>
            </View>

            {/* Age & Gender */}
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  {lang === 'tr' ? 'Yaş' : 'Age'}
                </Text>
                <TextInput
                  style={[styles.textInput, !editing && styles.inputDisabled]}
                  value={formData.age}
                  onChangeText={(text) => setFormData({ ...formData, age: text })}
                  keyboardType="numeric"
                  editable={editing}
                  placeholderTextColor={Colors.lightText}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  {lang === 'tr' ? 'Cinsiyet' : 'Gender'}
                </Text>
                <View style={styles.genderRow}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      formData.gender === 'male' && styles.genderButtonActive,
                    ]}
                    onPress={() => editing && setFormData({ ...formData, gender: 'male' })}
                    disabled={!editing}
                  >
                    <Ionicons 
                      name="male" 
                      size={20} 
                      color={formData.gender === 'male' ? '#FFF' : Colors.primary} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      formData.gender === 'female' && styles.genderButtonActive,
                    ]}
                    onPress={() => editing && setFormData({ ...formData, gender: 'female' })}
                    disabled={!editing}
                  >
                    <Ionicons 
                      name="female" 
                      size={20} 
                      color={formData.gender === 'female' ? '#FFF' : Colors.primary} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Goals */}
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  {lang === 'tr' ? 'Kalori Hedefi' : 'Calorie Goal'}
                </Text>
                <TextInput
                  style={[styles.textInput, !editing && styles.inputDisabled]}
                  value={formData.daily_calorie_goal}
                  onChangeText={(text) => setFormData({ ...formData, daily_calorie_goal: text })}
                  keyboardType="numeric"
                  editable={editing}
                  placeholderTextColor={Colors.lightText}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  {lang === 'tr' ? 'Su Hedefi (ml)' : 'Water Goal (ml)'}
                </Text>
                <TextInput
                  style={[styles.textInput, !editing && styles.inputDisabled]}
                  value={formData.water_goal}
                  onChangeText={(text) => setFormData({ ...formData, water_goal: text })}
                  keyboardType="numeric"
                  editable={editing}
                  placeholderTextColor={Colors.lightText}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {lang === 'tr' ? 'Ayarlar' : 'Settings'}
          </Text>

          {/* Language */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="language" size={24} color={Colors.primary} />
              <Text style={styles.settingText}>
                {lang === 'tr' ? 'Dil' : 'Language'}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>
                {lang === 'tr' ? 'Türkçe' : 'English'}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.lightText} />
            </View>
          </TouchableOpacity>

          {/* Theme - Future feature */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="color-palette" size={24} color={Colors.primary} />
              <Text style={styles.settingText}>
                {lang === 'tr' ? 'Tema' : 'Theme'}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>
                {lang === 'tr' ? 'Açık' : 'Light'}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.lightText} />
            </View>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => {}}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="shield-checkmark" size={24} color={Colors.primary} />
              <Text style={styles.settingText}>
                {lang === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.lightText} />
          </TouchableOpacity>

          {/* About */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle" size={24} color={Colors.primary} />
              <Text style={styles.settingText}>
                {lang === 'tr' ? 'Hakkında' : 'About'}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>v1.0.0</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.lightText} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors.error }]}>
            {lang === 'tr' ? 'Tehlikeli Bölge' : 'Danger Zone'}
          </Text>

          <TouchableOpacity 
            style={[styles.dangerButton, { borderColor: Colors.warning }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color={Colors.warning} />
            <Text style={[styles.dangerButtonText, { color: Colors.warning }]}>
              {lang === 'tr' ? 'Çıkış Yap' : 'Logout'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.dangerButton, { borderColor: Colors.error }]}
            onPress={handleDeleteAccount}
          >
            <Ionicons name="trash-outline" size={24} color={Colors.error} />
            <Text style={[styles.dangerButtonText, { color: Colors.error }]}>
              {lang === 'tr' ? 'Hesabı Sil' : 'Delete Account'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  profileHeader: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  avatarPlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  leagueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  leagueEmoji: {
    fontSize: 20,
  },
  leagueName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickStatsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    marginTop: -24,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
    marginTop: 8,
    marginBottom: 4,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.darkText,
  },
  editButton: {
    padding: 8,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.lightText,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  genderButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.lightText,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
