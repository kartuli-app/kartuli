'use client';

import type { HomePageModuleView } from '@game-client/app/[language]/(home)/get-home-page-view-server';
import { useEffect, useState } from 'react';
import { HomePageModulesListClient } from './home-page-modules-list-client';
import { HomePageModulesListServer } from './home-page-modules-list-server';

/**
 * SSR / first paint: view counts are 0 (no IndexedDB on server). After mount, client loads activity
 * summaries and average lesson view counts update from TanStack DB.
 */
export function HomePageModulesList({
  homePageModules,
}: Readonly<{ homePageModules: HomePageModuleView[] }>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <HomePageModulesListServer homePageModules={homePageModules} summariesByItemId={{}} />;
  }

  return <HomePageModulesListClient homePageModules={homePageModules} />;
}
