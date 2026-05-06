import { cn } from '@kartuli/ui/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';

interface TokenDemoButtonProps extends ComponentPropsWithoutRef<'button'> {}

export function TokenDemoButton({
  children = 'Token demo',
  className,
  type = 'button',
  ...props
}: Readonly<TokenDemoButtonProps>) {
  return (
    <button
      type={type}
      className={cn('border border-primary text-primary bg-black', className)}
      {...props}
    >
      {children}
    </button>
  );
}
