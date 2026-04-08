import clsx from 'clsx';
import type { ReactNode } from 'react';

export function AppContent({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div
      className={clsx(
        //
        'w-full grow flex flex-col',
        'overflow-y-auto',
        'overflow-x-hidden',
        'scrollbar-gutter-stable',
        className,
      )}
    >
      {children}
    </div>
  );
}
