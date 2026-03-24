import type {
  HomePageLessonView,
  HomePageLetterItemView,
  HomePageWordItemView,
} from '@game-client/app/[language]/(home)/get-home-page-view-server';
import type { ItemActivitySummaryRow } from '@game-client/core/student/derived/item-activity-summary-collection/create-item-activity-summary-collection';

import clsx from 'clsx';
import { EyeIcon } from 'lucide-react';
import { useMemo } from 'react';

export const lessonCardBaseClassnames = clsx(
  //
  'min-h-40',
  'p-2',
  'justify-start',
  //
  'px-brand-large',
  'gap-brand-regular',
  //
  'flex flex-col',
  //
  'rounded-lg',
  'shadow-md',
  'border',
  //
);

export const lessonCardErrorClassnames = clsx(
  //
  'bg-red-200',
  'border-red-300',
  'text-red-800',
  //
  'items-center',
  'text-center',
);

export const lessonCardWithImageClassnames = clsx(
  //
  // height = 2 skeletons + gap (40 + gap-brand-large)
  'h-[calc((var(--spacing)*40*2)+(var(--spacing-brand-large)))]',
  //
  'p-brand-large',
  //
  'border-transparent',
  'bg-transparent',
  //
  'shadow-none',
);

export const lessonCardWithContentClassnames = clsx(
  //
  'text-brand-primary-50',
  'bg-brand-primary-400',
  'border-brand-primary-500',
  //
  'hover:bg-brand-primary-500',
  'active:bg-brand-primary-500',
  'active:scale-105',
  //
  'cursor-pointer',
  //
  'text-left', // this is to override default button text alignment
);

export function LessonCardTitle({
  className,
  title,
}: Readonly<{ className?: string; title: string }>) {
  return <div className={clsx('text-2xl', 'font-bold', className)}>{title}</div>;
}

const LetterItemCard = ({
  item,
  className,
}: Readonly<{ item: HomePageLetterItemView; className?: string; key: string }>) => {
  return (
    <div
      key={item.id}
      className={clsx(
        //
        'text-brand-neutral-900',
        'bg-brand-neutral-100',
        'shadow-md',
        'rounded-lg',
        'min-h-22',
        'flex',
        'items-center',
        'justify-center',
        'col-span-1',
        className,
      )}
    >
      {item.type === 'letter' && (
        <div className="flex flex-col items-center justify-center gap-brand-small">
          <div className="text-4xl">{item.targetScript}</div>
          <div className="text-xl flex gap-brand-xsmall text-brand-neutral-700">
            <span className="text-orange-500">[</span>
            {item.transliteration}
            <span className="text-orange-500">]</span>
          </div>
        </div>
      )}
    </div>
  );
};

const WordItemCard = ({
  item,
  className,
}: Readonly<{ item: HomePageWordItemView; className?: string; key: string }>) => {
  return (
    <div
      key={item.id}
      className={clsx(
        //
        'text-brand-neutral-900',
        'bg-brand-neutral-100',
        'shadow-md',
        'rounded-lg',
        'min-h-22',
        'h-auto',
        'flex',
        'items-center',
        'justify-center',
        'col-span-6',
        className,
      )}
    >
      {item.type === 'word' && (
        <div className="flex flex-col items-center justify-center gap-brand-small">
          <div className="text-3xl">{item.targetScript}</div>
          <div className="text-2xl flex gap-brand-xsmall text-brand-neutral-700">
            <span className="text-orange-500">[</span>
            {item.transliteration}
            <span className="text-orange-500">]</span>
          </div>
          <div className="text-xl flex gap-brand-xsmall text-brand-neutral-700">
            {item.translation}
          </div>
        </div>
      )}
    </div>
  );
};

export function LessonCardWithContent({
  homePageLesson,
  className,
  isSingleLessonModule,
  summariesByItemId,
  addViewEventsForLessonItems,
}: Readonly<{
  homePageLesson: HomePageLessonView;
  className?: string;
  isSingleLessonModule: boolean;
  summariesByItemId: Record<string, ItemActivitySummaryRow>;
  addViewEventsForLessonItems?: (itemIds: readonly string[]) => Promise<void>;
}>) {
  const onClick = () => {
    void addViewEventsForLessonItems?.(homePageLesson.items.map((item) => item.id));
  };
  const areAllItemsLetters = homePageLesson.items.every((item) => item.type === 'letter');
  const averageViewsCount = useMemo(() => {
    const totalViewsCount = homePageLesson.items.reduce((acc, item) => {
      return acc + (summariesByItemId[item.id]?.totalViewCount ?? 0);
    }, 0);
    return Math.round((totalViewsCount / homePageLesson.items.length) * 10) / 10;
  }, [homePageLesson.items, summariesByItemId]);
  const showAverageViewsCount = useMemo(() => {
    return Object.keys(summariesByItemId).length > 0;
  }, [summariesByItemId]);
  return (
    <button
      key={homePageLesson.id}
      aria-label={homePageLesson.title}
      type="button"
      tabIndex={0}
      onClick={onClick}
      className={clsx(
        lessonCardBaseClassnames,
        lessonCardWithContentClassnames,
        'relative',
        isSingleLessonModule && areAllItemsLetters && 'sm:col-span-2 lg:col-span-3',
        className,
      )}
    >
      <div
        className={clsx(
          //
          'text-2xl',
          'font-bold',
          'flex justify-between',
        )}
      >
        <span>{homePageLesson.title}</span>
        <span className="text-base text-brand-neutral-50 flex items-center gap-brand-small">
          {showAverageViewsCount ? (
            <>
              <EyeIcon className="w-4 h-4" />
              <span className=" text-sm flex items-center justify-start">{averageViewsCount}</span>
            </>
          ) : null}
        </span>
      </div>
      <div
        className={clsx(
          //
          'gap-brand-small',
          'w-full',
          'grid grid-cols-6',
        )}
      >
        {homePageLesson.items.map((item) => {
          if (item.type === 'letter') {
            return <LetterItemCard key={item.id} item={item} className="" />;
          }
          if (item.type === 'word') {
            return <WordItemCard key={item.id} item={item} className="" />;
          }
          return null;
        })}
      </div>
    </button>
  );
}
