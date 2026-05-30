'use client';

import { Tooltip } from '@game-client/ui/components/overlay/tooltip';
import { cn } from '@kartuli/ui/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const panelActionButtonClassName = cn(
  'inline-flex',
  'items-center',
  'justify-center',
  'border-(length:--s-width-panel-action-outline-border) solid',
  'border-s-color-panel-action-outline-border',
  'bg-s-color-panel-action-outline-bg',
  'p-2',
  'text-s-color-panel-action-outline-content',
  'focus-visible:ring-(length:--s-width-focus-ring)',
  'focus-visible:ring-s-color-panel-action-outline-ring',
  'hover:bg-s-color-panel-action-outline-hover-bg',
  'hover:border-s-color-panel-action-outline-hover-border',
  'hover:text-s-color-panel-action-outline-hover-content',
  'active:bg-s-color-panel-action-outline-hover-bg',
  'active:border-s-color-panel-action-outline-hover-border',
  'active:text-s-color-panel-action-outline-hover-content',
  'disabled:opacity-50',
  'outline-none',
  'rounded-p-radius-full',
  'size-11',
  'active:scale-95',
  'cursor-pointer',
  'shadow-md',
);

export interface PanelActionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children'> {
  'aria-label': string;
  children: ReactNode;
  tooltipLabel: ReactNode;
  tooltipPopupClassName?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

export function PanelActionButton({
  children,
  className,
  side = 'top',
  sideOffset = 8,
  tooltipLabel,
  tooltipPopupClassName,
  type = 'button',
  ...buttonProps
}: Readonly<PanelActionButtonProps>) {
  return (
    <Tooltip
      content={tooltipLabel}
      popupClassName={tooltipPopupClassName}
      side={side}
      sideOffset={sideOffset}
    >
      <button type={type} className={cn(panelActionButtonClassName, className)} {...buttonProps}>
        {children}
      </button>
    </Tooltip>
  );
}

export {
  PanelActionButton as HeaderActionButton,
  type PanelActionButtonProps as HeaderActionButtonProps,
};
