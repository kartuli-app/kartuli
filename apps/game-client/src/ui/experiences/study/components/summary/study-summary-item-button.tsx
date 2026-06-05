'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

interface StudySummaryItemButtonProps {
  children: ReactNode;
  className?: string;
  label: string;
  onClick: () => void;
}

export function StudySummaryItemButton({
  children,
  className,
  label,
  onClick,
}: Readonly<StudySummaryItemButtonProps>) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'group flex min-h-0 min-w-0 cursor-pointer touch-pan-y items-center justify-center rounded-p-radius-1 outline-none',
        'focus-visible:ring-(length:--s-width-focus-ring)',
        'focus-visible:ring-s-color-panel-action-ghost-ring',
        'hover:bg-s-color-panel-action-ghost-hover-bg',
        'active:bg-s-color-panel-action-ghost-hover-bg',
        'rounded-p-radius-3',
        'overflow-hidden',
        'h-24',
        'active:scale-95',
        className,
      )}
    >
      {children}
    </button>
  );
}
