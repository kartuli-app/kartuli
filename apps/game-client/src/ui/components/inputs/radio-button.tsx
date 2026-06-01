import { cn } from '@kartuli/ui/utils/cn';

interface RadioButtonProps {
  checked: boolean;
  label: string;
  name: string;
  onChange: () => void;
  value: string;
}

export function RadioButton({ checked, label, name, onChange, value }: Readonly<RadioButtonProps>) {
  return (
    <label className={cn('flex', 'cursor-pointer', 'items-center', 'gap-p-spacing-3', 'py-2')}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
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
          'cursor-pointer',
          'focus-visible:ring-(length:--s-width-focus-ring)',
          'focus-visible:ring-s-color-panel-control-ring',
        )}
      />
      <span className={cn('text-s-color-panel-content-primary', 'font-medium')}>{label}</span>
    </label>
  );
}
