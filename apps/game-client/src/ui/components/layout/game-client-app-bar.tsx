import { AppBar } from './app-bar';
import { BackButton } from './back-button';
import { MascotLogo } from './mascot-logo';

type GameClientAppBarProps = {
  backHref?: string;
  eyeBrow: string;
  title: string;
  trailingPrimary?: React.ReactNode;
  trailingSecondary?: React.ReactNode;
};

export function GameClientAppBar({
  backHref,
  eyeBrow,
  title,
  trailingPrimary,
  trailingSecondary,
}: Readonly<GameClientAppBarProps>) {
  return (
    <AppBar
      leading={backHref ? <BackButton href={backHref} /> : <MascotLogo />}
      eyeBrow={eyeBrow}
      title={title}
      trailingPrimary={trailingPrimary}
      trailingSecondary={trailingSecondary}
    />
  );
}
