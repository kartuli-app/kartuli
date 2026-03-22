'use client';

import { logger } from '@game-client/logging/dev-logger';
import {
  type DBSchema,
  type IDBPDatabase,
  type IDBPTransaction,
  openDB,
  type StoreNames,
  unwrap,
} from 'idb';
import type { ItemActivityDeviceStateRow } from './item-activity-device-state';

export const DATABASE_NAME = 'item-activity-device-state-db';
export const STORE_NAME = 'item-activity-device-state';

/** Bump when schema or stored row shape changes (see `upgrade`). */
const DATABASE_VERSION = 2;

interface ItemActivityDeviceStateDB extends DBSchema {
  [STORE_NAME]: {
    key: ItemActivityDeviceStateRow['id'];
    value: ItemActivityDeviceStateRow;
    indexes: {
      ownerId: string;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<ItemActivityDeviceStateDB> | null> | undefined;

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
 * v1 rows used misspelled `udpatedAt`; rename to `updatedAt` in place.
 * Must stay synchronous (cursor `onsuccess` chain): idb does not await async
 * `upgrade` work, and the version-change transaction must not close early.
 */
function migrateUdpatedAtToUpdatedAt(
  wrappedTransaction: IDBPTransaction<
    ItemActivityDeviceStateDB,
    StoreNames<ItemActivityDeviceStateDB>[],
    'versionchange'
  >,
): void {
  const transaction = unwrap(wrappedTransaction);
  const store = transaction.objectStore(STORE_NAME);
  const request = store.openCursor();
  request.onsuccess = () => {
    const cursor = request.result;
    if (!cursor) {
      return;
    }
    const row = cursor.value as Record<string, unknown>;
    if (typeof row.udpatedAt === 'string') {
      const { udpatedAt, ...rest } = row;
      cursor.update({ ...rest, updatedAt: udpatedAt } as ItemActivityDeviceStateRow);
    }
    cursor.continue();
  };
}

/**
 * Opens the activity-state database once per page session, or returns `null` if
 * IndexedDB is missing or `openDB` fails. The cached promise never rejects.
 */
export async function getItemActivityDeviceStateDatabase(): Promise<IDBPDatabase<ItemActivityDeviceStateDB> | null> {
  if (globalThis.window === undefined) {
    return null;
  }

  if (typeof indexedDB === 'undefined') {
    logIndexedDbUnavailable('IndexedDB is not available in this environment.');
    dbPromise ??= Promise.resolve(null);
    return dbPromise;
  }

  dbPromise ??= (async (): Promise<IDBPDatabase<ItemActivityDeviceStateDB> | null> => {
    try {
      const db = await openDB<ItemActivityDeviceStateDB>(DATABASE_NAME, DATABASE_VERSION, {
        upgrade(db, oldVersion, _newVersion, transaction) {
          if (oldVersion < 1) {
            const store = db.createObjectStore(STORE_NAME, {
              keyPath: 'id',
            });
            store.createIndex('ownerId', 'ownerId');
          }
          if (oldVersion < 2) {
            migrateUdpatedAtToUpdatedAt(transaction);
          }
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

export async function getAllItemActivityDeviceStates() {
  const db = await getItemActivityDeviceStateDatabase();
  if (!db) {
    return [];
  }
  return db.getAll(STORE_NAME);
}

export async function getAllItemActivityDeviceStatesByOwnerId(ownerId: string) {
  const db = await getItemActivityDeviceStateDatabase();
  if (!db) {
    return [];
  }
  return db.getAllFromIndex(STORE_NAME, 'ownerId', ownerId);
}
