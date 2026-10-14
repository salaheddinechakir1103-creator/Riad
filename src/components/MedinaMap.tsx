import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Compass, Info, CheckCircle2 } from 'lucide-react';
import { Language, Landmark } from '../types';
import { translations } from '../data/translations';
import { MEDINA_LANDMARKS } from '../data/riadData';

interface MedinaMapProps {
  currentLang: Language;
}

export const MedinaMap: React.FC<MedinaMapProps> = ({ currentLang }) => {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark>(MEDINA_LANDMARKS[0]);
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <section
      id="medina"
      className="relative py-24 sm:py-32 bg-[#0c0f12] text-[#f5f0ea] border-t border-stone-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            {t.medina.tagline}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight mb-4">
            {t.medina.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.medina.subtitle}
          </p>
        </div>

        {/* Interactive Map Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map Graphic with Coordinate Hotspots */}
          <div className="lg:col-span-7 bg-[#101418] rounded-2xl border border-stone-800 p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Info Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-800/80 text-xs text-stone-400 z-10">
              <span className="flex items-center gap-1.5 font-medium text-stone-300">
                <Compass className="w-4 h-4 text-[#c5a059]" />
                <span>Carte interactive de Fès El-Bali (UNESCO)</span>
              </span>
              <span className="hidden sm:inline text-stone-500">
                9 000 ruelles piétonnes
              </span>
            </div>

            {/* Map Canvas Visual (Stylized Parchment & Geometric Medina Alleys) */}
            <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[450px] my-3 sm:my-4 rounded-xl bg-[#090b0d] border border-stone-800/80 overflow-hidden flex items-center justify-center">
              {/* Medieval Medina Alleys Grid Vector Overlay */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="medinaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="#c5a059"
                      strokeWidth="0.5"
                    />
                    <circle cx="30" cy="30" r="1.5" fill="#c5a059" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#medinaGrid)" />
                {/* Winding Oued Fès river path */}
                <path
                  d="M 0 180 Q 150 120 300 240 T 600 200 T 900 320"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
              </svg>

              {/* Riad SDC Star Pin (Anchor Location) */}
              <div
                className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                style={{ left: '28%', top: '48%' }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-[#c5a059]/20 animate-ping" />
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] border-2 border-black flex items-center justify-center shadow-lg">
                    <span className="text-[9px] font-bold text-black">SDC</span>
                  </div>
                </div>
                <span className="mt-1 px-2 py-0.5 rounded bg-black/85 border border-[#c5a059] text-[10px] font-semibold text-[#c5a059] whitespace-nowrap shadow-md">
                  Riad SDC
                </span>
              </div>

              {/* Landmark Pins */}
              {MEDINA_LANDMARKS.map((landmark) => {
                const isSelected = selectedLandmark.id === landmark.id;
                return (
                  <button
                    key={landmark.id}
                    type="button"
                    onClick={() => setSelectedLandmark(landmark)}
                    className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all"
                    style={{
                      left: `${landmark.coordinates.x}%`,
                      top: `${landmark.coordinates.y}%`,
                    }}
                    aria-label={landmark.name[currentLang]}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-emerald-500 scale-125 border-2 border-white shadow-lg'
                          : 'bg-stone-800 border border-stone-600 group-hover:bg-[#c5a059] group-hover:scale-110'
                      }`}
                    >
                      <MapPin
                        className={`w-3 h-3 ${
                          isSelected
                            ? 'text-white'
                            : 'text-stone-300 group-hover:text-black'
                        }`}
                      />
                    </div>
                    <span
                      className={`mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm transition-colors whitespace-nowrap hidden sm:inline-block ${
                        isSelected
                          ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
                          : 'bg-black/60 text-stone-300 border border-white/10 group-hover:text-white'
                      }`}
                    >
                      {landmark.name[currentLang].split('(')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Tip Strip */}
            <div className="flex items-center gap-2 pt-2 text-xs text-stone-400">
              <Info className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>{t.medina.interactiveTip}</span>
            </div>
          </div>

          {/* Right Column: Active Landmark Spotlight Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-stone-900/60 rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium">
                  {selectedLandmark.category[currentLang]}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-stone-300 font-mono bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{selectedLandmark.walkingTime}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury text-stone-100">
                  {selectedLandmark.name[currentLang]}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed mt-4">
                  {selectedLandmark.description[currentLang]}
                </p>
              </div>

              {/* Riad Guest Advice / Highlight */}
              <div className="p-4 rounded-xl bg-black/40 border border-stone-800/80 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Conseil pour les hôtes du Riad
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {selectedLandmark.highlight}
                </p>
              </div>
            </div>

            {/* Quick Landmark Selector Buttons */}
            <div className="pt-6 border-t border-stone-800 mt-6">
              <span className="text-xs uppercase tracking-wider text-stone-500 block mb-2.5">
                Explorer d’autres lieux phares
              </span>
              <div className="flex flex-wrap gap-2">
                {MEDINA_LANDMARKS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedLandmark(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedLandmark.id === item.id
                        ? 'bg-[#c5a059] text-black font-semibold'
                        : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700 hover:text-white'
                    }`}
                  >
                    {item.name[currentLang].split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
