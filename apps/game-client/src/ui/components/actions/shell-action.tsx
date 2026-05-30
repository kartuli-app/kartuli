'use client';

import { cn } from '@kartuli/ui/utils/cn';
import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ShellActionVariant = 'ghost' | 'selected' | 'secondary' | 'primary';
export type ShellActionSize = 'icon' | 'pill' | 'cta';

interface ShellActionOwnProps {
  children: ReactNode;
  className?: string;
  size?: ShellActionSize;
  variant?: ShellActionVariant;
}

export interface ShellActionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    ShellActionOwnProps {}

interface ShellActionLinkProps extends ShellActionOwnProps {
  'aria-label'?: string;
  href: string;
}

const SHELL_ACTION_BASE_CLASS_NAME = cn(
  'inline-flex',
  'items-center',
  'justify-center',
  'shrink-0',
  'group',
  'cursor-pointer',
  'rounded-p-radius-full',
  'focus-visible:ring-(length:--s-width-focus-ring)',
  'outline-none',
  'active:scale-95',
);

const SHELL_ACTION_SIZE_CLASS_NAMES = {
  icon: 'size-11',
  pill: 'h-11 px-2',
  cta: 'h-16 w-full gap-4 p-2 md:h-20',
} as const satisfies Record<ShellActionSize, string>;

const SHELL_ACTION_VARIANT_CLASS_NAMES = {
  ghost: cn(
    'bg-s-color-shell-action-ghost-bg',
    'text-s-color-shell-action-ghost-content',
    'focus-visible:ring-s-color-shell-action-ghost-ring',
    'hover:bg-s-color-shell-action-ghost-hover-bg',
    'hover:text-s-color-shell-action-ghost-hover-content',
    'active:bg-s-color-shell-action-ghost-hover-bg',
    'active:text-s-color-shell-action-ghost-hover-content',
  ),
  selected: cn(
    'bg-s-color-shell-action-selected-bg',
    'text-s-color-shell-action-selected-content',
    'focus-visible:ring-s-color-shell-action-selected-ring',
  ),
  secondary: cn(
    'border-2',
    'border-s-color-shell-action-secondary-border',
    'bg-s-color-shell-action-secondary-bg',
    'text-s-color-shell-action-secondary-content',
    'focus-visible:ring-s-color-shell-action-secondary-ring',
    'hover:border-s-color-shell-action-secondary-hover-border',
    'hover:bg-s-color-shell-action-secondary-hover-bg',
    'hover:text-s-color-shell-action-secondary-hover-content',
    'active:border-s-color-shell-action-secondary-hover-border',
    'active:bg-s-color-shell-action-secondary-hover-bg',
    'active:text-s-color-shell-action-secondary-hover-content',
  ),
  primary: cn(
    'border-2',
    'border-s-color-shell-action-primary-border',
    'bg-s-color-shell-action-primary-bg',
    'text-s-color-shell-action-primary-content',
    'focus-visible:ring-s-color-shell-action-primary-ring',
    'hover:border-s-color-shell-action-primary-hover-border',
    'hover:bg-s-color-shell-action-primary-hover-bg',
    'hover:text-s-color-shell-action-primary-hover-content',
    'active:border-s-color-shell-action-primary-hover-border',
    'active:bg-s-color-shell-action-primary-hover-bg',
    'active:text-s-color-shell-action-primary-hover-content',
  ),
} as const satisfies Record<ShellActionVariant, string>;

function getShellActionClassName({
  className,
  size = 'pill',
  variant = 'ghost',
}: Pick<ShellActionOwnProps, 'className' | 'size' | 'variant'>) {
  return cn(
    SHELL_ACTION_BASE_CLASS_NAME,
    SHELL_ACTION_SIZE_CLASS_NAMES[size],
    SHELL_ACTION_VARIANT_CLASS_NAMES[variant],
    className,
  );
}

export function ShellActionButton({
  children,
  className,
  size = 'pill',
  type = 'button',
  variant = 'ghost',
  ...buttonProps
}: Readonly<ShellActionButtonProps>) {
  return (
    <button
      type={type}
      className={cn(
        getShellActionClassName({ className, size, variant }),
        'disabled:cursor-not-allowed disabled:opacity-20',
        'shadow-md',
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export function ShellActionLink({
  'aria-label': ariaLabel,
  children,
  className,
  href,
  size = 'pill',
  variant = 'ghost',
}: Readonly<ShellActionLinkProps>) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={getShellActionClassName({ className, size, variant })}
    >
      {children}
    </Link>
  );
}
