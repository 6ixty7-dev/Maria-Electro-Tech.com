'use client';

import { motion } from 'framer-motion';

export default function RealProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'WhatsApp / Call Dispatch',
      desc: 'Send a quick chat or call our Kochi central dispatcher. Tell us your issue, and we will arrange a certified technician slot instantly.',
      icon: 'chat'
    },
    {
      num: '02',
      title: 'Upfront Diagnostics',
      desc: 'Our uniformed professional arrives on-time. They inspect the issue and explain the resolution options with a fixed, upfront price promise.',
      icon: 'plumbing'
    },
    {
      num: '03',
      title: 'Guaranteed Handover',
      desc: 'We execute the repair efficiently using premium materials. After complete site tidying, we deliver a digital receipt backed by our 30-day labor warranty.',
      icon: 'verified'
    }
  ];

  return (
    <section className="py-20 bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <p className="text-primary font-bold text-xs uppercase tracking-wider">Simple & Transparent</p>
          <h2 className="text-3xl font-display font-bold tracking-tight text-on-background">
            How We Get Your Home <span className="text-primary">Back to Perfect</span>
          </h2>
          <p className="text-secondary text-sm">
            No complex bookings, no automated telephone loops. Just a warm, straightforward local process built for Kerala homeowners.
          </p>
        </div>

        {/* Dynamic Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-outline-variant/30 -translate-y-10 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center space-y-4 relative z-10 bg-white p-8 rounded-3xl border border-outline-variant/20 shadow-sm"
            >
              {/* Step Circle */}
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/10 relative">
                <span className="material-symbols-outlined text-[26px]">{step.icon}</span>
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-tertiary text-white flex items-center justify-center text-[10px] font-extrabold border-2 border-white">
                  {step.num}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-on-background pt-2">{step.title}</h3>
              <p className="text-secondary text-xs md:text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
