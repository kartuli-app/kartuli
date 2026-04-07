import clsx from 'clsx';
import type { ReactNode } from 'react';

export function AppScreen({ children }: { readonly children: ReactNode }) {
  return (
    <div
      className={clsx(
        //
        'flex grow flex-col',
        // 'overflow-y-auto',
        'overflow-x-hidden',
        // 'scrollbar-gutter-stable',
        'bg-brand-app-bg',
      )}
    >
      {children}
    </div>
  );
}
