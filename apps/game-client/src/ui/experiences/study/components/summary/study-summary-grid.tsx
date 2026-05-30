'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

interface StudySummaryGridProps {
  children: ReactNode;
}

export function StudySummaryGrid({ children }: Readonly<StudySummaryGridProps>) {
  return (
    <div
      className={cn(
        //
        'p-p-spacing-2',
        'grid',
        'grid-cols-2',
        'h-full',
        'w-full',
        'min-h-0',
        'min-w-0',
        'items-start',
        'gap-p-spacing-4',
        'overflow-x-hidden',
      )}
    >
      {children}
    </div>
  );
}
