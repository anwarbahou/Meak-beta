import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/store/auth';

export default function SearchScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Search</Text>
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Search content removed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
