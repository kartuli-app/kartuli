import clsx from 'clsx';

export const iconClassNames = clsx(
  'size-11',
  'shrink-0',
  'rounded-full',
  'flex',
  'justify-center',
  'items-center',
);

export const buttonIconClassNames = clsx(
  'cursor-pointer',
  'focus-ring',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'bg-ds1-color-text-200',
  'hover:bg-ds1-color-text-300',
  'data-[pressed]:bg-ds1-color-text-300',
  'active:scale-95',
  'transition-transform duration-300',
  'border',
  'border-ds1-color-text-300',
);
