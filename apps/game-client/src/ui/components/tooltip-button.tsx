'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Tooltip } from './tooltip';

interface TooltipButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  tooltipLabel: ReactNode;
  tooltipPopupClassName?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

export function TooltipButton({
  children,
  className,
  side = 'top',
  sideOffset = 12,
  tooltipLabel,
  tooltipPopupClassName,
  type = 'button',
  ...buttonProps
}: Readonly<TooltipButtonProps>) {
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
          'inline-flex',
          'items-center',
          'justify-center',
          'border',
          'p-2',
          'hover:bg-gray-100',
          'disabled:opacity-50',
          className,
        )}
        {...buttonProps}
      >
        {children}
      </button>
    </Tooltip>
  );
}
