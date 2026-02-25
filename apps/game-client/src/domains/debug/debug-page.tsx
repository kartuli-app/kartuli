import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';

export function DebugPage() {
  return (
    <div data-testid="game-debug" className="flex grow items-center justify-center">
      <DeploymentDebugPanel
        appName="@kartuli/game-client"
        appVersion={process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown'}
      />
    </div>
  );
}
