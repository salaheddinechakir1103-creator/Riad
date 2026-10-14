import { Room, Experience, Landmark, Hotspot, Review, GalleryItem } from '../types';

import heroCourtyardImg from '../assets/images/hero_riad_courtyard_1791827281010.jpg';
import suiteFassiImg from '../assets/images/suite_fassi_bedroom_1791827291775.jpg';
import suiteZelligeImg from '../assets/images/suite_zellige_luxury_1791827303814.jpg';
import rooftopSunsetImg from '../assets/images/riad_rooftop_sunset_1791827314407.jpg';
import hammamSpaImg from '../assets/images/moroccan_hammam_spa_1791827324510.jpg';
import diningTableImg from '../assets/images/moroccan_royal_dining_table_1791838023553.jpg';
import spaRitualImg from '../assets/images/moroccan_spa_hammam_ritual_1791838032736.jpg';

// Guaranteed fallback CDN images in case of network or browser restrictions
export const FALLBACK_IMAGES = {
  suiteFassi: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80',
  suiteZellige: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  suiteAndalousie: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
  chambreAlBatha: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=1200&q=80',
  courtyard: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
  rooftopSunset: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
  hammamSpa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  dining: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
};

// Real generated high-fidelity asset paths (resolved via Vite asset bundling with guaranteed CDN fallback)
export const IMAGES = {
  heroCourtyard: heroCourtyardImg || FALLBACK_IMAGES.courtyard,
  suiteFassi: suiteFassiImg || FALLBACK_IMAGES.suiteFassi,
  suiteZellige: suiteZelligeImg || FALLBACK_IMAGES.suiteZellige,
  rooftopSunset: rooftopSunsetImg || FALLBACK_IMAGES.rooftopSunset,
  hammamSpa: hammamSpaImg || FALLBACK_IMAGES.hammamSpa,
  diningTable: diningTableImg || FALLBACK_IMAGES.dining,
  spaRitual: spaRitualImg || FALLBACK_IMAGES.spa,
};

