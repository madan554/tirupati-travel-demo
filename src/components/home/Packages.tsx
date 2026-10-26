import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { packages } from "@/config/site";
import { useEnquiry } from "@/context/EnquiryContext";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { formatINR } from "@/lib/format";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Packages() {
  const { t, lang } = useLanguage();
  const { openEnquiry } = useEnquiry();

  return (
    <section id="packages" className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28" aria-labelledby="packages-title">
      <Reveal>
        <SectionHeader id="packages-title" eyebrow={t.packages.eyebrow} title={t.packages.title} lede={t.packages.lede} />
      </Reveal>
      <motion.div
        className="mt-12 grid gap-6 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        {packages.map((item) => (
          <motion.article
            key={item.slug}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
            className="lift-card flex flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_18px_40px_-32px_rgba(12,28,51,0.7)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={item.image} alt={tx(lang, item.imageAlt)} className="zoom-img h-full w-full object-cover" loading="lazy" />
              <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-navy">
                {tx(lang, item.duration)}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-serif text-2xl text-navy">{tx(lang, item.title)}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{tx(lang, item.summary)}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-teal">{t.packages.sampleFrom}</p>
              <p className="font-serif text-4xl text-navy">
                {formatINR(item.price)}
                <span className="ml-2 font-sans text-sm font-medium text-muted">{tx(lang, item.priceUnit)}</span>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link className="btn btn-line arrow-link" to={`/packages/${item.slug}`}>
                  {t.packages.view}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <button type="button" className="btn btn-primary" onClick={() => openEnquiry({ interest: item.slug })}>
                  {t.packages.book}
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
      <p className="mt-6 text-sm text-muted">{t.packages.note}</p>
    </section>
  );
}
