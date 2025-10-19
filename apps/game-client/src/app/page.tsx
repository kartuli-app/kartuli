import { Button } from '@kartuli/ui/components/Button';

function DebugInfo() {
  const environment = process.env.NODE_ENV;
  const vercelEnv = process.env.VERCEL_ENV;
  const _vercelGitCommitRef = process.env.VERCEL_GIT_COMMIT_REF;
  const vercelGitCommitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  const vercelUrl = process.env.VERCEL_URL;
  const vercelBranch = process.env.VERCEL_GIT_COMMIT_REF;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs font-mono max-w-sm">
      <div className="font-bold mb-2">🔧 Debug (Testing Remote Cache v2):</div>
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">Environment:</span>{' '}
          <span className="text-green-400 font-bold">{environment}</span>
        </div>
        <div>
          <span className="text-gray-400">Vercel Env:</span>{' '}
          <span className="text-blue-400 font-bold">{vercelEnv || 'local'}</span>
        </div>
        <div>
          <span className="text-gray-400">Branch:</span>{' '}
          <span className="text-yellow-400">{vercelBranch || 'main'}</span>
        </div>
        <div>
          <span className="text-gray-400">Commit:</span>{' '}
          <span className="text-gray-300">
            {vercelGitCommitSha ? vercelGitCommitSha.substring(0, 8) : 'local'}
          </span>
        </div>
        {vercelUrl && (
          <div>
            <span className="text-gray-400">URL:</span>{' '}
            <span className="text-purple-400">{vercelUrl}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <h1>Game Client</h1>
      <p>Hello Vercel! 🚀 (Testing deployment)</p>
      <Button>Test Button</Button>
      {/* Force Tailwind to generate utility classes */}
      <div className="hidden bg-primary-500 text-white px-4 py-2">Force generation</div>
      <DebugInfo />
    </div>
  );
}
