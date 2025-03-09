import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function ConfirmEmail() {
  const router = useRouter();
  const { error_description } = useLocalSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error_description) {
      setError(decodeURIComponent(error_description as string));
      setVerifying(false);
      return;
    }

    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error_description, router]);

  return (
    <View style={styles.container}>
      {verifying ? (
        <>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.text}>Verifying your email...</Text>
        </>
      ) : error ? (
        <>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.text}>Please try signing up again.</Text>
        </>
      ) : (
        <>
          <Text style={styles.success}>Email verified successfully!</Text>
          <Text style={styles.text}>Redirecting to login...</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    color: '#DC2626',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  success: {
    fontSize: 20,
    color: '#059669',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
}); 