'use client';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { SlRefresh } from 'react-icons/sl';
import { Box } from '../../../domains/shared/components/box';
import { FlashcardsCarrousel } from '../flashcards-carrousel';
import { ResponsiveContainer } from '../../../domains/shared/components/responsive-container';

export function RecommendedGame() {
  const [isFlashcardsCarrouselVisible, setFlashcardsCarrouselVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isFlashcardsCarrouselVisible) {
      setFlashcardsCarrouselVisible(true);
    }
  }, [isFlashcardsCarrouselVisible]);

  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <>
      {/* recommended game: header, carrousel, actions */}
      <ResponsiveContainer
        className={clsx(
          //
          'justify-center items-center',
          'flex-col',
          'p-2',
          'my-auto',
          'md:my-8',
        )}
      >
        {/* recommended game: title */}
        <div
          className={clsx(
            //
            'w-full',
            'px-2',
            'flex flex-row items-center justify-between',
          )}
        >
          <h1
            className={clsx(
              //
              'text-xl',
              'font-bold',
            )}
          >
            The essentials
          </h1>
          <h1
            className={clsx(
              //
              'flex flex-row items-center justify-center gap-4',
            )}
          >
            <div className={clsx('flex flex-row items-center justify-center gap-1')}>
              <span className={clsx('text-xl font-bold')}>4</span>
              <span className={clsx('text-md')}>words</span>
            </div>
            <div className={clsx('flex flex-row items-center justify-center gap-1')}>
              <span className={clsx('text-xl font-bold')}>{'<2'}</span>
              <span className={clsx('text-md')}>mins</span>
            </div>
          </h1>
        </div>
        {/* recommended game: flashcards carrousel */}
        <div className={clsx('w-full h-86  max-h-86 rounded-4xl')}>
          {isFlashcardsCarrouselVisible && (
            <FlashcardsCarrousel
              className={clsx(
                //
                'w-full h-full',
              )}
              initialSlide={currentSlide}
              onSlideChange={handleSlideChange}
            />
          )}
        </div>
        {/* recommended game: actions: play now, i want a new game */}
        <Box
          className={clsx(
            //
            'w-full',
            'flex-col',
            'items-center justify-center',
            'gap-4',
            'mt-2',
            // 'bg-orange-800',
          )}
        >
          <button
            type="button"
            className={clsx(
              'cursor-pointer',
              'text-lg',
              'font-bold',
              'text-center',
              'bg-violet-800',
              'text-white',
              'hover:bg-violet-900',
              'rounded-lg',
              'p-2',
              'w-full max-w-85',
              'flex flex-row items-center justify-center gap-2',
            )}
          >
            <FaGamepad className={clsx('size-10')} />
            <span className={clsx('text-xl', 'font-bold', 'text-center')}>PLAY NOW</span>
          </button>
          <button
            type="button"
            className={clsx(
              'cursor-pointer',
              'text-lg',
              'font-bold',
              'text-center',
              // 'bg-slate-200',
              'hover:bg-slate-300',
              'rounded-lg',
              'p-2',
              'w-full max-w-85',
              'flex flex-row items-center justify-center gap-2',
            )}
          >
            <SlRefresh className={clsx('size-4')} />
            <span className={clsx('text-xs', 'font-bold', 'text-center')}>I WANT A NEW GAME</span>
          </button>
        </Box>
      </ResponsiveContainer>
    </>
  );
}

export default function ForYouPage() {
  return <RecommendedGame />;
}
