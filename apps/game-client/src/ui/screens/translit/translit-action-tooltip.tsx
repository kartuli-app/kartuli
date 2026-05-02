'use client';
import { Tooltip } from '@base-ui/react/tooltip';
import { translitTooltipPopupClassName } from '@game-client/ui/screens/translit/translit-tooltip-styles';
import { cn } from '@kartuli/ui/utils/cn';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TranslitActionTooltipProps = Omit<
  ComponentPropsWithoutRef<typeof Tooltip.Trigger>,
  'children' | 'className'
> & {
  /** Text or node shown inside the tooltip popup */
  tooltipLabel: ReactNode;
  /** Which side of the trigger the tooltip prefers */
  side?: 'top' | 'bottom';
  sideOffset?: number;
  children: ReactNode;
  /** Extra trigger classes (string only; avoids cn vs function-className mismatch) */
  className?: string;
  /**
   * When true, the tooltip is disabled (Base UI `Tooltip.Root` disabled).
   * Use while another overlay is shown (e.g. copy success toast) so only one appears.
   */
  tooltipDisabled?: boolean;
};

/**
 * Icon-style action button with Base UI tooltip. Used on the translit screen;
 * styles live here so they can evolve without duplicating markup.
 */
export function TranslitActionTooltip({
  tooltipLabel,
  side = 'top',
  sideOffset = 12,
  className,
  children,
  tooltipDisabled = false,
  ...triggerProps
}: TranslitActionTooltipProps) {
  return (
    <Tooltip.Root disabled={tooltipDisabled}>
      <Tooltip.Trigger
        type="button"
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
        {...triggerProps}
      >
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side={side} sideOffset={sideOffset}>
          <Tooltip.Popup className={translitTooltipPopupClassName}>{tooltipLabel}</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
