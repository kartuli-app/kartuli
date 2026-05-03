import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils/cn';

type TokenDemoButtonProps = ComponentPropsWithoutRef<'button'>;

export function TokenDemoButton({
  children = 'Token demo',
  className,
  type = 'button',
  ...props
}: TokenDemoButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center gap-spacing-token-test-small rounded border border-black',
        'bg-color-token-test-primary px-spacing-token-test-big py-spacing-token-test-small',
        'text-color-token-test-neutral',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
