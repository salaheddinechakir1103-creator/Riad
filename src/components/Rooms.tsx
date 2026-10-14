import React, { useState } from 'react';
import { Maximize2, Users, Bed, ArrowRight, ShieldAlert } from 'lucide-react';
import { Room, Language, Currency } from '../types';
import { translations } from '../data/translations';
import { formatPrice, FALLBACK_IMAGES } from '../data/riadData';
import { RoomModal } from './RoomModal';

interface RoomsProps {
  currentLang: Language;
  currency: Currency;
  rooms: Room[];
  onSelectForBooking: (roomId: string) => void;
}

export const Rooms: React.FC<RoomsProps> = ({
  currentLang,
  currency,
  rooms,
  onSelectForBooking,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const handleOpenRoom = (room: Room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  return (
    <section
      id="suites"
      className="relative py-24 sm:py-32 bg-[#0c0f12] text-[#f5f0ea] border-t border-stone-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-3 sm:gap-6">
          <div className="max-w-2xl">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-1.5 sm:mb-3">
              {t.rooms.tagline}
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight">
              {t.rooms.title}
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
            {t.rooms.subtitle}
          </p>
        </div>

        {/* Room Cards Grid (2 columns on mobile and desktop) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:gap-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`group rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl flex flex-col ${
                room.available
                  ? 'bg-stone-900/50 border-stone-800 hover:border-[#c5a059]/60'
                  : 'bg-stone-950/80 border-stone-800/60 opacity-80'
              }`}
            >
              {/* Card Image Container */}
              <div className="relative h-40 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden bg-stone-950">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
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
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                {/* Category Pill */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[8px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#f5f0ea] bg-black/65 backdrop-blur-md px-1.5 py-0.5 sm:px-3 sm:py-1 rounded sm:rounded-md border border-white/10 font-medium">
                    {room.category}
                  </span>
                  {!room.available && (
                    <span className="text-[8px] sm:text-xs uppercase tracking-wider font-semibold text-amber-300 bg-amber-950/80 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md border border-amber-700/50">
                      Complet
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/80 backdrop-blur-md px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-md sm:rounded-lg border border-[#c5a059]/40 text-right">
                  <span className="text-xs sm:text-lg font-serif-luxury text-[#c5a059] font-semibold tabular-nums">
                    {formatPrice(room.pricePerNight, currency)}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-stone-400 block -mt-0.5">
                    {t.rooms.perNight}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-5 md:p-7 flex flex-col flex-1 justify-between space-y-3 sm:space-y-4 md:space-y-5">
                <div>
                  <h3 className="text-base sm:text-xl md:text-2xl font-serif-luxury text-stone-100 group-hover:text-[#c5a059] transition-colors leading-snug">
                    {room.name}
                  </h3>

                  <p className="text-[11px] sm:text-xs md:text-sm text-stone-400 mt-1 sm:mt-2 line-clamp-2 leading-relaxed">
                    {room.description[currentLang]}
                  </p>
                </div>

                {/* Specs Strip */}
                <div className="flex items-center gap-1 sm:gap-3 text-[9px] sm:text-xs text-stone-400 pt-2 sm:pt-3 border-t border-stone-800/80 overflow-hidden">
                  <span className="flex items-center gap-1 shrink-0">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c5a059]" />
                    <span>{room.size}</span>
                  </span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span className="flex items-center gap-1 shrink-0">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c5a059]" />
                    <span>{room.capacity}</span>
                  </span>
                  <span aria-hidden="true" className="text-stone-600 hidden sm:inline">·</span>
                  <span className="hidden sm:flex items-center gap-1 truncate">
                    <Bed className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span className="truncate">{room.bed}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-3 pt-1 sm:pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenRoom(room)}
                    className="text-[9px] sm:text-xs uppercase tracking-wider font-semibold text-[#c5a059] hover:text-[#e6c888] flex items-center gap-1 transition-colors cursor-pointer truncate"
                  >
                    <span className="truncate">{t.rooms.discover}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>

                  <button
                    type="button"
                    disabled={!room.available}
                    onClick={() => onSelectForBooking(room.id)}
                    className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-[9px] sm:text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                      room.available
                        ? 'bg-stone-800 hover:bg-[#c5a059] hover:text-black text-stone-200'
                        : 'bg-stone-900 text-stone-600 cursor-not-allowed'
                    }`}
                  >
                    {room.available ? t.nav.bookNow : 'Indisponible'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suite Detail Modal */}
      <RoomModal
        room={selectedRoom}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectForBooking={onSelectForBooking}
        currentLang={currentLang}
        currency={currency}
      />
    </section>
  );
};
