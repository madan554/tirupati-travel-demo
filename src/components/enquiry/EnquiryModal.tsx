import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { Modal } from "@/components/ui/Modal";
import { getPackage } from "@/config/site";
import { useEnquiry } from "@/context/EnquiryContext";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { fill } from "@/lib/format";

export function EnquiryModal() {
  const { open, closeEnquiry, prefill, session } = useEnquiry();
  const { t, lang } = useLanguage();
  const selected = getPackage(prefill.interest);
  const title = selected ? fill(t.enquiry.forPackage, { name: tx(lang, selected.title) }) : t.enquiry.title;

  return (
    <Modal open={open} title={title} onClose={closeEnquiry} closeLabel={t.nav.closeMenu}>
      <EnquiryForm key={session} idPrefix={`modal-${session}`} mode="booking" initial={prefill} />
    </Modal>
  );
}
