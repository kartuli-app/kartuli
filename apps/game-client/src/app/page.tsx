import { Button } from '@kartuli/ui/components/Button';
import { DeploymentDebugPanel } from '@kartuli/ui/components/DeploymentDebugPanel';

export default function Page() {
  return (
    <div>
      <h1>Game Client</h1>
      <p>Hello Vercel! 🚀 (Testing deployment)</p>
      <Button>Test Button</Button>
      {/* Force Tailwind to generate utility classes */}
      <div className="hidden bg-primary-500 text-white px-4 py-2">Force generation</div>
      <DeploymentDebugPanel />
    </div>
  );
}
