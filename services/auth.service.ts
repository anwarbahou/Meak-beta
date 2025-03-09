/**
 * Authentication Service
 * Handles all authentication-related API calls to Supabase
 */

import { supabase } from '@/lib/supabase';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  postalCode?: string;
  avatarUrl?: string;
}

export const AuthService = {
  /**
   * Sign up a new user
   */
  signUp: async (data: SignUpData) => {
    const { email, password, firstName, lastName, phone, postalCode } = data;
    
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
          postal_code: postalCode,
        },
      },
    });

    if (error) throw error;
    return authData;
  },

  /**
   * Sign in an existing user
   */
  signIn: async (data: SignInData) => {
    const { email, password } = data;
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return authData;
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Reset password for a user
   */
  resetPassword: async (email: string, redirectUrl: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) throw error;
  },

  /**
   * Update user profile
   */
  updateProfile: async (userId: string, data: ProfileUpdateData) => {
    const { firstName, lastName, phone, postalCode, avatarUrl } = data;
    
    const updates = {
      id: userId,
      ...(firstName && { first_name: firstName }),
      ...(lastName && { last_name: lastName }),
      ...(phone && { phone }),
      ...(postalCode && { postal_code: postalCode }),
      ...(avatarUrl && { avatar_url: avatarUrl }),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(updates);

    if (error) throw error;
  },

  /**
   * Get current user profile
   */
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },
};