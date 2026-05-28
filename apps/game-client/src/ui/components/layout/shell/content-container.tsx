import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

export function ContentContainer({ children }: Readonly<{ children: ReactNode }>) {
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
