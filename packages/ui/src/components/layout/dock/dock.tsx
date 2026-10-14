import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';

export interface DockProps {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function Dock({ ariaLabel, children, className }: Readonly<DockProps>) {
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
