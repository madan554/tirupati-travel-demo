import { Logo } from "@/components/layout/Logo";
import { photoCredits, site } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";

export function Footer() {
  const { t, lang } = useLanguage();
  const { pathname } = useLocation();
  const hrefFor = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);
  const year = new Date().getFullYear();
  const explore = [
    { id: "packages", label: t.nav.packages },
    { id: "cabs", label: t.nav.cabs },
    { id: "itinerary", label: t.footer.itinerary },
    { id: "fleet", label: t.footer.fleet },
    { id: "about", label: t.nav.about },
    { id: "faq", label: t.footer.faq },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-navy-deep text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{t.footer.blurb}</p>
        </div>
        <nav aria-label={t.footer.explore}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-soft">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {explore.map((item) => (
              <li key={item.id}>
                <a className="text-white/80 hover:text-white" href={hrefFor(item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-soft">{t.footer.visit}</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a className="inline-flex items-start gap-2 hover:text-white" href={site.phoneHref}>
                <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="inline-flex items-start gap-2 hover:text-white" href={`mailto:${site.email}`}>
                <Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{tx(lang, site.address)}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/60 md:px-6">
          <p>
            © {year} {tx(lang, site.agencyName)}. {t.footer.rights}
          </p>
          <p>{t.footer.demoNote}</p>
          <details>
            <summary className="cursor-pointer text-white/75">{t.footer.credits}</summary>
            <p className="mt-2">{t.footer.photos}</p>
            <ul className="mt-2 space-y-1">
              {photoCredits.map((credit) => (
                <li key={credit.href}>
                  <a className="underline decoration-white/30 underline-offset-2 hover:text-white" href={credit.href}>
                    {credit.label}
                  </a>
                  {" · "}
                  {credit.author}
                  {" · "}
                  {credit.license}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
