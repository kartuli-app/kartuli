'use client';

import { getServiceWorkerContainer, reloadWindow } from '@game-client/utils/browser';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Banner, BannerMessage } from '../banner';

/** Unregister all service workers and reload so local changes are visible in dev. */
function unregisterServiceWorkers(): void {
  const sw = getServiceWorkerContainer();
  if (!sw) return;
  sw.getRegistrations().then((regs) => {
    Promise.all(regs.map((reg) => reg.unregister())).then(() => reloadWindow());
  });
}

/** Dev banner: show when in dev and at least one SW is registered. No listeners (unregister reloads the page). */
function useServiceWorkerInstalledInDevelopmentModeBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const sw = getServiceWorkerContainer();
    if (!sw) return;
    sw.getRegistrations().then((regs) => setVisible(regs.length > 0));
  }, []);

  return { visible: visible && !dismissed, onDismiss: () => setDismissed(true) };
}

export function ServiceWorkerInstalledInDevelopmentModeBanner() {
  const { t } = useTranslation('common');
  const { visible, onDismiss } = useServiceWorkerInstalledInDevelopmentModeBanner();

  if (!visible) return null;

  return (
    <Banner
      onDismiss={onDismiss}
      dismissLabel={t('sw.dismiss')}
      testId="pwa-notification-dev-mode"
      actions={[{ label: t('sw.unregister'), onClick: unregisterServiceWorkers }]}
    >
      <BannerMessage>{t('sw.devMessage')}</BannerMessage>
    </Banner>
  );
}
