import { useLanguage } from "@/context/LanguageContext";
import {
  answerFor,
  detectIntent,
  isCancel,
  isPlausibleDate,
  isValidName,
  readGroupSize,
  type Intent,
} from "@/lib/assistant";
import { useBodyLock } from "@/lib/body-lock";
import { fill } from "@/lib/format";
import { enquiryMessage, interestLabel, whatsappUrl } from "@/lib/whatsapp";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

type Role = "bot" | "user";
type Step = "menu" | "name" | "date" | "group" | "done";
type Message = { id: string; role: Role; text: string };
type Lead = { name: string; date: string; group: string; interest: string };

const intents: Intent[] = ["packages", "prices", "duration", "cabs", "book", "tirumala", "kalahasti", "chennai"];

function isIntent(value: string): value is Intent {
  return intents.includes(value as Intent);
}

let sequence = 0;
const nextId = () => `msg-${sequence++}`;

export function AssistDock() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("menu");
  const [lead, setLead] = useState<Lead>({ name: "", date: "", group: "", interest: "" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const request = useRef(0);
  useBodyLock(open && window.matchMedia("(max-width: 640px)").matches);

  useEffect(() => {
    setMessages((current) => (current.length <= 1 ? [{ id: "hi", role: "bot", text: t.chat.greeting }] : current));
  }, [t.chat.greeting]);

  useEffect(() => {
    const node = logRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const say = (userText: string, botText: string) => {
    const ticket = ++request.current;
    setMessages((current) => [...current, { id: nextId(), role: "user", text: userText }]);
    setTyping(true);
    window.setTimeout(() => {
      if (request.current !== ticket) return;
      setTyping(false);
      setMessages((current) => [...current, { id: nextId(), role: "bot", text: botText }]);
    }, reduce ? 0 : 280);
  };

  const promptFor = (current: Step) => {
    if (current === "name") return t.chat.askName;
    if (current === "date") return t.chat.askDate;
    if (current === "group") return t.chat.askGroup;
    return "";
  };

  const handle = (text: string, intent?: Intent) => {
    const value = text.trim();
    if (!value) return;
    setDraft("");

    if (step === "name" || step === "date" || step === "group") {
      if (isCancel(value)) {
        setStep("menu");
        say(value, t.chat.greeting);
        return;
      }
      const guessed = intent ?? detectIntent(value);
      const sideQuestion = Boolean(guessed) && (value.includes("?") || value.split(/\s+/).length >= 3);
      if (sideQuestion && guessed && guessed !== "book") {
        say(value, `${answerFor(guessed, lang)}\n\n${t.chat.pause}\n${promptFor(step)}`);
        return;
      }
      if (step === "name") {
        if (!isValidName(value)) {
          say(value, t.chat.invalidName);
          return;
        }
        setLead((current) => ({ ...current, name: value }));
        setStep("date");
        say(value, t.chat.askDate);
        return;
      }
      if (step === "date") {
        if (!isPlausibleDate(value)) {
          say(value, t.chat.invalidDate);
          return;
        }
        setLead((current) => ({ ...current, date: value }));
        setStep("group");
        say(value, t.chat.askGroup);
        return;
      }
      const size = readGroupSize(value);
      if (!size) {
        say(value, t.chat.invalidGroup);
        return;
      }
      setLead((current) => ({ ...current, group: String(size) }));
      setStep("done");
      const summary = fill(t.chat.summary, { name: lead.name, date: lead.date, group: size });
      say(value, size > 12 ? `${summary}\n${t.chat.largeGroup}\n${t.chat.demoNote}` : `${summary}\n${t.chat.demoNote}`);
      return;
    }

    const chosen = intent ?? detectIntent(value);
    if (chosen === "book") {
      setStep("name");
      say(value, t.chat.askName);
      return;
    }
    if (chosen) {
      say(value, answerFor(chosen, lang));
      return;
    }
    say(value, t.chat.fallback);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handle(draft);
  };

  const whatsapp = whatsappUrl(
    enquiryMessage(lang, {
      name: lead.name,
      phone: "",
      date: lead.date,
      guests: lead.group,
      interest: lead.interest,
    }),
  );

  return (
    <>
      <a
        href={whatsappUrl(t.whatsapp.hero)}
        target="_blank"
        rel="noreferrer"
        aria-label={t.whatsapp.float}
        className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-lg ${open ? "max-sm:hidden" : ""}`}
      >
        <MessageCircle aria-hidden="true" />
      </a>
      <button
        type="button"
        className={`fixed bottom-5 right-24 z-40 flex h-14 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-paper shadow-lg ${open ? "hidden" : ""}`}
        aria-expanded={open}
        aria-controls="travel-assistant"
        onClick={() => setOpen(true)}
      >
        <Bot size={18} aria-hidden="true" />
        <span className="hidden sm:inline">{t.chat.title}</span>
        <span className="sr-only sm:hidden">{t.chat.launcher}</span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.section
            id="travel-assistant"
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            className="fixed inset-x-3 bottom-24 z-40 flex max-h-[min(34rem,70vh)] flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-2xl sm:inset-x-auto sm:right-5 sm:w-[24rem]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <header className="flex items-start justify-between gap-3 bg-navy px-4 py-3 text-paper">
              <div>
                <h2 id={titleId} className="font-serif text-xl">
                  {t.chat.title}
                </h2>
                <p className="text-xs text-white/70">{t.chat.badge}</p>
              </div>
              <button type="button" className="rounded-full border border-white/20 p-1.5" aria-label={t.nav.closeMenu} onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </header>
            <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((message) => (
                <p
                  key={message.id}
                  className={`max-w-[90%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "bot" ? "bg-ivory text-navy" : "ml-auto bg-teal text-paper"
                  }`}
                >
                  {message.text}
                </p>
              ))}
              {typing ? <p className="text-xs text-muted">…</p> : null}
            </div>
            {step === "menu" || step === "done" ? (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {step === "menu"
                  ? t.chat.menu.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy"
                        onClick={() => isIntent(item.id) && handle(item.label, item.id)}
                      >
                        {item.label}
                      </button>
                    ))
                  : null}
                {step === "done" ? (
                  <>
                    {(["tirumala", "kalahasti", "chennai"] as const).map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy"
                        onClick={() => {
                          setLead((current) => ({ ...current, interest: item === "tirumala" ? "tirupati-tirumala" : item === "kalahasti" ? "srikalahasti-kanipakam" : "chennai-mahabalipuram" }));
                          say(interestLabel(lang, item === "tirumala" ? "tirupati-tirumala" : item === "kalahasti" ? "srikalahasti-kanipakam" : "chennai-mahabalipuram"), fill(t.chat.mentioned, { interest: interestLabel(lang, item === "tirumala" ? "tirupati-tirumala" : item === "kalahasti" ? "srikalahasti-kanipakam" : "chennai-mahabalipuram") }));
                        }}
                      >
                        {interestLabel(lang, item === "tirumala" ? "tirupati-tirumala" : item === "kalahasti" ? "srikalahasti-kanipakam" : "chennai-mahabalipuram")}
                      </button>
                    ))}
                    <a className="rounded-full bg-teal px-3 py-1.5 text-xs font-semibold text-paper" href={whatsapp} target="_blank" rel="noreferrer">
                      {t.chat.whatsapp}
                    </a>
                    <button
                      type="button"
                      className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-navy"
                      onClick={() => {
                        setStep("menu");
                        setLead({ name: "", date: "", group: "", interest: "" });
                        setMessages([{ id: nextId(), role: "bot", text: t.chat.greeting }]);
                      }}
                    >
                      {t.chat.again}
                    </button>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="px-4 pb-2">
                <button
                  type="button"
                  className="text-xs font-semibold text-teal"
                  onClick={() => {
                    setStep("menu");
                    setMessages((current) => [...current, { id: nextId(), role: "bot", text: t.chat.greeting }]);
                  }}
                >
                  {t.chat.back}
                </button>
              </div>
            )}
            <form className="flex gap-2 border-t border-line p-3" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="assistant-input">
                {t.chat.placeholder}
              </label>
              <input
                id="assistant-input"
                ref={inputRef}
                className="field"
                value={draft}
                placeholder={t.chat.placeholder}
                onChange={(event) => setDraft(event.target.value)}
              />
              <button type="submit" className="btn btn-primary px-3" aria-label={t.chat.send}>
                <Send size={16} />
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
