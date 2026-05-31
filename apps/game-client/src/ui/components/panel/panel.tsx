import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className }: Readonly<PanelProps>) {
  return (
    <div
      className={cn(
        'w-full',
        'min-w-0',
        'flex',
        'flex-col',
        'overflow-hidden',
        'rounded-p-radius-2',
        'bg-s-color-panel-bg',
        'shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
