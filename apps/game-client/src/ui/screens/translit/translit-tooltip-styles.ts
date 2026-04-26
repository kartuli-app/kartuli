import { cn } from '@kartuli/ui/utils/cn';

export const translitTooltipPopupClassName = cn(
  'z-50',
  'bg-ds1-color-text-600',
  'text-ds1-color-text-100',
  'px-ds1-spacing-large',
  'py-ds1-spacing-regular',
  'flex',
  'items-center',
  'justify-center',
  'text-lg',
  'shadow-lg',
  'rounded-md',
  'max-w-74',
  'pointer-events-none',
);

export const translitTooltipArrowClassName = cn(
  'data-[side=top]:bottom-[-7px]',
  'data-[side=bottom]:top-[-7px]',
  'data-[side=bottom]:rotate-180',
);

export const translitTooltipArrowInnerClassName = cn(
  'size-4',
  'rotate-45',
  'bg-ds1-color-text-600',
);
