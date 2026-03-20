'use client';

import { type DBSchema, type IDBPDatabase, openDB } from 'idb';
import type { ItemActivityDeviceStateRow } from './item-activity-device-state';

export const DATABASE_NAME = 'item-activity-device-state-db';
export const STORE_NAME = 'item-activity-device-state';

interface ItemActivityDeviceStateDB extends DBSchema {
  [STORE_NAME]: {
    key: ItemActivityDeviceStateRow['id'];
    value: ItemActivityDeviceStateRow;
  };
}

let dbPromise: Promise<IDBPDatabase<ItemActivityDeviceStateDB>> | undefined;

function assertIndexedDbAvailable({ databaseName }: { databaseName: string }) {
  if (globalThis.window === undefined) {
    throw new TypeError(`💀 [${databaseName}] 💀 RxDB can only run in the browser.`);
  }

  if (typeof indexedDB === 'undefined') {
    throw new TypeError(`💀 [${databaseName}] 💀 IndexedDB is not available in this environment.`);
  }
}

export async function getItemActivityDeviceStateDatabase(): Promise<
  IDBPDatabase<ItemActivityDeviceStateDB>
> {
  assertIndexedDbAvailable({ databaseName: DATABASE_NAME });

  dbPromise ??= (async () => {
    const db = await openDB<ItemActivityDeviceStateDB>(DATABASE_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });
      },
    });

    console.info(`💾 [${DATABASE_NAME}] 💾 database created successfully`);
    return db;
  })();

  return dbPromise;
}

export async function getAllItemActivityDeviceStates() {
  const db = await getItemActivityDeviceStateDatabase();
  return db.getAll(STORE_NAME);
}
