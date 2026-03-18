'use client';

import { createCollection } from '@tanstack/db';
import { useLiveQuery } from '@tanstack/react-db';
import { rxdbCollectionOptions } from '@tanstack/rxdb-db-collection';
import { useEffect, useState } from 'react';

import {
  addRxPlugin,
  createRxDatabase,
  type RxCollection,
  type RxDatabase,
} from 'rxdb/plugins/core';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

type ItemActivityEventRow = {
  id: string;
  timestamp: number;
  itemId: string;
  eventType: 'view' | 'click' | 'complete';
};

type ItemActivityEventsDatabaseState = {
  db: RxDatabase;
  rxCollection: RxCollection<ItemActivityEventRow>;
};

let dbPromise: Promise<ItemActivityEventsDatabaseState> | undefined;
let devPluginAdded = false;

function assertIndexedDbAvailable() {
  if (globalThis.window === undefined) {
    throw new TypeError('RxDB can only run in the browser.');
  }

  if (typeof indexedDB === 'undefined') {
    throw new TypeError('IndexedDB is not available in this environment.');
  }
}

async function getItemActivityEventsDatabase(): Promise<ItemActivityEventsDatabaseState> {
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
      name: 'item-activity-events-debug-db',
      storage,
      ignoreDuplicate: true,
    });

    const collections = await db.addCollections({
      itemActivityEvents: {
        schema: {
          title: 'item activity events schema',
          version: 0,
          primaryKey: 'id',
          type: 'object',
          properties: {
            id: {
              type: 'string',
              maxLength: 100,
            },
            itemId: {
              type: 'string',
            },
            eventType: {
              type: 'string',
              enum: ['view', 'click', 'complete'],
            },
            timestamp: {
              type: 'number',
            },
          },
          required: ['id', 'itemId', 'eventType', 'timestamp'],
        },
      },
    });

    return {
      db,
      rxCollection: collections.itemActivityEvents,
    };
  })();

  return dbPromise;
}

async function createStudentItemActivityEventsCollection() {
  const { rxCollection } = await getItemActivityEventsDatabase();

  return createCollection(
    rxdbCollectionOptions<ItemActivityEventRow>({
      rxCollection,
      startSync: true,
    }),
  );
}

type StudentItemActivityEventsCollection = Awaited<
  ReturnType<typeof createStudentItemActivityEventsCollection>
>;

let tanstackCollectionPromise: Promise<StudentItemActivityEventsCollection> | undefined;

async function getStudentItemActivityEventsCollection(): Promise<StudentItemActivityEventsCollection> {
  tanstackCollectionPromise ??= createStudentItemActivityEventsCollection();

  return tanstackCollectionPromise;
}

function useStudentItemActivityEventsCollection() {
  const [collection, setCollection] = useState<StudentItemActivityEventsCollection | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    getStudentItemActivityEventsCollection()
      .then((nextCollection) => {
        if (!cancelled) {
          setCollection(nextCollection);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    collection,
    isLoading: collection === null && error === null,
    isError: error !== null,
    error,
  };
}

function StudentItemActivityEventsDebugInner({
  collection,
}: Readonly<{
  collection: StudentItemActivityEventsCollection;
}>) {
  const { data, isLoading, isError } = useLiveQuery(collection);

  const insertEvent = async (eventType: ItemActivityEventRow['eventType']) => {
    return collection.insert({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      itemId: 'letter-ani',
      eventType,
    });
  };

  const insert5000ViewEvents = async () => {
    const events = Array.from({ length: 5000 }, () => {
      const newEvent = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        itemId: 'letter-ani',
        eventType: 'view',
      } as ItemActivityEventRow;
      collection.insert(newEvent);
      return newEvent;
    });
    return events;
  };

  const clearAll = async () => {
    const { rxCollection } = await getItemActivityEventsDatabase();
    const docs = await rxCollection.find().exec();
    await Promise.all(docs.map((doc) => doc.remove()));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => insertEvent('view')}
          className="rounded border px-3 py-2"
        >
          Insert VIEW event
        </button>

        <button
          type="button"
          onClick={() => insert5000ViewEvents()}
          className="rounded border px-3 py-2"
        >
          Insert 5000 VIEW events
        </button>

        <button
          type="button"
          onClick={() => insertEvent('click')}
          className="rounded border px-3 py-2"
        >
          Insert CLICK event
        </button>

        <button
          type="button"
          onClick={() => insertEvent('complete')}
          className="rounded border px-3 py-2"
        >
          Insert COMPLETE event
        </button>

        <button type="button" onClick={clearAll} className="rounded border px-3 py-2">
          Clear all
        </button>
      </div>

      <div>
        <div>Collection live query loading: {String(isLoading)}</div>
        <div>Collection live query error: {String(isError)}</div>
        <div>Rows count: {data?.length ?? 0}</div>
      </div>

      <pre className="overflow-auto rounded border p-4 text-sm max-h-[500px]">
        {JSON.stringify(data ?? [], null, 2)}
      </pre>
    </div>
  );
}

export function StudentItemActivityEventsDebug() {
  const { collection, isLoading, isError, error } = useStudentItemActivityEventsCollection();

  if (isLoading) {
    return <div>Loading RxDB activity collection...</div>;
  }

  if (isError || !collection) {
    return <pre className="rounded border p-4 text-sm">{String(error)}</pre>;
  }

  return <StudentItemActivityEventsDebugInner collection={collection} />;
}
