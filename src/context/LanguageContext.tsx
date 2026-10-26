import { dictionary, type Lang } from "@/i18n";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof dictionary)["en"];
};

const LanguageContext = createContext<LanguageValue | null>(null);

function initialLang(): Lang {
  try {
    return localStorage.getItem("travel-demo-lang") === "te" ? "te" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("travel-demo-lang", lang);
    } catch {
      /* Presentation still works if storage is blocked. */
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dictionary[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used within LanguageProvider");
  return value;
}
