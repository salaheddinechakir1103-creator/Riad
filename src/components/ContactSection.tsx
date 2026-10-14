import React from 'react';
import { MapPin, Phone, Mail, MessageSquare, Compass, Shield, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-[#0c0f12] text-[#f5f0ea] border-t border-stone-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            {t.contact.tagline}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#f5f0ea] leading-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Contact Details & Medina Navigation Directions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates & Direct Concierge Access */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium">
                  Adresse Postale & GPS
                </span>
                <h3 className="text-xl font-serif-luxury text-stone-100 mt-1">
                  Riad SDC
                </h3>
                <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                  Derb el Miter, Quartier Ziat
                  <br />
                  Fès El-Bali, 30000 Fès, Royaume du Maroc
                </p>
                <p className="text-xs text-stone-500 font-mono mt-2">
                  GPS: 34°03'45.0"N 4°58'52.3"W
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-800 text-sm">
                <a
                  href="tel:+212535740821"
                  className="flex items-center gap-3 text-stone-300 hover:text-[#c5a059] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>+212 (0) 5 35 74 08 21</span>
                </a>

                <a
                  href="mailto:contact@riad-sdc.com"
                  className="flex items-center gap-3 text-stone-300 hover:text-[#c5a059] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>contact@riad-sdc.com</span>
                </a>

                <a
                  href="https://wa.me/212661248950?text=Bonjour%20Riad%20SDC,%20je%20souhaite%20des%20informations%20sur%20un%20séjour."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Conciergerie : +212 6 61 24 89 50</span>
                </a>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <a
                  href="https://wa.me/212661248950?text=Bonjour%20Riad%20SDC,%20je%20souhaite%20organiser%20mon%20arrivée."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.contact.whatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Style Interactive Map Frame & Escort Service */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-stone-800 overflow-hidden bg-stone-900/60 shadow-xl">
              {/* Map Preview Embed */}
              <div className="relative h-72 sm:h-80 w-full bg-stone-950">
                <iframe
                  title="Carte localisation Riad SDC Fès Médina"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.9922240957385!2d-4.9835848!3d34.0568853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9ff4b5bfcb79ab%3A0x6b63d91cf0eb20!2sFes%20El%20Bali!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.15)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-stone-200 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Fès El-Bali • Médina Historique</span>
                </div>
              </div>

              {/* Medina Escort Service Description */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif-luxury text-stone-100">
                    {t.contact.arrivalTitle}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {t.contact.arrivalText}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400 border-t border-stone-800">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Point de rendez-vous : Bab Boujloud ou Bab Ziat</span>
                  </span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span>Porteur bagages offert</span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span>3 minutes à pied</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
