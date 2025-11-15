import { ROUTES, type RouteConfig } from './routes';

export { ROUTES } from './routes';

export const isHubPage = (pathname: string): boolean => {
  return pathname === ROUTES.FOR_YOU.path || pathname === ROUTES.FREESTYLE.path;
};

export const shouldShowBackButton = (pathname: string): boolean => {
  return !isHubPage(pathname);
};

export const getPageByPath = (pathname: string): RouteConfig | undefined => {
  return Object.values(ROUTES).find((route) => route.path === pathname);
};

export const getActivityRoutes = (): string[] => {
  return Object.values(ROUTES)
    .filter((route) => route.isActivity)
    .map((route) => route.path);
};

export const getBackRoute = (pathname: string): string => {
  const page = getPageByPath(pathname);
  return page?.backRoute ?? ROUTES.FOR_YOU.path;
};

type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
type RouteConfigWithDock = Extract<RouteValue, { dock: RouteConfig['dock'] }>;

export const getDockPages = (): RouteConfig[] => {
  return Object.values(ROUTES).filter((route): route is RouteConfigWithDock => 'dock' in route);
};
