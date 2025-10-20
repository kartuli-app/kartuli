import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ className, children, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={clsx('bg-canvas text-ink px-4 py-2', className)} {...props}>
      {children}
    </button>
  );
}
