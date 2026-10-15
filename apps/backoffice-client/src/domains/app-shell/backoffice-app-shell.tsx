import { AppShell } from '@kartuli/ui/components/layout/shell/app-shell';
import type { ReactNode } from 'react';
import { BackofficeAppBar } from './backoffice-app-bar';
import { BackofficeDock } from './backoffice-dock';

export function BackofficeAppShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AppShell appBar={<BackofficeAppBar />} startRailContent={<BackofficeDock />}>
      {children}
    </AppShell>
  );
}
