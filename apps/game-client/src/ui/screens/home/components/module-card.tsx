import type { ItemActivitySummariesById } from '@game-client/student/item-activity-summary/item-activity-summaries-by-id';
import type { HomeModule } from '@game-client/ui/screens/home/view/home-view';
import clsx from 'clsx';
import { LessonCard } from './lesson-card';

export function ModuleCard({
  homeModule,
  ItemActivitySummariesById,
  addViewEventsForItemIds,
}: Readonly<{
  readonly homeModule: HomeModule;
  ItemActivitySummariesById: ItemActivitySummariesById;
  addViewEventsForItemIds?: (itemIds: readonly string[]) => Promise<void>;
}>) {
  const isSingleLessonModule = homeModule.lessons.length === 1;
  const areAllItemsLetters = homeModule.lessons.every((lesson) =>
    lesson.items.every((item) => item.type === 'letter'),
  );
  const fullWidthLessonCard = isSingleLessonModule && areAllItemsLetters;
  return (
    // card
    <div
      className={clsx(
        //
        'flex flex-col',
        'gap-ds1-spacing-regular',
      )}
    >
      {/* title */}
      <div
        className={clsx(
          //
          'text-2xl',
          'font-bold',
        )}
      >
        {homeModule.title}
      </div>
      {/* content */}
      <div
        className={clsx(
          'flex flex-col gap-ds1-spacing-large',
          //
          'grid',
          'grid-cols-1',
          'sm:grid-cols-2',
          'xl:grid-cols-3',
        )}
      >
        {homeModule.lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            homeLesson={lesson}
            isSingleLessonModule={isSingleLessonModule}
            ItemActivitySummariesById={ItemActivitySummariesById}
            addViewEventsForItemIds={addViewEventsForItemIds}
            className={clsx(
              //
              fullWidthLessonCard && 'sm:col-span-2 xl:col-span-3',
            )}
          />
        ))}
      </div>
    </div>
  );
}
