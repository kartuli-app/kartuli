'use client';

import { IS_SERVICE_WORKER_READY_INFORMED_KEY } from '@game-client/local-storage/is-service-worker-ready-informed-key';
import { getServiceWorkerContainer } from '@game-client/utils/browser';
import { Banner, BannerMessage } from '@kartuli/ui/components/banner/banner';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isSWToClientMessage, SW_READY_OFFLINE } from '../../service-worker-messages';
import { SERVICE_WORKER_SCRIPT_URL } from '../../service-worker-script-url';

function isReadyInformed(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(IS_SERVICE_WORKER_READY_INFORMED_KEY) === 'true';
}

/** Game ready for offline: show only after SW sends SW_READY_OFFLINE (activate + precache done). evaluate() only hides when we should not show. */
function useGameReadyForOfflineBanner() {
  const [visible, setVisible] = useState(false);

  const evaluate = useCallback(() => {
    if (process.env.NODE_ENV === 'development') return;
    const sw = getServiceWorkerContainer();
    if (!sw) {
      setVisible(false);
      return;
    }
    sw.getRegistration(SERVICE_WORKER_SCRIPT_URL).then((registration) => {
      const shouldHide = !registration || !!registration.waiting || isReadyInformed();
      if (shouldHide) setVisible(false);
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
      if (event.data.type === SW_READY_OFFLINE && !isReadyInformed()) setVisible(true);
    };
    sw.addEventListener('message', onMessage);
    sw.ready.then(() => evaluate());

    return () => sw.removeEventListener('message', onMessage);
  }, [evaluate]);

  const onDismiss = useCallback(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(IS_SERVICE_WORKER_READY_INFORMED_KEY, 'true');
    }
    setVisible(false);
  }, []);

  return { visible, onDismiss };
}

export function GameReadyForOfflineBanner() {
  const { t } = useTranslation('common');
  const { visible, onDismiss } = useGameReadyForOfflineBanner();

  if (!visible) return null;

  return (
    <Banner
      onDismiss={onDismiss}
      dismissLabel={t('sw.dismiss')}
      testId="pwa-notification-game-ready-for-offline"
    >
      <BannerMessage>{t('sw.readyOffline')}</BannerMessage>
    </Banner>
  );
}
