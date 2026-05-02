'use client';

import {
  NavigationContext,
  type NavigationContextValue,
  type NavigationLinkProps,
} from '@game-client/navigation/navigation-context';
import { type ReactNode, useMemo, useSyncExternalStore } from 'react';
import { splitLocalizedPathname } from './split-localized-pathname';

function useBrowserPathname(): string {
  return useSyncExternalStore(
    (onStoreChange) => {
      globalThis.addEventListener('popstate', onStoreChange);
      return () => globalThis.removeEventListener('popstate', onStoreChange);
    },
    () => globalThis.location.pathname,
    () => '/',
  );
}

function SpaNavigationLink({
  href,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
  onClick,
}: NavigationLinkProps) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function SpaNavigationRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const localizedPathname = useBrowserPathname();
  const { pathname } = splitLocalizedPathname(localizedPathname);

  const value = useMemo<NavigationContextValue>(
    () => ({
      navigate: (to, opts) => {
        if (opts?.replace) {
          globalThis.location.replace(to);
        } else {
          globalThis.location.assign(to);
        }
      },
      back: () => {
        globalThis.history.back();
      },
      NavigationLink: SpaNavigationLink,
      pathname,
      localizedPathname,
    }),
    [pathname, localizedPathname],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
