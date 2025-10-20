import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';

export default function Page() {
  return (
    <div>
      <h1>Game Client</h1>
      <DeploymentDebugPanel appName="@kartuli/game-client" appVersion="0.0.0" />
    </div>
  );
}
