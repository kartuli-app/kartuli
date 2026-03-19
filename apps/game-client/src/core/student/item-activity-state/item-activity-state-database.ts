'use client';

import {
  addRxPlugin,
  createRxDatabase,
  type RxCollection,
  type RxDatabase,
} from 'rxdb/plugins/core';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import type { ItemActivityStateRow } from './item-activity-state-row';

type ItemActivityStateDatabaseState = {
  db: RxDatabase;
  rxCollection: RxCollection<ItemActivityStateRow>;
};

let dbPromise: Promise<ItemActivityStateDatabaseState> | undefined;
let devPluginAdded = false;

function assertIndexedDbAvailable() {
  if (globalThis.window === undefined) {
    throw new TypeError('💀 [item-activity-state-database] 💀 RxDB can only run in the browser.');
  }

  if (typeof indexedDB === 'undefined') {
    throw new TypeError(
      '💀 [item-activity-state-database] 💀 IndexedDB is not available in this environment.',
    );
  }
}

export async function getItemActivityStateDatabase(): Promise<ItemActivityStateDatabaseState> {
  assertIndexedDbAvailable();

  dbPromise ??= (async () => {
    if (process.env.NODE_ENV !== 'production' && !devPluginAdded) {
      addRxPlugin(RxDBDevModePlugin);
      devPluginAdded = true;
    }

    const storage = wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    });

    const db = await createRxDatabase({
      name: 'item-activity-state-db',
      storage,
      ignoreDuplicate: true,
    });
    console.info('💾 [item-activity-state-db] 💾 db created successfully');

    const hardcodedSchema = {
      title: 'item activity state schema',
      version: 0,
      primaryKey: 'id',
      type: 'object',
      properties: {
        id: {
          type: 'string',
          maxLength: 200,
        },
        ownerId: {
          type: 'string',
        },
        deviceId: {
          type: 'string',
        },
        itemId: {
          type: 'string',
        },
        viewCount: {
          type: 'number',
        },
        firstViewAt: {
          type: 'string',
        },
        lastViewAt: {
          type: 'string',
        },
        successCount: {
          type: 'number',
        },
        firstSuccessAt: {
          type: 'string',
        },
        lastSuccessAt: {
          type: 'string',
        },
        failCount: {
          type: 'number',
        },
        firstFailAt: {
          type: 'string',
        },
        lastFailAt: {
          type: 'string',
        },
        udpatedAt: {
          type: 'string',
        },
      },
      required: [
        'id',
        'ownerId',
        'deviceId',
        'itemId',
        'viewCount',
        'firstViewAt',
        'lastViewAt',
        'successCount',
        'firstSuccessAt',
        'lastSuccessAt',
        'failCount',
        'firstFailAt',
        'lastFailAt',
        'udpatedAt',
      ],
    };

    const collections = await db.addCollections({
      itemActivityState: {
        schema: hardcodedSchema,
      },
    });

    console.info('💾 [item-activity-state-db] 💾 collections created successfully');

    return {
      db,
      rxCollection: collections.itemActivityState,
    };
  })();

  return dbPromise;
}
