import { site } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { cx } from "@/lib/format";

export function Logo({ light = false }: { light?: boolean }) {
  const { lang } = useLanguage();
  return (
    <span className={cx("flex items-center gap-3", light ? "text-paper" : "text-navy")}>
      <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill={light ? "#fbf8f3" : "#0c1c33"} />
        <path d="M18 6.2 20.1 9.2h-4.2L18 6.2Z" fill="#c4954d" />
        <path d="M14.2 10.2h7.6v1.7h-7.6zM13.2 13h9.6v1.7h-9.6zM12.2 15.8h11.6v1.7H12.2zM11 18.6h14v8.2H11z" fill={light ? "#0c1c33" : "#fbf8f3"} />
        <path d="M16.4 21.2h3.2V26.8h-3.2z" fill={light ? "#fbf8f3" : "#0c1c33"} />
      </svg>
      <span className="leading-tight">
        <span className="block font-serif text-lg tracking-tight">{tx(lang, site.agencyName)}</span>
        <span className={cx("block text-[11px] tracking-[0.14em] uppercase", light ? "text-white/70" : "text-muted")}>
          {tx(lang, site.tagline)}
        </span>
      </span>
    </span>
  );
}
