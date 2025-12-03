import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
  once?: boolean;
  animation?: 'fade' | 'slide-up' | 'scale' | 'slide-left' | 'slide-right';
  delay?: number; // ms
}

// Updated animation map with 28px translateY as per spec
const animationMap: Record<string, string> = {
  fade: 'opacity-0 translate-y-7',
  'slide-up': 'opacity-0 translate-y-7',
  scale: 'opacity-0 scale-[0.96]',
  'slide-left': 'opacity-0 -translate-x-7',
  'slide-right': 'opacity-0 translate-x-7'
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  as = 'div',
  threshold = 0.2, // 20% of section in viewport
  once = true,
  animation = 'slide-up',
  delay = 0
}) => {
  const Component = as as any;
  const ref = useRef<HTMLElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      node.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100');
      node.classList.remove('opacity-0');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 0.55s duration with cubic-bezier(0.19, 1, 0.22, 1) easing as per spec
            node.style.transition = 'transform 0.55s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.55s cubic-bezier(0.19, 1, 0.22, 1)';
            node.style.transitionDelay = delay ? `${delay}ms` : '0ms';
            node.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100');
            node.classList.remove('opacity-0');
            if (once) observer.unobserve(node);
          }
        });
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, delay, prefersReducedMotion]);

  // If prefers-reduced-motion, skip animation classes
  const animationClasses = prefersReducedMotion ? '' : animationMap[animation];

  return (
    <Component
      ref={ref}
      className={cn('will-change-transform', animationClasses, className, 'transition-all')}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
