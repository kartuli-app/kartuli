'use client';

import {
  addRxPlugin,
  createRxDatabase,
  type RxCollection,
  type RxDatabase,
  type RxJsonSchema,
} from 'rxdb/plugins/core';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { type ItemActivityStateRow, itemActivityStateRowSchema } from './item-activity-state-row';

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

    const collections = await db.addCollections({
      itemActivityState: {
        schema: (() => {
          const zodJsonSchema = zodToJsonSchema(itemActivityStateRowSchema) as unknown as {
            properties: Record<string, unknown>;
            required?: string[];
          };

          return {
            title: 'item activity state schema',
            version: 0,
            primaryKey: 'id',
            type: 'object',
            properties: zodJsonSchema.properties,
            required: zodJsonSchema.required ?? Object.keys(zodJsonSchema.properties),
          } as RxJsonSchema<ItemActivityStateRow>;
        })(),
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
