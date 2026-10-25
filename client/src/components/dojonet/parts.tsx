// DojoNet — page-specific parts. Shared figure, status and code blocks come from case-study-kit.

import { KitFigureView, KitPicture, type KitFigure } from "@/components/case-study-kit/kit";
import { dnMedia, type DnFigure, type DnMediaId } from "@/data/dojonet";

/** The app header's wordmark: "DojoNet" in Bebas Neue, uppercase, tracking-wide (App.jsx). */
export function DnWordmark({ className, decorative = false }: { className?: string; decorative?: boolean }) {
  return (
    <span
      className={`dn-wordmark${className ? ` ${className}` : ""}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "DojoNet"}
      aria-hidden={decorative ? true : undefined}
    >
      DojoNet
    </span>
  );
}

export function DnFigureView(props: { figure: DnFigure; sizes?: string; className?: string; frame?: "phone" | "browser"; zoom?: boolean }) {
  return <KitFigureView ns="dn" item={dnMedia[props.figure.media]} {...props} figure={props.figure as KitFigure} />;
}

export function DnPicture({ id, alt, sizes, eager, className }: { id: DnMediaId; alt: string; sizes?: string; eager?: boolean; className?: string }) {
  return <KitPicture item={dnMedia[id]} alt={alt} sizes={sizes} eager={eager} className={className} />;
}
