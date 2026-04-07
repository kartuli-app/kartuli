'use client';

import { type ComponentType, createContext, type ReactNode, useContext } from 'react';

export type NavigationLinkProps = Readonly<{
  href: string;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
  prefetch?: boolean;
  onClick?: () => void;
}>;

export type NavigationContextValue = Readonly<{
  navigate: (to: string, opts?: { replace?: boolean }) => void;
  back: () => void;
  NavigationLink: ComponentType<NavigationLinkProps>;
  /** Path without the locale prefix (e.g. `/learn` when the URL is `/en/learn`). */
  pathname: string;
  /** Full pathname including locale when present (matches Next `usePathname()` for this app). */
  localizedPathname: string;
  navigationMode: 'spa' | 'next';
}>;

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation(): NavigationContextValue {
  const value = useContext(NavigationContext);
  if (value === null) {
    throw new Error('useNavigation must be used within a NavigationRootLayout (Next or SPA).');
  }
  return value;
}

export { NavigationContext };
