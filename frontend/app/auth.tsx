import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { Colors } from '../constants/Colors';
import * as Linking from 'expo-linking';

/**
 * Auth callback handler for OAuth deep links
 * This screen handles the redirect from OAuth provider (caloriediet://auth)
 * and redirects to the main app after authentication is processed
 */
export default function AuthCallbackScreen() {
  const router = useRouter();
  
  useEffect(() => {
    // Get the full URL to pass to the auth handler
    const handleCallback = async () => {
      try {
        const url = await Linking.getInitialURL();
        console.log('[AuthCallback] Initial URL:', url);
        
        // The AuthContext's deep link listener will handle the actual auth
        // We just need to redirect to the main screen after a short delay
        // to allow the auth process to complete
        
        setTimeout(() => {
          // Navigate to home - the auth state will determine the actual screen
          router.replace('/');
        }, 1000);
      } catch (error) {
        console.error('[AuthCallback] Error:', error);
        router.replace('/');
      }
    };
    
    handleCallback();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>Giriş yapılıyor...</Text>
      <Text style={styles.subtext}>Lütfen bekleyin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    gap: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.darkText,
    marginTop: 16,
  },
  subtext: {
    fontSize: 14,
    color: Colors.lightText,
  },
});
