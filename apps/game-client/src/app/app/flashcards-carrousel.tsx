'use client';

import { clsx } from 'clsx';
import type React from 'react';
import { useState, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { FaHeart } from 'react-icons/fa';
import { IconButton } from '../../domains/shared/components/icon-button';
import { PiPlayFill } from 'react-icons/pi';

interface WordItem {
  text_player_lang: string;
  text_native_lang: string;
  text_transliteration: string;
  isFavorite: boolean;
  example_player_lang: string;
  example_native_lang: string;
  example_transliteration: string;
}

const wordItems: WordItem[] = [
  {
    text_player_lang: 'hello',
    text_native_lang: 'გამარჯობა',
    text_transliteration: 'gamarjoba',
    isFavorite: false,
    example_player_lang: 'hello, how are you?',
    example_native_lang: 'გამარჯობა, როგორ ხარ?',
    example_transliteration: 'gamarjoba, rogor khar?',
  },
  {
    text_player_lang: 'goodbye',
    text_native_lang: 'ნახვამდის',
    text_transliteration: 'nakhvamdis',
    isFavorite: true,
    example_player_lang: 'see you tomorrow, goodbye',
    example_native_lang: 'ხვალ გნახავ, ნახვამდის',
    example_transliteration: 'khval gnakhav, nakhvamdis',
  },
  {
    text_player_lang: 'please',
    text_native_lang: 'გთხოვთ',
    text_transliteration: 'gtkhovt',
    isFavorite: false,
    example_player_lang: 'one khachapuri, please',
    example_native_lang: 'ერთი ხაჭაპური, გთხოვთ',
    example_transliteration: 'erti khach’ap’uri, gtkhovt',
  },
  {
    text_player_lang: 'thank you',
    text_native_lang: 'მადლობა',
    text_transliteration: 'madloba',
    isFavorite: false,
    example_player_lang: "it's delicious, thank you",
    example_native_lang: 'გემრიელია, მადლობა',
    example_transliteration: 'gemrielia, madloba',
  },
];

function highlightWordInText(text: string, wordToHighlight: string): React.ReactNode[] {
  // Escape special regex characters in the word
  const escapedWord = wordToHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Check if text contains non-Latin characters (for Unicode scripts like Georgian)
  // Check if any character is outside the basic Latin range (0-127)
  const hasNonLatin = Array.from(text).some((char) => (char.codePointAt(0) ?? 0) > 127);

  // For non-Latin scripts, use Unicode-aware word boundaries or direct matching
  // For Latin scripts, use standard word boundaries
  const regex = hasNonLatin
    ? new RegExp(escapedWord, 'gi') // Direct match for non-Latin (no word boundaries)
    : new RegExp(`\\b${escapedWord}\\b`, 'gi'); // Word boundaries for Latin

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = regex.exec(text);

  while (match !== null) {
    // Add text before the match (preserving all characters including spaces)
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index);
      parts.push(beforeText);
    }
    // Add the highlighted word (preserving original case from text)
    parts.push(
      <span key={match.index} className="font-bold">
        {match[0]}
      </span>,
    );
    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }

  // Add remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // If no matches found, return the original text
  return parts.length > 0 ? parts : [text];
}

const tags = ['new', 'common'];

