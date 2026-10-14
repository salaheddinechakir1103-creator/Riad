import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Maximize } from 'lucide-react';
import { Language, GalleryItem } from '../types';
import { translations } from '../data/translations';
import { GALLERY_ITEMS, FALLBACK_IMAGES } from '../data/riadData';

interface GalleryProps {
  currentLang: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ currentLang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const categories = [
    { key: 'all', label: t.gallery.categories.all },
    { key: 'courtyard', label: t.gallery.categories.courtyard },
    { key: 'suites', label: t.gallery.categories.suites },
    { key: 'culinary', label: t.gallery.categories.culinary },
    { key: 'wellness', label: t.gallery.categories.wellness },
    { key: 'medina', label: t.gallery.categories.medina },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  return (
    <section
      id="galerie"
      className="relative py-24 sm:py-32 bg-[#090b0d] text-[#f5f0ea] border-t border-stone-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            {t.gallery.tagline}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Filter Controls (Functional button tabs) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#c5a059] text-black font-semibold shadow-md'
                  : 'bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800/80 cursor-pointer shadow-lg aspect-4/3"
            >
              <img
                src={item.image}
                alt={item.title[currentLang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  const fb = FALLBACK_IMAGES.courtyard;
                  if (e.currentTarget.src !== fb) {
                    e.currentTarget.src = fb;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Overlay Hover Details */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h4 className="text-sm font-serif-luxury text-stone-100 group-hover:text-[#c5a059] transition-colors">
                    {item.title[currentLang]}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:border-[#c5a059] group-hover:text-[#c5a059] transition-colors">
                  <Maximize className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
            aria-label="Fermer la galerie"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title[currentLang]}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-stone-800"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const fb = FALLBACK_IMAGES.courtyard;
                if (e.currentTarget.src !== fb) {
                  e.currentTarget.src = fb;
                }
              }}
            />
            <div className="mt-4 text-center">
              <h3 className="text-base sm:text-lg font-serif-luxury text-stone-200">
                {filteredItems[lightboxIndex].title[currentLang]}
              </h3>
              <p className="text-xs text-[#c5a059] mt-1 uppercase tracking-wider font-mono">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
