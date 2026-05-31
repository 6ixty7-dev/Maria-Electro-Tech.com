'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface relative overflow-hidden">
      {/* Blueprint grid pattern */}
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 md:p-12 max-w-md w-full rounded-3xl border border-outline-variant/30 shadow-md relative z-10 space-y-6 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto text-3xl font-black">
          🔒
        </div>

        <h1 className="text-2xl font-display font-extrabold tracking-tight text-on-background">
          Access Restricted
        </h1>

        <div className="h-px bg-outline-variant/20 my-4" />

        <p className="text-secondary text-xs sm:text-sm leading-relaxed">
          Your Google account authenticated successfully, but your email address is not whitelisted in the <strong>Maria Electro Tech</strong> administration register.
        </p>

        <p className="text-secondary text-xs">
          If you believe this is an error, please contact support or verify the whitelisted emails in the constants.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all spring-hover active:scale-95 select-none"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            Return to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
