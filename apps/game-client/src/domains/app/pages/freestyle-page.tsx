'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { lessonsById, lettersById, modules } from '@/domains/app/content/library';
import { ResponsiveContainer } from '@/domains/shared/components/responsive-container';

export function FreestylePage() {
  return (
    <ResponsiveContainer
      className={clsx(
        //
        'flex-col',
        'flex-1',
        'p-0', // Increased padding for better breathing room
        // 'overflow-hidden', // Prevent main container scroll
        // 'bg-pink-500',
      )}
    >
      {/* content wrapper */}
      <div
        id="content-wrapper"
        className={clsx(
          'flex-1 flex flex-col',
          'gap-4', // Gap between major sections
          'w-full max-w-lg mx-auto',
          'p-4',
          'min-h-0', // Allow flex children to shrink properly
        )}
      >
        {modules.map((module) => (
          <div key={module.id} className={clsx('flex flex-col', 'gap-3')}>
            <h2 className={clsx('text-2xl font-bold', 'text-slate-800')}>{module.title}</h2>
            <div className={clsx('flex flex-col', 'gap-2')}>
              {module.lessonIds.map((lessonId) => {
                const lesson = lessonsById[lessonId];
                if (!lesson) return null;

                return (
                  <Link
                    prefetch={false}
                    key={lessonId}
                    href={`/app/lesson/${lessonId}`}
                    className={clsx(
                      'w-full',
                      'bg-white',
                      'rounded-lg',
                      'border border-slate-200',
                      'shadow-sm',
                      'p-4',
                      'hover:shadow-md',
                      'transition-shadow',
                      'cursor-pointer',
                    )}
                  >
                    <div className={clsx('flex flex-col', 'gap-2')}>
                      <h3 className={clsx('text-lg font-semibold', 'text-slate-900')}>
                        {lesson.title}
                      </h3>
                      <div className={clsx('flex flex-wrap', 'gap-2')}>
                        {lesson.itemIds.map((itemId) => {
                          const letter = lettersById[itemId];
                          if (!letter) return null;
                          return (
                            <span
                              key={itemId}
                              className={clsx(
                                'text-2xl',
                                'font-bold',
                                'text-slate-700',
                                'flex items-center justify-center',
                                'w-10 h-10',
                                'bg-slate-50',
                                'rounded-md',
                                'border border-slate-200',
                              )}
                            >
                              {letter.targetScript}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ResponsiveContainer>
  );
}
