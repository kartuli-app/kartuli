'use client';

import { clsx } from 'clsx';

import { EffectCards, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineSparkles } from 'react-icons/hi';

interface WordItem {
  text_player_lang: string;
  text_native_lang: string;
  text_transliteration: string;
  isFavorite: boolean;
}

const wordItems: WordItem[] = [
  {
    text_player_lang: 'hello',
    text_native_lang: 'გამარჯობა',
    text_transliteration: 'gamarjoba',
    isFavorite: false,
  },
  {
    text_player_lang: 'goodbye',
    text_native_lang: 'ნახვამდის',
    text_transliteration: 'nakhvamdis',
    isFavorite: true,
  },
  {
    text_player_lang: 'Please',
    text_native_lang: 'გთხოვთ',
    text_transliteration: 'gtkhovt',
    isFavorite: false,
  },
  {
    text_player_lang: 'Thank you',
    text_native_lang: 'მადლობა',
    text_transliteration: 'madloba',
    isFavorite: false,
  },
];

function WordFlashcard({ className, wordItem }: { className?: string; wordItem: WordItem }) {
  return (
    <div className={clsx('w-full h-full flex items-center flex-col justify-between', className)}>
      {/* flashcard header */}
      <div
        className={clsx('flex flex-col items-center justify-center bg-orangeg-400 w-full borderr')}
      >
        <div className={clsx('flex flex-col items-center justify-center bg-blue-400 w-full')}>
          <div className={clsx('absolute top-0 left-0 flex items-center justify-between w-full')}>
            <button
              type="button"
              onClick={() => console.log('toggle favorite')}
              className={clsx(
                'font-medium w-10 h-10 rounded-full flex items-center justify-center',
                // 'border',
                'bg-blue-400 text-white',
              )}
            >
              <AiOutlineHeart className={clsx('size-6')} />
            </button>
            <button
              type="button"
              onClick={() => console.log('toggle favorite')}
              className={clsx(
                'font-medium w-auto h-10 flex items-center justify-center flex-row',
                // 'border',
                'gap-1',
                'px-2',
                'mb-auto',
                'bg-blue-400 text-white',
              )}
            >
              <span className={clsx('text-[10px]')}>New item</span>
              <HiOutlineSparkles className={clsx('size-3')} />
            </button>
          </div>
          <div className={clsx('flex flex-col items-center justify-center z-10 p-2')}>
            <h1
              className={clsx(
                'text-4xl text-center font-bold h-20 flex items-center justify-center',
              )}
            >
              {wordItem.text_player_lang}
            </h1>
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-col items-center justify-center bg-orangeg-400 w-full borderr',
          )}
        >
          {/* flashcard body */}
          <div className={clsx('flex flex-col items-center justify-center bg-orangeg-400 w-full')}>
            <div className={clsx('flex flex-col items-center justify-center z-10 p-2')}>
              <h1
                className={clsx(
                  'text-2xl text-center font-bold h-8 flex items-center justify-center text-slate-800',
                )}
              >
                {wordItem.text_native_lang}
              </h1>
            </div>
          </div>

          <div className={clsx('flex flex-col items-center justify-center bg-orangge-400 w-full')}>
            <div className={clsx('flex flex-col items-center justify-center z-10 p-2')}>
              <h1
                className={clsx(
                  'text-2xl text-center font-bold h-8 flex items-center justify-center',
                )}
              >
                <span className={clsx(' text-yellow-600')}>[</span>
                <span className={clsx('text-slate-600')}>{wordItem.text_transliteration}</span>
                <span className={clsx(' text-yellow-600')}>]</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* flashcard footer */}
      {/* <button
        type="button"
        onClick={() => console.log('show translation')}
        className={clsx(
          'flex mr-auto items-center justify-center gap-2 text-xl font-medium text-black ',
          'p-2 rounded-lg border border-black mb-2 ml-2 px-4',
        )}
      >
        <FaPlay className={clsx('size-4')} />
        <PiWaveformBold className={clsx('size-4')} />
      </button> */}
    </div>
  );
}

function Flashcard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        ' w-full h-full flex items-center justify-center',
        // 'bg-slate-100',
        // 'border-slate-200',
        // 'border-1',
        'text-black rounded-lg shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface FlashcardsCarrouselProps {
  className?: string;
  initialSlide?: number;
  onSlideChange?: (slideIndex: number) => void;
}

export function FlashcardsCarrousel({
  className,
  initialSlide = 0,
  onSlideChange,
}: FlashcardsCarrouselProps) {
  return (
    <div
      className={clsx(
        'overflow-hidden',
        'flex',
        'relative',
        'justify-center',
        'items-center',
        'w-full',
        'h-full',
        // 'border',
        // carrousel.backgroundColor,
        // carrousel.textColor,
        className,
      )}
    >
      <Swiper
        className={clsx(
          'w-full h-full',
          'rounded-lg',
          // 'border-2 border-red-500'
        )}
        initialSlide={initialSlide}
        onSlideChange={(swiper) => {
          const currentIndex = swiper.activeIndex;
          console.log('slide change', currentIndex);
          onSlideChange?.(currentIndex);
        }}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Navigation, Pagination, EffectCards, Keyboard]}
        navigation
        pagination
        keyboard={{
          enabled: true,
        }}
        effect="cards"
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
        }}
      >
        {wordItems.map((wordItem, _index) => (
          <SwiperSlide key={wordItem.text_player_lang}>
            <Flashcard className={clsx()}>
              <WordFlashcard
                className={clsx('bg-neutral-50 border-neutral-100')}
                wordItem={wordItem}
              />
            </Flashcard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
