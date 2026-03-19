'use client';

import { useLiveQuery } from '@tanstack/react-db';
import { getDefaultItemActivityStateRow } from './item-activity-state-row';
import {
  type StudentItemActivityStateCollection,
  useStudentItemActivityStateCollection,
} from './use-item-activity-state-collection';

function StudentItemActivityStateDebugInner({
  collection,
}: Readonly<{
  collection: StudentItemActivityStateCollection;
}>) {
  const { data, isLoading, isError } = useLiveQuery(collection);
  console.info('🚀 ~ StudentItemActivityStateDebugInner ~ data:', data);

  const insertEvent = async ({
    itemId,
    eventType,
  }: {
    itemId: string;
    eventType: 'view' | 'fail' | 'success';
  }) => {
    const newRow = getDefaultItemActivityStateRow({ itemId });
    if (eventType === 'view') {
      newRow.viewCount++;
      newRow.firstViewAt = new Date().toISOString();
      newRow.lastViewAt = new Date().toISOString();
    } else if (eventType === 'fail') {
      newRow.failCount++;
      newRow.firstFailAt = new Date().toISOString();
      newRow.lastFailAt = new Date().toISOString();
    } else if (eventType === 'success') {
      newRow.successCount++;
      newRow.firstSuccessAt = new Date().toISOString();
      newRow.lastSuccessAt = new Date().toISOString();
    }
    console.info('🚀 ~ insertEvent ~ newRow:', newRow);
    return collection.insert(newRow);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => insertEvent({ itemId: 'letter-ani', eventType: 'view' })}
          className="rounded border px-3 py-2"
        >
          Insert Letter Ani VIEW event
        </button>
        <button
          type="button"
          onClick={() => insertEvent({ itemId: 'letter-ani', eventType: 'fail' })}
          className="rounded border px-3 py-2"
        >
          Insert Letter Ani FAIL event
        </button>
        <button
          type="button"
          onClick={() => insertEvent({ itemId: 'letter-ani', eventType: 'success' })}
          className="rounded border px-3 py-2"
        >
          Insert Letter Ani SUCCESS event
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

export function StudentItemActivityStateDebug() {
  const { collection, isLoading, isError, error } = useStudentItemActivityStateCollection();

  if (isLoading) {
    return <div>Loading RxDB activity collection...</div>;
  }

  if (isError || !collection) {
    return <pre className="rounded border p-4 text-sm">{String((error as Error).message)}</pre>;
  }

  return <StudentItemActivityStateDebugInner collection={collection} />;
}
