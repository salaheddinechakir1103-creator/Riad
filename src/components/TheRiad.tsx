import React, { useState } from 'react';
import { Sparkles, Layers, Eye, Shield, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { IMAGES, FALLBACK_IMAGES } from '../data/riadData';

interface TheRiadProps {
  currentLang: Language;
}

interface ArchitecturalElement {
  id: string;
  name: { fr: string; en: string; ar: string };
  category: { fr: string; en: string; ar: string };
  description: { fr: string; en: string; ar: string };
  materialOrigin: { fr: string; en: string; ar: string };
  masteryYear: string;
  image: string;
}

export const TheRiad: React.FC<TheRiadProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const elements: ArchitecturalElement[] = [
    {
      id: 'courtyard',
      name: {
        fr: 'Le Patio à Ciel Ouvert',
        en: 'The Open-Sky Courtyard',
        ar: 'الصحن المركزي المفتوح للسماء',
      },
      category: {
        fr: 'Cœur Bioclimatique',
        en: 'Bioclimatic Sanctuary',
        ar: 'قلب الرياض والمناخ الطبيعي',
      },
      description: {
        fr: 'Conçu selon les principes de l’architecture arabo-andalouse, le patio central régule naturellement la température en captant la fraîcheur nocturne pour la restituer en journée sous les galeries ombragées.',
        en: 'Engineered according to ancient Andalusian bioclimatic wisdom, the central courtyard captures night mountain air and gently releases refreshing coolness throughout shaded daytime arcades.',
        ar: 'صُمم وفق أصول الهندسة الأندلسية العريقة ليعمل كمنظم مناخي طبيعي يخزن هواء الليل العليل وينشره نهاراً في الأروقة المظللة.',
      },
      materialOrigin: {
        fr: 'Marbre blanc, agrumiers et jasmin étoilé',
        en: 'White marble, citrus trees & star jasmine',
        ar: 'رخام أبيض، أشجار النارنج وياسمين فاس',
      },
      masteryYear: '1894',
      image: IMAGES.heroCourtyard,
    },
    {
      id: 'fountain',
      name: {
        fr: 'Fontaine Octogonale en Marbre',
        en: 'Octagonal Marble Basin',
        ar: 'النافورة الرخامية المثمنة',
      },
      category: {
        fr: 'Harmonie & Acoustique',
        en: 'Acoustic Serenity',
        ar: 'خرير الماء والسكينة الروحية',
      },
      description: {
        fr: 'Le clapotis continu de l’eau absorbe les échos urbains et diffuse une sensation immédiate d’apaisement. Des pétales de roses fraîches y flottent chaque matin selon la tradition d’accueil.',
        en: 'The constant gentle droplet melody cancels out external city murmur and instills instant serenity. Fresh garden rose petals float each morning welcoming honored guests.',
        ar: 'يمتص خرير الماء الدائم أصوات المدينة العتيقة ويضفي سكينة لا مثيل لها، تطفو فوقه بتلات الورد الطبيعي يومياً ترحيباً بالضيوف.',
      },
      materialOrigin: {
        fr: 'Marbre de Carrare & pierre calcaire de Zalagh',
        en: 'Carrara marble & Mount Zalagh limestone',
        ar: 'رخام أبيض وحجر جبل زلاغ الفاسي',
      },
      masteryYear: '1898',
      image: IMAGES.heroCourtyard,
    },
    {
      id: 'zellige',
      name: {
        fr: 'Zellige Polychrome Taillé Main',
        en: 'Hand-Chiseled Ceramic Zellige',
        ar: 'الزليج الفاسي المنقوش باليد',
      },
      category: {
        fr: 'Mosaïque Mathématique',
        en: 'Sacred Mathematics',
        ar: 'الهندسة الرياضية الإسلامية',
      },
      description: {
        fr: 'Chaque tesselle est taillée au marteau biseauté avec une précision millimétrique. Les motifs d’étoiles à 8 et 16 branches forment un hommage visuel à la perfection cosmique.',
        en: 'Each tiny enamel tessera is cut by hand with an angled iron hammer. The interlocking 8- and 16-pointed stars form a sacred Moroccan visual tribute to cosmic balance.',
        ar: 'تُقطع كل قطعة خزفية بدقة متناهية بمطرقة المنقاش الحديدية، لتشكل نجوماً ثمانية وسداسية عشرية تعبر عن التناغم والكمال الهندسي.',
      },
      materialOrigin: {
        fr: 'Argile pure de Fès cuite au feu de noyaux d’olives',
        en: 'Pure Fes grey clay fired with olive pits',
        ar: 'طين فاس الرمادي محروق بنوى الزيتون',
      },
      masteryYear: '1902',
      image: IMAGES.suiteZellige,
    },
    {
      id: 'cedar',
      name: {
        fr: 'Plafonds & Moucharabiehs en Cèdre',
        en: 'Atlas Cedar Ceilings & Mashrabiya',
        ar: 'أسقف الأرز والزواق والمشربيات',
      },
      category: {
        fr: 'Ébénisterie Impériale',
        en: 'Imperial Woodcraft',
        ar: 'صنعة النجارة والزواق الإمبراطورية',
      },
      description: {
        fr: 'Sculpté dans le cèdre résineux du Moyen-Atlas, le bois diffuse une fragrance boisée envoûtante et incorruptible. Les moucharabiehs préservent l’intimité tout en filtrant délicatement la lumière dorée.',
        en: 'Hand-carved from resinous Middle Atlas cedar, the timbers release an intoxicating, insect-resistant woody scent. Mashrabiya lattices protect intimacy while filtering sunlight.',
        ar: 'نُحتت من خشب أرز جبال الأطلس المتوسط المقاوم للزمن والمتميز بعبيره الطبيعي الزكي، وتمنح المشربيات خصوصية تامة مع تصفية نور الشمس.',
      },
      materialOrigin: {
        fr: 'Cèdre de l’Atlas & pigments végétaux naturels',
        en: 'Atlas Cedar & botanical tempera dyes',
        ar: 'خشب أرز الأطلس وأصباغ نباتية طبيعية',
      },
      masteryYear: '1895',
      image: IMAGES.suiteFassi,
    },
    {
      id: 'tadelakt',
      name: {
        fr: 'Enduits en Tadelakt & Plâtre Ciselé',
        en: 'Polished Tadelakt & Chiseled Plaster',
        ar: 'التادلاكت المصقول ونقش الجبس',
      },
      category: {
        fr: 'Matières Organiques',
        en: 'Organic Surfaces',
        ar: 'المواد الطبيعية المصقولة',
      },
      description: {
        fr: 'L’enduit traditionnel à la chaux de Marrakech est serré au galet et savon noir, conférant aux murs un toucher soyeux et hydrofuge. Au-dessus, les frises de plâtre sont ciselées à la main.',
        en: 'Natural lime plaster burnished with smooth river pebbles and olive oil soap gives walls an impervious silky touch, crowned with lace-like chiseled plasterwork.',
        ar: 'جير طبيعي مصقول بحصى الأودية الملساء والصابون البلدي يمنح الجدران ملمساً حريرياً مقاوماً للرطوبة، تعلوه نقوش جبسية مفرغة باليد.',
      },
      materialOrigin: {
        fr: 'Chaux grasse, savon noir à l’huile d’olive & plâtre fin',
        en: 'Hydraulic lime, olive oil soap & fine alabaster plaster',
        ar: 'جير وادي أوريكا، صابون زيت الزيتون وجبس أبيض',
      },
      masteryYear: '1906',
      image: IMAGES.hammamSpa,
    },
    {
      id: 'rooftop',
      name: {
        fr: 'Terrasse Panoramique au Sommet',
        en: 'Panoramic Medina Rooftop Terrace',
        ar: 'السطح البانورامي المشرف على فاس',
      },
      category: {
        fr: 'Horizon & Crépuscule',
        en: 'Skyline & Sunset Vista',
        ar: 'أفق فاس ومغيب الشمس الخالد',
      },
      description: {
        fr: 'Une vue imprenable à 360° surplombant les toits de tuiles vertes de la mosquée Al Quaraouiyine, les collines du Zalagh et les remparts mérinides éclairés par les derniers rayons du soleil.',
        en: 'A commanding 360-degree vista looking out over green-tiled roofs of Al Quaraouiyine, Mount Zalagh ridges, and medieval Marinid ramparts illuminated in golden light.',
        ar: 'إطلالة بانورامية كاشفة لأسطح فاس القديمة ومآذنها، وقرميد جامع القرويين الأخضر، وجبال زلاغ وأسوار المرينيين عند الأصيل.',
      },
      materialOrigin: {
        fr: 'Fronde en fer forgé, banquettes berbères & lanternes de cuivre',
        en: 'Wrought iron balustrades, Berber divans & copper lamps',
        ar: 'درابزين حديد مشغول، جلسات مغربية وفوانيس نحاسية',
      },
      masteryYear: '1910',
      image: IMAGES.rooftopSunset,
    },
  ];

  const [activeElement, setActiveElement] = useState<ArchitecturalElement>(elements[0]);

  return (
    <section
      id="le-riad"
      className="relative py-24 sm:py-32 bg-[#090b0d] text-[#f5f0ea] border-t border-stone-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            {t.theRiad.tagline}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight mb-4">
            {t.theRiad.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.theRiad.subtitle}
          </p>
        </div>

        {/* Interactive Masterpiece Split Visualizer (Image first on mobile/tablet, side-by-side on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Right Column: Visual Spotlight (order-1 on mobile, order-2 on lg) */}
          <div className="order-1 lg:order-2 lg:col-span-7 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-stone-800 overflow-hidden bg-stone-900/80 shadow-2xl">
              <div className="relative h-[280px] sm:h-[380px] md:h-[420px] overflow-hidden">
                <img
                  src={activeElement.image}
                  alt={activeElement.name[currentLang]}
                  className="w-full h-full object-cover transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fb = FALLBACK_IMAGES.courtyard;
                    if (e.currentTarget.src !== fb) {
                      e.currentTarget.src = fb;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs text-stone-300 flex items-center gap-1.5 sm:gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Artisanat Classé Maâlem Fassi</span>
                </div>
              </div>

              {/* Detail Content */}
              <div className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-stone-800 pb-3 sm:pb-4">
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
                      {activeElement.category[currentLang]}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#f5f0ea] mt-0.5">
                      {activeElement.name[currentLang]}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] sm:text-xs text-stone-400 block">Édification</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#c5a059] font-mono">
                      Année {activeElement.masteryYear}
                    </span>
                  </div>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {activeElement.description[currentLang]}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-xs text-stone-400 border-t border-stone-800/60">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>Matières : {activeElement.materialOrigin[currentLang]}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column: Interactive Element Selector Cards (order-2 on mobile, order-1 on lg) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-2.5 sm:space-y-3">
            {elements.map((el) => {
              const isSelected = activeElement.id === el.id;
              return (
                <div
                  key={el.id}
                  onClick={() => setActiveElement(el)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveElement(el);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  className={`w-full text-left p-3.5 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 border-[#c5a059] shadow-lg ring-1 ring-[#c5a059]/40'
                      : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c5a059] font-medium">
                      {el.category[currentLang]}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-500 font-mono">
                      {el.masteryYear}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-serif-luxury text-stone-100 mt-1 font-medium">
                    {el.name[currentLang]}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-1 line-clamp-2">
                    {el.description[currentLang]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
