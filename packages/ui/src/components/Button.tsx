import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button className={clsx('bg-primary-500 text-white px-4 py-2', className)} {...props}>
      {children}
    </button>
  );
}
