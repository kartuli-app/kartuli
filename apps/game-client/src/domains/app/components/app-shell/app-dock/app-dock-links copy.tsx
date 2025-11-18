'use client';

import { Tooltip } from '@base-ui-components/react/tooltip';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDockPages, ROUTES } from '@/app/app/navigation/utils';
import { useMediaQuery } from '@/domains/shared/hooks/use-media-query';

const dockButtons = getDockPages()
  .filter(
    (route): route is typeof route & { dock: NonNullable<typeof route.dock> } =>
      route.dock !== undefined,
  )
  .map((route) => ({
    href: route.path,
    iconActive: route.dock.iconActive,
    iconInactive: route.dock.iconInactive,
    label: route.dock.label,
    isActive: route.dock.isActive,
  }));

export function AppDockLinks() {
  const pathname = usePathname();
  const hasSidebar = useMediaQuery('(min-width: 1024px)');
  const tooltipSide = hasSidebar ? 'right' : 'top';
  const isAnonymous = true;

  return (
    <Tooltip.Provider>
      {dockButtons.map((button) => {
        const IconActive = button.iconActive;
        const IconInactive = button.iconInactive;
        const isActive = button.isActive ? button.isActive(pathname) : pathname === button.href;
        const isProfile = button.href === ROUTES.PROFILE.path;
        const avatarUrl = isAnonymous ? '/anonymous-avatar.png' : '/real-avatar.jpg';
        const currentLevel = 11;

        return (
          <Tooltip.Root key={button.href} delay={1}>
            <Tooltip.Trigger
              aria-label={button.label}
              render={(triggerProps) => {
                const { className: triggerClassName, ...triggerRestProps } = triggerProps;
                return (
                  <Link
                    {...triggerRestProps}
                    href={button.href}
                    prefetch
                    className={clsx(
                      triggerClassName,
                      'flex',
                      'justify-center items-center',
                      'cursor-pointer',
                      'h-12 w-12',
                      'rounded-full',
                      'relative',
                      'group',
                      'focus-ring',
                      {
                        'bg-violet-800 text-white': isActive,
                        'bg-slate-200 hover:bg-slate-300': !isActive,
                      },
                    )}
                  >
                    {isProfile ? (
                      <>
                        <img
                          src={avatarUrl}
                          alt="Profile avatar"
                          className={clsx(
                            //
                            'size-12 rounded-full object-cover',
                            {
                              'grayscale group-hover:grayscale-[60%]': !isActive,
                            },
                          )}
                        />
                        <span
                          className={clsx(
                            'pointer-events-none',
                            'absolute',
                            '-top-2',
                            '-right-2',
                            'border',
                            'border-slate-300',
                            'w-6 h-6',
                            'flex justify-center items-center',
                            'rounded-full',
                            'text-xs',
                            'font-bold',
                            'whitespace-nowrap',
                            {
                              'bg-purple-900 text-white': isActive,
                              'bg-slate-200': !isActive,
                            },
                          )}
                        >
                          {currentLevel}
                        </span>
                      </>
                    ) : isActive ? (
                      <IconActive className="size-8" />
                    ) : (
                      <IconInactive className="size-8" />
                    )}
                  </Link>
                );
              }}
            />

            <Tooltip.Portal>
              <Tooltip.Positioner side={tooltipSide} align="center" sideOffset={8}>
                <Tooltip.Popup
                  className={clsx(
                    //
                    'p-2',
                    'rounded-lg',
                    'shadow-lg',
                    'text-sm',
                    'bg-slate-500 text-white',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out',
                  )}
                >
                  {button.label}
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        );
      })}
    </Tooltip.Provider>
  );
}
