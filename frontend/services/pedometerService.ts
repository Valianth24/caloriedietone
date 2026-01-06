import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid, AppState } from 'react-native';

interface StepData {
  steps: number;
  date: string;
  lastSync: string;
}

class PedometerService {
  private subscription: any = null;
  private stepCount: number = 0;
  private todayDate: string = '';
  private isAvailable: boolean = false;
  private isInitialized: boolean = false;
  private syncInterval: any = null;
  private listeners: Set<(steps: number) => void> = new Set();
  private baseSteps: number = 0;
  private realtimeSteps: number = 0; // Steps from watchStepCount since subscription
  private appStateSubscription: any = null;
  private lastHistoricalFetch: number = 0;

  async initialize(): Promise<boolean> {
    // Prevent multiple initializations
    if (this.isInitialized) {
      console.log('[Pedometer] Already initialized with', this.stepCount, 'steps');
      return this.isAvailable;
    }

    console.log('[Pedometer] Initializing...');
    
    // Request permissions first
    const permissionGranted = await this.requestPermissions();
    if (!permissionGranted) {
      console.log('[Pedometer] Permission denied');
      this.isInitialized = true;
      return false;
    }
    
    // Check if pedometer is available
    const available = await Pedometer.isAvailableAsync();
    this.isAvailable = available;
    
    if (!available) {
      console.log('[Pedometer] Not available on this device');
      this.isInitialized = true;
      return false;
    }

    // Load today's saved steps
    await this.loadTodaySteps();

    // Get historical steps (total since midnight)
    await this.refreshHistoricalSteps();
    
    // Start real-time listening
    this.startListening();

    // Listen for app state changes
    this.setupAppStateListener();

    // Sync to backend periodically
    this.startSyncInterval();

    this.isInitialized = true;
    console.log('[Pedometer] Initialized successfully with', this.stepCount, 'steps');
    return true;
  }
  
  private setupAppStateListener() {
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
    }

