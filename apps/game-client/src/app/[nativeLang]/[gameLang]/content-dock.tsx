'use client';

import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { DockButton } from './dock-button';
import { dockButtons } from './dock-buttons';

export function ContentDock({ className }: { className?: string }) {
  const cn = clsx(
    'md:hidden',
    'fixed bottom-0 left-0 right-0 h-[var(--content-dock-height)]',
    'bg-slate-100',
    'z-10',
    'border-t-1 border-slate-300',
    'flex items-center justify-center',
    // 'bg-red-100',
    className,
  );
  const pathname = usePathname();

  return (
    <div className={cn}>
      <div
        className={clsx(
          'flex justify-center items-center',
          'bg-slate-100',
          // 'border-t-1 border-slate-300',
          className,
        )}
      >
        <div className={clsx(className, 'flex justify-center items-center')}>
          {dockButtons.map((button) => {
            const IconActive = button.iconActive;
            const IconInactive = button.iconInactive;
            const isActive = pathname === button.href;
            return (
              <DockButton
                key={button.href}
                isActive={isActive}
                href={button.href}
                className="w-[var(--content-dock-height)] h-[var(--content-dock-height)]"
              >
                {isActive ? (
                  <IconActive className={'size-5'} />
                ) : (
                  <IconInactive className={'size-5'} />
                )}
                <span>{button.label}</span>
              </DockButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
