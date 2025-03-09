import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/store/auth';
import { LogoutConfirmationModal } from '@/components/LogoutConfirmationModal';

export default function Home() {
  const { user, signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
      setShowLogoutModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meak</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.email}>{user?.email}</Text>
        <Pressable 
          style={styles.logoutButton} 
          onPress={() => setShowLogoutModal(true)}
        >
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </Pressable>
      </View>

      <LogoutConfirmationModal
        visible={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