export const ROOMS: Room[] = [
  {
    id: 'suite-fassi',
    name: 'Suite Fassi',
    titleKey: 'suiteFassi',
    category: 'Master Royal Suite',
    size: '68 m²',
    capacity: '2 - 3 Personnes',
    bed: 'Lit King Size Impérial',
    pricePerNight: 360,
    available: true,
    image: IMAGES.suiteFassi,
    description: {
      fr: 'Une ode vivante à l’art fassi. Cette suite d’exception présente une alcôve en stuc ouvragé à la main, un plafond en cèdre sculpté d’époque, et des étoffes soyeuses tissées à la main dans les ateliers de la médina.',
      en: 'A living ode to ancestral Fassi refinement. This extraordinary suite features a hand-carved stucco alcove, period carved Atlas cedar ceiling, and pure Moroccan silk fabrics woven in historic medina ateliers.',
      ar: 'قصيدة معمارية في الفن الفاسي الأصيل. يضم هذا الجناح الملكي قبة جبسية منحوتة يدوياً، وسقفاً من خشب الأرز الأطلسي، وأقمشة حريرية نُسجت في ورشات فاس القديمة.',
    },
    amenities: [
      'Climatisation réversible silencieuse',
      'Wi-Fi Haute Vitesse Fibre Dédiée',
      'Salle de bain en marbre blanc & tadelakt',
      'Baignoire îlot sculptée & douche à l’italienne',
      'Petit-déjeuner gastronomique fassi inclus',
      'Produits de bain bio à la fleur d’oranger et argan',
      'Service majordome & thé à la menthe 24h/24',
      'Coffre-fort & machine expresso en chambre',
    ],
    features: ['Vue sur patio fleuri', 'Salon privé en cèdre', 'Dressing sur-mesure'],
  },
  {
    id: 'suite-zellige',
    name: 'Suite Zellige',
    titleKey: 'suiteZellige',
    category: 'Prestige Heritage Suite',
    size: '56 m²',
    capacity: '2 Personnes',
    bed: 'Lit King Size Ergonomique',
    pricePerNight: 310,
    available: true,
    image: IMAGES.suiteZellige,
    description: {
      fr: 'Sublimée par une frise magistrale de zellige polychrome cobalt et émeraude, cette suite offre une ambiance feutrée où le marbre frais côtoie la chaleur des tapis berbères noués main du Moyen-Atlas.',
      en: 'Highlighted by an intricate frieze of cobalt and emerald polychrome zellige mosaic, this serene suite merges cooling marble with the plush warmth of hand-knotted Middle Atlas wool rugs.',
      ar: 'يتألق هذا الجناح بإفريز مبهر من الزليج الفاسي بلوني الأزرق والزمرد، ممتزجاً بدفء الزرابي الأطلسية المصنوعة يدوياً من الصوف الطبيعي.',
    },
    amenities: [
      'Climatisation douce réglable',
      'Wi-Fi Fibre 200 Mbps',
      'Salle d’eau en tadelakt émeraude',
      'Douche pluie tropicale & vasques en cuivre',
      'Petit-déjeuner fassi servi en suite ou patio',
      'Linge de lit en satin de coton d’Égypte',
      'Coin salon de lecture avec bibliothèque d’art',
    ],
    features: ['Frise de zellige authentique', 'Fauteuil velours émeraude', 'Cheminée d’époque'],
  },
  {
    id: 'suite-andalousie',
    name: 'Suite Andalousie',
    titleKey: 'suiteAndalousie',
    category: 'Duplex Panoramic Suite',
    size: '78 m²',
    capacity: '2 - 4 Personnes',
    bed: 'Lit King Size + Salon Modulable',
    pricePerNight: 430,
    available: true,
    image: IMAGES.rooftopSunset,
    description: {
      fr: 'Majestueux duplex sous les combles du riad avec accès direct privilégié à la terrasse supérieure. Vue panoramique spectaculaire sur les toits de la médina et les collines de Zalagh.',
      en: 'A stately duplex beneath the riad’s ancient timber eaves featuring direct private access to the upper rooftop terrace, offering panoramic sunset vistas over Fes minarets.',
      ar: 'دوبلكس ملكي ساحر تحت أسقف الرياض الخشبية العتيقة مع مدخل مباشر لسطح الرياض البانورامي وإطلالة أخاذة على مآذن فاس العتيقة عند الغروب.',
    },
    amenities: [
      'Accès terrasse privé au crépuscule',
      'Double salon marocain et contemporain',
      'Salle de bain double vasque marbre noir',
      'Baignoire jacuzzi en alcôve tadelakt',
      'Wi-Fi Fibre & Espace bureau d’écriture',
      'Service thé & pâtisseries fassies de bienvenue',
      'Service de conciergerie privée VIP',
    ],
    features: ['Terrasse panoramique directe', 'Configuration duplex', 'Baignoire balnéo'],
  },
  {
    id: 'chambre-al-batha',
    name: 'Chambre Al-Batha',
    titleKey: 'chambreAlBatha',
    category: 'Deluxe Patio Room',
    size: '42 m²',
    capacity: '2 Personnes',
    bed: 'Lit Queen Size Confort Suprême',
    pricePerNight: 240,
    available: true,
    image: IMAGES.heroCourtyard,
    description: {
      fr: 'Située au rez-de-chaussée face à la fontaine octogonale, cette chambre intime s’ouvre directement sur le murmure de l’eau et le parfum des orangers en fleur.',
      en: 'Situated on the ground floor facing the central octagonal fountain, this intimate sanctuary opens directly to soothing falling water sounds and blossoming citrus trees.',
      ar: 'تقع في الطابق الأرضي مقابل نافورة الرياض الثمانية، لتستيقظ كل صباح على خرير الماء العذب وشذى أزهار النارنج الفواح.',
    },
    amenities: [
      'Accès de plain-pied au patio central',
      'Salle d’eau en tadelakt ivoire',
      'Douche à l’italienne carrelée zellige',
      'Petit-déjeuner traditionnel inclus',
      'Wi-Fi Fibre & Literie d’exception',
      'Plateau de courtoisie & infusions bio',
    ],
    features: ['Accès direct fontaine', 'Clarté naturelle du patio', 'Boiseries sculptées'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'moroccan-breakfast',
    title: {
      fr: 'Petit-Déjeuner Royal Fassi',
      en: 'Royal Fassi Breakfast',
      ar: 'الإفطار الملكي الفاسي',
    },
    subtitle: {
      fr: 'Saveurs du terroir & miel de montagne',
      en: 'Local flavors & mountain honey',
      ar: 'نكهات الأصالة وعسل الجبال',
    },
    description: {
      fr: 'Servi chaque matin dans le patio au son de la fontaine ou sur la terrasse ensoleillée. Baghrir aux mille trous, msemen croustillant, huile d’olive de Zerhoun, amlou aux amandes de l’Atlas, œufs fermiers au cumin et jus d’oranges fraîches pressées à la minute.',
      en: 'Served daily in the sunlit courtyard by the fountain or atop the terrace. Hand-griddled baghrir pancakes, flaky msemen, Zerhoun olive oil, Atlas stone-ground almond amlou, farm eggs, and fresh-squeezed orange juice.',
      ar: 'يقدم يومياً في صحن الرياض أو على السطح المشمس. البغرير المغربي، المسمن المقرمش، زيت زيتون زرهون، أملو باللوز البلدي، وعصير البرتقال الطازج.',
    },
    duration: 'Tous les matins • Inclus',
    image: IMAGES.heroCourtyard,
    tag: 'Gastronomie',
  },
  {
    id: 'fassi-dinner',
    title: {
      fr: 'Dîner Gastronomique Fassi',
      en: 'Authentic Fassi Fine Dining',
      ar: 'العشاء الفاسي الرفيع',
    },
    subtitle: {
      fr: 'L’apogée de la cuisine impériale',
      en: 'The pinnacle of imperial cuisine',
      ar: 'قمة فن الطبخ الإمبراطوري',
    },
    description: {
      fr: 'Célébrée comme la plus raffinée du monde arabe, la gastronomie fassie vous est dévoilée à la lueur des bougies : pastilla au pigeon et amandes caramélisées parfumée à la fleur d’oranger, tajine d’agneau confit aux pruneaux et graines de sésame torréfiées.',
      en: 'Acclaimed as the most sophisticated in North Africa, Fassi gastronomy unfolds by candlelight: crisp pigeon pastilla with caramelized almonds and orange blossom essence, slow-braised lamb tagine with honeyed prunes and toasted sesame.',
      ar: 'تعد فاس عاصمة الطبخ المغربي الرفيع. استمتع بعشاء على ضوء الشموع يضم بسطيلة الحمام باللوز وماء الزهر، وطاجين لحم الخروف بالبرقوق المعسل.',
    },
    duration: '2h30 • Sur réservation',
    image: IMAGES.suiteFassi,
    tag: 'Culinaire',
  },
  {
    id: 'hammam-traditionnel',
    title: {
      fr: 'Hammam Privé & Soins à l’Argan',
      en: 'Private Hammam & Argan Spa',
      ar: 'الحمام الملكي والتدليك بالأركان',
    },
    subtitle: {
      fr: 'Rituel thermal séculaire',
      en: 'Centuries-old thermal ritual',
      ar: 'طقوس الاسترخاء المغربية الأصيلة',
    },
    description: {
      fr: 'Dans notre hammam voûté en tadelakt chauffé à la vapeur douce, vivez la purification ancestrale au savon noir à l’eucalyptus, gommage à la kessa par nos praticiennes expertes, enveloppement au ghassoul des monts de l’Atlas et massage relaxant à l’huile d’argan pure.',
      en: 'In our vaulted heated tadelakt bath sanctuary, experience complete mind-body purification: eucalyptus black soap lather, vigorous kessa glove exfoliation, mineral-rich Atlas ghassoul clay cocoon, and a restorative pure argan oil massage.',
      ar: 'في حمامنا المقبب بالتادلاكت والمدفأ بالبخار، استمتع بالصابون البلدي بالكينا، والتقشير بالكيس، والغاسول البركاني، ثم التدليك المهدئ بزيت الأركان النقي.',
    },
    duration: '90 min • Privatisé',
    image: IMAGES.hammamSpa,
    tag: 'Bien-être',
  },
  {
    id: 'cooking-class',
    title: {
      fr: 'Masterclass de Cuisine avec le Chef',
      en: 'Chef’s Culinary Masterclass',
      ar: 'ورشة فنون الطبخ الفاسي',
    },
    subtitle: {
      fr: 'Du souk aux épices jusqu’au tajine',
      en: 'From the spice souks to the clay pot',
      ar: 'من أسواق التوابل إلى طهي الطاجين',
    },
    description: {
      fr: 'Commencez par une promenade matinale avec notre chef dans le marché du quartier pour sélectionner épices rares, coriandre fraîche et légumes du terroir. De retour au riad, apprenez les secrets d’assaisonnement du ras el hanout et composez votre propre festin.',
      en: 'Begin with a morning walk alongside our chef through lively local spice stalls to select heirloom herbs, rare saffron, and seasonal produce. Return to our riad kitchen to master the nuances of ras el hanout and slow clay tagine cookery.',
      ar: 'جولة صباحية مع شيف الرياض في سوق التوابل لاختيار الزعفران والأعشاب، ثم تعلم أسرار رأس الحانوت وإعداد الطاجين المغربي بيدك.',
    },
    duration: '3h30 • Matinée',
    image: IMAGES.suiteZellige,
    tag: 'Atelier',
  },
  {
    id: 'medina-private-tour',
    title: {
      fr: 'Visite Historique Privée de la Médina',
      en: 'Private Guided Medina Discovery',
      ar: 'جولة تاريخية خاصة في أزقة فاس',
    },
    subtitle: {
      fr: 'Accompagné d’un historien conférencier',
      en: 'Led by a licensed heritage historian',
      ar: 'برفقة مرشد وباحث تاريخي معتمد',
    },
    description: {
      fr: 'Explorez les 9 000 ruelles de Fès El-Bali loin des circuits touristiques usuels. Poussez les portes de médersas mérinides secrètes, découvrez les maîtres dinandiers de la place Seffarine et les tanneries millénaires sous le regard passionné d’un guide officiel natif de la médina.',
      en: 'Navigate the 9,000 labyrinthine alleyways of UNESCO Fes El-Bali with ease. Step into secluded 14th-century Marinid madrasas, witness copper smiths at Place Seffarine, and behold the famed Chouara tanneries through insider eyes.',
      ar: 'استكشف أكثر من 9000 زقاق في أقدم مدينة تاريخية، وزر المدارس المرينية، وورشات النحاسين بدرب الصفارين، والمدابغ العتيقة بعيداً عن الطرق التقليدية.',
    },
    duration: 'Demi-journée ou journée',
    image: IMAGES.rooftopSunset,
    tag: 'Culture',
  },
  {
    id: 'rooftop-sunset',
    title: {
      fr: 'Crépuscule & Thé sur la Terrasse',
      en: 'Golden Sunset & Mint Tea Ritual',
      ar: 'شاي الأصيل وغروب الشمس بالسطح',
    },
    subtitle: {
      fr: 'Au son mélodieux de l’appel du muezzin',
      en: 'Accompanied by harmonious evening calls',
      ar: 'على وقع أذان المغرب وإطلالة المآذن',
    },
    description: {
      fr: 'Installez-vous sur nos banquettes marocaines brodées au sommet du riad. Lorsque le soleil dore les murailles de la médina, notre sommelier du thé verse le thé vert à la menthe et à l’absinthe depuis le pichet d’argent, accompagné de cornes de gazelle chaudes.',
      en: 'Relax on plush embroidered Moroccan divans on our riad rooftop. As the setting sun bathes medieval minarets in amber glow, freshly brewed gunpowder mint tea is poured from silver pots alongside warm almond gazelle horns.',
      ar: 'استرخِ على مقاعد السطح المطرزة عند مغيب الشمس، وتذوق الشاي المغربي المنعنع المصبوب من أباريق الفضة مع كعب الغزال باللوز.',
    },
    duration: 'Tous les soirs au coucher du soleil',
    image: IMAGES.rooftopSunset,
    tag: 'Atmosphère',
  },
];

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'fountain',
    name: {
      fr: 'Fontaine en Marbre Octogonale',
      en: 'Octagonal Marble Fountain',
      ar: 'نافورة الرخام المثمنة',
    },
    position: [0, -0.6, 0],
    title: {
      fr: 'Le Rythme de l’Eau Vivante',
      en: 'The Rhythm of Living Water',
      ar: 'إيقاع الماء العذب الخالد',
    },
    details: {
      fr: 'Sculptée d’un seul bloc dans du marbre blanc de Carrare patiné par le temps, la fontaine octogonale centrale diffuse une fraîcheur continue et un son cristallin propice à la méditation.',
      en: 'Chiseled from a single block of white marble, the central octagonal fountain circulates continuous mountain-fed cool water and creates an acoustic sanctuary inside the riad.',
      ar: 'نُحتت من كتلة واحدة من الرخام الأبيض الفاخر، تضفي رطوبة وانتعاشاً دائماً وخرير ماء رقراق يبعث على التأمل والسكينة.',
    },
    craftsmanship: {
      fr: 'Taille de pierre & hydraulique gravitationnelle traditionnelle',
      en: 'Stone carving & traditional gravity water acoustics',
      ar: 'نحت الحجر وهندسة المياه التقليدية',
    },
  },
  {
    id: 'zellige',
    name: {
      fr: 'Zellige Polychrome Fassi',
      en: 'Fassi Polychrome Zellige',
      ar: 'الزليج الفاسي متعدد الألوان',
    },
    position: [1.8, -0.2, -1.2],
    title: {
      fr: 'La Géométrie Sacrée de Fès',
      en: 'Sacred Islamic Geometry',
      ar: 'الهندسة الإسلامية المقدسة',
    },
    details: {
      fr: 'Composé de milliers de morceaux de céramique émaillée taillés au marteau tranchant (menqash), le zellige du Riad SDC déploie des étoiles à huit et seize branches symbolisant l’infini.',
      en: 'Composed of thousands of glazed terra cotta tesserae chiseled by hand with an iron menqash hammer, displaying 8- and 16-point stars embodying infinity and balance.',
      ar: 'يتكون من آلاف القطع الخزفية المصقولة يدوياً بالمطرقة الفاسية التقليدية (المنقاش)، مشكلاً نجوماً ثمانية وسداسية عشرية ترمز للخلود.',
    },
    craftsmanship: {
      fr: 'Argile grise de Ben Jellik, cuisson au bois d’olivier & découpe manuelle',
      en: 'Ben Jellik grey clay, olive-wood kilns & manual tesserae chipping',
      ar: 'طين بن جليق الرمادي، حرق بخشب الزيتون وتقطيع يدوي متقن',
    },
  },
  {
    id: 'lantern',
    name: {
      fr: 'Lanterne Fassie en Laiton Ciselé',
      en: 'Chiseled Brass Fassi Lantern',
      ar: 'الفانوس الفاسي بالنحاس المخرم',
    },
    position: [0, 1.4, 0],
    title: {
      fr: 'Jeux d’Ombres & Lumières d’Orient',
      en: 'Dance of Shadow & Warm Light',
      ar: 'رقصة الظلال والنور الدافئ',
    },
    details: {
      fr: 'Suspendue à la clé de voûte du patio, cette lanterne en laiton massif percée au poinçon projette au crépuscule des constellations d’ombres arabesques sur les murs en tadelakt.',
      en: 'Suspended from the courtyard apex, this pierced solid brass lantern projects celestial arabesque shadows across the tadelakt lime surfaces when evening falls.',
      ar: 'معلق في أعلى صحن الرياض، يلقي بنقوشه النحاسية الدقيقة ظلالاً ساحرة على جدران التادلاكت مع حلول المساء.',
    },
    craftsmanship: {
      fr: 'Dinanderie de la place Seffarine & perforation à l’aiguille d’acier',
      en: 'Seffarine square metalsmithing & fine needle perforation',
      ar: 'صنعة نحاسي ساحة الصفارين وتخريم يدوي بالإبر الفولاذية',
    },
  },
  {
    id: 'cedar',
    name: {
      fr: 'Arcades en Bois de Cèdre Zouak',
      en: 'Zouak Painted Cedar Arches',
      ar: 'أقواس خشب الأرز والزواق الفاسي',
    },
    position: [-1.8, 0.6, -1.0],
    title: {
      fr: 'La Noblesse du Cèdre de l’Atlas',
      en: 'The Nobility of Atlas Cedar',
      ar: 'عراقة خشب الأرز الأطلسي',
    },
    details: {
      fr: 'Les poutres maîtresses et linteaux ont été sculptés dans des fûts de cèdre centenaires de l’Atlas puis peints selon la technique du Zouak à base de pigments naturels d’indigo, de safran et de terre d’ocre.',
      en: 'Master beams and lintels were carved from centuries-old Atlas cedar logs, then hand-painted using ancestral Zouak tempera made from natural indigo, saffron, and mineral ochre.',
      ar: 'نُحتت الأعمدة والأروقة من جذوع أرز الأطلس العتيق وزُينت بتقنية الزواق باستخدام أصباغ طبيعية كالنيلة والزعفران والتراب المغري.',
    },
    craftsmanship: {
      fr: 'Sculpture sur bois & enluminure végétale ancestrale',
      en: 'Wood carving & botanical mineral pigment painting',
      ar: 'نقش الخشب والتلوين بالأصباغ المعدنية الطبيعية',
    },
  },
];

