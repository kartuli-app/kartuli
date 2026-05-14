import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

export function ContentContainer({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div
      className={cn(
        //
        'flex-1',
        'flex flex-col',
        'w-full',
        'max-w-5xl',
        'mx-auto',
        'p-2 sm:p-4',
        // 'bg-red-300',
      )}
    >
      {children}
    </div>
  );
}
