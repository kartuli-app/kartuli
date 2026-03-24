import type { HomePageModuleView } from '@game-client/app/[language]/(home)/get-home-page-view-server';
import type { ItemActivitySummaryRow } from '@game-client/core/student/derived/item-activity-summary-collection/create-item-activity-summary-collection';
import {
  ModuleCard,
  ModuleCardContent,
  ModuleCardTitle,
} from '@game-client/screens/home-page-client/components/module-card';
import clsx from 'clsx';
import { LessonCardWithContent } from './lesson-card';

export function ModuleCardWithLessons({
  homePageModule,
  summariesByItemId,
  addViewEventsForLessonItems,
}: Readonly<{
  readonly homePageModule: HomePageModuleView;
  summariesByItemId: Record<string, ItemActivitySummaryRow>;
  addViewEventsForLessonItems?: (itemIds: readonly string[]) => Promise<void>;
}>) {
  const isSingleLessonModule = homePageModule.lessons.length === 1;
  return (
    <ModuleCard key={homePageModule.id}>
      <ModuleCardTitle className="text-brand-primary-500" title={homePageModule.title} />
      <ModuleCardContent>
        <div
          className={clsx(
            //
            'grid',
            'grid-cols-1',
            'sm:grid-cols-2',
            'lg:grid-cols-3',
            'gap-brand-large',
          )}
        >
          {homePageModule.lessons.map((lesson) => (
            <LessonCardWithContent
              key={lesson.id}
              homePageLesson={lesson}
              className=""
              isSingleLessonModule={isSingleLessonModule}
              summariesByItemId={summariesByItemId}
              addViewEventsForLessonItems={addViewEventsForLessonItems}
            />
          ))}
        </div>
      </ModuleCardContent>
    </ModuleCard>
  );
}
