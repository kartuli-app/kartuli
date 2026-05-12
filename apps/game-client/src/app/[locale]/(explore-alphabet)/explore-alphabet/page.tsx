'use client';
import { GameAppBarIconLink } from '@game-client/ui/components/layout/app-bar-icon-action';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { cn } from '@kartuli/ui/utils/cn';
import { IoEyeOutline, IoPlayCircleOutline, IoSearchCircleOutline } from 'react-icons/io5';

interface Item {
  id: string;
  name: string;
  nativeScript: string;
  transliteration: string;
}

function CardsGrid({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={cn('grid gap-8', 'grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] ')}>
      {children}
    </div>
  );
}

function CardSectionContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        //
        'w-full',
        'px-4',
        'py-2',
        'gap-4',
        'flex',
      )}
    >
      {children}
    </div>
  );
}

function Card({
  context,
  title,
  items,
}: Readonly<{ context: string; title: string; items: Item[]; fullWidth?: boolean }>) {
  return (
    <div
      className={cn(
        //
        'w-full min-w-0',
        'flex',
        'flex-col',
        'rounded-lg',
        'border-2',
        'border-kartuli-color-primitive-neutral-200',
      )}
    >
      {/* card header */}
      <div
        className={cn(
          //
          'border-b-2 border-kartuli-color-primitive-neutral-200',
        )}
      >
        <CardSectionContainer>
          <div className="flex flex-col">
            <div className="text-sm text-kartuli-color-primitive-neutral-500 font-bold">
              {context}
            </div>
            <div className="text-xl text-kartuli-color-primitive-neutral-900 font-black">
              {title}
            </div>
          </div>
        </CardSectionContainer>
      </div>
      {/* card body */}
      <CardSectionContainer>
        <div
          className={cn(
            //
            'grid grid-cols-4 gap-y-4 py-2',
            'w-full',
          )}
        >
          {items.map((item) => {
            const key = `${context}-${item.id}`;
            return <CardItemPreview key={key} item={item} />;
          })}
        </div>
      </CardSectionContainer>
      {/* card footer */}
      <div
        className={cn(
          //
          'border-t-2 border-kartuli-color-primitive-neutral-200',
          'flex',
          'items-center',
          'justify-center',
          'mt-auto',
        )}
      >
        <CardSectionContainer>
          <div
            className={cn(
              //
              'w-full',
              'flex gap-2 justify-start items-center',
              'py-2',
              // 'bg-red-100',
            )}
          >
            <CardButton icon={IoEyeOutline} label="Study" variant="secondary" />
            <CardButton icon={IoPlayCircleOutline} label="Play" variant="primary" />
          </div>
        </CardSectionContainer>
      </div>
    </div>
  );
}

function CardItemPreview({ item }: Readonly<{ item: Item }>) {
  return (
    <div
      className={cn(
        'aspect-square w-full min-h-0',
        'justify-center',
        'flex flex-col',
        'gap-0',
        'hover:bg-kartuli-color-primitive-neutral-200',
        'cursor-pointer',
        // 'border',
      )}
    >
      <div
        className={cn(
          //
          'font-georgian',
          'text-4xl',
          'text-kartuli-color-primitive-neutral-900',
          'flex',
          'items-center',
          'justify-center',
          'relative',
          'grow',
          // 'bg-red-100',
        )}
      >
        <span className="absolute top-3/10 left-0 bg-blue-200 w-full h-[2px]"></span>
        <span className="absolute top-6/10 left-0 bg-blue-200 w-full h-[2px]"></span>
        <span className="z-10">{item.nativeScript}</span>
      </div>
      <div
        className={cn(
          //
          'text-xl',
          'text-kartuli-color-primitive-neutral-500',
          'flex',
          'items-center',
          'justify-center',
          // 'bg-blue-100',
        )}
      >
        <span className="text-orange-500">[</span>
        <span>{item.transliteration}</span>
        <span className="text-orange-500">]</span>
      </div>
    </div>
  );
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
        'items-center',
        'justify-center',
        'h-full',
        'w-full',
        'cursor-pointer',
        'border-2',
        'rounded-4xl',
        'group',
        'uppercase',
        'gap-2',
        'px-4',
        'py-2',
        variant === 'primary' && 'bg-kartuli-color-primitive-neutral-900',
        variant === 'primary' && 'hover:bg-kartuli-color-primitive-neutral-950',
        variant === 'primary' && 'border-kartuli-color-primitive-neutral-900',
        variant === 'primary' && 'w-5/10',
        variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        variant === 'secondary' && 'hover:bg-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'border-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'w-5/10',
      )}
    >
      <Icon
        className={cn(
          //
          'shrink-0',
          'size-5',
          'text-kartuli-color-primitive-neutral-500',
          variant === 'primary' && 'text-kartuli-color-primitive-neutral-50',
          variant === 'secondary' && 'text-kartuli-color-primitive-neutral-900',
          variant === 'secondary' && 'group-hover:text-kartuli-color-primitive-neutral-50',
        )}
        aria-hidden
      />
      <div
        className={cn(
          //
          'text-base',
          variant === 'primary' && 'text-kartuli-color-primitive-neutral-50',
          variant === 'secondary' && 'text-kartuli-color-primitive-neutral-900',
          variant === 'secondary' && 'group-hover:text-kartuli-color-primitive-neutral-50',
        )}
      >
        {label}
      </div>
    </button>
  );
}

