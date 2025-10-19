/**
 * DeploymentDebugPanel Component Props
 */
interface DeploymentDebugPanelProps {
  /** Override the app name (useful when sharing the component) */
  appName?: string;
  /** Override the app version (useful when sharing the component) */
  appVersion?: string;
  /** Show additional debug information */
  showDetailed?: boolean;
}

/**
 * DeploymentDebugPanel Component
 *
 * Displays environment information useful for debugging deployments and understanding
 * the current runtime context. Shows both client-side and server-side environment variables.
 *
 * This component helps distinguish between:
 * - Local development vs CI/CD vs production
 * - Preview deployments vs production deployments
 * - Different branches and commits
 * - Vercel-specific environment information
 * - Application identification and version info
 */
export function DeploymentDebugPanel({
  appName: propAppName,
  appVersion: propAppVersion,
  showDetailed = false,
}: DeploymentDebugPanelProps = {}) {
  // === APPLICATION INFORMATION ===
  // These are derived from the package.json and build context

  const appName = propAppName || process.env.npm_package_name || '@kartuli/game-client'; // Use prop, then env, then fallback
  const appVersion = propAppVersion || process.env.npm_package_version || 'dev';
  const buildTime = process.env.BUILD_TIME || new Date().toISOString();

  // === CLIENT-SIDE ENVIRONMENT VARIABLES ===
  // These are available in the browser and can be accessed via process.env
  // They are injected at build time by Next.js/Vercel

  const nodeEnv = process.env.NODE_ENV;
  const vercelEnv = process.env.VERCEL_ENV;
  const vercelGitCommitRef = process.env.VERCEL_GIT_COMMIT_REF;
  const vercelGitCommitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  const vercelUrl = process.env.VERCEL_URL;
  const vercelRegion = process.env.VERCEL_REGION;

  // === SERVER-SIDE ONLY VARIABLES ===
  // These are only available during server-side rendering or in API routes
  // They won't be available in the browser due to security restrictions

  const _vercelGitCommitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;
  const vercelGitRepoOwner = process.env.VERCEL_GIT_REPO_OWNER;
  const vercelGitRepoSlug = process.env.VERCEL_GIT_REPO_SLUG;
  const vercelGitPullRequestNumber = process.env.VERCEL_GIT_PULL_REQUEST_NUMBER;

  // === COMPUTED VALUES ===
  // These are derived from the environment variables above

  const isProduction = vercelEnv === 'production';
  const isPreview = vercelEnv === 'preview';
  const isDevelopment = vercelEnv === 'development' || nodeEnv === 'development';

  const shortCommitSha = vercelGitCommitSha ? vercelGitCommitSha.substring(0, 8) : 'local';
  const branchName = vercelGitCommitRef || 'main';

  // Determine deployment type
  const deploymentType = isProduction
    ? 'Production'
    : isPreview
      ? 'Preview'
      : isDevelopment
        ? 'Development'
        : 'Unknown';

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs font-mono max-w-sm border border-gray-700">
      <div className="font-bold mb-3 text-blue-400">🔧 Debug Info ({deploymentType})</div>

      <div className="space-y-2">
        {/* Application Information */}
        <div>
          <span className="text-gray-400">App:</span>{' '}
          <span className="text-white font-bold">{appName}</span>
        </div>

        <div>
          <span className="text-gray-400">Version:</span>{' '}
          <span className="text-cyan-400">{appVersion}</span>
        </div>

        {/* Environment Information */}
        <div>
          <span className="text-gray-400">Environment:</span>{' '}
          <span
            className={`font-bold ${isProduction ? 'text-green-400' : isPreview ? 'text-yellow-400' : 'text-blue-400'}`}
          >
            {nodeEnv}
          </span>
        </div>

        <div>
          <span className="text-gray-400">Vercel Env:</span>{' '}
          <span className="text-blue-400 font-bold">{vercelEnv || 'local'}</span>
        </div>

        {/* Git Information */}
        <div>
          <span className="text-gray-400">Branch:</span>{' '}
          <span className="text-yellow-400">{branchName}</span>
        </div>

        <div>
          <span className="text-gray-400">Commit:</span>{' '}
          <span className="text-gray-300">{shortCommitSha}</span>
        </div>

        {/* Deployment Information */}
        {vercelUrl && (
          <div>
            <span className="text-gray-400">URL:</span>{' '}
            <span className="text-purple-400 break-all">{vercelUrl}</span>
          </div>
        )}

        {vercelRegion && (
          <div>
            <span className="text-gray-400">Region:</span>{' '}
            <span className="text-cyan-400">{vercelRegion}</span>
          </div>
        )}

        {/* PR Information (Preview deployments only) */}
        {vercelGitPullRequestNumber && (
          <div>
            <span className="text-gray-400">PR:</span>{' '}
            <span className="text-orange-400">#{vercelGitPullRequestNumber}</span>
          </div>
        )}

        {/* Repository Information */}
        {vercelGitRepoOwner && vercelGitRepoSlug && (
          <div>
            <span className="text-gray-400">Repo:</span>{' '}
            <span className="text-indigo-400">
              {vercelGitRepoOwner}/{vercelGitRepoSlug}
            </span>
          </div>
        )}

        {/* Detailed Information (when showDetailed is true) */}
        {showDetailed && (
          <>
            {/* Runtime Information */}
            <div className="pt-2 border-t border-gray-600">
              <div>
                <span className="text-gray-400">User Agent:</span>{' '}
                <span className="text-gray-300 text-xs break-all">
                  {typeof window !== 'undefined'
                    ? `${window.navigator.userAgent.substring(0, 50)}...`
                    : 'Server-side'}
                </span>
              </div>

              <div>
                <span className="text-gray-400">Platform:</span>{' '}
                <span className="text-gray-300">
                  {typeof window !== 'undefined' ? window.navigator.platform : 'Server'}
                </span>
              </div>

              <div>
                <span className="text-gray-400">Language:</span>{' '}
                <span className="text-gray-300">
                  {typeof window !== 'undefined' ? window.navigator.language : 'Server'}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Build Information */}
        <div className="pt-2 border-t border-gray-600">
          <div>
            <span className="text-gray-400">Build:</span>{' '}
            <span className="text-gray-300 text-xs">{new Date(buildTime).toLocaleString()}</span>
          </div>

          <div className="text-gray-400 text-xs mt-2">
            <div>💡 Environment variables are injected at build time</div>
            <div>🌐 Some variables are server-side only</div>
            <div>🔒 Sensitive data is not exposed to client</div>
          </div>
        </div>
      </div>
    </div>
  );
}
