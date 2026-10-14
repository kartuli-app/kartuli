import { AppBarTitle } from '@game-client/ui/components/layout/app-bar/app-bar-title';
import { BackButton } from '@game-client/ui/components/layout/app-bar/back-button';
import { MascotLogo } from '@game-client/ui/components/layout/app-bar/mascot-logo';
import { AppBar } from '@kartuli/ui/components/layout/app-bar/app-bar';
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
      title={<AppBarTitle title={title} eyeBrow={eyeBrow} />}
      trailingPrimary={trailingPrimary}
      trailingSecondary={trailingSecondary}
    />
  );
}
