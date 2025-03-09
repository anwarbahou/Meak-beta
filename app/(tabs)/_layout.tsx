import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Calendar, MessageCircle, User, Search } from 'lucide-react-native';
import { I18nManager } from 'react-native';
import { ar } from '@/i18n/ar';
import { darkTheme } from '@/constants/theme';

// Force RTL layout for the entire app
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: darkTheme.colors.card,
          borderTopColor: darkTheme.colors.border,
        },
        tabBarActiveTintColor: darkTheme.colors.primary,
        tabBarInactiveTintColor: darkTheme.colors.textSecondary,
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: darkTheme.colors.text,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: ar.home,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          tabBarLabel: ar.home
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: ar.searchProviders,
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
          tabBarLabel: ar.searchProviders,
          href: null // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: ar.bookings,
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
          tabBarLabel: ar.bookings
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: ar.chat,
          tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
          tabBarLabel: ar.chat
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: ar.profile,
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          tabBarLabel: ar.profile
        }}
      />
    </Tabs>
  );
}