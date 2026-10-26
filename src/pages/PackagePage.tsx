import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { getPackage, site } from "@/config/site";
import { useEnquiry } from "@/context/EnquiryContext";
import { useLanguage } from "@/context/LanguageContext";
import { tx } from "@/i18n";
import { fill, formatINR } from "@/lib/format";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function PackagePage() {
  const { slug } = useParams();
  const tour = getPackage(slug);
  const { t, lang } = useLanguage();
  const { openEnquiry } = useEnquiry();

  if (!tour) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-32">
        <DocumentTitle title={fill(t.meta.homeTitle, { name: tx(lang, site.agencyName) })} />
        <h1 className="font-serif text-4xl text-navy">{t.packagePage.missingTitle}</h1>
        <p className="mt-3 text-muted">{t.packagePage.missingBody}</p>
        <Link className="btn btn-primary mt-6" to="/#packages">
          {t.packagePage.back}
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-20 pt-24">
      <DocumentTitle
        title={fill(t.meta.packageTitle, { tour: tx(lang, tour.title), name: tx(lang, site.agencyName) })}
        description={tx(lang, tour.summary)}
      />
      <div className="relative h-[48vh] min-h-72 overflow-hidden">
        <img src={tour.image} alt={tx(lang, tour.imageAlt)} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-navy/10" />
      </div>
      <div className="mx-auto -mt-16 grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-paper p-6 shadow-xl md:p-8">
          <Link className="arrow-link inline-flex items-center gap-2 text-sm font-semibold text-teal" to="/#packages">
            <ArrowLeft size={16} aria-hidden="true" />
            {t.packagePage.back}
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal">{tx(lang, tour.duration)}</p>
          <h1 className="mt-2 font-serif text-4xl text-navy md:text-5xl">{tx(lang, tour.title)}</h1>
          <p className="mt-4 text-muted">{tx(lang, tour.description)}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-teal">{t.packagePage.samplePrice}</p>
          <p className="font-serif text-5xl text-navy">
            {formatINR(tour.price)}
            <span className="ml-2 font-sans text-base text-muted">{tx(lang, tour.priceUnit)}</span>
          </p>
          <button type="button" className="btn btn-primary mt-6" onClick={() => openEnquiry({ interest: tour.slug })}>
            {t.packages.book}
          </button>
          <p className="mt-4 text-sm text-navy">{t.itinerary.note}</p>

          {tour.gallery.length > 1 ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {tour.gallery.map((image) => (
                <img key={image.src} src={image.src} alt={tx(lang, image.alt)} className="h-48 w-full rounded-2xl object-cover" loading="lazy" />
              ))}
            </div>
          ) : null}

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl text-navy">{t.packagePage.includes}</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {tour.includes.map((item) => (
                  <li key={item.en}>{tx(lang, item)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-navy">{t.packagePage.excludes}</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {tour.excludes.map((item) => (
                  <li key={item.en}>{tx(lang, item)}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">{t.packagePage.includesNote}</p>

          <h2 className="mt-8 font-serif text-2xl text-navy">{t.packagePage.plan}</h2>
          <ol className="mt-4 space-y-4 border-l border-teal/30 pl-5">
            {tour.itinerary.map((stop) => (
              <li key={stop.title.en}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">{tx(lang, stop.time)}</p>
                <h3 className="font-medium text-navy">{tx(lang, stop.title)}</h3>
                <p className="text-sm text-muted">{tx(lang, stop.detail)}</p>
              </li>
            ))}
          </ol>
        </div>
        <aside className="h-fit rounded-3xl border border-line bg-ivory p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-3xl text-navy">{t.packagePage.enquire}</h2>
          <div className="mt-5">
            <EnquiryForm idPrefix={`package-${tour.slug}`} mode="booking" initial={{ interest: tour.slug }} />
          </div>
        </aside>
      </div>
    </article>
  );
}
