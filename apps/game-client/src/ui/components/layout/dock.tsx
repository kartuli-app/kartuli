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
        'gap-1 md:gap-2 xl:gap-4',
        'items-center',
        'flex-row md:flex-col',
        'justify-center md:justify-start',
        'w-auto xl:w-full',
        'p-4 xl:p-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
