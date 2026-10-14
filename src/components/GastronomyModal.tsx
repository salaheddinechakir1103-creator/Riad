import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Utensils,
  Clock,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Flame,
  Coffee,
  Heart,
  MessageCircle,
  Wine,
} from 'lucide-react';
import { Language, Currency } from '../types';
import {
  GASTRONOMY_MENU,
  GASTRONOMY_FORMULAS,
  DINING_AREAS,
  formatPrice,
  IMAGES,
  FALLBACK_IMAGES,
} from '../data/riadData';

interface GastronomyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  currency: Currency;
  onBookTable: () => void;
}

type MainTab = 'carte' | 'formulas' | 'ambiance' | 'reserve';
type CourseCategory = 'pastillas' | 'tajines' | 'starters' | 'desserts';

export const GastronomyModal: React.FC<GastronomyModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  currency,
  onBookTable,
}) => {
  if (!isOpen) return null;

  const isRTL = currentLang === 'ar';
  const [mainTab, setMainTab] = useState<MainTab>('carte');
  const [courseCategory, setCourseCategory] = useState<CourseCategory>('pastillas');

  // Interactive booking form state
  const [guestCount, setGuestCount] = useState<number>(2);
  const [serviceDate, setServiceDate] = useState<string>('2026-10-15');
  const [serviceTime, setServiceTime] = useState<string>('20:00');
  const [selectedArea, setSelectedArea] = useState<string>('patio');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('form-2');
  const [dietaryNotes, setDietaryNotes] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [isBookedSuccess, setIsBookedSuccess] = useState<boolean>(false);

  // Dish pre-selection state for dinner wishlist
  const [selectedDishes, setSelectedDishes] = useState<Record<string, number>>({});

  const toggleDishSelect = (dishName: string) => {
    setSelectedDishes((prev) => {
      const current = prev[dishName] || 0;
      if (current > 0) {
        const copy = { ...prev };
        delete copy[dishName];
        return copy;
      }
      return { ...prev, [dishName]: 1 };
    });
  };

  const courseLabels: Record<CourseCategory, { fr: string; en: string; ar: string }> = {
    pastillas: { fr: 'Pastillas Royales', en: 'Royal Pastillas', ar: 'البسطيلة الملكية' },
    tajines: { fr: 'Tajines Mijotés', en: 'Slow-Simmered Tagines', ar: 'الطواجن الفاسية' },
    starters: { fr: 'Entrées & Salades Fassies', en: 'Fassi Starters & Salads', ar: 'المقبلات والسلطات' },
    desserts: { fr: 'Douceurs & Thés Rares', en: 'Desserts & Heirloom Teas', ar: 'الحلويات والشاي' },
  };

  const mainTabLabels: Record<MainTab, { fr: string; en: string; ar: string }> = {
    carte: { fr: 'La Carte Gastronomique', en: 'À La Carte Menu', ar: 'قائمة الأطباق الفاسية' },
    formulas: { fr: 'Menus Dégustation', en: 'Tasting Menus', ar: 'قوائم التذوق الملكية' },
    ambiance: { fr: 'Cadres & Espaces', en: 'Dining Spaces', ar: 'فضاءات العشاء' },
    reserve: { fr: 'Réserver une Table', en: 'Reserve a Table', ar: 'حجز طاولة العشاء' },
  };

  const activeDishes = GASTRONOMY_MENU[courseCategory];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookedSuccess(true);
  };

  const handleWhatsAppBooking = () => {
    const areaName = DINING_AREAS.find((a) => a.id === selectedArea)?.name[currentLang] || selectedArea;
    const formulaName = GASTRONOMY_FORMULAS.find((f) => f.id === selectedFormulaId)?.name[currentLang] || 'À la carte';
    const text = encodeURIComponent(
      `Bonjour Riad SDC, je souhaite réserver une table pour le dîner.\nDate: ${serviceDate}\nHeure: ${serviceTime}\nConvives: ${guestCount}\nCadre: ${areaName}\nFormule: ${formulaName}\nNom: ${guestName || 'Client'}\nTél: ${guestPhone || 'Non précisé'}`
    );
    window.open(`https://wa.me/212661234567?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-5xl bg-[#0d1014] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-[#f5f0ea]">
        {/* Sticky Modal Top Bar with Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-800/90 bg-[#0f1318]/95 backdrop-blur-sm shrink-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059]">
              {currentLang === 'fr'
                ? 'Table d’Hôtes Privée • Riad SDC'
                : currentLang === 'ar'
                ? 'مائدة الضيافة الملكية • رياض SDC'
                : 'Private Dining Table • Riad SDC'}
            </span>
            <span className="text-stone-600 text-xs hidden sm:inline">|</span>
            <span className="text-xs text-stone-400 hidden sm:inline">Fès Médina</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors cursor-pointer"
            aria-label="Fermer la carte"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Opulent Hero Banner with Generated High-Fidelity Asset */}
          <div className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden bg-stone-950 shrink-0">
            <img
              src={IMAGES.diningTable}
              alt="Dîner royal marocain au Riad SDC"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const fb = FALLBACK_IMAGES.dining;
                if (e.currentTarget.src !== fb) {
                  e.currentTarget.src = fb;
                }
              }}
            />
            {/* Dark & Gold ambient gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1014] via-[#0d1014]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Hero Text Overlay */}
            <div className="absolute bottom-6 left-6 right-6 max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#c5a059] tracking-widest uppercase font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {currentLang === 'fr'
                    ? 'Patrimoine Culinaire des Palais Fassies'
                    : currentLang === 'ar'
                    ? 'تراث الطبخ الفاسي الإمبراطوري'
                    : 'Ancestral Culinary Heritage of Fes Palaces'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-white leading-tight">
                {currentLang === 'fr'
                  ? 'La Haute Gastronomie du Riad SDC'
                  : currentLang === 'ar'
                  ? 'فنون الطهي الملكي في رياض SDC'
                  : 'Royal Gastronomy at Riad SDC'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                {currentLang === 'fr'
                  ? 'Recettes ancestrales secrètes mijotées sur kanoun de braises par nos dadas fassies. Produits nobles du terroir : safran de Taliouine, huile d’olive de Volubilis et amandes douces de l’Atlas.'
                  : currentLang === 'ar'
                  ? 'وصفات فاس العتيقة المطهية على الجمر الهادئ بأيدي أمهر طباخات المدينة. زعفران تالوين الحر، زيت زيتون وليلي البكر، ولوز الأطلس الحلو.'
                  : 'Centuries-old recipes gently simmered over glowing embers by master Fassi cooks. Pure Taliouine saffron, virgin Volubilis olive oil, and organic Atlas almonds.'}
              </p>
            </div>
          </div>

          {/* 4 Main Navigation Tabs */}
          <div className="sticky top-0 z-10 bg-[#0d1014]/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 pt-3 pb-3 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            {(['carte', 'formulas', 'ambiance', 'reserve'] as MainTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMainTab(tab)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all cursor-pointer ${
                  mainTab === tab
                    ? 'bg-[#c5a059] text-stone-950 font-semibold shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/70 border border-stone-800/80'
                }`}
              >
                {mainTabLabels[tab][currentLang]}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 md:p-8 space-y-8">
            {/* TAB 1: À LA CARTE MENU */}
            {mainTab === 'carte' && (
              <div className="space-y-6">
                {/* Course Sub-Categories Selector */}
                <div className="flex flex-wrap items-center gap-2 border-b border-stone-800/90 pb-4">
                  {(['pastillas', 'tajines', 'starters', 'desserts'] as CourseCategory[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCourseCategory(cat)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                        courseCategory === cat
                          ? 'bg-stone-800 text-[#e6c888] border border-[#c5a059]/50'
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent'
                      }`}
                    >
                      {courseLabels[cat][currentLang]}
                    </button>
                  ))}
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {activeDishes.map((dish, idx) => {
                    const dishTitle = dish.name[currentLang];
                    const isSelected = !!selectedDishes[dishTitle];

                    return (
                      <div
                        key={idx}
                        className={`p-5 rounded-xl bg-stone-900/60 border transition-all duration-200 flex flex-col justify-between gap-4 ${
                          isSelected
                            ? 'border-[#c5a059] bg-[#c5a059]/5'
                            : 'border-stone-800/90 hover:border-stone-700'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <h3 className="text-base sm:text-lg font-serif-luxury font-medium text-stone-100">
                                {dishTitle}
                              </h3>
                              {dish.signature && (
                                <div className="text-[11px] text-[#c5a059] font-medium tracking-wider uppercase">
                                  ★ {currentLang === 'fr' ? 'Spécialité Signature du Palais' : currentLang === 'ar' ? 'طبق التوقيع الفاسي' : 'Palace Signature Dish'}
                                </div>
                              )}
                            </div>
                            <span className="text-lg font-serif-luxury text-[#c5a059] font-bold tabular-nums shrink-0">
                              {formatPrice(dish.price, currency)}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                            {dish.desc[currentLang]}
                          </p>
                        </div>

                        {/* Dish Badges & Pre-selection */}
                        <div className="pt-3 border-t border-stone-800/70 flex items-center justify-between text-xs text-stone-500">
                          <div className="flex items-center gap-2">
                            <span>100% Terroir Fassi</span>
                            <span aria-hidden="true">·</span>
                            <span>Mijoté minute</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleDishSelect(dishTitle)}
                            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#c5a059] text-stone-950 font-semibold'
                                : 'text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700'
                            }`}
                          >
                            {isSelected
                              ? (currentLang === 'fr' ? 'Sélectionné' : currentLang === 'ar' ? 'محدد' : 'Selected')
                              : (currentLang === 'fr' ? '+ Pré-sélectionner' : currentLang === 'ar' ? '+ أضف للرغبات' : '+ Add to wishlist')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected dishes footer note */}
                {Object.keys(selectedDishes).length > 0 && (
                  <div className="p-4 rounded-xl bg-stone-900 border border-[#c5a059]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-stone-300 space-y-0.5 text-center sm:text-left">
                      <span className="font-semibold text-[#c5a059]">
                        {Object.keys(selectedDishes).length}{' '}
                        {currentLang === 'fr' ? 'plats pré-sélectionnés' : currentLang === 'ar' ? 'أطباق محددة مسبقاً' : 'dishes in your selection'}
                      </span>
                      <p className="text-stone-400 text-[11px]">
                        {currentLang === 'fr'
                          ? 'Transmettez directement votre choix lors de votre réservation de table.'
                          : currentLang === 'ar'
                          ? 'سيتم تضمين اختياراتك تلقائياً عند تأكيد حجز الطاولة.'
                          : 'Your pre-selected dishes will be shared directly with your table reservation.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setMainTab('reserve')}
                      className="px-4 py-2 rounded-lg bg-[#c5a059] text-stone-950 font-semibold text-xs uppercase tracking-wider hover:bg-[#d8b46e] transition-colors cursor-pointer"
                    >
                      {currentLang === 'fr' ? 'Continuer la réservation' : currentLang === 'ar' ? 'متابعة الحجز' : 'Continue to Reservation'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: TASTING FORMULAS & EXPERIENCES */}
            {mainTab === 'formulas' && (
              <div className="space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif-luxury text-white">
                    {currentLang === 'fr'
                      ? 'Les Menus Dégustation d’Exception'
                      : currentLang === 'ar'
                      ? 'قوائم التذوق الفاسية الملكية'
                      : 'Exclusive Fassi Tasting Journeys'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400">
                    {currentLang === 'fr'
                      ? 'Une immersion séquentielle complète dans la gastronomie aristocratique de Fès, servie avec le cérémonial royal.'
                      : currentLang === 'ar'
                      ? 'تجربة ذوقية شاملة في ضيافة القصور الفاسية العريقة مع طقوس الشاي الملكي الفضي.'
                      : 'A full sequential immersion into aristocratic Fassi palace gastronomy, served with traditional ceremony.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {GASTRONOMY_FORMULAS.map((formula) => {
                    const isCurrent = selectedFormulaId === formula.id;

                    return (
                      <div
                        key={formula.id}
                        className={`rounded-2xl p-6 bg-stone-900/50 border flex flex-col justify-between gap-6 transition-all duration-200 ${
                          isCurrent
                            ? 'border-[#c5a059] ring-1 ring-[#c5a059]/40 bg-stone-900/80 shadow-xl'
                            : 'border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#c5a059]">
                              {formula.tag}
                            </span>
                            <span className="text-xs text-stone-400">
                              {formula.subtitle[currentLang]}
                            </span>
                          </div>

                          <h4 className="text-lg font-serif-luxury font-medium text-stone-100">
                            {formula.name[currentLang]}
                          </h4>

                          <p className="text-xs text-stone-400 leading-relaxed">
                            {formula.desc[currentLang]}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-stone-800 space-y-3">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs text-stone-400">
                              {currentLang === 'fr' ? 'Par convive' : currentLang === 'ar' ? 'للشخص الواحد' : 'Per guest'}
                            </span>
                            <span className="text-2xl font-serif-luxury font-bold text-[#c5a059] tabular-nums">
                              {formatPrice(formula.price, currency)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFormulaId(formula.id);
                              setMainTab('reserve');
                            }}
                            className={`w-full py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-[#c5a059] text-stone-950 shadow-md hover:bg-[#d8b46e]'
                                : 'bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white border border-stone-700'
                            }`}
                          >
                            {currentLang === 'fr'
                              ? 'Choisir cette formule'
                              : currentLang === 'ar'
                              ? 'اختر هذه القائمة'
                              : 'Select this menu'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: DINING AMBIANCE & SPACES */}
            {mainTab === 'ambiance' && (
              <div className="space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif-luxury text-white">
                    {currentLang === 'fr'
                      ? 'Trois Cadres Uniques pour votre Soirée'
                      : currentLang === 'ar'
                      ? 'ثلاثة فضاءات ساحرة لعشاء لا يُنسى'
                      : 'Three Atmospheric Dining Enclaves'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400">
                    {currentLang === 'fr'
                      ? 'Chaque espace du Riad SDC offre une mise en scène lumineuse et sensorielle sur-mesure.'
                      : currentLang === 'ar'
                      ? 'كل ركن في رياض SDC يحكي حكاية من الضوء والهدوء والأصالة المغربية.'
                      : 'Each space at Riad SDC features tailored candlelight, acoustic peace, and intimate hospitality.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {DINING_AREAS.map((area) => {
                    const isSelected = selectedArea === area.id;

                    return (
                      <div
                        key={area.id}
                        className={`rounded-2xl p-6 bg-stone-900/50 border flex flex-col justify-between gap-4 transition-all duration-200 ${
                          isSelected
                            ? 'border-[#c5a059] ring-1 ring-[#c5a059]/30 bg-stone-900/80 shadow-lg'
                            : 'border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-[#c5a059]">
                            {area.id === 'patio' && <Utensils className="w-5 h-5" />}
                            {area.id === 'rooftop' && <Sparkles className="w-5 h-5" />}
                            {area.id === 'alcove' && <Coffee className="w-5 h-5" />}
                          </div>

                          <h4 className="text-lg font-serif-luxury font-medium text-stone-100">
                            {area.name[currentLang]}
                          </h4>

                          <p className="text-xs text-stone-400 leading-relaxed">
                            {area.desc[currentLang]}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-stone-800">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedArea(area.id);
                              setMainTab('reserve');
                            }}
                            className={`w-full py-2 rounded-lg text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#c5a059] text-stone-950 font-semibold'
                                : 'text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700'
                            }`}
                          >
                            {isSelected
                              ? (currentLang === 'fr' ? 'Cadre retenu' : currentLang === 'ar' ? 'الفضاء المختار' : 'Area Selected')
                              : (currentLang === 'fr' ? 'Dîner dans cet espace' : currentLang === 'ar' ? 'العشاء في هذا المكان' : 'Dine in this space')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: INTERACTIVE TABLE RESERVATION FORM */}
            {mainTab === 'reserve' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif-luxury text-white">
                    {currentLang === 'fr'
                      ? 'Réserver votre Dîner au Riad SDC'
                      : currentLang === 'ar'
                      ? 'تأكيد حجز مائدة العشاء في رياض SDC'
                      : 'Reserve your Dinner at Riad SDC'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400">
                    {currentLang === 'fr'
                      ? 'Pour préserver la fraîcheur absolue des mets, les dîners sont préparés exclusivement sur réservation préalable.'
                      : currentLang === 'ar'
                      ? 'لضمان طهي طازج بأعلى معايير الجودة، يتم إعداد وجبات العشاء حصرياً بالحجز المسبق.'
                      : 'To ensure absolute market freshness, all palace dinners are crafted exclusively upon prior reservation.'}
                  </p>
                </div>

                {isBookedSuccess ? (
                  <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-[#c5a059] text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-serif-luxury text-white">
                        {currentLang === 'fr'
                          ? 'Demande de Réservation Enregistrée !'
                          : currentLang === 'ar'
                          ? 'تم تسجيل طلب حجز مائدتكم بنجاح!'
                          : 'Table Reservation Request Received!'}
                      </h4>
                      <p className="text-xs text-stone-300 max-w-md mx-auto">
                        {currentLang === 'fr'
                          ? `Votre table pour ${guestCount} personnes le ${serviceDate} à ${serviceTime} a bien été transmise à notre majordome.`
                          : currentLang === 'ar'
                          ? `تم إرسال طلبكم لـ ${guestCount} أشخاص بتاريخ ${serviceDate} على الساعة ${serviceTime} إلى خدمة الاستقبال.`
                          : `Your table request for ${guestCount} guests on ${serviceDate} at ${serviceTime} has been routed to our butler.`}
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleWhatsAppBooking}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{currentLang === 'fr' ? 'Confirmer sur WhatsApp Concierge' : currentLang === 'ar' ? 'تأكيد عبر واتساب' : 'Confirm via WhatsApp Butler'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsBookedSuccess(false);
                          onClose();
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        {currentLang === 'fr' ? 'Fermer' : currentLang === 'ar' ? 'إغلاق' : 'Close'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-5 bg-stone-900/50 p-6 rounded-2xl border border-stone-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{currentLang === 'fr' ? 'Date du dîner' : currentLang === 'ar' ? 'تاريخ العشاء' : 'Dinner Date'}</span>
                        </label>
                        <input
                          type="date"
                          value={serviceDate}
                          onChange={(e) => setServiceDate(e.target.value)}
                          required
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>

                      {/* Time */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{currentLang === 'fr' ? 'Heure de service' : currentLang === 'ar' ? 'وقت التقديم' : 'Service Time'}</span>
                        </label>
                        <select
                          value={serviceTime}
                          onChange={(e) => setServiceTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        >
                          <option value="19:30">19h30 - Service Crépuscule</option>
                          <option value="20:00">20h00 - Service aux Chandelles</option>
                          <option value="20:30">20h30 - Service Impérial</option>
                          <option value="21:00">21h00 - Service Nocturne</option>
                        </select>
                      </div>

                      {/* Guest Count */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{currentLang === 'fr' ? 'Nombre de convives' : currentLang === 'ar' ? 'عدد الضيوف' : 'Number of Guests'}</span>
                        </label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? (currentLang === 'fr' ? 'personne' : currentLang === 'ar' ? 'شخص' : 'guest') : (currentLang === 'fr' ? 'personnes' : currentLang === 'ar' ? 'أشخاص' : 'guests')}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Dining Area */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{currentLang === 'fr' ? 'Espace souhaité' : currentLang === 'ar' ? 'الفضاء المفضل' : 'Preferred Space'}</span>
                        </label>
                        <select
                          value={selectedArea}
                          onChange={(e) => setSelectedArea(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        >
                          {DINING_AREAS.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.name[currentLang]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Formula or à la carte */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-stone-300 block font-medium">
                        {currentLang === 'fr' ? 'Formule retenue' : currentLang === 'ar' ? 'القائمة المختارة' : 'Selected Tasting Formula'}
                      </label>
                      <select
                        value={selectedFormulaId}
                        onChange={(e) => setSelectedFormulaId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                      >
                        <option value="alacarte">
                          {currentLang === 'fr' ? 'Choix libre À la Carte sur place' : currentLang === 'ar' ? 'اختيار الأطباق مباشرة على المائدة' : 'À la carte selection on arrival'}
                        </option>
                        {GASTRONOMY_FORMULAS.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name[currentLang]} — {formatPrice(f.price, currency)} / convive
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guest Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium">
                          {currentLang === 'fr' ? 'Nom complet' : currentLang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Mme / M. Dupont"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium">
                          {currentLang === 'fr' ? 'Téléphone / WhatsApp' : currentLang === 'ar' ? 'الهاتف أو الواتساب' : 'Phone / WhatsApp'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+33 6 12 34 56 78"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Special requests / dietary notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-stone-300 block font-medium">
                        {currentLang === 'fr'
                          ? 'Préférences alimentaires ou célébration spéciale'
                          : currentLang === 'ar'
                          ? 'ملاحظات غذائية أو مناسبة خاصة (ذكرى، عيد ميلاد...)'
                          : 'Dietary preferences or special celebration notes'}
                      </label>
                      <input
                        type="text"
                        value={dietaryNotes}
                        onChange={(e) => setDietaryNotes(e.target.value)}
                        placeholder={
                          currentLang === 'fr'
                            ? 'Ex : Végétarien, sans gluten, anniversaire de mariage...'
                            : currentLang === 'ar'
                            ? 'مثال: نباتي، بدون غلوتين، ذكرى زواج...'
                            : 'e.g. Vegetarian, gluten-free, wedding anniversary...'
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-[11px] text-stone-400">
                        <span>{currentLang === 'fr' ? 'Confirmation immédiate par conciergerie' : currentLang === 'ar' ? 'تأكيد مباشر من خدمة الاستقبال' : 'Instant confirmation via butler concierge'}</span>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={handleWhatsAppBooking}
                          className="px-4 py-2.5 rounded-xl border border-emerald-600/60 text-emerald-400 hover:bg-emerald-950/40 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="submit"
                          className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d8b46e] text-stone-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                        >
                          {currentLang === 'fr' ? 'Confirmer la réservation' : currentLang === 'ar' ? 'تأكيد الحجز الآن' : 'Confirm Reservation'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-stone-800 bg-[#0f1318]/95 backdrop-blur-sm shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>
              {currentLang === 'fr'
                ? 'Dîner servi de 19h30 à 22h30 • Produits frais du marché de Bab Boujloud'
                : currentLang === 'ar'
                ? 'العشاء من 19:30 إلى 22:30 • خضار وتوابل طازجة يومياً من باب بوجلود'
                : 'Dinner service 19:30 - 22:30 • Fresh daily market produce from Bab Boujloud'}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {currentLang === 'fr' ? 'Fermer' : currentLang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
            <button
              type="button"
              onClick={() => setMainTab('reserve')}
              className="px-5 py-2 rounded-lg bg-[#c5a059] hover:bg-[#d8b46e] text-stone-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              {currentLang === 'fr' ? 'Réserver une table' : currentLang === 'ar' ? 'حجز طاولة' : 'Book a Table'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
