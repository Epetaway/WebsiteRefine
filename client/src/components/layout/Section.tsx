import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** base animation style */
  animate?: boolean;
  /** choose animation variant */
  animationStyle?: 'fade' | 'slide-up' | 'scale' | 'none';
  /** optional stagger index for sequencing */
  stagger?: number;
  /** background semantic variant */
  bgVariant?: 'default' | 'subtle' | 'accent' | 'inverse';
  /** optional aria label */
  ariaLabel?: string;
}

const animationClassMap: Record<string, string> = {
  fade: 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  scale: 'animate-scale-in',
  none: ''
};

const bgVariantMap: Record<string, string> = {
  default: 'bg-background',
  subtle: 'bg-gray-50 dark:bg-gray-900',
  accent: 'bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900',
  inverse: 'bg-foreground text-background'
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  animate = true,
  animationStyle = 'fade',
  stagger = 0,
  bgVariant = 'default',
  ariaLabel
}) => {
  const anim = animate ? animationClassMap[animationStyle] : '';
  const staggerClass = animate && stagger > 0 ? `stagger-${stagger}` : '';
  const bgClasses = bgVariantMap[bgVariant] || bgVariantMap.default;
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      data-reveal={animate ? true : undefined}
      className={cn('py-16 md:py-24', bgClasses, anim, staggerClass, 'ui-transition-soft', className)}
    >
      <div className="max-w-[1120px] mx-auto px-5">
        {children}
      </div>
    </section>
  );
};
