import React from 'react';
import { Sparkles, Award, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { IMAGES, FALLBACK_IMAGES } from '../data/riadData';

interface IntroductionProps {
  currentLang: Language;
}

export const Introduction: React.FC<IntroductionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <section
      id="introduction"
      className="relative py-24 sm:py-32 bg-[#0c0f12] text-[#f5f0ea] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Delicate background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cinematic Visual Presentation */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl group">
              <img
                src={IMAGES.heroCourtyard}
                alt="Patio traditionnel du Riad SDC à Fès"
                className="w-full h-[480px] sm:h-[580px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const fb = FALLBACK_IMAGES.courtyard;
                  if (e.currentTarget.src !== fb) {
                    e.currentTarget.src = fb;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Inset Decorative Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#c5a059]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      Patrimoine Séculaire Restauré
                    </h4>
                    <p className="text-xs text-stone-300">
                      Maîtres artisans maâlems de la médina de Fès
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inset Secondary Visual Accent */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-44 h-44 rounded-xl overflow-hidden border-2 border-[#c5a059]/40 shadow-2xl">
              <img
                src={IMAGES.suiteZellige}
                alt="Détail du zellige fassi"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const fb = FALLBACK_IMAGES.suiteZellige;
                  if (e.currentTarget.src !== fb) {
                    e.currentTarget.src = fb;
                  }
                }}
              />
            </div>
          </div>

          {/* Right Column: Editorial Text & Refined Stats */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium block">
                {t.intro.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight">
                {t.intro.title}
              </h2>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t.intro.description1}
            </p>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              {t.intro.description2}
            </p>

            {/* Editorial Quote */}
            <div className="py-4 my-2 border-y border-stone-800">
              <p className="font-serif-luxury italic text-stone-300 text-base sm:text-lg">
                {t.intro.quote}
              </p>
            </div>

            {/* Refined Statistics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="block font-serif-luxury text-2xl sm:text-3xl text-[#c5a059] font-medium tabular-nums">
                  8
                </span>
                <span className="text-xs text-stone-400 mt-1 block">
                  {t.intro.stats.rooms}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="block font-serif-luxury text-2xl sm:text-3xl text-[#c5a059] font-medium tabular-nums">
                  4
                </span>
                <span className="text-xs text-stone-400 mt-1 block">
                  {t.intro.stats.suites}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="block font-serif-luxury text-2xl sm:text-3xl text-[#c5a059] font-medium">
                  100%
                </span>
                <span className="text-xs text-stone-400 mt-1 block">
                  {t.intro.stats.authenticity}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="block font-serif-luxury text-2xl sm:text-3xl text-[#c5a059] font-medium">
                  UNESCO
                </span>
                <span className="text-xs text-stone-400 mt-1 block">
                  {t.intro.stats.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
