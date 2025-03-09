import React from 'react';
import { Text, TextInput, Pressable, View, StyleSheet, TextStyle, ViewStyle, TextInputProps, PressableProps } from 'react-native';
import { colors, typography } from '@/constants/theme';

export function AuthInput(props: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

interface AuthButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
}

export function AuthButton({ title, loading, ...props }: AuthButtonProps) {
  return (
    <Pressable 
      style={[styles.button, props.disabled && styles.buttonDisabled]}
      {...props}
    >
      <Text style={styles.buttonText}>
        {loading ? 'Please wait...' : title}
      </Text>
    </Pressable>
  );
}

interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

export function SocialButtons() {
  return (
    <>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtons}>
        <Pressable style={styles.socialButton}>
          <Text style={styles.socialButtonText}>G</Text>
        </Pressable>
        <Pressable style={styles.socialButton}>
          <Text style={styles.socialButtonText}>f</Text>
        </Pressable>
        <Pressable style={styles.socialButton}>
          <Text style={styles.socialButtonText}>t</Text>
        </Pressable>
      </View>
    </>
  );
}

export function AuthTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    paddingVertical: 8,
    color: colors.text.primary,
  } as TextStyle,
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  } as ViewStyle,
  buttonDisabled: {
    opacity: 0.7,
  } as ViewStyle,
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.inverse,
  } as TextStyle,
  errorContainer: {
    backgroundColor: '#FFEFED',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  } as ViewStyle,
  errorText: {
    color: '#E11900',
    fontSize: 14,
  } as TextStyle,
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 40,
    color: colors.text.primary,
  } as TextStyle,
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 32,
  } as ViewStyle,
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.default,
  } as ViewStyle,
  dividerText: {
    color: colors.text.secondary,
    fontSize: 14,
  } as TextStyle,
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  } as ViewStyle,
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.social.background,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  socialButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  } as TextStyle,
}); 