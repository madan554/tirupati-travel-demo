import { packages, vehicles } from "@/config/site";
import { dictionary, tx, type Lang } from "@/i18n";
import { fill, formatINR } from "@/lib/format";

export type Intent =
  | "packages"
  | "prices"
  | "duration"
  | "cabs"
  | "book"
  | "tirumala"
  | "kalahasti"
  | "chennai";

const slugByIntent: Partial<Record<Intent, string>> = {
  tirumala: "tirupati-tirumala",
  kalahasti: "srikalahasti-kanipakam",
  chennai: "chennai-mahabalipuram",
};

const rules: [Intent, RegExp][] = [
  ["kalahasti", /kalahasti|kanipakam|కాళహస్తి|కాణిపాక/i],
  ["chennai", /chennai|mahabalipuram|mamallapuram|చెన్నై|మహాబలిపురం/i],
  ["prices", /price|prices|cost|fare|rate|charge|₹|ధర|ఎంత|ఛార్జ/i],
  ["duration", /how long|duration|nights|ఎన్ని రోజు|ఎంతసేపు|వ్యవధి|రాత్రు/i],
  ["cabs", /cab|taxi|sedan|suv|tempo|vehicle|airport|వాహన|క్యాబ్|టాక్సీ|సెడాన్/i],
  ["book", /book|enquiry|enquir|reserve|quote|బుక్|విచారణ|రిజర్వ్/i],
  ["tirumala", /tirumala|తిరుమల/i],
  ["packages", /package|tour|tirupati|దర్శన|తిరుపతి|ప్యాకేజీ|టూర్/i],
];

export function detectIntent(text: string): Intent | null {
  const found = rules.find(([, pattern]) => pattern.test(text));
  return found ? found[0] : null;
}

export function isCancel(text: string) {
  return /^(menu|back|cancel|stop|restart|మెనూ|వెనక్కి|రద్దు)$/i.test(text.trim());
}

export function isValidName(text: string) {
  return /^[\p{L}][\p{L}\p{M}\s.'-]{1,80}$/u.test(text.trim());
}

export function isPlausibleDate(text: string) {
  const value = text.trim();
  return value.length >= 4 && value.length <= 40 && /[\p{L}\d]/u.test(value);
}

export function readGroupSize(text: string) {
  const match = text.match(/\d+/);
  if (!match) return null;
  const size = Number(match[0]);
  if (size < 1 || size > 40) return null;
  return size;
}

function packageLines(lang: Lang) {
  return packages
    .map((item) => `${tx(lang, item.title)} — ${tx(lang, item.duration)} — ${formatINR(item.price)}`)
    .join("\n");
}

function packageDetail(slug: string, lang: Lang) {
  const copy = dictionary[lang].chat;
  const item = packages.find((entry) => entry.slug === slug);
  if (!item) return copy.fallback;
  const stops = item.itinerary.map((stop) => tx(lang, stop.title)).join(" · ");
  return [
    tx(lang, item.title),
    `${tx(lang, item.duration)} · ${formatINR(item.price)} ${tx(lang, item.priceUnit)}`,
    tx(lang, item.summary),
    stops,
    copy.darshan,
  ].join("\n");
}

export function answerFor(intent: Intent, lang: Lang) {
  const copy = dictionary[lang].chat;
  if (intent === "tirumala" || intent === "kalahasti" || intent === "chennai") {
    return packageDetail(slugByIntent[intent] ?? "", lang);
  }
  if (intent === "prices") {
    return `${copy.samplePrices}\n${packageLines(lang)}\n${copy.darshan}`;
  }
  if (intent === "duration") {
    const lines = packages.map((item) => `${tx(lang, item.title)} — ${tx(lang, item.duration)}`).join("\n");
    return `${copy.durations}\n${lines}`;
  }
  if (intent === "cabs") {
    const lines = vehicles
      .map((item) => `${tx(lang, item.name)} — ${fill(copy.seats, { seats: item.seats })}`)
      .join("\n");
    return `${copy.cabIntro}\n${lines}`;
  }
  return `${copy.packagesIntro}\n${packageLines(lang)}\n${copy.darshan}`;
}
