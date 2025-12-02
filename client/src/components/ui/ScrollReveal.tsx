import React, { useRef, useEffect } from 'react';
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

const animationMap: Record<string, string> = {
  fade: 'opacity-0 translate-y-2',
  'slide-up': 'opacity-0 translate-y-6',
  scale: 'opacity-0 scale-[0.96]',
  'slide-left': 'opacity-0 -translate-x-6',
  'slide-right': 'opacity-0 translate-x-6'
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  as = 'div',
  threshold = 0.2,
  once = true,
  animation = 'slide-up',
  delay = 0
}) => {
  const Component = as as any;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.style.transition = 'transform 0.7s var(--ease-soft), opacity 0.7s var(--ease-soft)';
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
  }, [threshold, once, delay]);

  return (
    <Component
      ref={ref}
      className={cn('will-change-transform', animationMap[animation], className, 'transition-all')}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
