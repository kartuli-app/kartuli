'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

type ResponsiveContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Centered container with max width and padding. Use for consistent content width across layouts.
 */
export function ResponsiveContainer({ children, className }: Readonly<ResponsiveContainerProps>) {
  return (
    <div
      className={clsx(
        //
        'flex',
        'w-full',
        //
        'mx-auto',
        'max-w-md',
        //
        'p-brand-large',
        'gap-brand-large',
        //
        className,
      )}
    >
      {children}
    </div>
  );
}
