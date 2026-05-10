import { cn } from '@kartuli/ui/utils/cn';
import { FaBook } from 'react-icons/fa6';
import {
  IoEyeOutline,
  IoPlayCircleOutline,
  IoSettingsOutline,
  IoSettingsSharp,
} from 'react-icons/io5';
import {
  PiArrowsClockwiseBold,
  PiArrowsClockwiseLight,
  PiBookOpenTextFill,
  PiBookOpenTextLight,
} from 'react-icons/pi';
import styles from './explore-alphabet-card.module.css';
import { Pattern } from './pattern';

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

function DockButton({
  label,
  icon,
  iconActive,
  isActive,
}: Readonly<{
  label: string;
  isActive?: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconActive: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}>) {
  const Icon = isActive ? iconActive : icon;
  return (
    <button
      type="button"
      className={cn(
        //
        'flex',
        'cursor-pointer',
        'items-center',
        'rounded-md',
        'flex',
        'flex-col lg:flex-row',
        'gap-1 lg:gap-4',
        'md:px-4',
        'justify-center lg:justify-start',
        'w-15 lg:w-full',
        'h-15 lg:h-11',
        !isActive && 'hover:bg-kartuli-color-primitive-neutral-500',
        isActive && 'bg-kartuli-color-primitive-neutral-900',
        'group',
      )}
    >
      <Icon
        className={cn(
          //
          'shrink-0',
          'size-6',
          'text-kartuli-color-primitive-neutral-500',
          !isActive && 'group-hover:text-kartuli-color-primitive-neutral-50',
          isActive && 'text-kartuli-color-primitive-neutral-50',
        )}
        aria-hidden
      />
      <div
        className={cn(
          //
          'text-sm lg:text-lg',
          'text-kartuli-color-primitive-neutral-500',
          !isActive && 'group-hover:text-kartuli-color-primitive-neutral-50',
          isActive && 'text-kartuli-color-primitive-neutral-50',
        )}
      >
        {label}
      </div>
    </button>
  );
}

function TopBar() {
  return (
    <div
      className={cn(
        //
        'flex fixed',
        //md
        'h-(--app-bar-height)',
        'left-0 md:left-(--rail-collapsed-width) lg:left-(--rail-expanded-width)',
        'right-0 2xl:mr-(--rail-expanded-width)',
        'top-0',
        //
        'justify-between',
        'items-center',
        'bg-kartuli-color-semantic-surface',
        //
        'border-b-2',
        'border-kartuli-color-semantic-surface-border',
        'z-20',
        // 'bg-black',
      )}
    >
      <ResponsiveContainer>
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center justify-center borderr h-11 w-11 shrink-0">
            <picture>
              <source srcSet="/images/mascot-64.webp" type="image/webp" />
              <img
                className="scale-160 size-11"
                src="/images/mascot-64.png"
                alt="kartuli.app mascot"
              />
            </picture>
          </div>
          <div
            className={cn(
              'flex',
              'flex-col mdd:flex-row',
              'items-start mdd:items-center',
              'justify-center',
              'uppercase borderr',
              'gap-0 md:gap-0',
              'h-14',
            )}
          >
            <h1 className="text-kartuli-color-primitive-neutral-500 text-sm font-bold">
              kartuli.app
            </h1>
            <h1 className="text-kartuli-color-primitive-neutral-900 text-xl font-black">
              Learn: Alphabet
            </h1>
          </div>
          {/* <div className="ml-auto flex items-center justify-center borderr h-11 w-11 shrink-0 rounded-full border">
            <SearchIcon className="size-11" />
          </div> */}
        </div>
      </ResponsiveContainer>
    </div>
  );
}

function LeftRail({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) {
  return (
    <div
      className={cn(
        'flex',
        'fixed',
        'left-0',
        'bottom-0',
        'right-0',
        'h-(--rail-dock-height) md:h-full',
        'w-full md:w-(--rail-collapsed-width) lg:w-(--rail-expanded-width)',
        'justify-center md:justify-start',
        'bg-kartuli-color-semantic-surface',
        //
        'border-t-2 md:border-t-0',
        'border-r-0 md:border-r-2',
        'border-kartuli-color-semantic-surface-border',
        'z-20',
        className,
      )}
    >
      <div
        className={cn(
          'flex',
          'gap-1 md:gap-2 lg:gap-4',
          'items-center',
          'flex-row md:flex-col',
          'justify-center md:justify-start',
          'w-auto lg:w-full',
          'p-4 lg:p-8',
        )}
      >
        {children}
      </div>
    </div>
  );
}

function RightRail({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) {
  return (
    <div
      className={cn(
        //
        'hidden 2xl:fixed overflow-hidden',
        'right-0 top-0 bottom-0',
        //
        'h-full',
        'w-(--rail-expanded-width)',
        //
        'flex',
        //
        'border-l-0 2xl:border-l-2',
        'border-kartuli-color-semantic-surface-border',
        className,
      )}
    >
      {children}
    </div>
  );
}

function MainContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        //
        'ml-0 md:ml-(--rail-collapsed-width) lg:ml-(--rail-expanded-width)',
        'mr-0 2xl:mr-(--rail-expanded-width)',
        'mt-(--app-bar-height)',
        //
        'pb-(--rail-dock-height) md:pb-0',
        // 'bg-black',
      )}
    >
      {children}
    </div>
  );
}

function ResponsiveContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        //
        'flex-1',
        'flex flex-col',
        'w-full',
        'max-w-5xl',
        'mx-auto',
        // 'sm:bg-red-100 md:bg-orange-500 lg:bg-red-500 xl:bg-green-600 2xl:bg-blue-800 ',
        // 'bg-red-500',
        'p-4',
      )}
    >
      {children}
    </div>
  );
}
function ExploreAlphabetPage() {
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
    // shell
    <div
      className={cn(
        //
        'flex-1',
        'flex flex-col',
        'relative',
      )}
    >
      {/* top bar */}
      <TopBar />

      {/* scroll container */}
      <MainContainer>
        <ResponsiveContainer>
          <div className="flex flex-col gap-14">
            {modules.map((module) => (
              <CardGroup key={module.id}>
                {module.lessons.map((lesson) => (
                  <Card key={lesson.id} module={module} lesson={lesson} />
                ))}
              </CardGroup>
            ))}
          </div>
        </ResponsiveContainer>
      </MainContainer>

      {/* right rail */}
      <RightRail>
        <Pattern />
      </RightRail>
      {/* left rail */}
      <LeftRail>
        <DockButton
          label="Learn"
          icon={PiBookOpenTextLight}
          iconActive={PiBookOpenTextFill}
          isActive
        />
        <DockButton label="Saved" icon={IoSettingsOutline} iconActive={IoSettingsSharp} />
        <DockButton
          label="Profile"
          icon={PiArrowsClockwiseLight}
          iconActive={PiArrowsClockwiseBold}
        />
        <DockButton
          label="Translit"
          icon={PiArrowsClockwiseLight}
          iconActive={PiArrowsClockwiseBold}
        />
        <DockButton label="Settings" icon={IoSettingsOutline} iconActive={IoSettingsSharp} />
      </LeftRail>
    </div>
  );
}

export default ExploreAlphabetPage;
