'use client';

import { cn } from '@kartuli/ui/utils/cn';
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
      className={cn(
        //
        'flex',
        'w-full',
        //
        'mx-auto',
        'max-w-lg',
        'sm:max-w-2xl',
        'lg:max-w-3xl',
        'xl:max-w-4xl',
        //
        'px-ds1-spacing-regular',
        'py-ds1-spacing-large',
        'gap-ds1-spacing-regular',
        //
        //
        className,
      )}
    >
      {children}
    </div>
  );
}
