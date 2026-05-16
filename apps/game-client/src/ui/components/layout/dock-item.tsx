import { cn } from '@kartuli/ui/utils/cn';
import Link from 'next/link';

export function DockItem({
  href,
  label,
  icon,
  activeIcon,
  active,
}: Readonly<{
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
  activeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}>) {
  const Icon = active ? activeIcon : icon;
  const className = cn(
    'flex',
    'items-center',
    'rounded-md',
    'focus-visible:ring-2',
    'outline-none',
    // responsive layout
    'flex-col xl:flex-row',
    'gap-1 xl:gap-4',
    'md:px-4',
    'justify-center xl:justify-start',
    'w-15 xl:w-full',
    'h-15 xl:h-11',
    'text-sm xl:text-lg',
    // default state
    'bg-transparent',
    'text-kartuli-color-primitive-neutral-700',
    !active && 'focus-visible:ring-kartuli-color-primitive-neutral-900',
    // hover state
    !active && 'hover:bg-kartuli-color-primitive-neutral-500',
    !active && 'hover:text-kartuli-color-primitive-neutral-50',
    // active state
    active && 'bg-kartuli-color-primitive-neutral-900',
    active && 'text-kartuli-color-primitive-neutral-50',
    active && 'focus-visible:ring-kartuli-color-primitive-neutral-50',
    // pressed state
    'active:scale-95',
  );
  const children = (
    <>
      <Icon className={cn('shrink-0', 'size-6', 'text-inherit')} aria-hidden />
      <div className={cn('text-inherit')}>{label}</div>
    </>
  );

  return (
    <Link href={href} className={className} aria-current={active ? 'page' : undefined}>
      {children}
    </Link>
  );
}
