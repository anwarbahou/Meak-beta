import { View, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { colors } from '@/constants/theme';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.yellowBackground} />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,
  yellowBackground: {
    position: 'absolute',
    top: -100,
    left: -20,
    right: -20,
    height: 400,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    transform: [{ scale: 1.2 }],
  } as ViewStyle,
  content: {
    flex: 1,
    padding: 24,
  } as ViewStyle,
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  } as ViewStyle,
  logo: {
    width: 40,
    height: 40,
    backgroundColor: colors.background,
    transform: [{ rotate: '15deg' }],
  } as ViewStyle,
}); 