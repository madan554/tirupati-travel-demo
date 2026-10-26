import { Logo } from "@/components/layout/Logo";
import { useEnquiry } from "@/context/EnquiryContext";
import { useLanguage } from "@/context/LanguageContext";
import { cx, publicUrl } from "@/lib/format";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const links = [
  { id: "home", key: "home" },
  { id: "packages", key: "packages" },
  { id: "cabs", key: "cabs" },
  { id: "about", key: "about" },
  { id: "contact", key: "contact" },
] as const;

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const solid = scrolled || pathname !== "/" || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const hrefFor = (id: string) => (pathname === "/" ? `#${id}` : `${publicUrl("/")}#${id}`);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        solid ? "border-b border-line/80 bg-ivory/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6" aria-label="Primary">
        <a href={hrefFor("home")} className="rounded-xl">
          <Logo light={!solid} />
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={hrefFor(link.id)}
              className={cx(
                "text-sm font-medium",
                pathname === "/" && active === link.id
                  ? "text-teal"
                  : solid
                    ? "text-navy/80 hover:text-navy"
                    : "text-white/85 hover:text-white",
              )}
              aria-current={pathname === "/" && active === link.id ? "true" : undefined}
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={cx(
              "flex rounded-full border p-0.5 text-xs font-semibold",
              solid ? "border-line bg-white text-navy" : "border-white/30 bg-white/10 text-white",
            )}
            role="group"
            aria-label={t.nav.language}
          >
            {(["en", "te"] as const).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
                className={cx(
                  "rounded-full px-2.5 py-1 uppercase",
                  lang === code && (solid ? "bg-navy text-paper" : "bg-paper text-navy"),
                )}
              >
                {code}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-primary hidden sm:inline-flex" onClick={() => openEnquiry()}>
            {t.nav.book}
          </button>
          <button
            type="button"
            className={cx("rounded-full border p-2 lg:hidden", solid ? "border-line text-navy" : "border-white/40 text-white")}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={hrefFor(link.id)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-navy"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav[link.key]}
                </a>
              ))}
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => {
                  setMenuOpen(false);
                  openEnquiry();
                }}
              >
                {t.nav.book}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
