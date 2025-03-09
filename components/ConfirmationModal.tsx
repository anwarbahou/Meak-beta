import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ViewStyle, TextStyle, Platform } from 'react-native';
import { Mail } from 'lucide-react-native';
import { colors, spacing, typography, shadows, borderRadius } from '@/constants/theme';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  email: string;
}

export function ConfirmationModal({ visible, onClose, email }: ConfirmationModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={styles.handle} />
          
          <View style={styles.iconContainer}>
            <Mail size={32} color={colors.text.inverse} />
          </View>
          
          <Text style={styles.title}>Check your email</Text>
          
          <Text style={styles.message}>
            We've sent a confirmation link to{'\n'}
            <Text style={styles.email}>{email}</Text>
          </Text>
          
          <Text style={styles.instruction}>
            Click the link in the email to verify your account. If you don't see it, check your spam folder.
          </Text>
          
          <Pressable
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  } as ViewStyle,
  modalView: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    padding: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxl + spacing.lg : spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  } as ViewStyle,
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border.default,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xl,
  } as ViewStyle,
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.md,
  } as ViewStyle,
  title: {
    ...typography.h3,
    marginBottom: spacing.md,
    textAlign: 'center',
    fontWeight: '700',
  } as TextStyle,
  message: {
    ...typography.subtitle1,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
    fontWeight: '500',
  } as TextStyle,
  email: {
    color: colors.text.primary,
    fontWeight: '700',
  } as TextStyle,
  instruction: {
    ...typography.body1,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    fontWeight: '500',
    paddingHorizontal: spacing.lg,
  } as TextStyle,
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    width: '100%',
    ...shadows.md,
  } as ViewStyle,
  buttonText: {
    ...typography.button,
    color: colors.text.inverse,
    textAlign: 'center',
    fontWeight: '600',
  } as TextStyle,
}); 