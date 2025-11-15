import clsx from 'clsx';

export function Box({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx('flex items-center justify-center gap-2', className)}>{children}</div>
  );
}
