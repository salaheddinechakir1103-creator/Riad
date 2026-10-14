import React, { useState, useEffect } from 'react';
import { Calendar, Users, Sparkles, Check, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { Language, BookingData, Currency, Room, Reservation } from '../types';
import { translations } from '../data/translations';
import { formatPrice, FALLBACK_IMAGES } from '../data/riadData';
import { BookingConfirmationModal } from './BookingConfirmationModal';

interface BookingSectionProps {
  currentLang: Language;
  currency: Currency;
  rooms: Room[];
  preselectedRoomId?: string;
  onClearPreselected?: () => void;
  onNewReservationCreated?: (res: Reservation) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  currentLang,
  currency,
  rooms,
  preselectedRoomId,
  onClearPreselected,
  onNewReservationCreated,
}) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  // Default dates: tomorrow to +3 days
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDefault = new Date();
  checkoutDefault.setDate(checkoutDefault.getDate() + 4);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(checkoutDefault));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomId, setRoomId] = useState(preselectedRoomId || rooms[0]?.id || 'suite-fassi');

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const [extras, setExtras] = useState({
    airportTransfer: false,
    hammamRitual: false,
    fassiDinner: false,
  });

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingData | null>(null);

  // Sync if preselectedRoomId changes from other components
  useEffect(() => {
    if (preselectedRoomId) {
      setRoomId(preselectedRoomId);
    }
  }, [preselectedRoomId]);

  const selectedRoom = rooms.find((r) => r.id === roomId) || rooms[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1);

  // Live estimate calculation in EUR
  let basePrice = (selectedRoom?.pricePerNight || 360) * nights;
  let extrasTotal = 0;
  if (extras.airportTransfer) extrasTotal += 75;
  if (extras.hammamRitual) extrasTotal += 120;
  if (extras.fassiDinner) extrasTotal += 90;
  const totalPriceEur = basePrice + extrasTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: BookingData = {
      checkIn,
      checkOut,
      adults,
      children,
      roomId,
      guestName: guestName.trim() || 'Hôte Privilège',
      guestEmail: guestEmail.trim() || 'contact@voyageur.com',
      guestPhone: guestPhone.trim() || '+212 6 00 00 00 00',
      extras,
    };

    const newRes: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      reference: `DA-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed',
      totalPrice: totalPriceEur,
      nights,
      roomName: selectedRoom.name,
      currency,
      porterAssigned: extras.airportTransfer ? 'Driss Maâlem' : 'Non assigné',
      arrivalGate: 'Bab Boujloud',
      internalNotes: 'Réservation directe via le site internet.',
    };

    if (onNewReservationCreated) {
      onNewReservationCreated(newRes);
    }

    setSubmittedData(data);
    setConfirmationOpen(true);
    if (onClearPreselected) onClearPreselected();
  };

  return (
    <section
      id="reservation"
      className="relative py-24 sm:py-32 bg-[#090b0d] text-[#f5f0ea] border-t border-stone-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            {t.booking.tagline}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight mb-4">
            {t.booking.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Booking Engine Container */}
        <div className="max-w-5xl mx-auto bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Primary Search Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Check-In */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                  {t.booking.checkIn}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>
              </div>

              {/* Check-Out */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                  {t.booking.checkOut}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>
              </div>

              {/* Guests (Adults & Children) */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                    {t.booking.adults}
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-[#c5a059]"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                    {t.booking.children}
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-[#c5a059]"
                  >
                    {[0, 1, 2, 3].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2">
                  {t.booking.roomType}
                </label>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-[#c5a059]"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id} disabled={!room.available}>
                      {room.name} ({formatPrice(room.pricePerNight, currency)}) {!room.available ? '— Complet' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Suite Quick Preview Strip */}
            {selectedRoom && (
              <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-16 h-16 rounded-lg object-cover border border-stone-800 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallbackMap: Record<string, string> = {
                        'suite-fassi': FALLBACK_IMAGES.suiteFassi,
                        'suite-zellige': FALLBACK_IMAGES.suiteZellige,
                        'suite-andalousie': FALLBACK_IMAGES.suiteAndalousie,
                        'chambre-al-batha': FALLBACK_IMAGES.chambreAlBatha,
                      };
                      const fb = fallbackMap[selectedRoom.id] || FALLBACK_IMAGES.suiteFassi;
                      if (e.currentTarget.src !== fb) {
                        e.currentTarget.src = fb;
                      }
                    }}
                  />
                  <div>
                    <h4 className="text-base font-serif-luxury text-stone-100 font-medium">
                      {selectedRoom.name} — {selectedRoom.category}
                    </h4>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {selectedRoom.size} • {selectedRoom.bed} • Vue patio & fontaine
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xl font-serif-luxury text-[#c5a059] font-semibold tabular-nums">
                    {formatPrice(selectedRoom.pricePerNight * nights, currency)}
                  </span>
                  <span className="text-xs text-stone-400 block">
                    pour {nights} nuit{nights > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Bespoke Extras Selection */}
            <div>
              <span className="block text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-3">
                {t.booking.extras}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-950/40 border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={extras.airportTransfer}
                    onChange={(e) =>
                      setExtras({ ...extras, airportTransfer: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#c5a059] focus:ring-[#c5a059]"
                  />
                  <div className="text-xs">
                    <span className="text-stone-200 font-medium block">
                      Transfert Aéroport Aller-Retour
                    </span>
                    <span className="text-stone-400">+{formatPrice(75, currency)} (Fès-Saïss)</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-950/40 border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={extras.hammamRitual}
                    onChange={(e) =>
                      setExtras({ ...extras, hammamRitual: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#c5a059] focus:ring-[#c5a059]"
                  />
                  <div className="text-xs">
                    <span className="text-stone-200 font-medium block">
                      Hammam & Soin Argan (2 pers.)
                    </span>
                    <span className="text-stone-400">+{formatPrice(120, currency)}</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-950/40 border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={extras.fassiDinner}
                    onChange={(e) =>
                      setExtras({ ...extras, fassiDinner: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#c5a059] focus:ring-[#c5a059]"
                  />
                  <div className="text-xs">
                    <span className="text-stone-200 font-medium block">
                      Dîner Gastronomique aux Bougies
                    </span>
                    <span className="text-stone-400">+{formatPrice(90, currency)} (2 pers.)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Guest Quick Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                  Nom & Prénom
                </label>
                <input
                  type="text"
                  placeholder="Ex. Sarah Connor"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                  Adresse Email
                </label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                  Téléphone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {/* Total Calculation & Action Submit Button */}
            <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wider text-stone-400">Total estimé :</span>
                  <span className="text-3xl font-serif-luxury text-[#c5a059] font-bold tabular-nums">
                    {formatPrice(totalPriceEur, currency)}
                  </span>
                  <span className="text-xs text-stone-500">TTC</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  Petit-déjeuner royal inclus • Accueil et porteur bagages offerts
                </p>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#c5a059] hover:bg-[#d8b46e] text-black font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl cursor-pointer"
              >
                {t.booking.submitBtn}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Voucher Modal */}
      <BookingConfirmationModal
        isOpen={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        bookingData={submittedData}
        currentLang={currentLang}
      />
    </section>
  );
};
