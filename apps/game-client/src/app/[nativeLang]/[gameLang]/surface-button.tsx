import { clsx } from 'clsx';

interface SurfaceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const SurfaceButton = ({ children, className, ...buttonProps }: SurfaceButtonProps) => {
  const cn = clsx(
    'cursor-pointer',
    'w-10 h-10',
    'bg-transparent',
    'text-slate-700',
    'hover:bg-slate-200',
    'active:bg-slate-200',
    'focus:border-1 focus:border-slate-500',
    'flex items-center justify-center',
    'rounded-full',
    className,
  );
  return (
    <button className={cn} {...buttonProps}>
      {children}
    </button>
  );
};