export const MEDINA_LANDMARKS: Landmark[] = [
  {
    id: 'bab-boujloud',
    name: {
      fr: 'Bab Boujloud (La Porte Bleue)',
      en: 'Bab Boujloud (The Blue Gate)',
      ar: 'باب بوجلود (الباب الأزرق)',
    },
    category: {
      fr: 'Porte Monumentale',
      en: 'Monumental Gateway',
      ar: 'باب تاريخي عظيم',
    },
    walkingTime: '4 min à pied (350 m)',
    description: {
      fr: 'L’entrée magistrale et la plus célèbre de Fès El-Bali, ornée de céramique bleue de Fès côté extérieur et de céramique verte (couleur de l’islam) côté intérieur.',
      en: 'The iconic grand gateway to Fes El-Bali, adorned with signature cobalt blue ceramics on the outer face and emerald green tiles on the inner city face.',
      ar: 'البوابة الكبرى وأشهر مداخل فاس البالي، مكسوة بالخزف الأزرق الفاسي من الخارج وبالخزف الأخضر من الداخل.',
    },
    highlight: 'Point de rendez-vous principal pour nos transferts privés.',
    coordinates: { x: 22, y: 35 },
  },
  {
    id: 'al-quaraouiyine',
    name: {
      fr: 'Université & Mosquée Al Quaraouiyine',
      en: 'Al Quaraouiyine Mosque & University',
      ar: 'جامع وجامعة القرويين',
    },
    category: {
      fr: 'Monuments Spirituel & Savoir',
      en: 'Spiritual Center & Oldest University',
      ar: 'منارة العلم والروحانيات',
    },
    walkingTime: '12 min à pied (950 m)',
    description: {
      fr: 'Fondée en 859 par Fatima Al-Fihriya, elle est reconnue par l’UNESCO et le Guinness comme la plus ancienne université au monde encore en activité.',
      en: 'Founded in 859 AD by Fatima Al-Fihriya, officially recognized by UNESCO as the oldest continually operating university in the world.',
      ar: 'أسستها فاطمة الفهرية سنة 859 م، وتعد أقدم جامعة عاملة دون انقطاع في العالم باعتراف منظمة اليونسكو.',
    },
    highlight: 'Architecture andalouse époustouflante avec ses toits de tuiles vertes.',
    coordinates: { x: 68, y: 52 },
  },
  {
    id: 'tanneries-chouara',
    name: {
      fr: 'Tanneries Chouara',
      en: 'Chouara Leather Tanneries',
      ar: 'دار الدباغ شوارة',
    },
    category: {
      fr: 'Artisanat Millénaire',
      en: 'Millenary Artisan Guild',
      ar: 'حرفة الدباغة العريقة',
    },
    walkingTime: '15 min à pied (1.2 km)',
    description: {
      fr: 'Les plus vastes et anciennes cuves de tannage à ciel ouvert de Fès (XIe siècle). Les artisans y traitent le cuir d’agneau et de chèvre avec des pigments naturels (coquelicot, safran, indigo).',
      en: 'The largest and oldest open-air tanning vats in Fes, operating since the 11th century using natural dyes such as poppy red, saffron yellow, and indigo blue.',
      ar: 'أقدم وأكبر مدابغ الجلد في العالم، تعمل منذ القرن الحادي عشر باستخدام الصباغات الطبيعية كالعكر الفاسي والزعفران والنيلة.',
    },
    highlight: 'Vue panoramique depuis les terrasses hautes des artisans du cuir.',
    coordinates: { x: 84, y: 38 },
  },
  {
    id: 'bou-inania',
    name: {
      fr: 'Médersa Bou Inania',
      en: 'Bou Inania Madrasa',
      ar: 'المدرسة البوعنانية',
    },
    category: {
      fr: 'Chef-d’œuvre Mérinide',
      en: 'Marinid Architectural Marvel',
      ar: 'تحفة العمارة المرينية',
    },
    walkingTime: '6 min à pied (480 m)',
    description: {
      fr: 'Édifiée entre 1351 et 1356 par le sultan Abou Inan Faris, ce chef-d’œuvre absolu conjugue zellige, plâtre dentelé et bois de cèdre avec une horloge hydraulique fascinante.',
      en: 'Erected between 1351 and 1356 AD, this Marinid masterpiece combines breathtaking zellige tilework, chiseled stucco lace, and a fabled ancient water clock.',
      ar: 'شيدها السلطان أبو عنان فارس في القرن الرابع عشر، وتعد ذروة الفن المعماري المريني بنقوشها وساعتها المائية العجيبة.',
    },
    highlight: 'Seule médersa de Fès dotée de son propre minaret.',
    coordinates: { x: 38, y: 44 },
  },
  {
    id: 'place-seffarine',
    name: {
      fr: 'Place Seffarine & Dinandiers',
      en: 'Place Seffarine (Copper Square)',
      ar: 'ساحة الصفارين والنحاسين',
    },
    category: {
      fr: 'Artisans du Métal',
      en: 'Master Coppersmiths',
      ar: 'صنّاع النحاس التقليديون',
    },
    walkingTime: '13 min à pied (1 km)',
    description: {
      fr: 'Petite place pavée ombragée par un grand platane où résonne le son envoûtant des marteaux forgeant les chaudrons, bassines et lanternes en cuivre rouge et laiton.',
      en: 'A charming cobbled plaza shaded by ancient trees where the rhythmic clatter of hammers forging copper cauldrons and polished brass filigree echoes.',
      ar: 'ساحة عريقة تحت ظلال شجرة الدلب العتيقة، تصدح بنغمات مطارق حرفيي النحاس الأحمر والأصفر وصانعي القدور والخوان الفاسية.',
    },
    highlight: 'Lieu de naissance de nos majestueuses lanternes de patio.',
    coordinates: { x: 72, y: 64 },
  },
  {
    id: 'fondouk-nejjarine',
    name: {
      fr: 'Fondouk & Musée Nejjarine',
      en: 'Nejjarine Caravanserai & Wood Museum',
      ar: 'فندق ومتحف النجارين',
    },
    category: {
      fr: 'Caravansérail & Patrimoine Bois',
      en: 'Caravanserai & Timber Heritage',
      ar: 'فندق تاريخي وفنون الخشب',
    },
    walkingTime: '10 min à pied (800 m)',
    description: {
      fr: 'Ancien hôtel pour marchands et caravaniers du XVIIIe siècle magnifiquement restauré, abritant le musée des arts et métiers du bois et une fontaine publique classée.',
      en: 'An 18th-century trading inn for camel caravans, today home to the Museum of Wooden Arts & Crafts, featuring one of the most sublime tiled fountains in Morocco.',
      ar: 'نُزل تاريخي لقوافل التجار من القرن الثامن عشر، يضم متحف روائع فنون خشب الأرز ونافورة رخامية أندلسية خلابة.',
    },
    highlight: 'Superbe salon de thé au sommet avec vue sur la medersa.',
    coordinates: { x: 55, y: 48 },
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    guestName: 'Éléonore de Montmirail',
    origin: 'Paris, France',
    date: 'Octobre 2025',
    rating: 5,
    suiteStayed: 'Suite Fassi',
    quote: {
      fr: 'Une parenthèse enchantée hors du temps. Dès le seuil franchi, le calme absolu du patio et le parfum des orangers vous enveloppent. La Suite Fassi est somptueuse, la literie divine, et l’attention du personnel d’une délicatesse rare. Le meilleur séjour de notre vie au Maroc.',
      en: 'An enchanting journey suspended in time. The instant you cross the heavy cedar threshold, tranquil fountain sounds and sweet citrus blossom fragrance embrace you. The Fassi Suite is breathtaking and the staff hospitality is unmatched.',
      ar: 'إقامة أسطورية فاخرة تفوق الوصف. بمجرد دخول الرياض يلفك الهدوء التام ورائحة زهر الليمون الزكية. الجناح الفاسي غاية في الروعة، وكرم ضيافة الفريق لا يضاهى.',
    },
  },
  {
    id: 'rev-2',
    guestName: 'Alexander & Claire Hastings',
    origin: 'London, United Kingdom',
    date: 'Décembre 2025',
    rating: 5,
    suiteStayed: 'Suite Andalousie',
    quote: {
      fr: 'Le rooftop au coucher du soleil avec le thé à la menthe face aux minarets de Fès est une vision gravée pour toujours. Le hammam privé est un rituel d’une authenticité remarquable. Riad SDC est le joyau caché de la médina.',
      en: 'Sipping mint tea on the rooftop terrace as sunset paints the Fes minarets gold is an image forever etched in our minds. The private hammam is authentically restorative. Riad SDC is the crowning jewel of the Medina.',
      ar: 'جلسة الشاي المغربي على السطح البانورامي عند غروب الشمس فوق مآذن فاس مشهد ساحر لا ينسى. الحمام الملكي تجربة استرخاء لا نظير لها.',
    },
  },
  {
    id: 'rev-3',
    guestName: 'Rashid Al-Maktoum',
    origin: 'Dubai, UAE',
    date: 'Février 2026',
    rating: 5,
    suiteStayed: 'Suite Zellige',
    quote: {
      fr: 'Le souci du détail architectural est exceptionnel : chaque arabesque de plâtre et chaque carreau de zellige témoigne d’un art royal. Le dîner gastronomique avec la pastilla fassie est digne des plus grandes tables étoilées.',
      en: 'The architectural precision is immaculate: every chiseled plaster curve and every mosaic tile reflects royal heritage. The candlelit dinner featuring pigeon pastilla rivals the finest Michelin dining in the world.',
      ar: 'دقة الصنعة المعمارية الفاسية هنا تفوق الخيال. كل نقش وكل زليجة تنطق بالأصالة والعراقة الملكية. عشاء البسطيلة الفاسية تجربة تضاهي أرقى المطاعم العالمية.',
    },
  },
  {
    id: 'rev-4',
    guestName: 'Sophia Lindqvist',
    origin: 'Stockholm, Sweden',
    date: 'Mars 2026',
    rating: 5,
    suiteStayed: 'Chambre Al-Batha',
    quote: {
      fr: 'Dormir au son doux de la fontaine dans un riad du XIXe siècle restauré avec un tel goût... Le petit-déjeuner marocain est un régal quotidien. Le porteur nous attendait à Bab Boujloud, tout a été d’une fluidité parfaite.',
      en: 'Falling asleep to the gentle trickle of the marble fountain in an authentic 19th-century palace was magical. The staff greeted us seamlessly at the Blue Gate, carrying our luggage with genuine warmth.',
      ar: 'النوم على صوت خرير نافورة الرخام في قصر تاريخي رمم بأرقى معايير الذوق الرفيع. الاستقبال عند باب بوجلود كان مثالياً ومريحاً للغاية.',
    },
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: {
      fr: 'Le Patio Central au Crépuscule',
      en: 'The Central Courtyard at Dusk',
      ar: 'صحن الرياض المركزي عند الغسق',
    },
    category: 'courtyard',
    image: IMAGES.heroCourtyard,
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: {
      fr: 'Suite Royale Fassi — Alcôve et Bois de Cèdre',
      en: 'Royal Fassi Suite — Carved Cedar Alcove',
      ar: 'الجناح الملكي الفاسي — قبة الجبس وخشب الأرز',
    },
    category: 'suites',
    image: IMAGES.suiteFassi,
    aspect: 'landscape',
  },
  {
    id: 'gal-3',
    title: {
      fr: 'Suite Zellige — Frise Mosaïque & Tapis Berbère',
      en: 'Zellige Suite — Mosaic Frieze & Berber Rug',
      ar: 'جناح الزليج — الفسيفساء الفاسية والزرابي الأصيلة',
    },
    category: 'suites',
    image: IMAGES.suiteZellige,
    aspect: 'landscape',
  },
  {
    id: 'gal-4',
    title: {
      fr: 'Terrasse Panoramique & Coucher de Soleil sur la Médina',
      en: 'Panoramic Rooftop & Medina Sunset',
      ar: 'السطح البانورامي ومغيب الشمس فوق مآذن فاس',
    },
    category: 'medina',
    image: IMAGES.rooftopSunset,
    aspect: 'landscape',
  },
  {
    id: 'gal-5',
    title: {
      fr: 'Sanctuaire du Hammam Privé & Tadelakt Doré',
      en: 'Private Heated Hammam & Golden Tadelakt',
      ar: 'الحمام الملكي الدافئ بالتادلاكت والرخام',
    },
    category: 'wellness',
    image: IMAGES.hammamSpa,
    aspect: 'landscape',
  },
  {
    id: 'gal-6',
    title: {
      fr: 'Rituel du Thé à la Menthe & Pâtisseries aux Amandes',
      en: 'Mint Tea Service & Artisanal Fassi Pastries',
      ar: 'طقوس الشاي المغربي المنعنع وحلويات اللوز',
    },
    category: 'culinary',
    image: IMAGES.rooftopSunset,
    aspect: 'landscape',
  },
];

