'use client';

import {
  getDefaultRepository,
  getHomeModulesView,
  type HomeLessonCardView,
  type HomeModuleView,
} from '@game-client/core/library';
import { useLang } from '@game-client/i18n/use-lang';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function ModulesListError() {
  return (
    <div className={clsx('flex flex-col', 'gap-brand-regular')}>
      <div
        className={clsx(
          //
          'w-full h-[10dvh] bg-red-500 animate-pulse rounded-md',
        )}
      />
      <div
        className={clsx(
          //
          'w-full h-[30dvh] bg-red-500 animate-pulse rounded-md',
        )}
      />
    </div>
  );
}

function ModuleCardSkeleton() {
  const { t } = useTranslation('common');
  return (
    <div className={clsx('flex flex-col')}>
      <div className={clsx('text-2xl text-brand-neutral-400 font-semibold h-12 animate-pulse')}>
        {t('loading')}...
      </div>
      <div className={clsx('flex flex-col gap-brand-large')}>
        <LessonCardSkeleton />
        <LessonCardSkeleton />
        <LessonCardSkeleton />
      </div>
    </div>
  );
}

function ModuleCard({ module }: { readonly module: HomeModuleView }) {
  return (
    <div key={module.id} className={clsx('flex flex-col')}>
      <div className={clsx('text-2xl font-semibold h-12')}>{module.title}</div>
      <div className={clsx('flex flex-col gap-brand-large')}>
        {module.lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}

function LessonCardSkeleton() {
  return (
    <div
      className={clsx(
        //
        'h-32',
        'justify-center',
        //
        'flex flex-col',
        //
        'rounded-lg',
        'bg-brand-primary-100',
        'border-brand-primary-200 border',
        'hover:bg-brand-primary-200',
        'active:bg-brand-primary-300',
        'active:scale-105',
        'cursor-pointer',
        'px-brand-large',
        'gap-brand-large',
        'text-left',
        'shadow-md',
        'animate-pulse',
      )}
    />
  );
}

function LessonCard({ lesson }: { readonly lesson: HomeLessonCardView }) {
  const lang = useLang();
  const { navigate } = useRouterContext();
  return (
    <button
      key={lesson.id}
      aria-label={lesson.title}
      type="button"
      tabIndex={0}
      onClick={() => navigate(`/${lang}/learn/${encodeURIComponent(lesson.id)}`)}
      className={clsx(
        'h-36',
        'justify-center',
        //
        'flex flex-col',
        //
        'rounded-lg',
        'bg-brand-primary-100',
        'border-brand-primary-200 border',
        'hover:bg-brand-primary-200',
        'active:bg-brand-primary-300',
        'active:scale-105',
        'cursor-pointer',
        'px-brand-large',
        'gap-brand-large',
        'text-left',
        'shadow-md',
      )}
    >
      <div className={clsx('text-2xl', 'font-bold')}>{lesson.title}</div>
      <div className="flex gap-brand-small flex-wrap">
        {lesson.previewItems.map((previewItem) => (
          <div
            key={previewItem.id}
            className={clsx(
              //
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
    <div className={clsx('flex flex-col gap-brand-large', 'my-brand-xlarge')}>
      {loading ? <ModuleCardSkeleton /> : null}
      {error ? <ModulesListError /> : null}
      {!loading && !error
        ? modules.map((module) => <ModuleCard key={module.id} module={module} />)
        : null}
    </div>
  );
}
