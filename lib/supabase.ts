import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { Database } from '@/types/database';

class CustomStorage {
  private isWeb: boolean;

  constructor() {
    this.isWeb = Platform.OS === 'web';
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (this.isWeb) {
        if (typeof window !== 'undefined') {
          return window.localStorage.getItem(key);
        }
        return null;
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (this.isWeb) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, value);
          return;
        }
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error setting item:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (this.isWeb) {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key);
          return;
        }
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }
}

const supabaseUrl = 'https://hzzplwesshlwqkatzwvx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6enBsd2Vzc2hsd3FrYXR6d3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTQ5NTcsImV4cCI6MjA1NzA3MDk1N30.cZnq3zOleePD1G-1EE4ufQa2JuSdkAmhqbd3uTmMby8';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new CustomStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});