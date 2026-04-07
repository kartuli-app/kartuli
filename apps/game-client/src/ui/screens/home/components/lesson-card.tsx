import type { ItemActivitySummariesById } from '@game-client/student/item-activity-summary/item-activity-summaries-by-id';
import type {
  HomeLesson,
  HomeLetterItem,
  HomeWordItem,
} from '@game-client/ui/screens/home/view/home-view';

import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LuEye } from 'react-icons/lu';

const LetterItemCard = ({
  item,
  className,
}: Readonly<{ item: HomeLetterItem; className?: string; key: string }>) => {
  return (
    <div
      key={item.id}
      className={clsx(
        //
        'text-brand-neutral-900',
        'bg-brand-neutral-100',
        'rounded-md',
        'px-brand-large',
        'py-brand-small',
        'flex',
        'items-center',
        'justify-center',
        'col-span-1',
        'rounded-md',
        className,
      )}
    >
      {item.type === 'letter' && (
        <div className="flex flex-col items-center justify-center gap-brand-small">
          <div className="text-4xl">{item.targetScript}</div>
          <div className="text-xl flex gap-0 text-slate-600">
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
}: Readonly<{ item: HomeWordItem; className?: string; key: string }>) => {
  return (
    <div
      key={item.id}
      className={clsx(
        //
        'text-brand-neutral-900',
        'bg-brand-neutral-100',
        'rounded-md',
        'px-brand-large',
        'py-brand-small',
        'flex',
        'items-center',
        'justify-center',
        'col-span-6',
        'rounded-md',
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

const useAverageViewsCount = (
  itemIds: readonly string[],
  ItemActivitySummariesById: ItemActivitySummariesById,
) => {
  const averageViewsCount = useMemo(() => {
    if (itemIds.length === 0) {
      return 0;
    }
    const totalViewsCount = itemIds.reduce<number>((acc, itemId) => {
      return acc + (ItemActivitySummariesById[itemId]?.totalViewCount ?? 0);
    }, 0);
    return Math.round((totalViewsCount / itemIds.length) * 10) / 10;
  }, [itemIds, ItemActivitySummariesById]);
  const showAverageViewsCount = useMemo(() => {
    return Object.keys(ItemActivitySummariesById).length > 0;
  }, [ItemActivitySummariesById]);
  return { averageViewsCount, showAverageViewsCount };
};

const useLessonItems = (homeLesson: HomeLesson) => {
  let itemIds: string[] = [];
  let areAllItemsLetters: boolean = true;
  if (homeLesson.items.length > 0) {
    itemIds = homeLesson.items.map((item) => {
      if (item.type !== 'letter') {
        areAllItemsLetters = false;
      }
      return item.id;
    });
  }
  return { itemIds, areAllItemsLetters };
};

export function LessonCard({
  homeLesson,
  className,
  isSingleLessonModule,
  ItemActivitySummariesById,
  addViewEventsForItemIds,
}: Readonly<{
  homeLesson: HomeLesson;
  className?: string;
  isSingleLessonModule: boolean;
  ItemActivitySummariesById: ItemActivitySummariesById;
  addViewEventsForItemIds?: (itemIds: readonly string[]) => Promise<void>;
}>) {
  const { i18n } = useTranslation('common');
  const currentLocale = i18n.resolvedLanguage;
  const { itemIds, areAllItemsLetters } = useLessonItems(homeLesson);
  const onClick = () => {
    void addViewEventsForItemIds?.(itemIds);
  };
  const { averageViewsCount, showAverageViewsCount } = useAverageViewsCount(
    itemIds,
    ItemActivitySummariesById,
  );
  return (
    <Link
      href={`/${currentLocale}/learn/`}
      key={homeLesson.id}
      aria-label={homeLesson.title}
      onClick={onClick}
      className={clsx(
        //
        'flex flex-col',
        'justify-start',
        //
        'p-brand-large',
        'gap-brand-large',
        //
        'bg-white',
        'w-full',
        'rounded-lg',
        'border',
        //
        'border-slate-200',
        'hover:border-slate-300',
        //
        'shadow-sm',
        'hover:shadow-md',
        //
        'cursor-pointer',
        'group',
        //
        className,
      )}
    >
      {/* card header (title and views count) */}
      <div
        className={clsx(
          //
          'flex justify-between',
        )}
      >
        <div className="text-xl font-bold group-hover:underline">{homeLesson.title}</div>
        <div className="text-base text-brand-neutral-50 flex items-center gap-brand-small">
          {showAverageViewsCount ? (
            <>
              <LuEye className="w-4 h-4" />
              <span className=" text-sm flex items-center justify-start">{averageViewsCount}</span>
            </>
          ) : null}
        </div>
      </div>
      {/* card body (items) */}
      <div
        className={clsx(
          //
          areAllItemsLetters ? 'gap-brand-regular' : 'gap-brand-large',
          'w-full',
          'grid grid-cols-3',
          isSingleLessonModule && areAllItemsLetters && 'grid-cols-6',
        )}
      >
        {homeLesson.items.map((item) => {
          if (item.type === 'letter') {
            return <LetterItemCard key={item.id} item={item} className="" />;
          }
          if (item.type === 'word') {
            return <WordItemCard key={item.id} item={item} className="" />;
          }
          return null;
        })}
      </div>
    </Link>
  );
}
