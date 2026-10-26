import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { publicUrl } from "@/lib/format";

export function About() {
  const { t, lang } = useLanguage();
  return (
    <section id="about" className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-2" aria-labelledby="about-title">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem]">
          <img src={publicUrl("/images/hills.jpg")} alt={t.about.imageAlt} className="aspect-[5/4] w-full object-cover" loading="lazy" />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">{t.about.eyebrow}</p>
        <h2 id="about-title" className="mt-3 font-serif text-4xl leading-tight text-navy md:text-5xl">
          {t.about.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">{tx(lang, about.body)}</p>
        <ul className="mt-6 space-y-3">
          {about.points.map((point) => (
            <li key={point.en} className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm leading-relaxed text-navy">
              {tx(lang, point)}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">{t.about.replace}</p>
      </Reveal>
    </section>
  );
}
