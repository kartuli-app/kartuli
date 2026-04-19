import clsx from 'clsx';
import type { ReactNode } from 'react';

export function AppContent({
  children,
  className,
  id,
}: Readonly<{ children: ReactNode; className?: string; id: string }>) {
  return (
    <main
      id={id}
      tabIndex={-1}
      className={clsx(
        //
        'w-full grow flex flex-col',
        'overflow-y-auto',
        'overflow-x-hidden',
        'scrollbar-gutter-stable',
        'focus:outline-none',
        className,
      )}
    >
      {children}
    </main>
  );
}
