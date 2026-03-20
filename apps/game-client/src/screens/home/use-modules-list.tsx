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

async function upsertItemActivityDeviceStateEvent({
  collection,
  itemId,
  eventType,
}: {
  collection: ItemActivityDeviceStatesCollection;
  itemId: string;
  eventType: 'view' | 'success' | 'fail';
}) {
  const { id: rowId } = getDefaultItemActivityDeviceStateRow({ itemId });

  // TanStack DB "manual sync" utilities require the collection to have
  // completed its initial sync and been marked `ready`.
  if (!collection.isReady()) {
    await collection.preload();
  }

  // 1) Upsert in IndexedDB.
  const db = await getItemActivityDeviceStateDatabase();
  const previousState = await db.get(STORE_NAME, rowId);

  const nextState = AddItemActivityDeviceEvent({
    previousState: previousState ?? undefined,
    event: { itemId, eventType },
  });

  await db.put(STORE_NAME, nextState);

  // 2) Direct write into the TanStack DB collection to avoid refetch.
  // This updates the synced store immediately, which makes `useLiveQuery` re-render.
  collection.utils.writeUpsert(nextState as Partial<ItemActivityDeviceStateRow>);
}

export const useModulesList = () => {
  const locale = useLang();
  const ownerId = getOrCreateOwnerId();
  const contentRevision = '1.0.0';
  const itemsDeviceActivityStatesCollection = useItemActivityDeviceStatesCollection({ ownerId });
  const { data, isLoading, isError } = useHomeModulesView({ locale, contentRevision, ownerId });

  const addViewEventToItem = async (itemId: string) => {
    await upsertItemActivityDeviceStateEvent({
      collection: itemsDeviceActivityStatesCollection,
      itemId,
      eventType: 'view',
    });
  };

  return { data, isLoading, isError, addViewEventToItem };
};
