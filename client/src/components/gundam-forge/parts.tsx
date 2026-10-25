// Gundam Forge — page-specific parts. Shared figure, status and code blocks come from
// case-study-kit; these two are drawn from the app's own markup and tokens.

import type { CSSProperties } from "react";
import { KitFigureView, KitPicture, type KitFigure } from "@/components/case-study-kit/kit";
import { gfMedia, type GfFigure, type GfMediaId } from "@/data/gundamForge";

/**
 * The app header's lockup, redrawn: a "GF" badge (JetBrains Mono on cobalt-500/25 with a
 * cobalt-400/70 border and glow) beside "Gundam Forge" in Orbitron, uppercase, +0.06em —
 * the same classes AppShell.tsx uses, translated to this page's CSS.
 */
export function GfLockup({ size = 18, decorative = false, className }: { size?: number; decorative?: boolean; className?: string }) {
  return (
    <span
      className={`gf-lockup${className ? ` ${className}` : ""}`}
      style={{ "--lockup": `${size}px` } as CSSProperties}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Gundam Forge"}
      aria-hidden={decorative ? true : undefined}
    >
      <span className="gf-lockup__badge">GF</span>
      <span className="gf-lockup__word">Gundam Forge</span>
    </span>
  );
}

export type GfCardSpec = { name: string; type: string; color: "Blue" | "Red" | "Green" | "White" | "Purple" | "Colorless"; cost: number; level?: number; ap?: number; hp?: number; qty?: number };

/**
 * A card tile drawn in HTML: the 5:7 frame, cost, level, name, type and AP/HP, coloured by the
 * card's --color-* token. It's the same layout as the text proxies in the captures — a fictional
 * card, never official art.
 */
export function GfCardFace({ card, className }: { card: GfCardSpec; className?: string }) {
  return (
    <span className={`gf-card gf-card--${card.color.toLowerCase()}${className ? ` ${className}` : ""}`} aria-hidden="true">
      <span className="gf-card__cost">{card.cost}</span>
      {card.qty ? <span className="gf-card__qty">×{card.qty}</span> : null}
      {card.level != null && <span className="gf-card__level">LV {card.level}</span>}
      <span className="gf-card__name">{card.name}</span>
      <span className="gf-card__type">{card.type}</span>
      {card.ap != null && <span className="gf-card__stats"><b>AP {card.ap}</b><b>HP {card.hp}</b></span>}
    </span>
  );
}

export function GfFigureView(props: { figure: GfFigure; sizes?: string; className?: string; frame?: "phone" | "browser"; zoom?: boolean }) {
  return <KitFigureView ns="gf" item={gfMedia[props.figure.media]} {...props} figure={props.figure as KitFigure} />;
}

export function GfPicture({ id, alt, sizes, eager, className }: { id: GfMediaId; alt: string; sizes?: string; eager?: boolean; className?: string }) {
  return <KitPicture item={gfMedia[id]} alt={alt} sizes={sizes} eager={eager} className={className} />;
}
