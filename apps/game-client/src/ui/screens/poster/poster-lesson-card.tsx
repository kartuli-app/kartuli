import type { HomeLesson, HomeLetterItem } from '@game-client/ui/screens/home/view/home-view';
import clsx from 'clsx';

function PosterLetterItemCard({ item }: Readonly<{ item: HomeLetterItem }>) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'rounded-[28px]',
        'border border-black/8',
        'bg-white/92',
        'px-4 py-3',
        'shadow-[0_16px_36px_rgba(15,23,42,0.08)]',
      )}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div
          className={clsx(
            'font-georgian relative flex w-full items-center justify-center px-4 text-[76px] leading-none text-slate-900',
          )}
        >
          <div className="absolute top-0 left-0 z-10 h-1/3 w-full border-y-2 border-sky-200" />
          <div className="absolute top-2/3 left-0 z-10 h-1/3 w-full border-y-2 border-sky-200" />
          <div className="z-20 font-medium">{item.targetScript}</div>
        </div>
        <div className="flex items-center gap-1 text-[28px] leading-none text-slate-600">
          <span className="text-orange-500">[</span>
          <span>{item.transliteration}</span>
          <span className="text-orange-500">]</span>
        </div>
      </div>
    </div>
  );
}

export function PosterLessonCard({ homeLesson }: Readonly<{ homeLesson: HomeLesson }>) {
  const letterItems = homeLesson.items.filter(
    (item): item is HomeLetterItem => item.type === 'letter',
  );

  return (
    <div className="grid h-full grid-cols-6 auto-rows-fr gap-4">
      {letterItems.map((item) => (
        <PosterLetterItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
