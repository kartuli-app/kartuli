import { cn } from '@kartuli/ui/utils/cn';
import Link from 'next/link';

const appBarIconActionClassName = cn(
  //
  'flex',
  'items-center',
  'justify-center',
  'shrink-0',
  'size-full',
  'cursor-pointer',
  'hover:bg-kartuli-color-primitive-neutral-500',
  'hover:text-kartuli-color-primitive-neutral-50',
  'text-kartuli-color-primitive-neutral-500',
  'rounded-md',
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
      <Icon className="size-11" aria-hidden="true" />
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
      <Icon className="size-11" aria-hidden="true" />
    </Link>
  );
}
