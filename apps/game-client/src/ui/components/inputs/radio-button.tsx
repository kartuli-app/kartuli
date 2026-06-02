'use client';

import { cn } from '@kartuli/ui/utils/cn';

interface RadioButtonProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  name: string;
  onChange: () => void;
  value: string;
}

export function RadioButton({
  checked,
  disabled,
  label,
  name,
  onChange,
  value,
}: Readonly<RadioButtonProps>) {
  return (
    <label
      className={cn(
        'flex',
        'items-center',
        'gap-p-spacing-3',
        'py-2',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={cn(
          'size-5',
          'shrink-0',
          'appearance-none',
          'rounded-full',
          'border-2',
          'border-s-color-panel-content-primary',
          'outline-none',
          'transition-colors',
          'checked:border-p-color-brand-600',
          'checked:bg-p-color-brand-600',
          'checked:shadow-[inset_0_0_0_3px_var(--s-color-panel-bg)]',
          'focus-visible:ring-(length:--s-width-focus-ring)',
          'focus-visible:ring-s-color-panel-control-ring',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      />
      <span className={cn('text-s-color-panel-content-primary', 'font-medium')}>{label}</span>
    </label>
  );
}
