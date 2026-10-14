import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { REVIEWS } from '../data/riadData';

interface ReviewsProps {
  currentLang: Language;
}

export const Reviews: React.FC<ReviewsProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <section
      id="reviews"
      className="relative py-24 sm:py-32 bg-[#0c0f12] text-[#f5f0ea] border-t border-stone-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
              {t.reviews.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight">
              {t.reviews.title}
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-stone-900/60 border border-stone-800 px-4 py-2 rounded-xl">
            <div className="flex text-[#c5a059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
              ))}
            </div>
            <span className="text-xs text-stone-300 font-medium">
              {t.reviews.ratingNote}
            </span>
          </div>
        </div>

        {/* Testimonials Grid (2x2 layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-2xl bg-stone-900/40 border border-stone-800 hover:border-[#c5a059]/40 transition-colors shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* 5-star rating */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#c5a059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
                    ))}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                    {review.suiteStayed}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="font-serif-luxury italic text-stone-200 text-base sm:text-lg leading-relaxed">
                  « {review.quote[currentLang]} »
                </p>
              </div>

              {/* Guest Attribution (No pill boxes, clean unboxed text) */}
              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-medium text-stone-100">
                    {review.guestName}
                  </h4>
                  <p className="text-stone-400">{review.origin}</p>
                </div>
                <span className="text-stone-500 font-mono text-[11px]">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
