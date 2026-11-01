import { useEffect } from "react";

/**
 * Site-wide scroll choreography.
 *
 * Text blocks below the fold rise in as they enter the viewport, and
 * `.mark` phrases / heading `<em>` accents draw their highlight once visible.
 *
 * Progressive enhancement: nothing is hidden until this hook confirms motion
 * is allowed. Without JavaScript, without IntersectionObserver, or with
 * `prefers-reduced-motion: reduce`, every block stays visible and every
 * highlight renders already drawn (see styles/motion.css).
 *
 * Blocks already on screen when a page mounts are never hidden, so the first
 * viewport does not flash and LCP is unaffected. Elements inside a framer-motion
 * <Reveal> (data-motion-owned) keep that animation and are skipped here.
 */
const BLOCKS = [
  "h2", "h3", "p", "blockquote", "li", "dl", "figure",
  ".signal-label", ".eyebrow", ".button", ".button-row", ".case-link",
].join(",");

const MARKS = ".mark, h1 em, h2 em";

/** Navigation and horizontally scrolling strips stay put: their items can sit
 *  off to the side of the viewport and should never be hidden. */
function isExempt(el: HTMLElement, root: HTMLElement) {
  if (el.closest("[data-motion-owned], [data-motion='off'], form, nav, [role='tablist']")) return true;
  for (let node = el.parentElement; node && node !== root; node = node.parentElement) {
    const { overflowX } = getComputedStyle(node);
    if (overflowX === "auto" || overflowX === "scroll") return true;
  }
  return false;
}

export function useScrollChoreography(routeKey: string) {
  useEffect(() => {
    const root = document.getElementById("main-content");
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || !("IntersectionObserver" in window) || reduce.matches) {
      html.classList.remove("motion-ready");
      return;
    }
    html.classList.add("motion-ready");

    const seen = new WeakSet<Element>();
    let stagger = 0;
    let staggerReset = 0;

    const nextDelay = () => {
      window.clearTimeout(staggerReset);
      staggerReset = window.setTimeout(() => { stagger = 0; }, 120);
      return Math.min(stagger++ * 70, 280);
    };

    const blockObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.style.setProperty("--reveal-delay", `${nextDelay()}ms`);
        el.dataset.reveal = "shown";
        blockObserver.unobserve(el);
        // Hand the element back to its own styles so hover and press
        // transitions are not slowed by the reveal timing.
        window.setTimeout(() => {
          el.removeAttribute("data-reveal");
          el.style.removeProperty("--reveal-delay");
        }, 1100);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

    const markObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-drawn");
        markObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -18% 0px", threshold: 1 });

    const scan = () => {
      const fold = window.innerHeight * 0.92;

      root.querySelectorAll<HTMLElement>(BLOCKS).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const parent = el.parentElement?.closest(BLOCKS);
        if (parent && root.contains(parent)) return; // animate the outermost block only
        if (el.getBoundingClientRect().top < fold) return; // already on screen
        if (isExempt(el, root)) return;
        el.dataset.reveal = "pending";
        blockObserver.observe(el);
      });

      root.querySelectorAll<HTMLElement>(MARKS).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        el.classList.add("mark-ready");
        markObserver.observe(el);
      });
    };

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    };
    scan();
    const mutations = new MutationObserver(schedule);
    mutations.observe(root, { childList: true, subtree: true });

    // Print or reduced-motion switched on mid-visit: show everything at once.
    const revealAll = () => {
      root.querySelectorAll<HTMLElement>("[data-reveal='pending']").forEach((el) => { el.dataset.reveal = "shown"; });
      root.querySelectorAll(".mark-ready").forEach((el) => el.classList.add("is-drawn"));
    };
    const onMotionChange = () => { if (reduce.matches) { revealAll(); html.classList.remove("motion-ready"); } };
    window.addEventListener("beforeprint", revealAll);
    reduce.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(staggerReset);
      mutations.disconnect();
      blockObserver.disconnect();
      markObserver.disconnect();
      window.removeEventListener("beforeprint", revealAll);
      reduce.removeEventListener("change", onMotionChange);
    };
  }, [routeKey]);
}

/** iOS Safari only applies :active press styles when a touch listener exists. */
export function useTouchPressStates() {
  useEffect(() => {
    const noop = () => undefined;
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);
}
