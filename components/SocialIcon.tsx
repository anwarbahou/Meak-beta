import React from 'react';
import { StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, typography } from '@/constants/theme';

interface SocialIconProps {
  type: 'google' | 'facebook' | 'twitter';
}

export function SocialIcon({ type }: SocialIconProps) {
  const getIcon = () => {
    switch (type) {
      case 'google':
        return 'G';
      case 'facebook':
        return 'f';
      case 'twitter':
        return 't';
      default:
        return '';
    }
  };

  const styles = StyleSheet.create({
    icon: {
      ...typography.button,
      color: colors.background,
      fontSize: 20,
      fontWeight: type === 'facebook' ? '500' : '700',
    } as TextStyle,
  });

  return (
    <Text style={styles.icon}>{getIcon()}</Text>
  );
} 