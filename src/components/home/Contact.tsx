import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { site } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const { t, lang } = useLanguage();
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28" aria-labelledby="contact-title">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">{t.contact.eyebrow}</p>
          <h2 id="contact-title" className="mt-3 font-serif text-4xl text-navy md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-muted">{t.contact.lede}</p>
          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a className="flex items-start gap-3 text-navy" href={site.phoneHref}>
                <Phone size={18} className="mt-0.5 text-teal" aria-hidden="true" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-muted">{t.contact.phone}</span>
                  {site.phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <a className="flex items-start gap-3 text-navy" href={`mailto:${site.email}`}>
                <Mail size={18} className="mt-0.5 text-teal" aria-hidden="true" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-muted">{t.contact.email}</span>
                  {site.email}
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-navy">
              <MapPin size={18} className="mt-0.5 text-teal" aria-hidden="true" />
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-muted">{t.contact.address}</span>
                {tx(lang, site.address)}
              </span>
            </li>
            <li className="text-navy">
              <span className="block text-xs uppercase tracking-[0.14em] text-muted">{t.contact.hours}</span>
              {tx(lang, site.hours)}
            </li>
          </ul>
          <a className="btn btn-primary mt-6" href={whatsappUrl(t.whatsapp.hero)} target="_blank" rel="noreferrer">
            {t.contact.whatsapp}
          </a>
        </div>
        <div className="rounded-3xl border border-line bg-paper p-5 md:p-7">
          <EnquiryForm idPrefix="contact" mode="contact" />
        </div>
      </div>
      <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-navy text-paper">
        <div className="grid md:grid-cols-[1fr_1.2fr]">
          <div className="p-6 md:p-8">
            <h3 className="font-serif text-3xl">{t.contact.mapTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{t.contact.mapBody}</p>
            <p className="mt-4 text-sm text-white/80">{tx(lang, site.address)}</p>
            <a className="btn btn-light mt-6" href={site.mapsUrl} target="_blank" rel="noreferrer">
              {t.contact.openMaps}
            </a>
          </div>
          <div className="relative min-h-64 bg-[#16324f]" aria-hidden="true">
            <svg viewBox="0 0 640 360" className="h-full w-full">
              <path d="M40 250 C 140 180, 220 210, 300 160 S 470 80, 600 110" fill="none" stroke="#e6d3b2" strokeWidth="4" />
              <circle cx="300" cy="160" r="8" fill="#fbf8f3" />
              <text x="318" y="154" fill="#fbf8f3" fontSize="16">
                Tirupati
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
