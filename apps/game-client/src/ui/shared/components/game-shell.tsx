'use client';

import { GameAppBar } from '@game-client/ui/shared/components/game-app-bar/game-app-bar';
import { AppContent } from '@kartuli/ui/components/layout/app-content';
import { AppScreen } from '@kartuli/ui/components/layout/app-screen';
import { cn } from '@kartuli/ui/utils/cn';
import { useTranslation } from 'react-i18next';
import { GameAppDock } from './game-app-dock/game-app-dock';

const MAIN_CONTENT_ID = 'main-content';

function SkipToMainContentLink() {
  const { t } = useTranslation('common');
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className={cn(
        'sr-only',
        'focus:not-sr-only',
        'focus:fixed focus:top-2 focus:left-2 focus:z-100',
        'focus:px-4 focus:py-2',
        'focus:rounded-md',
        'focus:bg-brand-text-900 focus:text-brand-text-50',
        'focus:outline-2 focus:outline-offset-2 focus:outline-brand-primary-500',
        'focus:font-semibold',
      )}
    >
      {t('accessibility.skip_to_main')}
    </a>
  );
}

export function GameShell({
  children,
}: Readonly<{
  readonly children: React.ReactNode;
}>) {
  return (
    <AppScreen>
      <SkipToMainContentLink />
      <GameAppBar />
      <AppContent id={MAIN_CONTENT_ID}>{children}</AppContent>
      <GameAppDock />
    </AppScreen>
  );
}
