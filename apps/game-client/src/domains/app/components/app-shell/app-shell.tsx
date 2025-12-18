import clsx from 'clsx';
import type { ReactNode } from 'react';
import { AppContextProvider } from '@/domains/app/components/app-context';
import { Container } from '@/domains/shared/components/container';
import { AppContent } from '@/domains/app/components/app-shell/app-content/app-content';
import './app-shell.css';
import { AppBar } from '@/domains/app/components/app-shell/app-bar/app-bar';
import { AppDock } from '@/domains/app/components/app-shell/app-dock/app-dock';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
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
        <AppContent>{children}</AppContent>
        <AppDock />
      </Container>
    </AppContextProvider>
  );
}
