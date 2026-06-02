'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

export function StudyNoteBadge({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1',
        'bg-s-color-shell-status-bg text-s-color-shell-status-content-primary',
        'text-xs font-bold uppercase',
      )}
    >
      {children}
    </span>
  );
}
