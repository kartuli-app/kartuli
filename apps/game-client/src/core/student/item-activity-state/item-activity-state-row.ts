'use client';
import { getOrCreateDeviceId } from '../identifiers/device-id';
import { getOrCreateOwnerId } from '../identifiers/owner-id';

export type ItemActivityStateRow = {
  // primary key
  id: string; // ownerId + deviceId + itemId
  // for indexing / aggregation
  ownerId: string; // getOrCreateOwnerId() (update when auth state changes)
  deviceId: string; // getOrCreateDeviceId()
  itemId: string;
  // view state
  viewCount: number;
  firstViewAt: string;
  lastViewAt: string;
  // success state
  successCount: number;
  firstSuccessAt: string;
  lastSuccessAt: string;
  // fail state
  failCount: number;
  firstFailAt: string;
  lastFailAt: string;
  // last updated timestamp
  udpatedAt: string;
};

export function getDefaultItemActivityStateRow({
  itemId,
}: {
  itemId: string;
}): ItemActivityStateRow {
  const ownerId = getOrCreateOwnerId();
  const deviceId = getOrCreateDeviceId();
  return {
    id: `${ownerId}-${deviceId}-${itemId}-${new Date().toISOString()}`,
    ownerId,
    deviceId,
    itemId,
    viewCount: 0,
    firstViewAt: new Date().toISOString(),
    lastViewAt: new Date().toISOString(),
    successCount: 0,
    firstSuccessAt: new Date().toISOString(),
    lastSuccessAt: new Date().toISOString(),
    failCount: 0,
    firstFailAt: new Date().toISOString(),
    lastFailAt: new Date().toISOString(),
    udpatedAt: new Date().toISOString(),
  };
}

export function AddItemEvent({
  previousState,
  itemId,
  eventType,
}: {
  previousState?: ItemActivityStateRow;
  itemId: string;
  eventType: 'view' | 'fail' | 'success';
}): ItemActivityStateRow {
  const newState = previousState ?? getDefaultItemActivityStateRow({ itemId });

  switch (eventType) {
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
  return newState;
}
