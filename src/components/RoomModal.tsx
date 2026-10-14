import React from 'react';
import { X, Check, Calendar, Users, Maximize2, Bed, Sparkles } from 'lucide-react';
import { Room, Language, Currency } from '../types';
import { translations } from '../data/translations';
import { formatPrice, FALLBACK_IMAGES } from '../data/riadData';

interface RoomModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForBooking: (roomId: string) => void;
  currentLang: Language;
  currency?: Currency;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  room,
  isOpen,
  onClose,
  onSelectForBooking,
  currentLang,
  currency = 'EUR',
}) => {
  if (!isOpen || !room) return null;

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-4xl bg-[#101317] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-black/70 text-stone-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Wrapper */}
        <div className="overflow-y-auto">
          {/* Modal Hero Visual */}
          <div className="relative h-56 sm:h-80 md:h-96 w-full overflow-hidden">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const fallbackMap: Record<string, string> = {
                  'suite-fassi': FALLBACK_IMAGES.suiteFassi,
                  'suite-zellige': FALLBACK_IMAGES.suiteZellige,
                  'suite-andalousie': FALLBACK_IMAGES.suiteAndalousie,
                  'chambre-al-batha': FALLBACK_IMAGES.chambreAlBatha,
                };
                const fb = fallbackMap[room.id] || FALLBACK_IMAGES.suiteFassi;
                if (e.currentTarget.src !== fb) {
                  e.currentTarget.src = fb;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101317] via-transparent to-black/40" />

            {/* Badge & Price Tag */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between flex-wrap gap-3">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium block mb-1">
                  {room.category}
                </span>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-serif-luxury text-white">
                  {room.name}
                </h3>
              </div>
              <div className="bg-black/70 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-[#c5a059]/40 text-right">
                <span className="text-lg sm:text-2xl font-serif-luxury text-[#c5a059] font-semibold tabular-nums">
                  {formatPrice(room.pricePerNight, currency)}
                </span>
                <span className="text-[10px] sm:text-xs text-stone-400 block">{t.rooms.perNight}</span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-8 space-y-6">
          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-center">
            <div className="flex flex-col items-center">
              <Maximize2 className="w-4 h-4 text-[#c5a059] mb-1" />
              <span className="text-xs text-stone-400">Superficie</span>
              <span className="text-xs sm:text-sm font-medium text-stone-200 mt-0.5">
                {room.size}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-4 h-4 text-[#c5a059] mb-1" />
              <span className="text-xs text-stone-400">Capacité</span>
              <span className="text-xs sm:text-sm font-medium text-stone-200 mt-0.5">
                {room.capacity}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Bed className="w-4 h-4 text-[#c5a059] mb-1" />
              <span className="text-xs text-stone-400">Literie</span>
              <span className="text-xs sm:text-sm font-medium text-stone-200 mt-0.5">
                {room.bed}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#c5a059] font-medium mb-2">
              L’Atmosphère
            </h4>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {room.description[currentLang]}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#c5a059] font-medium mb-3">
              {t.rooms.amenitiesLabel}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300"
                >
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-400">
              Annulation gratuite jusqu’à 7 jours avant le séjour
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-stone-700 text-stone-300 hover:text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectForBooking(room.id);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#d8b46e] text-black text-xs uppercase tracking-wider font-semibold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.rooms.bookThisRoom}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
