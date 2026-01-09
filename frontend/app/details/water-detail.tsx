import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, TextInput, Switch, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWeeklyWater, getTodayWater, addWater } from '../../utils/api';
import { Colors } from '../../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useStore } from '../../store/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { LogBox } from 'react-native';
import { clearReminderNotifications, requestNotificationPermission, syncReminderNotifications, sendTestNotification, getScheduledNotifications } from '../../utils/notifications';
import Svg, { Circle } from 'react-native-svg';
import { calculateWaterGoal, UserData } from '../../utils/nutritionCalculator';
import { LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported in Expo Go',
]);

// Get backend URL
const API_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL 
  || process.env.EXPO_PUBLIC_BACKEND_URL 
  || '';

export default function WaterDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, triggerRefresh } = useStore();
  const [weeklyWater, setWeeklyWater] = useState<any[]>([]);
  const [todayWater, setTodayWater] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Reminder states
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTimes, setReminderTimes] = useState<string[]>(['09:00', '12:00', '15:00', '18:00', '21:00']);
  const [newReminderTime, setNewReminderTime] = useState('');

  useEffect(() => {
    loadData();
    loadReminderSettings();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      Alert.alert(t('notificationPermissionTitle'), t('notificationPermissionDenied'));
    }
  };

  const loadReminderSettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem('water_reminder_enabled');
      const times = await AsyncStorage.getItem('water_reminder_times');
      
      if (enabled) setReminderEnabled(enabled === 'true');
      if (times) setReminderTimes(JSON.parse(times));
    } catch (error) {
      console.error('Error loading reminder settings:', error);
    }
  };

  const saveReminderSettings = async () => {
    try {
      // Save settings first (fast operation)
      await AsyncStorage.setItem('water_reminder_enabled', reminderEnabled.toString());
      await AsyncStorage.setItem('water_reminder_times', JSON.stringify(reminderTimes));

      const hasPermission = await requestNotificationPermission();

      if (hasPermission) {
        // Schedule notifications with timeout to prevent hanging
        const syncPromise = syncReminderNotifications({
          type: 'water',
          enabled: reminderEnabled,
          times: reminderTimes,
          content: {
            title: '💧 Su İçme Zamanı!',
            body: 'Sağlığınız için su içmeyi unutmayın.',
            sound: true,
          },
        });

        // Timeout after 10 seconds
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 10000)
        );

        try {
          await Promise.race([syncPromise, timeoutPromise]);
          
          // Show scheduled notifications count for debugging
          const scheduled = await getScheduledNotifications();
          const waterNotifications = scheduled.filter(n => n.content?.title?.includes('Su'));
          
          Alert.alert(
            t('success'), 
            reminderEnabled 
              ? `${t('reminderSaved')} ${waterNotifications.length} ${t('notifications')}` 
              : t('remindersTurnedOff')
          );
        } catch (timeoutError) {
          // Still show success - settings are saved
          Alert.alert(
            t('success'), 
            reminderEnabled 
              ? t('settingsSavedBackground')
              : t('remindersTurnedOff')
          );
        }
      } else {
        await clearReminderNotifications('water');
        Alert.alert(t('notificationPermissionTitle'), t('notificationPermissionDenied'));
      }

      setShowReminderModal(false);
    } catch (error) {
      console.error('Error saving reminder settings:', error);
      Alert.alert(t('settingsSaved'));
      setShowReminderModal(false);
    }
  };

  const handleTestNotification = async () => {
    const success = await sendTestNotification(
      `💧 ${t('waterReminder')}`,
      t('drinkWaterBody')
    );
    if (success) {
      Alert.alert(t('success'), t('reminderSaved'));
    }
  };

  const addReminderTime = () => {
    if (newReminderTime && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newReminderTime)) {
      if (!reminderTimes.includes(newReminderTime)) {
        setReminderTimes([...reminderTimes, newReminderTime].sort());
        setNewReminderTime('');
      } else {
        alert(t('timeAlreadyAdded'));
      }
    } else {
      alert(t('enterValidTime'));
    }
  };

  const removeReminderTime = (time: string) => {
    setReminderTimes(reminderTimes.filter(t => t !== time));
  };

  const loadData = async () => {
    try {
      const [water, today] = await Promise.all([
        getWeeklyWater(),
        getTodayWater(),
      ]);
      setWeeklyWater(Array.isArray(water) ? water : []);
      setTodayWater((today as any)?.total_amount || 0);
    } catch (error) {
      console.error('Error loading water data:', error);
      setWeeklyWater([]);
      setTodayWater(0);
    }
  };

  const handleAddWater = async (amount: number) => {
    try {
      setLoading(true);
      await addWater(amount);
      await loadData();
      triggerRefresh();
    } catch (error) {
      console.error('Error adding water:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWater = async (amount: number) => {
    if (todayWater <= 0) return;
    
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('session_token');
      
      const response = await fetch(`${API_BASE_URL}/api/water/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove water');
      }
      
      await loadData();
      triggerRefresh();
    } catch (error) {
      console.error('Error removing water:', error);
    } finally {
      setLoading(false);
    }
  };

  const avgWater =
    weeklyWater.length > 0
      ? weeklyWater.reduce((sum, item) => sum + item.amount, 0) / weeklyWater.length / 1000
      : 0;

  // Dinamik su hedefi hesaplama
  const goal = useMemo(() => {
    if (user?.water_goal && user.water_goal > 0) {
      return user.water_goal;
    }
    
    if (user?.weight && user?.gender && user?.activity_level) {
      const activityMap: Record<string, UserData['activityLevel']> = {
        sedentary: 'sedentary',
        light: 'light',
        moderate: 'moderate',
        active: 'very_active',
        veryActive: 'extreme',
      };
      
      const userData: Partial<UserData> = {
        weight: user.weight,
        gender: user.gender as 'male' | 'female',
        activityLevel: activityMap[user.activity_level] || 'moderate',
      };
      
      return calculateWaterGoal(userData as UserData);
    }
    
    return 2500;
  }, [user?.water_goal, user?.weight, user?.gender, user?.activity_level]);
  
  const glassCount = Math.floor(todayWater / 250);
  
  // Circular progress calculation
  const radius = 75;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((todayWater / goal) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Su Takibi</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowReminderModal(true)}
        >
          <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Today's Goal - SVG Circular Progress */}
        <View style={styles.goalSection}>
          <Text style={styles.goalTitle}>Bugünkü Hedefiniz</Text>
          <View style={styles.circularProgressWrapper}>
            <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
              {/* Background Circle */}
              <Circle
                cx={radius + strokeWidth / 2}
                cy={radius + strokeWidth / 2}
                r={radius}
                stroke="#E0E0E0"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress Circle */}
              <Circle
                cx={radius + strokeWidth / 2}
                cy={radius + strokeWidth / 2}
                r={radius}
                stroke={Colors.teal}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
              />
            </Svg>
            <View style={styles.circularInner}>
              <Ionicons name="water" size={32} color={Colors.teal} />
              <Text style={styles.circularText}>Bugün</Text>
              <Text style={styles.circularValue}>{(todayWater / 1000).toFixed(1)}L</Text>
              <Text style={styles.circularSubtext}>/ {(goal / 1000).toFixed(1)}L</Text>
            </View>
          </View>
        </View>

        {/* Glass Count - Sınırsız */}
        <View style={styles.glassSection}>
          <View style={styles.glassGrid}>
            {/* Damla sayısı = içilen bardak sayısı */}
            {[...Array(Math.min(glassCount, 12))].map((_, index) => (
              <View key={index} style={styles.glassItem}>
                <Ionicons
                  name="water"
                  size={28}
                  color={Colors.teal}
                />
              </View>
            ))}
            {glassCount > 12 && (
              <View style={styles.moreGlasses}>
                <Text style={styles.moreGlassesText}>+{glassCount - 12}</Text>
              </View>
            )}
          </View>
          <Text style={styles.glassLabel}>
            {glassCount} Bardak ({(todayWater / 1000).toFixed(1)}L)
          </Text>
        </View>

        {/* Quick Add/Remove Buttons */}
        <View style={styles.quickAddSection}>
          <TouchableOpacity
            style={[styles.removeButton, (loading || todayWater <= 0) && styles.buttonDisabled]}
            onPress={() => handleRemoveWater(250)}
            disabled={loading || todayWater <= 0}
          >
            <Ionicons name="remove" size={20} color={Colors.white} />
            <Text style={styles.quickAddText}>250ml</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAddButton, loading && styles.buttonDisabled]}
            onPress={() => handleAddWater(250)}
            disabled={loading}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.quickAddText}>250ml</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAddButton, loading && styles.buttonDisabled]}
            onPress={() => handleAddWater(500)}
            disabled={loading}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.quickAddText}>500ml</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAddButton, loading && styles.buttonDisabled]}
            onPress={() => handleAddWater(1000)}
            disabled={loading}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.quickAddText}>1L</Text>
          </TouchableOpacity>
        </View>

        {/* Weekly Water Graph */}
        {weeklyWater.length > 0 && (
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Haftalık Su Tüketimi</Text>
            <LineChart
              data={weeklyWater.map(item => ({
                value: item.amount / 1000,
                label: new Date(item.date).toLocaleDateString('tr-TR', { weekday: 'short' }).slice(0, 2),
              }))}
              width={screenWidth - 64}
              height={180}
              spacing={Math.max(30, (screenWidth - 100) / weeklyWater.length)}
              initialSpacing={10}
              color={Colors.teal}
              thickness={3}
              startFillColor={Colors.teal}
              startOpacity={0.3}
              endFillColor={Colors.teal}
              endOpacity={0.05}
              areaChart
              curved
              hideRules
              yAxisColor="#E0E0E0"
              xAxisColor="#E0E0E0"
              hideDataPoints={false}
              dataPointsColor={Colors.teal}
              dataPointsRadius={5}
              yAxisTextStyle={{ color: Colors.lightText, fontSize: 10 }}
              xAxisLabelTextStyle={{ color: Colors.lightText, fontSize: 10 }}
              showVerticalLines={false}
              noOfSections={4}
              pointerConfig={{
                pointerStripHeight: 160,
                pointerStripColor: Colors.teal + '40',
                pointerStripWidth: 2,
                pointerColor: Colors.teal,
                radius: 6,
                pointerLabelWidth: 100,
                pointerLabelHeight: 40,
                activatePointersOnLongPress: true,
                autoAdjustPointerLabelPosition: true,
                pointerLabelComponent: (items: any) => {
                  return (
                    <View style={styles.pointerLabel}>
                      <Text style={styles.pointerText}>{items[0].value.toFixed(1)}L</Text>
                    </View>
                  );
                },
              }}
            />
          </View>
        )}

        {/* Weekly Average */}
        <View style={styles.avgSection}>
          <Text style={styles.avgLabel}>Haftalık Ortalama</Text>
          <Text style={styles.circularValue}>{avgWater.toFixed(1)}L</Text>
        </View>
      </ScrollView>

      {/* Reminder Modal */}
      <Modal visible={showReminderModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Su İçme Hatırlatıcısı</Text>
              <TouchableOpacity onPress={() => setShowReminderModal(false)}>
                <Ionicons name="close" size={28} color={Colors.darkText} />
              </TouchableOpacity>
            </View>

            {/* Enable/Disable Switch */}
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Hatırlatıcıyı Aç</Text>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{ false: '#E0E0E0', true: Colors.teal }}
                thumbColor={Colors.white}
              />
            </View>

            {/* Reminder Times */}
            {reminderEnabled && (
              <View style={styles.timesSection}>
                <Text style={styles.sectionLabel}>Hatırlatma Saatleri</Text>
                
                <View style={styles.timesList}>
                  {reminderTimes.map((time) => (
                    <View key={time} style={styles.timeItem}>
                      <Text style={styles.timeText}>{time}</Text>
                      <TouchableOpacity onPress={() => removeReminderTime(time)}>
                        <Ionicons name="close-circle" size={24} color={Colors.error} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* Add New Time */}
                <View style={styles.addTimeRow}>
                  <TextInput
                    style={styles.timeInput}
                    placeholder="HH:MM (örn: 14:30)"
                    value={newReminderTime}
                    onChangeText={setNewReminderTime}
                    keyboardType="numbers-and-punctuation"
                  />
                  <TouchableOpacity style={styles.addTimeButton} onPress={addReminderTime}>
                    <Ionicons name="add" size={24} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveReminderSettings}>
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>

            {/* Test Notification Button */}
            <TouchableOpacity style={styles.testButton} onPress={handleTestNotification}>
              <Ionicons name="notifications" size={20} color={Colors.primary} />
              <Text style={styles.testButtonText}>Test Bildirimi Gönder</Text>
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  goalSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 20,
  },
  circularProgressWrapper: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circularInner: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularText: {
    fontSize: 14,
    color: Colors.lightText,
  },
  circularValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginVertical: 4,
  },
  circularSubtext: {
    fontSize: 12,
    color: Colors.lightText,
  },
  glassSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  glassGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    maxWidth: '90%',
  },
  glassItem: {
    alignItems: 'center',
  },
  moreGlasses: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreGlassesText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  glassLabel: {
    fontSize: 14,
    color: Colors.darkText,
    fontWeight: '600',
    marginTop: 8,
  },
  quickAddSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  quickAddButton: {
    flex: 1,
    minWidth: 70,
    maxWidth: 90,
    backgroundColor: Colors.teal,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  removeButton: {
    flex: 1,
    minWidth: 70,
    maxWidth: 90,
    backgroundColor: Colors.error,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  quickAddText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  avgSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avgLabel: {
    fontSize: 16,
    color: Colors.darkText,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  timesSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 12,
  },
  timesList: {
    gap: 8,
    marginBottom: 16,
  },
  timeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  addTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  addTimeButton: {
    backgroundColor: Colors.teal,
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 8,
  },
  testButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
