import { Reveal } from "@/components/ui/Reveal";
import { getPackage } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { motion } from "framer-motion";

export function Itinerary() {
  const { t, lang } = useLanguage();
  const tour = getPackage("tirupati-tirumala");
  if (!tour) return null;

  return (
    <section id="itinerary" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="itinerary-title">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">{t.itinerary.eyebrow}</p>
        <h2 id="itinerary-title" className="mt-3 font-serif text-4xl leading-tight text-navy md:text-5xl">
          {t.itinerary.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{t.itinerary.lede}</p>
        <figure className="mt-8 overflow-hidden rounded-3xl">
          <img
            src="/images/padmavathi.jpg"
            alt={tx(lang, tour.gallery[1]?.alt ?? tour.imageAlt)}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </figure>
        <p className="mt-4 rounded-2xl bg-saffron-soft/50 px-4 py-3 text-sm leading-relaxed text-navy">{t.itinerary.note}</p>
      </Reveal>
      <ol className="relative space-y-8 border-l border-teal/25 pl-8">
        {tour.itinerary.map((stop, index) => (
          <motion.li
            key={tx(lang, stop.title)}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative"
          >
            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-saffron ring-4 ring-ivory" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">{tx(lang, stop.time)}</p>
            <h3 className="mt-1 font-serif text-2xl text-navy">{tx(lang, stop.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{tx(lang, stop.detail)}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
