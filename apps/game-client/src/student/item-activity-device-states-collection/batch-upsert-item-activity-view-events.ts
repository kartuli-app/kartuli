import { logger } from '@game-client/logging/dev-logger';
import { getOrCreateDeviceId } from '../identifiers/device-id';
import { getOrCreateOwnerId } from '../identifiers/owner-id';
import type { ItemActivityStatesCollection } from './create-item-activity-states-collection';
import type { ItemActivityState } from './item-activity-state';
import {
  DATABASE_NAME,
  getItemActivityStateDatabase,
  STORE_NAME,
} from './item-activity-state-database';

export function getDefaultItemActivityState({ itemId }: { itemId: string }): ItemActivityState {
  const ownerId = getOrCreateOwnerId();
  const deviceId = getOrCreateDeviceId();
  return {
    id: `${ownerId}-${deviceId}-${itemId}`,
    ownerId,
    deviceId,
    itemId,
    viewCount: 0,
    firstViewAt: null,
    lastViewAt: null,
    successCount: 0,
    firstSuccessAt: null,
    lastSuccessAt: null,
    failCount: 0,
    firstFailAt: null,
    lastFailAt: null,
    updatedAt: new Date().toISOString(),
  };
}

type ItemActivityEvent = {
  itemId: string;
  eventType: 'view' | 'fail' | 'success';
};

export function AddItemActivityEvent({
  previousState,
  event,
}: {
  previousState?: ItemActivityState;
  event: ItemActivityEvent;
}): ItemActivityState {
  const newState = previousState
    ? { ...previousState }
    : getDefaultItemActivityState({ itemId: event.itemId });

  switch (event.eventType) {
    case 'view': {
      const newFirstViewAt = newState.firstViewAt ?? new Date().toISOString();
      const newLastViewAt = new Date().toISOString();
      newState.viewCount++;
      newState.firstViewAt = newFirstViewAt;
      newState.lastViewAt = newLastViewAt;
      break;
    }
    case 'fail': {
      const newFirstFailAt = newState.firstFailAt ?? new Date().toISOString();
      const newLastFailAt = new Date().toISOString();
      newState.failCount++;
      newState.firstFailAt = newFirstFailAt;
      newState.lastFailAt = newLastFailAt;
      break;
    }
    case 'success': {
      const newFirstSuccessAt = newState.firstSuccessAt ?? new Date().toISOString();
      const newLastSuccessAt = new Date().toISOString();
      newState.successCount++;
      newState.firstSuccessAt = newFirstSuccessAt;
      newState.lastSuccessAt = newLastSuccessAt;
      break;
    }
  }
  // Update the last-write timestamp for every event.
  newState.updatedAt = new Date().toISOString();
  return newState;
}

export async function batchUpsertItemActivityDeviceViewEvents({
  collection,
  itemIds,
}: {
  collection: ItemActivityStatesCollection;
  itemIds: readonly string[];
}) {
  const uniqueItemIds = [...new Set(itemIds)];
  if (uniqueItemIds.length === 0) {
    return;
  }

  if (!collection.isReady()) {
    await collection.preload();
  }

  const db = await getItemActivityStateDatabase();
  const nextStates: ItemActivityState[] = [];

  for (const itemId of uniqueItemIds) {
    const { id: rowId } = getDefaultItemActivityState({ itemId });
    const fromCollection = collection.get(rowId);
    const fromIndexedDb =
      fromCollection === undefined && db !== null ? await db.get(STORE_NAME, rowId) : undefined;
    const previousState = fromCollection ?? fromIndexedDb ?? undefined;
    const nextState = AddItemActivityEvent({
      previousState,
      event: { itemId, eventType: 'view' },
    });
    nextStates.push(nextState);
  }

  for (const row of nextStates) {
    collection.utils.writeUpsert(row as Partial<ItemActivityState>);
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
