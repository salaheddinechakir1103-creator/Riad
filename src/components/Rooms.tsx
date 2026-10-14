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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
              {t.rooms.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight">
              {t.rooms.title}
            </h2>
          </div>
          <p className="text-stone-400 text-sm md:text-base max-w-md leading-relaxed">
            {t.rooms.subtitle}
          </p>
        </div>

        {/* Room Cards Grid (2x2 luxury layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl flex flex-col ${
                room.available
                  ? 'bg-stone-900/50 border-stone-800 hover:border-[#c5a059]/60'
                  : 'bg-stone-950/80 border-stone-800/60 opacity-80'
              }`}
            >
              {/* Card Image Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-950">
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

                {/* Category Pill Alternative */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#f5f0ea] bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-medium">
                    {room.category}
                  </span>
                  {!room.available && (
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-300 bg-amber-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-700/50">
                      Complet
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#c5a059]/40 text-right">
                  <span className="text-lg font-serif-luxury text-[#c5a059] font-semibold tabular-nums">
                    {formatPrice(room.pricePerNight, currency)}
                  </span>
                  <span className="text-[10px] text-stone-400 block -mt-0.5">
                    {t.rooms.perNight}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5">
                <div>
                  <h3 className="text-2xl font-serif-luxury text-stone-100 group-hover:text-[#c5a059] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {room.description[currentLang]}
                  </p>
                </div>

                {/* Specs Strip */}
                <div className="flex items-center gap-4 text-xs text-stone-400 pt-3 border-t border-stone-800/80">
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{room.size}</span>
                  </span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{room.capacity}</span>
                  </span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span className="flex items-center gap-1.5 truncate">
                    <Bed className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span className="truncate">{room.bed}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenRoom(room)}
                    className="text-xs uppercase tracking-wider font-semibold text-[#c5a059] hover:text-[#e6c888] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{t.rooms.discover}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    disabled={!room.available}
                    onClick={() => onSelectForBooking(room.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
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
