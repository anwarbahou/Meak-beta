import React from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@/store/auth';
import { useRouter, useSegments } from 'expo-router';

// This hook will protect the route access based on user authentication
function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // If user is not signed in and trying to access a protected route,
      // redirect to login
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // If user is signed in and trying to access auth routes,
      // redirect to main app
      router.replace('/(tabs)');
    }
  }, [user, segments]);
}

export default function RootLayout() {
  const { user } = useAuth();
  useProtectedRoute(user);

  return (
    <Stack>
      <Stack.Screen 
        name="(auth)" 
        options={{
          headerShown: false,
          // Prevent going back to auth screens when logged in
          gestureEnabled: false
        }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{
          headerShown: false,
          // Prevent going back to auth screens when logged in
          gestureEnabled: false
        }} 
      />
      <Stack.Screen 
        name="(app)" 
        options={{
          headerShown: true,
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}