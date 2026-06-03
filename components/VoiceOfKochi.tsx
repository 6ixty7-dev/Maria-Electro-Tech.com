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
  { reviewer_name: 'Marykutty Devasia', rating: 5, review_text: 'Punctuality,good service.', review_date: '2026-05-10', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Nish', rating: 5, review_text: 'Good', review_date: '2026-05-15', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Sunitha Arun', rating: 5, review_text: 'Excellent wiring work—flawless execution, truly the best in Ernakulam!', review_date: '2026-05-18', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Aleid', rating: 5, review_text: '👍', review_date: '2026-05-20', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Adil Sk', rating: 5, review_text: 'Excellent service—polite, supportive, and customer-focused. Easily the best in Ernakulam!', review_date: '2026-05-22', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Advocate Aivan Raj', rating: 5, review_text: 'Very experienced electricians and plumbers. Thoroughly professional and meticulous in their work.', review_date: '2026-04-28', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Yedu Krishnan', rating: 5, review_text: 'Fast and professional service! Hired them for electrical work and plumbing. They even provide reliable workers for painting and CCTV installations. Very satisfied with their service!', review_date: '2026-05-02', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Athulkrishna S', rating: 5, review_text: 'Exceptional one-stop solution for electrical, plumbing, and inverter needs in Ernakulam!', review_date: '2026-05-05', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Sreyesh Ks', rating: 5, review_text: 'Whether you need a skilled electrician, a professional plumber, or reliable Luminous UPS/inverter installation, this service is highly recommended.', review_date: '2026-05-08', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Anagh K A', rating: 5, review_text: 'Exceptional electrical contractors in Ernakulam! Excellent for both residential and commercial electrical work.', review_date: '2026-05-12', avatar_url: null, source: 'Google' },
  { reviewer_name: 'francko', rating: 5, review_text: 'They provides better service in affordable rate', review_date: '2026-04-12', avatar_url: null, source: 'Google' },
  { reviewer_name: 'GEORGEE & COMPANY', rating: 5, review_text: 'They provides quality in their work. Their after services are also great and faster.', review_date: '2026-05-01', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Jacob Hurly', rating: 5, review_text: 'This company is very good service in electrical maintenance.', review_date: '2026-05-11', avatar_url: null, source: 'Google' },
  { reviewer_name: 'Shankaranandhanan VA', rating: 5, review_text: 'This place has the skilled electricians in the field.', review_date: '2026-05-14', avatar_url: null, source: 'Google' }
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

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

  const ReviewCard = ({ rev }: { rev: Review }) => (
    <div 
      onMouseMove={handleMouseMove}
      className="glass-panel w-[240px] sm:w-[350px] bg-white/40 border border-white/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.02)] flex flex-col justify-between shrink-0 select-none hover:shadow-md transition-all duration-300 relative group whitespace-normal"
    >
      {/* Quote decoration */}
      <div className="absolute top-6 right-8 text-surface-container-high opacity-10 select-none group-hover:scale-110 transition-transform duration-300 pointer-events-none">
        <span className="material-symbols-outlined text-[48px] sm:text-[56px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          format_quote
        </span>
      </div>

      <div className="space-y-4">
        {/* Google Badge & Stars */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-0.5 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[14px] sm:text-[16px]"
                style={{
                  fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                star
              </span>
            ))}
          </div>

          {rev.source === 'Google' && (
            <div className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant/10 text-[9px] font-bold text-secondary select-none">
              <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google Review</span>
            </div>
          )}
        </div>

        {/* Text */}
        <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed min-h-[64px]">
          "{rev.review_text}"
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-outline-variant/10 pt-4 mt-6">
        {rev.avatar_url ? (
          <img
            src={rev.avatar_url}
            alt={rev.reviewer_name}
            className="w-9 h-9 rounded-full object-cover border border-outline-variant/35"
          />
        ) : (
          <div className={`w-9 h-9 rounded-full border text-[10px] font-bold flex items-center justify-center select-none ${getAvatarColor(rev.reviewer_name)}`}>
            {getInitials(rev.reviewer_name)}
          </div>
        )}
        <div>
          <h4 className="font-extrabold text-[11px] sm:text-xs text-on-background leading-none">{rev.reviewer_name}</h4>
          <p className="text-[9px] text-secondary font-bold mt-1">
            {formatRelativeDate(rev.review_date)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="blog" className="py-20 bg-transparent overflow-hidden">
      {/* Dynamic CSS styles for hardware accelerated infinite marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marqueeScroll 50s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-8 sm:space-y-12">
        {/* Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full w-fit">
                Voice of Kochi
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-on-background">
                Highly Rated by <span className="text-primary">Your Ernakulam Neighbors</span>
              </h2>
              <p className="text-secondary text-sm md:text-base">
                We hold a 4.9/5 star Google Business score. Below is verified real customer feedback.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-yellow-400/10 text-yellow-700 px-4 py-2 rounded-full font-extrabold text-sm border border-yellow-400/20 shadow-sm shrink-0 select-none">
              <span className="material-symbols-outlined text-base fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              4.9 / 5.0 Google Rating
            </div>
          </div>
        </ScrollReveal>

        {/* Premium Infinite Scroll Reviews Marquee */}
        <ScrollReveal direction="up" delay={150}>
          <div className="w-full overflow-hidden py-4 no-scrollbar">
            <div className="marquee-container gap-6">
              {/* Set 1 */}
              <div className="flex gap-6 shrink-0">
                {reviews.map((rev, idx) => (
                  <ReviewCard key={`r1-${rev.id || idx}`} rev={rev} />
                ))}
              </div>
              {/* Duplicate Set 2 for flawless looping */}
              <div className="flex gap-6 shrink-0" aria-hidden="true">
                {reviews.map((rev, idx) => (
                  <ReviewCard key={`r2-${rev.id || idx}`} rev={rev} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
