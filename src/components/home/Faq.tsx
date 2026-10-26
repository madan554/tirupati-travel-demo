import { faqs } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Faq() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-paper py-20 md:py-28" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">{t.faq.eyebrow}</p>
          <h2 id="faq-title" className="mt-3 font-serif text-4xl text-navy md:text-5xl">
            {t.faq.title}
          </h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((item, index) => {
            const expanded = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={tx(lang, item.q)}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    <span className="font-serif text-2xl text-navy">{tx(lang, item.q)}</span>
                    <ChevronDown className={`shrink-0 text-teal transition ${expanded ? "rotate-180" : ""}`} size={20} />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className={`grid ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid-template-rows] duration-300 motion-reduce:transition-none`}>
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-muted">{tx(lang, item.a)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
