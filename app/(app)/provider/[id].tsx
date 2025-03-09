import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';
import { ar } from '@/i18n/ar';
import { darkTheme } from '@/constants/theme';
import { Star } from 'lucide-react-native';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function ProviderScreen() {
  const { id } = useLocalSearchParams();
  const [provider, setProvider] = React.useState<Profile | null>(null);
  const [rating, setRating] = React.useState<number | null>(null);
  const [reviewCount, setReviewCount] = React.useState<number>(0);

  React.useEffect(() => {
    async function fetchProvider() {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (!profileError && profileData) {
        setProvider(profileData);
      }

      // Fetch reviews data
      const { data: ratingData, error: ratingError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('reviewee_id', id);

      if (!ratingError && ratingData) {
        setReviewCount(ratingData.length);
        if (ratingData.length > 0) {
          const avgRating = ratingData.reduce((acc, curr) => acc + curr.rating, 0) / ratingData.length;
          setRating(avgRating);
        }
      }
    }

    fetchProvider();
  }, [id]);

  if (!provider) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: provider.avatar_url || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {provider.first_name} {provider.last_name}
        </Text>
        {rating && (
          <View style={styles.ratingContainer}>
            <Star size={16} color={darkTheme.colors.primary} fill={darkTheme.colors.primary} />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        )}
        <Text style={styles.location}>
          {provider.postal_code}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الخدمات</Text>
        <View style={styles.services}>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>تركيب التلفاز</Text>
          </View>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>تجميع الأثاث</Text>
          </View>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>إصلاحات بسيطة</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>التقييمات</Text>
        <View style={styles.review}>
          <Text style={styles.reviewText}>
            {rating ? `⭐️ ${rating.toFixed(1)} (${reviewCount} تقييم)` : 'لا توجد تقييمات'}
          </Text>
        </View>
      </View>

      <Pressable style={styles.bookButton}>
        <Text style={styles.bookButtonText}>احجز الآن</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: darkTheme.colors.textSecondary,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    padding: darkTheme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.colors.border,
    backgroundColor: darkTheme.colors.card,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: darkTheme.spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: darkTheme.colors.text,
    textAlign: 'center',
    marginBottom: darkTheme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: darkTheme.spacing.xs,
    marginBottom: darkTheme.spacing.xs,
  },
  ratingText: {
    fontSize: 16,
    color: darkTheme.colors.text,
  },
  location: {
    fontSize: 16,
    color: darkTheme.colors.textSecondary,
    marginTop: darkTheme.spacing.xs,
    textAlign: 'center',
  },
  section: {
    padding: darkTheme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.colors.border,
    backgroundColor: darkTheme.colors.card,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: darkTheme.colors.text,
    marginBottom: darkTheme.spacing.md,
    textAlign: 'right',
  },
  services: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: darkTheme.spacing.sm,
  },
  serviceItem: {
    backgroundColor: darkTheme.colors.surface,
    paddingHorizontal: darkTheme.spacing.md,
    paddingVertical: darkTheme.spacing.sm,
    borderRadius: darkTheme.borderRadius.full,
  },
  serviceText: {
    fontSize: 14,
    color: darkTheme.colors.text,
    textAlign: 'right',
  },
  review: {
    backgroundColor: darkTheme.colors.surface,
    padding: darkTheme.spacing.md,
    borderRadius: darkTheme.borderRadius.sm,
  },
  reviewText: {
    fontSize: 14,
    color: darkTheme.colors.text,
    textAlign: 'right',
  },
  bookButton: {
    backgroundColor: darkTheme.colors.primary,
    margin: darkTheme.spacing.lg,
    padding: darkTheme.spacing.md,
    borderRadius: darkTheme.borderRadius.sm,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: darkTheme.colors.text,
  },
});
