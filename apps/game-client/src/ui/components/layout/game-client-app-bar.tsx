import { AppBar } from './app-bar';
import { BackButton } from './back-button';
import { MascotLogo } from './mascot-logo';

type GameClientAppBarProps = {
  backHref?: string;
  eyeBrow: string;
  title: string;
  trailing?: React.ReactNode;
};

export function GameClientAppBar({
  backHref,
  eyeBrow,
  title,
  trailing,
}: Readonly<GameClientAppBarProps>) {
  return (
    <AppBar
      leading={backHref ? <BackButton href={backHref} /> : <MascotLogo />}
      eyeBrow={eyeBrow}
      title={title}
      trailing={trailing}
    />
  );
}
