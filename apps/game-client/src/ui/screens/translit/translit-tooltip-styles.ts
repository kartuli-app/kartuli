import { cn } from '@kartuli/ui/utils/cn';

export const translitTooltipPopupClassName = cn(
  'pointer-events-none',
  'z-50',
  'flex',
  'max-w-74',
  'items-center',
  'justify-center',
  'rounded-md',
  'bg-black',
  'px-3',
  'py-2',
  'text-base',
  'text-white',
  'shadow-lg',
);

export const translitTooltipArrowClassName = cn(
  'data-[side=top]:bottom-[-7px]',
  'data-[side=bottom]:top-[-7px]',
  'data-[side=bottom]:rotate-180',
);

export const translitTooltipArrowInnerClassName = cn('size-4', 'rotate-45', 'bg-black');
