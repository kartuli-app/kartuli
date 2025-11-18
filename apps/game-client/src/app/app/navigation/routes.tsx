import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiSolidUserCircle, BiUserCircle } from 'react-icons/bi';
import { PiBookOpenTextFill, PiBookOpenTextLight } from 'react-icons/pi';
import { RiSearchFill, RiSearchLine } from 'react-icons/ri';
import { BiSearchAlt, BiSearchAlt2 } from 'react-icons/bi';

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

export const ROUTES = {
  PROFILE: {
    path: '/app/profile',
    title: 'Profile',
    backRoute: '/app',
    isActivity: true,
    dock: {
      label: 'Profile',
      iconActive: BiSolidUserCircle,
      iconInactive: BiUserCircle,
    },
  },
  SAVED: {
    path: '/app/saved',
    title: 'Saved',
    backRoute: '/app',
    isActivity: true,
    dock: {
      label: 'Saved',
      iconActive: AiFillHeart,
      iconInactive: AiOutlineHeart,
    },
  },

  FOR_YOU: {
    path: '/app',
    backRoute: '/app',
    isActivity: true,
    dock: {
      label: 'Learn',
      iconActive: PiBookOpenTextFill,
      iconInactive: PiBookOpenTextLight,
      isActive: (pathname) => ['/app', '/app/freestyle'].includes(pathname),
    },
  },
  FREESTYLE: {
    path: '/app/freestyle',
    backRoute: '/app',
    isActivity: true,
  },
  SEARCH: {
    path: '/app/search',
    title: 'Search',
    backRoute: '/app',
    isActivity: true,
    dock: {
      label: 'Search',
      iconActive: BiSearchAlt,
      iconInactive: BiSearchAlt2,
    },
  },
  RESOURCES: {
    path: '/app/resources',
    title: 'Resources',
    backRoute: '/app',
    isActivity: false,
  },
  TERMS: {
    path: '/app/terms',
    title: 'Terms',
    backRoute: '/app',
    isActivity: false,
  },
  PRIVACY: {
    path: '/app/privacy',
    title: 'Privacy',
    backRoute: '/app',
    isActivity: false,
  },
} as const satisfies Record<string, RouteConfig>;
