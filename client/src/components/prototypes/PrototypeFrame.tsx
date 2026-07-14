import type { ReactNode } from "react";

type FrameProps = {
  label: string;
  title: string;
  argument: string;
  step: number;
  totalSteps: number;
  announcement: string;
  onReset: () => void;
  accent: string;
  children: ReactNode;
};

export function PrototypeFrame({
  label,
  title,
  argument,
  step,
  totalSteps,
  announcement,
  onReset,
  accent,
  children,
}: FrameProps) {
  return (
    <section className="prototype-frame" style={{ "--prototype-accent": accent } as React.CSSProperties} aria-labelledby={`${label}-prototype-title`}>
      <PrototypeHeader label={label} title={title} argument={argument} />
      <PrototypeStepIndicator current={step} total={totalSteps} />
      <div className="prototype-frame__body">{children}</div>
      <div className="prototype-frame__footer">
        <span>Fictional data · Local state only · No external calls</span>
        <PrototypeResetButton onReset={onReset} />
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
    </section>
  );
}

export function PrototypeHeader({ label, title, argument }: { label: string; title: string; argument: string }) {
  return (
    <header className="prototype-header">
      <div><span className="eyebrow eyebrow--light">Interactive evidence / {label}</span><h3 id={`${label}-prototype-title`}>{title}</h3></div>
      <p>{argument}</p>
    </header>
  );
}

export function PrototypeStage({ title, children }: { title: string; children: ReactNode }) {
  return <div className="prototype-stage"><p className="prototype-stage__label">Current stage</p><h4>{title}</h4>{children}</div>;
}

export function PrototypeControls({ children }: { children: ReactNode }) {
  return <div className="prototype-controls">{children}</div>;
}

export function PrototypeStepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="prototype-steps" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className={index < current ? "is-active" : ""}><i />{String(index + 1).padStart(2, "0")}</span>
      ))}
    </div>
  );
}

export function PrototypeAnnotation({ label, children }: { label: string; children: ReactNode }) {
  return <aside className="prototype-annotation"><span>{label}</span><p>{children}</p></aside>;
}

export function PrototypeEvidencePanel({ children }: { children: ReactNode }) {
  return <aside className="prototype-evidence"><span>What this demonstrates</span>{children}</aside>;
}

export function PrototypeResetButton({ onReset }: { onReset: () => void }) {
  return <button type="button" className="prototype-reset" onClick={onReset}>Reset prototype</button>;
}

export function PrototypeFallback() {
  return <p className="prototype-fallback">The complete argument is described in the adjacent study if interactive controls are unavailable.</p>;
}
