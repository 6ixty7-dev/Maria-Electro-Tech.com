'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';
import { ALLOWED_USERS } from '@/lib/constants';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAllowed: boolean;
  isLoading: boolean;
  isCheckingWhitelist: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAllowed: false,
  isLoading: true,
  isCheckingWhitelist: false,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingWhitelist, setIsCheckingWhitelist] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.email) {
      setIsAllowed(false);
      setIsCheckingWhitelist(false);
      return;
    }

    const email = user.email.toLowerCase();

    // 1. Check Env Whitelist (Comma-Separated)
    const envEmailsStr = process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || '';
    if (envEmailsStr) {
      const envEmails = envEmailsStr.split(',').map(e => e.trim().toLowerCase());
      if (envEmails.includes(email)) {
        setIsAllowed(true);
        setIsCheckingWhitelist(false);
        return;
      }
    }

    // 2. Check Static Whitelist Constants
    if (ALLOWED_USERS.map(e => e.toLowerCase()).includes(email)) {
      setIsAllowed(true);
      setIsCheckingWhitelist(false);
      return;
    }

    // 3. Check Supabase DB Table Whitelist (admin_users)
    async function checkDbWhitelist() {
      setIsCheckingWhitelist(true);
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', email)
          .maybeSingle();

        if (!error && data) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } catch (err) {
        console.warn('Database whitelist check bypassed/failed, locking route access:', err);
        setIsAllowed(false);
      } finally {
        setIsCheckingWhitelist(false);
      }
    }

    checkDbWhitelist();
  }, [user]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAllowed(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAllowed, isLoading, isCheckingWhitelist, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