export const CURRENCY_RATES = {
  EUR: { symbol: '€', rate: 1, label: 'EUR (€)' },
  MAD: { symbol: 'DH', rate: 10.8, label: 'MAD (DH)' },
  USD: { symbol: '$', rate: 1.09, label: 'USD ($)' },
  GBP: { symbol: '£', rate: 0.85, label: 'GBP (£)' },
};

export function formatPrice(amountEur: number, currency: 'EUR' | 'MAD' | 'USD' | 'GBP'): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.EUR;
  const converted = Math.round(amountEur * info.rate);
  if (currency === 'MAD') {
    return `${converted} DH`;
  }
  return `${info.symbol}${converted}`;
}

export const INITIAL_RESERVATIONS = [
  {
    id: 'res-101',
    reference: 'DA-849201',
    createdAt: '2026-10-10',
    checkIn: '2026-10-15',
    checkOut: '2026-10-18',
    nights: 3,
    adults: 2,
    children: 0,
    roomId: 'suite-fassi',
    roomName: 'Suite Fassi',
    guestName: 'Lady Victoria Sterling',
    guestEmail: 'victoria.sterling@kensington.co.uk',
    guestPhone: '+44 7911 123456',
    status: 'confirmed',
    totalPrice: 1275,
    currency: 'EUR',
    extras: {
      airportTransfer: true,
      hammamRitual: true,
      fassiDinner: true,
    },
    porterAssigned: 'Driss Maâlem',
    arrivalGate: 'Bab Boujloud',
    flightNumber: 'RAM AT812',
    internalNotes: 'Client VIP. Prévoir bouquet de jasmin frais et corbeille de figues de barbarie.',
  },
  {
    id: 'res-102',
    reference: 'DA-739104',
    createdAt: '2026-10-11',
    checkIn: '2026-10-16',
    checkOut: '2026-10-20',
    nights: 4,
    adults: 2,
    children: 1,
    roomId: 'suite-andalousie',
    roomName: 'Suite Andalousie',
    guestName: 'Marc-Antoine & Sophie Laurent',
    guestEmail: 'm.laurent@paris-avocats.fr',
    guestPhone: '+33 6 42 18 90 22',
    status: 'checked_in',
    totalPrice: 1840,
    currency: 'EUR',
    extras: {
      airportTransfer: true,
      hammamRitual: false,
      fassiDinner: true,
    },
    porterAssigned: 'Hamza El-Fassi',
    arrivalGate: 'Bab Ziat',
    flightNumber: 'Air France AF1480',
    internalNotes: 'Voyage de noces. Bouteille de vin marocain Médaillon offerte au salon.',
  },
  {
    id: 'res-103',
    reference: 'DA-619082',
    createdAt: '2026-10-12',
    checkIn: '2026-10-18',
    checkOut: '2026-10-21',
    nights: 3,
    adults: 2,
    children: 0,
    roomId: 'suite-zellige',
    roomName: 'Suite Zellige',
    guestName: 'Kenji Takahashi',
    guestEmail: 'k.takahashi@tokyo-arch.jp',
    guestPhone: '+81 90 5555 4321',
    status: 'confirmed',
    totalPrice: 1050,
    currency: 'EUR',
    extras: {
      airportTransfer: true,
      hammamRitual: true,
      fassiDinner: false,
    },
    porterAssigned: 'Driss Maâlem',
    arrivalGate: 'Bab Boujloud',
    flightNumber: 'Ryanair FR3401',
    internalNotes: 'Architecte spécialiste du patrimoine islamique. Demande visite technique de la charpente en cèdre.',
  },
  {
    id: 'res-104',
    reference: 'DA-518290',
    createdAt: '2026-10-09',
    checkIn: '2026-10-22',
    checkOut: '2026-10-24',
    nights: 2,
    adults: 2,
    children: 0,
    roomId: 'chambre-al-batha',
    roomName: 'Chambre Al-Batha',
    guestName: 'Amine Bennani',
    guestEmail: 'a.bennani@casacapital.ma',
    guestPhone: '+212 6 61 88 99 00',
    status: 'pending',
    totalPrice: 480,
    currency: 'EUR',
    extras: {
      airportTransfer: false,
      hammamRitual: false,
      fassiDinner: false,
    },
    porterAssigned: 'Non assigné',
    arrivalGate: 'Bab Boujloud',
    internalNotes: 'Arrivée en voiture privée avec stationnement demandé au parking sécurisé de Bab Boujloud.',
  },
];

