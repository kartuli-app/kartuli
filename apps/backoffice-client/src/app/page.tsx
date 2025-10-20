import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';

export default function Page() {
  return (
    <div>
      <h1>Backoffice Client</h1>
      <DeploymentDebugPanel appName="@kartuli/backoffice-client" appVersion="0.0.0" />
    </div>
  );
}
