import { cn } from '@kartuli/ui/utils/cn';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
import {
  PiArrowsClockwiseBold,
  PiArrowsClockwiseLight,
  PiBookOpenTextFill,
  PiBookOpenTextLight,
} from 'react-icons/pi';
import { Pattern } from './pattern';

function Card({ index }: Readonly<{ index: number }>) {
  return (
    <div
      className={cn(
        //
        'w-full',
        'h-48',
        'flex',
        'border',
        'rounded-xl',
        'p-2',
        'items-center',
        'justify-center',
        'text-xl',
        'text-black',
        'bg-white',
      )}
    >
      Card {index}
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
        'lg:max-w-4xl xl:max-w-4xl',
        'mx-auto',
        // 'bg-red-500',
        'p-4',
      )}
    >
      {children}
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
        'gap-1 lg:gap-2',
        'md:px-4',
        'justify-center lg:justify-start',
        'w-15 lg:w-full',
        'h-15 lg:h-11',
        !isActive && 'hover:bg-slate-200',
        isActive && 'bg-slate-900',
      )}
    >
      <Icon
        className={cn(
          //
          'shrink-0',
          'size-6',
          'text-slate-900',
          isActive && 'text-white',
        )}
        aria-hidden
      />
      <div
        className={cn(
          //
          'text-sm lg:text-lg',
          isActive && 'text-white',
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
        //
        'h-(--app-bar-height)',
        'left-0 md:left-(--rail-collapsed-width) lg:left-(--rail-expanded-width)',
        'right-0 xl:right-(--rail-expanded-width)',
        'top-0',
        //
        'justify-between',
        'items-center',
        'bg-white',
        //
      )}
    >
      <ResponsiveContainer>
        <h1 className="text-black text-2xl font-bold">KARTULI.APP</h1>
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
        // ' bg-slate-200',
        'bg-white',
        'border-t-2 md:border-t-0',
        'border-r-0 md:border-r-2',
        'border-slate-300',

        className,
      )}
    >
      <div
        className={cn(
          'flex',
          'gap-1 md:gap-2',
          'items-center',
          'flex-row md:flex-col',
          'justify-center md:justify-start',
          'w-auto lg:w-full',
          // ' bg-red-500',
          'p-4',
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
        'hidden xl:fixed',
        'right-0 top-0 bottom-0',
        //
        'h-full',
        'w-(--rail-expanded-width)',
        //
        'flex',
        // ' bg-slate-200',
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
        'mr-0 xl:mr-(--rail-expanded-width)',
        'mt-(--app-bar-height)',
        // 'bg-slate-400',
        //
        'pb-(--rail-dock-height) md:pb-0',
      )}
    >
      {children}
    </div>
  );
}

function ExploreAlphabetPage() {
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
          <div
            className={cn(
              //
              'grid grid-cols-3',
              'gap-4',
              '',
              // 'bg-pink-700',
              //
            )}
          >
            {Array.from({ length: 20 }).map((_, index) => {
              const cardIndex = index + 1;
              return <Card key={cardIndex} index={cardIndex} />;
            })}
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
