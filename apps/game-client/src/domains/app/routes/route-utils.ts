import type { RouteConfig } from './route-config';
import { ROUTES } from './routes';

const isHubPage = (pathname: string): boolean => {
  return pathname === ROUTES.FOR_YOU.path || pathname === ROUTES.FREESTYLE.path;
};

const shouldShowBackButton = (pathname: string): boolean => {
  return !isHubPage(pathname);
};

const getPageByPath = (pathname: string): RouteConfig | undefined => {
  return Object.values(ROUTES).find((route) => route.path === pathname);
};

const getActivityRoutes = (): string[] => {
  return Object.values(ROUTES)
    .filter((route) => route.isActivity)
    .map((route) => route.path);
};

const getBackRoute = (pathname: string): string => {
  const page = getPageByPath(pathname);
  return page?.backRoute ?? ROUTES.FOR_YOU.path;
};

type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
type RouteConfigWithDock = Extract<RouteValue, { dock: RouteConfig['dock'] }>;

const getDockPages = (): RouteConfig[] => {
  return Object.values(ROUTES).filter((route): route is RouteConfigWithDock => 'dock' in route);
};

export const routeUtils = {
  isHubPage,
  shouldShowBackButton,
  getPageByPath,
  getActivityRoutes,
  getBackRoute,
  getDockPages,
};
