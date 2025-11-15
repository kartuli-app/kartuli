import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';

export function LandingPage() {
  return (
    <div data-testid="game-home">
      <h1>Game Client</h1>
      <h2>E2E Testing Implementation Complete</h2>
      <DeploymentDebugPanel
        appName="@kartuli/game-client"
        appVersion={process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown'}
      />
    </div>
  );
}
