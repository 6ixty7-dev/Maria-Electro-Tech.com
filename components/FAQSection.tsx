'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import ScrollReveal from './ui/ScrollReveal';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQSection() {
  const staticFaqs: FAQItem[] = [
    {
      q: 'What is your emergency response time in Kochi?',
      a: 'For major power failures, electrical short circuits, or critical plumbing leaks within Ernakulam, we prioritize urgent dispatches. Our mobile emergency support technicians typically reach Edappally, Kakkanad, Vyttila, Palarivattom, and Kadavanthra within 45 to 60 minutes.'
    },
    {
      q: 'Are your technicians experienced and trained?',
      a: 'Yes, absolutely. Every technician is a background-vetted, direct employee of Maria Electro Tech. Our team is trained and experienced in domestic electrical and plumbing work in Kerala, and we follow safe, quality-focused practices on every job.'
    },
    {
      q: 'Do you stand behind the quality of your work?',
      a: 'Absolutely. We take accountability for our workmanship seriously. If an issue recurs due to our repair, contact us and we will assess and address it promptly under our standard professional care. Materials replaced are backed by the respective manufacturer warranties.'
    },
    {
      q: 'How do you charge for parts and materials?',
      a: 'We practice complete billing transparency. Our base charges are fixed and flat. If parts are required, we explain the diagnostic issue first, provide an upfront estimate, and source high-quality ISI-marked materials. You are also welcome to procure the parts yourself.'
    }
  ];

  const [faqs, setFaqs] = useState<FAQItem[]>(staticFaqs);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('created_at', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped = data.map(item => ({
            q: item.question,
            a: item.answer
          }));
          setFaqs(mapped);
        }
      } catch (err) {
        console.warn('Failed to load live FAQs, using offline fallback:', err);
      }
    }
    loadFaqs();
  }, []);

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-transparent">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center space-y-4">
            <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full w-fit mx-auto">
              Clear Answers
            </p>
            <h2 className="text-3xl font-display font-bold tracking-tight text-on-background">
              Frequently Asked Questions
            </h2>
            <p className="text-secondary text-sm md:text-base">
              Everything you need to know about our local Kochi service process, technicians, and pricing.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <ScrollReveal direction="up" delay={150}>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel bg-white/40 border border-white/50 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.02)] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex justify-between items-center group focus:outline-none select-none cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-on-background group-hover:text-primary transition-colors pr-4">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="material-symbols-outlined text-primary text-xl shrink-0"
                    >
                      expand_more
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-secondary text-xs sm:text-sm leading-relaxed border-t border-outline-variant/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
