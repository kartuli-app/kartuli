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
        'bg-brand-primary-500',
        'text-brand-neutral-50',
        'border-b-2',
        'border-brand-primary-900',
      )}
    >
      <ResponsiveContainer>
        <div
          className={clsx(
            //
            'flex',
            'justify-between',
            'items-center',
            className,
          )}
        >
          {children}
        </div>
      </ResponsiveContainer>
    </div>
  );
}
