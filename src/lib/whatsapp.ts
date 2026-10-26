import { getPackage, site } from "@/config/site";
import { dictionary, tx, type Lang } from "@/i18n";

export function whatsappUrl(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function interestLabel(lang: Lang, id: string) {
  const copy = dictionary[lang];
  if (id === "cab") return copy.hero.cabOnly;
  if (!id || id === "unsure") return copy.hero.unsure;
  const pack = getPackage(id);
  return pack ? tx(lang, pack.title) : id;
}

export type EnquiryDraft = {
  name: string;
  phone: string;
  email?: string;
  date?: string;
  guests?: string;
  interest?: string;
  message?: string;
  pickup?: string;
  drop?: string;
  vehicle?: string;
};

export function enquiryMessage(lang: Lang, draft: EnquiryDraft) {
  const copy = dictionary[lang];
  const lines = [copy.whatsapp.intro];
  if (draft.name) lines.push(`${copy.enquiry.name}: ${draft.name}`);
  if (draft.phone) lines.push(`${copy.enquiry.phone}: ${draft.phone}`);
  if (draft.email) lines.push(`${copy.enquiry.email}: ${draft.email}`);
  if (draft.date) lines.push(`${copy.enquiry.date}: ${draft.date}`);
  if (draft.guests) lines.push(`${copy.enquiry.guests}: ${draft.guests}`);
  if (draft.interest) lines.push(`${copy.whatsapp.interest}: ${interestLabel(lang, draft.interest)}`);
  if (draft.pickup) lines.push(`${copy.cabs.pickup}: ${draft.pickup}`);
  if (draft.drop) lines.push(`${copy.cabs.drop}: ${draft.drop}`);
  if (draft.vehicle) lines.push(`${copy.cabs.vehicle}: ${draft.vehicle}`);
  if (draft.message) lines.push(draft.message);
  return lines.join("\n");
}
