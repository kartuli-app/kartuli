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
      {/* Force Tailwind to generate DeploymentDebugPanel classes */}
      <div className="hidden fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs font-mono max-w-sm border border-gray-700 text-blue-400 text-cyan-400 text-yellow-400 text-purple-400 text-orange-400 text-indigo-400 text-gray-400 text-gray-300">Force debug panel styles</div>
      <DeploymentDebugPanel appName="@kartuli/game-client" appVersion="0.0.0" />
    </div>
  );
}
