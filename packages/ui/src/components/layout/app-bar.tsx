import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import clsx from 'clsx';
import type { ReactNode } from 'react';

interface AppBarProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  isSticky?: boolean;
}
export function AppBar({ className, children, isSticky = false }: Readonly<AppBarProps>) {
  return (
    <div
      className={clsx(
        //
        isSticky ? 'sticky top-0 z-10' : '',
        //
        'w-full',
        //
        'bg-brand-app-bg',
        'md:ml-10',
      )}
    >
      <ResponsiveContainer
        className={clsx(
          //
          'justify-between',
          'items-center',
          className,
        )}
      >
        {children}
      </ResponsiveContainer>
    </div>
  );
}
