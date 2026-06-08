'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { HTMLAttributes, ReactNode } from 'react';

const panelBadgeVariantClassName = {
  neutral: cn('bg-s-color-panel-status-neutral-bg', 'text-s-color-panel-status-neutral-content'),
  positive: cn('bg-s-color-panel-status-positive-bg', 'text-s-color-panel-status-positive-content'),
  favorite: cn('bg-s-color-panel-status-favorite-bg', 'text-s-color-panel-status-favorite-content'),
  accent: cn('bg-s-color-panel-status-brand-bg', 'text-s-color-panel-status-brand-content'),
} as const;

const panelBadgeSizeClassName = {
  sm: cn('px-p-spacing-4 py-p-spacing-1', 'text-sm md:text-xl'),
  md: cn('px-p-spacing-4 py-p-spacing-2', 'text-md md:text-2xl'),
} as const;

const panelBadgeShapeClassName = {
  rounded: 'rounded-p-radius-1',
  pill: 'rounded-p-radius-full',
} as const;

export type PanelBadgeVariant = keyof typeof panelBadgeVariantClassName;
export type PanelBadgeSize = keyof typeof panelBadgeSizeClassName;
export type PanelBadgeShape = keyof typeof panelBadgeShapeClassName;

export interface PanelBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: ReactNode;
  variant?: PanelBadgeVariant;
  size?: PanelBadgeSize;
  shape?: PanelBadgeShape;
}

export function PanelBadge({
  children,
  className,
  shape = 'pill',
  size = 'sm',
  variant = 'neutral',
  ...spanProps
}: Readonly<PanelBadgeProps>) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-bold uppercase',
        panelBadgeVariantClassName[variant],
        panelBadgeSizeClassName[size],
        panelBadgeShapeClassName[shape],
        className,
      )}
      {...spanProps}
    >
      {children}
    </span>
  );
}
