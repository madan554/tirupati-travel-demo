import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { reasons } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { motion } from "framer-motion";
import { BadgeIndianRupee, CalendarDays, Car, Headset, Route, Users, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  vehicles: Car,
  drivers: Users,
  flexible: Route,
  booking: CalendarDays,
  support: Headset,
  pricing: BadgeIndianRupee,
};

export function WhyUs() {
  const { t, lang } = useLanguage();
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="why-title">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          aria-hidden="true"
          className="float-y pointer-events-none absolute -right-4 top-0 hidden h-24 w-24 rounded-full border border-saffron/40 lg:block"
        />
        <Reveal>
          <SectionHeader id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} lede={t.why.lede} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, index) => {
            const Icon = icons[item.id] ?? Car;
            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <article className="group h-full rounded-3xl border border-line bg-ivory p-6 transition duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_18px_40px_-28px_rgba(12,28,51,0.45)]">
                  <motion.span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal"
                    whileHover={{ rotate: -6, scale: 1.05 }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </motion.span>
                  <h3 className="mt-5 font-serif text-2xl text-navy">{tx(lang, item.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tx(lang, item.body)}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