    this.appStateSubscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('[Pedometer] App became active, refreshing steps...');
        await this.refreshHistoricalSteps();
      }
    });
  }
  
  private async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      try {
        const { status } = await Pedometer.requestPermissionsAsync();
        return status === 'granted';
      } catch (error) {
        console.error('[Pedometer] iOS permission error:', error);
        return false;
      }
    }
    
    if (Platform.OS === 'android' && Platform.Version >= 29) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
          {
            title: 'Adım Sayacı İzni',
            message: 'Adımlarınızı takip edebilmemiz için fiziksel aktivite iznine ihtiyacımız var.',
            buttonNeutral: 'Daha Sonra Sor',
            buttonNegative: 'İptal',
            buttonPositive: 'Tamam',
          }
        );
        
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('[Pedometer] Android permission error:', err);
        return false;
      }
    }
    
    return true;
  }
  
  async refreshHistoricalSteps(): Promise<void> {
    // Rate limit: don't fetch more than once per 5 seconds
    const now = Date.now();
    if (now - this.lastHistoricalFetch < 5000) {
      console.log('[Pedometer] Skipping historical fetch (rate limited)');
      return;
    }
    this.lastHistoricalFetch = now;

    try {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      
      const result = await Pedometer.getStepCountAsync(start, end);
      if (result && result.steps >= 0) {
        const historicalSteps = result.steps;
        console.log('[Pedometer] Historical steps from sensor:', historicalSteps);
        
        // Historical steps is the ground truth - use it directly
        this.baseSteps = historicalSteps;
        this.realtimeSteps = 0; // Reset realtime counter
        
        // Update total step count
        const newTotal = this.baseSteps;
        if (newTotal !== this.stepCount) {
          this.stepCount = newTotal;
          await this.saveTodaySteps();
          this.notifyListeners();
        }
        
        console.log('[Pedometer] Total steps updated to:', this.stepCount);
      }
    } catch (error) {
      console.error('[Pedometer] Error getting historical steps:', error);
    }
  }

  private async loadTodaySteps() {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if it's a new day
    if (this.todayDate && this.todayDate !== today) {
      console.log('[Pedometer] New day detected, resetting steps');
      this.stepCount = 0;
      this.baseSteps = 0;
      this.realtimeSteps = 0;
    }
    
    this.todayDate = today;

    try {
      const storedData = await AsyncStorage.getItem('pedometer_today');
      if (storedData) {
        const data: StepData = JSON.parse(storedData);
        if (data.date === today) {
          this.stepCount = data.steps;
          console.log('[Pedometer] Loaded saved steps:', this.stepCount);
        } else {
          // New day
          this.stepCount = 0;
          this.baseSteps = 0;
          this.realtimeSteps = 0;
          await this.saveTodaySteps();
          console.log('[Pedometer] New day - reset steps');
        }
      }
    } catch (error) {
      console.error('[Pedometer] Error loading steps:', error);
    }
  }

  private async saveTodaySteps() {
    const data: StepData = {
      steps: this.stepCount,
      date: this.todayDate,
      lastSync: new Date().toISOString()
    };

    try {
      await AsyncStorage.setItem('pedometer_today', JSON.stringify(data));
    } catch (error) {
      console.error('[Pedometer] Error saving steps:', error);
    }
  }

  private startListening() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }

    // Reset realtime counter when starting new subscription
    this.realtimeSteps = 0;

    // watchStepCount returns steps SINCE subscription started
    this.subscription = Pedometer.watchStepCount((result) => {
      this.realtimeSteps = result.steps;
      
      // Total = base steps (from historical) + realtime steps (since subscription)
      const newTotal = this.baseSteps + this.realtimeSteps;
      
      if (newTotal > this.stepCount) {
        this.stepCount = newTotal;
        this.saveTodaySteps();
        this.notifyListeners();
        console.log('[Pedometer] Live update:', this.stepCount, '(base:', this.baseSteps, '+ realtime:', this.realtimeSteps, ')');
      }
    });
    
    console.log('[Pedometer] Real-time tracking started');
  }

  private startSyncInterval() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    // Sync every 5 minutes
    this.syncInterval = setInterval(() => {
      this.syncToBackend();
    }, 5 * 60 * 1000);

    // Initial sync after 10 seconds
    setTimeout(() => this.syncToBackend(), 10000);
  }

  private async syncToBackend() {
    if (this.stepCount === 0) return;

    try {
      const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL || '';
      const token = await AsyncStorage.getItem('session_token');

      if (!token || !backendUrl) {
        return;
      }

      const response = await fetch(`${backendUrl}/api/steps/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          steps: this.stepCount,
          date: this.todayDate
        })
      });

      if (response.ok) {
        console.log('[Pedometer] Synced to backend:', this.stepCount, 'steps');
      }
    } catch (error) {
      console.error('[Pedometer] Sync error:', error);
    }
  }

  subscribe(callback: (steps: number) => void) {
    this.listeners.add(callback);
    // Immediately provide current value
    callback(this.stepCount);
  }

  unsubscribe(callback: (steps: number) => void) {
    this.listeners.delete(callback);
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback(this.stepCount));
  }

  getCurrentSteps(): number {
    return this.stepCount;
  }

  isServiceAvailable(): boolean {
    return this.isAvailable;
  }

  isServiceInitialized(): boolean {
    return this.isInitialized;
  }

  // DON'T call stop() when component unmounts - keep service running
  stop() {
    // Only stop if explicitly needed (e.g., logout)
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }

    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
      this.appStateSubscription = null;
    }

    this.listeners.clear();
    this.isInitialized = false;
    console.log('[Pedometer] Service stopped');
  }

  async addManualSteps(steps: number) {
    this.stepCount += steps;
    await this.saveTodaySteps();
    await this.syncToBackend();
    this.notifyListeners();
  }

  // Force refresh from sensor
  async forceRefresh(): Promise<number> {
    await this.refreshHistoricalSteps();
    return this.stepCount;
  }
}

// Singleton instance
export const pedometerService = new PedometerService();
