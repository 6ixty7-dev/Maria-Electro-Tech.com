'use client';

import Link from 'next/link';
import { CONTACT_INFO, MASTER_SERVICES } from '@/lib/constants';

export default function Footer() {
  const services = Object.values(MASTER_SERVICES);

  return (
    <footer className="w-full bg-transparent border-t border-outline-variant/15 pt-16 pb-24 md:pb-12 text-xs sm:text-sm text-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg select-none">
              M
            </div>
            <span className="font-display font-bold text-lg text-primary tracking-tight">
              Maria Electro Tech
            </span>
          </div>
          <p className="text-secondary text-xs leading-relaxed max-w-xs">
            Kochi’s leading premium contractor for homeowners who prioritize safety, absolute cleanliness, and professional workmanship. Est. 2000 · Kochi.
          </p>
          <div className="flex gap-4 pt-2">
            <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="text-secondary hover:text-primary transition-colors" title="Call Us">
              <span className="material-symbols-outlined text-lg">call</span>
            </a>
            <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors" title="Chat on WhatsApp">
              {/* WhatsApp icon */}
              <svg className="w-4 h-4 fill-current inline" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.94 14.07 .987 11.472.987 6.035.987 1.611 5.358 1.608 10.789c-.001 1.7.452 3.357 1.31 4.822l-.994 3.633 3.733-.99z" />
              </svg>
            </a>
            <a href="https://google.com/search?q=Maria+Electro+Tech+Kochi" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors" title="Google Business Profile">
              <span className="material-symbols-outlined text-lg">storefront</span>
            </a>
          </div>
        </div>

        {/* Dynamic Services Links */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-on-background">Services</h4>
          <nav className="flex flex-col gap-2.5">
            {services.map(service => (
              <Link
                key={service.key}
                href={`/services/${service.key}`}
                className="text-secondary hover:text-primary transition-colors text-xs font-semibold"
              >
                {service.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Location Dispatch Center */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-on-background">Dispatch Center</h4>
          <p className="text-secondary text-xs leading-relaxed max-w-xs space-y-1">
            <strong>Address</strong>: {CONTACT_INFO.address}<br />
            <strong>Phone</strong>: {CONTACT_INFO.phone}<br />
            <strong>Email</strong>: {CONTACT_INFO.email}<br />
            <strong>Hours</strong>: 8:00 AM - 9:00 PM (Everyday)
          </p>
        </div>

        {/* Quick Booking CTA */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-on-background">Standby Emergency Support</h4>
          <p className="text-secondary text-xs leading-relaxed max-w-xs">
            Available 24/7 for major power failure diagnostics or critical pipe leaks across Ernakulam district.
          </p>
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary underline hover:text-primary-container"
          >
            Call Emergency Hotline
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </a>
        </div>

      </div>

      {/* Compliance & Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-outline-variant/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[11px] text-secondary">
          © {new Date().getFullYear()} Maria Electro Tech. All rights reserved. Registered Professional Services, Kochi.
        </p>
        <div className="flex gap-6 text-[11px]">
          <Link href="#" className="hover:text-primary transition-colors font-semibold">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors font-semibold">Terms of Service</Link>
          <Link href="#" className="hover:text-primary transition-colors font-semibold">Emergency Support</Link>
        </div>
      </div>
    </footer>
  );
}
