import { packages } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import type { EnquiryPrefill } from "@/context/EnquiryContext";
import { tx } from "@/i18n";
import { todayISO } from "@/lib/dates";
import { isEmail, isIndianMobile } from "@/lib/phone";
import { enquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { Field, fieldProps } from "@/components/ui/Field";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";

type Values = {
  name: string;
  phone: string;
  email: string;
  date: string;
  guests: string;
  interest: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", phone: "", email: "", date: "", guests: "", interest: "", message: "" };

export function EnquiryForm({
  idPrefix,
  mode,
  initial,
}: {
  idPrefix: string;
  mode: "booking" | "contact";
  initial?: EnquiryPrefill;
}) {
  const { t, lang } = useLanguage();
  const [values, setValues] = useState<Values>({
    ...empty,
    date: initial?.date ?? "",
    guests: initial?.guests ?? "",
    interest: initial?.interest ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const set = (key: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = t.validation.name;
    if (!isIndianMobile(values.phone)) next.phone = t.validation.phone;
    if (values.email && !isEmail(values.email)) next.email = t.validation.email;
    const tripRequired = mode === "booking";
    if (tripRequired && !values.date) next.date = t.validation.date;
    if (values.date && values.date < todayISO()) next.date = t.validation.datePast;
    const guests = Number(values.guests);
    if (tripRequired && (!Number.isInteger(guests) || guests < 1 || guests > 18)) next.guests = t.validation.guests;
    if (!tripRequired && values.guests && (!Number.isInteger(guests) || guests < 1 || guests > 18)) {
      next.guests = t.validation.guests;
    }
    if (tripRequired && !values.interest) next.interest = t.validation.interest;
    return next;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setDone(true);
  };

  if (done) {
    const link = whatsappUrl(
      enquiryMessage(lang, {
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        date: values.date,
        guests: values.guests,
        interest: values.interest,
        message: values.message.trim(),
      }),
    );
    return (
      <div className="rounded-2xl border border-teal/20 bg-white p-5" role="status">
        <div className="flex items-center gap-3 text-teal-deep">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
            <Check size={18} aria-hidden="true" />
          </span>
          <h3 className="font-serif text-2xl text-navy">{t.enquiry.successTitle}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t.enquiry.successBody}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={link} target="_blank" rel="noreferrer">
            {t.enquiry.whatsapp}
          </a>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setDone(false);
              setValues(empty);
            }}
          >
            {t.enquiry.another}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      {Object.keys(errors).length > 0 ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-danger" role="alert">
          {Object.values(errors)[0]}
        </p>
      ) : null}
      <Field id={`${idPrefix}-name`} label={t.enquiry.name} error={errors.name}>
        <input
          {...fieldProps(`${idPrefix}-name`, errors.name)}
          value={values.name}
          autoComplete="name"
          onChange={(event) => set("name", event.target.value)}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${idPrefix}-phone`} label={t.enquiry.phone} error={errors.phone}>
          <input
            {...fieldProps(`${idPrefix}-phone`, errors.phone)}
            value={values.phone}
            inputMode="tel"
            autoComplete="tel"
            onChange={(event) => set("phone", event.target.value)}
          />
        </Field>
        <Field id={`${idPrefix}-email`} label={t.enquiry.email} error={errors.email}>
          <input
            {...fieldProps(`${idPrefix}-email`, errors.email)}
            type="email"
            value={values.email}
            autoComplete="email"
            onChange={(event) => set("email", event.target.value)}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${idPrefix}-date`} label={t.enquiry.date} error={errors.date}>
          <input
            {...fieldProps(`${idPrefix}-date`, errors.date)}
            type="date"
            min={todayISO()}
            value={values.date}
            onChange={(event) => set("date", event.target.value)}
          />
        </Field>
        <Field id={`${idPrefix}-guests`} label={t.enquiry.guests} error={errors.guests}>
          <input
            {...fieldProps(`${idPrefix}-guests`, errors.guests)}
            type="number"
            min={1}
            max={18}
            value={values.guests}
            onChange={(event) => set("guests", event.target.value)}
          />
        </Field>
      </div>
      <Field id={`${idPrefix}-interest`} label={t.enquiry.interest} error={errors.interest}>
        <select
          {...fieldProps(`${idPrefix}-interest`, errors.interest)}
          value={values.interest}
          onChange={(event) => set("interest", event.target.value)}
        >
          <option value="">{t.hero.choose}</option>
          {packages.map((item) => (
            <option key={item.slug} value={item.slug}>
              {tx(lang, item.title)}
            </option>
          ))}
          <option value="cab">{t.hero.cabOnly}</option>
          <option value="unsure">{t.hero.unsure}</option>
        </select>
      </Field>
      <Field id={`${idPrefix}-message`} label={t.enquiry.message}>
        <textarea
          {...fieldProps(`${idPrefix}-message`)}
          rows={3}
          value={values.message}
          placeholder={t.enquiry.messagePlaceholder}
          onChange={(event) => set("message", event.target.value)}
        />
      </Field>
      <button type="submit" className="btn btn-primary">
        {t.enquiry.submit}
      </button>
    </form>
  );
}
