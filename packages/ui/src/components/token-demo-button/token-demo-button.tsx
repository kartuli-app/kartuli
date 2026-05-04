import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils/cn';

type TokenDemoButtonProps = ComponentPropsWithoutRef<'button'>;

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
