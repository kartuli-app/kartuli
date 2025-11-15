import clsx from 'clsx';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'size-11',
          'rounded-full',
          'flex',
          'justify-center',
          'items-center',
          'relative',
          'cursor-pointer',
          'focus-ring',
          'disabled:opacity-50',
          'disabled:cursor-not-allowed',
          'bg-slate-200',
          'hover:bg-slate-300',
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
