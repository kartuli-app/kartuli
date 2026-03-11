'use client';
import { GameReadyForOfflineBanner } from './banners/game-ready-for-offline-banner';
import { NewGameVersionInstalledBanner } from './banners/new-game-version-installed-banner';
import { ServiceWorkerInstalledInDevelopmentModeBanner } from './banners/service-worker-installed-in-development-mode-banner';

export function PWANotifications() {
  return (
    <>
      <ServiceWorkerInstalledInDevelopmentModeBanner />
      <GameReadyForOfflineBanner />
      <NewGameVersionInstalledBanner />
    </>
  );
}
