import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

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
  private syncInterval: any = null;
  private listeners: Set<(steps: number) => void> = new Set();
  private baseSteps: number = 0; // Track base steps from history

  async initialize() {
    console.log('[Pedometer] Initializing...');
    
    // Request permissions first (especially for Android 10+)
    const permissionGranted = await this.requestPermissions();
    if (!permissionGranted) {
      console.log('[Pedometer] Permission denied');
      return false;
    }
    
    // Check if pedometer is available
    const available = await Pedometer.isAvailableAsync();
    this.isAvailable = available;
    
    if (!available) {
      console.log('[Pedometer] Not available on this device');
      return false;
    }

    // Load today's steps from storage
    await this.loadTodaySteps();

    // Get historical steps first, then start listening
    await this.getHistoricalSteps();
    
    // Start listening to step count updates
    this.startListening();

    // Sync steps every 5 minutes
    this.startSyncInterval();

    console.log('[Pedometer] Initialized successfully with', this.stepCount, 'steps');
    return true;
  }
  
  private async requestPermissions(): Promise<boolean> {
    // iOS - request from Pedometer directly
    if (Platform.OS === 'ios') {
      try {
        const { status } = await Pedometer.requestPermissionsAsync();
        return status === 'granted';
      } catch (error) {
        console.error('[Pedometer] iOS permission error:', error);
        return false;
      }
    }
    
    // Android 10+ (API 29+) requires ACTIVITY_RECOGNITION permission at runtime
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
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('[Pedometer] Android ACTIVITY_RECOGNITION permission granted');
          return true;
        } else {
          console.log('[Pedometer] Android ACTIVITY_RECOGNITION permission denied');
          return false;
        }
      } catch (err) {
        console.error('[Pedometer] Android permission request error:', err);
        return false;
      }
    }
    
    // Android < 10 doesn't need runtime permission
    return true;
  }
  
  private async getHistoricalSteps() {
    try {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      
      const result = await Pedometer.getStepCountAsync(start, end);
      if (result && result.steps > 0) {
        this.baseSteps = result.steps;
        if (result.steps > this.stepCount) {
          this.stepCount = result.steps;
          await this.saveTodaySteps();
          this.notifyListeners();
        }
        console.log('[Pedometer] Historical steps loaded:', this.stepCount);
      }
    } catch (error) {
      console.error('[Pedometer] Error getting historical steps:', error);
    }
  }

  private async loadTodaySteps() {
    const today = new Date().toISOString().split('T')[0];
    this.todayDate = today;

    try {
      const storedData = await AsyncStorage.getItem('pedometer_today');
      if (storedData) {
        const data: StepData = JSON.parse(storedData);
        if (data.date === today) {
          this.stepCount = data.steps;
          console.log('[Pedometer] Loaded stored steps:', this.stepCount);
        } else {
          // New day, reset
          this.stepCount = 0;
          await this.saveTodaySteps();
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
    }

    // watchStepCount returns steps since subscription started
    // We need to add these to our base steps
    this.subscription = Pedometer.watchStepCount((result) => {
      // Calculate total: base steps from history + new steps since subscription
      const newTotal = this.baseSteps + result.steps;
      
      if (newTotal > this.stepCount) {
        this.stepCount = newTotal;
        
        // Save to storage
        this.saveTodaySteps();
        
        // Notify listeners
        this.notifyListeners();
        
        console.log('[Pedometer] Steps updated:', this.stepCount, '(base:', this.baseSteps, '+ new:', result.steps, ')');
      }
    });
    
    console.log('[Pedometer] Real-time step tracking started');
  }

  private startSyncInterval() {
    // Sync to backend every 5 minutes
    this.syncInterval = setInterval(() => {
      this.syncToBackend();
    }, 5 * 60 * 1000); // 5 minutes

    // Initial sync
    this.syncToBackend();
  }

  private async syncToBackend() {
    if (this.stepCount === 0) return;

    try {
      const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL || '';
      const token = await AsyncStorage.getItem('session_token');

      if (!token || !backendUrl) {
        console.log('[Pedometer] No token or backend URL for sync');
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
      } else {
        console.error('[Pedometer] Sync failed:', response.status);
      }
    } catch (error) {
      console.error('[Pedometer] Error syncing to backend:', error);
    }
  }

  // Subscribe to step updates
  subscribe(callback: (steps: number) => void) {
    this.listeners.add(callback);
    // Immediately call with current value
    callback(this.stepCount);
  }

  // Unsubscribe from step updates
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

  stop() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }

    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    this.listeners.clear();
    console.log('[Pedometer] Service stopped');
  }

  // Manual step add (for testing or manual entry)
  async addManualSteps(steps: number) {
    this.stepCount += steps;
    await this.saveTodaySteps();
    await this.syncToBackend();
    this.notifyListeners();
  }
}

// Singleton instance
export const pedometerService = new PedometerService();
