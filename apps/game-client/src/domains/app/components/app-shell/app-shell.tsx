import clsx from 'clsx';
import type { ReactNode } from 'react';
import { AppProvider } from '@/app/app/app-context';
import { Container } from '@/app/app/container';
import { Content } from '@/app/app/content';
import './app-shell.css';
import { AppBar } from './app-bar/app-bar';
import { AppDock } from './app-dock/app-dock';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <AppProvider>
      <Container
        className={clsx(
          //
          'flex-col',
          'h-full',
          //
          'bg-violet-50',
          // 'bg-slate-50',
        )}
      >
        <AppBar />
        <Content>{children}</Content>
        <AppDock />
      </Container>
    </AppProvider>
  );
}
