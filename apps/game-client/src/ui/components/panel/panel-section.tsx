import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

type PanelSectionProps = {
  children: ReactNode;
  className?: string;
};

export function PanelSection({ children, className }: Readonly<PanelSectionProps>) {
  return <div className={cn('w-full', 'px-4', 'py-2', className)}>{children}</div>;
}
