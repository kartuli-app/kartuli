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

  return (
    <Link
      href={href}
      className={cn(
        'flex',
        'items-center',
        // responsive layout
        'flex-col xl:flex-row',
        'gap-p-spacing-1 xl:gap-p-spacing-4',
        'xl:px-p-spacing-4',
        'justify-center xl:justify-start',
        'w-width-dock-item-mobile xl:w-width-dock-item-desktop',
        'h-height-dock-item-mobile xl:h-height-dock-item-desktop',
        'text-[0.6rem] xl:text-base',
        // default (ghost)
        'bg-s-color-shell-action-ghost-bg',
        'text-s-color-shell-action-ghost-content',
        'focus-visible:ring-s-color-shell-action-ghost-ring',
        // hover (ghost)
        !active && 'hover:bg-s-color-shell-action-ghost-hover-bg',
        !active && 'hover:text-s-color-shell-action-ghost-hover-content',
        // active (selected)
        active && 'bg-s-color-shell-action-selected-bg',
        active && 'text-s-color-shell-action-selected-content',
        active && 'focus-visible:ring-s-color-action-selected-ring',
        // button styles
        'rounded-p-radius-1',
        'focus-visible:ring-(length:--s-width-shell-focus-ring)',
        'outline-none',
        'uppercase',
        // pressed state
        'active:scale-95',
      )}
      aria-current={active ? 'page' : undefined}
    >
      <Icon className={cn('shrink-0', 'size-6', 'text-inherit')} aria-hidden />
      <div className={cn('text-inherit')}>{label}</div>
    </Link>
  );
}
