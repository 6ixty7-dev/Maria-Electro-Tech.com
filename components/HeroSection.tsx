'use client';

import { useState, useEffect } from 'react';
import { CONTACT_INFO } from '@/lib/constants';
import { createClient } from '@/lib/supabase';

export default function HeroSection() {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function loadSlides() {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('url')
          .eq('category', 'hero_slides')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setSlides(data.map(d => d.url));
        } else {
          setSlides(['https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ']);
        }
      } catch (err) {
        setSlides(['https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ']);
      }
    }
    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative pt-20 pb-8 sm:pt-28 md:py-24 bg-transparent min-h-0 flex flex-col items-center justify-center space-y-10 sm:space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center flex flex-col items-center">
        
        {/* Vetted Local Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full backdrop-blur-md mb-6 shadow-sm border border-primary/20">
          <span className="material-symbols-outlined text-[18px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider">
            Certified Kochi Home Specialists
          </span>
        </div>

        {/* Main Trust-building Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-[1.1] sm:leading-tight tracking-tight text-on-background max-w-[95vw] sm:max-w-none mb-6">
          Trusted <span className="text-primary">Electricians</span> & <span className="text-primary">Plumbers</span> in Kochi Since 2000
        </h1>

        <p className="text-secondary text-[15px] sm:text-lg max-w-2xl leading-relaxed mb-8 sm:mb-10">
          Electrical repairs, plumbing, CCTV installation, inverter setup, house wiring and KSEB assistance.
        </p>

        {/* Quick Action CTAs (Glassmorphism iOS style) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <a
            href={CONTACT_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-primary/90 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(2,132,199,0.3)] spring-hover active:scale-95 transition-all text-[15px]"
          >
            <span className="material-symbols-outlined text-xl">calendar_month</span>
            Book a Visit Now
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto px-8 py-4 glass-panel bg-white/40 border border-white/80 text-primary rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(31,38,135,0.05)] spring-hover active:scale-95 transition-all text-[15px]"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              phone_in_talk
            </span>
            Emergency Support
          </a>
        </div>

        {/* trust badges */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-10">
          <div 
            onMouseMove={handleMouseMove}
            className="glass-panel px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm spring-hover bg-white/50 border border-white/80"
          >
            <span className="material-symbols-outlined text-yellow-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <div className="text-left">
              <p className="text-[10px] text-secondary font-bold leading-none">Google Score</p>
              <p className="font-extrabold text-xs text-on-background mt-1">4.9 / 5.0 Rating</p>
            </div>
          </div>

          <div 
            onMouseMove={handleMouseMove}
            className="glass-panel px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm spring-hover bg-white/50 border border-white/80"
          >
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <div className="text-left">
              <p className="text-[10px] text-secondary font-bold leading-none">Est. Jan 2000</p>
              <p className="font-extrabold text-xs text-on-background mt-1">Skilled &amp; Experienced</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Full-width / Rounded Banner Slideshow */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 mt-8 sm:mt-12">
        <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden aspect-video sm:aspect-[21/9] shadow-2xl border border-white/60 bg-surface-container-highest group">
          {slides.map((slide, index) => (
            <img
              key={slide + index}
              src={slide}
              alt="Maria Electro Tech Team"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
              }`}
            />
          ))}

          {/* Floating trust badge inside image */}
          <div 
            onMouseMove={handleMouseMove}
            className="absolute right-4 bottom-4 sm:right-8 sm:bottom-8 glass-panel px-4 py-2 sm:p-4 rounded-xl sm:rounded-2xl z-20 shadow-lg border border-white/60 flex items-center gap-2 select-none bg-white/60 backdrop-blur-xl"
          >
            <span className="material-symbols-outlined text-primary font-bold text-lg sm:text-2xl">
              engineering
            </span>
            <span className="text-[10px] sm:text-xs font-extrabold text-on-background uppercase tracking-wider">Est. 2000 · Kochi</span>
          </div>
          
          {/* Slideshow indicators */}
          {slides.length > 1 && (
            <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-2 z-20 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
              {slides.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
