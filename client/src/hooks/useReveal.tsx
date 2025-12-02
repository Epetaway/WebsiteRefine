import { useEffect } from 'react';

/**
 * Adds intersection-based reveal animations.
 * Elements marked with `[data-reveal]` get 'reveal-init' initially then 'reveal-visible' when in view.
 */
export function useReveal(options: Partial<IntersectionObserverInit> = {}) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;

    targets.forEach(el => {
      el.classList.add('reveal-init');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('reveal-visible');
            el.classList.remove('reveal-init');
            observer.unobserve(el); // one-time reveal
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
        ...options
      }
    );

    targets.forEach(t => observer.observe(t));

    return () => observer.disconnect();
  }, [options.root, options.rootMargin, options.threshold]);
}
