'use client';

import {
  NavigationContext,
  type NavigationContextValue,
  type NavigationLinkProps,
} from '@game-client/navigation/navigation-context';
import { GameShell } from '@game-client/ui/shared/components/game-shell';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useMemo } from 'react';
import { splitLocalizedPathname } from './split-localized-pathname';

function NextNavigationLink({
  href,
  className,
  children,
  'aria-label': ariaLabel,
  prefetch = false,
  onClick,
}: NavigationLinkProps) {
  return (
    <NextLink
      href={href}
      className={className}
      aria-label={ariaLabel}
      prefetch={prefetch}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
}

export function NextNavigationRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const localizedPathname = usePathname();
  const { pathname } = splitLocalizedPathname(localizedPathname);

  const value = useMemo<NavigationContextValue>(
    () => ({
      navigate: (to, opts) => {
        if (opts?.replace) {
          router.replace(to);
        } else {
          router.push(to);
        }
      },
      back: () => {
        router.back();
      },
      NavigationLink: NextNavigationLink,
      pathname,
      localizedPathname,
      navigationMode: 'next',
    }),
    [router, pathname, localizedPathname],
  );

  return (
    <NavigationContext.Provider value={value}>
      <GameShell>{children}</GameShell>
    </NavigationContext.Provider>
  );
}
