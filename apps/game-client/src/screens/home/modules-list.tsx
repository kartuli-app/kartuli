'use client';

import type {
  HomeLessonView,
  HomeModuleView,
} from '@game-client/core/views/home/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';
import errorIllustration from '@game-client/images/illustrations/error.svg';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import clsx from 'clsx';
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
  'h-40',
  'justify-center',
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
  addViewEventToItem,
}: Readonly<{
  readonly module: HomeModuleView;
  addViewEventToItem: (itemId: string) => Promise<void>;
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
              addViewEventToItem={addViewEventToItem}
            />
          ))}
        </div>
      </ModuleCardContent>
    </ModuleCard>
  );
}

function LessonCardWithContent({
  lesson,
  className,
  addViewEventToItem,
}: Readonly<{
  lesson: HomeLessonView;
  className?: string;
  addViewEventToItem: (itemId: string) => Promise<void>;
}>) {
  const lang = useLang();
  const { navigate } = useRouterContext();
  const onClick = () => {
    lesson.items.forEach((item) => {
      void addViewEventToItem(item.id);
    });
    navigate(`/${lang}/learn/${encodeURIComponent(lesson.id)}`);
  };
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
        'group',
        className,
      )}
    >
      <div
        className={clsx(
          //
          'text-2xl',
          'font-bold',
        )}
      >
        {lesson.title}
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
          const viewsWcount = item.activitySummary?.totalViewCount ?? 0;
          return (
            <div
              key={item.id}
              className={clsx(
                //
                'text-brand-neutral-900',
                'bg-brand-neutral-100',
                'shadow-md',
                'rounded-lg',
                'h-22',
                'flex',
                'items-center',
                'justify-center',
                'relative',
              )}
            >
              <div
                className={clsx(
                  //
                  'absolute bottom-0 left-0 top-0 right-0',
                  'rounded-lg',
                  'text-sm text-center items-center justify-center bg-white flex flex-col',
                  'group-hover:opacity-100 opacity-0 transition-opacity',
                )}
              >
                <div className="text-2xl">👀</div>
                <div className="text-xl">{viewsWcount}</div>
              </div>
              {item.type === 'letter' && (
                <div className="flex flex-col items-center justify-center gap-brand-small">
                  <div className="text-4xl">{item.targetScript}</div>
                  <div className="text-xl flex gap-brand-xsmall">
                    <span className="text-orange-500">[</span>
                    {item.transliteration}
                    <span className="text-orange-500">]</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </button>
  );
}

export function ModulesList() {
  const { t } = useTranslation('common');
  const { data, isLoading, isError, addViewEventToItem } = useModulesList();

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
              addViewEventToItem={addViewEventToItem}
            />
          ))
        : null}
    </div>
  );
}
