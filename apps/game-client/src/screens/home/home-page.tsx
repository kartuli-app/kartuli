'use client';

import {
  getDefaultRepository,
  getHomeModulesView,
  type HomeModuleView,
} from '@game-client/core/library';
import { LanguageSelect } from '@game-client/i18n/language-select';
import { useLang } from '@game-client/i18n/use-lang';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation('common');
  const lang = useLang();
  const { navigate } = useRouterContext();
  const [modules, setModules] = useState<HomeModuleView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const repo = getDefaultRepository();
    getHomeModulesView(repo, lang).then((view) => {
      if (!cancelled) {
        setModules(view);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <div
      data-testid="game-home"
      className={clsx(
        //
        'flex grow flex-col',
      )}
    >
      {/* screen app bar */}
      <div
        className={clsx(
          //
          'sticky top-0 z-10',
          'w-full',
          'bg-black',
          'border-b-2 border-white',
          'text-white',
        )}
      >
        <div
          className={clsx(
            //
            'mx-auto max-w-md w-full',
            'p-4',
            'pb-8',
          )}
        >
          <div
            className={clsx(
              //
              'flex justify-between items-center',
            )}
          >
            <div className={clsx('text-2xl', 'font-bold')}>kartuli.app</div>
            <div className="flex gap-2">
              <LanguageSelect />
            </div>
          </div>
        </div>
      </div>

      {/* screen content */}
      <div
        className={clsx(
          //
          'w-full grow',
          'bg-black',
          'text-white',
        )}
      >
        <div
          className={clsx(
            //
            'mx-auto max-w-md w-full grow',
            'p-4',
            'flex flex-col',
          )}
        >
          <h1 className={clsx('text-5xl font-boldd', 'mt-16')}>გამარჯობა anon</h1>
          <h2 className={clsx('text-3xl font-bold', 'mt-4', 'mb-16')}>{t('homeHeading')}</h2>

          {/* modules list */}
          <div className={clsx('flex flex-col gap-2', 'mb-4')}>
            {loading ? (
              <div className="text-xl">Loading...</div>
            ) : (
              modules.map((module) => (
                <div key={module.id} className={clsx('flex flex-col', 'gap-4')}>
                  <div className={clsx('text-2xl')}>{module.title}</div>
                  <div className={clsx('flex flex-col gap-4')}>
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        aria-label={lesson.title}
                        type="button"
                        tabIndex={0}
                        onClick={() => navigate(`/${lang}/learn/${encodeURIComponent(lesson.id)}`)}
                        className={clsx(
                          'bg-gray-800',
                          'hover:bg-gray-700',
                          'active:bg-gray-700',
                          'active:scale-105',
                          'cursor-pointer',
                          'p-2',
                          'rounded-md',
                          'flex flex-col gap-2',
                          'text-left',
                        )}
                      >
                        <div className={clsx('text-xl', 'font-bold')}>{lesson.title}</div>
                        <div className="flex gap-2 flex-wrap">
                          {lesson.previewItems.map((previewItem) => (
                            <div
                              key={previewItem.id}
                              className="bg-white text-black rounded-md size-12 shrink-0 flex items-center justify-center"
                            >
                              {previewItem.type === 'letter' && (
                                <div className="text-4xl">{previewItem.text}</div>
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
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
