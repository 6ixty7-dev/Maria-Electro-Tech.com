'use client';

import { motion } from 'framer-motion';
import { CONTACT_INFO } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:py-24 bg-surface overflow-hidden min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="space-y-6 md:space-y-8 text-left">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight text-on-background">
              Professional <span className="text-primary">Electrical</span> & <span className="text-primary">Plumbing</span> Services You Can Trust.
            </h1>

            <p className="text-secondary text-sm md:text-base max-w-lg leading-relaxed">
              Premium engineering for modern Ernakulam homes. We bring clean, licensed, and highly accountable technicians to Kochi’s most sophisticated residences.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary hover:bg-primary-container text-white rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-primary/10 spring-hover active:scale-95 transition-all text-sm md:text-base"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                Book a Visit Now
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="px-8 py-4 bg-white border border-outline-variant/30 text-primary rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-sm spring-hover active:scale-95 transition-all text-sm md:text-base"
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  phone_in_talk
                </span>
                Emergency Support
              </a>
            </div>

            {/* trust badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-outline-variant/10">
              <div className="glass-card p-3 rounded-xl flex items-center gap-2.5 shadow-sm float-anim">
                <span className="material-symbols-outlined text-yellow-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <div>
                  <p className="text-[10px] text-secondary font-bold leading-none">Google Score</p>
                  <p className="font-extrabold text-xs text-on-background mt-0.5">4.9 / 5.0 Rating</p>
                </div>
              </div>

              <div className="glass-card p-3 rounded-xl flex items-center gap-2.5 shadow-sm float-anim" style={{ animationDelay: '-3s' }}>
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
                <div>
                  <p className="text-[10px] text-secondary font-bold leading-none">100% Accountable</p>
                  <p className="font-extrabold text-xs text-on-background mt-0.5">Licensed Engineers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="relative group max-w-md lg:max-w-none mx-auto w-full">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
            
            {/* Realistic Technician Photo */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-lg border-[0.5px] border-white/20 z-10 bg-white">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyxyWYR1gDjDxusLIyGh3W6JmAEtQhJHUZg5x7I2FVn-IKuxMpdnznHKDY21ZrT4nUlbVg82l7WdvlTjwFxD4lSz4PPA0SS-a0FbIxQHtiqIwxfIrhaRU4WhoDMhk41D2RdbSKh7uhdk8LMKzjMYpJ7sTJ1E7g_QJZB4iWkiGLHfU-ymeYEvXRtjUBScHzMMEd0y9K3s30OTZFG7HRPyYCPvIb3yk1c4b4SudavGc323b-YxKhiuLWU5HtbhpfmRYggr6X_IROrrQ"
                alt="Professional Kochi Electrician"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />

              {/* Floating trust badge inside image */}
              <div className="absolute right-6 bottom-6 glass-card p-3 rounded-xl z-20 shadow-lg border-[0.5px] border-white/30 flex items-center gap-2 select-none animate-bounce" style={{ animationDuration: '4s' }}>
                <span className="material-symbols-outlined text-primary font-bold text-xl">
                  shield
                </span>
                <span className="text-[10px] font-extrabold text-on-background uppercase tracking-wider">30-Day Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
