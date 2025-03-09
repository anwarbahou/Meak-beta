import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ViewStyle, TextStyle, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { Lock, Mail, User } from 'lucide-react-native';
import { useAuth } from '@/store/auth';
import { supabase } from '@/lib/supabase';
import { colors, spacing, typography, shadows, borderRadius } from '@/constants/theme';
import { SocialIcon } from '@/components/SocialIcon';

const { width, height } = Dimensions.get('window');
const CURVE_HEIGHT = height * 0.4;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const signUp = useAuth((state) => state.signUp);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/(auth)/confirm`,
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setError('An account with this email already exists');
        } else if (error.message.includes('rate limit')) {
          setError('Please wait a few minutes before trying again');
        } else {
          throw error;
        }
        return;
      }

      if (data.session) {
        await signUp(email, password, name);
        router.replace('/');
      } else {
        router.replace('/(auth)/confirm');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.backgroundCurve} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logo} />
          </View>

          <Text style={styles.title}>Sign Up</Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={colors.text.tertiary}
              value={name}
              onChangeText={setName}
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.text.tertiary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Create Password"
              placeholderTextColor={colors.text.tertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />

            <Pressable 
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </Pressable>

            <Text style={styles.termsText}>
              By Signing Up, you agree to our{'\n'}
              <Text style={styles.termsLink}>Terms</Text> & <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <Pressable style={styles.socialButton}>
                <SocialIcon type="google" />
              </Pressable>
              <Pressable style={styles.socialButton}>
                <SocialIcon type="facebook" />
              </Pressable>
              <Pressable style={styles.socialButton}>
                <SocialIcon type="twitter" />
              </Pressable>
            </View>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <Link href="/(auth)/login" asChild>
                <Pressable>
                  <Text style={styles.signInLink}>Login</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,
  backgroundCurve: {
    position: 'absolute',
    top: -50,
    left: -20,
    right: -20,
    height: CURVE_HEIGHT + 100,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    transform: [{ scale: 1.2 }],
  } as ViewStyle,
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  } as ViewStyle,
  content: {
    flex: 1,
    padding: spacing.xl,
    paddingTop: CURVE_HEIGHT * 0.3,
  } as ViewStyle,
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  } as ViewStyle,
  logo: {
    width: 40,
    height: 40,
    backgroundColor: colors.background,
    transform: [{ rotate: '15deg' }],
  } as ViewStyle,
  title: {
    ...typography.h1,
    marginBottom: spacing.xl,
    textAlign: 'left',
  } as TextStyle,
  errorContainer: {
    backgroundColor: '#FFEFED',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  } as ViewStyle,
  errorText: {
    ...typography.body2,
    color: colors.error,
  } as TextStyle,
  form: {
    gap: spacing.xl,
    marginTop: spacing.xl,
  } as ViewStyle,
  input: {
    ...typography.body1,
    color: colors.text.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.border.default,
    paddingVertical: spacing.md,
    paddingHorizontal: 0,
    fontSize: 18,
  } as TextStyle,
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  buttonDisabled: {
    opacity: 0.7,
  } as ViewStyle,
  buttonText: {
    ...typography.button,
    color: colors.text.inverse,
  } as TextStyle,
  termsText: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  } as TextStyle,
  termsLink: {
    color: colors.text.primary,
    textDecorationLine: 'underline',
  } as TextStyle,
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
    gap: spacing.md,
  } as ViewStyle,
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.default,
  } as ViewStyle,
  dividerText: {
    ...typography.body2,
    color: colors.text.secondary,
  } as TextStyle,
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
  } as ViewStyle,
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.social.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  } as ViewStyle,
  signInText: {
    ...typography.body2,
    color: colors.text.secondary,
  } as TextStyle,
  signInLink: {
    ...typography.body2,
    color: colors.secondary,
    fontWeight: '600',
  } as TextStyle,
});