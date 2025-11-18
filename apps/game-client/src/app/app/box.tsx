import clsx from 'clsx';

export function Box({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx('flex', className)}>{children}</div>;
}
