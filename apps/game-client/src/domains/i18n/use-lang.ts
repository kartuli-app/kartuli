'use client';

import { useRouterContext } from '../app-shell/use-router-context';
import type { SupportedLng } from './config';
import { pathToLang } from './path-to-lang';

export function useLang(): SupportedLng {
  const { path } = useRouterContext();
  return pathToLang(path);
}