export const GASTRONOMY_MENU: {
  starters: Array<{ name: { fr: string; en: string; ar: string }; desc: { fr: string; en: string; ar: string }; price: number; signature?: boolean }>;
  pastillas: Array<{ name: { fr: string; en: string; ar: string }; desc: { fr: string; en: string; ar: string }; price: number; signature?: boolean }>;
  tajines: Array<{ name: { fr: string; en: string; ar: string }; desc: { fr: string; en: string; ar: string }; price: number; signature?: boolean }>;
  desserts: Array<{ name: { fr: string; en: string; ar: string }; desc: { fr: string; en: string; ar: string }; price: number; signature?: boolean }>;
} = {
  starters: [
    {
      name: {
        fr: 'Ronde des 7 Salades Fassies',
        en: 'The Seven Fassi Salad Symphony',
        ar: 'تشكيلة السلطات الفاسية السبع',
      },
      desc: {
        fr: 'Zaalouk d’aubergines grillées, carottes au cumin et jus d’orange, taktouka aux poivrons confits, potiron caramélisé aux noix, betteraves à la fleur d’oranger.',
        en: 'Smoky roasted eggplant Zaalouk, cumin carrots in fresh orange reduction, Taktouka sweet peppers, caramelized pumpkin with walnuts, and orange blossom beets.',
        ar: 'زعلوك الباذنجان المشوي، جزر بالكمون والبرتقال، تكتوكة الفلفل الحلو، القرع المعسل بالجوز والباربا بماء الزهر.',
      },
      price: 18,
      signature: true,
    },
    {
      name: {
        fr: 'Briouates Dorées aux Trois Fromages & Herbes de l’Atlas',
        en: 'Golden Briouates with Three Cheeses & Wild Herbs',
        ar: 'بريوات مقرمشة بالأجبان وأعشاب الأطلس',
      },
      desc: {
        fr: 'Feuilleté croustillant fait main, fromage de chèvre frais de Chaouen, menthe poivrée et graines de nigelle.',
        en: 'Crispy handmade phyllo triangles filled with fresh Chefchaouen goat cheese, wild spearmint, and toasted nigella seeds.',
        ar: 'ورقة البسطيلة المقرمشة محشوة بجبن الماعز الطازج من شفشاون والنعناع وحبة البركة.',
      },
      price: 16,
    },
  ],
  pastillas: [
    {
      name: {
        fr: 'La Pastilla Royale de Fès au Pigeon & Amandes',
        en: 'Imperial Fassi Pigeon Pastilla with Almonds',
        ar: 'البسطيلة الفاسية الملكية بالحمام واللوز',
      },
      desc: {
        fr: 'La reine incontestée de la gastronomie fassie : chair fondante de pigeon aux épices douces, lit d’œufs parfumés, amandes concassées dorées, cannelle fine et sucre glace.',
        en: 'The crown jewel of Moroccan cuisine: tender pigeon simmered in sweet spices, egg custard, toasted crushed almonds, dusting of fine cinnamon, and icing sugar.',
        ar: 'سيدة المطبخ الفاسي الأصيل: لحم الحمام الطري بالتوابل الفاسية، طبقة اللوز المقلي المهرمش، والقرفة العطرية مع السكر الصقيل.',
      },
      price: 34,
      signature: true,
    },
    {
      name: {
        fr: 'Pastilla Océane aux Fruits de Mer & Vermicelle Chinois',
        en: 'Atlantic Seafood Pastilla with Ginger & Citron',
        ar: 'بسطيلة فواكه البحر والزنجبيل والليمون المخلل',
      },
      desc: {
        fr: 'Crevettes sauvages, calamars frais, lotte royale, champignons noirs, vermicelle aux herbes fraîches et citron confit de Fès.',
        en: 'Wild tiger prawns, Atlantic calamari, monkfish, shiitake, herb vermicelli, and homemade salted cured Fassi lemons.',
        ar: 'جمبري بري، كلمار طازج، سمك الروجي، فطر أسود وليمون فاس المخلل الحامض.',
      },
      price: 32,
    },
  ],
  tajines: [
    {
      name: {
        fr: 'Tajine d’Agneau Mrouzia aux Pruneaux & Safran Pur',
        en: 'Lamb Mrouzia Tagine with Caramelized Prunes & Saffron',
        ar: 'طاجين المروزية الفاسية بلحم الخروف والبرقوق والزعفران',
      },
      desc: {
        fr: 'Mijoté 6 heures en jarre de terre cuite avec miel d’euphorbe de l’Atlas, pruneaux confits, amandes torréfiées et safran pur de Taliouine.',
        en: 'Slow-simmered 6 hours in unglazed clay with Atlas euphorbia honey, caramelized prunes, toasted blanched almonds, and pure Taliouine saffron.',
        ar: 'مطبوخ على الفحم لست ساعات مع عسل الدغموس البلدي، البرقوق المعسل، اللوز المقلي وزعفران تالوين الحر.',
      },
      price: 28,
      signature: true,
    },
    {
      name: {
        fr: 'Tajine de Poulet Beldi au Citron Confit & Olives Meslalla',
        en: 'Free-Range Chicken Tagine with Preserved Lemon & Meslalla Olives',
        ar: 'طاجين الدجاج البلدي بالدغميرة والليمون المصير وزيتون مسلالة',
      },
      desc: {
        fr: 'Poulet fermier mariné au gingembre frais et coriandre, oignons fondants en daghmira parfumée et olives violettes concassées.',
        en: 'Locally raised farm chicken steeped in ginger and fresh coriander, unctuous caramelized onion daghmira, and crushed purple olives.',
        ar: 'دجاج بلدي من مزارع فاس، دغميرة البصل المكرملة، الزنجبيل الطري والزيتون البنفسجي المتبل.',
      },
      price: 26,
    },
  ],
  desserts: [
    {
      name: {
        fr: 'Pastilla Croustillante au Lait & Crème d’Oranger (Ktéfa)',
        en: 'Crispy Milk Pastilla with Orange Blossom Cream (Ktefa)',
        ar: 'جوهرة الفاسية (الكتيفة) بحليب اللوز وماء الزهر',
      },
      desc: {
        fr: 'Feuilles de ouarka dorées superposées avec une crème légère d’amande et fleur d’oranger, éclats de pistaches grillées.',
        en: 'Golden layered pastry leaves filled with delicate warm almond orange blossom cream, crowned with roasted pistachios.',
        ar: 'طبقات الورقة المقرمشة محشوة بكريمة اللوز الخفيفة المنكهة بماء الزهر المقطر والفستق الحلبي.',
      },
      price: 14,
      signature: true,
    },
    {
      name: {
        fr: 'Assortiment de Pâtisseries Fassies & Thé de Cérémonie',
        en: 'Heirloom Fassi Almond Pastries & Ceremonial Tea',
        ar: 'تشكيلة حلويات اللوز الفاسية والشاي الملكي',
      },
      desc: {
        fr: 'Cornes de gazelle à la pâte fine, ghriba aux noix, m’hanncha aux amandes et thé vert gunpowder à la menthe douce.',
        en: 'Delicate gazelle horns, walnut ghriba, almond coiled m’hanncha, served with ceremonial spearmint gunpowder tea.',
        ar: 'كعب الغزال الرقيق، غريبة الجوز الفاسية، محنشة اللوز، يقدم مع صينية الشاي الفضية.',
      },
      price: 15,
    },
  ],
};

