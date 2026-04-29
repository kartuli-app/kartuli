import type { HomeModule } from '@game-client/ui/screens/home/view/home-view';
import clsx from 'clsx';
import { LessonCard } from './lesson-card';

export function ModuleCard({
  homeModule,
}: Readonly<{
  readonly homeModule: HomeModule;
}>) {
  const isSingleLessonModule = homeModule.lessons.length === 1;
  const areAllItemsLetters = homeModule.lessons.every((lesson) =>
    lesson.items.every((item) => item.type === 'letter'),
  );
  if (!areAllItemsLetters) {
    return null;
  }
  return (
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
      {/* // card */}
      <div
        className={clsx(
          //
          'flex flex-col',
          'gap-ds1-spacing-regular',
          'border border-ds1-color-text-200',
          'shadow-sm',
          'rounded-md',
          'p-ds1-spacing-large',
          'bg-white',
        )}
      >
        {/* content */}
        <div
          className={clsx(
            'flex flex-col',
            'gap-ds1-spacing-large',
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
              className={clsx(isSingleLessonModule && 'sm:col-span-2 xl:col-span-3')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
