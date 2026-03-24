import clsx from 'clsx';

export function ModuleCard({
  className,
  children,
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return <div className={clsx('flex flex-col gap-brand-regular', className)}>{children}</div>;
}

export function ModuleCardTitle({
  className,
  title,
}: Readonly<{ className?: string; title: string }>) {
  return <div className={clsx('text-2xl font-semibold', 'text-center', className)}>{title}</div>;
}

export function ModuleCardContent({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode[] | React.ReactNode;
}>) {
  return <div className={clsx('flex flex-col gap-brand-large', className)}>{children}</div>;
}
