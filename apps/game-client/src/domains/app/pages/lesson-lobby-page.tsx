'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { lessonsById, lettersById } from '@/domains/app/content/library';
import { ResponsiveContainer } from '@/domains/shared/components/responsive-container';

export function LessonLobbyPage({ lessonId }: { lessonId: string }) {
  const lesson = lessonsById[lessonId];

  if (!lesson) {
    return (
      <ResponsiveContainer
        className={clsx(
          //
          'flex-col',
          'flex-1',
          'p-0',
        )}
      >
        <div
          className={clsx(
            'flex-1 flex flex-col',
            'items-center justify-center',
            'gap-2',
            'w-full max-w-lg mx-auto',
            'p-4',
          )}
        >
          <p className={clsx('text-lg', 'text-slate-600')}>Lesson not found</p>
        </div>
      </ResponsiveContainer>
    );
  }

  const letters = lesson.itemIds
    .map((itemId) => lettersById[itemId])
    .filter((letter): letter is (typeof lettersById)[string] => letter !== undefined);

  return (
    <ResponsiveContainer
      className={clsx(
        //
        'flex-col',
        'flex-1',
        'p-0',
      )}
    >
      <div
        className={clsx(
          'flex-1 flex flex-col',
          'gap-4',
          'w-full max-w-lg mx-auto',
          'p-4',
          'min-h-0',
        )}
      >
        <h1 className={clsx('text-2xl font-bold', 'text-slate-800')}>{lesson.title}</h1>

        <div className={clsx('flex flex-col', 'gap-3')}>
          {letters.map((letter) => (
            <div
              key={letter.id}
              className={clsx(
                'w-full',
                'bg-white',
                'rounded-lg',
                'border border-slate-200',
                'shadow-sm',
                'p-6',
                'flex flex-col',
                'items-center',
                'gap-3',
              )}
            >
              <span className={clsx('text-6xl', 'font-bold', 'text-slate-900')}>
                {letter.targetScript}
              </span>
              <div className={clsx('flex flex-col', 'items-center', 'gap-1')}>
                <span className={clsx('text-lg', 'font-semibold', 'text-slate-700')}>
                  {letter.transliteration}
                </span>
                <span className={clsx('text-sm', 'text-slate-600', 'text-center')}>
                  {letter.pronunciationHint}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Link
          prefetch={false}
          href={`/app/game/${lessonId}`}
          className={clsx(
            'w-full',
            'bg-violet-800',
            'text-white',
            'font-bold',
            'text-lg',
            'rounded-md',
            'p-4',
            'text-center',
            'hover:bg-violet-900',
            'transition-colors',
            'shadow-md',
          )}
        >
          Play game
        </Link>
      </div>
    </ResponsiveContainer>
  );
}
