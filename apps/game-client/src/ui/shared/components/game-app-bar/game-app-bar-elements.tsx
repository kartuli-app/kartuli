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
  'bg-brand-text-200',
  'hover:bg-brand-text-300',
  'active:scale-110',
  'border',
  'border-brand-text-300',
);
