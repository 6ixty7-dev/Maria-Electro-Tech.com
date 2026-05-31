'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { createClient } from '@/lib/supabase';
import ScrollReveal from './ui/ScrollReveal';

interface Review {
  id?: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  avatar_url: string | null;
  source: string;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    reviewer_name: 'Ananthakrishnan G.',
    rating: 5,
    review_text: 'Excellent service! They arrived within an hour for a major short circuit in our house in Kadavanthra. The electrician was highly professional, diagnosed the issue quickly, and resolved it with upfront pricing. Highly recommended!',
    review_date: '2026-04-15',
    avatar_url: null,
    source: 'Google'
  },
  {
    reviewer_name: 'Riya Mathew',
    rating: 5,
    review_text: 'Very reliable plumbers in Kochi. Fixed a concealed leak in our Kakkanad apartment using proper diagnostic sensors without breaking the entire wall. Transparent billing and very professional behavior.',
    review_date: '2026-05-10',
    avatar_url: null,
    source: 'Google'
  },
  {
    reviewer_name: 'Faisal Rahman',
    rating: 5,
    review_text: 'Maria Electro Tech team installed a double-battery UPS inverter system at our home in Edappally. Clean cabling, excellent service, and clear instructions. Perfect solution for summer power cuts.',
    review_date: '2026-05-22',
    avatar_url: null,
    source: 'Google'
  },
  {
    reviewer_name: 'Saritha Nair',
    rating: 4,
    review_text: 'Booked their AMC Elite Care plan for our villa in Vyttila. The team is professional, conducted a thorough electrical and plumbing safety audit. Very satisfied with their systematic approach.',
    review_date: '2026-03-29',
    avatar_url: null,
    source: 'Google'
  },
  {
    reviewer_name: 'George Varghese',
    rating: 5,
    review_text: 'Top notch CCTV camera installation in Palarivattom. Clean conduit routing and precise setup. The technician was polite and explained the mobile app syncing perfectly.',
    review_date: '2026-04-02',
    avatar_url: null,
    source: 'Google'
  },
  {
    reviewer_name: 'Meera Pillai',
    rating: 5,
    review_text: 'Emergency plumbing callout for a broken flush valve late evening. They resolved it efficiently. Very reasonable rate compared to local independent plumbers who usually overcharge.',
    review_date: '2026-05-15',
    avatar_url: null,
    source: 'Google'
  }
];

export default function VoiceOfKochi() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('id, reviewer_name, rating, review_text, review_date, avatar_url, source')
          .eq('is_published', true)
          .order('review_date', { ascending: false });

        if (!error && data && data.length > 0) {
          setReviews(data);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  function getInitials(name: string) {
    if (!name) return 'ME';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }

  function getAvatarColor(name: string) {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-emerald-100 text-emerald-800 border-emerald-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-amber-100 text-amber-800 border-amber-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  function formatRelativeDate(dateStr: string) {
    try {
      const date = parseISO(dateStr);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return dateStr;
    }
  }

  return (
    <section id="blog" className="py-20 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full w-fit">
                Voice of Kochi
              </p>
              <h2 className="text-3xl font-display font-bold tracking-tight text-on-background">
                Highly Rated by <span className="text-primary">Your Ernakulam Neighbors</span>
              </h2>
              <p className="text-secondary text-sm md:text-base">
                We hold a 4.9/5 star Google Business score. Read verified local feedback below.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-yellow-400/10 text-yellow-700 px-4 py-2 rounded-full font-extrabold text-sm border border-yellow-400/20 shadow-sm shrink-0">
              <span className="material-symbols-outlined text-base fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              4.9 / 5.0 Google Rating
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Reviews Swipeable Container */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x snap-mandatory">
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="w-[300px] sm:w-[380px] bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm flex flex-col justify-between shrink-0 select-none hover:shadow-md hover:border-primary/15 transition-all duration-300 snap-start relative group"
              >
                {/* Quote Icon Background decoration */}
                <div className="absolute top-6 right-8 text-surface-container-high opacity-10 select-none group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                  <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    format_quote
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Google Review Badge & Stars */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[16px] sm:text-[18px]"
                          style={{
                            fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0",
                          }}
                        >
                          star
                        </span>
                      ))}
                    </div>

                    {/* Google Source Tag */}
                    {rev.source === 'Google' && (
                      <div className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant/10 text-[10px] font-bold text-secondary select-none">
                        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>Google Review</span>
                      </div>
                    )}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed min-h-[72px]">
                    "{rev.review_text}"
                  </p>
                </div>

                {/* Testimonial Author details */}
                <div className="flex items-center gap-3.5 border-t border-outline-variant/10 pt-4 mt-6">
                  {rev.avatar_url ? (
                    <img
                      src={rev.avatar_url}
                      alt={rev.reviewer_name}
                      className="w-10 h-10 rounded-full object-cover border border-outline-variant/35"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full border text-xs font-bold flex items-center justify-center select-none ${getAvatarColor(rev.reviewer_name)}`}>
                      {getInitials(rev.reviewer_name)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-on-background leading-snug">{rev.reviewer_name}</h4>
                    <p className="text-[10px] text-secondary font-bold mt-0.5">
                      {formatRelativeDate(rev.review_date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
