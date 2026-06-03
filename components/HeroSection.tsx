'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CONTACT_INFO } from '@/lib/constants';
import { getSiteMediaUrl } from '@/lib/siteMedia';

export default function HeroSection() {
  const [heroImage, setHeroImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ');

  useEffect(() => {
    getSiteMediaUrl('hero_main').then((url) => {
      if (url) setHeroImage(url);
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative pt-24 pb-8 sm:pt-32 md:py-24 bg-transparent overflow-hidden min-h-0 sm:min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-left">
            {/* Vetted Local Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <span className="material-symbols-outlined text-[18px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider">
                Certified Kochi Home Specialists
              </span>
            </div>

            {/* Main Trust-building Heading */}
            <h1 className="text-[1.6rem] sm:text-4xl md:text-5xl font-display font-bold leading-[1.2] sm:leading-tight tracking-tight text-on-background max-w-[90vw] sm:max-w-none">
              Professional <span className="text-primary">Electrical</span> & <span className="text-primary">Plumbing</span> Services You Can Trust.
            </h1>

            <p className="text-secondary text-sm md:text-base max-w-lg leading-relaxed">
              Reliable electrical, plumbing, and home maintenance for Kochi &amp; Ernakulam. Skilled technicians, honest pricing, and dependable service — since 2000.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-primary hover:bg-primary-container text-white rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-primary/10 spring-hover active:scale-95 transition-all text-sm md:text-base"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                Book a Visit Now
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-white border border-outline-variant/30 text-primary rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-sm spring-hover active:scale-95 transition-all text-sm md:text-base"
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  phone_in_talk
                </span>
                Emergency Support
              </a>
            </div>

            {/* trust badges */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-outline-variant/10">
              <div 
                onMouseMove={handleMouseMove}
                className="glass-panel p-3 rounded-xl flex items-center gap-2.5 shadow-sm spring-hover bg-white/40 border border-white/50"
              >
                <span className="material-symbols-outlined text-yellow-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <div>
                  <p className="text-[10px] text-secondary font-bold leading-none">Google Score</p>
                  <p className="font-extrabold text-xs text-on-background mt-0.5">4.9 / 5.0 Rating</p>
                </div>
              </div>

              <div 
                onMouseMove={handleMouseMove}
                className="glass-panel p-3 rounded-xl flex items-center gap-2.5 shadow-sm spring-hover bg-white/40 border border-white/50"
              >
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
                <div>
                  <p className="text-[10px] text-secondary font-bold leading-none">Est. Jan 2000</p>
                  <p className="font-extrabold text-xs text-on-background mt-0.5">Skilled &amp; Experienced</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="relative group max-w-xs sm:max-w-md lg:max-w-none mx-auto w-full animate-breathing">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
            
            {/* Realistic Technician Photo */}
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[3/4] sm:aspect-[4/5] shadow-lg border border-white/50 z-10 bg-white">
              <img
                src={heroImage}
                alt="Professional Kochi Electrician"
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />

              {/* Floating trust badge inside image */}
              <div 
                onMouseMove={handleMouseMove}
                className="absolute right-6 bottom-6 glass-panel p-3 rounded-xl z-20 shadow-lg border border-white/60 flex items-center gap-2 select-none bg-white/60"
              >
                <span className="material-symbols-outlined text-primary font-bold text-xl">
                  engineering
                </span>
                <span className="text-[10px] font-extrabold text-on-background uppercase tracking-wider">Est. 2000 · Kochi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
