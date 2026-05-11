import { cn } from '@kartuli/ui/utils/cn';

export function DockButton({
  label,
  icon,
  iconActive,
  isActive,
}: Readonly<{
  label: string;
  isActive?: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconActive: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}>) {
  const Icon = isActive ? iconActive : icon;
  return (
    <button
      type="button"
      className={cn(
        //
        'flex',
        'cursor-pointer',
        'items-center',
        'rounded-md',
        'flex',
        'flex-col lg:flex-row',
        'gap-1 lg:gap-4',
        'md:px-4',
        'justify-center lg:justify-start',
        'w-15 lg:w-full',
        'h-15 lg:h-11',
        !isActive && 'hover:bg-kartuli-color-primitive-neutral-500',
        isActive && 'bg-kartuli-color-primitive-neutral-900',
        'group',
      )}
    >
      <Icon
        className={cn(
          //
          'shrink-0',
          'size-6',
          'text-kartuli-color-primitive-neutral-500',
          !isActive && 'group-hover:text-kartuli-color-primitive-neutral-50',
          isActive && 'text-kartuli-color-primitive-neutral-50',
        )}
        aria-hidden
      />
      <div
        className={cn(
          //
          'text-sm lg:text-lg',
          'text-kartuli-color-primitive-neutral-500',
          !isActive && 'group-hover:text-kartuli-color-primitive-neutral-50',
          isActive && 'text-kartuli-color-primitive-neutral-50',
        )}
      >
        {label}
      </div>
    </button>
  );
}
