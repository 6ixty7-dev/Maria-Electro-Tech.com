'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

interface Review {
  id?: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  avatar_url: string | null;
  is_published: boolean;
  source: string;
}

interface ReviewsManagerProps {
  isSandbox: boolean;
  alertSystem: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export default function ReviewsManager({ isSandbox, alertSystem }: ReviewsManagerProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeReviewEdit, setActiveReviewEdit] = useState<Partial<Review> | null>(null);

  // Quick manual copy-paste parsing box state
  const [pasteContent, setPasteContent] = useState('');

  const supabase = createClient();

  useEffect(() => {
    loadReviews();
  }, [isSandbox]);

  const loadReviews = async () => {
    setLoading(true);
    if (isSandbox) {
      const localR = localStorage.getItem('maria_reviews');
      if (localR) {
        setReviews(JSON.parse(localR));
      } else {
        const fallbacks: Review[] = [
          { reviewer_name: 'Ananthakrishnan G.', rating: 5, review_text: 'Excellent service! They arrived within an hour for a major short circuit in our house in Kadavanthra.', review_date: '2026-04-15', avatar_url: null, is_published: true, source: 'Google' },
          { reviewer_name: 'Riya Mathew', rating: 5, review_text: 'Very reliable plumbers in Kochi. Fixed a concealed leak in our Kakkanad apartment using proper diagnostic sensors.', review_date: '2026-05-10', avatar_url: null, is_published: true, source: 'Google' },
        ];
        setReviews(fallbacks);
        localStorage.setItem('maria_reviews', JSON.stringify(fallbacks));
      }
    } else {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('review_date', { ascending: false });

        if (!error && data) {
          setReviews(data);
        }
      } catch (err) {
        console.error('Failed to load reviews from Supabase:', err);
      }
    }
    setLoading(false);
  };

  const handleTogglePublish = async (review: Review) => {
    const nextPublished = !review.is_published;
    if (isSandbox) {
      const updated = reviews.map((r) =>
        r.id === review.id || (r.reviewer_name === review.reviewer_name && r.review_text === review.review_text)
          ? { ...r, is_published: nextPublished }
          : r
      );
      setReviews(updated);
      localStorage.setItem('maria_reviews', JSON.stringify(updated));
      alertSystem(`Review ${nextPublished ? 'published' : 'unpublished'} successfully in sandbox!`, 'success');
    } else {
      const { error } = await supabase
        .from('reviews')
        .update({ is_published: nextPublished })
        .eq('id', review.id);

      if (error) {
        alertSystem(`Failed to toggle visibility: ${error.message}`, 'error');
      } else {
        alertSystem(`Review successfully ${nextPublished ? 'published' : 'unpublished'}!`, 'success');
        loadReviews();
      }
    }
  };

  const handleDeleteReview = async (review: Review) => {
    if (!confirm(`Are you sure you want to delete the review by "${review.reviewer_name}"?`)) return;

    if (isSandbox) {
      const updated = reviews.filter(
        (r) => !(r.reviewer_name === review.reviewer_name && r.review_text === review.review_text)
      );
      setReviews(updated);
      localStorage.setItem('maria_reviews', JSON.stringify(updated));
      alertSystem('Review removed from sandbox storage.', 'success');
    } else {
      const { error } = await supabase.from('reviews').delete().eq('id', review.id);
      if (error) {
        alertSystem(`Failed to delete review: ${error.message}`, 'error');
      } else {
        alertSystem('Review successfully deleted!', 'success');
        loadReviews();
      }
    }
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewEdit?.reviewer_name || !activeReviewEdit?.review_text || !activeReviewEdit?.rating) {
      alertSystem('Please fill in Reviewer Name, Rating, and Review Text.', 'error');
      return;
    }

    setSubmitting(true);
    const formValues: Review = {
      reviewer_name: activeReviewEdit.reviewer_name,
      rating: activeReviewEdit.rating,
      review_text: activeReviewEdit.review_text,
      review_date: activeReviewEdit.review_date || new Date().toISOString().split('T')[0],
      avatar_url: activeReviewEdit.avatar_url || null,
      is_published: activeReviewEdit.is_published !== undefined ? activeReviewEdit.is_published : true,
      source: activeReviewEdit.source || 'Google',
    };

    if (isSandbox) {
      let updated: Review[] = [];
      if (activeReviewEdit.id) {
        updated = reviews.map((r) => (r.id === activeReviewEdit.id ? { ...r, ...formValues } : r));
      } else {
        const newR = {
          ...formValues,
          id: Math.random().toString(36).substring(2, 9),
        };
        updated = [newR, ...reviews];
      }
      setReviews(updated);
      localStorage.setItem('maria_reviews', JSON.stringify(updated));
      alertSystem('Review successfully saved in sandbox cache.', 'success');
      setActiveReviewEdit(null);
    } else {
      let res;
      if (activeReviewEdit.id) {
        res = await supabase.from('reviews').update(formValues).eq('id', activeReviewEdit.id);
      } else {
        res = await supabase.from('reviews').insert([formValues]);
      }

      if (res.error) {
        alertSystem(`Database Save Failed: ${res.error.message}`, 'error');
      } else {
        alertSystem('Customer review successfully saved!', 'success');
        loadReviews();
        setActiveReviewEdit(null);
      }
    }
    setSubmitting(false);
  };

  // Quick manual paste helper: parses reviewer name and text if copied cleanly,
  // or simply puts the entire text inside the text area for easy manual allocation.
  const handleQuickPasteImport = () => {
    if (!pasteContent.trim()) {
      alertSystem('Please paste review text first.', 'error');
      return;
    }

    // Try to auto-parse standard Google copy: "Reviewer Name\nLocal Guide • 12 reviews\n***\na year ago\nReview text body here..."
    const lines = pasteContent.split('\n').map((l) => l.trim()).filter(Boolean);
    
    let parsedName = '';
    let parsedText = '';
    let parsedRating = 5; // default

    if (lines.length >= 2) {
      // Very basic heuristics
      if (lines[0].length < 40 && !lines[0].toLowerCase().includes('star') && !lines[0].includes('★')) {
        parsedName = lines[0];
        // If second line contains guides/reviews keywords, third/fourth line is usually text
        if (lines[1].toLowerCase().includes('guide') || lines[1].toLowerCase().includes('review')) {
          const bodyLines = lines.slice(2);
          // filter out "a week ago", "2 months ago", stars lines
          const cleanBody = bodyLines.filter(
            (line) =>
              !line.toLowerCase().includes('ago') &&
              !line.toLowerCase().includes('star') &&
              !line.includes('★') &&
              !line.toLowerCase().includes('translated by google')
          );
          parsedText = cleanBody.join('\n');
        } else {
          parsedText = lines.slice(1).join('\n');
        }
      } else {
        parsedText = lines.join('\n');
      }
    } else {
      parsedText = pasteContent;
    }

    setActiveReviewEdit({
      reviewer_name: parsedName || '',
      review_text: parsedText || '',
      rating: parsedRating,
      review_date: new Date().toISOString().split('T')[0],
      source: 'Google',
      is_published: true,
    });

    setPasteContent('');
    alertSystem('Quick imported review text. Please review details and save.', 'info');
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
      
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-outline-variant/10 pb-5 gap-4">
        <div>
          <h2 className="text-lg font-bold text-on-background flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">rate_review</span>
            Google Reviews Manager
          </h2>
          <p className="text-secondary text-xs mt-0.5">
            Manually import customer reviews from Google to highlight authentic customer satisfaction.
          </p>
        </div>
        <button
          onClick={() =>
            setActiveReviewEdit({
              reviewer_name: '',
              review_text: '',
              rating: 5,
              review_date: new Date().toISOString().split('T')[0],
              source: 'Google',
              is_published: true,
            })
          }
          className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-sm spring-hover transition-all flex items-center gap-1 select-none"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Import Manually
        </button>
      </div>

      {/* Manual Paste Box Container */}
      {!activeReviewEdit && (
        <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/15 space-y-3">
          <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">content_paste</span>
            Quick Copy-Paste Review Importer (Free)
          </h4>
          <p className="text-[11px] text-secondary leading-relaxed">
            Open your Google Business reviews, copy the reviewer name &amp; text body, paste it below, and click parse to load it into the editor instantly.
          </p>
          <div className="flex gap-3">
            <textarea
              value={pasteContent}
              onChange={(e) => setPasteContent(e.target.value)}
              placeholder="Paste Google review text here..."
              rows={3}
              className="grow p-3 bg-white border border-outline-variant/30 rounded-xl text-xs focus:outline-primary placeholder-secondary resize-none"
            />
            <button
              onClick={handleQuickPasteImport}
              className="px-4 bg-surface hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary text-primary text-xs font-extrabold rounded-xl transition-all flex flex-col justify-center items-center gap-1 min-w-[80px] select-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">auto_fix</span>
              Parse Text
            </button>
          </div>
        </div>
      )}

      {/* Editor Modal / Form */}
      {activeReviewEdit && (
        <form onSubmit={handleSaveReview} className="bg-surface-container-low p-6 rounded-2xl border border-primary/20 space-y-4">
          <h3 className="font-bold text-sm text-on-background flex items-center gap-1 border-b border-outline-variant/10 pb-2">
            <span className="material-symbols-outlined text-primary text-base">edit_square</span>
            {activeReviewEdit.id ? 'Edit Review Details' : 'Import Google Review'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-secondary">Reviewer Name *</label>
              <input
                type="text"
                required
                value={activeReviewEdit.reviewer_name || ''}
                onChange={(e) => setActiveReviewEdit({ ...activeReviewEdit, reviewer_name: e.target.value })}
                placeholder="e.g. Ananthakrishnan G."
                className="w-full p-2.5 bg-white border border-outline-variant/30 rounded-xl text-xs focus:outline-primary text-on-background"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-secondary">Star Rating *</label>
              <select
                value={activeReviewEdit.rating || 5}
                onChange={(e) => setActiveReviewEdit({ ...activeReviewEdit, rating: Number(e.target.value) })}
                className="w-full p-2.5 bg-white border border-outline-variant/30 rounded-xl text-xs focus:outline-primary text-on-background font-bold"
              >
                <option value="5">★★★★★ (5 Stars)</option>
                <option value="4">★★★★☆ (4 Stars)</option>
                <option value="3">★★★☆☆ (3 Stars)</option>
                <option value="2">★★☆☆☆ (2 Stars)</option>
                <option value="1">★☆☆☆☆ (1 Star)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-secondary">Review Date *</label>
              <input
                type="date"
                required
                value={activeReviewEdit.review_date || new Date().toISOString().split('T')[0]}
                onChange={(e) => setActiveReviewEdit({ ...activeReviewEdit, review_date: e.target.value })}
                className="w-full p-2.5 bg-white border border-outline-variant/30 rounded-xl text-xs focus:outline-primary text-on-background font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-secondary">Source Platform</label>
              <input
                type="text"
                value={activeReviewEdit.source || 'Google'}
                onChange={(e) => setActiveReviewEdit({ ...activeReviewEdit, source: e.target.value })}
                className="w-full p-2.5 bg-white border border-outline-variant/30 rounded-xl text-xs focus:outline-primary text-on-background"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase text-secondary">Review Text Body *</label>
            <textarea
              required
              rows={4}
              value={activeReviewEdit.review_text || ''}
              onChange={(e) => setActiveReviewEdit({ ...activeReviewEdit, review_text: e.target.value })}
              placeholder="Paste exact review feedback text here..."
              className="w-full p-3 bg-white border border-outline-variant/30 rounded-xl text-xs focus:outline-primary text-on-background leading-relaxed placeholder-secondary"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_published_chk"
                checked={activeReviewEdit.is_published !== false}
                onChange={(e) => setActiveReviewEdit({ ...activeReviewEdit, is_published: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
              />
              <label htmlFor="is_published_chk" className="text-xs text-on-background font-bold select-none cursor-pointer">
                Publish immediately on the website
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveReviewEdit(null)}
                className="px-4 py-2 border border-outline-variant/30 bg-white hover:bg-surface text-secondary text-xs font-bold rounded-xl transition-all select-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50 select-none cursor-pointer"
              >
                {submitting ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Review List Grid */}
      <div className="space-y-4 pt-2">
        <h3 className="font-extrabold text-[10px] uppercase tracking-wider text-secondary">
          Imported Customer Reviews ({reviews.length})
        </h3>
        
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2" />
            <p className="text-xs text-secondary font-bold">Synchronizing client reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-outline-variant/20 rounded-2xl">
            <span className="material-symbols-outlined text-secondary text-4xl mb-2">rate_review</span>
            <p className="text-xs text-secondary font-bold">No reviews imported yet. Copy-paste your first review above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
              >
                <div className="space-y-1.5 grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-on-background leading-none">
                      {rev.reviewer_name}
                    </h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[12px] sm:text-[14px]"
                          style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full select-none">
                      {rev.source}
                    </span>
                    <span className="text-[9px] text-secondary font-bold select-none">
                      {rev.review_date}
                    </span>
                  </div>
                  <p className="text-secondary text-xs leading-relaxed max-w-2xl italic">
                    "{rev.review_text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  {/* Publish Switch Toggle */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-secondary">Visible</span>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(rev)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        rev.is_published ? 'bg-tertiary' : 'bg-outline-variant'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          rev.is_published ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setActiveReviewEdit(rev)}
                      className="p-2 bg-white border border-outline-variant/30 hover:border-primary text-secondary hover:text-primary rounded-lg text-xs font-bold flex items-center cursor-pointer"
                      title="Edit Review Details"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteReview(rev)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center cursor-pointer"
                      title="Delete Review"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
