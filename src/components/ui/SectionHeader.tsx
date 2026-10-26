import { cx } from "@/lib/format";

export function SectionHeader({
  eyebrow,
  title,
  lede,
  invert = false,
  id,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  invert?: boolean;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className={cx("text-xs font-semibold uppercase tracking-[0.22em]", invert ? "text-saffron-soft" : "text-teal")}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cx("mt-3 font-serif text-4xl leading-[1.15] md:text-5xl", invert ? "text-paper" : "text-navy")}
      >
        {title}
      </h2>
      {lede ? (
        <p className={cx("mt-4 text-base leading-relaxed md:text-lg", invert ? "text-white/75" : "text-muted")}>{lede}</p>
      ) : null}
    </div>
  );
}
