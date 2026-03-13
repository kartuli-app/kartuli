import clsx from 'clsx';
import type { ReactNode } from 'react';

export function AppScreen({
  children,
  testId,
}: {
  readonly children: ReactNode;
  readonly testId: string;
}) {
  return (
    <div
      data-testid={testId}
      className={clsx(
        //
        'flex grow flex-col',
      )}
    >
      {children}
    </div>
  );
}
