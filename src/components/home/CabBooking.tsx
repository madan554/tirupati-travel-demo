import { SectionHeader } from "@/components/ui/SectionHeader";
import { Field, fieldProps } from "@/components/ui/Field";
import { vehicles, type VehicleId } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { todayISO } from "@/lib/dates";
import { fill } from "@/lib/format";
import { enquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { Bus, Car, CarFront, Check } from "lucide-react";
import { useState, type FormEvent } from "react";

const icons = { sedan: Car, suv: CarFront, tempo: Bus };

type Errors = Partial<Record<"pickup" | "drop" | "date" | "passengers" | "vehicle", string>>;

export function CabBooking() {
  const { t, lang } = useLanguage();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [vehicle, setVehicle] = useState<VehicleId | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (pickup.trim().length < 3) next.pickup = t.validation.pickup;
    if (drop.trim().length < 3) next.drop = t.validation.drop;
    if (pickup.trim() && drop.trim() && pickup.trim().toLowerCase() === drop.trim().toLowerCase()) {
      next.drop = t.validation.samePlace;
    }
    if (!date) next.date = t.validation.date;
    else if (date < todayISO()) next.date = t.validation.datePast;
    const count = Number(passengers);
    if (!Number.isInteger(count) || count < 1 || count > 18) next.passengers = t.validation.guests;
    if (!vehicle) next.vehicle = t.validation.vehicle;
    setErrors(next);
    setDone(Object.keys(next).length === 0);
  };

  const selected = vehicles.find((item) => item.id === vehicle);

  return (
    <section id="cabs" className="bg-navy py-20 text-paper md:py-28" aria-labelledby="cabs-title">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader invert id="cabs-title" eyebrow={t.cabs.eyebrow} title={t.cabs.title} lede={t.cabs.lede} />
        <form onSubmit={onSubmit} noValidate className="mt-10 rounded-3xl bg-paper p-5 text-ink md:p-8">
          <fieldset>
            <legend className="text-sm font-semibold text-navy">{t.cabs.vehicle}</legend>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {vehicles.map((item) => {
                const Icon = icons[item.id];
                const active = vehicle === item.id;
                return (
                  <label
                    key={item.id}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      active ? "border-teal bg-teal/5 shadow-[0_0_0_3px_rgba(15,110,107,0.12)]" : "border-line bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="vehicle"
                      className="sr-only"
                      checked={active}
                      onChange={() => setVehicle(item.id)}
                    />
                    <Icon className="text-teal" size={22} aria-hidden="true" />
                    <span className="mt-3 block font-serif text-2xl text-navy">{tx(lang, item.name)}</span>
                    <span className="mt-1 block text-sm text-muted">{tx(lang, item.blurb)}</span>
                    <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                      {fill(t.chat.seats, { seats: item.seats })}
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.vehicle ? <p className="mt-2 text-sm text-danger">{errors.vehicle}</p> : null}
          </fieldset>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field id="cab-pickup" label={t.cabs.pickup} error={errors.pickup}>
              <input
                {...fieldProps("cab-pickup", errors.pickup)}
                value={pickup}
                placeholder="Tirupati railway station"
                onChange={(event) => setPickup(event.target.value)}
              />
            </Field>
            <Field id="cab-drop" label={t.cabs.drop} error={errors.drop}>
              <input
                {...fieldProps("cab-drop", errors.drop)}
                value={drop}
                placeholder="Tirumala"
                onChange={(event) => setDrop(event.target.value)}
              />
            </Field>
            <Field id="cab-date" label={t.cabs.date} error={errors.date}>
              <input
                {...fieldProps("cab-date", errors.date)}
                type="date"
                min={todayISO()}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </Field>
            <Field id="cab-passengers" label={t.cabs.passengers} error={errors.passengers}>
              <input
                {...fieldProps("cab-passengers", errors.passengers)}
                type="number"
                min={1}
                max={18}
                value={passengers}
                onChange={(event) => setPassengers(event.target.value)}
              />
            </Field>
          </div>
          <button type="submit" className="btn btn-primary mt-6">
            {t.cabs.quote}
          </button>
          {done && selected ? (
            <div className="mt-6 rounded-2xl border border-teal/20 bg-white p-5" role="status">
              <div className="flex items-center gap-2 text-teal-deep">
                <Check size={18} aria-hidden="true" />
                <h3 className="font-serif text-2xl text-navy">{t.cabs.successTitle}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {fill(t.cabs.successBody, {
                  vehicle: tx(lang, selected.name),
                  date,
                  guests: passengers,
                  pickup: pickup.trim(),
                  drop: drop.trim(),
                })}
              </p>
              <p className="mt-2 text-sm text-muted">{t.cabs.demoNote}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                  href={whatsappUrl(
                    enquiryMessage(lang, {
                      name: "",
                      phone: "",
                      date,
                      guests: passengers,
                      pickup: pickup.trim(),
                      drop: drop.trim(),
                      vehicle: tx(lang, selected.name),
                      interest: "cab",
                    }),
                  )}
                >
                  {t.cabs.whatsapp}
                </a>
                <button type="button" className="btn btn-line" onClick={() => setDone(false)}>
                  {t.cabs.edit}
                </button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
