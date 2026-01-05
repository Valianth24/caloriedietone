import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

/**
 * Catch-all screen for unmatched routes
 * Handles deep links and redirects to appropriate screens
 */
export default function NotFoundScreen() {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async () => {
      try {
        const url = await Linking.getInitialURL();
        console.log('[NotFound] Checking URL:', url);
        
        // If this is an auth callback, redirect to home
        // The auth listener in AuthContext will handle the session
        if (url && (url.includes('session_id') || url.includes('auth'))) {
          console.log('[NotFound] Auth callback detected, redirecting to home');
          setTimeout(() => {
            router.replace('/');
          }, 500);
          return;
        }
        
        // For expo-development-client URLs, just go home
        if (url && url.includes('expo-development-client')) {
          console.log('[NotFound] Dev client URL, redirecting to home');
          router.replace('/');
          return;
        }
      } catch (error) {
        console.error('[NotFound] Error handling deep link:', error);
      }
    };
    
    handleDeepLink();
  }, []);

  const goHome = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color={Colors.lightText} />
      <Text style={styles.title}>Sayfa Bulunamadı</Text>
      <Text style={styles.subtitle}>Bu sayfa mevcut değil veya taşınmış olabilir.</Text>
      <TouchableOpacity style={styles.button} onPress={goHome}>
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
