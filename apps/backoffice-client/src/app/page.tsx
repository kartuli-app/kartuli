import { Button } from '@kartuli/ui/components/Button';
import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';

export default function Page() {
  return (
    <div>
      <h1>Backoffice Client</h1>
      <Button>Test Button</Button>
      <DeploymentDebugPanel appName="@kartuli/backoffice-client" appVersion="0.0.0" />
    </div>
  );
}
