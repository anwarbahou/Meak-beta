import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useAuth } from '@/store/auth';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { LogoutConfirmationModal } from '@/components/LogoutConfirmationModal';
import { Settings, Star, MapPin, Phone } from 'lucide-react-native';

type Profile = {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  postal_code: string | null;
  avatar_url: string | null;
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>

      <View style={styles.profileHeader}>
        <Image
          source={{ 
            uri: profile?.avatar_url || 
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              `${profile?.first_name || ''} ${profile?.last_name || ''}`
            )}` 
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {profile?.first_name} {profile?.last_name}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Phone size={20} color="#666" />
          <Text style={styles.infoText}>{profile?.phone || 'No phone number'}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={20} color="#666" />
          <Text style={styles.infoText}>{profile?.postal_code || 'No postal code'}</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Pressable style={styles.menuItem}>
          <Settings size={20} color="#666" />
          <Text style={styles.menuText}>Settings</Text>
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Star size={20} color="#666" />
          <Text style={styles.menuText}>Reviews</Text>
        </Pressable>
      </View>

      <Pressable 
        style={styles.logoutButton} 
        onPress={() => setShowLogoutModal(true)}
      >
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </Pressable>

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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    margin: 16,
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