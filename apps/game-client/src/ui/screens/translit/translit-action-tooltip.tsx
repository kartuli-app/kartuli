'use client';
import { Tooltip } from '@base-ui/react/tooltip';
import {
  buttonIconClassNames,
  iconClassNames,
} from '@game-client/ui/shared/components/game-app-bar/game-app-bar-elements';
import { cn } from '@kartuli/ui/utils/cn';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

const tooltipPopupClassName = cn(
  'z-50',
  'bg-brand-text-600',
  'text-brand-text-100',
  'p-brand-regular',
  'text-lg',
  'shadow-lg',
  'rounded-md',
  'max-w-74',
);

const tooltipArrowClassName = cn(
  'data-[side=top]:bottom-[-7px]',
  'data-[side=bottom]:top-[-7px]',
  'data-[side=bottom]:rotate-180',
);

const tooltipArrowInnerClassName = cn('size-5', 'rotate-45', 'bg-brand-text-600');

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
        className={cn(iconClassNames, buttonIconClassNames, className)}
        {...triggerProps}
      >
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side={side} sideOffset={sideOffset}>
          <Tooltip.Popup className={tooltipPopupClassName}>
            <Tooltip.Arrow className={tooltipArrowClassName}>
              <div className={tooltipArrowInnerClassName} />
            </Tooltip.Arrow>
            {tooltipLabel}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
