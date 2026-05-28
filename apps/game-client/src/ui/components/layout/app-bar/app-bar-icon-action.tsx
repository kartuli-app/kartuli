import {
  ShellActionButton,
  ShellActionLink,
} from '@game-client/ui/components/actions/shell-action';
import { cn } from '@kartuli/ui/utils/cn';

const appBarIconActionClassName = cn('size-12');

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface AppBarIconButtonProps {
  label: string;
  icon: IconComponent;
  onClick?: () => void;
}

export function AppBarIconButton({ label, icon, onClick }: Readonly<AppBarIconButtonProps>) {
  const Icon = icon;

  return (
    <ShellActionButton
      aria-label={label}
      onClick={onClick}
      className={appBarIconActionClassName}
      size="icon"
      variant="ghost"
    >
      <Icon className="size-8" aria-hidden="true" />
    </ShellActionButton>
  );
}

interface GameAppBarIconLinkProps {
  href: string;
  label: string;
  icon: IconComponent;
}

export function GameAppBarIconLink({ href, label, icon }: Readonly<GameAppBarIconLinkProps>) {
  const Icon = icon;

  return (
    <ShellActionLink
      href={href}
      aria-label={label}
      className={appBarIconActionClassName}
      size="icon"
      variant="ghost"
    >
      <Icon className="size-8" aria-hidden="true" />
    </ShellActionLink>
  );
}
