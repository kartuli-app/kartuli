'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { RefObject, TextareaHTMLAttributes } from 'react';

export interface TranslitInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'aria-labelledby'> {
  ariaLabelledBy: string;
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
}

export function TranslitInput({
  ariaLabelledBy,
  className,
  textareaRef,
  ...textareaProps
}: Readonly<TranslitInputProps>) {
  return (
    <textarea
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'h-full',
        'w-full',
        'resize-none',
        'rounded-p-radius-2',
        'bg-p-color-neutral-200',
        'p-4',
        'outline-none',
        'focus-visible:ring-(length:--s-width-focus-ring)',
        'focus-visible:ring-s-color-panel-control-ring',
        className,
      )}
      ref={textareaRef}
      {...textareaProps}
    />
  );
}
