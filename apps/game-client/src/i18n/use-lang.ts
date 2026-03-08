'use client';

import { pathToLang } from '@game-client/i18n/path-to-lang';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';

export function useLang(): SupportedLng {
  const { path } = useRouterContext();
  return pathToLang(path);
}
