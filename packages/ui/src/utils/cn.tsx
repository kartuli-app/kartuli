import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ['brand-regular', 'brand-large', 'brand-xlarge', 'brand-2xlarge', 'brand-3xlarge'],
    },
  },
});

export function cn(...inputs: Parameters<typeof twMerge>) {
  return twMerge(clsx(inputs));
}
