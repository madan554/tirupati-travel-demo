import { useLanguage } from "@/context/LanguageContext";

export function ServiceStrip() {
  const { t } = useLanguage();
  return (
    <section aria-label={t.why.eyebrow} className="border-b border-line bg-paper/80">
      <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 md:px-6">
        {t.strip.map((item) => (
          <li key={item.title} className="border-l border-saffron/50 pl-4">
            <p className="font-medium text-navy">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