export const SPA_TREATMENTS = [
  {
    id: 'spa-1',
    name: {
      fr: 'Rituel Hammam Impérial Andalou',
      en: 'Imperial Andalusian Hammam Ritual',
      ar: 'طقس الحمام الملكي الأندلسي',
    },
    desc: {
      fr: 'Bain de vapeur au tadelakt, onction au savon noir à l’eucalyptus, gommage vigoureux au gant kessa, enveloppement corporel au ghassoul de l’Atlas parfumé aux sept plantes et rinçage à l’eau de rose de Kelaat M’Gouna.',
      en: 'Vaulted heated steam chamber, eucalyptus black olive soap lather, thorough kessa glove exfoliation, Atlas mountain ghassoul clay mask infused with 7 herbs, and cool rosewater cascade.',
      ar: 'حمام بخار في قبة التادلاكت، صابون بلدي بالأوكالبتوس، تقشير بالكيس الحريري، غاسول بركاني بسبعة أعشاب ورشاش ماء الورد البلدي.',
    },
    duration: '60 min',
    price: 75,
    ritualType: 'hammam',
  },
  {
    id: 'spa-2',
    name: {
      fr: 'Massage Signature à l’Huile d’Argan Chaude',
      en: 'Signature Warm Argan Oil Deep Tissue Massage',
      ar: 'التدليك الخاص بزيت الأركان الدافئ',
    },
    desc: {
      fr: 'Massage relaxant profond de tout le corps utilisant de l’huile d’argan biologique pure chauffée à la bougie, parfumée aux huiles essentielles de verveine et néroli.',
      en: 'Full-body restorative massage using candle-warmed 100% pure organic argan oil scented with soothing verbena and neroli blossom essence.',
      ar: 'تدليك عميق لكامل الجسم بزيت الأركان العضوي المسخن بنار الشموع العطرية، منكه باللويزة وزهر الليمون.',
    },
    duration: '60 min',
    price: 80,
    ritualType: 'massage',
  },
  {
    id: 'spa-3',
    name: {
      fr: 'Le Grand Rituel Riad SDC (Hammam + Massage)',
      en: 'The Grand Riad SDC Sanctuary Ceremony',
      ar: 'الطقس الكامل لرياض SDC (حمام + تدليك ملكي)',
    },
    desc: {
      fr: 'L’expérience ultime de bien-être : Hammam complet de 60 minutes suivi d’un massage relaxant de 60 minutes avec soin du visage à la rose et thé digestif au thym de l’Atlas.',
      en: 'The definitive riad wellness retreat: full 60-min purifying hammam followed by a 60-min argan body massage, rose facial, and restorative herbal mountain tea.',
      ar: 'التجربة الشاملة الأرقى: ساعة كاملة من طقوس الحمام تليها ساعة من التدليك بزيت الأركان، عناية بالبشرة بماء الورد وشاي الزعتر الجبلي.',
    },
    duration: '120 min',
    price: 135,
    ritualType: 'package',
  },
  {
    id: 'spa-4',
    name: {
      fr: 'Soin Visage Éclat Royal à la Figue de Barbarie & Eau de Rose',
      en: 'Royal Radiance Facial with Prickly Pear & Rose Water',
      ar: 'عناية الوجه الملكية بزيت بذور التين الشوكي وماء الورد',
    },
    desc: {
      fr: 'Élixir anti-âge naturel d’exception : nettoyage doux à l’argile blanche de Fès, massage facial liftant aux pierres de quartz rose et sérum précieux de pépins de figue de barbarie.',
      en: 'Rare botanical anti-aging elixir: gentle white clay purification, uplifting rose quartz stone facial massage, and precious cold-pressed prickly pear seed oil serum.',
      ar: 'إكسير طبيعي نادر لمقاومة علامات التقدم: تنظيف لطيف بالطين الأبيض الفاسي، تدليك بأحجار الكوارتز وسيروم بذور التين الشوكي النادر.',
    },
    duration: '50 min',
    price: 65,
    ritualType: 'facial',
  },
  {
    id: 'spa-5',
    name: {
      fr: 'Escapade Hammam & Massage Privatisée en Duo',
      en: 'Private Romantic Duo Hammam & Massage Ceremony',
      ar: 'باقة الاسترخاء الرومانسية المزدوجة لشخصين',
    },
    desc: {
      fr: 'Privatisation exclusive du sanctuaire pour couples : hammam à deux aux huiles précieuses, gommage kessa, massage synchronisé à l’huile d’argan et dégustation de thé et pâtisseries fines.',
      en: 'Exclusive private sanctuary retreat for couples: dual steam session, kessa exfoliation, synchronized warm argan massages, followed by fine mint tea and pastries.',
      ar: 'خصخصة كاملة للحمام للأزواج: جلسة بخار خاصة، تقشير كلاسيكي، تدليك متزامن بزيت الأركان وتقديم صينية الشاي وحلويات اللوز.',
    },
    duration: '90 min',
    price: 180,
    ritualType: 'package',
  },
  {
    id: 'spa-6',
    name: {
      fr: 'Gommage Détoxifiant Berbère aux 7 Plantes & Sel Marin',
      en: 'Berber 7-Herb & Atlantic Sea Salt Body Polish',
      ar: 'تقشير بربري مزيل للسموم بسبعة أعشاب وملح البحر',
    },
    desc: {
      fr: 'Exfoliation vivifiante combinant sel marin pur, poudre de romarin sauvage, myrte et huile d’olive pressée à froid. Restaure la douceur soyeuse de la peau.',
      en: 'Invigorating exfoliation blending virgin sea salt, wild Atlas rosemary, myrtle, and cold-pressed olive oil. Restores baby-soft, glowing skin.',
      ar: 'تقشير منعش يجمع بين الملح البحري الطبيعي، إكليل الجبل البري، والآس مع زيت الزيتون البكر.',
    },
    duration: '45 min',
    price: 55,
    ritualType: 'scrub',
  },
];

