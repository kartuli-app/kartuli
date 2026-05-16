import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

export function Dock({
  children,
  className,
}: Readonly<{ children?: ReactNode; className?: string }>) {
  return (
    <div
      className={cn(
        'flex',
        'p-p-spacing-4',
        'items-center',
        // responsive layout
        'flex-row md:flex-col',
        'gap-p-spacing-2 md:gap-p-spacing-4',
        'justify-center md:justify-start',
        'w-auto xl:w-full',
        className,
      )}
    >
      {children}
    </div>
  );
}
