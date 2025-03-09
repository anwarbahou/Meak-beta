import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Search } from 'lucide-react-native';
import { Database } from '@/types/database';
import { router } from 'expo-router';
import { ar } from '@/i18n/ar';
import { darkTheme } from '@/constants/theme';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function SearchScreen() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Profile[]>([]);

  const searchProviders = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .textSearch('first_name', searchQuery, {
        type: 'websearch',
        config: 'english'
      });

    if (!error) {
      setResults(data || []);
    }
  };

  const navigateToProvider = (id: string) => {
    router.push({
      pathname: '/provider/[id]',
      params: { id }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={20} color={darkTheme.colors.textSecondary} />
        <TextInput
          style={[styles.input, { color: darkTheme.colors.text }]}
          placeholder={ar.searchProviders}
          placeholderTextColor={darkTheme.colors.placeholder}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            searchProviders(text);
          }}
          textAlign="right"
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{ar.noResults}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.resultItem}
            onPress={() => navigateToProvider(item.id)}
          >
            <Text style={styles.name}>
              {item.first_name} {item.last_name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 12,
    backgroundColor: darkTheme.colors.card,
    borderRadius: darkTheme.borderRadius.sm,
    margin: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    textAlign: 'right',
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.colors.border,
    backgroundColor: darkTheme.colors.card,
  },
  name: {
    fontSize: 16,
    color: darkTheme.colors.text,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: darkTheme.colors.textSecondary,
    textAlign: 'center',
  },
});
