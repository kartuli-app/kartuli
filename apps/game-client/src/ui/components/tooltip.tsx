'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { cn } from '@kartuli/ui/utils/cn';
import type { ReactElement, ReactNode, RefObject } from 'react';

export const tooltipPopupClassName = cn('border', 'bg-white', 'p-2');

interface TooltipProps {
  children: ReactElement;
  content: ReactNode;
  disabled?: boolean;
  popupClassName?: string;
  portalContainer?: RefObject<HTMLElement | null>;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

export function Tooltip({
  children,
  content,
  disabled = false,
  popupClassName,
  portalContainer,
  side = 'top',
  sideOffset = 12,
}: Readonly<TooltipProps>) {
  return (
    <BaseTooltip.Root disabled={disabled}>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal container={portalContainer}>
        <BaseTooltip.Positioner side={side} sideOffset={sideOffset}>
          <BaseTooltip.Popup className={cn(tooltipPopupClassName, popupClassName)}>
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
