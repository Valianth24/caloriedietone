import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, AppState, AppStateStatus, Platform, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTodaySteps, syncSteps } from '../../utils/api';
import { Colors } from '../../constants/Colors';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useStore } from '../../store/useStore';
import Svg, { Circle } from 'react-native-svg';
import { Pedometer } from 'expo-sensors';

const screenWidth = Dimensions.get('window').width;

export default function StepsDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useStore();
  const [todaySteps, setTodaySteps] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const subscriptionRef = useRef<any>(null);
  const appStateRef = useRef(AppState.currentState);
  const baseStepsRef = useRef(0); // Track base steps from history

  useEffect(() => {
    loadData();
    initPedometer();

    // Listen for app state changes to refresh when coming back to foreground
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Cleanup subscription on unmount
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to foreground - refresh steps
      console.log('[Steps] App came to foreground, refreshing...');
      await refreshStepsFromPedometer();
    }
    appStateRef.current = nextAppState;
  };

  const loadData = async () => {
    try {
      const steps = await getTodaySteps() as any;
      setTodaySteps(steps?.steps || 0);
    } catch (error) {
      console.error('Error loading steps:', error);
      setTodaySteps(0);
    }
  };

  const initPedometer = async () => {
    try {
      // Request Android ACTIVITY_RECOGNITION permission for Android 10+
      if (Platform.OS === 'android' && Platform.Version >= 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
          {
            title: t('stepPermissionTitle') || 'Adım Sayacı İzni',
            message: t('stepPermissionMessage') || 'Adımlarınızı takip edebilmemiz için fiziksel aktivite iznine ihtiyacımız var.',
            buttonNeutral: t('askLater') || 'Daha Sonra Sor',
            buttonNegative: t('cancel') || 'İptal',
            buttonPositive: t('ok') || 'Tamam',
          }
        );
        
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('[Steps] Android ACTIVITY_RECOGNITION permission denied');
          setIsPedometerAvailable('false');
          return;
        }
        console.log('[Steps] Android ACTIVITY_RECOGNITION permission granted');
      }
      
      // iOS permission request
      if (Platform.OS === 'ios') {
        const { status } = await Pedometer.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('[Steps] iOS motion permission denied');
          setIsPedometerAvailable('false');
          return;
        }
      }
      
      const available = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(available));
      console.log('[Steps] Pedometer available:', available);

      if (available) {
        await refreshStepsFromPedometer();
        startRealtimeTracking();
      }
    } catch (error) {
      console.error('[Steps] Pedometer init error:', error);
      setIsPedometerAvailable('false');
    }
  };

  const refreshStepsFromPedometer = async () => {
    try {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const pastStepCount = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCount && pastStepCount.steps > 0) {
        console.log('[Steps] Got historical steps:', pastStepCount.steps);
        baseStepsRef.current = pastStepCount.steps;
        setTodaySteps(pastStepCount.steps);
        setLastUpdate(new Date());
        await syncSteps(pastStepCount.steps, 'pedometer');
      }
    } catch (error) {
      console.error('[Steps] Error reading historical steps:', error);
    }
  };

  const startRealtimeTracking = () => {
    // Remove existing subscription if any
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
    }

    // Start watching for step updates
    // watchStepCount returns steps since subscription started
    subscriptionRef.current = Pedometer.watchStepCount(result => {
      console.log('[Steps] Real-time step update: +', result.steps);
      // Calculate total: base steps from history + new steps since subscription
      const newTotal = baseStepsRef.current + result.steps;
      setTodaySteps(newTotal);
      setLastUpdate(new Date());
      // Sync to backend periodically (not on every step to avoid spam)
      if (result.steps % 10 === 0) {
        syncSteps(newTotal, 'pedometer').catch(console.error);
      }
    });
    
    console.log('[Steps] Real-time tracking started with base:', baseStepsRef.current);
  };

  const manualRefresh = async () => {
    console.log('[Steps] Manual refresh triggered');
    await refreshStepsFromPedometer();
    Alert.alert(t('success') || 'Başarılı', t('stepsUpdated') || 'Adımlar güncellendi');
  };

  const goal = user?.step_goal || 10000;
  const percentage = goal > 0 ? Math.min((todaySteps / goal) * 100, 100) : 0;
  const caloriesBurned = Math.floor(todaySteps * 0.04);
  const distance = (todaySteps * 0.0008).toFixed(2); // km
  const activeMinutes = Math.floor(todaySteps / 100);

  const radius = 100;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('stepTracking') || 'Adım Takibi'}</Text>
        <TouchableOpacity style={styles.menuButton} onPress={manualRefresh}>
          <Ionicons name="refresh" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Circular Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.goalTitle}>{t('dailyGoal') || 'Günlük Hedef'}: {goal.toLocaleString()} {t('steps') || 'Adım'}</Text>
          <View style={styles.circularProgress}>
            <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
              <Circle
                cx={radius + strokeWidth / 2}
                cy={radius + strokeWidth / 2}
                r={radius}
                stroke="#E0E0E0"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={radius + strokeWidth / 2}
                cy={radius + strokeWidth / 2}
                r={radius}
                stroke={Colors.primary}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
              />
            </Svg>
            <View style={styles.progressText}>
              <Text style={styles.stepCount}>{todaySteps.toLocaleString()}</Text>
              <Text style={styles.stepLabel}>{t('steps') || 'adım'}</Text>
              <Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>
            </View>
          </View>
          {lastUpdate && (
            <Text style={styles.lastUpdateText}>
              {t('lastUpdate') || 'Son güncelleme'}: {lastUpdate.toLocaleTimeString('tr-TR')}
            </Text>
          )}
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={32} color={Colors.error} />
            <Text style={styles.statValue}>{caloriesBurned}</Text>
            <Text style={styles.statLabel}>{t('calorie') || 'Kalori'}</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="location" size={32} color={Colors.primary} />
            <Text style={styles.statValue}>{distance}</Text>
            <Text style={styles.statLabel}>km</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={32} color={Colors.warning} />
            <Text style={styles.statValue}>{activeMinutes}</Text>
            <Text style={styles.statLabel}>{t('minutes') || 'dakika'}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="phone-portrait" size={24} color={Colors.primary} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>{t('pedometer') || 'Pedometer'}</Text>
              <Text style={styles.infoSubtitle}>
                {isPedometerAvailable === 'true' 
                  ? (t('active') || 'Aktif') 
                  : isPedometerAvailable === 'checking' 
                    ? (t('checking') || 'Kontrol ediliyor...') 
                    : (t('notAvailable') || 'Kullanılamıyor')}
              </Text>
            </View>
          </View>
          {isPedometerAvailable === 'true' && (
            <View style={styles.realTimeIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.realTimeText}>{t('realTimeTracking') || 'Gerçek zamanlı takip aktif'}</Text>
            </View>
          )}
          {isPedometerAvailable === 'false' && (
            <Text style={styles.infoNote}>
              {t('pedometerNotSupported') || 'Adım sayıcı telefonunuzda desteklenmiyor. Manuel veri girişi yapabilirsiniz.'}
            </Text>
          )}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 20,
  },
  circularProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    alignItems: 'center',
  },
  stepCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  stepLabel: {
    fontSize: 14,
    color: Colors.lightText,
  },
  percentage: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  infoSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
  },
  infoNote: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 12,
    fontStyle: 'italic',
  },
  lastUpdateText: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 12,
  },
  realTimeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  realTimeText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
});
