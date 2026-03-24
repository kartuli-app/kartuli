'use client';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import { AppContent } from '@kartuli/ui/components/layout/app-content';
import { AppScreen } from '@kartuli/ui/components/layout/app-screen';
import { LearnBarContentHybrid } from './learn-bar-content-hybrid';
import { LearnPageClientButtons } from './learn-page-client-buttons';
import { LearnPageHeading } from './learn-page-heading';

export function LearnPageClient({ language }: Readonly<{ readonly language: SupportedLng }>) {
  return (
    <AppScreen testId="game-learn">
      <AppBar isSticky>
        <LearnBarContentHybrid language={language} />
      </AppBar>

      <AppContent>
        <LearnPageHeading />
        <LearnPageClientButtons />
      </AppContent>
    </AppScreen>
  );
}
