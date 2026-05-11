import { GameAppBarIconLink } from '@game-client/ui/components/layout/app-bar-icon-action';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { cn } from '@kartuli/ui/utils/cn';
import { IoEyeOutline, IoPlayCircleOutline, IoSearchCircleOutline } from 'react-icons/io5';
import styles from './explore-alphabet-card.module.css';

function CardGroup({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        'grid gap-4',
        // Equal-width columns; column count follows the viewport, not item count.
        // Use auto-fill (not auto-fit): auto-fit collapses empty tracks, so a short
        // last row—or a group with fewer cards—would make each card wider than other groups.
        // min(100%, …) keeps one column from overflowing narrow viewports.
        'grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] ',
      )}
    >
      {children}
    </div>
  );
}

interface Item {
  id: string;
  name: string;
  nativeScript: string;
  transliteration: string;
}

interface Lesson {
  id: string;
  name: string;
  items: Item[];
}

interface Module {
  id: string;
  name: string;
  lessons: Lesson[];
}

function CardButton({
  icon,
  label,
  variant,
}: Readonly<{
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  variant: 'primary' | 'secondary';
}>) {
  const Icon = icon;
  return (
    <button
      type="button"
      className={cn(
        'flex',
        'flex-',
        'gap-2',
        'items-center',
        'justify-center',
        'w-full',
        'h-full',
        'cursor-pointer',
        variant === 'primary' && 'bg-kartuli-color-primitive-neutral-900',
        variant === 'primary' && 'hover:bg-kartuli-color-primitive-neutral-950',
        variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        variant === 'secondary' && 'hover:bg-kartuli-color-primitive-neutral-200',
        'border-2',
        'rounded-4xl',
        variant === 'primary' && 'border-kartuli-color-primitive-neutral-900',
        variant === 'secondary' && 'border-kartuli-color-primitive-neutral-500',
        'px-4 py-2',
        'group',
      )}
    >
      <Icon
        className={cn(
          //
          'shrink-0',
          'size-6',
          'text-kartuli-color-primitive-neutral-500',
          variant === 'primary' && 'text-kartuli-color-primitive-neutral-50',
          variant === 'secondary' && 'text-kartuli-color-primitive-neutral-900',
          variant === 'secondary' && 'group-hover:text-kartuli-color-primitive-neutral-900',
        )}
        aria-hidden
      />
      <div
        className={cn(
          //
          'text-sm lg:text-lg',
          'text-kartuli-color-primitive-neutral-500',
          variant === 'primary' && 'text-kartuli-color-primitive-neutral-50',
          variant === 'secondary' && 'text-kartuli-color-primitive-neutral-900',
          variant === 'secondary' && 'group-hover:text-kartuli-color-primitive-neutral-900',
        )}
      >
        {label}
      </div>
    </button>
  );
}

function Card({ module, lesson }: Readonly<{ module: Module; lesson: Lesson }>) {
  return (
    <div
      className={cn(
        //
        // Fill the grid cell; min-w-0 avoids overflow clipping issues inside grid tracks.
        'w-full min-w-0',
        // 'h-48',
        'flex',
        'flex-col',
        'border',
        'border-kartuli-color-primitive-neutral-500',
        'rounded-xl',
        'text-xl',
        'text-black',
        'bg-kartuli-color-semantic-surface',
      )}
    >
      {/* card header */}
      <div
        className={cn(
          'flex',
          'flex-col',
          'p-4',
          'h-18',
          'items-start',
          'justify-center',
          'uppercase',
          'border-b-2',
          'border-kartuli-color-primitive-neutral-900',
        )}
      >
        <div className="text-sm text-kartuli-color-primitive-neutral-500 font-bold">
          {module.name}
        </div>
        <div className="text-xl text-kartuli-color-primitive-neutral-900 font-black">
          {lesson.name}
        </div>
      </div>
      {/* Only 3 or 6 columns (2×3 vs 1×6); see explore-alphabet-card.module.css + @container on the card. */}
      <div className={cn(styles.previewGrid, 'p-4')}>
        {lesson.items.map((item) => {
          return <CardItemPreview key={item.id} item={item} />;
        })}
      </div>
      <div className={cn('flex gap-2', 'p-4 pt-0', 'mt-auto')}>
        <CardButton icon={IoEyeOutline} label="Study" variant="secondary" />
        <CardButton icon={IoPlayCircleOutline} label="Play" variant="primary" />
      </div>
    </div>
  );
}

