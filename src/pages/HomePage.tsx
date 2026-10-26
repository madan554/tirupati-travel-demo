import { About } from "@/components/home/About";
import { CabBooking } from "@/components/home/CabBooking";
import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";
import { FleetDemo } from "@/components/home/FleetDemo";
import { Hero } from "@/components/home/Hero";
import { Itinerary } from "@/components/home/Itinerary";
import { Packages } from "@/components/home/Packages";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyUs } from "@/components/home/WhyUs";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { site } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { fill } from "@/lib/format";

export function HomePage() {
  const { t, lang } = useLanguage();
  return (
    <>
      <DocumentTitle
        title={fill(t.meta.homeTitle, { name: tx(lang, site.agencyName) })}
        description={t.meta.homeDescription}
      />
      <Hero />
      <ServiceStrip />
      <Packages />
      <WhyUs />
      <CabBooking />
      <Itinerary />
      <FleetDemo />
      <Testimonials />
      <Faq />
      <About />
      <Contact />
    </>
  );
}
