'use client';

import { motion } from 'framer-motion';
import { TRUST_BADGES } from '@/lib/constants';

export default function WhyKochiTrustsSection() {
  return (
    <section id="why-us" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full w-fit mx-auto">
            Reliability & Accountability
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-on-background">
            Why Kochi Trusts <span className="text-primary">Maria Electro Tech</span>
          </h2>
          <p className="text-secondary text-sm md:text-base">
            Our technicians are direct employees of Maria Electro Tech — verified, uniformed, and trained for quality work in Kochi homes since 2000.
          </p>
        </div>

        {/* Dynamic Trust Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_BADGES.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all spring-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-on-background mb-2">{badge.title}</h3>
              <p className="text-secondary text-xs leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Technician Licensing and Safety Spotlight */}
        <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-on-background">
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
                  <strong>Skilled &amp; Trained Technicians</strong>: Experienced professionals with strong knowledge of local electrical and plumbing standards.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="text-xs md:text-sm font-semibold text-on-surface-variant">
                  <strong>Clean Uniforms & ID Checks</strong>: Neat, identifiable professionals who respect your flooring and household cleanliness.
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
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/40 shadow-sm">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAByPFsl6-Chcoq95QSEfAVaVhfKcBQqsnm85q7RnKMtQb6iGQbxmgUHNolXDm4nt1aPd5b9OIum_F3cp5UoverVlg-Ys_vIB9jSD_OeSvPIAmXB7AqSTikepHwRbbf06ayaI7lWlHDOfOvytOvZ_yszxYHXSXTemr20UlA4SvauQ7QDzZS-2mjf_5eb5tSTVr9sWoulfZlh6WvfCMBuIc75XmIIAXwCowvTpdp2OGABeCWbwCyuiIZzEfpyuezdpt6V7rEcOd4tlI"
              alt="Licensed Kerala Technicians Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
