import clsx from 'clsx';

export function Container({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('flex w-full', className)} {...rest}>
      {children}
    </div>
  );
}
