import { AppBar } from './app-bar';
import { BackButton } from './back-button';
import { MascotLogo } from './mascot-logo';

type GameClientAppBarProps = {
  backHref?: string;
  eyeBrow: React.ReactNode;
  title: React.ReactNode;
  action?: React.ReactNode;
};

export function GameClientAppBar({
  backHref,
  eyeBrow,
  title,
  action,
}: Readonly<GameClientAppBarProps>) {
  return (
    <AppBar
      leading={backHref ? <BackButton href={backHref} /> : <MascotLogo />}
      eyeBrow={eyeBrow}
      title={title}
      action={action}
    />
  );
}
