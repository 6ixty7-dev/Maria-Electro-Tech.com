'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MASTER_SERVICES } from '@/lib/constants';

export default function ServicesGrid() {
  const services = Object.values(MASTER_SERVICES);

  // We will map custom realistic images for each service category:
  const serviceImages: Record<string, string> = {
    'electrician': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ',
    'plumber': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeSWKmuFLvzXD9NZbisfbki1_7T6FtRthvExcLY05_g8ceYDj0qvSNn3pJapWDnfrzge29zdH1SmxlEzq9SV87GTjfAUNlnhBhxRcihHBRwPBmxhWrGFwuWW2jI_WV8uxMqbGyupFdGxFAZNE6XSNnvOyRZFySN8xxzW6x6j7RdARvUE_yoPxlL2n5L87TOVjvrIgOLfWzk0DnortxHWZJ5Q7ZaCZwgxb6iDbyARZR1hvSJyGMkD4ZlZkSfoSxjbisrJ4E9EjyZSM',
    'inverter-installation': 'https://lh3.googleusercontent.com/aida-public/AB6AXuANoEXiuzINK1QeW3C1ITs6Dd3LntiSmbagri4oeZkYOOVuaCM7InAhEmbtvx_rVrSk38cw37EVjmhk9J03w2C070JLivY1dkLS7PBzFDA6mBdE1V76fBrQ6e4thgwva6gim_EXFXRPSapLjomEM6Z1T9twDLfKZ_GF_I4wpdt0suNbzxb_P7OuMXoWz_z4BmSaX0vTW3rUfXalABDnI4HzEKo2f58aEe5o0BajCwHXMBsgkS0Ny0Ku0YnujDrxi1NUgXCHWJFS-pE',
    'cctv-setup': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkI9FkfDk_ClfqoOgg51axMQo-YXJs0SlzM6JpORSrYj_7ehf60gO0WR8x_RCQwZdfO8SMKarL2PgVjv2OzGXybVH2_wX5UKhlAn49SgxWk5m6KdOnxBL_jIMY3jVQjsHnl7O8hMDzs6ujSS_fz_PGa3CukE_Nf-jyywrVaStkYxNUdqiG4Qaph2izG7Ux8bmSv64ZR_mAp31dInhOMTWGhZ7NNEJ7FwRKNdEnjR8s6IVQyztWzzuHumZWYHaosPn8he7OFDBc1AM',
    'home-maintenance': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAByPFsl6-Chcoq95QSEfAVaVhfKcBQqsnm85q7RnKMtQb6iGQbxmgUHNolXDm4nt1aPd5b9OIum_F3cp5UoverVlg-Ys_vIB9jSD_OeSvPIAmXB7AqSTikepHwRbbf06ayaI7lWlHDOfOvytOvZ_yszxYHXSXTemr20UlA4SvauQ7QDzZS-2mjf_5eb5tSTVr9sWoulfZlh6WvfCMBuIc75XmIIAXwCowvTpdp2OGABeCWbwCyuiIZzEfpyuezdpt6V7rEcOd4tlI'
  };

  return (
    <section id="services" className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/30 pb-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-primary font-bold text-xs uppercase tracking-wider">Expert Craftsmanship</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-on-background">
              Technical Precision, <span className="text-primary">Neat Installations.</span>
            </h2>
            <p className="text-secondary text-sm">
              We specialize in providing clean, reliable, and background-vetted domestic electrical and plumbing solutions across Kochi.
            </p>
          </div>
          <Link
            href="#contact"
            className="text-primary font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 spring-hover py-2"
          >
            Custom Project Booking
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-3xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
            >
              {/* Service Cover Image */}
              <div className="h-48 overflow-hidden relative border-b border-outline-variant/20">
                <img
                  src={serviceImages[service.key]}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-primary text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md select-none border-[0.5px] border-white/20">
                  Starts at ₹{service.startsAt}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col grow justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xl">{service.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-background leading-tight">{service.name}</h3>
                  </div>
                  <p className="text-secondary text-xs leading-relaxed line-clamp-3">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
