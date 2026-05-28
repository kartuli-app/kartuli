import { AppBar } from '@game-client/ui/components/layout/app-bar/app-bar';
import { BackButton } from '@game-client/ui/components/layout/app-bar/back-button';
import { MascotLogo } from '@game-client/ui/components/layout/app-bar/mascot-logo';
import type { ReactNode } from 'react';

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
