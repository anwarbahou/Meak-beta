import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useAuth as useAuthStore } from '../store/auth';

export function useAuth() {
  const { user, loading, initialized, setUser, setLoading, setInitialized } = useAuthStore();

  useEffect(() => {
    if (initialized) return;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
      setInitialized(true);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initialized, setUser, setLoading, setInitialized]);

  return {
    session: user ? { user } as Session : null,
    loading,
  };
} 