'use client';

import type {
  HomeLessonView,
  HomeLetterItemView,
  HomeModuleView,
  HomeWordItemView,
} from '@game-client/core/views/home/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';
import errorIllustration from '@game-client/images/illustrations/error.svg';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import clsx from 'clsx';
import { EyeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useModulesList } from './use-modules-list';

function ModuleCard({
  className,
  children,
}: Readonly<{ className?: string; children: React.ReactNode[] }>) {
  return <div className={clsx('flex flex-col gap-brand-regular', className)}>{children}</div>;
}

function ModuleCardTitle({ className, title }: Readonly<{ className: string; title: string }>) {
  return <div className={clsx('text-2xl font-semibold', 'text-center', className)}>{title}</div>;
}

function ModuleCardContent({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode[] | React.ReactNode;
}>) {
  return <div className={clsx('flex flex-col gap-brand-large', className)}>{children}</div>;
}

const lessonCardBaseClassnames = clsx(
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

const lessonCardSkeletonClassnames = clsx(
  //
  'bg-neutral-300',
  'border-neutral-400',
  'animate-pulse',
);

const lessonCardErrorClassnames = clsx(
  //
  'bg-red-200',
  'border-red-300',
  'text-red-800',
  //
  'items-center',
  'text-center',
);

const lessonCardWithImageClassnames = clsx(
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

const lessonCardWithContentClassnames = clsx(
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

function LessonCardTitle({ className, title }: Readonly<{ className?: string; title: string }>) {
  return <div className={clsx('text-2xl', 'font-bold', className)}>{title}</div>;
}

function ModuleCardSkeleton() {
  const { t } = useTranslation('common');
  return (
    <ModuleCard>
      <ModuleCardTitle className="text-brand-neutral-400 animate-pulse" title={t('loading')} />
      <ModuleCardContent>
        <div className={clsx(lessonCardBaseClassnames, lessonCardSkeletonClassnames)} />
        <div className={clsx(lessonCardBaseClassnames, lessonCardSkeletonClassnames)} />
        <div className={clsx(lessonCardBaseClassnames, lessonCardSkeletonClassnames)} />
      </ModuleCardContent>
    </ModuleCard>
  );
}

function ModuleCardError({
  title,
  message,
}: Readonly<{
  title: string;
  message: string;
}>) {
  return (
    <ModuleCard>
      <ModuleCardTitle className="text-red-900" title={title} />
      <ModuleCardContent>
        <div className={clsx(lessonCardBaseClassnames, lessonCardWithImageClassnames)}>
          <img src={errorIllustration.src} alt={message} className="w-full h-full object-contain" />
        </div>
        <div className={clsx(lessonCardBaseClassnames, lessonCardErrorClassnames)}>
          <LessonCardTitle title={message} />
        </div>
      </ModuleCardContent>
    </ModuleCard>
  );
}

function ModuleCardWithLessons({
  module,
  addViewEventsForLessonItems,
}: Readonly<{
  readonly module: HomeModuleView;
  addViewEventsForLessonItems: (itemIds: readonly string[]) => Promise<void>;
}>) {
  return (
    <ModuleCard key={module.id}>
      <ModuleCardTitle className="text-brand-primary-500" title={module.title} />
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
          {module.lessons.map((lesson) => (
            <LessonCardWithContent
              key={lesson.id}
              lesson={lesson}
              className=""
              addViewEventsForLessonItems={addViewEventsForLessonItems}
            />
          ))}
        </div>
      </ModuleCardContent>
    </ModuleCard>
  );
}

const LetterItemCard = ({
  item,
  className,
}: Readonly<{ item: HomeLetterItemView; className?: string; key: string }>) => {
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
}: Readonly<{ item: HomeWordItemView; className?: string; key: string }>) => {
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

function LessonCardWithContent({
  lesson,
  className,
  addViewEventsForLessonItems,
}: Readonly<{
  lesson: HomeLessonView;
  className?: string;
  addViewEventsForLessonItems: (itemIds: readonly string[]) => Promise<void>;
}>) {
  const lang = useLang();
  const { navigate } = useRouterContext();
  const onClick = () => {
    void addViewEventsForLessonItems(lesson.items.map((item) => item.id));
    navigate(`/${lang}/learn/${encodeURIComponent(lesson.id)}`);
  };
  const totalViewsCount = lesson.items.reduce(
    (acc, item) => acc + (item.activitySummary?.totalViewCount ?? 0),
    0,
  );
  const averageViewsCount = lesson.items.length > 0 ? totalViewsCount / lesson.items.length : 0;
  return (
    <button
      key={lesson.id}
      aria-label={lesson.title}
      type="button"
      tabIndex={0}
      onClick={onClick}
      className={clsx(
        lessonCardBaseClassnames,
        lessonCardWithContentClassnames,
        'relative',
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
        <span>{lesson.title}</span>
        <span className="text-base text-brand-neutral-50 flex items-center gap-brand-small">
          <EyeIcon className="w-5 h-5" />
          {averageViewsCount}
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
        {lesson.items.map((item) => {
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

export function ModulesList() {
  const { t } = useTranslation('common');
  const { data, isLoading, isError, addViewEventsForLessonItems } = useModulesList();

  return (
    <div className={clsx('flex flex-col gap-brand-xlarge', 'mt-brand-xlarge')}>
      {isLoading ? <ModuleCardSkeleton /> : null}
      {isError ? (
        <ModuleCardError title={`მძღნერი = ${t('shit')}`} message={t('errorLoadingContent')} />
      ) : null}
      {!isLoading && !isError && data?.length === 0 ? (
        <ModuleCardError title={`მძღნერი = ${t('shit')}`} message={t('noContentFound')} />
      ) : null}
      {!isLoading && !isError && data?.length && data.length > 0
        ? data.map((module) => (
            <ModuleCardWithLessons
              key={module.id}
              module={module}
              addViewEventsForLessonItems={addViewEventsForLessonItems}
            />
          ))
        : null}
    </div>
  );
}
