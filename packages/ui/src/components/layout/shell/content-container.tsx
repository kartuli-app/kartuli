import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';

export interface ContentContainerProps {
  children: ReactNode;
}

export function ContentContainer({ children }: Readonly<ContentContainerProps>) {
  return (
    <div
      className={cn(
        'flex-1',
        'flex flex-col justify-center',
        'w-full',
        'h-full',
        'max-w-5xl',
        'mx-auto',
        'p-p-spacing-2 sm:p-p-spacing-4',
      )}
    >
      {children}
    </div>
  );
}
