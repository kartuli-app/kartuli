'use client';

import type { HomePageModuleView } from '@game-client/app/[language]/(home)/get-home-page-view-server';
import type { ItemActivitySummaryRow } from '@game-client/core/student/derived/item-activity-summary-collection/create-item-activity-summary-collection';
import { useItemActivitySummaryCollection } from '@game-client/core/student/derived/item-activity-summary-collection/use-item-activity-summary-collection';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
import { useLiveQuery } from '@tanstack/react-db';
import { useMemo } from 'react';
import { useItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/use-item-activity-device-states-collection';
import { HomePageModulesListServer } from './home-page-modules-list-server';
import { ItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/create-item-activity-device-states-collection';
import {
  DATABASE_NAME,
  getItemActivityDeviceStateDatabase,
  STORE_NAME,
} from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state-database';
import {
  AddItemActivityDeviceEvent,
  getDefaultItemActivityDeviceStateRow,
  ItemActivityDeviceStateRow,
} from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state';
import { logger } from '@game-client/logging/dev-logger';

async function batchUpsertItemActivityDeviceViewEvents({
  collection,
  itemIds,
}: {
  collection: ItemActivityDeviceStatesCollection;
  itemIds: readonly string[];
}) {
  const uniqueItemIds = [...new Set(itemIds)];
  if (uniqueItemIds.length === 0) {
    return;
  }

  // TanStack DB "manual sync" utilities require the collection to have
  // completed its initial sync and been marked `ready`.
  if (!collection.isReady()) {
    await collection.preload();
  }

  const db = await getItemActivityDeviceStateDatabase();
  const nextStates: ItemActivityDeviceStateRow[] = [];

  for (const itemId of uniqueItemIds) {
    const { id: rowId } = getDefaultItemActivityDeviceStateRow({ itemId });
    const fromCollection = collection.get(rowId);
    const fromIndexedDb =
      fromCollection === undefined && db !== null ? await db.get(STORE_NAME, rowId) : undefined;
    const previousState = fromCollection ?? fromIndexedDb ?? undefined;
    const nextState = AddItemActivityDeviceEvent({
      previousState,
      event: { itemId, eventType: 'view' },
    });
    nextStates.push(nextState);
  }

  for (const row of nextStates) {
    collection.utils.writeUpsert(row as Partial<ItemActivityDeviceStateRow>);
  }

  if (db !== null) {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      for (const row of nextStates) {
        await tx.store.put(row);
      }
      await tx.done;
    } catch (error) {
      logger.error(
        'database',
        `${DATABASE_NAME}: Failed to persist item activity device state to IndexedDB:`,
        error,
      );
    }
  }
}

/** Runs only after mount so `useLiveQuery` (useSyncExternalStore) never runs during SSR. */
export function HomePageModulesListClient({
  homePageModules,
}: Readonly<{ homePageModules: HomePageModuleView[] }>) {
  const ownerId = getOrCreateOwnerId();
  const itemActivitySummaryCollection = useItemActivitySummaryCollection({ ownerId });
  const { data } = useLiveQuery(itemActivitySummaryCollection);
  const itemsDeviceActivityStatesCollection = useItemActivityDeviceStatesCollection({ ownerId });

  const addViewEventsForLessonItems = async (itemIds: readonly string[]) => {
    await batchUpsertItemActivityDeviceViewEvents({
      collection: itemsDeviceActivityStatesCollection,
      itemIds,
    });
  };

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
  console.log('🚀 ~ HomePageModulesListClient ~ summariesByItemId:', summariesByItemId);

  return (
    <HomePageModulesListServer
      homePageModules={homePageModules}
      summariesByItemId={summariesByItemId}
      addViewEventsForLessonItems={addViewEventsForLessonItems}
    />
  );
}
