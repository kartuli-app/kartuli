import clsx from 'clsx';
import { WordFlashcardsCarrousel } from '@/app/app/word-flashcards-carrousel';
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
          'items-center', // Center cards horizontally
          'gap-2', // Gap between major sections
          'w-full max-w-lg mx-auto',
          'min-h-0', // Allow flex children to shrink properly
        )}
      >
        <WordFlashcardsCarrousel className={clsx('w-full h-full')} />
      </div>
    </ResponsiveContainer>
  );
}
