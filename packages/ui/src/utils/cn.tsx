import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ['spacing-token-test-small', 'spacing-token-test-big'],
    },
  },
});

export function cn(...inputs: Parameters<typeof twMerge>) {
  return twMerge(clsx(inputs));
}
