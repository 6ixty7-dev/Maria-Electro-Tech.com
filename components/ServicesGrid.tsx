'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MASTER_SERVICES } from '@/lib/constants';
import { getAllSiteMedia, DEFAULT_SITE_MEDIA } from '@/lib/siteMedia';
import ScrollReveal from './ui/ScrollReveal';

export default function ServicesGrid() {
  const services = Object.values(MASTER_SERVICES);
  const [siteMedia, setSiteMedia] = useState<Record<string, { image_url: string; alt_text: string }>>({});

  useEffect(() => {
    getAllSiteMedia().then(setSiteMedia);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const getServiceImage = (key: string) => {
    const mediaMap: Record<string, string> = {
      'electrician': 'service_electrical',
      'plumber': 'service_plumbing',
      'inverter-installation': 'service_inverter',
      'cctv-setup': 'service_cctv',
      'home-maintenance': 'service_maintenance',
    };
    const mediaKey = mediaMap[key];
    return siteMedia[mediaKey]?.image_url || DEFAULT_SITE_MEDIA[mediaKey]?.image_url || '';
  };

  const getServiceAlt = (key: string) => {
    const mediaMap: Record<string, string> = {
      'electrician': 'service_electrical',
      'plumber': 'service_plumbing',
      'inverter-installation': 'service_inverter',
      'cctv-setup': 'service_cctv',
      'home-maintenance': 'service_maintenance',
    };
    const mediaKey = mediaMap[key];
    return siteMedia[mediaKey]?.alt_text || DEFAULT_SITE_MEDIA[mediaKey]?.alt_text || '';
  };

  return (
    <section id="services" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-8 sm:space-y-12">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/30 pb-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full w-fit">
                Expert Craftsmanship
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-on-background">
                Technical Precision, <span className="text-primary">Neat Installations.</span>
              </h2>
              <p className="text-secondary text-sm md:text-base">
                We specialize in providing clean, reliable, and background-vetted domestic electrical and plumbing solutions across Kochi.
              </p>
            </div>
            <Link
              href="#contact"
              className="text-primary font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 spring-hover py-2 shrink-0"
            >
              Custom Project Booking
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="flex md:grid overflow-x-auto md:overflow-visible pb-8 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 items-stretch hide-scrollbar snap-x snap-mandatory md:snap-none">
          {services.map((service, idx) => (
            <ScrollReveal
              key={service.key}
              direction="up"
              delay={idx * 80}
              className="h-full shrink-0 snap-center md:snap-align-none w-[260px] sm:w-[320px] md:w-auto"
            >
              <div 
                onMouseMove={handleMouseMove}
                className="glass-panel spring-hover bg-white/40 border border-white/50 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.03)] group flex flex-col h-full"
              >
                {/* Service Cover Image */}
                <div className="h-32 sm:h-48 overflow-hidden relative border-b border-white/20">
                  <img
                    src={getServiceImage(service.key)}
                    alt={getServiceAlt(service.key) || service.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md select-none border-[0.5px] border-white/20">
                    Starts at ₹{service.startsAt}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 md:p-8 flex flex-col grow justify-between space-y-4 sm:space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-xl">{service.icon}</span>
                      </div>
                      <h3 className="text-lg font-bold text-on-background leading-tight">{service.name}</h3>
                    </div>
                    <p className="text-secondary text-xs leading-relaxed line-clamp-3 min-h-[54px]">
                      {service.description}
                    </p>
                    
                    {/* Service Features list */}
                    <ul className="space-y-2 pt-2 border-t border-outline-variant/10">
                      {service.features.slice(0, 3).map((feat, fidx) => (
                        <li key={fidx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-tertiary text-base select-none mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                          <span className="text-[11px] text-on-surface-variant leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <Link
                      href={`/services/${service.key}`}
                      className="text-xs font-extrabold text-primary hover:text-primary-container inline-flex items-center gap-1 group/btn transition-colors"
                    >
                      View Details
                      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-0.5 transition-transform">chevron_right</span>
                    </Link>
                    <a
                      href={`https://wa.me/919847192829?text=Hello%20Maria%20Electro%20Tech,%20I%20would%20like%20to%20book%20a%20technician%20for%20${encodeURIComponent(service.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary hover:bg-primary-container text-white font-extrabold text-xs rounded-xl shadow-sm spring-hover transition-all active:scale-95 flex items-center gap-1"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
