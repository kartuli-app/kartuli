'use client';
import type { HomeLetterItem } from '@game-client/ui/screens/home/view/home-view';

import clsx from 'clsx';

// the audio files are stored in public/audios/
// the file name is the target script with the extension .mp3
// for example, the file name for the letter 'ა' is 'ა.mp3'
const playLetterSoundByTargetScript = async (targetScript: string) => {
  const audio = new Audio(`/audios/${targetScript}.mp3`);
  try {
    await audio.play();
  } catch {
    // Playback may be blocked or the source may be missing; avoid unhandled rejections.
  }
};

const LetterItemCard = ({
  item,
  className,
}: Readonly<{ item: HomeLetterItem; className?: string; key: string }>) => {
  const onClick = () => {
    void playLetterSoundByTargetScript(item.targetScript);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      key={item.id}
      className={clsx(
        //
        'text-ds1-color-text-900',
        'py-ds1-spacing-large',
        'rounded-md',
        'w-full',
        'mx-auto',
        'flex',
        'items-center',
        'justify-center',
        'col-span-1',
        'rounded-lg',
        'hover:bg-ds1-color-text-200',
        'active:bg-ds1-color-text-200',
        'cursor-pointer',
        // 'border',
        className,
      )}
    >
      {item.type === 'letter' && (
        <div className="flex flex-col items-center justify-center gap-ds1-spacing-small w-full">
          <div className="text-4xl font-georgian relative w-full flex items-center justify-center max-w-12">
            {/* we add 2 horizontal lines at 33% and 66% of the height with 1px height and 100% width */}
            <div className="absolute top-0 left-0 w-full h-1/3 border-y-2 border-blue-200 z-10"></div>
            <div className="absolute top-2/3 left-0 w-full h-1/3 border-y-2 border-blue-200 z-10"></div>
            <div className="z-20 font-medium">{item.targetScript}</div>
          </div>
          <div className="text-xl flex gap-0 text-slate-600">
            <span className="text-orange-500">[</span>
            {item.transliteration}
            <span className="text-orange-500">]</span>
          </div>
        </div>
      )}
    </button>
  );
};

export function LessonCard({
  homeLesson,
  className,
  isSingleLessonModule,
}: Readonly<{
  homeLesson: {
    id: string;
    title: string;
    items: HomeLetterItem[];
  };
  className?: string;
  isSingleLessonModule: boolean;
}>) {
  return (
    <div
      key={homeLesson.id}
      className={clsx(
        //
        'flex flex-col',
        'justify-start',
        //
        'gap-0',
        'p-ds1-spacing-small',
        //
        'w-full',
        //
        className,
      )}
    >
      {/* card header (title and views count) */}
      <div
        className={clsx(
          //
          'flex justify-between',
        )}
      >
        {isSingleLessonModule ? null : (
          <div
            className={clsx(
              //
              'text-xl w-full text-center',
            )}
          >
            {homeLesson.title}
          </div>
        )}
      </div>
      {/* card body (items) */}
      <div
        className={clsx(
          //
          // 'gap-y-ds1-spacing-large',
          'gap-0',
          'w-full',
          'grid grid-cols-3',
          // 'border',
          isSingleLessonModule && 'grid-cols-5 sm:grid-cols-7 lg:grid-cols-10',
        )}
      >
        {homeLesson.items.map((item) => {
          return <LetterItemCard key={item.id} item={item} className="" />;
        })}
      </div>
    </div>
  );
}