function WordFlashcard({ className, wordItem }: { className?: string; wordItem: WordItem }) {
  return (
    <div
      className={clsx(
        //
        'w-full h-full',
        'flex flex-col',
        'items-center justify-between',

        className,
      )}
    >
      <div
        className={clsx(
          //
          'w-full',
          'flex flex-col',
          'items-center justify-center',
          'p-1',
          'relative',
        )}
      >
        {/* flashcard favorite button */}
        <div
          className={clsx(
            //
            'absolute',
            'top-6',
            'left-6',
            'z-50',
          )}
        >
          <IconButton>
            <FaHeart className={clsx('size-6')} />
          </IconButton>
        </div>
        <div
          className={clsx(
            //
            'absolute',
            'top-6',
            'right-6',
            'z-50',
          )}
        >
          <IconButton>
            <PiPlayFill className={clsx('size-6')} />
          </IconButton>
        </div>

        {/* flashcard header: word */}
        <div
          className={clsx(
            //
            'flex flex-col',
            'items-center justify-center',
            'w-full',
            'rounded-t-4xl',
            'overflow-hidden',
            'px-2 py-2',
            'gap-2',
            'bg-blue-500',
            'text-white',
          )}
        >
          {/* word in player language */}
          <h1
            className={clsx(
              //
              'text-2xl text-center font-bold',
              'flex',
              'items-center justify-center',
              'w-full',
            )}
          >
            {wordItem.text_player_lang}
          </h1>
          {/* word in native language */}
          <h1
            className={clsx(
              //
              'text-2xl text-center ',
              'flex',
              'items-center justify-center',
              'w-full',
            )}
          >
            {wordItem.text_native_lang}
          </h1>

          {/* word transliteration */}
          <h1
            className={clsx(
              //
              'text-2xl text-center ',
              'flex',
              'items-center justify-center',
              'w-full',
            )}
          >
            <span className={clsx(' text-yellow-300 font-bold pr-1')}>[</span>
            <span className={clsx()}>{wordItem.text_transliteration}</span>
            <span className={clsx(' text-yellow-300 font-bold pl-1')}>]</span>
          </h1>
        </div>

        {/* flashcard body: example */}
        <div
          className={clsx(
            //
            'bg-blue-400',
            'text-white',
            'flex flex-col',
            'items-center justify-center',
            'w-full',
            'px-2 py-2',
            'gap-2',
          )}
        >
          {/* example in player language */}
          <h1
            className={clsx(
              //
              'text-md text-center ',
              'flex',
              'items-center justify-center',
              'whitespace-pre-wrap',
            )}
          >
            {highlightWordInText(wordItem.example_player_lang, wordItem.text_player_lang)}
          </h1>

          {/* example in native language */}
          <h1
            className={clsx(
              //
              'text-md text-center ',
              'flex',
              'items-center justify-center',
              'whitespace-pre-wrap',
            )}
          >
            {highlightWordInText(wordItem.example_native_lang, wordItem.text_native_lang)}
          </h1>

          {/* example transliteration */}
          <h1
            className={clsx(
              //
              'text-md text-center ',
              'flex',
              'items-center justify-center',
              'whitespace-pre-wrap',
            )}
          >
            <span className={clsx(' text-yellow-300 font-bold pr-1')}>[</span>
            <span className={clsx()}>
              {highlightWordInText(wordItem.example_transliteration, wordItem.text_transliteration)}
            </span>
            <span className={clsx(' text-yellow-300 font-bold pl-1')}>]</span>
          </h1>
        </div>

        {/* flashcard footer: tags */}
        <div
          className={clsx(
            //
            'bg-blue-300',
            'flex',
            'items-center justify-center',
            'w-full',
            'rounded-b-4xl',
            'px-2 py-4',
            'gap-2',
            'relative',
          )}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              className={clsx(
                //
                'px-2 py-2',
                'bg-slate-50 text-black',
                'rounded-lg',
                'text-sm',
              )}
            >
              <span className={clsx('text-md text-center')}>#{tag}</span>
            </div>
          ))}
        </div>
      </div>
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
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    const currentIndex = swiper.activeIndex;
    onSlideChange?.(currentIndex);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div
      className={clsx(
        'flex',
        'relative',
        'justify-center',
        'items-center',
        'w-full',
        'h-full',
        className,
      )}
    >
      <Swiper
        className={clsx(
          //
          'w-full h-full',
        )}
        initialSlide={initialSlide}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperInit}
        modules={[
          Navigation,
          Pagination,
          // EffectCards,
          Keyboard,
        ]}
        // navigation
        pagination
        keyboard={{
          enabled: true,
        }}
        // effect="cards"
        breakpoints={{
          320: {
            slidesPerView: 1.05,
            spaceBetween: 10,
            slidesPerGroup: 1,
          },
          640: {
            slidesPerView: 1.05,
            spaceBetween: 0,
            slidesPerGroup: 1,
          },
        }}
      >
        {wordItems.map((wordItem, _index) => (
          <SwiperSlide key={wordItem.text_player_lang}>
            <WordFlashcard className={clsx()} wordItem={wordItem} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* arrow left button */}
      {isBeginning ? null : (
        <div
          className={clsx(
            //
            'absolute',
            'top-1/2',
            'left-2',
            '-translate-y-1/2',
            'z-20',
          )}
        >
          <IconButton onClick={handlePrev}>
            <MdOutlineKeyboardArrowLeft className={clsx('size-8')} />
          </IconButton>
        </div>
      )}

      {/* arrow right button */}
      {isEnd ? null : (
        <div
          className={clsx(
            //
            'absolute',
            'top-1/2',
            'right-2',
            '-translate-y-1/2',
            'z-20',
          )}
        >
          <IconButton onClick={handleNext}>
            <MdOutlineKeyboardArrowRight className={clsx('size-8')} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
