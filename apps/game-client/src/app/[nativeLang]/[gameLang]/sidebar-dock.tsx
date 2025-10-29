'use client';

import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { DockButton } from './dock-button';
import { dockButtons } from './dock-buttons';

export function SidebarDock({ className }: { className?: string }) {
  const pathname = usePathname();
  const cn = clsx('flex flex-col justify-center items-center', className);

  return (
    <div className={cn}>
      <div
        className={clsx(
          'mx-auto',
          'rounded-xl border-1 border-slate-300',
          'overflow-hidden',
          'flex flex-col',
        )}
      >
        {dockButtons.map((button) => {
          const IconActive = button.iconActive;
          const IconInactive = button.iconInactive;
          const isActive = pathname === button.href;
          return (
            <DockButton
              key={button.href}
              href={button.href}
              isActive={isActive}
              className="w-16 h-16 text-sm"
            >
              {isActive ? (
                <IconActive className={'size-6'} />
              ) : (
                <IconInactive className={'size-6'} />
              )}
              <span>{button.label}</span>
            </DockButton>
          );
        })}
      </div>
    </div>
  );
}
