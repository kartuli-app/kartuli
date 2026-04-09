'use client';

import ItemActivitySummariesLiveQuery from '@game-client/student/item-activity-summary/item-acitivty-summaries-live-query';
import type { ItemActivitySummariesById } from '@game-client/student/item-activity-summary/item-activity-summaries-by-id';
import type { HomeModule } from '@game-client/ui/screens/home/view/home-view';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { ModuleCard } from './module-card';

export function ModulesList({ homeModules }: Readonly<{ homeModules: HomeModule[] }>) {
  const [mounted, setMounted] = useState(false);
  const [ItemActivitySummariesById, setItemActivitySummariesById] =
    useState<ItemActivitySummariesById>(() => ({}));

  useEffect(() => {
    setMounted(true);
  }, []);

  const [addViewEventsForItemIds, setAddViewEventsForItemIds] = useState<
    ((itemIds: readonly string[]) => Promise<void>) | undefined
  >(() => undefined);

  const onAddViewEventsForItemIdsReady = useCallback(
    (fn: (itemIds: readonly string[]) => Promise<void>) => {
      setAddViewEventsForItemIds(() => fn);
    },
    [],
  );

  const onItemActivitySummariesByIdReady = useCallback((next: ItemActivitySummariesById) => {
    setItemActivitySummariesById(next);
  }, []);

  return (
    <>
      {mounted ? (
        <ItemActivitySummariesLiveQuery
          onItemActivitySummariesByIdReady={onItemActivitySummariesByIdReady}
          onAddViewEventsForItemIdsReady={onAddViewEventsForItemIdsReady}
        />
      ) : null}
      <div
        className={clsx(
          //
          'flex flex-col',
          'gap-brand-xlarge',
          'w-full',
        )}
      >
        {homeModules.map((module) => (
          <ModuleCard
            key={module.id}
            homeModule={module}
            ItemActivitySummariesById={ItemActivitySummariesById}
            addViewEventsForItemIds={addViewEventsForItemIds}
          />
        ))}
      </div>
    </>
  );
}
