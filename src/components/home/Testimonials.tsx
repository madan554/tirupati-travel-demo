import { testimonials } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { fill } from "@/lib/format";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Testimonials() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = testimonials[index];

  useEffect(() => {
    if (reduce || paused || !current) return;
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % testimonials.length), 7000);
    return () => window.clearTimeout(timer);
  }, [current, index, paused, reduce]);

  if (!current) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 md:px-6 md:py-28" aria-labelledby="stories-title" aria-roledescription="carousel">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">{t.testimonials.eyebrow}</p>
      <h2 id="stories-title" className="mt-3 font-serif text-4xl text-navy md:text-5xl">
        {t.testimonials.title}
      </h2>
      <p className="mt-4 max-w-2xl text-muted">{t.testimonials.lede}</p>
      <div
        className="relative mt-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-line bg-paper p-8 md:p-10"
          >
            <span className="rounded-full bg-saffron-soft px-3 py-1 text-xs font-semibold text-navy">{t.testimonials.sample}</span>
            <p className="mt-5 font-serif text-2xl leading-snug text-navy md:text-3xl">“{tx(lang, current.quote)}”</p>
            <footer className="mt-6 text-sm text-muted">
              <span className="font-semibold text-navy">{tx(lang, current.guest)}</span>
              <span> · {tx(lang, current.trip)}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={fill(t.testimonials.dot, { n: itemIndex + 1 })}
                aria-current={itemIndex === index ? "true" : undefined}
                className={`h-2.5 rounded-full ${itemIndex === index ? "w-8 bg-teal" : "w-2.5 bg-navy/20"}`}
                onClick={() => setIndex(itemIndex)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-line p-2 text-navy"
              aria-label={t.testimonials.prev}
              onClick={() => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="rounded-full border border-line p-2 text-navy"
              aria-label={t.testimonials.next}
              onClick={() => setIndex((value) => (value + 1) % testimonials.length)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
