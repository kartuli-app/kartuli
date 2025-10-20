import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';

export default function Page() {
  return (
    <div>
      <h1>Game Client</h1>
      <DeploymentDebugPanel
        appName="@kartuli/game-client"
        appVersion={process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown'}
      />
    </div>
  );
}
