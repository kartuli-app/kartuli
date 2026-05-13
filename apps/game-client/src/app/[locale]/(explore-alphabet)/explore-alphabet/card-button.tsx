import { cn } from '@kartuli/ui/utils/cn';

export function CardButton({
  icon,
  label,
  variant,
}: Readonly<{
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  variant: 'primary' | 'secondary';
}>) {
  const Icon = icon;
  return (
    <button
      type="button"
      className={cn(
        'flex',
        'items-center',
        'justify-center',
        'h-full',
        'w-full',
        'cursor-pointer',
        'border-2',
        'rounded-4xl',
        'group',
        'uppercase',
        'gap-2',
        'px-4',
        'py-2',
        variant === 'primary' && 'bg-kartuli-color-primitive-neutral-900',
        variant === 'primary' && 'hover:bg-kartuli-color-primitive-neutral-950',
        variant === 'primary' && 'border-kartuli-color-primitive-neutral-900',
        variant === 'primary' && 'w-5/10',
        variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        variant === 'secondary' && 'hover:bg-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'border-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'w-5/10',
      )}
    >
      <Icon
        className={cn(
          //
          'shrink-0',
          'size-5',
          'text-kartuli-color-primitive-neutral-500',
          variant === 'primary' && 'text-kartuli-color-primitive-neutral-50',
          variant === 'secondary' && 'text-kartuli-color-primitive-neutral-900',
          variant === 'secondary' && 'group-hover:text-kartuli-color-primitive-neutral-50',
        )}
        aria-hidden
      />
      <div
        className={cn(
          //
          'text-base',
          variant === 'primary' && 'text-kartuli-color-primitive-neutral-50',
          variant === 'secondary' && 'text-kartuli-color-primitive-neutral-900',
          variant === 'secondary' && 'group-hover:text-kartuli-color-primitive-neutral-50',
        )}
      >
        {label}
      </div>
    </button>
  );
}
