'use client';

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
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
import {
  type HomeLessonItemView,
  type HomeLessonView,
  type HomeModuleView,
  useHomeModulesView,
} from '@game-client/core/views/home/use-home-modules-view';
import clsx from 'clsx';

async function upsertItemActivityDeviceStateEvent({
  collection,
  itemId,
  eventType,
}: {
  collection: ItemActivityDeviceStatesCollection;
  itemId: string;
  eventType: 'view' | 'success' | 'fail';
}) {
  const { id: rowId } = getDefaultItemActivityDeviceStateRow({ itemId });

  // TanStack DB "manual sync" utilities require the collection to have
  // completed its initial sync and been marked `ready`.
  if (!collection.isReady()) {
    await collection.preload();
  }

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

async function addViewEventToItem({
  collection,
  itemId,
}: {
  collection: ItemActivityDeviceStatesCollection;
  itemId: string;
}) {
  await upsertItemActivityDeviceStateEvent({ collection, itemId, eventType: 'view' });
}

function ItemActivityButton({
  item,
  collection,
}: Readonly<{
  item: HomeLessonItemView;
  collection: ItemActivityDeviceStatesCollection;
}>) {
  const totalViewCount = item.activitySummary?.totalViewCount ?? 0;
  const totalSuccessCount = item.activitySummary?.totalSuccessCount ?? 0;
  const totalFailCount = item.activitySummary?.totalFailCount ?? 0;

  return (
    <button
      type="button"
      className="flex flex-col items-center gap-4 border p-4 rounded-lg bg-brand-neutral-100"
      onClick={() =>
        void addViewEventToItem({
          collection,
          itemId: item.id,
        })
      }
    >
      <h5 className="text-brand-neutral-500 text-5xl font-bold">{item.targetScript}</h5>
      <div className="flex flex-row items-center gap-4">
        <span className="text-brand-neutral-500 text-sm">👍{totalSuccessCount}</span>
        <span className="text-brand-neutral-500 text-sm">👀{totalViewCount}</span>
        <span className="text-brand-neutral-500 text-sm">👎{totalFailCount}</span>
      </div>
    </button>
  );
}

function LessonCard({
  lesson,
  collection,
}: Readonly<{ lesson: HomeLessonView; collection: ItemActivityDeviceStatesCollection }>) {
  return (
    <div className="flex flex-col gap-2 border p-4 rounded-lg bg-brand-neutral-50">
      <h4 className="text-brand-neutral-500 text-xl font-bold">{lesson.title}</h4>
      <div className="flex flex-row items-center gap-2">
        {lesson.items.map((item) => (
          <ItemActivityButton key={item.id} item={item} collection={collection} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({
  module,
  collection,
}: Readonly<{ module: HomeModuleView; collection: ItemActivityDeviceStatesCollection }>) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-brand-neutral-200 rounded-lg shadow-md bg-white">
      <h3 className="text-brand-primary-500 text-2xl font-bold">{module.title}</h3>
      {module.lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} collection={collection} />
      ))}
    </div>
  );
}

const useModulesList = () => {
  const locale = 'en';
  const ownerId = getOrCreateOwnerId();
  const contentRevision = '2026-03-20';
  const itemsDeviceActivityStatesCollection = useItemActivityDeviceStatesCollection({ ownerId });
  const { data, isLoading, isError } = useHomeModulesView({ locale, contentRevision, ownerId });

  return { data, isLoading, isError, itemsDeviceActivityStatesCollection };
};

export function NewModulesList() {
  const { data, isLoading, isError, itemsDeviceActivityStatesCollection } = useModulesList();

  if (isLoading) {
    return <div className={clsx('text-sm', 'text-brand-neutral-400')}>Loading home rows…</div>;
  }

  if (isError) {
    return <div className={clsx('text-sm', 'text-red-900')}>Could not load home rows.</div>;
  }

  return (
    <div className={clsx('flex flex-col gap-4')}>
      {data?.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          collection={itemsDeviceActivityStatesCollection}
        />
      ))}
    </div>
  );
}
