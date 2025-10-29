import { clsx } from 'clsx';
import Link from 'next/link';

export function DockButton({
  className,
  href,
  isActive,
  children,
}: {
  className?: string;
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  const cn = clsx(
    'cursor-pointer',
    'h-14 w-14 space-y-1',
    'flex flex-col justify-center items-center',
    'text-xs',
    'hover:bg-slate-200',
    'hover:underline',
    {
      'text-ds-primary-700': isActive,
      'text-slate-700': !isActive,
    },
    className,
  );
  return (
    <Link href={href} key={href} className={cn}>
      {children}
    </Link>
  );
}
