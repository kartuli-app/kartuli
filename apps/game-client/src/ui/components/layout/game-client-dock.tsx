'use client';

import { getLocalizedPathnameForLocale } from '@game-client/i18n/locale-utils';
import { useCurrentRouteLocale } from '@game-client/navigation';
import { Dock } from '@game-client/ui/components/layout/dock';
import { DockItem } from '@game-client/ui/components/layout/dock-item';
import { gameClientDockItems } from '@game-client/ui/components/layout/game-client-dock-items';
import { useTranslation } from 'react-i18next';

type GameClientDockProps = {
  activeItemId?: string;
};

export function GameClientDock({ activeItemId }: Readonly<GameClientDockProps>) {
  const { t } = useTranslation('common');
  const locale = useCurrentRouteLocale();

  return (
    <nav aria-label={t('dock.navigation')}>
      <Dock>
        {gameClientDockItems.map((item) => {
          const localizedHref = getLocalizedPathnameForLocale(item.href, locale);
          const label = t(`dock.${item.id}`);
          return (
            <DockItem
              key={item.id}
              label={label}
              href={localizedHref}
              icon={item.icon}
              activeIcon={item.activeIcon}
              active={item.id === activeItemId}
            />
          );
        })}
      </Dock>
    </nav>
  );
}
