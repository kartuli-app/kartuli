'use client';

import type { ItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/create-item-activity-device-states-collection';
import {
  AddItemActivityDeviceEvent,
  getDefaultItemActivityDeviceStateRow,
  type ItemActivityDeviceStateRow,
} from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state';
import {
  DATABASE_NAME,
  getItemActivityDeviceStateDatabase,
  STORE_NAME,
} from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state-database';
import { useItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/use-item-activity-device-states-collection';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
import { useHomeModulesView } from '@game-client/core/views/home/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';
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

export const useModulesList = () => {
  const locale = useLang();
  const ownerId = getOrCreateOwnerId();
  const contentRevision = '1.0.0';
  const itemsDeviceActivityStatesCollection = useItemActivityDeviceStatesCollection({ ownerId });
  const { data, isLoading, isError } = useHomeModulesView({ locale, contentRevision, ownerId });

  const addViewEventsForLessonItems = async (itemIds: readonly string[]) => {
    await batchUpsertItemActivityDeviceViewEvents({
      collection: itemsDeviceActivityStatesCollection,
      itemIds,
    });
  };

  return { data, isLoading, isError, addViewEventsForLessonItems };
};
