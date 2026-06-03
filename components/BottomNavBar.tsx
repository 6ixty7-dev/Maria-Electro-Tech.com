'use client';

import Link from 'next/link';

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-outline-variant/20 md:hidden bg-white/90 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex justify-around items-center px-4 py-2.5 pb-safe">
      <Link href="/" className="flex flex-col items-center justify-center text-primary font-bold">
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          home
        </span>
        <span className="text-[10px] font-bold mt-0.5">Home</span>
      </Link>
      <Link href="#services" className="flex flex-col items-center justify-center text-secondary hover:text-primary">
        <span className="material-symbols-outlined text-[24px]">
          bolt
        </span>
        <span className="text-[10px] font-bold mt-0.5">Services</span>
      </Link>
      <Link href="#reviews" className="flex flex-col items-center justify-center text-secondary hover:text-primary">
        <span className="material-symbols-outlined text-[24px]">
          star
        </span>
        <span className="text-[10px] font-bold mt-0.5">Reviews</span>
      </Link>
      <Link href="#contact" className="flex flex-col items-center justify-center text-secondary hover:text-primary">
        <span className="material-symbols-outlined text-[24px]">
          calendar_month
        </span>
        <span className="text-[10px] font-bold mt-0.5">Book</span>
      </Link>
    </nav>
  );
}
