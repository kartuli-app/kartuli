import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        'ds1-spacing-regular',
        'ds1-spacing-large',
        'ds1-spacing-xlarge',
        'ds1-spacing-2xlarge',
        'ds1-spacing-3xlarge',
      ],
    },
  },
});

export function cn(...inputs: Parameters<typeof twMerge>) {
  return twMerge(clsx(inputs));
}
