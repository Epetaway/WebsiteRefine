import { useEffect } from "react";

/**
 * Case studies keep their long-form record inside closed <details>. When a URL hash points at
 * something in there, open the disclosure first so the link lands on visible content.
 * (Chrome does this natively for fragment navigation; Safari and Firefox don't yet.)
 */
export function useOpenHashTarget() {
  useEffect(() => {
    const openTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      let disclosure = target?.closest("details") ?? null;
      let opened = false;
      while (disclosure) {
        if (!disclosure.open) {
          disclosure.open = true;
          opened = true;
        }
        disclosure = disclosure.parentElement?.closest("details") ?? null;
      }
      if (opened) target?.scrollIntoView();
    };
    openTarget();
    window.addEventListener("hashchange", openTarget);
    return () => window.removeEventListener("hashchange", openTarget);
  }, []);
}