function AlphabetCatalog() {
  const lessonsAlphabet = [
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
        {
          id: 'letter-v',
          name: 'V',
          nativeScript: 'ვ',
          transliteration: 'v',
        },
        {
          id: 'letter-qari',
          name: '1',
          nativeScript: 'ქ',
          transliteration: 'q',
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
          id: 'letter-v',
          name: 'V',
          nativeScript: 'ვ',
          transliteration: 'v',
        },
        {
          id: 'letter-qarii',
          name: '1',
          nativeScript: 'ქ',
          transliteration: 'q',
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
        {
          id: 'letter-g',
          name: 'G',
          nativeScript: 'გ',
          transliteration: 'g',
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
        {
          id: 'letter-g',
          name: 'G',
          nativeScript: 'გ',
          transliteration: 'g',
        },
        {
          id: 'letter-v3',
          name: 'V',
          nativeScript: 'ვ',
          transliteration: 'v',
        },
        {
          id: 'letter-zhanii',
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
        {
          id: 'letter-g',
          name: 'G',
          nativeScript: 'გ',
          transliteration: 'g',
        },
        {
          id: 'letter-v',
          name: 'V',
          nativeScript: 'ვ',
          transliteration: 'v',
        },
        {
          id: 'letter-zhanie',
          name: 'Zhani',
          nativeScript: 'ზ',
          transliteration: 'zh',
        },
      ],
    },
    {
      id: 'lesson-alphabet-difficult-soundss',
      name: 'Difficult Sounds',
      items: [
        {
          id: 'letter-qari24',
          name: 'Qari',
          nativeScript: 'ქ',
          transliteration: 'q',
        },
        {
          id: 'letter-zhani23',
          name: 'Zhani',
          nativeScript: 'ზ',
          transliteration: 'zh',
        },
        {
          id: 'letter-v3',
          name: 'V',
          nativeScript: 'ვ',
          transliteration: 'v',
        },
      ],
    },
  ];
  const greetings = [
    'გამარჯობა ჩემო მეგობარო', // hello my friend
    'დილა მშვიდობისა', // good morning
    'საღამო მშვიდობისა', // good afternoon
  ];
  const contextAwareGreeting = greetings[1];
  return (
    <div className="flex flex-col gap-8">
      {/* screen support copy */}
      <div className="flex justify-center py-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl text-center">👋</h2>
          <h2 className="text-4xl text-center text-kartuli-color-primitive-neutral-500">
            <span className="font-georgian">{contextAwareGreeting}</span>
          </h2>
          <h3 className="text-2xl text-kartuli-color-primitive-neutral-900 text-center">
            Lets learn Georgian!
          </h3>
        </div>
      </div>
      {/* lessons grid */}
      <CardsGrid>
        {lessonsAlphabet.map((lesson) => (
          <Card key={lesson.id} context="Alphabet" title={lesson.name} items={lesson.items} />
        ))}
      </CardsGrid>
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
