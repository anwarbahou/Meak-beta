import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'meak://reset-password-confirm',
      });

      if (resetError) throw resetError;
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <X size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Reset Password</Text>
        <Text style={styles.headerRight}>MA</Text>
      </View>

      {/* Logo */}
      <Text style={styles.logoText}>Meak</Text>

      {/* Form */}
      <View style={styles.form}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {success && (
          <Text style={styles.successText}>
            Password reset instructions have been sent to your email
          </Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading && !success}
        />

        <Pressable
          style={[
            styles.resetButton,
            (loading || success) && styles.resetButtonDisabled
          ]}
          onPress={handleResetPassword}
          disabled={loading || success}
        >
          <Text style={styles.resetButtonText}>
            {loading ? 'Sending...' : 'Reset Password'}
          </Text>
        </Pressable>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Remember your password? </Text>
          <Pressable onPress={() => router.replace('/(auth)/login')}>
            <Text style={styles.loginLink}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    paddingHorizontal: 16,
    gap: 16,
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 8,
  },
  successText: {
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#000',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
});
