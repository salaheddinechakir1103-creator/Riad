import React, { useState, useEffect } from 'react';
import { Language, Currency, Room, Reservation } from './types';
import { ROOMS, INITIAL_RESERVATIONS } from './data/riadData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { TheRiad } from './components/TheRiad';
import { Rooms } from './components/Rooms';
import { Experiences } from './components/Experiences';
import { Architecture3D } from './components/Architecture3D';
import { MedinaMap } from './components/MedinaMap';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { GastronomyModal } from './components/GastronomyModal';
import { SpaModal } from './components/SpaModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [preselectedRoomId, setPreselectedRoomId] = useState<string | undefined>(undefined);

  // Dynamic suites inventory state (can be edited via Admin Portal)
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('dar_rooms_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ROOMS;
  });

  // Dynamic reservations state (shared between customer booking form and admin portal)
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('dar_reservations_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_RESERVATIONS as unknown as Reservation[];
  });

  // Modal states
  const [adminOpen, setAdminOpen] = useState(false);
  const [gastronomyOpen, setGastronomyOpen] = useState(false);
  const [spaOpen, setSpaOpen] = useState(false);

  // Sync rooms & reservations to localStorage
  const handleUpdateRooms = (updatedRooms: Room[]) => {
    setRooms(updatedRooms);
    try {
      localStorage.setItem('dar_rooms_data', JSON.stringify(updatedRooms));
    } catch {
      // ignore
    }
  };

  const handleUpdateReservations = (updatedRes: Reservation[]) => {
    setReservations(updatedRes);
    try {
      localStorage.setItem('dar_reservations_data', JSON.stringify(updatedRes));
    } catch {
      // ignore
    }
  };

  const handleNewReservation = (newRes: Reservation) => {
    const updated = [newRes, ...reservations];
    setReservations(updated);
    try {
      localStorage.setItem('dar_reservations_data', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Sync html lang and dir attribute for Arabic RTL support
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const scrollToBooking = (roomId?: string) => {
    if (roomId) {
      setPreselectedRoomId(roomId);
    }
    const bookingEl = document.getElementById('reservation');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectExperience = (expTitle: string) => {
    scrollToBooking();
  };

  return (
    <div
      className={`min-h-screen bg-[#0a0d10] text-[#f5f0ea] selection:bg-[#c5a059] selection:text-black ${
        currentLang === 'ar' ? 'font-arabic-luxury' : ''
      }`}
    >
      {/* 1. Transparent Navbar with scroll blur, audio synthesizer, currency switcher & admin portal trigger */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenBooking={() => scrollToBooking()}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenGastronomy={() => setGastronomyOpen(true)}
        onOpenSpa={() => setSpaOpen(true)}
      />

      <main>
        {/* 2. Fullscreen Cinematic Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenBooking={() => scrollToBooking()}
        />

        {/* 3. Introduction Section (Asymmetric Editorial Layout) */}
        <Introduction currentLang={currentLang} />

        {/* 4. The Riad (Architecture, Courtyard, Fountain, Zellige, Cedar, Tadelakt) */}
        <TheRiad currentLang={currentLang} />

        {/* 5. Rooms & Suites (Dynamic rates, availability & detail modal) */}
        <Rooms
          currentLang={currentLang}
          currency={currency}
          rooms={rooms}
          onSelectForBooking={(roomId) => scrollToBooking(roomId)}
        />

        {/* 6. Experiences (Culinary, Hammam, Cooking Class, Medina Tour, Sunset Tea) */}
        <Experiences
          currentLang={currentLang}
          onSelectExperience={handleSelectExperience}
          onOpenGastronomy={() => setGastronomyOpen(true)}
          onOpenSpa={() => setSpaOpen(true)}
        />

        {/* 7. Interactive 3D Moroccan Architecture & Geometry (Three.js) */}
        <Architecture3D currentLang={currentLang} />

        {/* 8. Fes Medina Interactive Heritage Map */}
        <MedinaMap currentLang={currentLang} />

        {/* 9. Photo Gallery (Masonry & Lightbox) */}
        <Gallery currentLang={currentLang} />

        {/* 10. Verified Guest Reviews & Testimonials */}
        <Reviews currentLang={currentLang} />

        {/* 11. Premium Direct Booking Section with Live Price Calculation & Voucher */}
        <BookingSection
          currentLang={currentLang}
          currency={currency}
          rooms={rooms}
          preselectedRoomId={preselectedRoomId}
          onClearPreselected={() => setPreselectedRoomId(undefined)}
          onNewReservationCreated={handleNewReservation}
        />

        {/* 12. Contact, Medina Directions & Luggage Escort Concierge */}
        <ContactSection currentLang={currentLang} />
      </main>

      {/* 13. Luxury Dark Footer */}
      <Footer
        currentLang={currentLang}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenGastronomy={() => setGastronomyOpen(true)}
        onOpenSpa={() => setSpaOpen(true)}
      />

      {/* Admin Portal Modal (Passcode "riad2026" or "admin") */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        currentLang={currentLang}
        currency={currency}
        rooms={rooms}
        onUpdateRooms={handleUpdateRooms}
        reservations={reservations}
        onUpdateReservations={handleUpdateReservations}
      />

      {/* Gastronomy Royal Dining Menu Modal */}
      <GastronomyModal
        isOpen={gastronomyOpen}
        onClose={() => setGastronomyOpen(false)}
        currentLang={currentLang}
        currency={currency}
        onBookTable={() => scrollToBooking()}
      />

      {/* Hammam & Spa Treatment Menu Modal */}
      <SpaModal
        isOpen={spaOpen}
        onClose={() => setSpaOpen(false)}
        currentLang={currentLang}
        currency={currency}
        onBookSpa={() => scrollToBooking()}
      />
    </div>
  );
}
