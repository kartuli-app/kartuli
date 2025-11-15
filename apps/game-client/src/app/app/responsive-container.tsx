import clsx from 'clsx';
import { Container } from './container';

export function ResponsiveContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <Container className={clsx('max-w-screen-md mx-auto', className)}>{children}</Container>;
}
