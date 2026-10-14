import React, { useEffect, useState } from 'react';
import { ArrowDown, Calendar, Compass } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { IMAGES, FALLBACK_IMAGES } from '../data/riadData';

interface HeroProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenBooking }) => {
  const [scrollY, setScrollY] = useState(0);
  const [heroImgSrc, setHeroImgSrc] = useState(IMAGES.heroCourtyard);
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Cinematic Image with Parallax & Dark Scrim */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] transition-transform duration-100 ease-out will-change-transform overflow-hidden pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.28}px) scale(1.04)`,
        }}
        aria-hidden="true"
      >
        <img
          src={heroImgSrc}
          alt="Riad SDC Patio & Courtyard"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          onError={() => {
            if (heroImgSrc !== FALLBACK_IMAGES.courtyard) {
              setHeroImgSrc(FALLBACK_IMAGES.courtyard);
            }
          }}
        />
      </div>

      {/* Cinematic Dark Vignette & Measured Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e10] via-black/55 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/85 pointer-events-none" />

      {/* Subtle Moroccan geometric star watermark backdrop */}
      <div className="absolute inset-0 bg-moroccan-pattern opacity-25 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-32 pb-16">
        {/* Subtle Luxury Kicker */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/55 border border-[#c5a059]/30 backdrop-blur-md mb-4 sm:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#e6c888] font-medium">
            Fès El-Bali • Fondé en 1894
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
        </div>

        {/* Main Brand Title */}
        <h1 className="font-display-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-[#f5f0ea] tracking-wider mb-3 sm:mb-4 drop-shadow-lg">
          {t.hero.name}
        </h1>

        {/* Headline */}
        <h2 className="font-serif-luxury text-base sm:text-xl md:text-2xl lg:text-3xl italic text-[#e8ded1] max-w-3xl mx-auto mb-4 sm:mb-6 drop-shadow-md font-light leading-snug px-2">
          « {t.hero.title} »
        </h2>

        {/* Subtext */}
        <p className="text-xs sm:text-sm md:text-base text-stone-300/90 max-w-2xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed drop-shadow px-2">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-2">
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-95"
          >
            <Calendar className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
            <span>{t.hero.ctaBook}</span>
          </button>

          <a
            href="#le-riad"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('le-riad');
              if (el) {
                const navOffset = 76;
                const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-[#f5f0ea] hover:text-[#c5a059] font-medium text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>{t.hero.ctaDiscover}</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-auto">
        <a
          href="#introduction"
          className="group flex flex-col items-center text-xs tracking-widest uppercase text-stone-400 hover:text-[#c5a059] transition-colors"
          aria-label="Faire défiler"
        >
          <span className="mb-2 font-medium">{t.hero.explore}</span>
          <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#c5a059] flex items-center justify-center transition-colors animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </section>
  );
};
