import type { IconType } from 'react-icons';

export interface RouteConfig {
  path: string;
  title?: string;
  backRoute: string;
  isActivity: boolean;
  dock?: {
    label: string;
    iconActive: IconType;
    iconInactive: IconType;
    isActive?: (pathname: string) => boolean;
  };
}
