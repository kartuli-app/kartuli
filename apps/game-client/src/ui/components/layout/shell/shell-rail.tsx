import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

export interface ShellRailProps {
  placement: 'start' | 'end';
  children?: ReactNode;
}

export function ShellRail({ placement, children }: Readonly<ShellRailProps>) {
  if (!children) {
    return null;
  }
  return (
    <div
      className={cn(
        'flex',
        'bg-s-color-shell-bg',
        'border-s-color-shell-border-mobile',
        'xl:border-s-color-shell-border',
        placement === 'start' && [
          'fixed',
          'left-0',
          'bottom-0',
          'right-0',
          'z-20',
          'h-height-dock-mobile md:h-full',
          'w-full md:w-width-rail-compact xl:w-width-rail-expanded',
          'justify-center md:justify-start',
          'border-t-(length:--s-width-shell-border) md:border-t-0',
          'border-r-0 md:border-r-(length:--s-width-shell-border)',
        ],
        placement === 'end' && [
          'top-0',
          'bottom-0',
          ' overflow-hidden',
          'h-full',
          'hidden 2xl:flex 2xl:fixed',
          'w-width-rail-expanded',
          'right-0',
          'border-l-0 2xl:border-l-(length:--s-width-shell-border)',
        ],
      )}
    >
      {children}
    </div>
  );
}
