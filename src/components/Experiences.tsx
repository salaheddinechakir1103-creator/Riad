import React from 'react';
import { Clock, Utensils, Sparkles, ChevronRight } from 'lucide-react';
import { Experience, Language } from '../types';
import { translations } from '../data/translations';
import { EXPERIENCES, FALLBACK_IMAGES } from '../data/riadData';

interface ExperiencesProps {
  currentLang: Language;
  onSelectExperience: (title: string) => void;
  onOpenGastronomy: () => void;
  onOpenSpa: () => void;
}

export const Experiences: React.FC<ExperiencesProps> = ({
  currentLang,
  onSelectExperience,
  onOpenGastronomy,
  onOpenSpa,
}) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <section
      id="experiences"
      className="relative py-24 sm:py-32 bg-[#0a0d10] text-[#f5f0ea] border-t border-stone-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
              {t.experiences.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight">
              {t.experiences.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onOpenGastronomy}
              className="px-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700/80 hover:border-[#c5a059] text-xs font-semibold text-stone-200 hover:text-[#c5a059] flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>
                {currentLang === 'fr'
                  ? 'La Carte Dîner Gastronomique'
                  : currentLang === 'ar'
                  ? 'قائمة عشاء القصر'
                  : 'Royal Dining Menu'}
              </span>
            </button>
            <button
              type="button"
              onClick={onOpenSpa}
              className="px-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700/80 hover:border-[#c5a059] text-xs font-semibold text-stone-200 hover:text-[#c5a059] flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>
                {currentLang === 'fr'
                  ? 'Le Menu Hammam & Spa'
                  : currentLang === 'ar'
                  ? 'طقوس الحمام والسبا'
                  : 'Hammam & Spa Sanctuary'}
              </span>
            </button>
          </div>
        </div>

        {/* 6 Cards Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="group rounded-2xl overflow-hidden bg-stone-900/40 border border-stone-800 hover:border-[#c5a059]/50 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-950">
                <img
                  src={exp.image}
                  alt={exp.title[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fb = FALLBACK_IMAGES.courtyard;
                    if (e.currentTarget.src !== fb) {
                      e.currentTarget.src = fb;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="text-[11px] uppercase tracking-widest text-stone-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium">
                    {exp.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs text-stone-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs text-[#c5a059] block font-medium mb-1">
                    {exp.subtitle[currentLang]}
                  </span>
                  <h3 className="text-xl font-serif-luxury text-stone-100 group-hover:text-[#c5a059] transition-colors">
                    {exp.title[currentLang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-2.5 leading-relaxed">
                    {exp.description[currentLang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectExperience(exp.title[currentLang])}
                    className="text-xs uppercase tracking-wider font-semibold text-[#c5a059] hover:text-[#e6c888] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{t.experiences.bookExp}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {exp.tag === 'Bien-être' && (
                    <button
                      type="button"
                      onClick={onOpenSpa}
                      className="text-xs text-[#c5a059] hover:text-[#e6c888] font-medium transition-colors cursor-pointer"
                    >
                      {currentLang === 'fr' ? 'Détails des soins →' : currentLang === 'ar' ? 'تفاصيل العلاجات ←' : 'Spa treatments →'}
                    </button>
                  )}

                  {(exp.tag === 'Gastronomie' || exp.tag === 'Culinaire') && (
                    <button
                      type="button"
                      onClick={onOpenGastronomy}
                      className="text-xs text-[#c5a059] hover:text-[#e6c888] font-medium transition-colors cursor-pointer"
                    >
                      {currentLang === 'fr' ? 'Détails du menu →' : currentLang === 'ar' ? 'تفاصيل القائمة ←' : 'Dining menu →'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
