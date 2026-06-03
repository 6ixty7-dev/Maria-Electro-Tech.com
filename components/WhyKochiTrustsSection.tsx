'use client';

import { useState, useEffect } from 'react';
import { TRUST_BADGES } from '@/lib/constants';
import { getSiteMediaUrl } from '@/lib/siteMedia';
import ScrollReveal from './ui/ScrollReveal';

export default function WhyKochiTrustsSection() {
  const [teamImage, setTeamImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuANoEXiuzINK1QeW3C1ITs6Dd3LntiSmbagri4oeZkYOOVuaCM7InAhEmbtvx_rVrSk38cw37EVjmhk9J03w2C070JLivY1dkLS7PBzFDA6mBdE1V76fBrQ6e4thgwva6gim_EXFXRPSapLjomEM6Z1T9twDLfKZ_GF_I4wpdt0suNbzxb_P7OuMXoWz_z4BmSaX0vTW3rUfXalABDnI4HzEKo2f58aEe5o0BajCwHXMBsgkS0Ny0Ku0YnujDrxi1NUgXCHWJFS-pE');

  useEffect(() => {
    getSiteMediaUrl('trust_team').then((url) => {
      if (url) setTeamImage(url);
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="why-us" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full w-fit mx-auto">
              Reliability &amp; Accountability
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-on-background">
              Why Kochi Trusts <span className="text-primary">Maria Electro Tech</span>
            </h2>
            <p className="text-secondary text-sm md:text-base">
              Our technicians are direct employees of Maria Electro Tech — verified, uniformed, and trained for quality work in Kochi homes since 2000.
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Trust Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_BADGES.map((badge, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 80}
              className="h-full"
            >
              <div 
                onMouseMove={handleMouseMove}
                className="glass-panel spring-hover bg-white/40 border border-white/50 p-5 sm:p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.03)] h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-background mb-2">{badge.title}</h3>
                </div>
                <p className="text-secondary text-xs leading-relaxed">{badge.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Technician Licensing and Safety Spotlight */}
        <ScrollReveal direction="up" delay={200}>
          <div className="glass-panel bg-white/30 border border-white/45 p-4 sm:p-8 rounded-2xl sm:rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center mt-8 sm:mt-12">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-on-background">
                Skilled. Reliable. Accountable.
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Every technician who enters your home is a direct, verified employee of Maria Electro Tech. We do not dispatch unverified third-party contractors.
              </p>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-on-surface-variant">
                    <strong>Skilled &amp; Vetted Technicians</strong>: Experienced professionals with strong knowledge of local domestic standards and electrical codes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-on-surface-variant">
                    <strong>Clean Uniforms &amp; ID Checks</strong>: Neat, identifiable professionals who respect your flooring and household cleanliness.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-on-surface-variant">
                    <strong>On-Time Service Commitment</strong>: We value your schedule and maintain reliable dispatch workflows to arrive within promised windows.
                  </span>
                </li>
              </ul>
            </div>
            {/* visual wrapper */}
            <div className="relative rounded-2xl overflow-hidden aspect-video sm:aspect-[4/3] border border-white/50 shadow-md">
              <img
                src={teamImage}
                alt="Certified Kochi Technicians Team"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
