'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function VoiceOfKochi() {
  const reviews = [
    {
      initials: 'AK',
      name: 'Arjun Kumar',
      location: 'Edappally Resident',
      badge: 'Google Verified Local Guide',
      text: 'Exceptional service in Edappally. The electrician arrived on time, was uniformed, and fixed our complex distribution board issues with complete transparency. Highly professional!'
    },
    {
      initials: 'RM',
      name: 'Riya Mathew',
      location: 'Panampilly Nagar Resident',
      badge: 'Panampilly Avenue Guide',
      text: 'Finally a plumbing service that actually answers the phone and arrives on-time! Maria Electro Tech fixed our master bathroom mixer leaks in under an hour. Pristine cleanup afterwards.'
    },
    {
      initials: 'SN',
      name: 'Siddharth N.',
      location: 'Vyttila Resident',
      badge: 'Smart Home Client',
      text: 'Highly professional equipment. They installed our smart lighting and battery backup cleanly with neat concealed cabling runs. Absolute value for money.'
    },
    {
      initials: 'JK',
      name: 'Joseph Kurian',
      location: 'Kakkanad Resident',
      badge: 'InfoPark Corporate Client',
      text: 'Outstanding team. Had them set up high-definition CCTV camera systems at our Kakkanad duplex. Clean cabling, remote app sync, and neat execution. Highly recommended.'
    }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section id="reviews" className="py-20 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-3">
            <p className="text-primary font-bold text-xs uppercase tracking-wider">Voice of Kochi</p>
            <h2 className="text-3xl font-display font-bold tracking-tight text-on-background">
              Highly Rated by <span className="text-primary">Your Ernakulam Neighbors</span>
            </h2>
            <p className="text-secondary text-sm">
              We hold a 4.9/5 star Google review score. Drag or swipe through verified local feedback below.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-600 px-3.5 py-1.5 rounded-full font-bold text-xs">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            4.9 / 5.0 Google Score
          </div>
        </div>

        {/* Draggable Carousel */}
        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-6 w-max py-4"
          >
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[380px] bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm flex flex-col justify-between space-y-6 shrink-0 select-none hover:shadow-md transition-shadow duration-300"
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  {/* Testimonial Quote */}
                  <p className="text-on-surface-variant italic text-xs sm:text-sm leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                {/* Testimonial Author details */}
                <div className="flex items-center gap-3.5 border-t border-outline-variant/10 pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center select-none">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-on-background">{rev.name}</h4>
                    <p className="text-[10px] text-secondary font-semibold">
                      {rev.location} • <span className="text-primary">{rev.badge}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