function CardItemPreview({ item }: Readonly<{ item: Item }>) {
  return (
    <div
      className={cn(
        'aspect-square w-full min-h-0',
        'bg-kartuli-color-primitive-neutral-50 bborder border-red-500 justify-center',
        'flex flex-col gap-2',
        'hover:bg-kartuli-color-primitive-neutral-200',
        'rounded-md',
        'cursor-pointer',
      )}
    >
      <div className="bgg-red-100 font-georgian text-4xl text-kartuli-color-primitive-neutral-900 flex items-center justify-center relative">
        <span className="absolute top-0 left-0 bg-blue-200 w-full h-[2px]"></span>
        <span className="absolute top-1/3 left-0 bg-blue-200 w-full h-[2px]"></span>
        <span className="absolute top-2/3 left-0 bg-blue-200 w-full h-[2px]"></span>
        <span className="absolute bottom-0 left-0 bg-blue-200 w-full h-[2px]"></span>
        <span className="z-10">{item.nativeScript}</span>
      </div>
      <div className="bgg-green-100 text-xl text-kartuli-color-primitive-neutral-500 flex items-center justify-center">
        <span className="text-orange-500">[</span>
        <span>{item.transliteration}</span>
        <span className="text-orange-500">]</span>
      </div>
    </div>
  );
}

function AlphabetCatalog() {
  const lessonsAlphabetEasy = [
    {
      id: 'lesson-alphabet-vowels',
      name: 'Vowels',
      items: [
        {
          id: 'letter-a',
          name: 'A',
          nativeScript: 'ა',
          transliteration: 'a',
        },
        {
          id: 'letter-b',
          name: 'B',
          nativeScript: 'ბ',
          transliteration: 'b',
        },
        {
          id: 'letter-g',
          name: 'G',
          nativeScript: 'გ',
          transliteration: 'g',
        },
        {
          id: 'letter-d',
          name: 'D',
          nativeScript: 'დ',
          transliteration: 'd',
        },
        {
          id: 'letter-e',
          name: 'E',
          nativeScript: 'ე',
          transliteration: 'e',
        },
        {
          id: 'letter-v',
          name: 'V',
          nativeScript: 'ვ',
          transliteration: 'v',
        },
      ],
    },
    {
      id: 'lesson-alphabet-consonants',
      name: 'Consonants',
      items: [
        {
          id: 'letter-b',
          name: 'B',
          nativeScript: 'ბ',
          transliteration: 'b',
        },
        {
          id: 'letter-g',
          name: 'G',
          nativeScript: 'გ',
          transliteration: 'g',
        },
        {
          id: 'letter-d',
          name: 'D',
          nativeScript: 'დ',
          transliteration: 'd',
        },
      ],
    },
    {
      id: 'lesson-alphabet-difficult-sounds ',
      name: 'Difficult Sounds',
      items: [
        {
          id: 'letter-qari',
          name: '1',
          nativeScript: 'ქ',
          transliteration: 'q',
        },
        {
          id: 'letter-zhani',
          name: 'Zhani',
          nativeScript: 'ზ',
          transliteration: 'zh',
        },
      ],
    },
    {
      id: 'lesson-alphabet-hissing-sounds',
      name: 'Hissing Sounds',
      items: [
        {
          id: 'letter-shini',
          name: 'Shini',
          nativeScript: 'შ',
          transliteration: 'sh',
        },
        {
          id: 'letter-chini',
          name: 'Chini',
          nativeScript: 'ჩ',
          transliteration: 'ch',
        },
      ],
    },
  ];
  const lessonsAlphabetDifficult = [
    {
      id: 'lesson-alphabet-difficult-sounds',
      name: 'Difficult Sounds',
      items: [
        {
          id: 'letter-qari',
          name: 'Qari',
          nativeScript: 'ქ',
          transliteration: 'q',
        },
        {
          id: 'letter-zhani',
          name: 'Zhani',
          nativeScript: 'ზ',
          transliteration: 'zh',
        },
      ],
    },
    {
      id: 'lesson-alphabet-buzzing-sounds',
      name: 'Buzzing Sounds',
      items: [
        {
          id: 'letter-dzili',
          name: 'Dzili',
          nativeScript: 'ძ',
          transliteration: 'dz',
        },
        {
          id: 'letter-zhani',
          name: 'Zhani',
          nativeScript: 'ზ',
          transliteration: 'zh',
        },
      ],
    },
  ];
  const modules = [
    {
      id: 'module-alphabet-easy',
      name: 'Easy',
      lessons: lessonsAlphabetEasy,
    },
    {
      id: 'module-alphabet-difficult',
      name: 'Difficult',
      lessons: lessonsAlphabetDifficult,
    },
  ];
  return (
    <div className="flex flex-col gap-14">
      {modules.map((module) => (
        <CardGroup key={module.id}>
          {module.lessons.map((lesson) => (
            <Card key={lesson.id} module={module} lesson={lesson} />
          ))}
        </CardGroup>
      ))}
    </div>
  );
}

function ExploreAlphabetPage() {
  return (
    <AppShell
      appBar={
        <GameClientAppBar
          title="Learn: Alphabet"
          context="kartuli.app"
          action={
            <GameAppBarIconLink
              href="/explore/search"
              label="Search"
              icon={IoSearchCircleOutline}
            />
          }
        />
      }
      startRail={<GameClientDock activeItemId="learn" />}
      endRail={<RailPatternAlphabet />}
    >
      <AlphabetCatalog />
    </AppShell>
  );
}

export default ExploreAlphabetPage;