export const GASTRONOMY_FORMULAS = [
  {
    id: 'form-1',
    name: {
      fr: 'Menu Découverte Impériale',
      en: 'Imperial Discovery Tasting Menu',
      ar: 'قائمة الاكتشاف الإمبراطورية',
    },
    subtitle: {
      fr: '3 Services Traditionnels',
      en: '3 Traditional Courses',
      ar: 'ثلاث وجبات تقليدية',
    },
    price: 48,
    desc: {
      fr: 'Symphonie des 7 salades fassies traditionnelles • Tajine mijoté au choix (Agneau Mrouzia ou Poulet Beldi au citron confit) • Douceur Ktéfa au lait d’amande & thé de cérémonie.',
      en: 'Symphony of 7 Fassi cold salads • Choice of slow-simmered Tagine (Lamb Mrouzia or Farm Chicken with preserved lemons) • Crispy Ktefa with almond blossom milk & mint tea.',
      ar: 'تشكيلة السلطات الفاسية السبع • اختيارك من الطاجين الأصيل (مروزية الخروف أو دجاج بلدي) • جوهرة بالحليب والشاي المغربي الملكي.',
    },
    tag: 'Populaire',
  },
  {
    id: 'form-2',
    name: {
      fr: 'Grand Festin Royal du Palais SDC',
      en: 'Palace Royal Feast Signature Journey',
      ar: 'وليمة القصر الفاسي الكبرى الخاصة',
    },
    subtitle: {
      fr: '5 Services Signatures du Chef',
      en: '5 Chef Signature Courses',
      ar: 'خمس وجبات ملكية من إبداع الشيف',
    },
    price: 68,
    desc: {
      fr: 'Briouates dorées au fromage frais • Pastilla Royale au pigeon & amandes dorées • Sorbet rafraîchissant à la mandarine de Berkane • Tajine d’agneau mrouzia au safran pur de Taliouine • Assortiment de pâtisseries fassies de fête & infusion digestive.',
      en: 'Crispy goat cheese briouates • Royal Pigeon Pastilla with roasted almonds • Berkane mandarin palate cleanser • Lamb Mrouzia tagine with Taliouine saffron • Heirloom festive sweets & digestive infusion.',
      ar: 'بريوات الجبن الطازج • بسطيلة الحمام واللوز الفاسية • سوربيه المندرين المنعش • طاجين المروزية بالزعفران الحر • حلويات اللوز الفاسية والشاي الملكي.',
    },
    tag: 'Prestige',
  },
  {
    id: 'form-3',
    name: {
      fr: 'Menu Végétarien du Potager Andalou',
      en: 'Andalusian Garden Vegetarian Symphony',
      ar: 'القائمة النباتية من بساتين الأندلس',
    },
    subtitle: {
      fr: '3 Services 100% Végétaux',
      en: '3 Plant-Based Courses',
      ar: 'ثلاث وجبات نباتية أصيلة',
    },
    price: 42,
    desc: {
      fr: 'Déclinaison de salades cuites et crues du potager • Tajine de légumes du terroir confits aux épices douces, dattes Medjool et amandes torréfiées • Pastilla croustillante aux poires caramélisées & cannelle.',
      en: 'Medley of cooked and raw market garden salads • Heirloom seasonal vegetable tagine stewed with sweet spices, Medjool dates, and toasted almonds • Pear and cinnamon pastilla.',
      ar: 'سلطات البساتين الفاسية الطازجة • طاجين الخضار الموسمية المعسلة بالتوابل والتمور المجهولة واللوز المقلي • بسطيلة الإجاص المكرمل والقرفة.',
    },
    tag: 'Végétarien',
  },
];

