import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/store/auth';
import { darkTheme } from '@/constants/theme';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.emptyText}>Home content removed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: darkTheme.colors.card,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.colors.text,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: darkTheme.colors.textSecondary,
  },
});