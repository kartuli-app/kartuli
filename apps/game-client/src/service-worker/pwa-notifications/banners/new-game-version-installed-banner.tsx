'use client';

import { getServiceWorkerContainer, reloadWindow } from '@game-client/utils/browser';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isSWToClientMessage, SKIP_WAITING, SW_WAITING } from '../../service-worker-messages';
import { SERVICE_WORKER_SCRIPT_URL } from '../../service-worker-script-url';
import { Banner, BannerMessage } from '../banner';

/** Tell the waiting worker to skipWaiting(); when controllerchange fires we reload. */
function reloadToUpdate(): void {
  const sw = getServiceWorkerContainer();
  if (!sw) {
    reloadWindow();
    return;
  }
  sw.getRegistration(SERVICE_WORKER_SCRIPT_URL).then((registration) => {
    if (!registration?.waiting) {
      reloadWindow();
      return;
    }
    const once = () => {
      sw.removeEventListener('controllerchange', once);
      reloadWindow();
    };
    sw.addEventListener('controllerchange', once);
    registration.waiting.postMessage({ type: SKIP_WAITING });
  });
}

/** New game version installed: show in prod when there is a waiting worker. */
function useNewGameVersionInstalledBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const evaluate = useCallback(() => {
    if (process.env.NODE_ENV === 'development') return;
    const sw = getServiceWorkerContainer();
    if (!sw) return;
    sw.getRegistration(SERVICE_WORKER_SCRIPT_URL).then((registration) => {
      setVisible(!!registration?.waiting);
    });
  }, []);

  useEffect(() => {
    evaluate();
  }, [evaluate]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    const sw = getServiceWorkerContainer();
    if (!sw) return;

    const onMessage = (event: MessageEvent) => {
      if (!isSWToClientMessage(event.data)) return;
      if (event.data.type === SW_WAITING) setVisible(true);
    };
    sw.addEventListener('message', onMessage);

    let removeUpdateFound: (() => void) | null = null;
    sw.getRegistration(SERVICE_WORKER_SCRIPT_URL).then((registration) => {
      if (!registration) return;
      const container = sw;
      const onUpdateFound = () => {
        const newWorker = registration.installing ?? registration.waiting;
        if (!newWorker) return;
        const checkState = () => {
          if (newWorker.state === 'installed' && container.controller) setVisible(true);
        };
        newWorker.addEventListener('statechange', checkState);
        checkState();
      };
      registration.addEventListener('updatefound', onUpdateFound);
      removeUpdateFound = () => registration.removeEventListener('updatefound', onUpdateFound);
    });

    return () => {
      sw.removeEventListener('message', onMessage);
      removeUpdateFound?.();
    };
  }, []);

  return { visible: visible && !dismissed, onDismiss: () => setDismissed(true) };
}

export function NewGameVersionInstalledBanner() {
  const { t } = useTranslation('common');
  const { visible, onDismiss } = useNewGameVersionInstalledBanner();

  if (!visible) return null;

  return (
    <Banner
      onDismiss={onDismiss}
      dismissLabel={t('sw.dismiss')}
      testId="pwa-notification-new-version-installed"
      actions={[{ label: t('sw.goToNextVersion'), onClick: reloadToUpdate }]}
    >
      <BannerMessage>{t('sw.newVersion')}</BannerMessage>
    </Banner>
  );
}
