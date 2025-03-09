import React from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MapPin, Search } from 'lucide-react-native';
import { ar } from '@/i18n/ar';
import { darkTheme } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  const navigateToProvider = (id: string) => {
    router.push({
      pathname: '/(app)/provider/[id]',
      params: { id }
    });
  };

  const navigateToSearch = () => {
    router.push('/search');
  };

  return (
    <View style={styles.container}>
      {/* Location Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={24} color={darkTheme.colors.primary} />
          <Text style={styles.locationText}>المغرب</Text>
        </View>
        <Pressable onPress={navigateToSearch}>
          <Search size={24} color={darkTheme.colors.primary} />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{ar.needHelpWith}</Text>
        
        {/* Search Bar */}
        <Pressable 
          style={styles.searchContainer}
          onPress={navigateToSearch}
        >
          <Search size={20} color={darkTheme.colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>
            {ar.searchPlaceholder}
          </Text>
        </Pressable>

        {/* Winter Reset Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{ar.winterReset}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('1')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1545454675-3531b543be5d' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.tvMounting}</Text>
            </Pressable>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('2')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.furnitureAssembly}</Text>
            </Pressable>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('3')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1527515545081-5db817172677' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.cleaning}</Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Moving Checklist Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{ar.movingChecklist}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('4')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.helpMoving}</Text>
            </Pressable>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('5')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.cleaning}</Text>
            </Pressable>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('6')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.generalHelp}</Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Home Improvement Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{ar.homeImprovement}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('7')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.minorRepairs}</Text>
            </Pressable>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('8')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1621274790572-7c32596bc67f' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.painting}</Text>
            </Pressable>
            <Pressable 
              style={styles.categoryCard}
              onPress={() => navigateToProvider('9')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1575908539614-ff89490f4a78' }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{ar.installation}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: darkTheme.colors.card,
  },
  locationContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: darkTheme.colors.text,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 16,
    color: darkTheme.colors.text,
    textAlign: 'right',
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: darkTheme.colors.card,
    borderRadius: darkTheme.borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 32,
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: darkTheme.colors.textSecondary,
    textAlign: 'right',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: darkTheme.colors.text,
    textAlign: 'right',
  },
  categoryScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: 160,
    marginLeft: 16,
    borderRadius: darkTheme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: darkTheme.colors.card,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  categoryImage: {
    width: '100%',
    height: 120,
    backgroundColor: darkTheme.colors.surface,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: darkTheme.colors.text,
    padding: 12,
    textAlign: 'right',
    fontFamily: 'System',
  },
});