'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ALLOWED_ADMIN_PHONES, ADMIN_PIN } from '@/lib/constants';

// ─────────────────────────────────────────────────────────────────────────────
// Auth Context Types
// We don't use Supabase Auth for admin login.
// Authentication = correct phone number + 4-digit PIN.
// Session is stored in sessionStorage (cleared on tab close).
// ─────────────────────────────────────────────────────────────────────────────

interface AuthContextType {
  // 'user' is the verified phone number string when logged in, null otherwise
  user: string | null;
  isAllowed: boolean;
  isLoading: boolean;
  verifyPin: (phone: string, pin: string) => { success: boolean; error: string | null };
  signOut: () => void;
}

const SESSION_KEY = 'met_admin_session';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAllowed: false,
  isLoading: true,
  verifyPin: () => ({ success: false, error: null }),
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const { phone } = JSON.parse(stored);
        if (phone && ALLOWED_ADMIN_PHONES.includes(phone)) {
          setUser(phone);
          setIsAllowed(true);
        }
      }
    } catch {
      // sessionStorage unavailable (SSR) — ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Verify phone number + PIN combination.
   * Returns { success: true } on match, or { success: false, error: '...' } on failure.
   * Does NOT involve any network call — entirely local.
   */
  const verifyPin = (phone: string, pin: string): { success: boolean; error: string | null } => {
    // Normalize phone — strip spaces, ensure +91 prefix
    const normalized = phone.replace(/[\s\-()]/g, '');
    const withPlus = normalized.startsWith('+') ? normalized : `+91${normalized}`;

    if (!ALLOWED_ADMIN_PHONES.includes(withPlus)) {
      return { success: false, error: 'This phone number is not registered for admin access.' };
    }

    if (pin !== ADMIN_PIN) {
      return { success: false, error: 'Incorrect PIN. Please try again.' };
    }

    // Save session
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ phone: withPlus }));
    } catch {
      // sessionStorage write failed — proceed anyway (in-memory session)
    }

    setUser(withPlus);
    setIsAllowed(true);
    return { success: true, error: null };
  };

  const signOut = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch { /* ignore */ }
    setUser(null);
    setIsAllowed(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAllowed, isLoading, verifyPin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
