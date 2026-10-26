import { fleet, mapPlaces, site, vehicles } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { fill } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { useState } from "react";

export function FleetDemo() {
  const { t, lang } = useLanguage();
  const [selectedId, setSelectedId] = useState(fleet[0]?.id ?? "");
  const selected = fleet.find((item) => item.id === selectedId) ?? fleet[0];
  const onTripCount = fleet.filter((item) => item.status === "on-trip").length;
  const availableCount = fleet.length - onTripCount;

  if (!selected) return null;
  const vehicle = vehicles.find((item) => item.id === selected.vehicleId);

  return (
    <section id="fleet" className="bg-[#efe8dc] py-20 md:py-28" aria-labelledby="fleet-title">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">{t.fleet.eyebrow}</p>
          <h2 id="fleet-title" className="mt-3 font-serif text-4xl text-navy md:text-5xl">
            {t.fleet.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{t.fleet.lede}</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_24px_50px_-36px_rgba(12,28,51,0.6)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
            <p className="text-sm font-semibold text-navy">{t.fleet.overview}</p>
            <span className="rounded-full bg-saffron-soft px-3 py-1 text-xs font-semibold text-navy">{t.fleet.badge}</span>
          </div>
          <div className="grid lg:grid-cols-[280px_1fr]">
            <div className="border-b border-line p-5 lg:border-r lg:border-b-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{t.fleet.sampleFleet}</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-navy px-3 py-3 text-paper">
                  <p className="font-serif text-3xl">{onTripCount}</p>
                  <p className="text-xs text-white/70">{t.counters.onTrip}</p>
                </div>
                <div className="rounded-2xl bg-teal px-3 py-3 text-paper">
                  <p className="font-serif text-3xl">{availableCount}</p>
                  <p className="text-xs text-white/80">{t.counters.available}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {fleet.map((item) => {
                  const kind = vehicles.find((entry) => entry.id === item.vehicleId);
                  const active = item.id === selected.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`w-full rounded-2xl border px-3 py-3 text-left ${
                          active ? "border-teal bg-teal/5" : "border-line bg-white"
                        }`}
                        aria-pressed={active}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-medium text-navy">{tx(lang, item.driver)}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                              item.status === "on-trip" ? "bg-saffron-soft text-navy" : "bg-teal/10 text-teal-deep"
                            }`}
                          >
                            {item.status === "on-trip" ? t.fleet.onTrip : t.fleet.available}
                          </span>
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          {kind ? tx(lang, kind.name) : ""} · {item.plate}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-4 md:p-5">
              <div
                className="relative h-[420px] overflow-hidden rounded-2xl bg-[#10243c]"
                role="img"
                aria-label={t.fleet.mapLabel}
              >
                <svg viewBox="0 0 640 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#16324f" />
                      <stop offset="100%" stopColor="#0d2238" />
                    </linearGradient>
                  </defs>
                  <rect width="640" height="420" fill="url(#land)" />
                  {Array.from({ length: 8 }).map((_, index) => (
                    <path
                      key={index}
                      d={`M0 ${40 + index * 48} H640`}
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="1"
                    />
                  ))}
                  <path
                    d="M90 340 C 150 300, 210 280, 260 250 S 340 180, 390 140 470 70, 500 48"
                    fill="none"
                    stroke="#e6d3b2"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M250 270 C 340 250, 430 240, 520 230"
                    fill="none"
                    stroke="rgba(230,211,178,0.45)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                {mapPlaces.map((place) => (
                  <span
                    key={place.id}
                    className="absolute -translate-x-1/2 text-[11px] font-medium text-white/80"
                    style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  >
                    <span className="mb-1 block h-1.5 w-1.5 rounded-full bg-saffron-soft" />
                    {tx(lang, place.label)}
                  </span>
                ))}
                <motion.div
                  className="absolute"
                  animate={{ left: `${selected.x}%`, top: `${selected.y}%` }}
                  transition={{ type: "spring", stiffness: 70, damping: 16 }}
                  style={{ x: "-50%", y: "-50%" }}
                >
                  {selected.status === "on-trip" ? (
                    <span className="pulse-ring absolute inset-0 rounded-full bg-saffron-soft" />
                  ) : null}
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-paper text-xs font-bold text-navy shadow-lg">
                    {tx(lang, selected.driver).slice(0, 1)}
                  </span>
                </motion.div>
              </div>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-line bg-white p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">{t.fleet.driver}</p>
                  <p className="mt-1 font-serif text-2xl text-navy">
                    {tx(lang, selected.driver)} · {vehicle ? tx(lang, vehicle.name) : ""}
                  </p>
                  <p className="text-sm text-muted">
                    {t.fleet.plate}: {selected.plate}
                  </p>
                  <p className="mt-1 text-sm font-medium text-navy">
                    {selected.etaMin ? fill(t.fleet.eta, { min: selected.etaMin }) : t.fleet.ready}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a className="btn btn-line" href={site.phoneHref}>
                    {t.fleet.call}
                  </a>
                  <a
                    className="btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                    href={whatsappUrl(`${t.fleet.driver}: ${tx(lang, selected.driver)} · ${selected.plate}`)}
                  >
                    {t.fleet.whatsapp}
                  </a>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted">{t.fleet.demoFoot}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
