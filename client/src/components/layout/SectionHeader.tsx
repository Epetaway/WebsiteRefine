import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  preLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  className,
  preLabel
}) => {
  return (
    <div className={cn('mb-12 text-center', className)}>
      {preLabel && (
        <p className="text-xs uppercase tracking-[0.22em] text-gray-500 dark:text-slate-400 mb-3">
          {preLabel}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-slate-50">{title}</h2>
      {description && (
        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};
