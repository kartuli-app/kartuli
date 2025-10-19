import { Button } from '@kartuli/ui/components/Button';
import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';

export default function Page() {
  return (
    <div>
      <h1>Game Client</h1>
      <p>Hello Vercel! 🚀 (Testing deployment)</p>
      <Button>Test Button</Button>
      <DeploymentDebugPanel appName="@kartuli/game-client" appVersion="0.0.0" />
    </div>
  );
}
