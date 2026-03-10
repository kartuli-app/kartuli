'use client';

import { getLessonById, getModules, lettersById } from '@game-client/core/library';
import { LanguageSelect } from '@game-client/i18n/language-select';
import { useLang } from '@game-client/i18n/use-lang';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation('common');
  const lang = useLang();
  const { navigate } = useRouterContext();
  const modules = getModules();

  return (
    // screen wraper
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
            {/* logo */}
            <div
              className={clsx(
                //
                'text-2xl',
                'font-bold',
              )}
            >
              kartuli.app
            </div>
            {/* actions */}
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
          {/* screen title */}
          <h1
            className={clsx(
              //
              'text-5xl font-boldd',
              'mt-16',
            )}
          >
            გამარჯობა anon
          </h1>
          <h2
            className={clsx(
              //
              'text-3xl font-bold',
              'mt-4',
              'mb-16',
            )}
          >
            {t('homeHeading')}
          </h2>

          {/* modules list */}
          <div
            className={clsx(
              //
              'flex flex-col gap-2',
              'mb-4',
            )}
          >
            {modules.map((module) => (
              // module item
              <div
                key={module.id}
                className={clsx(
                  //
                  'flex flex-col',
                  // 'bg-blue-500',
                  'gap-4',
                )}
              >
                {/* module title */}
                <div
                  className={clsx(
                    //
                    'text-2xl',
                  )}
                >
                  {module.title}
                </div>
                {/* lessons list */}
                <div
                  className={clsx(
                    //
                    'flex flex-col gap-4',
                  )}
                >
                  {module.lessonIds.map((lessonId) => {
                    const lesson = getLessonById(lessonId);
                    if (!lesson) return null;
                    return (
                      // lesson item
                      <button
                        aria-label={lesson.title}
                        type="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            navigate(`/${lang}/learn/${encodeURIComponent(lessonId)}`);
                          }
                        }}
                        onClick={() => navigate(`/${lang}/learn/${encodeURIComponent(lessonId)}`)}
                        key={lessonId}
                        className={clsx(
                          //
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
                        {/* lesson title */}
                        <div
                          className={clsx(
                            //
                            'text-xl',
                            'font-bold',
                          )}
                        >
                          {lesson.title}
                        </div>
                        {/* lesson items */}
                        <div className="flex gap-2 flex-wrap">
                          {lesson.itemIds.map((itemId) => {
                            const item = lettersById[itemId];
                            return (
                              <div
                                key={itemId}
                                className="bg-white text-black  rounded-md size-12 shrink-0 flex items-center justify-center"
                              >
                                <div className="text-4xl">{item?.targetScript}</div>
                              </div>
                            );
                          })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
