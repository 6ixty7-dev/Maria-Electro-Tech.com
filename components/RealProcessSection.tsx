'use client';

import ScrollReveal from './ui/ScrollReveal';

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
      title: 'Professional Handover',
      desc: 'We execute the repair efficiently using quality materials. The site is left clean and tidy, and you receive a clear digital service receipt for your records.',
      icon: 'verified'
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section className="py-20 bg-transparent border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-xl mx-auto space-y-4">
            <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full w-fit mx-auto">
              Simple &amp; Transparent
            </p>
            <h2 className="text-3xl font-display font-bold tracking-tight text-on-background">
              How We Get Your Home <span className="text-primary">Back to Perfect</span>
            </h2>
            <p className="text-secondary text-sm md:text-base">
              No complex bookings, no automated telephone loops. Just a warm, straightforward local process built for Kerala homeowners.
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-outline-variant/20 -translate-y-10 z-0" />

          {steps.map((step, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 120}
              className="h-full z-10"
            >
              <div 
                onMouseMove={handleMouseMove}
                className="glass-panel spring-hover bg-white/40 border border-white/50 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.03)] h-full flex flex-col items-center text-center space-y-4"
              >
                {/* Step Circle */}
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/10 relative shrink-0">
                  <span className="material-symbols-outlined text-[26px]">{step.icon}</span>
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-tertiary text-white flex items-center justify-center text-[10px] font-extrabold border-2 border-white select-none">
                    {step.num}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-on-background pt-2">{step.title}</h3>
                <p className="text-secondary text-xs md:text-sm leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
