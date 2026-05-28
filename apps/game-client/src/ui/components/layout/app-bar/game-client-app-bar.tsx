import type { ReactNode } from 'react';
import { AppBar } from './app-bar';
import { BackButton } from './back-button';
import { MascotLogo } from './mascot-logo';

export interface GameClientAppBarProps {
  backHref?: string;
  eyeBrow: string;
  title: string;
  trailingPrimary?: ReactNode;
  trailingSecondary?: ReactNode;
}

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
