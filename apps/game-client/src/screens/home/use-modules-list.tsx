'use client';

import type { ItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/create-item-activity-device-states-collection';
import {
  AddItemActivityDeviceEvent,
  getDefaultItemActivityDeviceStateRow,
  type ItemActivityDeviceStateRow,
} from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state';
import {
  getItemActivityDeviceStateDatabase,
  STORE_NAME,
} from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state-database';
import { useItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/use-item-activity-device-states-collection';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
import { useHomeModulesView } from '@game-client/core/views/home/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';

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
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const nextStates: ItemActivityDeviceStateRow[] = [];

  for (const itemId of uniqueItemIds) {
    const { id: rowId } = getDefaultItemActivityDeviceStateRow({ itemId });
    const previousState = await tx.store.get(rowId);
    const nextState = AddItemActivityDeviceEvent({
      previousState: previousState ?? undefined,
      event: { itemId, eventType: 'view' },
    });
    nextStates.push(nextState);
    await tx.store.put(nextState);
  }

  await tx.done;

  for (const row of nextStates) {
    collection.utils.writeUpsert(row as Partial<ItemActivityDeviceStateRow>);
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
