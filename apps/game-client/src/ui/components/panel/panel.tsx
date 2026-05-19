import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className }: Readonly<PanelProps>) {
  return (
    <div
      className={cn(
        'w-full',
        'min-w-0',
        'flex',
        'flex-col',
        'overflow-hidden',
        'rounded-p-radius-1',
        'border-(length:--s-width-panel-border)',
        'border-s-color-panel-border',
        'bg-s-color-panel-bg',
        'shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
