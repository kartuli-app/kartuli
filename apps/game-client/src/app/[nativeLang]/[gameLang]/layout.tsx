import type { ReactNode } from 'react';
import { MascotProvider } from './mascot-context';
import { MascotToast } from './mascot-toast';
import { ShellLayout } from './shell-layout';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    nativeLang: string;
    gameLang: string;
  }>;
}

export default function GameLangLayout({ children }: LayoutProps) {
  return (
    <MascotProvider>
      <MascotToast />
      <ShellLayout>{children}</ShellLayout>
    </MascotProvider>
  );
}
