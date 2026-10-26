import { packages, site } from "@/config/site";
import { publicUrl } from "@/lib/format";
import { useEnquiry } from "@/context/EnquiryContext";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { todayISO } from "@/lib/dates";
import { whatsappUrl } from "@/lib/whatsapp";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";

export function Hero() {
  const { t, lang } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const [interest, setInterest] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!interest) {
      setError(t.validation.journey);
      return;
    }
    if (!date || date < todayISO()) {
      setError(date ? t.validation.datePast : t.validation.date);
      return;
    }
    const count = Number(guests);
    if (!Number.isInteger(count) || count < 1 || count > 18) {
      setError(t.validation.guests);
      return;
    }
    setError("");
    openEnquiry({ interest, date, guests });
  };

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden text-white">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <img
          src={publicUrl("/images/tirumala-hero.jpg")}
          alt={tx(lang, site.heroImageAlt)}
          className="kenburns h-[118%] w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy/25 to-navy-deep/88" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-28 pt-28 md:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-saffron-soft">{t.hero.kicker}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.7rem,6vw,5.4rem)] leading-[1.02]">
            <span className="block">{t.hero.title1}</span>
            <span className="block">{t.hero.title2}</span>
            <span className="block text-saffron-soft">{t.hero.title3}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{t.hero.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className="btn btn-light" onClick={() => openEnquiry()}>
              {t.hero.book}
            </button>
            <a className="btn btn-ghost" href={whatsappUrl(t.whatsapp.hero)} target="_blank" rel="noreferrer">
              {t.hero.whatsapp}
            </a>
          </div>
        </motion.div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-8 rounded-3xl bg-paper p-4 text-ink shadow-[0_24px_60px_-30px_rgba(0,0,0,0.65)] md:p-5"
        >
          <p className="px-1 text-sm font-semibold text-navy">{t.hero.widgetTitle}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-[1.4fr_1fr_0.7fr_auto]">
            <label className="block text-xs font-medium text-muted">
              {t.hero.destination}
              <select className="field mt-1.5" value={interest} onChange={(event) => setInterest(event.target.value)}>
                <option value="">{t.hero.choose}</option>
                {packages.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {tx(lang, item.title)}
                  </option>
                ))}
                <option value="cab">{t.hero.cabOnly}</option>
              </select>
            </label>
            <label className="block text-xs font-medium text-muted">
              {t.hero.date}
              <input
                className="field mt-1.5"
                type="date"
                min={todayISO()}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
            <label className="block text-xs font-medium text-muted">
              {t.hero.guests}
              <input
                className="field mt-1.5"
                type="number"
                min={1}
                max={18}
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-primary self-end">
              {t.hero.enquire}
            </button>
          </div>
          {error ? (
            <p className="mt-3 px-1 text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
