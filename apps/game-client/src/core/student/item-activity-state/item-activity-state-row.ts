'use client';
import { z } from 'zod';
import { getOrCreateDeviceId } from '../identifiers/device-id';
import { getOrCreateOwnerId } from '../identifiers/owner-id';

export const itemActivityStateRowSchema = z
  .object({
    // primary key
    id: z.string().max(200), // ownerId + deviceId + itemId
    // for indexing / aggregation
    ownerId: z.string(), // getOrCreateOwnerId() (update when auth state changes)
    deviceId: z.string(), // getOrCreateDeviceId()
    itemId: z.string(),
    // view state
    viewCount: z.number(),
    firstViewAt: z.string().nullable(),
    lastViewAt: z.string().nullable(),
    // success state
    successCount: z.number(),
    firstSuccessAt: z.string().nullable(),
    lastSuccessAt: z.string().nullable(),
    // fail state
    failCount: z.number(),
    firstFailAt: z.string().nullable(),
    lastFailAt: z.string().nullable(),
    // last updated timestamp
    udpatedAt: z.string(),
  })
  // Keep parity with the previous hardcoded RxDB JSON schema (which allowed extra properties).
  .passthrough();

export type ItemActivityStateRow = z.infer<typeof itemActivityStateRowSchema>;

export function getDefaultItemActivityStateRow({
  itemId,
}: {
  itemId: string;
}): ItemActivityStateRow {
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
