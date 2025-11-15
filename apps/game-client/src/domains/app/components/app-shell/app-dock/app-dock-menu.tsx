'use client';

import { NavigationMenu } from '@base-ui-components/react/navigation-menu';
import { Tooltip } from '@base-ui-components/react/tooltip';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { ROUTES } from '@/app/app/navigation/utils';
import { useMediaQuery } from '@/domains/shared/hooks/use-media-query';

type MoreMenuEntry =
  | { type: 'link'; id: string; label: string; href: string }
  | { type: 'separator'; id: string };

const moreMenuEntries: MoreMenuEntry[] = [
  { type: 'link', id: 'resources', label: 'Resources', href: ROUTES.RESOURCES.path },
  { type: 'separator', id: 'separator-1' },
  { type: 'link', id: 'terms', label: 'Terms', href: ROUTES.TERMS.path },
  { type: 'link', id: 'privacy', label: 'Privacy', href: ROUTES.PRIVACY.path },
];

export function AppDockMenu() {
  const pathname = usePathname();
  const [openMenuValue, setOpenMenuValue] = useState<string | null>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const hasSidebar = useMediaQuery('(min-width: 1024px)');
  const menuSide = hasSidebar ? 'right' : 'top';
  const tooltipSide = hasSidebar ? 'right' : 'top';
  const isMenuOpen = openMenuValue !== null;

  useEffect(() => {
    // Close the menu whenever the route changes.
    setOpenMenuValue(null);
  }, [pathname]);

  return (
    <Tooltip.Provider>
      <NavigationMenu.Root
        value={openMenuValue}
        onValueChange={(nextValue) => {
          setOpenMenuValue(nextValue ?? null);
        }}
        delay={1}
      >
        <NavigationMenu.List
          className={clsx(
            //
            'list-none',
            'm-0 p-0',
          )}
        >
          <NavigationMenu.Item>
            <Tooltip.Root
              delay={1}
              open={isMenuOpen ? false : tooltipOpen}
              onOpenChange={setTooltipOpen}
            >
              <Tooltip.Trigger
                aria-label="Menu"
                render={(triggerProps) => {
                  const { ref, className, ...restProps } = triggerProps;
                  return (
                    <NavigationMenu.Trigger
                      {...(restProps as Record<string, unknown>)}
                      ref={ref}
                      className={clsx(
                        className,
                        'flex',
                        'justify-center items-center',
                        'cursor-pointer',
                        'h-12 w-12',
                        'rounded-full',
                        'focus-ring',
                        {
                          'bg-slate-200': !isMenuOpen,
                          'bg-slate-300': isMenuOpen,
                        },
                      )}
                    >
                      <MdOutlineMenu
                        className={clsx(
                          //
                          'size-8',
                        )}
                      />
                    </NavigationMenu.Trigger>
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
                    Menu
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <NavigationMenu.Content
              className={clsx(
                //
                'flex',
              )}
            >
              <ul
                className={clsx(
                  //
                  'flex flex-col gap-1 py-1 w-full',
                )}
              >
                {moreMenuEntries.map((entry) =>
                  entry.type === 'separator' ? (
                    <li key={entry.id} aria-hidden="true">
                      <span
                        className={clsx(
                          //
                          'block my-2 mx-4 h-px bg-white',
                        )}
                      />
                    </li>
                  ) : (
                    <li key={entry.id}>
                      <NavigationMenuNextLink
                        href={entry.href}
                        className={clsx(
                          'outline-none',
                          'focus-ring',
                          'cursor-pointer',
                          'select-none',
                          'py-2',
                          'pl-4',
                          'pr-8',
                          'flex',
                          'text-sm',
                          'leading-4',
                          'box-border',
                          'text-white',
                          'hover:bg-white hover:text-black',
                          'focus-visible:bg-white focus-visible:text-black',
                          'rounded',
                          'w-full',
                        )}
                      >
                        {entry.label}
                      </NavigationMenuNextLink>
                    </li>
                  ),
                )}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <NavigationMenu.Portal>
          <NavigationMenu.Positioner
            className={clsx(
              //
              'outline-none',
            )}
            side={menuSide}
            align={'start'}
            sideOffset={8}
          >
            <NavigationMenu.Popup
              className={clsx(
                //
                'p-2',
                'shadow-lg',
                'rounded-lg',
                'bg-slate-500',
              )}
            >
              <NavigationMenu.Viewport
                className={clsx(
                  //
                  'min-w-[220px]',
                )}
              />
            </NavigationMenu.Popup>
          </NavigationMenu.Positioner>
        </NavigationMenu.Portal>
      </NavigationMenu.Root>
    </Tooltip.Provider>
  );
}

function NavigationMenuNextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <NavigationMenu.Link
      href={href}
      className={clsx(
        //
        'block w-full',
        className,
      )}
      render={
        <Link
          href={href}
          prefetch
          className={clsx(
            //
            'block w-full',
            'focus-ring',
            className,
          )}
        />
      }
    >
      {children}
    </NavigationMenu.Link>
  );
}
