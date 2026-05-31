'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { CONTACT_INFO } from '@/lib/constants';

export default function PricingSection() {
  const staticTiers = [
    {
      icon: 'bolt',
      name: 'Basic Electrical',
      desc: 'Minor fixes, switch/socket replacements, fan fittings, and diagnostic visits.',
      price: '149',
      period: 'visit',
      popular: false,
      features: ['30 min priority arrival', 'Fully licensed electrician', 'Initial safety scan', 'Transparent parts billing']
    },
    {
      icon: 'plumbing',
      name: 'Advanced Plumbing',
      desc: 'Sanitary mixer replacements, pressure pump diagnostic, and structural leak fixes.',
      price: '299',
      period: 'visit',
      popular: true,
      features: ['Professional workmanship standards', 'Complete pipe-pressure diagnostics', 'Acquisition support for parts', 'Skilled technician on every job']
    },
    {
      icon: 'videocam',
      name: 'CCTV Camera Setup',
      desc: 'Complete high-definition camera installation, cable casing, and remote app sync.',
      price: '999',
      period: 'point',
      popular: false,
      features: ['Full mobile app camera sync', 'Discreet conduit cabling runs', 'Angle adjustments & blindspot analysis', 'Complimentary storage review']
    },
    {
      icon: 'home_repair_service',
      name: 'AMC Plan (Elite)',
      desc: 'Comprehensive annual care package for premium Kochi residences and duplex estates.',
      price: '4,999',
      period: 'year',
      popular: false,
      features: ['4 Periodic preventive inspections', 'Zero visit charges for emergency dispatches', 'Full house electrical & water safety check', 'Priority technician booking slots']
    }
  ];

  const [tiers, setTiers] = useState(staticTiers);

  useEffect(() => {
    async function loadPricing() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('pricing')
          .select('*')
          .order('created_at', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped = data.map(item => ({
            icon: item.category.toLowerCase() === 'electrical' ? 'bolt' :
                  item.category.toLowerCase() === 'plumbing' ? 'plumbing' :
                  item.category.toLowerCase() === 'inverter' ? 'battery_charging_full' :
                  item.category.toLowerCase() === 'cctv' ? 'videocam' : 'home_repair_service',
            name: item.name,
            desc: item.features[0] || 'Professional technical service package tailored for Kerala homes.',
            price: Number(item.price).toLocaleString('en-IN'),
            period: item.period || 'visit',
            popular: item.is_popular,
            features: item.features.length > 0 ? item.features : ['Fully background-vetted specialists', 'Professional workmanship standards']
          }));
          setTiers(mapped);
        }
      } catch (err) {
        console.warn('Failed to load live database rates, using local fallback:', err);
      }
    }
    loadPricing();
  }, []);

  return (
    <section id="pricing" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full w-fit mx-auto">
            Fixed Rates & Transparent Billing
          </p>
          <h2 className="text-3xl font-display font-bold tracking-tight text-on-background">
            Transparent Pricing. <span className="text-primary">No Surprise Visiting Fees.</span>
          </h2>
          <p className="text-secondary text-sm">
            We believe in honest work. We charge flat baseline service rates. You approve the quote before our technicians start any repair.
          </p>
        </div>

        {/* Pricing Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`bg-white rounded-3xl p-6 md:p-8 border flex flex-col justify-between h-full transition-all spring-hover relative ${
                tier.popular
                  ? 'border-primary shadow-lg scale-100 lg:scale-[1.03] z-10'
                  : 'border-outline-variant/30 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popular Choice
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined text-2xl">{tier.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-background">{tier.name}</h3>
                  <p className="text-secondary text-xs leading-relaxed min-h-[48px]">
                    {tier.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pt-2 border-t border-outline-variant/10">
                  <span className="text-3xl font-extrabold text-on-background">₹{tier.price}</span>
                  <span className="text-xs text-secondary font-semibold">/{tier.period}</span>
                </div>

                <ul className="space-y-2.5">
                  {tier.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-base select-none mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check
                      </span>
                      <span className="text-[11px] font-semibold text-on-surface-variant leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <a
                  href={`https://wa.me/919847192829?text=Hello%20Maria%20Electro%20Tech,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(tier.name)}%20package.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl text-xs font-bold text-center block spring-hover active:scale-95 transition-all ${
                    tier.popular
                      ? 'bg-primary text-white shadow-md shadow-primary/15'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  Book Dynamic Slot
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
