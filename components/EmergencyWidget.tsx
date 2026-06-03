'use client';

import { CONTACT_INFO } from '@/lib/constants';

export default function EmergencyWidget() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 my-4 sm:my-8">
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-primary-container text-white p-5 sm:p-8 md:p-12 overflow-hidden shadow-xl shadow-primary/10 border border-white/20">
        {/* Subtle dot background pattern */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-5 sm:gap-8">
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              24/7 Kochi Emergency Dispatch
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight">
              Power Failure? Burst Pipe? <br className="hidden sm:inline" />
              We are Active <span className="underline decoration-red-400 decoration-2 underline-offset-4">Right Now</span>.
            </h2>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              We maintain standby emergency technicians ready for immediate dispatch across Kakkanad, Edappally, Vyttila, Aluva, and other Ernakulam neighborhoods. Average dispatch response time is <strong>45 to 60 minutes</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-primary rounded-2xl font-bold text-center spring-hover active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                phone_in_talk
              </span>
              Call Emergency Support
            </a>
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-[#25D366] text-white rounded-2xl font-bold text-center spring-hover active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 border-[0.5px] border-white/20 text-sm"
            >
              <span className="material-symbols-outlined text-xl">
                chat
              </span>
              WhatsApp Booking
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
