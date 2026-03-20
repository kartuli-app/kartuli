'use client';

import { useItemActivitySummaryCollection } from '@game-client/core/student/derived/item-activity-summary-collection/use-item-activity-summary-collection';
import type { ItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/create-item-activity-device-states-collection';
import {
  AddItemActivityDeviceEvent,
  getDefaultItemActivityDeviceStateRow,
  type ItemActivityDeviceStateRow,
} from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state';
import {
  getItemActivityDeviceStateDatabase,
  STORE_NAME,
} from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state-database';
import { useItemActivityDeviceStatesCollection } from '@game-client/core/student/device/item-activity-device-states-collection/use-item-activity-device-states-collection';
import { useLiveQuery } from '@tanstack/react-db';
import clsx from 'clsx';

async function upsertItemActivityState2Event({
  collection,
  itemId,
  eventType,
}: {
  collection: ItemActivityDeviceStatesCollection;
  itemId: string;
  eventType: 'view' | 'success' | 'fail';
}) {
  const { id: rowId } = getDefaultItemActivityDeviceStateRow({ itemId });

  // 1) Upsert in IndexedDB.
  const db = await getItemActivityDeviceStateDatabase();
  const previousState = await db.get(STORE_NAME, rowId);

  const nextState = AddItemActivityDeviceEvent({
    previousState: previousState ?? undefined,
    event: { itemId, eventType },
  });

  await db.put(STORE_NAME, nextState);

  // 2) Direct write into the TanStack DB collection to avoid refetch.
  // This updates the synced store immediately, which makes `useLiveQuery` re-render.
  collection.utils.writeUpsert(nextState as Partial<ItemActivityDeviceStateRow>);
}

async function addViewsTo5kItems({
  collection,
}: {
  collection: ItemActivityDeviceStatesCollection;
}) {
  const itemIds = Array.from({ length: 5000 }, (_, i) => `letter-debug-${i}`);
  for (const itemId of itemIds) {
    await upsertItemActivityState2Event({ collection, itemId, eventType: 'view' });
  }
}

export function NewModulesList() {
  const itemsDeviceActivityStatesCollection = useItemActivityDeviceStatesCollection();

  const {
    data: itemsDeviceActivityStates,
    isLoading: isLoadingDeviceActivityStates,
    isError: isErrorDeviceActivityStates,
  } = useLiveQuery(itemsDeviceActivityStatesCollection);
  console.info('🚀 ~ NewModulesList ~ itemsDeviceActivityStates:', itemsDeviceActivityStates);

  const itemsActivitySummaryCollection = useItemActivitySummaryCollection();
  const {
    data: itemsActivitySummary,
    isLoading: isLoadingSummary,
    isError: isErrorSummary,
  } = useLiveQuery(itemsActivitySummaryCollection);
  console.info('🚀 ~ NewModulesList ~ itemsActivitySummary:', itemsActivitySummary);

  if (isLoadingDeviceActivityStates || isLoadingSummary) {
    return <div className={clsx('text-sm', 'text-brand-neutral-400')}>Loading item activity…</div>;
  }

  if (isErrorDeviceActivityStates || isErrorSummary) {
    return <div className={clsx('text-sm', 'text-red-900')}>Could not load item activity.</div>;
  }

  const itemIds = ['letter-ani', 'letter-tom', 'letter-jerry', 'letter-spike', 'letter-tyke'];

  return (
    <section
      className={clsx(
        'flex flex-col gap-brand-regular',
        'rounded border border-brand-neutral-200 p-brand-large text-sm',
      )}
    >
      <h3 className={clsx('font-semibold', 'text-brand-neutral-800')}>Item activity (device)</h3>
      {itemsDeviceActivityStates?.length === 0 ? (
        <div className={clsx('flex flex-col gap-2')}>
          <p className="text-brand-neutral-500">No activity rows yet. Add one:</p>
        </div>
      ) : (
        <ul
          className={clsx('flex flex-col gap-1', 'font-mono text-xs overflow-y-auto max-h-[300px]')}
        >
          {itemsDeviceActivityStates?.map((row) => (
            <li key={row.id} className={clsx('flex flex-col gap-1')}>
              <div>
                {row.itemId}
                <span className="text-brand-neutral-500">
                  {' '}
                  · views {row.viewCount} · successes {row.successCount} · fails {row.failCount}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3 className={clsx('font-semibold', 'text-brand-neutral-800')}>Item activity (summary)</h3>
      {itemsActivitySummary?.length === 0 ? (
        <div className={clsx('flex flex-col gap-2')}>
          <p className="text-brand-neutral-500">No activity rows yet. Add one:</p>
        </div>
      ) : (
        <ul
          className={clsx('flex flex-col gap-1', 'font-mono text-xs overflow-y-auto max-h-[300px]')}
        >
          {itemsActivitySummary?.map((row) => (
            <li key={row.id} className={clsx('flex flex-col gap-1')}>
              <div>
                {row.itemId}
                <span className="text-brand-neutral-500">
                  {' '}
                  · total views {row.totalViewCount} · total successes {row.totalSuccessCount} ·
                  total fails {row.totalFailCount}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={clsx('flex gap-2 flex-wrap')}>
        <button
          type="button"
          className={clsx('rounded border px-3 py-1', 'text-xs')}
          disabled={isLoadingDeviceActivityStates || isErrorDeviceActivityStates}
          onClick={() =>
            void addViewsTo5kItems({ collection: itemsDeviceActivityStatesCollection })
          }
        >
          Add 1 view to 5k items
        </button>
      </div>
      {itemIds.map((itemId) => (
        <div key={itemId} className={clsx('flex gap-2 flex-wrap')}>
          <button
            type="button"
            className={clsx('rounded border px-3 py-1', 'text-xs')}
            disabled={isLoadingDeviceActivityStates || isErrorDeviceActivityStates}
            onClick={() =>
              void upsertItemActivityState2Event({
                collection: itemsDeviceActivityStatesCollection,
                itemId,
                eventType: 'view',
              })
            }
          >
            {itemId} VIEW
          </button>
          <button
            type="button"
            className={clsx('rounded border px-3 py-1', 'text-xs')}
            disabled={isLoadingDeviceActivityStates || isErrorDeviceActivityStates}
            onClick={() =>
              void upsertItemActivityState2Event({
                collection: itemsDeviceActivityStatesCollection,
                itemId,
                eventType: 'success',
              })
            }
          >
            {itemId} SUCCESS
          </button>
          <button
            type="button"
            className={clsx('rounded border px-3 py-1', 'text-xs')}
            disabled={isLoadingDeviceActivityStates || isErrorDeviceActivityStates}
            onClick={() =>
              void upsertItemActivityState2Event({
                collection: itemsDeviceActivityStatesCollection,
                itemId,
                eventType: 'fail',
              })
            }
          >
            {itemId} FAIL
          </button>
        </div>
      ))}
    </section>
  );
}
