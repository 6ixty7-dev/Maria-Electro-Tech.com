'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLoginPage() {
  const { user, isAllowed, isLoading, isCheckingWhitelist, signInWithGoogle } = useAuth();
  const router = useRouter();

  // Authentication error tracking
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  // 1. Client-Side query parsing to avoid build-time Suspense requirements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const err = params.get('error');
      if (err) {
        setErrorMsg(decodeURIComponent(err));
        
        // Clean URL to keep it pristine
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, []);

  // 2. Routing gate supervisor
  useEffect(() => {
    if (!isLoading && !isCheckingWhitelist && user) {
      if (isAllowed) {
        router.push('/admin/dashboard');
      } else {
        router.push('/admin/unauthorized');
      }
    }
  }, [user, isAllowed, isLoading, isCheckingWhitelist, router]);

  const handleSignIn = async () => {
    setSigningIn(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setErrorMsg(err.message || 'Google OAuth Initialization Failed.');
      setSigningIn(false);
    }
  };

  // 3. Loading state screen
  if (isLoading || isCheckingWhitelist || (user && isAllowed)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        <p className="text-xs text-secondary font-bold uppercase tracking-wider animate-pulse">
          {isCheckingWhitelist ? 'Verifying operations whitelist...' : 'Loading authentication profiles...'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface relative overflow-hidden">
      {/* Visual blueprint background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-full max-w-md space-y-6 z-10">
        
        {/* Dynamic Animated Error Banner */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200/60 p-4 rounded-2xl flex items-start gap-3 shadow-sm select-none"
          >
            <span className="material-symbols-outlined text-red-600 text-lg shrink-0 mt-0.5">report</span>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-red-950 leading-tight">Authentication Gate Blocked</h4>
              <p className="text-[11px] text-red-800 leading-normal font-semibold">
                {errorMsg}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-12 w-full rounded-3xl border border-outline-variant/30 shadow-md relative space-y-8 text-center"
        >
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl font-black select-none">
              ⚡
            </div>
            <h1 className="text-xl font-display font-extrabold tracking-tight text-on-background">
              Maria Electro Tech <span className="text-primary">Admin Gateway</span>
            </h1>
            <p className="text-secondary text-xs sm:text-sm">
              Welcome to the Kochi service operations center. Sign in using your registered administration Google Account.
            </p>
          </div>

          <div className="h-px bg-outline-variant/20 my-6" />

          <button
            onClick={handleSignIn}
            disabled={signingIn}
            className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-3 transition-all spring-hover active:scale-95 border border-primary/20 disabled:opacity-75 disabled:pointer-events-none"
          >
            {signingIn ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
              </svg>
            )}
            {signingIn ? 'Initializing OAuth Connection...' : 'Authentication with Google'}
          </button>

          <p className="text-[10px] text-secondary">
            🔒 Secure gateway. Access is locked to white-listed domain administrators. All active connections are logged.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
