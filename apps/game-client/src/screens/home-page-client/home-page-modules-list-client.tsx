'use client';

import type { HomePageModuleView } from '@game-client/app/[language]/(home)/get-home-page-view-server';
import type { ItemActivitySummaryRow } from '@game-client/core/student/derived/item-activity-summary-collection/create-item-activity-summary-collection';
import { useItemActivitySummaryAndViewEvents } from '@game-client/core/student/derived/item-activity-summary-collection/use-item-activity-summary-and-view-events';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
import { useLiveQuery } from '@tanstack/react-db';
import { useCallback, useMemo } from 'react';
import { HomePageModulesListServer } from './home-page-modules-list-server';

/** Runs only after mount so `useLiveQuery` (useSyncExternalStore) never runs during SSR. */
export function HomePageModulesListClient({
  homePageModules,
}: Readonly<{ homePageModules: HomePageModuleView[] }>) {
  const ownerId = getOrCreateOwnerId();
  const { itemActivitySummaryCollection, addViewEventsForItems } =
    useItemActivitySummaryAndViewEvents({
      ownerId,
    });
  const { data } = useLiveQuery(itemActivitySummaryCollection);

  const addViewEventsForLessonItems = useCallback(
    async (itemIds: readonly string[]) => {
      await addViewEventsForItems(itemIds);
    },
    [addViewEventsForItems],
  );

  const summariesByItemId = useMemo(() => {
    if (!data) return {};
    return data.reduce(
      (acc, summary) => {
        acc[summary.itemId] = summary;
        return acc;
      },
      {} as Record<string, ItemActivitySummaryRow>,
    );
  }, [data]);

  return (
    <HomePageModulesListServer
      homePageModules={homePageModules}
      summariesByItemId={summariesByItemId}
      addViewEventsForLessonItems={addViewEventsForLessonItems}
    />
  );
}
