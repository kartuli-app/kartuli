'use client';

import { logger } from '@game-client/logging/dev-logger';
import { type DBSchema, type IDBPDatabase, openDB } from 'idb';
import type { ItemActivityState } from './item-activity-state';

export const DATABASE_NAME = 'item-activity-state-db';
export const STORE_NAME = 'item-activity-state';

const DATABASE_VERSION = 1;

interface ItemActivityStateDB extends DBSchema {
  [STORE_NAME]: {
    key: ItemActivityState['id'];
    value: ItemActivityState;
    indexes: {
      ownerId: string;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<ItemActivityStateDB> | null> | undefined;

let hasLoggedIndexedDbUnavailable = false;

function logIndexedDbUnavailable(reason: string, error?: unknown): void {
  if (hasLoggedIndexedDbUnavailable) {
    return;
  }
  hasLoggedIndexedDbUnavailable = true;
  if (error === undefined) {
    logger.error('database', `${DATABASE_NAME}: ${reason}`);
  } else {
    logger.error('database', `${DATABASE_NAME}: ${reason}`, error);
  }
}

/**
 * Opens the activity-state database once per page session, or returns `null` if
 * IndexedDB is missing or `openDB` fails. The cached promise never rejects.
 */
export async function getItemActivityStateDatabase(): Promise<IDBPDatabase<ItemActivityStateDB> | null> {
  if (globalThis.window === undefined) {
    return null;
  }

  if (typeof indexedDB === 'undefined') {
    logIndexedDbUnavailable('IndexedDB is not available in this environment.');
    dbPromise ??= Promise.resolve(null);
    return dbPromise;
  }

  dbPromise ??= (async (): Promise<IDBPDatabase<ItemActivityStateDB> | null> => {
    try {
      const db = await openDB<ItemActivityStateDB>(DATABASE_NAME, DATABASE_VERSION, {
        upgrade(db) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
          });
          store.createIndex('ownerId', 'ownerId');
        },
      });

      logger.log('database', `${DATABASE_NAME}: database created successfully`);
      return db;
    } catch (error) {
      logIndexedDbUnavailable('Failed to open IndexedDB; activity state will not persist.', error);
      return null;
    }
  })();

  return dbPromise;
}

export async function getAllItemActivityStates() {
  const db = await getItemActivityStateDatabase();
  if (!db) {
    return [];
  }
  return db.getAll(STORE_NAME);
}

export async function getAllItemActivityStatesByOwnerId(ownerId: string) {
  const db = await getItemActivityStateDatabase();
  if (!db) {
    return [];
  }
  return db.getAllFromIndex(STORE_NAME, 'ownerId', ownerId);
}
