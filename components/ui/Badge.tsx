import React from 'react';
import { TestCategory } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface BadgeProps {
  category: TestCategory;
  className?: string;
}

export function Badge({ category, className }: BadgeProps) {
  const colors: Record<TestCategory, string> = {
    read: 'bg-read/10 text-read border-read/20',
    listen: 'bg-listen/10 text-listen border-listen/20',
    write: 'bg-write/10 text-write border-write/20',
    speak: 'bg-speak/10 text-speak border-speak/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
        colors[category],
        className
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
