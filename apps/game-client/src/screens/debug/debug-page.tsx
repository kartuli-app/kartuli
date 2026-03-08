import type { DeploymentDebugPanelLabels } from '@kartuli/ui/components/DeploymentDebugPanel';
import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';
import { useTranslation } from 'react-i18next';

export function DebugPage() {
  const { t } = useTranslation('debug');

  const labels: DeploymentDebugPanelLabels = {
    debugInfo: t('debugInfo'),
    app: t('app'),
    version: t('version'),
    environment: t('environment'),
    vercelEnv: t('vercelEnv'),
    branch: t('branch'),
    commit: t('commit'),
    url: t('url'),
    region: t('region'),
    userAgent: t('userAgent'),
    platform: t('platform'),
    language: t('language'),
    buildTime: t('buildTime'),
    production: t('production'),
    preview: t('preview'),
    development: t('development'),
    unknown: t('unknown'),
    local: t('local'),
    unavailableOnClient: t('unavailableOnClient'),
    serverSide: t('serverSide'),
    server: t('server'),
  };

  return (
    <div data-testid="game-debug" className="flex grow items-center justify-center">
      <DeploymentDebugPanel
        appName="@kartuli/game-client"
        appVersion={process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown'}
        labels={labels}
      />
    </div>
  );
}
