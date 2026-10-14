import React from 'react';
import { Instagram, Facebook, MessageSquare, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onOpenAdmin: () => void;
  onOpenGastronomy: () => void;
  onOpenSpa: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenAdmin,
  onOpenGastronomy,
  onOpenSpa,
}) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="bg-[#07090b] text-[#f5f0ea] border-t border-stone-800/80 pt-16 pb-12"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Tier: Brand Wordmark & Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-block">
              <span className="font-display-luxury text-2xl font-semibold tracking-[0.2em] text-[#f5f0ea]">
                RIAD SDC
              </span>
            </a>
            <p className="text-xs uppercase tracking-widest text-[#c5a059]">
              {t.footer.tagline}
            </p>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Demeure aristocratique du XIXe siècle restaurée dans le pur respect de l’architecture fassie. Sanctuaire de calme, d’art et d’hospitalité au cœur de la plus ancienne médina du monde.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-3">
                Maison & Séjour
              </span>
              <ul className="space-y-2.5 text-stone-300">
                <li>
                  <a href="#le-riad" className="hover:text-[#c5a059] transition-colors">
                    {t.nav.theRiad}
                  </a>
                </li>
                <li>
                  <a href="#suites" className="hover:text-[#c5a059] transition-colors">
                    {t.nav.rooms}
                  </a>
                </li>
                <li>
                  <a href="#experiences" className="hover:text-[#c5a059] transition-colors">
                    {t.nav.experiences}
                  </a>
                </li>
                <li>
                  <a href="#architecture3d" className="hover:text-[#c5a059] transition-colors">
                    {t.nav.architecture3d}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-3">
                Découvertes
              </span>
              <ul className="space-y-2.5 text-stone-300">
                <li>
                  <a href="#medina" className="hover:text-[#c5a059] transition-colors">
                    {t.nav.medina}
                  </a>
                </li>
                <li>
                  <a href="#galerie" className="hover:text-[#c5a059] transition-colors">
                    {t.nav.gallery}
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-[#c5a059] transition-colors">
                    {t.nav.reviews}
                  </a>
                </li>
                <li>
                  <a href="#reservation" className="hover:text-[#c5a059] transition-colors">
                    {t.nav.bookNow}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenGastronomy}
                    className="hover:text-[#c5a059] transition-colors text-left cursor-pointer"
                  >
                    Carte Restaurant Fassi
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenSpa}
                    className="hover:text-[#c5a059] transition-colors text-left cursor-pointer"
                  >
                    Menu Hammam & Spa
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="text-stone-400 hover:text-[#c5a059] transition-colors text-left cursor-pointer flex items-center gap-1"
                  >
                    <span>Portail Direction / Admin</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials & Recognition */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block">
              Suivez l'Art de Vivre Fassi
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#c5a059] flex items-center justify-center text-stone-300 hover:text-[#c5a059] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#c5a059] flex items-center justify-center text-stone-300 hover:text-[#c5a059] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/212661248950"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-500 flex items-center justify-center text-stone-300 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-stone-400">
              <p className="italic">{t.footer.medinaHeritage}</p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Back to Top */}
        <div className="pt-8 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            <p>© 2026 Riad SDC — {t.footer.rights}</p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#c5a059] transition-colors cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
