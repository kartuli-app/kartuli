import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
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
        'w-full grow',
      )}
    >
      <ResponsiveContainer className={clsx('flex-col', className)}>{children}</ResponsiveContainer>
    </div>
  );
}