export const DINING_AREAS = [
  {
    id: 'patio',
    name: {
      fr: 'Le Patio aux Chandelles',
      en: 'Candlelit Fountain Courtyard',
      ar: 'فناء الرياض على ضوء الشموع',
    },
    desc: {
      fr: 'Dînez au son apaisant de la fontaine en marbre blanc, sous les orangers et les arcades de zellige éclairées aux lanternes de cuivre.',
      en: 'Dine by the serene murmur of the white marble fountain beneath orange trees and copper lantern reflections.',
      ar: 'تناول العشاء بجوار النافورة الرخامية وتحت أشجار النارنج وأقواس الزليج المضاءة بالفوانيس النحاسية.',
    },
  },
  {
    id: 'rooftop',
    name: {
      fr: 'Le Rooftop Étoilé de Fès',
      en: 'Starlit Medina Rooftop Terrace',
      ar: 'سطح الرياض البانورامي تحت النجوم',
    },
    desc: {
      fr: 'Vue panoramique à 360° sur les minarets illuminés de la médina et les collines de Zalagh sous le ciel étoilé fassi.',
      en: 'Panoramic 360° vistas over illuminated historic minarets and Zalagh mountain hills under the starry night sky.',
      ar: 'إطلالة بانورامية ساحرة على مآذن فاس القديمة المضاءة وجبال زلاغ تحت سماء الليل المرصعة بالنجوم.',
    },
  },
  {
    id: 'alcove',
    name: {
      fr: 'Le Salon Andalou Privé',
      en: 'Private Cedarwood Alcove',
      ar: 'الصالون الأندلسي الخاص',
    },
    desc: {
      fr: 'Atmosphère intimiste et feutrée entourée de plafonds peints en cèdre sculpté (zouak) et cheminée d’époque crépitante.',
      en: 'Intimate private dining enclave framed by hand-painted zouak cedarwood ceilings and crackling antique fireplace.',
      ar: 'أجواء حميمية خاصة محاطة بأسقف خشب الأرز المزخرفة بالزواق ومدفأة حطب تراثية دافئة.',
    },
  },
];

