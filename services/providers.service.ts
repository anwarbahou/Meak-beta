/**
 * Providers Service
 * Handles all provider-related API calls to Supabase
 */

import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

export interface ProviderSearchParams {
  query?: string;
  postalCode?: string;
  category?: string;
}

export const ProvidersService = {
  /**
   * Get a provider by ID
   */
  getProviderById: async (providerId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', providerId)
      .single();

    if (error) throw error;
    return data as Profile;
  },

  /**
   * Search for providers
   */
  searchProviders: async (params: ProviderSearchParams) => {
    const { query, postalCode, category } = params;
    let queryBuilder = supabase.from('profiles').select('*');

    if (query) {
      queryBuilder = queryBuilder.textSearch('first_name', query, {
        type: 'websearch',
        config: 'english'
      });
    }

    if (postalCode) {
      queryBuilder = queryBuilder.eq('postal_code', postalCode);
    }

    // If category filtering is implemented in the future
    // This would require a join with a provider_categories table

    const { data, error } = await queryBuilder;

    if (error) throw error;
    return data as Profile[];
  },

  /**
   * Get provider ratings
   */
  getProviderRatings: async (providerId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('reviewee_id', providerId);

    if (error) throw error;
    
    if (data.length === 0) {
      return { averageRating: null, reviewCount: 0 };
    }
    
    const averageRating = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length;
    return { averageRating, reviewCount: data.length };
  },

  /**
   * Get provider services
   * This is a placeholder for when service categories are implemented
   */
  getProviderServices: async (providerId: string) => {
    // This would be implemented when a provider_services table is created
    // For now, return mock data
    return [
      { id: '1', name: 'تركيب التلفاز' },
      { id: '2', name: 'تجميع الأثاث' },
      { id: '3', name: 'إصلاحات بسيطة' }
    ];
  }
};