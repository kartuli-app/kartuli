'use client';

import { NavigationMenu } from '@base-ui-components/react/navigation-menu';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { PiDotsThreeOutline, PiDotsThreeOutlineFill } from 'react-icons/pi';
import { ROUTES } from '@/domains/app/routes/routes';
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
  const hasSidebar = useMediaQuery('(min-width: 1024px)');
  const menuSide = hasSidebar ? 'right' : 'top';
  const isMenuOpen = openMenuValue !== null;

  useEffect(() => {
    // Close the menu whenever the route changes.
    setOpenMenuValue(null);
  }, [pathname]);

  return (
    <NavigationMenu.Root
      value={openMenuValue}
      onValueChange={(nextValue) => {
        setOpenMenuValue(nextValue ?? null);
      }}
      delay={1}
      // closeDelay={20000000}
    >
      <NavigationMenu.List
        className={clsx(
          //
          'list-none',
          'm-0 p-0',
        )}
      >
        <NavigationMenu.Item>
          {/* button to open the menu */}
          <NavigationMenu.Trigger
            aria-label="Menu"
            className={clsx(
              'flex flex-col',
              'justify-center items-center',
              'cursor-pointer',
              'h-14 w-14',
              'relative',
              'focus-ring',
              'text-xs',
              {
                'text-slate-400': !isMenuOpen,
                'text-slate-200': isMenuOpen,
              },
            )}
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              {isMenuOpen ? (
                <PiDotsThreeOutlineFill className="size-6" />
              ) : (
                <PiDotsThreeOutline className="size-6" />
              )}
              <span className="font-bold pt-1">More</span>
            </div>
          </NavigationMenu.Trigger>
          {/* content of the menu */}
          <NavigationMenu.Content
            className={clsx(
              //
              'flex',
              'p-2',
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
                  <li key={entry.id} value="test-item">
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
            // On mobile, constrain the positioner to viewport
          )}
          side={menuSide}
          align={'start'}
          sideOffset={12}
        >
          <NavigationMenu.Popup
            className={clsx(
              //
              'shadow-lg',
              'rounded-lg',
              'bg-slate-500',
              'transition-all duration-300 ease-out',
              'data-[starting-style]:opacity-0',
              'data-[starting-style]:scale-95',
              'data-[open]:opacity-100',
              'data-[open]:scale-100',
              'data-[ending-style]:opacity-0',
              'data-[ending-style]:scale-95',
              'data-[starting-style]:translate-y-[-16px]',
              'data-[open]:translate-y-0',
              'data-[ending-style]:translate-y-[-16px]',
              // On mobile, shift menu left to keep it in viewport
              !hasSidebar &&
                clsx(
                  'data-[starting-style]:-translate-x-[150px]',
                  'data-[open]:-translate-x-[150px]',
                  'data-[ending-style]:-translate-x-[150px]',
                ),
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
