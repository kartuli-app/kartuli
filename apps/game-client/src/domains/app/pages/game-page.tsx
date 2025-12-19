'use client';

import clsx from 'clsx';
import { lessonsById } from '@/domains/app/content/library';
import { ResponsiveContainer } from '@/domains/shared/components/responsive-container';

export function GamePage({ lessonId }: { lessonId: string }) {
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
          'gap-4',
          'w-full max-w-lg mx-auto',
          'p-4',
        )}
      >
        <h1 className={clsx('text-2xl font-bold', 'text-slate-800')}>{lesson.title}</h1>
        <p className={clsx('text-lg', 'text-slate-600', 'text-center')}>
          Game coming soon for this lesson
        </p>
      </div>
    </ResponsiveContainer>
  );
}
