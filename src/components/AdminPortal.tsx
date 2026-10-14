import React, { useState } from 'react';
import {
  Lock,
  LogOut,
  Calendar,
  Users,
  CreditCard,
  Bed,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Plus,
  Download,
  Shield,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  X,
  FileText,
  DollarSign,
  TrendingUp,
  Filter,
  Printer,
  MessageSquare,
  Utensils,
  Eye,
  Check,
  RefreshCw,
  Car,
  ClipboardList,
  Coffee,
  Building,
  Key,
  Award,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { Reservation, Room, ReservationStatus, Language, Currency, FolioExtra } from '../types';
import { GASTRONOMY_MENU, SPA_TREATMENTS, formatPrice, REVIEWS } from '../data/riadData';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  currency: Currency;
  rooms: Room[];
  onUpdateRooms: (updated: Room[]) => void;
  reservations: Reservation[];
  onUpdateReservations: (updated: Reservation[]) => void;
}

type AdminSection =
  | 'dashboard'
  | 'reservations'
  | 'rack'
  | 'housekeeping'
  | 'concierge'
  | 'fb'
  | 'spa'
  | 'finances'
  | 'reviews'
  | 'settings';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  currentLang,
  currency,
  rooms,
  onUpdateRooms,
  reservations,
  onUpdateReservations,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('dar_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active navigation section
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [mobileModuleDrawerOpen, setMobileModuleDrawerOpen] = useState(false);

  // Search & Filters in reservations
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roomFilter, setRoomFilter] = useState<string>('all');

  // Modal: View / Edit specific reservation folio
  const [activeResModal, setActiveResModal] = useState<Reservation | null>(null);

  // Extra folio item form in modal
  const [newExtraDesc, setNewExtraDesc] = useState('');
  const [newExtraAmount, setNewExtraAmount] = useState<number>(30);

  // Modal: Printable Official Invoice
  const [invoiceRes, setInvoiceRes] = useState<Reservation | null>(null);

  // Modal: Printable Moroccan Police Card (Fiche Individuelle de Police)
  const [policeCardRes, setPoliceCardRes] = useState<Reservation | null>(null);

  // Modal: Create new manual booking
  const [newResModalOpen, setNewResModalOpen] = useState(false);
  const [newResData, setNewResData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    roomId: rooms[0]?.id || 'suite-fassi',
    adults: 2,
    children: 0,
    arrivalGate: 'Bab Boujloud',
    flightNumber: '',
    porterAssigned: 'Driss Maâlem',
    notes: '',
  });

  // Housekeeping room statuses state
  const [housekeeping, setHousekeeping] = useState<Record<string, { status: 'clean' | 'cleaning' | 'maintenance' | 'dirty'; staff: string; lastInspection: string }>>({
    'suite-fassi': { status: 'clean', staff: 'Fatima Zahra', lastInspection: 'Aujourd’hui 11:30' },
    'suite-zellige': { status: 'clean', staff: 'Malika', lastInspection: 'Aujourd’hui 10:45' },
    'suite-andalousie': { status: 'cleaning', staff: 'Khadija', lastInspection: 'En cours' },
    'chambre-al-batha': { status: 'clean', staff: 'Fatima Zahra', lastInspection: 'Aujourd’hui 09:15' },
  });

  // Inspection checklist state
  const [inspectionChecks, setInspectionChecks] = useState<Record<string, boolean>>({
    linens: true,
    rosePetals: true,
    orangeBlossom: true,
    mintTeaWelcome: true,
    waterPressure: true,
    airConditioning: true,
  });

  // F&B Menu items state
  const [dishesList, setDishesList] = useState(() => [
    ...GASTRONOMY_MENU.pastillas.map((d, i) => ({ ...d, id: `pas-${i}`, available: true, category: 'Pastillas' })),
    ...GASTRONOMY_MENU.tajines.map((d, i) => ({ ...d, id: `taj-${i}`, available: true, category: 'Tajines' })),
    ...GASTRONOMY_MENU.starters.map((d, i) => ({ ...d, id: `sta-${i}`, available: true, category: 'Entrées' })),
  ]);

  // Spa schedule appointments
  const [spaAppointments, setSpaAppointments] = useState([
    { id: 'spa-1', guest: 'Lady Eleanor Vance', treatment: 'Rituel Hammam Impérial', time: '16:00', therapist: 'Nezha', status: 'Confirmé' },
    { id: 'spa-2', guest: 'Marc & Sophie Laurent', treatment: 'Duo Massage Argan Précieux', time: '18:30', therapist: 'Saida & Nezha', status: 'Confirmé' },
  ]);

  // Riad settings
  const [riadSettings, setRiadSettings] = useState({
    hotelName: 'Riad SDC',
    directorName: 'Salaheddine Chakir',
    phone: '+212 5 35 74 08 21',
    whatsapp: '+212 6 61 23 45 67',
    email: 'direction@riadsdc.com',
    checkInTime: '15:00',
    checkOutTime: '12:00',
    cityTaxMAD: 25,
    currency: 'EUR',
    notes: 'Service voiturier et accueil aux portes de la médina assuré 24h/24.',
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'riad2026' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('dar_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dar_admin_auth');
    setPasscode('');
  };

  // Status changer
  const handleStatusChange = (resId: string, newStatus: ReservationStatus) => {
    const updated = reservations.map((r) =>
      r.id === resId ? { ...r, status: newStatus } : r
    );
    onUpdateReservations(updated);
    if (activeResModal && activeResModal.id === resId) {
      setActiveResModal({ ...activeResModal, status: newStatus });
    }
  };

  // Porter assignment
  const handlePorterChange = (resId: string, porter: string) => {
    const updated = reservations.map((r) =>
      r.id === resId ? { ...r, porterAssigned: porter } : r
    );
    onUpdateReservations(updated);
    if (activeResModal && activeResModal.id === resId) {
      setActiveResModal({ ...activeResModal, porterAssigned: porter });
    }
  };

  // Add extra charge to reservation folio
  const handleAddFolioExtra = (resId: string) => {
    if (!newExtraDesc.trim() || newExtraAmount <= 0) return;
    const extraItem: FolioExtra = {
      id: `ext-${Date.now()}`,
      description: newExtraDesc.trim(),
      amount: newExtraAmount,
      date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = reservations.map((r) => {
      if (r.id === resId) {
        const currentExtras = r.folioExtras || [];
        return {
          ...r,
          totalPrice: r.totalPrice + newExtraAmount,
          folioExtras: [...currentExtras, extraItem],
        };
      }
      return r;
    });

    onUpdateReservations(updated);
    if (activeResModal && activeResModal.id === resId) {
      const currentExtras = activeResModal.folioExtras || [];
      setActiveResModal({
        ...activeResModal,
        totalPrice: activeResModal.totalPrice + newExtraAmount,
        folioExtras: [...currentExtras, extraItem],
      });
    }
    setNewExtraDesc('');
    setNewExtraAmount(30);
  };

  // Room price adjustment
  const handlePriceChange = (roomId: string, newPrice: number) => {
    const updated = rooms.map((r) =>
      r.id === roomId ? { ...r, pricePerNight: Math.max(50, newPrice) } : r
    );
    onUpdateRooms(updated);
  };

  // Room availability toggle
  const handleAvailabilityToggle = (roomId: string) => {
    const updated = rooms.map((r) =>
      r.id === roomId ? { ...r, available: !r.available } : r
    );
    onUpdateRooms(updated);
  };

  // Toggle housekeeping status
  const handleCycleHousekeeping = (roomId: string) => {
    const current = housekeeping[roomId]?.status || 'clean';
    const next = current === 'clean' ? 'cleaning' : current === 'cleaning' ? 'maintenance' : 'clean';
    setHousekeeping({
      ...housekeeping,
      [roomId]: {
        ...housekeeping[roomId],
        status: next,
        lastInspection: next === 'clean' ? 'Vérifié à l’instant' : housekeeping[roomId]?.lastInspection,
      },
    });
  };

  // Create manual booking
  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoom = rooms.find((r) => r.id === newResData.roomId) || rooms[0];
    const checkInDate = new Date(newResData.checkIn);
    const checkOutDate = new Date(newResData.checkOut);
    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      reference: `DA-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      checkIn: newResData.checkIn,
      checkOut: newResData.checkOut,
      nights,
      adults: newResData.adults,
      children: newResData.children,
      roomId: targetRoom.id,
      roomName: targetRoom.name,
      guestName: newResData.guestName.trim() || 'Client Téléphonique',
      guestEmail: newResData.guestEmail.trim() || 'direct@riadsdc.com',
      guestPhone: newResData.guestPhone.trim() || '+212 5 35 74 08 21',
      status: 'confirmed',
      totalPrice: targetRoom.pricePerNight * nights,
      paidAmount: Math.round(targetRoom.pricePerNight * nights * 0.3), // 30% deposit
      currency: 'EUR',
      extras: { airportTransfer: true, hammamRitual: false, fassiDinner: false },
      arrivalGate: newResData.arrivalGate,
      flightNumber: newResData.flightNumber,
      porterAssigned: newResData.porterAssigned,
      internalNotes: newResData.notes,
      passportNumber: 'AB' + Math.floor(100000 + Math.random() * 900000),
      nationality: 'Française',
      folioExtras: [],
    };

    onUpdateReservations([newRes, ...reservations]);
    setNewResModalOpen(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'Reference,Guest Name,Email,Phone,Room,Check In,Check Out,Nights,Total Price (EUR),Status,Arrival Gate,Porter\n';
    const rows = reservations
      .map(
        (r) =>
          `"${r.reference}","${r.guestName}","${r.guestEmail}","${r.guestPhone}","${r.roomName}","${r.checkIn}","${r.checkOut}",${r.nights},${r.totalPrice},"${r.status}","${r.arrivalGate || 'Bab Boujloud'}","${r.porterAssigned || 'Non assigné'}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `manifeste_dar_al_andalous_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPIs
  const totalRevenue = reservations
    .filter((r) => r.status !== 'cancelled')
    .reduce((sum, r) => sum + r.totalPrice, 0);

  const activeStays = reservations.filter(
    (r) => r.status === 'confirmed' || r.status === 'checked_in'
  ).length;

  const totalNights = reservations.reduce((sum, r) => sum + (r.nights || 1), 0);
  const adr = Math.round(totalRevenue / Math.max(1, totalNights));
  const revpar = Math.round((adr * 0.87));

  // Filtered reservations
  const filteredReservations = reservations.filter((r) => {
    const matchesQuery =
      r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.roomName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesRoom = roomFilter === 'all' || r.roomId === roomFilter;
    return matchesQuery && matchesStatus && matchesRoom;
  });

  const modulesList: { id: AdminSection; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: TrendingUp },
    { id: 'reservations', label: 'Réservations', icon: Calendar, count: reservations.length },
    { id: 'rack', label: 'Suites & Tarifs', icon: Bed },
    { id: 'housekeeping', label: 'Gouvernance', icon: Sparkles },
    { id: 'concierge', label: 'Porteurs Médina', icon: MapPin },
    { id: 'fb', label: 'Restaurant', icon: Utensils },
    { id: 'spa', label: 'Hammam & Spa', icon: Coffee },
    { id: 'finances', label: 'Finances & Taxes', icon: DollarSign },
    { id: 'reviews', label: 'Avis Clients', icon: MessageSquare },
    { id: 'settings', label: 'Paramètres', icon: Building },
  ];

  const currentModuleInfo = modulesList.find((m) => m.id === currentSection) || modulesList[0];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#080b0e] h-[100dvh] w-full overflow-hidden sm:items-center sm:justify-center sm:p-3 md:p-6 sm:bg-black/92 sm:backdrop-blur-xl sm:overflow-y-auto">
      <div className="relative w-full h-full sm:h-auto sm:max-w-7xl bg-[#0b0e11] sm:border sm:border-stone-800 sm:rounded-2xl shadow-2xl flex flex-col sm:min-h-[90vh] sm:max-h-[94vh] overflow-hidden">
        {/* Top Header Bar (Full width, responsive) */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 border-b border-stone-800 bg-[#07090c] gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display-luxury text-xs sm:text-base font-semibold text-stone-100 truncate">
                  RIAD SDC — PMS PRO
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-mono shrink-0">
                  En Ligne
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 truncate">
                Fès El-Bali, Maroc • Direction & Réception
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs transition-colors cursor-pointer"
                title="Déconnexion"
              >
                <LogOut className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-stone-900 text-stone-400 hover:text-white border border-stone-800 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Security Login Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            <div className="w-full max-w-md bg-stone-900/70 border border-stone-800 rounded-2xl p-6 sm:p-8 text-center space-y-5 sm:space-y-6 shadow-2xl my-auto">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 mx-auto flex items-center justify-center text-[#c5a059]">
                <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-serif-luxury text-white font-semibold">
                  Accès Direction & Conciergerie
                </h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Portail centralisé de gestion des suites, réservations en direct, fiches de police officielles, gouvernance, finances et logistique médina.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Code d'accès administrateur"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setLoginError(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-center text-sm tracking-widest focus:outline-none focus:border-[#c5a059]"
                    autoFocus
                  />
                  {loginError && (
                    <span className="text-xs text-red-400 mt-1.5 block">
                      Code erroné. Veuillez réessayer ("riad2026" ou "admin").
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#c5a059] hover:bg-[#d8b46e] text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                >
                  Déverrouiller le PMS
                </button>
              </form>

              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-2">
                <p className="text-[11px] text-stone-500">Accès rapide pour évaluation :</p>
                <button
                  type="button"
                  onClick={() => {
                    setPasscode('riad2026');
                    setIsAuthenticated(true);
                    localStorage.setItem('dar_admin_auth', 'true');
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#c5a059]/20 hover:bg-[#c5a059]/30 text-[#c5a059] border border-[#c5a059]/50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Connexion Immédiate 1-Clic Démo
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Complete PMS Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* MOBILE ONLY: Quick Module Switcher & Horizontal Pills */}
            <div className="md:hidden bg-[#07090c] border-b border-stone-800/80 px-2 py-1.5 shrink-0">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <button
                  type="button"
                  onClick={() => setMobileModuleDrawerOpen(!mobileModuleDrawerOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059] text-xs font-semibold cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Module : {currentModuleInfo.label}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>

                <span className="text-[10px] text-stone-400 font-mono">
                  {filteredReservations.length} rés.
                </span>
              </div>

              {/* Horizontal Pill Bar */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {modulesList.map((m) => {
                  const Icon = m.icon;
                  const isActive = currentSection === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setCurrentSection(m.id);
                        setMobileModuleDrawerOpen(false);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#c5a059] text-black font-bold shadow-xs'
                          : 'bg-stone-900/90 text-stone-300 border border-stone-800'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{m.label}</span>
                      {m.count !== undefined && (
                        <span className={`text-[9px] px-1 rounded-full font-mono ${isActive ? 'bg-black/20 text-black' : 'bg-stone-800 text-stone-400'}`}>
                          {m.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Full Module Selector Drawer */}
              {mobileModuleDrawerOpen && (
                <div className="fixed inset-0 top-[102px] bg-black/90 backdrop-blur-md z-40 p-4 overflow-y-auto animate-fadeIn">
                  <div className="space-y-2 max-w-sm mx-auto">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                      <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                        Sélectionner un Module PMS
                      </span>
                      <button
                        type="button"
                        onClick={() => setMobileModuleDrawerOpen(false)}
                        className="text-stone-400 hover:text-white p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 pt-1">
                      {modulesList.map((m) => {
                        const Icon = m.icon;
                        const isActive = currentSection === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setCurrentSection(m.id);
                              setMobileModuleDrawerOpen(false);
                            }}
                            className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-colors ${
                              isActive
                                ? 'bg-[#c5a059] text-black font-bold'
                                : 'bg-stone-900/80 border border-stone-800 text-stone-200 hover:bg-stone-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4" />
                              <span className="text-xs">{m.label}</span>
                            </div>
                            {m.count !== undefined && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-black/20 text-black' : 'bg-stone-800 text-stone-400'}`}>
                                {m.count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DESKTOP Left Sidebar Navigation (hidden on mobile, visible from md:) */}
            <aside className="hidden md:flex w-60 lg:w-64 bg-[#080a0c] border-r border-stone-800/80 p-3.5 flex-col justify-between shrink-0">
              <div className="space-y-1 overflow-y-auto no-scrollbar">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold px-3 mb-2 block">
                  Modules de Gestion
                </span>

                {modulesList.map((m) => {
                  const Icon = m.icon;
                  const isActive = currentSection === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setCurrentSection(m.id)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#c5a059] text-black font-semibold shadow-xs'
                          : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{m.label}</span>
                      </div>
                      {m.count !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-black/20 text-black' : 'bg-stone-800 text-stone-400'}`}>
                          {m.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reception duty info */}
              <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-400">
                <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800/80">
                  <div className="flex items-center gap-1.5 text-stone-200 font-semibold mb-1">
                    <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Directeur en Poste</span>
                  </div>
                  <p className="text-stone-400 truncate">M. Salaheddine Chakir</p>
                  <p className="text-emerald-400 text-[10px] flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Réception 24h/24 active
                  </p>
                </div>
              </div>
            </aside>

            {/* Right Main Work Area */}
            <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 bg-[#0a0d10] space-y-5">
              {/* SECTION 1: DASHBOARD */}
              {currentSection === 'dashboard' && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Executive KPI Cards (Mobile friendly 2x2 grid) */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                    <div className="p-3 sm:p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                        Chiffre d'Affaires
                      </span>
                      <div className="text-base sm:text-2xl font-mono font-bold text-[#c5a059]">
                        {totalRevenue.toLocaleString('fr-FR')} €
                      </div>
                      <span className="text-[9px] sm:text-[11px] text-emerald-400 mt-1 block">
                        +18.4% ce mois
                      </span>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                        Taux d'Occupation
                      </span>
                      <div className="text-base sm:text-2xl font-mono font-bold text-white">
                        94.2 %
                      </div>
                      <span className="text-[9px] sm:text-[11px] text-stone-400 mt-1 block">
                        4/4 suites actives
                      </span>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                        Prix Moyen (ADR)
                      </span>
                      <div className="text-base sm:text-2xl font-mono font-bold text-white">
                        {adr} €
                      </div>
                      <span className="text-[9px] sm:text-[11px] text-stone-400 mt-1 block">
                        Par nuitée
                      </span>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                        Séjours Actifs
                      </span>
                      <div className="text-base sm:text-2xl font-mono font-bold text-emerald-400">
                        {activeStays}
                      </div>
                      <span className="text-[9px] sm:text-[11px] text-stone-400 mt-1 block">
                        Check-in & Confirmés
                      </span>
                    </div>
                  </div>

                  {/* Revenue Graph & Butler Brief */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Weekly Revenue Graph */}
                    <div className="lg:col-span-2 p-4 sm:p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-white">
                            Revenus Hebdomadaires par Activité
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-stone-400">
                            Hébergement, Dîners Fassia & Hammam
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded border border-[#c5a059]/30">
                          Semaine 42
                        </span>
                      </div>

                      {/* Bar chart */}
                      <div className="flex items-end justify-between gap-1.5 sm:gap-3 pt-4 sm:pt-6 pb-2">
                        {[
                          { day: 'Lun', val: 1420, occ: '75%' },
                          { day: 'Mar', val: 1680, occ: '85%' },
                          { day: 'Mer', val: 1950, occ: '90%' },
                          { day: 'Jeu', val: 1890, occ: '100%' },
                          { day: 'Ven', val: 2450, occ: '100%' },
                          { day: 'Sam', val: 2680, occ: '100%' },
                          { day: 'Dim', val: 2100, occ: '85%' },
                        ].map((bar) => {
                          const heightPct = Math.round((bar.val / 2800) * 100);
                          return (
                            <div key={bar.day} className="flex-1 flex flex-col items-center gap-1 group">
                              <span className="text-[9px] sm:text-[10px] font-mono text-[#c5a059]">
                                {bar.val}€
                              </span>
                              <div className="w-full bg-stone-800 rounded-t-lg overflow-hidden flex flex-col justify-end h-24 sm:h-32">
                                <div
                                  className="w-full bg-gradient-to-t from-[#063124] to-[#c5a059] transition-all duration-500 rounded-t-lg"
                                  style={{ height: `${heightPct}%` }}
                                />
                              </div>
                              <span className="text-[10px] sm:text-[11px] text-stone-400 font-medium mt-1">
                                {bar.day}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs text-stone-400 pt-2 border-t border-stone-800">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded bg-[#c5a059]" />
                            <span>Hébergement (72%)</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded bg-emerald-600" />
                            <span>Restauration (18%)</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded bg-blue-500" />
                            <span>Hammam (10%)</span>
                          </span>
                        </div>
                        <span className="text-stone-500 font-mono">Moy : 1 924 € / j</span>
                      </div>
                    </div>

                    {/* Today's Butler Brief */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-[#c5a059]" />
                          <span>Brief Opérationnel du Jour</span>
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-stone-400 mb-3">
                          Protocoles d'accueil et transferts Fès-Médina
                        </p>

                        <div className="space-y-2.5">
                          <div className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-start gap-2">
                            <Car className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                            <div className="text-xs">
                              <span className="font-semibold text-stone-200 block text-[11px] sm:text-xs">
                                Navette Fès-Saïss (AF1490)
                              </span>
                              <span className="text-stone-400 text-[10px]">
                                Arrivée 14:15 • Porteur Driss à Bab Boujloud
                              </span>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div className="text-xs">
                              <span className="font-semibold text-stone-200 block text-[11px] sm:text-xs">
                                Accueil Thé à la Menthe & Gazelles
                              </span>
                              <span className="text-stone-400 text-[10px]">
                                Suite Fassi • Pétales de rose préparés
                              </span>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-start gap-2">
                            <Utensils className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                            <div className="text-xs">
                              <span className="font-semibold text-stone-200 block text-[11px] sm:text-xs">
                                Dîner Privatif Rooftop (20:30)
                              </span>
                              <span className="text-stone-400 text-[10px]">
                                Pastilla au pigeon & Tajine agneau
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setCurrentSection('reservations')}
                        className="w-full mt-2 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
                      >
                        Voir toutes les réservations
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: RESERVATIONS PMS TABLE & MOBILE CARDS */}
              {currentSection === 'reservations' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Top Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                        Registre Officiel des Réservations
                      </h3>
                      <p className="text-[11px] sm:text-xs text-stone-400">
                        {filteredReservations.length} réservations trouvées sur {reservations.length} totales
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleExportCSV}
                        className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Exporter le registre en fichier CSV"
                      >
                        <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>Exporter CSV</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewResModalOpen(true)}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#c5a059] hover:bg-[#d8b46e] text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Nouvelle Réservation</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 sm:p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Rechercher nom, réf, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 sm:py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-2.5 py-1.5 sm:py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 focus:outline-none focus:border-[#c5a059]"
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="checked_in">Check-in Effectué</option>
                        <option value="pending">En Attente d'Acompte</option>
                        <option value="completed">Séjour Clôturé</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </div>

                    <div>
                      <select
                        value={roomFilter}
                        onChange={(e) => setRoomFilter(e.target.value)}
                        className="w-full px-2.5 py-1.5 sm:py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 focus:outline-none focus:border-[#c5a059]"
                      >
                        <option value="all">Toutes les suites</option>
                        {rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* MOBILE VIEW (< md): Luxury Responsive Reservation Cards */}
                  <div className="md:hidden space-y-3">
                    {filteredReservations.length === 0 ? (
                      <div className="p-6 text-center text-stone-500 rounded-xl bg-stone-900/40 border border-stone-800 text-xs">
                        Aucune réservation correspondant aux critères.
                      </div>
                    ) : (
                      filteredReservations.map((res) => (
                        <div
                          key={res.id}
                          className="p-3.5 rounded-xl bg-stone-900/70 border border-stone-800 space-y-3 shadow-md"
                        >
                          {/* Card Top: Name, Reference & Status */}
                          <div className="flex items-start justify-between gap-2 border-b border-stone-800/80 pb-2">
                            <div>
                              <div className="font-semibold text-white text-sm">
                                {res.guestName}
                              </div>
                              <div className="text-[10px] font-mono text-[#c5a059]">
                                #{res.reference} • Créée {res.createdAt}
                              </div>
                            </div>

                            <select
                              value={res.status}
                              onChange={(e) => handleStatusChange(res.id, e.target.value as ReservationStatus)}
                              className={`text-[10px] font-semibold px-2 py-1 rounded-lg border cursor-pointer ${
                                res.status === 'confirmed'
                                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                                  : res.status === 'checked_in'
                                  ? 'bg-blue-950/80 text-blue-400 border-blue-800'
                                  : res.status === 'pending'
                                  ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                                  : res.status === 'completed'
                                  ? 'bg-stone-800 text-stone-300 border-stone-700'
                                  : 'bg-red-950/80 text-red-400 border-red-800'
                              }`}
                            >
                              <option value="confirmed">Confirmée</option>
                              <option value="checked_in">Check-in</option>
                              <option value="pending">En attente</option>
                              <option value="completed">Clôturée</option>
                              <option value="cancelled">Annulée</option>
                            </select>
                          </div>

                          {/* Room & Stay Details */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded-lg bg-stone-950/60 border border-stone-800/60">
                              <span className="text-[10px] text-stone-500 block">Suite Attribuée</span>
                              <span className="font-medium text-stone-200 text-[11px] block truncate">
                                {res.roomName}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {res.checkIn} → {res.checkOut} ({res.nights}n)
                              </span>
                            </div>

                            <div className="p-2 rounded-lg bg-stone-950/60 border border-stone-800/60">
                              <span className="text-[10px] text-stone-500 block">Total Folio</span>
                              <span className="font-mono font-bold text-[#c5a059] text-xs block">
                                {res.totalPrice} €
                              </span>
                              <span className="text-[10px] text-stone-400">
                                Payé : {res.paidAmount || Math.round(res.totalPrice * 0.3)} €
                              </span>
                            </div>
                          </div>

                          {/* Contact & Medina Porteur */}
                          <div className="flex items-center justify-between text-[11px] text-stone-400">
                            <div className="truncate">
                              <span className="text-stone-500">Contact : </span>
                              <a href={`tel:${res.guestPhone}`} className="text-stone-300 hover:text-[#c5a059]">
                                {res.guestPhone}
                              </a>
                            </div>
                            <span className="text-[#c5a059] text-[10px] shrink-0 font-medium">
                              🚪 {res.arrivalGate || 'Bab Boujloud'}
                            </span>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex items-center gap-1.5 pt-2 border-t border-stone-800/80">
                            <button
                              type="button"
                              onClick={() => setActiveResModal(res)}
                              className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-[#c5a059] hover:text-black text-stone-200 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                              <CreditCard className="w-3 h-3 text-[#c5a059]" />
                              <span>Folio Extras</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setInvoiceRes(res)}
                              className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] flex items-center gap-1 cursor-pointer"
                              title="Facture"
                            >
                              <Printer className="w-3 h-3 text-[#c5a059]" />
                              <span>Facture</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setPoliceCardRes(res)}
                              className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] flex items-center gap-1 cursor-pointer"
                              title="Fiche de Police"
                            >
                              <FileText className="w-3 h-3 text-[#c5a059]" />
                              <span>DGSN</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* DESKTOP VIEW (>= md): Full Data Table */}
                  <div className="hidden md:block rounded-xl border border-stone-800 bg-stone-900/40 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-stone-300">
                        <thead className="bg-stone-950 border-b border-stone-800 text-[11px] uppercase tracking-wider text-stone-400">
                          <tr>
                            <th className="py-3 px-4">Réf. & Date</th>
                            <th className="py-3 px-4">Client</th>
                            <th className="py-3 px-4">Suite & Dates</th>
                            <th className="py-3 px-4">Total & Solde</th>
                            <th className="py-3 px-4">Porte Médina & Bagagiste</th>
                            <th className="py-3 px-4">Statut</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800/80 font-normal">
                          {filteredReservations.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-stone-500">
                                Aucune réservation correspondant aux critères.
                              </td>
                            </tr>
                          ) : (
                            filteredReservations.map((res) => (
                              <tr
                                key={res.id}
                                className="hover:bg-stone-800/40 transition-colors"
                              >
                                <td className="py-3.5 px-4 font-mono">
                                  <span className="text-[#c5a059] font-bold block">
                                    {res.reference}
                                  </span>
                                  <span className="text-[10px] text-stone-500">
                                    Créée le {res.createdAt}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="font-semibold text-stone-100">
                                    {res.guestName}
                                  </div>
                                  <div className="text-[11px] text-stone-400">
                                    {res.guestPhone} • {res.guestEmail}
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="font-medium text-stone-200">
                                    {res.roomName}
                                  </div>
                                  <div className="text-[11px] text-stone-400">
                                    {res.checkIn} → {res.checkOut} ({res.nights}n)
                                  </div>
                                </td>

                                <td className="py-3.5 px-4 font-mono">
                                  <span className="text-[#c5a059] font-bold text-xs">
                                    {res.totalPrice} €
                                  </span>
                                  <div className="text-[10px] text-stone-400">
                                    Payé: {res.paidAmount || Math.round(res.totalPrice * 0.3)} €
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <span className="text-stone-300 block font-medium">
                                    {res.arrivalGate || 'Bab Boujloud'}
                                  </span>
                                  <span className="text-[10px] text-stone-500">
                                    Porteur : {res.porterAssigned || 'Driss Maâlem'}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  <select
                                    value={res.status}
                                    onChange={(e) =>
                                      handleStatusChange(res.id, e.target.value as ReservationStatus)
                                    }
                                    className={`text-[11px] font-semibold px-2 py-1 rounded-lg border cursor-pointer ${
                                      res.status === 'confirmed'
                                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                                        : res.status === 'checked_in'
                                        ? 'bg-blue-950/80 text-blue-400 border-blue-800'
                                        : res.status === 'pending'
                                        ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                                        : res.status === 'completed'
                                        ? 'bg-stone-800 text-stone-300 border-stone-700'
                                        : 'bg-red-950/80 text-red-400 border-red-800'
                                    }`}
                                  >
                                    <option value="confirmed">Confirmée</option>
                                    <option value="checked_in">Check-in Effectué</option>
                                    <option value="pending">En attente d'acompte</option>
                                    <option value="completed">Séjour Clôturé</option>
                                    <option value="cancelled">Annulée</option>
                                  </select>
                                </td>

                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setActiveResModal(res)}
                                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-[#c5a059] hover:text-black text-stone-300 transition-colors cursor-pointer"
                                      title="Consulter et éditer le folio client"
                                    >
                                      <CreditCard className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setInvoiceRes(res)}
                                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-[#c5a059] hover:text-black text-stone-300 transition-colors cursor-pointer"
                                      title="Imprimer Facture Officielle Riad"
                                    >
                                      <Printer className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setPoliceCardRes(res)}
                                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-[#c5a059] hover:text-black text-stone-300 transition-colors cursor-pointer"
                                      title="Générer Fiche de Police DGSN"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: ROOMS INVENTORY & DYNAMIC PRICING */}
              {currentSection === 'rack' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                        Rack des Suites & Tarification Dynamique en Direct
                      </h3>
                      <p className="text-[11px] sm:text-xs text-stone-400">
                        Modifiez les tarifs par nuitée ou fermez une suite à la vente instantanément
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg shrink-0 w-fit">
                      Synchronisé avec le site en temps réel
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rooms.map((room) => {
                      const hk = housekeeping[room.id] || { status: 'clean', staff: 'Fatima', lastInspection: 'Aujourd’hui' };
                      return (
                        <div
                          key={room.id}
                          className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3.5"
                        >
                          {/* Suite title & Status */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm sm:text-base font-serif-luxury font-semibold text-white">
                                  {room.name}
                                </h4>
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold uppercase ${
                                    room.available
                                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                      : 'bg-red-950 text-red-400 border border-red-800'
                                  }`}
                                >
                                  {room.available ? 'En Vente' : 'Fermée'}
                                </span>
                              </div>
                              <span className="text-[11px] text-stone-400 block mt-0.5">
                                {room.category} • {room.size} • Capacité : {room.capacity}
                              </span>
                            </div>

                            {/* Price controls */}
                            <div className="text-right">
                              <span className="text-[9px] uppercase tracking-wider text-stone-400 block">
                                Tarif / Nuit
                              </span>
                              <div className="flex items-center gap-1 mt-1 justify-end">
                                <button
                                  type="button"
                                  onClick={() => handlePriceChange(room.id, room.pricePerNight - 10)}
                                  className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold flex items-center justify-center cursor-pointer text-xs"
                                  title="Diminuer de 10€"
                                >
                                  -
                                </button>
                                <span className="font-mono text-sm font-bold text-[#c5a059] px-1.5 min-w-[55px] text-center">
                                  {room.pricePerNight} €
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handlePriceChange(room.id, room.pricePerNight + 10)}
                                  className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold flex items-center justify-center cursor-pointer text-xs"
                                  title="Augmenter de 10€"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Housekeeping badge & toggle */}
                          <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-stone-950/70 border border-stone-800/60">
                            <div>
                              <span className="text-stone-400 text-[11px] block">État Ménage & Inspection</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                    hk.status === 'clean'
                                      ? 'text-emerald-400 bg-emerald-950/80 border border-emerald-800'
                                      : hk.status === 'cleaning'
                                      ? 'text-amber-400 bg-amber-950/80 border border-amber-800'
                                      : 'text-red-400 bg-red-950/80 border border-red-800'
                                  }`}
                                >
                                  {hk.status === 'clean' ? 'Prête VIP' : hk.status === 'cleaning' ? 'Nettoyage en cours' : 'Maintenance'}
                                </span>
                                <span className="text-[10px] text-stone-400 truncate">Par {hk.staff}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCycleHousekeeping(room.id)}
                              className="text-[11px] text-[#c5a059] hover:underline cursor-pointer font-medium"
                            >
                              Changer
                            </button>
                          </div>

                          {/* Bottom Toggle Button */}
                          <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                            <span className="text-[11px] text-stone-400 truncate">
                              Literie : {room.bed}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAvailabilityToggle(room.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                room.available
                                  ? 'bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-800'
                                  : 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                              }`}
                            >
                              {room.available ? 'Bloquer la Suite' : 'Débloquer & Ouvrir'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 4: HOUSEKEEPING & INSPECTION */}
              {currentSection === 'housekeeping' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                      Gouvernance Générale & Inspection des Suites VIP
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-400">
                      Checklist d'excellence marocaine et état de propreté par suite
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Status by suite */}
                    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-3">
                      <h4 className="text-xs sm:text-sm font-semibold text-white mb-2">
                        Statut des 4 Suites du Riad
                      </h4>
                      {rooms.map((room) => {
                        const hk = housekeeping[room.id] || { status: 'clean', staff: 'Fatima', lastInspection: '10:00' };
                        return (
                          <div
                            key={room.id}
                            className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="font-medium text-stone-200 text-xs sm:text-sm truncate">{room.name}</div>
                              <span className="text-[10px] sm:text-[11px] text-stone-400 truncate block">
                                Resp : {hk.staff} • {hk.lastInspection}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCycleHousekeeping(room.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-all shrink-0 ${
                                hk.status === 'clean'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : hk.status === 'cleaning'
                                  ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                                  : 'bg-red-950 text-red-400 border border-red-800'
                              }`}
                            >
                              {hk.status === 'clean' ? 'Prête VIP' : hk.status === 'cleaning' ? 'En Cours' : 'Maintenance'}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* VIP Inspection Checklist */}
                    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-3">
                      <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                        <span>Checklist d'Inspection Gouvernante 5 Étoiles</span>
                      </h4>

                      <div className="space-y-2 text-xs text-stone-300">
                        {[
                          { key: 'linens', label: 'Draps en coton d’Égypte brodés Fassi changés' },
                          { key: 'rosePetals', label: 'Pétales de rose fraîches dans le bassin' },
                          { key: 'orangeBlossom', label: 'Diffuseur de fleur d’oranger allumé' },
                          { key: 'mintTeaWelcome', label: 'Plateau : Thé à la menthe & Cornes de gazelle' },
                          { key: 'waterPressure', label: 'Pression de douche hammam tadelakt vérifiée' },
                          { key: 'airConditioning', label: 'Climatisation réversible préchauffée à 21°C' },
                        ].map((item) => (
                          <label
                            key={item.key}
                            className="flex items-center gap-2.5 p-2 rounded-lg bg-stone-950/60 border border-stone-800/80 cursor-pointer hover:border-[#c5a059]/40 transition-colors text-[11px] sm:text-xs"
                          >
                            <input
                              type="checkbox"
                              checked={inspectionChecks[item.key] || false}
                              onChange={(e) =>
                                setInspectionChecks({
                                  ...inspectionChecks,
                                  [item.key]: e.target.checked,
                                daylight: true,
                                })
                              }
                              className="accent-[#c5a059] w-4 h-4 rounded cursor-pointer shrink-0"
                            />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const allChecked: Record<string, boolean> = {};
                          ['linens', 'rosePetals', 'orangeBlossom', 'mintTeaWelcome', 'waterPressure', 'airConditioning'].forEach(
                            (k) => (allChecked[k] = true)
                          );
                          setInspectionChecks(allChecked);
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#c5a059] text-black font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Valider l'Inspection de la Suite
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5: CONCIERGE & MEDINA PORTERS */}
              {currentSection === 'concierge' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                      Logistique Médina, Porteurs Agréés & Transferts
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-400">
                      Prise en charge des bagages des voyageurs aux portes piétonnes de Fès El-Bali
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-white text-xs sm:text-sm">Bab Boujloud (Porte Bleue)</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono">
                            350m
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 mb-2">
                          Accès principal des taxis et navettes. Charrette à bagages en bois sculpté.
                        </p>
                      </div>

                      <a
                        href="tel:+212654112233"
                        className="p-2 rounded-lg bg-stone-950 border border-stone-800 hover:border-[#c5a059] text-xs text-[#c5a059] flex items-center justify-between transition-colors"
                      >
                        <span className="font-medium text-[11px]">Porteur : Driss Maâlem</span>
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-white text-xs sm:text-sm">Place Batha</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono">
                            280m
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 mb-2">
                          Parking gardé 24h/24 pour véhicules de location des clients du Riad.
                        </p>
                      </div>

                      <a
                        href="tel:+212661889900"
                        className="p-2 rounded-lg bg-stone-950 border border-stone-800 hover:border-[#c5a059] text-xs text-[#c5a059] flex items-center justify-between transition-colors"
                      >
                        <span className="font-medium text-[11px]">Porteur : Karim Batha</span>
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-white text-xs sm:text-sm">Bab Rcif</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono">
                            600m
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 mb-2">
                          Porte est de la médina vers les tanneries et le quartier des dinandiers.
                        </p>
                      </div>

                      <a
                        href="tel:+212677445566"
                        className="p-2 rounded-lg bg-stone-950 border border-stone-800 hover:border-[#c5a059] text-xs text-[#c5a059] flex items-center justify-between transition-colors"
                      >
                        <span className="font-medium text-[11px]">Porteur : Youssef Boujloud</span>
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 6: F&B RESTAURANT */}
              {currentSection === 'fb' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                      Carte Gastronomique Fassie & Restaurant du Riad
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-400">
                      Disponibilité en cuisine, prix et plats signatures de la Dada
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {dishesList.map((dish) => (
                      <div
                        key={dish.id}
                        className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-2"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-white text-xs sm:text-sm">
                              {dish.name[currentLang]}
                            </span>
                            <span className="font-mono text-xs font-bold text-[#c5a059] shrink-0">
                              {dish.price} €
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
                            {dish.desc[currentLang]}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
                          <span className="text-[10px] text-stone-500 font-medium">{dish.category}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setDishesList(
                                dishesList.map((d) =>
                                  d.id === dish.id ? { ...d, available: !d.available } : d
                                )
                              );
                            }}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                              dish.available
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-red-950 text-red-400 border border-red-800'
                            }`}
                          >
                            {dish.available ? 'En Cuisine' : 'Épuisé'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 7: SPA & HAMMAM */}
              {currentSection === 'spa' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                      Planning du Hammam Royal & Soins Orientaux
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-400">
                      Séances privatisées en tadelakt et thérapeutes assignées
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {spaAppointments.map((app) => (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center font-bold shrink-0">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white text-xs sm:text-sm truncate">{app.guest}</div>
                            <span className="text-[10px] sm:text-xs text-stone-400 block truncate">
                              {app.treatment} • Thérapeute : {app.therapist}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs sm:text-sm text-[#c5a059] font-bold">
                            {app.time}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 8: FINANCES & TAXES */}
              {currentSection === 'finances' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                      Rapprochement de Caisse & Taxes Touristiques Locales
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-400">
                      Taxe de Séjour de la Ville de Fès & Taxe de Promotion Touristique (TPT)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                        Taxe de Séjour Municipale
                      </span>
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white">15 MAD</span>
                      <span className="text-[10px] text-stone-500 block mt-1">Par personne / nuitée</span>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                        Taxe Promotion Touristique (TPT)
                      </span>
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white">10 MAD</span>
                      <span className="text-[10px] text-stone-500 block mt-1">Ministère du Tourisme</span>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                        Total Réglementaire
                      </span>
                      <span className="text-xl sm:text-2xl font-mono font-bold text-[#c5a059]">25 MAD / pers</span>
                      <span className="text-[10px] text-stone-500 block mt-1">~ 2.30 € par personne / nuit</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 9: REVIEWS MODERATION */}
              {currentSection === 'reviews' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                      Avis & Témoignages Clients en Ligne
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-400">
                      e-Réputation, contrôle qualité et réponses officielles de la Direction
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {REVIEWS.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white text-xs sm:text-sm">
                            {rev.guestName} ({rev.origin})
                          </span>
                          <div className="flex items-center gap-0.5 text-amber-400 font-mono text-xs">
                            {'★'.repeat(rev.rating)}
                          </div>
                        </div>
                        <p className="text-xs text-stone-300 italic">
                          "{rev.quote[currentLang]}"
                        </p>
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400 pt-1.5 border-t border-stone-800/80">
                          <span>Séjour : {rev.suiteStayed}</span>
                          <span className="text-emerald-400">Vérifié TripAdvisor / Google</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 10: SETTINGS */}
              {currentSection === 'settings' && (
                <div className="space-y-4 animate-fadeIn max-w-2xl">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                      Paramètres Administratifs de l'Établissement
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-400">
                      Coordonnées de direction, politique d'arrivée et coordonnées WhatsApp
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-stone-400 block mb-1">Nom Officiel du Riad :</label>
                      <input
                        type="text"
                        value={riadSettings.hotelName}
                        onChange={(e) => setRiadSettings({ ...riadSettings, hotelName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-stone-400 block mb-1">Directeur de Réception :</label>
                        <input
                          type="text"
                          value={riadSettings.directorName}
                          onChange={(e) => setRiadSettings({ ...riadSettings, directorName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                        />
                      </div>
                      <div>
                        <label className="text-stone-400 block mb-1">Téléphone Direct :</label>
                        <input
                          type="text"
                          value={riadSettings.phone}
                          onChange={(e) => setRiadSettings({ ...riadSettings, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-stone-400 block mb-1">Heure de Check-In :</label>
                        <input
                          type="text"
                          value={riadSettings.checkInTime}
                          onChange={(e) => setRiadSettings({ ...riadSettings, checkInTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                        />
                      </div>
                      <div>
                        <label className="text-stone-400 block mb-1">Heure de Check-Out :</label>
                        <input
                          type="text"
                          value={riadSettings.checkOutTime}
                          onChange={(e) => setRiadSettings({ ...riadSettings, checkOutTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert('Paramètres enregistrés avec succès.')}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#c5a059] text-black font-semibold cursor-pointer"
                    >
                      Enregistrer les Paramètres
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {/* MODAL 1: VIEW / EDIT FOLIO & EXTRAS */}
        {activeResModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#0e1216] border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#c5a059] font-mono">
                    Folio Client #{activeResModal.reference}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                    {activeResModal.guestName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveResModal(null)}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-300">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-500 block mb-1">Coordonnées</span>
                  <div className="truncate">{activeResModal.guestEmail}</div>
                  <div>{activeResModal.guestPhone}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-500 block mb-1">Séjour</span>
                  <div className="font-semibold text-stone-200">{activeResModal.roomName}</div>
                  <div>
                    {activeResModal.checkIn} → {activeResModal.checkOut} ({activeResModal.nights} nuits)
                  </div>
                </div>
              </div>

              {/* Extras on room folio */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase text-stone-400 tracking-wider">
                    Extras sur la Note de Chambre
                  </h4>
                  <span className="text-xs text-[#c5a059] font-mono font-bold">
                    Total Folio : {activeResModal.totalPrice} €
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  {(!activeResModal.folioExtras || activeResModal.folioExtras.length === 0) ? (
                    <p className="text-xs text-stone-500 italic">Aucun extra additionnel pour le moment.</p>
                  ) : (
                    activeResModal.folioExtras.map((ext) => (
                      <div key={ext.id} className="flex items-center justify-between text-xs text-stone-300">
                        <span>{ext.description} ({ext.date})</span>
                        <span className="font-mono text-[#c5a059] font-semibold">+{ext.amount} €</span>
                      </div>
                    ))
                  )}

                  {/* Add extra form */}
                  <div className="pt-3 border-t border-stone-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      placeholder="Ex: Dîner Pastilla, Bouteille Eau..."
                      value={newExtraDesc}
                      onChange={(e) => setNewExtraDesc(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-200"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Montant €"
                        value={newExtraAmount}
                        onChange={(e) => setNewExtraAmount(Number(e.target.value))}
                        className="w-24 px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-200 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddFolioExtra(activeResModal.id)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#c5a059] text-black font-semibold text-xs cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-800">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInvoiceRes(activeResModal);
                      setActiveResModal(null);
                    }}
                    className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#c5a059] text-stone-200 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Facture Riad</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPoliceCardRes(activeResModal);
                      setActiveResModal(null);
                    }}
                    className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#c5a059] text-stone-200 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Fiche de Police</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveResModal(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-white text-xs cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: PRINTABLE OFFICIAL INVOICE */}
        {invoiceRes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-xl bg-white text-black rounded-2xl p-4 sm:p-8 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto font-sans">
              <div className="flex items-start justify-between border-b pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-serif font-bold tracking-wider text-stone-900">
                    RIAD SDC
                  </h2>
                  <p className="text-[11px] text-stone-600">
                    Médina Historique • Derb el Miter, Fès El-Bali, Maroc
                  </p>
                  <p className="text-[10px] text-stone-500 font-mono">
                    IF: 40291048 • RC: 12094 • CNSS: 8492019
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase text-stone-500">FACTURE</span>
                  <div className="text-xs sm:text-sm font-mono font-bold text-stone-800">
                    FAC-{invoiceRes.reference}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {new Date().toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>

              <div className="text-xs space-y-0.5">
                <span className="font-bold text-stone-700">CLIENT :</span>
                <div className="font-semibold text-sm">{invoiceRes.guestName}</div>
                <div className="text-stone-600 text-[11px]">{invoiceRes.guestEmail} • {invoiceRes.guestPhone}</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-stone-800 text-stone-700">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-center">Nuits</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="py-2 font-medium">Hébergement en {invoiceRes.roomName}</td>
                      <td className="py-2 text-center">{invoiceRes.nights}</td>
                      <td className="py-2 text-right font-mono font-bold">{invoiceRes.totalPrice} €</td>
                    </tr>
                    <tr>
                      <td className="py-2">Taxe de Séjour Municipale & TPT (25 MAD/pers/nuit)</td>
                      <td className="py-2 text-center">{invoiceRes.nights}</td>
                      <td className="py-2 text-right font-mono">Inclus</td>
                    </tr>
                    {invoiceRes.folioExtras?.map((e) => (
                      <tr key={e.id}>
                        <td className="py-2">{e.description}</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-right font-mono">{e.amount} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t pt-3 flex justify-between items-center text-sm font-bold">
                <span>TOTAL À PAYER (TTC) :</span>
                <span className="font-mono text-base">{invoiceRes.totalPrice} €</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Imprimer la Facture
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceRes(null)}
                  className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg text-xs cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: PRINTABLE POLICE CARD (FICHE DE POLICE DGSN) */}
        {policeCardRes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-[#fffdf9] text-stone-900 rounded-2xl p-4 sm:p-8 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto font-serif">
              <div className="text-center border-b pb-3">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-500 font-sans block">
                  ROYAUME DU MAROC • MINISTÈRE DU TOURISME
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1">
                  FICHE INDIVIDUELLE DE POLICE
                </h3>
                <p className="text-[10px] sm:text-[11px] text-stone-500 font-sans">
                  Établissement classé : Riad SDC (Fès Médina)
                </p>
              </div>

              <div className="space-y-2.5 text-xs font-sans">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Nom & Prénom :</span>
                    <span className="font-bold">{policeCardRes.guestName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Nationalité :</span>
                    <span className="font-bold">{policeCardRes.nationality || 'Française'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-stone-500 block text-[10px]">N° Passeport :</span>
                    <span className="font-bold font-mono">{policeCardRes.passportNumber || '23AF90184'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Chambre Attribuée :</span>
                    <span className="font-bold">{policeCardRes.roomName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Date d'arrivée :</span>
                    <span>{policeCardRes.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Date de départ :</span>
                    <span>{policeCardRes.checkOut}</span>
                  </div>
                </div>

                <div className="p-3 rounded border border-dashed border-stone-400 mt-2 text-center text-stone-400 text-xs">
                  Signature du voyageur
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t font-sans">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Imprimer Fiche
                </button>
                <button
                  type="button"
                  onClick={() => setPoliceCardRes(null)}
                  className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg text-xs cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 4: CREATE NEW MANUAL BOOKING */}
        {newResModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-[#0e1216] border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-3.5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white">
                  Nouvelle Réservation Manuelle
                </h3>
                <button
                  type="button"
                  onClick={() => setNewResModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateReservation} className="space-y-3 text-xs">
                <div>
                  <label className="text-stone-400 block mb-1">Nom Complet du Client :</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Alexandre Dumas"
                    value={newResData.guestName}
                    onChange={(e) => setNewResData({ ...newResData, guestName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-stone-400 block mb-1">Email :</label>
                    <input
                      type="email"
                      required
                      placeholder="client@email.com"
                      value={newResData.guestEmail}
                      onChange={(e) => setNewResData({ ...newResData, guestEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Téléphone :</label>
                    <input
                      type="tel"
                      required
                      placeholder="+212 6..."
                      value={newResData.guestPhone}
                      onChange={(e) => setNewResData({ ...newResData, guestPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Suite Choisi :</label>
                  <select
                    value={newResData.roomId}
                    onChange={(e) => setNewResData({ ...newResData, roomId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-[#c5a059]"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — {r.pricePerNight} € / nuit
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-stone-400 block mb-1">Arrivée :</label>
                    <input
                      type="date"
                      required
                      value={newResData.checkIn}
                      onChange={(e) => setNewResData({ ...newResData, checkIn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Départ :</label>
                    <input
                      type="date"
                      required
                      value={newResData.checkOut}
                      onChange={(e) => setNewResData({ ...newResData, checkOut: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-stone-400 block mb-1">Porte Médina :</label>
                    <select
                      value={newResData.arrivalGate}
                      onChange={(e) => setNewResData({ ...newResData, arrivalGate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                    >
                      <option value="Bab Boujloud">Bab Boujloud</option>
                      <option value="Place Batha">Place Batha</option>
                      <option value="Bab Rcif">Bab Rcif</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Porteur Assuré :</label>
                    <input
                      type="text"
                      value={newResData.porterAssigned}
                      onChange={(e) => setNewResData({ ...newResData, porterAssigned: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200"
                    />
                  </div>
                </div>

                <div className="pt-2.5 border-t border-stone-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewResModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#c5a059] text-black font-semibold cursor-pointer"
                  >
                    Créer la Réservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
