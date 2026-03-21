import { logger } from '@game-client/logging/dev-logger';

const OWNER_ID_STORAGE_KEY = 'kartuli.ownerId';

let cachedOwnerId: string | null = null;

export function getOrCreateOwnerId(): string {
  if (cachedOwnerId) {
    return cachedOwnerId;
  }

  if (globalThis.window === undefined) {
    throw new Error('💀 [owner-id] 💀 ownerId can only be used in the browser');
  }

  const existing = globalThis.window.localStorage.getItem(OWNER_ID_STORAGE_KEY);
  if (existing) {
    cachedOwnerId = existing;
    return existing;
  }

  const newOwnerId = crypto.randomUUID();
  globalThis.window.localStorage.setItem(OWNER_ID_STORAGE_KEY, newOwnerId);
  logger.log('identifiers', 'owner id created:', newOwnerId);
  cachedOwnerId = newOwnerId;
  return newOwnerId;
}
