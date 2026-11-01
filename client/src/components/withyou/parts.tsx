import { type CSSProperties, type ReactNode } from "react";
import { highlight } from "@/components/earl-the-kaiju/highlight";
import { WyMark } from "./WyMark";
import {
  wyBrand,
  wyIcons,
  wyIllustrations,
  wyMedia,
  type WyBrandId,
  type WyCode,
  type WyFigure,
  type WyIconId,
  type WyIllustrationId,
  type WyMediaId,
  type WyStatus,
} from "@/data/withyou";
import { publicPath } from "@/lib/publicPath";

export { WyMark };

const withBase = (srcSet: string) =>
  srcSet
    .split(", ")
    .map((entry) => {
      const [url, descriptor] = entry.split(" ");
      return `${publicPath(url)} ${descriptor}`;
    })
    .join(", ");

export function WyPicture({
  id,
  alt,
  sizes = "100vw",
  className,
  eager = false,
}: {
  id: WyMediaId;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  const item = wyMedia[id];
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={withBase(item.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={withBase(item.webp)} sizes={sizes} />
      <img
        src={publicPath(item.fallback)}
        alt={alt}
        width={item.width}
        height={item.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}

/** A brand SVG exactly as it ships in the app repository. */
export function WyBrandFile({ id, alt, className }: { id: WyBrandId; alt: string; className?: string }) {
  const file = wyBrand[id];
  return (
    <img
      className={className}
      src={publicPath(file.src)}
      alt={alt}
      width={file.width ?? undefined}
      height={file.height ?? undefined}
      decoding="async"
      loading="lazy"
    />
  );
}

/** A product icon, tinted with CSS: the SVG is used as a mask so currentColor works as it does in the app. */
export function WyIcon({ id, className }: { id: WyIconId; className?: string }) {
  return (
    <span
      className={`wy-icon${className ? ` ${className}` : ""}`}
      style={{ "--icon": `url("${publicPath(wyIcons[id].src)}")` } as CSSProperties}
      aria-hidden="true"
    />
  );
}

export function WyIllustration({ id, alt }: { id: WyIllustrationId; alt: string }) {
  const file = wyIllustrations[id];
  return <img src={publicPath(file.src)} alt={alt} width={file.width ?? undefined} height={file.height ?? undefined} loading="lazy" decoding="async" />;
}

/**
 * The WithYou mark, drawn from the same geometry as the app's Logo.tsx:
 * two 16×22 ellipses tilted ±10° on a 60×56 grid, with a clip so each loop passes in front once.
 */
/**
 * Mark + wordmark, set the way Logo.tsx sets it: Inter 700, -0.035em tracking, "You" in coral.
 * The wordmark is SVG text so it behaves as the logotype it is (one image named "WithYou"),
 * rather than as running text — coral on cream is 2.54:1, which the logo is allowed and body copy isn't.
 * Its box matches a line-height-1 HTML span: 3.82em wide, baseline at 0.864em (measured in Inter 700).
 */
export function WyLockup({
  size = 40,
  className,
  stacked = false,
  decorative = false,
}: {
  size?: number;
  className?: string;
  stacked?: boolean;
  /** Set where the name is already in the accessible text (e.g. beside the h1). */
  decorative?: boolean;
}) {
  return (
    <span
      className={`wy-lockup${stacked ? " wy-lockup--stacked" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--lockup": `${size}px` } as CSSProperties}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "WithYou"}
      aria-hidden={decorative ? true : undefined}
    >
      <WyMark size={stacked ? size * 1.6 : size * 1.1} />
      <svg className="wy-lockup__word" viewBox="0 0 382 100" aria-hidden="true" focusable="false">
        <text x="0" y="86.4">
          With<tspan>You</tspan>
        </text>
      </svg>
    </span>
  );
}

const toneFor = (status: WyStatus) => {
  if (status === "KNOWN GAP") return "gap";
  if (["DESIGNED", "PLANNED", "PARTIAL", "IMPLEMENTED, NOT INTEGRATED"].includes(status)) return "partial";
  if (["PROTOTYPE REFERENCE", "DESIGN SOURCE", "DOCUMENTED DECISION", "RETROSPECTIVE ILLUSTRATION", "COMPUTED FOR THIS PAGE"].includes(status)) return "reference";
  if (status === "SUPERSEDED" || status === "PLACEHOLDER" || status === "AI-GENERATED PLACEHOLDER") return "superseded";
  return "evidence";
};

export function WyStatusTag({ status }: { status: WyStatus }) {
  return <span className={`wy-status wy-status--${toneFor(status)}`}>{status}</span>;
}

export function WyEyebrow({ number, children }: { number?: string; children: ReactNode }) {
  return (
    <p className="wy-eyebrow">
      {number && <span aria-hidden="true">{number}</span>}
      {children}
    </p>
  );
}

export function WyFigureView({
  figure,
  sizes,
  className,
  frame,
  zoom = false,
}: {
  figure: WyFigure;
  sizes?: string;
  className?: string;
  frame?: "phone" | "browser";
  /** Link to the largest derivative so dense design documents can be read. */
  zoom?: boolean;
}) {
  return (
    <figure className={`wy-figure${frame ? ` wy-figure--${frame}` : ""}${className ? ` ${className}` : ""}`}>
      <div className="wy-figure__media">
        {frame === "browser" && <i className="wy-browser-bar" aria-hidden="true"><b /><b /><b /></i>}
        <WyPicture id={figure.media} alt={figure.alt} sizes={sizes} />
      </div>
      <figcaption>
        <span className="wy-figure__meta">
          <WyStatusTag status={figure.status} />
          <small>{figure.source}</small>
          {zoom && (
            <a className="wy-figure__zoom" href={publicPath(wyMedia[figure.media].fallback)} target="_blank" rel="noreferrer">
              Full size<span className="sr-only">: {figure.caption}</span> <span aria-hidden="true">↗</span>
            </a>
          )}
        </span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}

const pdite: [keyof Pick<WyCode, "problem" | "decision" | "implementation" | "tradeoff" | "evidence">, string][] = [
  ["problem", "Problem"],
  ["decision", "Decision"],
  ["implementation", "Implementation"],
  ["tradeoff", "Tradeoff"],
  ["evidence", "Evidence"],
];

export function WyCodeCard({ item, index, repo }: { item: WyCode; index: number; repo: string }) {
  const tokens = highlight(item.code, item.language);
  return (
    <article className="wy-code-card" id={`code-${item.id}`} aria-labelledby={`code-${item.id}-title`}>
      <header>
        <span className="wy-code-card__index">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h4 id={`code-${item.id}-title`}>{item.title}</h4>
          <p className="wy-code-card__problem">{item.problem}</p>
        </div>
      </header>
      <dl className="wy-code-card__source">
        <div><dt>Repository</dt><dd>{repo} (private)</dd></div>
        <div><dt>File</dt><dd><code>{item.path}</code></dd></div>
        <div><dt>Commit</dt><dd><code>{item.commit}</code></dd></div>
      </dl>
      <pre className="wy-code" tabIndex={0} aria-label={`Code excerpt from ${item.path}`}>
        <code>
          {tokens.map((token, i) =>
            token.kind === "plain" ? token.text : <span key={i} className={`tok-${token.kind}`}>{token.text}</span>,
          )}
        </code>
      </pre>
      <p className="wy-code-card__note">Private repository: a short reviewed excerpt, lightly trimmed (… marks omitted lines).</p>
      <details className="wy-deep">
        <summary>
          <span>Problem → Decision → Implementation → Tradeoff → Evidence</span>
          <i aria-hidden="true">+</i>
        </summary>
        <dl className="wy-pdite">
          {pdite.map(([key, label]) => (
            <div key={key}><dt>{label}</dt><dd>{item[key]}</dd></div>
          ))}
        </dl>
      </details>
    </article>
  );
}
