import type { HomePageModuleView } from '@game-client/app/[language]/(home)/get-home-page-view-server';
import type { ItemActivitySummaryRow } from '@game-client/core/student/derived/item-activity-summary-collection/create-item-activity-summary-collection';
import clsx from 'clsx';
import { ModuleCardError } from './components/module-card-error';
import { ModuleCardWithLessons } from './components/module-card-with-lessons';

export function HomePageModulesListServer({
  homePageModules,
  summariesByItemId,
  addViewEventsForLessonItems,
}: Readonly<{
  homePageModules: HomePageModuleView[];
  summariesByItemId: Record<string, ItemActivitySummaryRow>;
  addViewEventsForLessonItems?: (itemIds: readonly string[]) => Promise<void>;
}>) {
  return (
    <div className={clsx('flex flex-col gap-brand-xlarge', 'mt-brand-xlarge')}>
      {homePageModules.length === 0 ? (
        <ModuleCardError title="No content found" message="No content found" />
      ) : null}
      {homePageModules.length > 0
        ? homePageModules.map((module) => (
            <ModuleCardWithLessons
              key={module.id}
              homePageModule={module}
              summariesByItemId={summariesByItemId}
              addViewEventsForLessonItems={addViewEventsForLessonItems}
            />
          ))
        : null}
    </div>
  );
}
