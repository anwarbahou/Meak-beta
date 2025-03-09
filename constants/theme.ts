import { Platform } from 'react-native';

export const colors = {
  primary: '#FFB800', // Bright yellow
  secondary: '#000000',
  success: '#05944F',
  warning: '#FFC043',
  error: '#E11900',
  background: '#FFFFFF',
  surface: '#F8F8F8',
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#000000', // Black text on yellow buttons
  },
  border: {
    default: '#DDDDDD',
    active: '#FFB800',
  },
  social: {
    background: '#000000',
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '700',
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '600',
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '600',
  },
  subtitle1: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '600',
  },
  subtitle2: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '600',
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '400',
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif'
    }),
    fontWeight: '600',
  },
};

export const shadows = {
  none: {},
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const darkTheme = {
  colors: {
    primary: '#00A67E',
    background: '#121212',
    card: '#1E1E1E',
    surface: '#242424',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    border: '#2A2A2A',
    placeholder: '#666666',
    error: '#CF6679',
    notification: '#00A67E',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
};