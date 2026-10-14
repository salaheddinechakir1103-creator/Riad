import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Clock,
  ShieldCheck,
  Heart,
  Calendar,
  Users,
  CheckCircle2,
  Droplets,
  Flower2,
  MessageCircle,
  Flame,
  Sun,
  Award,
} from 'lucide-react';
import { Language, Currency } from '../types';
import { SPA_TREATMENTS, formatPrice, IMAGES, FALLBACK_IMAGES } from '../data/riadData';

interface SpaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  currency: Currency;
  onBookSpa: () => void;
}

type SpaTab = 'treatments' | 'protocol' | 'ingredients' | 'booking';
type RitualFilter = 'all' | 'hammam' | 'massage' | 'facial' | 'package';

export const SpaModal: React.FC<SpaModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  currency,
  onBookSpa,
}) => {
  if (!isOpen) return null;

  const isRTL = currentLang === 'ar';
  const [activeTab, setActiveTab] = useState<SpaTab>('treatments');
  const [filterType, setFilterType] = useState<RitualFilter>('all');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('spa-1');

  // Booking Form State
  const [bookingDate, setBookingDate] = useState<string>('2026-10-15');
  const [bookingTime, setBookingTime] = useState<string>('15:00');
  const [sessionType, setSessionType] = useState<'solo' | 'duo'>('solo');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isSuccessBooked, setIsSuccessBooked] = useState<boolean>(false);

  const tabLabels: Record<SpaTab, { fr: string; en: string; ar: string }> = {
    treatments: { fr: 'Carte des Soins & Rituels', en: 'Treatments & Rituals', ar: 'قائمة الطقوس والعلاجات' },
    protocol: { fr: 'Le Cérémonial du Hammam', en: 'The Hammam Protocol', ar: 'مراحل طقس الحمام الأصيل' },
    ingredients: { fr: 'Élixirs & Ingrédients Purs', en: 'Pure Botanicals', ar: 'المكونات الطبيعية النقية' },
    booking: { fr: 'Réserver un Soin', en: 'Book a Ritual', ar: 'حجز جلسة خاصة' },
  };

  const filterLabels: Record<RitualFilter, { fr: string; en: string; ar: string }> = {
    all: { fr: 'Tous les rituels', en: 'All Rituals', ar: 'جميع العلاجات' },
    hammam: { fr: 'Bains & Hammam', en: 'Hammam Steam', ar: 'الحمام التقليدي' },
    massage: { fr: 'Massages Argan', en: 'Argan Massages', ar: 'تدليك الأركان' },
    facial: { fr: 'Soins Visage', en: 'Facials', ar: 'عناية الوجه' },
    package: { fr: 'Forfaits & Duos', en: 'Packages & Duos', ar: 'الباقات والأزواج' },
  };

  const filteredTreatments = SPA_TREATMENTS.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'hammam') return item.ritualType === 'hammam' || item.ritualType === 'scrub';
    if (filterType === 'massage') return item.ritualType === 'massage';
    if (filterType === 'facial') return item.ritualType === 'facial';
    if (filterType === 'package') return item.ritualType === 'package';
    return true;
  });

  const selectedTreatment =
    SPA_TREATMENTS.find((t) => t.id === selectedTreatmentId) || SPA_TREATMENTS[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessBooked(true);
  };

  const handleWhatsAppBooking = () => {
    const treatmentTitle = selectedTreatment.name[currentLang];
    const text = encodeURIComponent(
      `Bonjour Riad SDC, je souhaite réserver un rituel Hammam & Spa.\nSoin: ${treatmentTitle}\nDate: ${bookingDate}\nHeure: ${bookingTime}\nFormule: ${sessionType === 'duo' ? 'Privatisation Duo (2 pers)' : 'Solo (1 pers)'}\nNom: ${clientName || 'Client'}\nTél: ${clientPhone || 'Non précisé'}`
    );
    window.open(`https://wa.me/212661234567?text=${text}`, '_blank');
  };

  // The 5 sacred steps of the authentic Moroccan Hammam ritual
  const protocolSteps = [
    {
      num: '01',
      title: {
        fr: 'L’Éveil Thermique en Tadelakt',
        en: 'Thermal Chamber Awakening',
        ar: 'التهيئة الحرارية في قبة التادلاكت',
      },
      desc: {
        fr: 'Immersion sous la voûte chaude du hammam chauffée au bois. La douce vapeur purifiante ouvre délicatement les pores de la peau et apaise les tensions nerveuses.',
        en: 'Relaxation under the heated tadelakt dome. Aromatic humid steam softens the skin and dissolves muscular tightness.',
        ar: 'الاسترخاء تحت قبة الحمام الدافئة المصنوعة من التادلاكت الأصيل، حيث يفتح البخار المسام ويرخي العضلات.',
      },
      icon: Flame,
    },
    {
      num: '02',
      title: {
        fr: 'L’Onction au Savon Noir & Eucalyptus',
        en: 'Black Olive Soap & Eucalyptus Anointing',
        ar: 'التدليك بالصابون البلدي بالأوكالبتوس',
      },
      desc: {
        fr: 'Application généreuse de savon noir artisanal aux olives noires de l’Atlas et essence d’eucalyptus sauvage pour préparer l’épiderme à une exfoliation profonde.',
        en: 'Generous lather of artisanal Atlas black olive soap infused with mountain eucalyptus to prime the epidermis for purification.',
        ar: 'دهن الجسم بالصابون البلدي الطبيعي المصنوع من زيتون الأطلس وخلاصة الأوكالبتوس المهدئة للجلد.',
      },
      icon: Droplets,
    },
    {
      num: '03',
      title: {
        fr: 'Le Gommage Kessa Traditionnel',
        en: 'The Ancestral Kessa Exfoliation',
        ar: 'التقشير العميق بالكيس الحريري الفاسي',
      },
      desc: {
        fr: 'Friction méthodique et vigoureuse par notre kessala expérimentée sur la table de marbre chaud. Élimination complète des peaux mortes et relance de la micro-circulation.',
        en: 'Methodical exfoliating strokes using a virgin crepe kessa glove on heated marble, revealing radiant renewed skin.',
        ar: 'تقشير خبير ومتمرس يزيل الخلايا الميتة وينشط الدورة الدموية للجسم بالكامل.',
      },
      icon: Sparkles,
    },
    {
      num: '04',
      title: {
        fr: 'L’Enveloppement au Ghassoul des 7 Plantes',
        en: 'Atlas Ghassoul & 7 Herb Detox Wrap',
        ar: 'قناع الغاسول البركاني بالأعشاب السبعة',
      },
      desc: {
        fr: 'Masque corporel d’argile minérale de Moulouya parfumée à la camomille, myrte, lavande et rose de Kelaat M’Gouna pour reminéraliser la peau.',
        en: 'Mineral-rich Moulouya clay wrap scented with Atlas chamomile, lavender, myrtle, and rose petals to infuse essential minerals.',
        ar: 'تغطية الجسم بطمي الغاسول الجبلي المعطر باللافندر والورد والبابونج لترميم البشرة وتغذيتها.',
      },
      icon: Sun,
    },
    {
      num: '05',
      title: {
        fr: 'L’Onction Argan & Cascade de Rose',
        en: 'Argan Hydration & Rose Water Cascade',
        ar: 'الترطيب بزيت الأركان ورشاش ماء الورد',
      },
      desc: {
        fr: 'Rinçage rafraîchissant à l’eau distillée de rose pure, onction à l’huile d’argan biologique dorée, suivie d’un thé à la menthe servi au salon de repos.',
        en: 'Cool rinse with freshly distilled pure rosewater, rich golden argan moisturization, concluding with mint tea in the relaxation lounge.',
        ar: 'رشاش ماء الورد المقطر المنعش، تدليك بزيت الأركان النقي، وكوب شاي بالنعناع في صالة الاستراحة.',
      },
      icon: Flower2,
    },
  ];

  // Natural ingredients list
  const ingredientsList = [
    {
      name: { fr: 'Huile d’Argan Biologique Extra Vierge', en: '100% Pure Organic Argan Oil', ar: 'زيت الأركان العضوي البكر' },
      origin: { fr: 'Coopérative féminine d’Essaouira', en: 'Women cooperative of Essaouira', ar: 'تعاونية نسائية بالصويرة' },
      benefits: {
        fr: 'Pressée à froid selon la tradition, extraordinairement riche en vitamine E et oméga-6 pour régénérer la peau.',
        en: 'Cold-pressed traditionally, rich in antioxidant Vitamin E and essential Omega-6 to nourish and tone.',
        ar: 'معصور على البارد بالطريقة التقليدية وغني بفيتامين هـ لتغذية البشرة وتجديد حيويتها.',
      },
    },
    {
      name: { fr: 'Savon Noir Beldi à l’Olive & Eucalyptus', en: 'Heirloom Black Soap & Eucalyptus', ar: 'الصابون البلدي بزيت الزيتون والأوكالبتوس' },
      origin: { fr: 'Oliveraies séculaires de Volubilis', en: 'Heirloom groves of Volubilis', ar: 'بساتين زيتون وليلي التاريخية' },
      benefits: {
        fr: 'Pâte naturelle d’olives noires broyées et macérées au sel de potasse. Purifiant et adoucissant sans agresser.',
        en: 'Macerated crushed black olives naturally saponified. Non-abrasive, deep cleansing and softening.',
        ar: 'عجينة طبيعية خالية من الكيماويات تنظف البشرة بعمق وتكسبها نعومة فائقة.',
      },
    },
    {
      name: { fr: 'Ghassoul Pur de Moulouya aux 7 Plantes', en: 'Moulouya Ghassoul Mineral Clay', ar: 'الغاسول الطبيعي بسبعة أعشاب' },
      origin: { fr: 'Mines d’argile du Moyen-Atlas', en: 'Middle Atlas volcanic deposits', ar: 'مناجم الطمي البركاني بالأطلس' },
      benefits: {
        fr: 'Argile saponifère volcanique absorbante unique au monde. Élimine l’excès de sébum et revitalise les cheveux et le corps.',
        en: 'Unique natural saponiferous clay that gently absorbs impurities without stripping protective oils.',
        ar: 'طين بركاني فريد يمتص الشوائب والسموم ويمنح البشرة والشعر حيوية وبريقاً.',
      },
    },
    {
      name: { fr: 'Eau de Rose Pure Distillée à l’Alambic', en: 'Pure Copper-Distilled Rosewater', ar: 'ماء الورد البلدي المقطر' },
      origin: { fr: 'Vallée des Roses de Kelaat M’Gouna', en: 'Rose Valley of Kelaat M’Gouna', ar: 'قلعة مكونة وادي الورود' },
      benefits: {
        fr: 'Hydrolat précieux récolté à l’aube et distillé en alambic de cuivre traditionnel. Tonifie, apaise et resserre les pores.',
        en: 'Dawn-harvested Damascus rose petals distilled in copper alembics. Soothes redness and restores natural glow.',
        ar: 'مقطر في أوان نحاسية أصيلة، يهدئ البشرة ويعيد إليها نضارتها الطبيعية.',
      },
    },
    {
      name: { fr: 'Huile Précieuse de Pépins de Figue de Barbarie', en: 'Prickly Pear Seed Elixir', ar: 'زيت بذور التين الشوكي النادر' },
      origin: { fr: 'Terroir aride d’Aït Baamrane', en: 'Arid valleys of Ait Baamrane', ar: 'جنوب المغرب أيت بعمران' },
      benefits: {
        fr: 'L’huile végétale la plus précieuse au monde : tenseur naturel puissant aux vertus liftantes et anti-oxydantes incomparables.',
        en: 'The world’s most precious cosmetic oil, packed with natural sterols and Vitamin K for targeted anti-aging.',
        ar: 'أغلى زيت تجميلي في العالم، يشد البشرة ويحارب علامات التجاعيد بفاعلية مذهلة.',
      },
    },
  ];

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
                ? 'Sanctuaire Hammam & Spa • Riad SDC'
                : currentLang === 'ar'
                ? 'حمام وسبا الاسترخاء الملكي • رياض SDC'
                : 'Hammam & Wellness Sanctuary • Riad SDC'}
            </span>
            <span className="text-stone-600 text-xs hidden sm:inline">|</span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              {currentLang === 'fr' ? '100% Privatisé pour chaque séance' : currentLang === 'ar' ? 'خصوصية تامة 100%' : '100% Private Sessions'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors cursor-pointer"
            aria-label="Fermer le menu spa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Opulent Spa Hero Banner */}
          <div className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden bg-stone-950 shrink-0">
            <img
              src={IMAGES.spaRitual || IMAGES.hammamSpa}
              alt="Hammam traditionnel et spa au Riad SDC"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const fb = FALLBACK_IMAGES.spa;
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
                    ? 'Bains de Vapeur & Rituels Orientaux à Fès'
                    : currentLang === 'ar'
                    ? 'طقوس الحمام المغربي والجمال الأندلسي'
                    : 'Oriental Steam Sanctuary & Andalusian Wellness'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-white leading-tight">
                {currentLang === 'fr'
                  ? 'Le Hammam Impérial du Riad SDC'
                  : currentLang === 'ar'
                  ? 'الحمام الإمبراطوري في رياض SDC'
                  : 'Imperial Hammam & Spa Sanctuary'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                {currentLang === 'fr'
                  ? 'Entrez dans la douceur intemporelle de notre voûte en tadelakt ocre. Privatisation totale pour vous seul ou en couple, gommages aux gants de soie, onctions d’argan pur et parfums de rose de l’Atlas.'
                  : currentLang === 'ar'
                  ? 'عش تجربة الاسترخاء تحت قباب التادلاكت الفاسية الدافئة. خصخصة كاملة للحمام لراحتك أو للأزواج، تقشير كلاسيكي، زيوت أركان نقية وعبير ماء الورد البلدي.'
                  : 'Step into the timeless tranquility of our ochre tadelakt vaulted chamber. Complete private exclusivity, silk kessa scrubs, organic warm argan balms, and Atlas rosewater mist.'}
              </p>
            </div>
          </div>

          {/* 4 Main Navigation Tabs */}
          <div className="sticky top-0 z-10 bg-[#0d1014]/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 pt-3 pb-3 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            {(['treatments', 'protocol', 'ingredients', 'booking'] as SpaTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#c5a059] text-stone-950 font-semibold shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/70 border border-stone-800/80'
                }`}
              >
                {tabLabels[tab][currentLang]}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 md:p-8 space-y-8">
            {/* TAB 1: TREATMENTS CATALOG */}
            {activeTab === 'treatments' && (
              <div className="space-y-6">
                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-2 border-b border-stone-800/90 pb-4">
                  {(['all', 'hammam', 'massage', 'facial', 'package'] as RitualFilter[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilterType(f)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                        filterType === f
                          ? 'bg-stone-800 text-[#e6c888] border border-[#c5a059]/50'
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent'
                      }`}
                    >
                      {filterLabels[f][currentLang]}
                    </button>
                  ))}
                </div>

                {/* Treatment Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredTreatments.map((treatment) => {
                    const isSelected = selectedTreatmentId === treatment.id;

                    return (
                      <div
                        key={treatment.id}
                        className={`p-6 rounded-2xl bg-stone-900/60 border transition-all duration-200 flex flex-col justify-between gap-5 ${
                          isSelected
                            ? 'border-[#c5a059] bg-[#c5a059]/5 ring-1 ring-[#c5a059]/30'
                            : 'border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base sm:text-lg font-serif-luxury font-medium text-stone-100">
                              {treatment.name[currentLang]}
                            </h3>
                            <div className="text-right shrink-0">
                              <span className="text-lg sm:text-xl font-serif-luxury font-bold text-[#c5a059] tabular-nums block">
                                {formatPrice(treatment.price, currency)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-stone-400">
                            <span className="flex items-center gap-1 font-mono text-[#e6c888]">
                              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                              <span>{treatment.duration}</span>
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{currentLang === 'fr' ? 'Sanctuaire privatisé' : currentLang === 'ar' ? 'جلسة خاصة بالكامل' : '100% Private chamber'}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                            {treatment.desc[currentLang]}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                          <div className="text-[11px] text-stone-500">
                            {treatment.ritualType === 'package' && (
                              <span className="text-[#c5a059]">★ {currentLang === 'fr' ? 'Expérience Signature' : currentLang === 'ar' ? 'باقة متكاملة' : 'Signature Package'}</span>
                            )}
                            {treatment.ritualType !== 'package' && (
                              <span>100% Produits Bio</span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTreatmentId(treatment.id);
                              setActiveTab('booking');
                            }}
                            className="px-4 py-1.5 rounded-lg bg-[#c5a059] hover:bg-[#d8b46e] text-stone-950 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            {currentLang === 'fr' ? 'Réserver ce soin' : currentLang === 'ar' ? 'حجز هذا العلاج' : 'Book this treatment'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Natural guarantee banner */}
                <div className="p-4 sm:p-5 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center shrink-0 text-[#c5a059]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="text-xs text-stone-300">
                      <p className="font-semibold text-stone-200">
                        {currentLang === 'fr'
                          ? 'Garantie Pureté & Respect de l’Épiderme'
                          : currentLang === 'ar'
                          ? 'ضمان النقاء الطبيعي 100%'
                          : '100% Organic Purity & Skin Respect'}
                      </p>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        {currentLang === 'fr'
                          ? 'Savon noir sans additifs chimiques, argile ghassoul séchée au soleil, huile d’argan première pression.'
                          : currentLang === 'ar'
                          ? 'صابون بلدي بدون إضافات كيميائية، غاسول جبلي طبيعي، وزيت أركان معصور على البارد.'
                          : 'No synthetic additives. Sun-dried mineral clays and cold-pressed extra virgin oils only.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('ingredients')}
                    className="text-xs text-[#c5a059] hover:underline whitespace-nowrap cursor-pointer"
                  >
                    {currentLang === 'fr' ? 'En savoir plus sur nos ingrédients →' : currentLang === 'ar' ? 'اكتشف المكونات الطبيعية ←' : 'Learn more about our botanicals →'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: THE 5 SACRED STEPS PROTOCOL */}
            {activeTab === 'protocol' && (
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif-luxury text-white">
                    {currentLang === 'fr'
                      ? 'Les 5 Étapes du Véritable Hammam Marocain'
                      : currentLang === 'ar'
                      ? 'المراحل الخمس لطقس الحمام المغربي الأصيل'
                      : 'The 5 Sacred Steps of the Moroccan Hammam'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400">
                    {currentLang === 'fr'
                      ? 'Un art millénaire de purification physique et spirituelle, orchestré avec lenteur et bienveillance.'
                      : currentLang === 'ar'
                      ? 'فن عريق لتطهير الجسد والروح، يدار بأيدي كسالى خبيرات وفق التقاليد المغربية الأصيلة.'
                      : 'An ancestral art of physical and spiritual rejuvenation, choreographed in serene slow rhythm.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {protocolSteps.map((step) => {
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={step.num}
                        className="rounded-2xl p-6 bg-stone-900/50 border border-stone-800 flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-[#c5a059] tracking-widest font-bold">
                              PHASE {step.num}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-[#c5a059]">
                              <StepIcon className="w-4 h-4" />
                            </div>
                          </div>

                          <h4 className="text-base font-serif-luxury font-medium text-stone-100">
                            {step.title[currentLang]}
                          </h4>

                          <p className="text-xs text-stone-400 leading-relaxed">
                            {step.desc[currentLang]}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Private lounge conclusion card */}
                  <div className="rounded-2xl p-6 bg-[#c5a059]/10 border border-[#c5a059]/40 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059]">
                        <Heart className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-serif-luxury font-medium text-white">
                        {currentLang === 'fr' ? 'Le Salon de Repos & Théière d’Argent' : currentLang === 'ar' ? 'صالة الاسترخاء والشاي الفضي' : 'Tea & Relaxation Pavilion'}
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {currentLang === 'fr'
                          ? 'Drapez-vous dans un peignoir en coton moelleux. Savourez un thé à la menthe douce et des douceurs d’amande dans notre salon feutré.'
                          : currentLang === 'ar'
                          ? 'استرخ في رداء قطني مريح مع كأس شاي بالنعناع الطازج وحلويات اللوز الفاسية في أجواء موسيقية هادئة.'
                          : 'Wrap yourself in Egyptian cotton robes. Sip gentle mint tea and homemade almond treats in our quiet candlelit alcove.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('booking')}
                      className="w-full py-2 rounded-lg bg-[#c5a059] text-stone-950 font-semibold text-xs uppercase tracking-wider hover:bg-[#d8b46e] transition-colors cursor-pointer"
                    >
                      {currentLang === 'fr' ? 'Réserver l’expérience' : currentLang === 'ar' ? 'احجز التجربة الآن' : 'Book Experience'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PURE BOTANICAL INGREDIENTS */}
            {activeTab === 'ingredients' && (
              <div className="space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif-luxury text-white">
                    {currentLang === 'fr'
                      ? 'Les Trésors de la Pharmacopée Marocaine'
                      : currentLang === 'ar'
                      ? 'كنوز الأعشاب والزيوت الطبيعية المغربية'
                      : 'Treasures of Moroccan Botanical Apothecary'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400">
                    {currentLang === 'fr'
                      ? 'Directement sourcés auprès de coopératives éco-responsables de femmes rurales de l’Atlas et d’Essaouira.'
                      : currentLang === 'ar'
                      ? 'مستوردة مباشرة من تعاونيات نسائية ريفية مسؤولة في جبال الأطلس والصويرة وقلعة مكونة.'
                      : 'Directly sourced from fair-trade women cooperatives across the Atlas mountains and coastal Essaouira.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {ingredientsList.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-stone-900/50 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-base font-serif-luxury font-medium text-stone-100">
                            {ing.name[currentLang]}
                          </h4>
                          <span className="text-[11px] text-[#c5a059] font-mono">
                            [{ing.origin[currentLang]}]
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                          {ing.benefits[currentLang]}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 text-xs text-stone-400">
                        <Award className="w-4 h-4 text-[#c5a059]" />
                        <span>100% Bio & Éthique</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: INTERACTIVE APPOINTMENT BOOKING FORM */}
            {activeTab === 'booking' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif-luxury text-white">
                    {currentLang === 'fr'
                      ? 'Réserver votre Séance Hammam Privatisée'
                      : currentLang === 'ar'
                      ? 'حجز موعد في الحمام والسبا الملكي'
                      : 'Book your Private Hammam Session'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400">
                    {currentLang === 'fr'
                      ? 'Afin de vous garantir un calme absolu, le hammam est entièrement privatisé pour chaque créneau horaire.'
                      : currentLang === 'ar'
                      ? 'لضمان الاسترخاء والخصوصية التامة، يخصص الحمام لك بالكامل خلال موعدك المحدد.'
                      : 'To preserve tranquility and hygiene, our steam sanctuary is strictly privatized for each individual booking.'}
                  </p>
                </div>

                {isSuccessBooked ? (
                  <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-[#c5a059] text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-serif-luxury text-white">
                        {currentLang === 'fr'
                          ? 'Votre Séance est Enregistrée !'
                          : currentLang === 'ar'
                          ? 'تم تسجيل موعدكم بنجاح!'
                          : 'Your Spa Ritual is Scheduled!'}
                      </h4>
                      <p className="text-xs text-stone-300 max-w-md mx-auto">
                        {currentLang === 'fr'
                          ? `Le soin "${selectedTreatment.name[currentLang]}" a été noté pour le ${bookingDate} à ${bookingTime} (${sessionType === 'duo' ? 'Duo 2 personnes' : 'Solo 1 personne'}).`
                          : currentLang === 'ar'
                          ? `تم تأكيد حجز "${selectedTreatment.name[currentLang]}" بتاريخ ${bookingDate} على الساعة ${bookingTime}.`
                          : `The ritual "${selectedTreatment.name[currentLang]}" has been scheduled for ${bookingDate} at ${bookingTime}.`}
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
                          setIsSuccessBooked(false);
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
                    {/* Selected Treatment Preview */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-stone-300 block font-medium">
                        {currentLang === 'fr' ? 'Soin ou Rituel sélectionné' : currentLang === 'ar' ? 'العلاج المختار' : 'Selected Ritual'}
                      </label>
                      <select
                        value={selectedTreatmentId}
                        onChange={(e) => setSelectedTreatmentId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                      >
                        {SPA_TREATMENTS.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name[currentLang]} ({t.duration}) — {formatPrice(t.price, currency)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{currentLang === 'fr' ? 'Date souhaitée' : currentLang === 'ar' ? 'تاريخ الجلسة' : 'Preferred Date'}</span>
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          required
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>

                      {/* Time slot */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{currentLang === 'fr' ? 'Créneau horaire' : currentLang === 'ar' ? 'توقيت الجلسة' : 'Time Slot'}</span>
                        </label>
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        >
                          <option value="10:30">10h30 - Matinée Éveil Doux</option>
                          <option value="12:00">12h00 - Bain Solaire</option>
                          <option value="15:00">15h00 - Après-midi Sérénité</option>
                          <option value="17:00">17h00 - Crépuscule Détente</option>
                          <option value="19:00">19h00 - Soirée Chandelles</option>
                        </select>
                      </div>

                      {/* Solo or Duo */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs text-stone-300 block font-medium flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{currentLang === 'fr' ? 'Format de la séance' : currentLang === 'ar' ? 'نوع الجلسة' : 'Session Format'}</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setSessionType('solo')}
                            className={`p-3 rounded-lg border text-xs text-center font-medium transition-colors cursor-pointer ${
                              sessionType === 'solo'
                                ? 'border-[#c5a059] bg-[#c5a059]/10 text-white font-semibold'
                                : 'border-stone-700 bg-stone-950 text-stone-400 hover:text-stone-200'
                            }`}
                          >
                            {currentLang === 'fr' ? 'Solo (1 personne)' : currentLang === 'ar' ? 'فردي (شخص واحد)' : 'Solo (1 guest)'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setSessionType('duo')}
                            className={`p-3 rounded-lg border text-xs text-center font-medium transition-colors cursor-pointer ${
                              sessionType === 'duo'
                                ? 'border-[#c5a059] bg-[#c5a059]/10 text-white font-semibold'
                                : 'border-stone-700 bg-stone-950 text-stone-400 hover:text-stone-200'
                            }`}
                          >
                            {currentLang === 'fr' ? 'Duo / Couple (2 personnes)' : currentLang === 'ar' ? 'ثنائي / أزواج (شخصان)' : 'Duo / Couple (2 guests)'}
                          </button>
                        </div>
                      </div>

                      {/* Client Name & Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-stone-300 block font-medium">
                          {currentLang === 'fr' ? 'Nom complet' : currentLang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Mme / M. Martin"
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
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+33 6 12 34 56 78"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Special Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-stone-300 block font-medium">
                        {currentLang === 'fr'
                          ? 'Sensibilités particulières ou demandes (grossesse, allergies, intensité souhaitée)'
                          : currentLang === 'ar'
                          ? 'ملاحظات صحية خاصة (حمل، حساسية، قوة التدليك المفضلة...)'
                          : 'Health notes or preferences (pregnancy, allergies, massage pressure)'}
                      </label>
                      <input
                        type="text"
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        placeholder={
                          currentLang === 'fr'
                            ? 'Ex : Pression modérée, peau sensible...'
                            : currentLang === 'ar'
                            ? 'مثال: بشرة حساسة، تفضيل تدليك ناعم...'
                            : 'e.g. Medium pressure, sensitive skin...'
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>

                    {/* Pricing summary */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-stone-300">
                        <span className="text-stone-400">{currentLang === 'fr' ? 'Tarif total estimé : ' : currentLang === 'ar' ? 'السعر التقديري: ' : 'Total Estimated: '}</span>
                        <span className="text-lg font-serif-luxury font-bold text-[#c5a059] tabular-nums">
                          {formatPrice(
                            sessionType === 'duo' && selectedTreatment.ritualType !== 'package'
                              ? selectedTreatment.price * 1.8
                              : selectedTreatment.price,
                            currency
                          )}
                        </span>
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
                          {currentLang === 'fr' ? 'Confirmer la séance' : currentLang === 'ar' ? 'تأكيد الحجز الآن' : 'Confirm Session'}
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
                ? 'Ouvert tous les jours de 10h00 à 21h00 • Serviettes, peignoirs et babouches fournis'
                : currentLang === 'ar'
                ? 'مفتوح يومياً من 10:00 إلى 21:00 • المناشف وأرواب الحمام القطنية متوفرة'
                : 'Open daily 10:00 to 21:00 • Linens, bathrobes, and slippers provided'}
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
              onClick={() => setActiveTab('booking')}
              className="px-5 py-2 rounded-lg bg-[#c5a059] hover:bg-[#d8b46e] text-stone-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              {currentLang === 'fr' ? 'Réserver un soin' : currentLang === 'ar' ? 'حجز جلسة' : 'Book a Ritual'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
