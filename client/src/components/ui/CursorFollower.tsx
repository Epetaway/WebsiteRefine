import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) loop();
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      // interpolate for a smooth trailing ring
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('a, button, [role="button"], .btn-primary, .btn-secondary')) {
        ring.classList.add('cursor-ring-active');
      } else {
        ring.classList.remove('cursor-ring-active');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver as any, { passive: true } as any);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver as any);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/30 dark:border-white/20 mix-blend-difference"
        style={{ transition: 'transform 60ms linear, width 150ms ease, height 150ms ease, border-color 150ms ease' }}
      />
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{ transition: 'transform 40ms linear' }}
      />
    </div>
  );
}
