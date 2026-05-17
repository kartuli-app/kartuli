import type { ComponentType, SVGProps } from 'react';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
import {
  PiArrowsClockwiseBold,
  PiArrowsClockwiseLight,
  PiBookOpenTextFill,
  PiBookOpenTextLight,
} from 'react-icons/pi';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type GameClientDockItemId = 'learn' | 'translit' | 'settings';

export interface GameClientDockItemDefinition {
  id: GameClientDockItemId;
  href: string;
  icon: IconComponent;
  activeIcon: IconComponent;
}

export const gameClientDockItems = [
  {
    id: 'learn',
    href: '/explore/alphabet',
    icon: PiBookOpenTextLight,
    activeIcon: PiBookOpenTextFill,
  },
  {
    id: 'translit',
    href: '/translit',
    icon: PiArrowsClockwiseLight,
    activeIcon: PiArrowsClockwiseBold,
  },
  {
    id: 'settings',
    href: '/settings',
    icon: IoSettingsOutline,
    activeIcon: IoSettingsSharp,
  },
] as const satisfies readonly GameClientDockItemDefinition[];
