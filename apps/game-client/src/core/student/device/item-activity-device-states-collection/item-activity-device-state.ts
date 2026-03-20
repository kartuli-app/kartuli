'use client';
import { getOrCreateDeviceId } from '@game-client/core/student/identifiers/device-id';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';

export type ItemActivityDeviceStateRow = {
  id: string;
  ownerId: string;
  deviceId: string;
  itemId: string;
  viewCount: number;
  firstViewAt: string | null;
  lastViewAt: string | null;
  successCount: number;
  firstSuccessAt: string | null;
  lastSuccessAt: string | null;
  failCount: number;
  firstFailAt: string | null;
  lastFailAt: string | null;
  udpatedAt: string;
};

export function getDefaultItemActivityDeviceStateRow({
  itemId,
}: {
  itemId: string;
}): ItemActivityDeviceStateRow {
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
    udpatedAt: new Date().toISOString(),
  };
}

type ItemActivityDeviceEvent = {
  itemId: string;
  eventType: 'view' | 'fail' | 'success';
};

export function AddItemActivityDeviceEvent({
  previousState,
  event,
}: {
  previousState?: ItemActivityDeviceStateRow;
  event: ItemActivityDeviceEvent;
}): ItemActivityDeviceStateRow {
  const newState = previousState ?? getDefaultItemActivityDeviceStateRow({ itemId: event.itemId });

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
  newState.udpatedAt = new Date().toISOString();
  return newState;
}
