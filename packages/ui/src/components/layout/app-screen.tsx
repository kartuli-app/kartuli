import clsx from 'clsx';
import type { ReactNode } from 'react';

export function AppScreen({ children }: { readonly children: ReactNode }) {
  return (
    <div
      className={clsx(
        //
        'flex grow flex-col',
        'overflow-hidden',
        'bg-brand-app-bg',
      )}
    >
      {children}
    </div>
  );
}
