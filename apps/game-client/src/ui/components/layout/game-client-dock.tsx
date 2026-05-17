'use client';

import type { SupportedLocale } from '@game-client/i18n';
import { getLocalizedPathnameForLocale } from '@game-client/i18n/locale-utils';
import { Dock } from '@game-client/ui/components/layout/dock';
import { DockItem } from '@game-client/ui/components/layout/dock-item';
import { gameClientDockItems } from '@game-client/ui/components/layout/game-client-dock-items';
import { useTranslation } from 'react-i18next';

type GameClientDockProps = {
  activeItemId?: string;
};

export function GameClientDock({ activeItemId }: Readonly<GameClientDockProps>) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.resolvedLanguage as SupportedLocale;

  return (
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
  );
}
