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
  children: React.ReactNode[];
}>) {
  return <div className={clsx('flex flex-col gap-brand-large', className)}>{children}</div>;
}

const lessonCardBaseClassnames = clsx(
  //
  'h-36',
  'justify-center',
  //
  'px-brand-large',
  'gap-brand-large',
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
  // height = 2 skeletons + gap (36 + gap-brand-large)
  'h-[calc()var(--spacing)_*_36=+(var(--spacing-brand-large)))]',
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

function ModuleCardEmpty() {
  const { t } = useTranslation('common');
  return (
    <ModuleCard>
      <ModuleCardTitle className="text-red-900" title={`მძღნერი = ${t('shit')}`} />
      <ModuleCardContent>
        <div className={clsx(lessonCardBaseClassnames, lessonCardWithImageClassnames)}>
          <img
            src={errorIllustration.src}
            alt={t('error')}
            className="w-full h-full object-contain"
          />
        </div>
        <div className={clsx(lessonCardBaseClassnames, lessonCardErrorClassnames)}>
          <LessonCardTitle title={t('noContentFound')} />
        </div>
      </ModuleCardContent>
    </ModuleCard>
  );
}

function ModuleCardError() {
  const { t } = useTranslation('common');
  return (
    <ModuleCard>
      <ModuleCardTitle className="text-red-900" title={`მძღნერი = ${t('shit')}`} />
      <ModuleCardContent>
        <div className={clsx(lessonCardBaseClassnames, lessonCardWithImageClassnames)}>
          <img
            src={errorIllustration.src}
            alt={t('error')}
            className="w-full h-full object-contain"
          />
        </div>
        <div className={clsx(lessonCardBaseClassnames, lessonCardErrorClassnames)}>
          <LessonCardTitle title={t('errorLoadingContent')} />
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
        {module.lessons.map((lesson) => (
          <LessonCardWithContent key={lesson.id} lesson={lesson} />
        ))}
      </ModuleCardContent>
    </ModuleCard>
  );
}

function LessonCardWithContent({ lesson }: { readonly lesson: HomeLessonCardView }) {
  const lang = useLang();
  const { navigate } = useRouterContext();
  return (
    <button
      key={lesson.id}
      aria-label={lesson.title}
      type="button"
      tabIndex={0}
      onClick={() => navigate(`/${lang}/learn/${encodeURIComponent(lesson.id)}`)}
      className={clsx(lessonCardBaseClassnames, lessonCardWithContentClassnames)}
    >
      <div className={clsx('text-2xl', 'font-bold')}>{lesson.title}</div>
      <div className="flex gap-brand-small flex-wrap">
        {lesson.previewItems.map((previewItem) => (
          <div
            key={previewItem.id}
            className={clsx(
              //
              'text-brand-neutral-900',
              'bg-brand-neutral-100',
              'shadow-md',
              'rounded-lg',
              'w-14 h-18',
              'shrink-0',
              'flex',
              'items-center',
              'justify-center',
            )}
          >
            {previewItem.type === 'letter' && <div className="text-5xl">{previewItem.text}</div>}
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
    <div className={clsx('flex flex-col gap-brand-xlarge', 'my-brand-xlarge')}>
      {loading ? <ModuleCardSkeleton /> : null}
      {error ? <ModuleCardError /> : null}
      {!loading && !error && modules.length > 0
        ? modules.map((module) => <ModuleCardWithLessons key={module.id} module={module} />)
        : null}
      {!loading && !error && modules.length === 0 ? <ModuleCardEmpty /> : null}
    </div>
  );
}
