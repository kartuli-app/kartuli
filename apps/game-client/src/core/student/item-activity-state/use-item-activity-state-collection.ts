'use client';

import { createCollection } from '@tanstack/db';
import { rxdbCollectionOptions } from '@tanstack/rxdb-db-collection';
import { useEffect, useState } from 'react';
import { getItemActivityStateDatabase } from './item-activity-state-database';
import type { ItemActivityStateRow } from './item-activity-state-row';

async function createStudentItemActivityStateCollection() {
  const { rxCollection } = await getItemActivityStateDatabase();

  return createCollection(
    rxdbCollectionOptions<ItemActivityStateRow>({
      rxCollection,
      startSync: true,
    }),
  );
}

export type StudentItemActivityStateCollection = Awaited<
  ReturnType<typeof createStudentItemActivityStateCollection>
>;

let tanstackCollectionPromise: Promise<StudentItemActivityStateCollection> | undefined;

async function getStudentItemActivityStateCollection(): Promise<StudentItemActivityStateCollection> {
  tanstackCollectionPromise ??= createStudentItemActivityStateCollection();

  return tanstackCollectionPromise;
}

export function useStudentItemActivityStateCollection() {
  const [collection, setCollection] = useState<StudentItemActivityStateCollection | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    getStudentItemActivityStateCollection()
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
