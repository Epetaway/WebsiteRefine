import type { ReactNode } from "react";

type Props = {
  label: string;
  title: ReactNode;
  lead: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
  compact?: boolean;
};

export function PageIntro({ label, title, lead, aside, dark = false, compact = false }: Props) {
  return (
    <section className={`page-intro${dark ? " page-intro--dark" : ""}${compact ? " page-intro--compact" : ""}`}>
      <div className="page-intro__rail" aria-hidden="true">
        <span>{label}</span><i />
      </div>
      <div className="page-intro__content">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        <div className="page-intro__lead">{lead}</div>
      </div>
      {aside && <aside className="page-intro__aside">{aside}</aside>}
    </section>
  );
}
