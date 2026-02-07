import clsx from 'clsx';
import { AppContextProvider } from '@/domains/app/components/app-context';
import { AppContent } from '@/domains/app/components/app-shell/app-content/app-content';
import { Container } from '@/domains/shared/components/container';
import './app-shell.css';
import { AppBar } from '@/domains/app/components/app-shell/app-bar/app-bar';
import { AppDock } from '@/domains/app/components/app-shell/app-dock/app-dock';

export function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppContextProvider>
      <Container
        className={clsx(
          //
          'flex-col',
          'h-full',
          //
          'bg-ds-app-bg',
          'text-ds-text-800',
        )}
      >
        <AppBar />
        <AppContent />
        {children}
        <AppDock />
      </Container>
    </AppContextProvider>
  );
}
