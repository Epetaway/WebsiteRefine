import type { PropsWithChildren } from "react";

/**
 * Highlights a key phrase. The highlighter stroke draws across the phrase
 * when it scrolls into view (useScrollChoreography); with reduced motion or
 * without JavaScript it renders already drawn. The text itself is never hidden.
 */
export function Mark({ children }: PropsWithChildren) {
  return <span className="mark">{children}</span>;
}
