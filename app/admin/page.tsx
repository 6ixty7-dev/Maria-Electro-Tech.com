'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

type AuthStep = 'phone' | 'pin';

export default function AdminLoginPage() {
  const { user, isAllowed, isLoading, verifyPin } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakePins, setShakePins] = useState(false);

  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && user && isAllowed) {
      router.push('/admin/dashboard');
    }
  }, [user, isAllowed, isLoading, router]);

  const handlePhoneSubmit = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Quick pre-check — normalize and verify phone whitelist before showing PIN step
    const withPlus = `+91${digits.slice(-10)}`;
    const { error } = verifyPin(withPlus, '__pre_check__');
    // If error says "not registered" it means phone is wrong; if "Incorrect PIN" phone is right
    if (error && error.includes('not registered')) {
      setErrorMsg(error);
      return;
    }

    setErrorMsg(null);
    setStep('pin');
    setTimeout(() => pinRefs[0].current?.focus(), 100);
  };

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only

    const newPin = [...pin];
    newPin[index] = value.slice(-1); // only last char (handle paste edge case)
    setPin(newPin);
    setErrorMsg(null);

    // Auto-advance to next box
    if (value && index < 3) {
      pinRefs[index + 1].current?.focus();
    }

    // Auto-submit when last digit filled
    if (index === 3 && value) {
      const fullPin = [...newPin.slice(0, 3), value.slice(-1)].join('');
      if (fullPin.length === 4) {
        handlePinSubmit(fullPin);
      }
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
    if (e.key === 'Enter') {
      const fullPin = pin.join('');
      if (fullPin.length === 4) handlePinSubmit(fullPin);
    }
  };

  const handlePinSubmit = (fullPin?: string) => {
    const code = fullPin ?? pin.join('');
    if (code.length < 4) {
      setErrorMsg('Please enter all 4 digits.');
      return;
    }

    setIsSubmitting(true);
    const digits = phone.replace(/\D/g, '').slice(-10);
    const { success, error } = verifyPin(`+91${digits}`, code);

    if (!success) {
      setErrorMsg(error);
      setPin(['', '', '', '']);
      setShakePins(true);
      setTimeout(() => {
        setShakePins(false);
        pinRefs[0].current?.focus();
      }, 500);
    }
    // On success, the useEffect above will redirect to dashboard
    setIsSubmitting(false);
  };

  if (isLoading || (user && isAllowed)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        <p className="text-xs text-secondary font-bold uppercase tracking-wider animate-pulse">
          Verifying session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface relative overflow-hidden">
      {/* Subtle grid background */}
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

      <div className="w-full max-w-sm space-y-5 z-10">
        {/* Error banner */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-red-50 border border-red-200/60 p-4 rounded-2xl flex items-start gap-3"
            >
              <span className="material-symbols-outlined text-red-600 text-base shrink-0 mt-0.5">report</span>
              <p className="text-[11px] text-red-800 font-semibold leading-relaxed">{errorMsg}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 w-full rounded-3xl border border-outline-variant/30 shadow-md space-y-7 text-center"
        >
          {/* Brand header */}
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto text-2xl select-none">
              ⚡
            </div>
            <h1 className="text-lg font-display font-extrabold tracking-tight text-on-background">
              Maria Electro Tech <span className="text-primary">Admin</span>
            </h1>
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'phone' ? 'bg-primary scale-125' : 'bg-primary/40'}`} />
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'pin' ? 'bg-primary scale-125' : 'bg-primary/40'}`} />
          </div>

          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="flex items-center border border-outline-variant/40 rounded-xl overflow-hidden focus-within:border-primary transition-colors bg-surface">
                    <span className="px-3 py-3.5 text-xs font-bold text-secondary bg-surface-container-low border-r border-outline-variant/30 select-none shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="admin-phone-input"
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                        setErrorMsg(null);
                      }}
                      onKeyDown={e => e.key === 'Enter' && phone.length === 10 && handlePhoneSubmit()}
                      placeholder="98471 92829"
                      maxLength={10}
                      className="flex-1 px-3 py-3.5 text-sm font-semibold text-on-background bg-transparent outline-none placeholder:text-secondary/30"
                      autoFocus
                      autoComplete="tel-national"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePhoneSubmit}
                  disabled={phone.replace(/\D/g, '').length < 10}
                  id="admin-phone-next-btn"
                  className="w-full py-3.5 px-6 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all spring-hover active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  Continue
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="pin"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                    Enter 4-Digit PIN
                  </p>
                  {/* PIN boxes */}
                  <motion.div
                    animate={shakePins ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-3 justify-center pt-1"
                  >
                    {pin.map((digit, i) => (
                      <input
                        key={i}
                        ref={pinRefs[i]}
                        id={`admin-pin-${i}`}
                        type="password"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handlePinChange(i, e.target.value)}
                        onKeyDown={e => handlePinKeyDown(i, e)}
                        className={`w-14 h-14 text-center text-2xl font-extrabold rounded-2xl border-2 outline-none transition-all bg-surface
                          ${digit ? 'border-primary text-primary' : 'border-outline-variant/40 text-on-background'}
                          focus:border-primary focus:ring-2 focus:ring-primary/10`}
                        autoComplete="off"
                      />
                    ))}
                  </motion.div>
                </div>

                <button
                  onClick={() => handlePinSubmit()}
                  disabled={isSubmitting || pin.join('').length < 4}
                  id="admin-pin-submit-btn"
                  className="w-full py-3.5 px-6 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all spring-hover active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <span className="material-symbols-outlined text-sm">lock_open</span>
                  )}
                  {isSubmitting ? 'Verifying...' : 'Unlock Dashboard'}
                </button>

                <button
                  onClick={() => { setStep('phone'); setPin(['', '', '', '']); setErrorMsg(null); }}
                  className="text-xs text-secondary hover:text-on-background transition-colors font-semibold"
                >
                  ← Change number
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[10px] text-secondary/60 pt-1">
            🔒 Admin access only
          </p>
        </motion.div>
      </div>
    </div>
  );
}
