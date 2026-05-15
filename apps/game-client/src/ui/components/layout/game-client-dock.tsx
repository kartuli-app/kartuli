import { Dock } from '@game-client/ui/components/layout/dock';
import { DockButton } from '@game-client/ui/components/layout/dock-button';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
import {
  PiArrowsClockwiseBold,
  PiArrowsClockwiseLight,
  PiBookOpenTextFill,
  PiBookOpenTextLight,
} from 'react-icons/pi';

const gameClientDockItems = [
  {
    id: 'learn',
    label: 'Learn',
    href: '/en/explore/alphabet',
    icon: PiBookOpenTextLight,
    activeIcon: PiBookOpenTextFill,
  },
  {
    id: 'translit',
    label: 'Translit',
    href: '/en/translit',
    icon: PiArrowsClockwiseLight,
    activeIcon: PiArrowsClockwiseBold,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/en/settings',
    icon: IoSettingsOutline,
    activeIcon: IoSettingsSharp,
  },
];

type GameClientDockProps = {
  activeItemId?: string;
};

export function GameClientDock({ activeItemId }: Readonly<GameClientDockProps>) {
  return (
    <Dock>
      {gameClientDockItems.map((item) => (
        <DockButton
          key={item.id}
          label={item.label}
          href={item.href}
          icon={item.icon}
          iconActive={item.activeIcon}
          isActive={item.id === activeItemId}
        />
      ))}
    </Dock>
  );
}
