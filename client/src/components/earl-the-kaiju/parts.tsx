import type { ReactNode } from "react";
import {
  logos,
  media,
  type CodeHighlight,
  type Figure,
  type FlagshipStatus,
  type LogoId,
  type MediaId,
} from "@/data/earlTheKaiju";
import { publicPath } from "@/lib/publicPath";
import { highlight } from "./highlight";

const withBase = (srcSet: string) =>
  srcSet
    .split(", ")
    .map((entry) => {
      const [url, descriptor] = entry.split(" ");
      return `${publicPath(url)} ${descriptor}`;
    })
    .join(", ");

export function Picture({
  id,
  alt,
  sizes = "100vw",
  className,
  eager = false,
}: {
  id: MediaId;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  const item = media[id];
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

export function Logo({ id, alt, className }: { id: LogoId; alt: string; className?: string }) {
  const logo = logos[id];
  return (
    <img
      className={className}
      src={publicPath(logo.src)}
      alt={alt}
      width={logo.width ?? undefined}
      height={logo.height ?? undefined}
      decoding="async"
    />
  );
}

const toneFor = (status: FlagshipStatus) => {
  if (status === "KNOWN GAP") return "gap";
  if (["DESIGNED", "PLANNED", "PROPOSED", "CONCEPT"].includes(status)) return "planned";
  if (status === "SOURCE REFERENCE" || status === "RETROSPECTIVE ILLUSTRATION") return "reference";
  if (status === "BUILT, NOT DEPLOYED") return "pending";
  return "evidence";
};

export function Status({ status }: { status: FlagshipStatus }) {
  return <span className={`etk-status etk-status--${toneFor(status)}`}>{status}</span>;
}

export function EvidenceFigure({
  figure,
  sizes,
  className,
  frame,
  zoom = false,
}: {
  figure: Figure;
  sizes?: string;
  className?: string;
  frame?: "browser" | "phone" | "phone-landscape";
  /** Link to the largest derivative so dense proofs and guideline pages can be read. */
  zoom?: boolean;
}) {
  const image = <Picture id={figure.media} alt={figure.alt} sizes={sizes} />;
  return (
    <figure className={`etk-figure${frame ? ` etk-figure--${frame}` : ""}${className ? ` ${className}` : ""}`}>
      <div className="etk-figure__media">
        {frame === "browser" && <i className="etk-browser-bar" aria-hidden="true"><b /><b /><b /></i>}
        {image}
      </div>
      <figcaption>
        <span className="etk-figure__meta">
          <Status status={figure.status} />
          <small>{figure.source}</small>
          {zoom && (
            <a className="etk-figure__zoom" href={publicPath(media[figure.media].fallback)} target="_blank" rel="noreferrer">
              Full size<span className="sr-only">: {figure.caption}</span> <span aria-hidden="true">↗</span>
            </a>
          )}
        </span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}

export function ChapterLabel({ number, children }: { number?: string; children: ReactNode }) {
  return (
    <p className="etk-eyebrow">
      {number && <span aria-hidden="true">{number}</span>}
      {children}
    </p>
  );
}

export function CodeBlock({ item }: { item: CodeHighlight }) {
  const tokens = highlight(item.code, item.language);
  return (
    <pre className="etk-code" tabIndex={0} aria-label={`Code excerpt from ${item.path}`}>
      <code>
        {tokens.map((token, index) =>
          token.kind === "plain" ? (
            token.text
          ) : (
            <span key={index} className={`tok-${token.kind}`}>{token.text}</span>
          ),
        )}
      </code>
    </pre>
  );
}

const pdite: [keyof Pick<CodeHighlight, "problem" | "decision" | "implementation" | "tradeoff" | "evidence">, string][] = [
  ["problem", "Problem"],
  ["decision", "Decision"],
  ["implementation", "Implementation"],
  ["tradeoff", "Tradeoff"],
  ["evidence", "Evidence"],
];

export function CodeHighlightCard({ item, index }: { item: CodeHighlight; index: number }) {
  return (
    <article className="etk-code-card" id={`code-${item.id}`} aria-labelledby={`code-${item.id}-title`}>
      <header>
        <span className="etk-code-card__index">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h4 id={`code-${item.id}-title`}>{item.title}</h4>
          <p className="etk-code-card__problem">{item.problem}</p>
        </div>
      </header>
      <dl className="etk-code-card__source">
        <div><dt>Repository</dt><dd>{item.repo}</dd></div>
        <div><dt>File</dt><dd><code>{item.path}</code></dd></div>
        <div><dt>Commit</dt><dd><code>{item.commit}</code></dd></div>
      </dl>
      <CodeBlock item={item} />
      <p className="etk-code-card__note">
        {item.href ? (
          <a href={item.href} target="_blank" rel="noreferrer">View the full file on GitHub <span aria-hidden="true">↗</span></a>
        ) : (
          "Private repository: a short reviewed excerpt, lightly trimmed (… marks omitted lines)."
        )}
      </p>
      <details className="etk-deep">
        <summary>
          <span>Problem → Decision → Implementation → Tradeoff → Evidence</span>
          <i aria-hidden="true">+</i>
        </summary>
        <dl className="etk-pdite">
          {pdite.map(([key, label]) => (
            <div key={key}><dt>{label}</dt><dd>{item[key]}</dd></div>
          ))}
        </dl>
      </details>
    </article>
  );
}
