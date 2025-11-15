'use client';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { Box } from '../box';
import { FlashcardsCarrousel } from '../flashcards-carrousel';
import { ResponsiveContainer } from '../responsive-container';

export function RecommendedGame() {
  const [isFlashcardsCarrouselVisible, setFlashcardsCarrouselVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isFlashcardsCarrouselVisible) {
      setFlashcardsCarrouselVisible(true);
    }
  }, [isFlashcardsCarrouselVisible]);

  // Handle slide change to update context
  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <>
      {/* recommended game: header, carrousel, footer, buttons */}
      <ResponsiveContainer
        className={clsx(
          'justify-center items-center flex-col',
          'border',
          'flex gap-3',
          // content.padding,
          'p-2',
        )}
      >
        {/* recommended game: header */}
        <div className={clsx('w-full', '')}>
          <h1 className={clsx('text-2xl', 'font-bold', 'text-center')}>The essentials</h1>
          <h1 className={clsx('text-md', 'font-medium', 'text-center')}>
            The most important words in any language
          </h1>
        </div>
        {/* recommended game: carrousel */}
        <div className={clsx('w-full h-56 max-h-56')}>
          {isFlashcardsCarrouselVisible && (
            <FlashcardsCarrousel
              className={clsx('w-full h-full')}
              initialSlide={currentSlide}
              onSlideChange={handleSlideChange}
            />
          )}
        </div>
        {/* recommended game: stats */}
        <div className={clsx('w-full', 'flex flex-row items-center justify-center gap-10')}>
          <div
            className={clsx(
              'text-md',
              'font-medium',
              'text-center',
              'flex flex-coll items-center justify-center',
              'gap-1',
            )}
          >
            <span className={clsx('text-2xl', 'font-bold', 'text-center')}>4</span> words
          </div>
          <div
            className={clsx(
              'text-md',
              'font-medium',
              'text-center',
              'flex flex-coll items-center justify-center',
              'gap-1',
            )}
          >
            <span className={clsx('text-2xl', 'font-bold', 'text-center')}>{'<2'}</span> mins
          </div>
        </div>
        {/* recommended game: action */}
        <Box className={clsx('w-full')}>
          <button
            type="button"
            className={clsx(
              'cursor-pointer',
              'text-lg',
              'font-bold',
              'text-center',
              'bg-white',
              'hover:bg-gray-100',
              'text-black',
              'rounded-lg',
              'p-1',
              'w-full max-w-65',
              'borderr',
              'flex flex-row items-center justify-center gap-2',
            )}
          >
            <FaGamepad className={clsx('size-10')} />
            <span className={clsx('text-xl', 'font-bold', 'text-center')}>PLAY NOW</span>
          </button>
        </Box>
        <Box className={clsx('w-full')}>
          <button
            type="button"
            className={clsx(
              'cursor-pointer',
              'text-lg',
              'font-bold',
              'text-center',
              // 'bg-white',
              'hover:bg-slate-50',
              'hover:text-black',
              // 'text-black',
              'rounded-lg',
              'p-1',
              'w-full max-w-65',
              // 'border',
              'flex flex-row items-center justify-center gap-2',
            )}
          >
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
