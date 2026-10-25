// Shared building blocks for the Gundam Forge and DojoNet case studies.
//
// One kit, two skins: every class name is built from a namespace (`gf`, `dn`), so each page's
// stylesheet owns its look while the markup, the status vocabulary and the evidence rules stay
// identical. WithYou and Earl the Kaiju keep their own parts files; this kit is the same pattern
// lifted out once a third and fourth page needed it.

import type { ReactNode } from "react";
import { highlight } from "@/components/earl-the-kaiju/highlight";
import type { EvidenceStatus } from "@/data/investigations";
import { publicPath } from "@/lib/publicPath";

export type KitNamespace = "gf" | "dn";

export type KitStatus =
  | EvidenceStatus
  | "LOCAL BUILD CAPTURE"
  | "FIX DEMONSTRATED"
  | "DOCUMENTED DECISION"
  | "RETROSPECTIVE ILLUSTRATION"
  | "COMPUTED FOR THIS PAGE"
  | "SUPERSEDED"
  | "COMPOSITION";

export type KitMediaItem = {
  width: number;
  height: number;
  avif: string;
  webp: string;
  fallback: string;
};

export type KitFigure<Id extends string = string> = {
  media: Id;
  alt: string;
  caption: string;
  status: KitStatus;
  source: string;
};

export type KitCode = {
  id: string;
  title: string;
  path: string;
  /** Line range in the file at `commit`, used for the GitHub permalink. */
  lines: [number, number];
  language: "ts";
  code: string;
  problem: string;
  decision: string;
  implementation: string;
  tradeoff: string;
  evidence: string;
};

export type KitRepository = {
  name: string;
  url: string;
  commit: string;
  fullCommit: string;
};

const withBase = (srcSet: string) =>
  srcSet
    .split(", ")
    .map((entry) => {
      const [url, descriptor] = entry.split(" ");
      return `${publicPath(url)} ${descriptor}`;
    })
    .join(", ");

export function KitPicture({
  item,
  alt,
  sizes = "100vw",
  className,
  eager = false,
}: {
  item: KitMediaItem;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
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

export const statusTone = (status: KitStatus) => {
  if (status === "KNOWN GAP") return "gap";
  if (["DESIGNED", "PLANNED", "PARTIAL", "IMPLEMENTED, NOT INTEGRATED"].includes(status)) return "partial";
  if (["FIX DEMONSTRATED", "DOCUMENTED DECISION", "RETROSPECTIVE ILLUSTRATION", "COMPUTED FOR THIS PAGE", "COMPOSITION"].includes(status)) return "reference";
  if (status === "SUPERSEDED") return "superseded";
  return "evidence";
};

export function KitStatusTag({ ns, status }: { ns: KitNamespace; status: KitStatus }) {
  return <span className={`${ns}-status ${ns}-status--${statusTone(status)}`}>{status}</span>;
}

export function KitEyebrow({ ns, number, children }: { ns: KitNamespace; number?: string; children: ReactNode }) {
  return (
    <p className={`${ns}-eyebrow`}>
      {number && <span aria-hidden="true">{number}</span>}
      {children}
    </p>
  );
}

export function KitFigureView({
  ns,
  figure,
  item,
  sizes,
  className,
  frame,
  zoom = false,
}: {
  ns: KitNamespace;
  figure: KitFigure;
  item: KitMediaItem;
  sizes?: string;
  className?: string;
  frame?: "phone" | "browser";
  /** Link to the largest derivative so dense screens can be read at full size. */
  zoom?: boolean;
}) {
  return (
    <figure className={`${ns}-figure${frame ? ` ${ns}-figure--${frame}` : ""}${className ? ` ${className}` : ""}`}>
      <div className={`${ns}-figure__media`}>
        {frame === "browser" && <i className={`${ns}-browser-bar`} aria-hidden="true"><b /><b /><b /></i>}
        <KitPicture item={item} alt={figure.alt} sizes={sizes} />
      </div>
      <figcaption>
        <span className={`${ns}-figure__meta`}>
          <KitStatusTag ns={ns} status={figure.status} />
          <small>{figure.source}</small>
          {zoom && (
            <a className={`${ns}-figure__zoom`} href={publicPath(item.fallback)} target="_blank" rel="noreferrer">
              Full size<span className="sr-only">: {figure.caption}</span> <span aria-hidden="true">↗</span>
            </a>
          )}
        </span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}

const pdite: [keyof Pick<KitCode, "problem" | "decision" | "implementation" | "tradeoff" | "evidence">, string][] = [
  ["problem", "Problem"],
  ["decision", "Decision"],
  ["implementation", "Implementation"],
  ["tradeoff", "Tradeoff"],
  ["evidence", "Evidence"],
];

export const permalink = (repo: KitRepository, item: KitCode) =>
  `${repo.url}/blob/${repo.fullCommit}/${item.path}#L${item.lines[0]}-L${item.lines[1]}`;

/** A code excerpt from a public repository, linked to the exact lines at the cited commit. */
export function KitCodeCard({ ns, item, index, repo }: { ns: KitNamespace; item: KitCode; index: number; repo: KitRepository }) {
  const tokens = highlight(item.code, item.language);
  return (
    <article className={`${ns}-code-card`} id={`code-${item.id}`} aria-labelledby={`code-${item.id}-title`}>
      <header>
        <span className={`${ns}-code-card__index`}>{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h4 id={`code-${item.id}-title`}>{item.title}</h4>
          <p className={`${ns}-code-card__problem`}>{item.problem}</p>
        </div>
      </header>
      <dl className={`${ns}-code-card__source`}>
        <div><dt>Repository</dt><dd>{repo.name} (public)</dd></div>
        <div><dt>File</dt><dd><code>{item.path}</code></dd></div>
        <div><dt>Lines</dt><dd><code>{item.lines[0]}–{item.lines[1]} @ {repo.commit}</code></dd></div>
      </dl>
      <pre className={`${ns}-code`} tabIndex={0} aria-label={`Code excerpt from ${item.path}`}>
        <code>
          {tokens.map((token, i) =>
            token.kind === "plain" ? token.text : <span key={i} className={`tok-${token.kind}`}>{token.text}</span>,
          )}
        </code>
      </pre>
      <p className={`${ns}-code-card__note`}>
        Trimmed excerpt (… marks omitted lines).{" "}
        <a href={permalink(repo, item)} target="_blank" rel="noreferrer">
          Read it on GitHub<span className="sr-only">: {item.path}, lines {item.lines[0]} to {item.lines[1]}</span> <span aria-hidden="true">↗</span>
        </a>
      </p>
      <details className={`${ns}-deep`}>
        <summary>
          <span>Problem → Decision → Implementation → Tradeoff → Evidence</span>
          <i aria-hidden="true">+</i>
        </summary>
        <dl className={`${ns}-pdite`}>
          {pdite.map(([key, label]) => (
            <div key={key}><dt>{label}</dt><dd>{item[key]}</dd></div>
          ))}
        </dl>
      </details>
    </article>
  );
}
