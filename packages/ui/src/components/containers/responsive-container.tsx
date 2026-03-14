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
        'max-w-sm',
        'sm:max-w-3xl',
        'lg:max-w-5xl',
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
