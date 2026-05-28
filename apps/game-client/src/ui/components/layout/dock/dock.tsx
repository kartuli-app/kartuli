import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

export function Dock({
  ariaLabel,
  children,
  className,
}: Readonly<{ ariaLabel?: string; children?: ReactNode; className?: string }>) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'flex',
        'p-p-spacing-4',
        'items-center',
        'flex-row md:flex-col',
        'gap-p-spacing-2 md:gap-p-spacing-4',
        'justify-center md:justify-start',
        'w-auto xl:w-full',
        className,
      )}
    >
      {children}
    </nav>
  );
}
