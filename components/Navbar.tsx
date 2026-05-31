'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer to track active section
    const sections = ['services', 'why-us', 'pricing', 'blog', 'faq', 'contact'];
    const activeObservers: { observer: IntersectionObserver; el: HTMLElement }[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          {
            rootMargin: '-30% 0px -50% 0px', // Highlight when the section takes up the key central area of the viewport
          }
        );
        observer.observe(el);
        activeObservers.push({ observer, el });
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      activeObservers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const navLinks = [
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#why-us', label: 'Why Kochi Trusts Us', id: 'why-us' },
    { href: '#pricing', label: 'Pricing', id: 'pricing' },
    { href: '#blog', label: 'Blog', id: 'blog' },
    { href: '#faq', label: 'FAQs', id: 'faq' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      onMouseMove={handleMouseMove}
      className={`fixed left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl border border-white/55 glass-navbar transition-all duration-500 ${
        isScrolled
          ? 'top-2 bg-white/80 shadow-xl py-3 px-6 rounded-2xl md:rounded-full'
          : 'top-4 bg-white/50 shadow-md py-4 px-8 rounded-full'
      }`}
    >
      <div className="flex justify-between items-center w-full">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg select-none">
            M
          </div>
          <span className="font-display font-bold text-lg md:text-xl text-primary tracking-tight group-hover:opacity-90 transition-opacity">
            Maria Electro Tech
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`text-sm font-semibold transition-all duration-300 relative py-1 ${
                  isActive
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
            className="hidden sm:inline-flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-primary px-5 py-2 rounded-full text-sm font-bold spring-hover active:scale-95 transition-all"
          >
            Call Now
          </a>
          <a
            href={CONTACT_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-full text-sm font-bold spring-hover active:scale-95 transition-all gap-1.5 shadow-sm shadow-primary/10"
          >
            {/* SVG WhatsApp icon */}
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.94 14.07 .987 11.472.987 6.035.987 1.611 5.358 1.608 10.789c-.001 1.7.452 3.357 1.31 4.822l-.994 3.633 3.733-.99zM17.487 14.39c-.314-.157-1.858-.916-2.134-1.017-.276-.101-.476-.151-.676.151-.2.302-.776 1.017-.95 1.217-.175.202-.35.227-.664.07-3.136-1.567-4.41-2.73-5.736-5.02-.35-.605.35-.561.998-1.854.11-.222.055-.417-.027-.568-.083-.151-.676-1.63-.926-2.235-.244-.589-.493-.509-.676-.518-.175-.01-.375-.01-.575-.01-.2 0-.526.075-.802.378-.276.302-1.052 1.027-1.052 2.505 0 1.478 1.077 2.905 1.227 3.106.15.2 2.122 3.24 5.138 4.542.717.31 1.277.495 1.711.633.72.228 1.376.196 1.894.119.577-.085 1.858-.76 2.122-1.456.264-.697.264-1.296.185-1.42-.078-.122-.276-.197-.59-.355z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
