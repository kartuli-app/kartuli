'use client';
import type { HomePageView } from '@game-client/app/[language]/(home)/get-home-page-view-server';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import { AppContent } from '@kartuli/ui/components/layout/app-content';
import { AppScreen } from '@kartuli/ui/components/layout/app-screen';
import { HomeBarContentHybrid } from './home-bar-content-hybrid';
import { HomeHeading } from './home-heading';
import { HomePageModulesList } from './home-page-modules-list';

export function HomePageClient({
  language,
  homePageView,
}: Readonly<{
  readonly language: SupportedLng;
  readonly homePageView: HomePageView;
}>) {
  return (
    <AppScreen testId="game-home">
      <AppBar isSticky>
        <HomeBarContentHybrid language={language} />
      </AppBar>

      <AppContent>
        <HomeHeading language={language} />
        <HomePageModulesList homePageModules={homePageView.modules} />
      </AppContent>
    </AppScreen>
  );
}
