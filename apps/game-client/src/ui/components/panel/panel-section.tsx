import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

interface PanelSectionProps {
  children: ReactNode;
  className?: string;
}

export function PanelSection({ children, className }: Readonly<PanelSectionProps>) {
  return (
    <div className={cn('w-full', 'px-p-spacing-4', 'py-p-spacing-2', className)}>{children}</div>
  );
}
