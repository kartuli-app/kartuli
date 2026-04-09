'use client';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import type { DeploymentDebugPanelLabels } from '@kartuli/ui/components/DeploymentDebugPanel';
import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function DebugClient() {
  const { t } = useTranslation('debug');

  const labels: DeploymentDebugPanelLabels = {
    debugInfo: t('debugInfo'),
    app: t('app'),
    version: t('version'),
    environment: t('environment'),
    vercel_env: t('vercel_env'),
    branch: t('branch'),
    commit: t('commit'),
    url: t('url'),
    region: t('region'),
    user_agent: t('user_agent'),
    platform: t('platform'),
    language: t('language'),
    build_time: t('build_time'),
    production: t('production'),
    preview: t('preview'),
    development: t('development'),
    unknown: t('unknown'),
    local: t('local'),
    unavailable_on_client: t('unavailable_on_client'),
    server_side: t('server_side'),
    server: t('server'),
  };
  return (
    <ResponsiveContainer
      className={clsx('justify-center', 'py-brand-xlarge', 'sm:py-brand-2xlarge')}
    >
      <DeploymentDebugPanel
        appName="@kartuli/game-client"
        appVersion={process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown'}
        labels={labels}
      />
    </ResponsiveContainer>
  );
}
