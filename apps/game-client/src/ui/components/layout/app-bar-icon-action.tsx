import { cn } from '@kartuli/ui/utils/cn';
import Link from 'next/link';

const appBarIconActionClassName = cn(
  //
  'flex',
  'items-center',
  'justify-center',
  'shrink-0',
  'size-12',
  // default (ghost)
  'bg-s-color-shell-action-ghost-bg',
  'text-s-color-shell-action-ghost-content',
  'focus-visible:ring-s-color-shell-action-ghost-ring',
  // hover (ghost)
  'hover:bg-s-color-shell-action-ghost-hover-bg',
  'hover:text-s-color-shell-action-ghost-hover-content',
  // button styles
  'cursor-pointer',
  'rounded-p-radius-full',
  'focus-visible:ring-(length:--s-width-focus-ring)',
  'outline-none',
  'uppercase',
  // pressed state (hover)
  'active:scale-95',
  'active:bg-s-color-shell-action-ghost-hover-bg',
  'active:text-s-color-shell-action-ghost-hover-content',
);

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type AppBarIconButtonProps = {
  label: string;
  icon: IconComponent;
  onClick?: () => void;
};

export function AppBarIconButton({ label, icon, onClick }: Readonly<AppBarIconButtonProps>) {
  const Icon = icon;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={appBarIconActionClassName}
    >
      <Icon className="size-8" aria-hidden="true" />
    </button>
  );
}

type GameAppBarIconLinkProps = {
  href: string;
  label: string;
  icon: IconComponent;
};

export function GameAppBarIconLink({ href, label, icon }: Readonly<GameAppBarIconLinkProps>) {
  const Icon = icon;

  return (
    <Link href={href} aria-label={label} className={appBarIconActionClassName}>
      <Icon className="size-8" aria-hidden="true" />
    </Link>
  );
}
