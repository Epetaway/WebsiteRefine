import type { ReactNode } from "react";

type Props = {
  label: string;
  railLabel?: string;
  title: ReactNode;
  lead: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
};

export function PageIntro({ label, railLabel = label, title, lead, aside, dark = false }: Props) {
  return (
    <section className={`page-intro${dark ? " page-intro--dark" : ""}`}>
      <div className="page-intro__rail" aria-hidden="true">
        <span>{railLabel}</span><i />
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
