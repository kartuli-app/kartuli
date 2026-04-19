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
    <header
      className={clsx(
        //
        isSticky && 'sticky top-0 z-30',
        'w-full flex flex-col',
        'bg-brand-app-bg',
        'overflow-hidden shrink-0',
        'scrollbar-gutter-stable',
      )}
    >
      <ResponsiveContainer
        className={clsx(
          //
          'justify-between items-center',
          className,
        )}
      >
        {children}
      </ResponsiveContainer>
    </header>
  );
}
