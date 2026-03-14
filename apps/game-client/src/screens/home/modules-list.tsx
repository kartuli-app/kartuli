'use client';

import {
  getDefaultRepository,
  getHomeModulesView,
  type HomeLessonCardView,
  type HomeModuleView,
} from '@game-client/core/library';
import { useLang } from '@game-client/i18n/use-lang';
import errorIllustration from '@game-client/images/illustrations/error.svg';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

function ModuleCardWithLessons({ module }: { readonly module: HomeModuleView }) {
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
            <LessonCardWithContent key={lesson.id} lesson={lesson} className="" />
          ))}
        </div>
      </ModuleCardContent>
    </ModuleCard>
  );
}

function LessonCardWithContent({
  lesson,
  className,
}: Readonly<{
  lesson: HomeLessonCardView;
  className?: string;
}>) {
  const lang = useLang();
  const { navigate } = useRouterContext();
  return (
    <button
      key={lesson.id}
      aria-label={lesson.title}
      type="button"
      tabIndex={0}
      onClick={() => navigate(`/${lang}/learn/${encodeURIComponent(lesson.id)}`)}
      className={clsx(lessonCardBaseClassnames, lessonCardWithContentClassnames, className)}
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
        {lesson.previewItems.map((previewItem) => (
          <div
            key={previewItem.id}
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
            )}
          >
            {previewItem.type === 'letter' && (
              <div className="flex flex-col items-center justify-center gap-brand-small">
                <div className="text-4xl">{previewItem.text}</div>
                <div className="text-xl flex gap-brand-xsmall">
                  <span className="text-orange-500">[</span>
                  {previewItem.transliteration}
                  <span className="text-orange-500">]</span>
                </div>
              </div>
            )}
            {previewItem.type === 'word' && (
              <img
                src={previewItem.imageUrl}
                alt={previewItem.alt}
                className="size-10 object-contain"
              />
            )}
            {previewItem.type === 'rule' && (
              <div className="text-sm truncate px-1">{previewItem.label}</div>
            )}
          </div>
        ))}
      </div>
    </button>
  );
}

export function ModulesList() {
  const { t } = useTranslation('common');
  const lang = useLang();
  const [modules, setModules] = useState<HomeModuleView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const repo = getDefaultRepository();
    getHomeModulesView(repo, lang)
      .then((view) => {
        if (!cancelled) {
          setModules(view);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <div className={clsx('flex flex-col gap-brand-xlarge', 'mt-brand-xlarge')}>
      {loading ? <ModuleCardSkeleton /> : null}
      {error ? (
        <ModuleCardError title={`მძღნერი = ${t('shit')}`} message={t('errorLoadingContent')} />
      ) : null}
      {!loading && !error && modules.length === 0 ? (
        <ModuleCardError title={`მძღნერი = ${t('shit')}`} message={t('noContentFound')} />
      ) : null}
      {!loading && !error && modules.length > 0
        ? modules.map((module) => <ModuleCardWithLessons key={module.id} module={module} />)
        : null}
    </div>
  );
}
