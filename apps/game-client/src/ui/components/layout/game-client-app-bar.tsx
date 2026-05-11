import { IoArrowBackOutline } from 'react-icons/io5';
import { AppBar } from './app-bar';
import { GameAppBarIconLink } from './app-bar-icon-action';
import { MascotLogo } from './mascot-logo';

function BackButton({ href }: Readonly<{ href: string }>) {
  return <GameAppBarIconLink href={href} label="Back" icon={IoArrowBackOutline} />;
}

type GameClientAppBarProps = {
  backHref?: string;
  context?: React.ReactNode;
  title: React.ReactNode;
  action?: React.ReactNode;
};

export function GameClientAppBar({
  backHref,
  context,
  title,
  action,
}: Readonly<GameClientAppBarProps>) {
  return (
    <AppBar
      leading={backHref ? <BackButton href={backHref} /> : <MascotLogo />}
      context={context}
      title={title}
      action={action}
    />
  );
}
