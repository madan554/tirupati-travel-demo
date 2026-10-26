import en from "./en";
import te from "./te";

export type { Copy } from "./en";
export type Lang = "en" | "te";

export const dictionary = { en, te };

export function tx(lang: Lang, value: { en: string; te: string }) {
  return value[lang];
}
