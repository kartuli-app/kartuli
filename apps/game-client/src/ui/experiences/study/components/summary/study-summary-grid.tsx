'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

const MAX_ITEMS_COUNT = 42;

const SUMMARY_GRID_BUCKETS = [
  { maxItems: 1, className: 'gap-4 grid-cols-1 grid-rows-1' },
  { maxItems: 2, className: 'gap-4 grid-cols-1 grid-rows-2' },
  { maxItems: 4, className: 'gap-4 grid-cols-2 grid-rows-2' },
  { maxItems: 6, className: 'gap-4 grid-cols-2 grid-rows-3' },
  { maxItems: 9, className: 'gap-4 grid-cols-3 grid-rows-3' },
  { maxItems: 12, className: 'gap-4 grid-cols-3 grid-rows-4' },
  { maxItems: 15, className: 'gap-2 grid-cols-3 grid-rows-5' },
  { maxItems: 16, className: 'gap-2 grid-cols-4 grid-rows-4' },
  { maxItems: 20, className: 'gap-2 grid-cols-4 grid-rows-5' },
  { maxItems: 24, className: 'gap-2 grid-cols-4 grid-rows-6' },
  { maxItems: 25, className: 'gap-2 grid-cols-5 grid-rows-5' },
  { maxItems: 30, className: 'gap-2 grid-cols-5 grid-rows-6' },
  { maxItems: 35, className: 'gap-1 grid-cols-5 grid-rows-7' },
  { maxItems: 36, className: 'gap-2 grid-cols-6 grid-rows-6' },
  { maxItems: 40, className: 'gap-1 grid-cols-6 grid-rows-7' },
  { maxItems: MAX_ITEMS_COUNT, className: 'gap-1 grid-cols-6 grid-rows-7' },
] as const;

function getSummaryGridClassName(itemsCount: number) {
  const bounded = Math.max(0, Math.min(itemsCount, MAX_ITEMS_COUNT));
  return (
    SUMMARY_GRID_BUCKETS.find((bucket) => bounded <= bucket.maxItems)?.className ??
    SUMMARY_GRID_BUCKETS.at(-1)?.className ??
    ''
  );
}

export function StudySummaryGrid({
  children,
  itemsCount,
}: Readonly<{
  children: ReactNode;
  itemsCount: number;
}>) {
  return (
    <div
      className={cn(
        'p-p-spacing-2 grid h-full w-full min-h-0 min-w-0 place-content-center place-self-center gap-1 overflow-hidden',
        getSummaryGridClassName(itemsCount),
      )}
    >
      {children}
    </div>
  );
}
