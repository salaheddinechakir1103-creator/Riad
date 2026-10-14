export type Language = 'fr' | 'en' | 'ar';
export type Currency = 'EUR' | 'MAD' | 'USD' | 'GBP';

export interface Room {
  id: string;
  name: string;
  titleKey: string;
  category: string;
  size: string;
  capacity: string;
  bed: string;
  pricePerNight: number;
  available: boolean;
  image: string;
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  amenities: string[];
  features: string[];
}

export interface Experience {
  id: string;
  title: {
    fr: string;
    en: string;
    ar: string;
  };
  subtitle: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  duration: string;
  image: string;
  tag: string;
}

export interface Landmark {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  category: {
    fr: string;
    en: string;
    ar: string;
  };
  walkingTime: string;
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  highlight: string;
  coordinates: { x: number; y: number };
}

export interface Hotspot {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  position: [number, number, number];
  title: {
    fr: string;
    en: string;
    ar: string;
  };
  details: {
    fr: string;
    en: string;
    ar: string;
  };
  craftsmanship: {
    fr: string;
    en: string;
    ar: string;
  };
}

export interface Review {
  id: string;
  guestName: string;
  origin: string;
  date: string;
  rating: number;
  suiteStayed: string;
  quote: {
    fr: string;
    en: string;
    ar: string;
  };
  status?: 'approved' | 'pending';
}

export interface GalleryItem {
  id: string;
  title: {
    fr: string;
    en: string;
    ar: string;
  };
  category: 'courtyard' | 'suites' | 'wellness' | 'culinary' | 'medina';
  image: string;
  aspect: 'landscape' | 'portrait' | 'square';
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  extras: {
    airportTransfer: boolean;
    hammamRitual: boolean;
    fassiDinner: boolean;
  };
  specialRequests?: string;
}

export type ReservationStatus = 'confirmed' | 'pending' | 'checked_in' | 'completed' | 'cancelled';

export interface FolioExtra {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface Reservation extends BookingData {
  id: string;
  reference: string;
  createdAt: string;
  status: ReservationStatus;
  totalPrice: number;
  paidAmount?: number;
  nights: number;
  roomName: string;
  currency: Currency;
  internalNotes?: string;
  porterAssigned?: string;
  arrivalGate?: string;
  flightNumber?: string;
  passportNumber?: string;
  nationality?: string;
  folioExtras?: FolioExtra[];
}

export interface MenuItem {
  id: string;
  category: 'starters' | 'pastillas' | 'tajines' | 'desserts' | 'teas';
  name: { fr: string; en: string; ar: string };
  desc: { fr: string; en: string; ar: string };
  price: number; // in EUR
  signature?: boolean;
}

export interface SpaTreatment {
  id: string;
  name: { fr: string; en: string; ar: string };
  desc: { fr: string; en: string; ar: string };
  duration: string;
  price: number;
  ritualType: 'hammam' | 'massage' | 'facial' | 'package';
}
