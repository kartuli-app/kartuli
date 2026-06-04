'use client';

import { Tooltip } from '@game-client/ui/components/overlay/tooltip';
import { cn } from '@kartuli/ui/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const basePanelActionButtonClassName = cn(
  'inline-flex',
  'items-center',
  'justify-center',
  'p-2',
  'focus-visible:ring-(length:--s-width-focus-ring)',
  'disabled:opacity-50',
  'outline-none',
  'rounded-p-radius-full',
  'size-11',
  'active:scale-95',
  'cursor-pointer',
  'shadow-md',
);

const panelActionButtonVariantClassName = {
  outline: cn(
    'border-(length:--s-width-panel-action-outline-border) solid',
    'border-s-color-panel-action-outline-border',
    'bg-s-color-panel-action-outline-bg',
    'text-s-color-panel-action-outline-content',
    'focus-visible:ring-s-color-panel-action-outline-ring',
    'hover:bg-s-color-panel-action-outline-hover-bg',
    'hover:border-s-color-panel-action-outline-hover-border',
    'hover:text-s-color-panel-action-outline-hover-content',
    'active:bg-s-color-panel-action-outline-hover-bg',
    'active:border-s-color-panel-action-outline-hover-border',
    'active:text-s-color-panel-action-outline-hover-content',
  ),
  primary: cn(
    'border border-s-color-shell-action-primary-border',
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
} as const;

export type PanelActionButtonVariant = keyof typeof panelActionButtonVariantClassName;

export interface PanelActionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children'> {
  'aria-label': string;
  children: ReactNode;
  tooltipLabel: ReactNode;
  tooltipPopupClassName?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  variant?: PanelActionButtonVariant;
}

export function PanelActionButton({
  children,
  className,
  side = 'top',
  sideOffset = 8,
  tooltipLabel,
  tooltipPopupClassName,
  type = 'button',
  variant = 'outline',
  ...buttonProps
}: Readonly<PanelActionButtonProps>) {
  return (
    <Tooltip
      content={tooltipLabel}
      popupClassName={tooltipPopupClassName}
      side={side}
      sideOffset={sideOffset}
    >
      <button
        type={type}
        className={cn(
          basePanelActionButtonClassName,
          panelActionButtonVariantClassName[variant],
          className,
        )}
        {...buttonProps}
      >
        {children}
      </button>
    </Tooltip>
  );
}

export {
  PanelActionButton as HeaderActionButton,
  type PanelActionButtonProps as HeaderActionButtonProps,
};
