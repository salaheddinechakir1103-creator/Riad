import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Calendar,
  Shield,
  Utensils,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Check,
  Compass,
  MapPin,
  Camera,
  Image as ImageIcon,
  Mail,
  Home,
  Bed,
} from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../data/translations';
import { AudioAmbience } from './AudioAmbience';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenGastronomy: () => void;
  onOpenSpa: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currency,
  onCurrencyChange,
  onOpenBooking,
  onOpenAdmin,
  onOpenGastronomy,
  onOpenSpa,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const currencyRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  // Track scroll position for background blur and active section indicator
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        'home',
        'introduction',
        'le-riad',
        'suites',
        'experiences',
        'architecture3d',
        'medina',
        'galerie',
        'contact',
      ];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close currency dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smooth scroll handler with offset for fixed navbar
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
    }
  };

  const navLinks = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'le-riad', label: t.nav.theRiad, icon: Compass },
    { id: 'suites', label: t.nav.rooms, icon: Bed },
    { id: 'experiences', label: t.nav.experiences, icon: Sparkles },
    { id: 'architecture3d', label: 'Visite 3D', icon: Camera },
    { id: 'medina', label: 'Médina', icon: MapPin },
    { id: 'galerie', label: t.nav.gallery, icon: ImageIcon },
    { id: 'contact', label: t.nav.contact, icon: Mail },
  ];

  return (
    <>
      {/* Primary Fixed Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#080b0e] border-b border-[#232930] py-2 sm:py-2.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-2.5 sm:py-3'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between gap-1.5 sm:gap-3">
            {/* Logo / Brand Name (Calibrated font to fit smoothly on mobile without push) */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex flex-col group whitespace-nowrap shrink-0"
            >
              <span className="font-display-luxury text-sm xs:text-base sm:text-lg lg:text-xl font-semibold tracking-[0.14em] sm:tracking-[0.2em] text-[#f5f0ea] group-hover:text-[#c5a059] transition-colors">
                RIAD SDC
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#c5a059] font-medium -mt-1 hidden xs:block">
                Fès Médina • Riad & Spa
              </span>
            </a>

            {/* Desktop Navigation Links (Visible on PC preview from lg: >= 1024px) */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-5 text-xs xl:text-[13px] font-medium tracking-wide text-stone-300">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative py-1 transition-all whitespace-nowrap shrink-0 hover:text-[#c5a059] ${
                      isActive ? 'text-[#c5a059] font-semibold' : 'text-stone-300'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059] rounded-full animate-fadeIn" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Controls: Carefully structured for zero mobile overflow */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Audio Ambience Synthesizer: Hidden on phone (< sm) to preserve space, visible on tablet/PC and in mobile menu */}
              <div className="hidden sm:block">
                <AudioAmbience />
              </div>

              {/* Direct Language Switcher (Visible on desktop & tablet >= 640px) */}
              <div className="hidden sm:flex items-center rounded-lg bg-black/60 border border-white/10 p-0.5 text-[11px] font-medium">
                {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    className={`px-2 py-0.5 rounded transition-colors uppercase cursor-pointer ${
                      currentLang === lang
                        ? 'bg-[#c5a059] text-black font-bold shadow-xs'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                    title={`Passer le site en ${lang.toUpperCase()}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Currency Selector (Desktop only >= 1280px) */}
              <div className="relative hidden xl:block" ref={currencyRef}>
                <button
                  type="button"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 border border-white/10 hover:border-[#c5a059]/50 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
                  title="Changer de devise"
                >
                  <span className="font-mono text-[11px] font-bold text-[#c5a059]">
                    {currency}
                  </span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-28 rounded-xl bg-[#111519] border border-stone-800 p-1.5 shadow-2xl z-50">
                    {(['EUR', 'MAD', 'USD', 'GBP'] as Currency[]).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => {
                          onCurrencyChange(curr);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs font-mono flex items-center justify-between cursor-pointer ${
                          currency === curr
                            ? 'bg-[#c5a059] text-black font-bold'
                            : 'text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        <span>{curr}</span>
                        {currency === curr && <Check className="w-3 h-3 text-black" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Admin PMS Button: Compact on mobile, expanded with label on tablet/desktop */}
              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-stone-900/90 border border-[#c5a059]/40 hover:border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10 transition-all cursor-pointer text-xs shadow-sm group shrink-0"
                title="Portail de Gestion & Administration du Riad (PMS)"
                aria-label="Portail Administrateur"
              >
                <Shield className="w-3.5 h-3.5 text-[#c5a059] group-hover:scale-110 transition-transform" />
                <span className="hidden xs:inline font-medium text-[11px] sm:text-xs">Admin</span>
              </button>

              {/* Primary Action: Réserver (Compact and neatly fitted on mobile, never cut off) */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-black bg-[#c5a059] hover:bg-[#d8b46e] transition-all rounded-lg shadow-md hover:shadow-lg whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>{t.nav.bookNow}</span>
              </button>

              {/* Mobile & Tablet Hamburger Button: ALWAYS visible and cleanly accessible */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-stone-200 hover:text-white rounded-lg border border-stone-800 bg-stone-900/90 hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Luxury Drawer Menu (Rendered OUTSIDE <header> so fixed inset-0 covers 100% of viewport without backdrop-filter clipping!) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[48px] sm:top-[56px] z-40 bg-[#07090c]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto border-t border-stone-800/80 animate-fadeIn"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="max-w-xl mx-auto w-full p-4 sm:p-6 space-y-4">
            {/* Audio Ambience, Language & Currency Controls for Mobile */}
            <div className="space-y-2.5 p-3 rounded-xl bg-stone-900/70 border border-stone-800 text-xs shadow-md">
              {/* Audio Ambience synthesizer for mobile */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
                <span className="text-stone-300 text-[11px] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Ambiance Musicale Andalouse :</span>
                </span>
                <AudioAmbience />
              </div>

              {/* Language & Currency Row */}
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-400 text-[11px] uppercase tracking-wider">Langue:</span>
                  <div className="flex gap-1">
                    {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => onLanguageChange(lang)}
                        className={`px-2 py-0.5 rounded text-xs uppercase font-medium cursor-pointer ${
                          currentLang === lang
                            ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-stone-400 text-[11px] uppercase tracking-wider">Devise:</span>
                  <div className="flex gap-1">
                    {(['EUR', 'MAD', 'USD'] as Currency[]).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => onCurrencyChange(curr)}
                        className={`px-2 py-0.5 rounded text-xs font-mono cursor-pointer ${
                          currency === curr
                            ? 'bg-[#c5a059] text-black font-bold'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold px-2 block mb-1">
                Navigation Principale
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`p-2.5 sm:p-3 rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059] font-semibold'
                          : 'bg-stone-900/40 border border-stone-800/80 text-stone-300 hover:bg-stone-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#c5a059]' : 'text-stone-400'}`} />
                        <span className="text-xs sm:text-sm">{link.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#c5a059]' : 'text-stone-500'}`} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Modals Shortcuts (Gastronomy, Spa, Admin Portal) */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold px-2 block">
                Services & Administration
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenGastronomy();
                  }}
                  className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800 text-left text-xs text-stone-300 hover:text-white flex items-center gap-2.5 cursor-pointer"
                >
                  <Utensils className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Carte Dîner Fassi</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSpa();
                  }}
                  className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800 text-left text-xs text-stone-300 hover:text-white flex items-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Menu Spa & Hammam</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="p-2.5 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 text-left text-xs text-[#c5a059] hover:bg-[#c5a059]/20 flex items-center gap-2.5 cursor-pointer font-semibold"
                >
                  <Shield className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Portail Admin PMS</span>
                </button>
              </div>
            </div>

            {/* Big Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b46e] rounded-xl shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>{t.nav.bookNow}</span>
              </button>
            </div>
          </div>

          <div className="p-3 text-center text-[10px] text-stone-500 border-t border-stone-800/80">
            Riad SDC • Fès Médina • UNESCO Patrimoine Mondial
          </div>
        </div>
      )}
    </>
  );
};
