import React from 'react';
import { CheckCircle, Calendar, Users, MapPin, Phone, Mail, Download, X } from 'lucide-react';
import { BookingData, Language, Room } from '../types';
import { ROOMS } from '../data/riadData';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData | null;
  currentLang: Language;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  currentLang,
}) => {
  if (!isOpen || !bookingData) return null;

  const isRTL = currentLang === 'ar';
  const selectedRoom = ROOMS.find((r) => r.id === bookingData.roomId) || ROOMS[0];

  // Calculate nights
  const checkInDate = new Date(bookingData.checkIn);
  const checkOutDate = new Date(bookingData.checkOut);
  const diffTime = Math.max(1, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  let total = selectedRoom.pricePerNight * nights;
  if (bookingData.extras.airportTransfer) total += 75;
  if (bookingData.extras.hammamRitual) total += 120;
  if (bookingData.extras.fassiDinner) total += 90;

  const bookingRef = `DA-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-2xl bg-[#0f1317] border border-[#c5a059]/40 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-[#f5f0ea]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confirmation Header */}
        <div className="text-center space-y-3 pb-6 border-b border-stone-800">
          <div className="w-14 h-14 rounded-full bg-[#c5a059]/20 border border-[#c5a059] mx-auto flex items-center justify-center text-[#c5a059]">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium block">
            Réservation Confirmée
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif-luxury text-white">
            Bienvenue au Riad SDC
          </h3>
          <p className="text-xs text-stone-400 font-mono">
            Référence du séjour : <span className="text-[#c5a059] font-bold">{bookingRef}</span>
          </p>
        </div>

        {/* Stay Summary Voucher */}
        <div className="py-6 space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <div>
              <span className="text-xs text-stone-400 block">Hébergement</span>
              <span className="font-serif-luxury text-base sm:text-lg text-[#f5f0ea] font-medium">
                {selectedRoom.name}
              </span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Séjour</span>
              <span className="text-xs sm:text-sm font-medium text-stone-200">
                {bookingData.checkIn} au {bookingData.checkOut} ({nights} nuit{nights > 1 ? 's' : ''})
              </span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Voyageurs</span>
              <span className="text-xs sm:text-sm font-medium text-stone-200">
                {bookingData.adults} Adulte{bookingData.adults > 1 ? 's' : ''}
                {bookingData.children > 0 ? `, ${bookingData.children} Enfant(s)` : ''}
              </span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Montant Total Estimé</span>
              <span className="font-serif-luxury text-base sm:text-lg text-[#c5a059] font-bold">
                {total} € TTC
              </span>
            </div>
          </div>

          {/* Guest Contact Recap */}
          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800 text-xs space-y-1.5">
            <div className="text-stone-300">
              <span className="text-stone-500">Titulaire :</span> {bookingData.guestName}
            </div>
            <div className="text-stone-300">
              <span className="text-stone-500">Email :</span> {bookingData.guestEmail}
            </div>
            <div className="text-stone-300">
              <span className="text-stone-500">Téléphone :</span> {bookingData.guestPhone}
            </div>
          </div>

          {/* Welcome Instructions */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed space-y-1">
            <span className="font-semibold text-emerald-300 block">
              Prise en charge à votre arrivée à Fès :
            </span>
            <p>
              Notre majordome prendra contact par WhatsApp ou téléphone 48h avant votre arrivée pour convenir de l’heure de rendez-vous à la porte de Bab Boujloud ou Bab Ziat. Le transport des bagages jusqu’au riad est offert.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#d8b46e] text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Fermer le voucher
          </button>
        </div>
      </div>
    </div>
  );
};
