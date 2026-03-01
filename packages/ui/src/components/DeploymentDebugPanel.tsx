'use client';

import clsx from 'clsx';

/** Navigator with optional User-Agent Client Hints (not in TS lib yet) */
interface NavigatorWithUACH extends Navigator {
  userAgentData?: { platform?: string };
}

function getNavigatorPlatform(nav: Navigator): string {
  return (nav as NavigatorWithUACH).userAgentData?.platform ?? 'Browser';
}

/** Optional translated labels; when provided, these replace the default English strings (e.g. for i18n). */
export interface DeploymentDebugPanelLabels {
  debugInfo?: string;
  app?: string;
  version?: string;
  environment?: string;
  vercelEnv?: string;
  branch?: string;
  commit?: string;
  url?: string;
  region?: string;
  userAgent?: string;
  platform?: string;
  language?: string;
  buildTime?: string;
  deploymentType?: string;
  production?: string;
  preview?: string;
  development?: string;
  unknown?: string;
  local?: string;
  unavailableOnClient?: string;
  serverSide?: string;
  server?: string;
}

/**
 * DeploymentDebugPanel Component Props
 */
interface DeploymentDebugPanelProps {
  /** Application name (required for proper debugging) */
  appName: string;
  /** Application version (required for proper debugging) */
  appVersion: string;
  /** Optional translated labels for all UI strings (consumer passes t('debug.xxx')) */
  labels?: DeploymentDebugPanelLabels;
  /** Show additional debug information */
  showDetailed?: boolean;
  /** Class name for the component */
  className?: string;
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
 *
 * @param appName - Required application name for proper debugging
 * @param appVersion - Required application version for proper debugging
 * @param showDetailed - Optional flag to show additional runtime information
 * @param className - Optional class name for the component
 */
const DEFAULT_LABELS = {
  debugInfo: 'Debug Info',
  app: 'App',
  version: 'Version',
  environment: 'Environment',
  vercelEnv: 'Vercel Env',
  branch: 'Branch',
  commit: 'Commit',
  url: 'URL',
  region: 'Region',
  userAgent: 'User Agent',
  platform: 'Platform',
  language: 'Language',
  buildTime: 'Build',
  production: 'Production',
  preview: 'Preview',
  development: 'Development',
  unknown: 'Unknown',
  local: 'local',
  unavailableOnClient: 'unavailable on client',
  serverSide: 'Server-side',
  server: 'Server',
} as const;

export function DeploymentDebugPanel({
  appName,
  appVersion,
  labels: labelsProp,
  showDetailed = false,
  className,
}: Readonly<DeploymentDebugPanelProps>) {
  const labels = labelsProp != null ? { ...DEFAULT_LABELS, ...labelsProp } : { ...DEFAULT_LABELS };
  // === BUILD TIME (static, set at build) ===
  // Use only NEXT_PUBLIC_BUILD_TIME so server and client render the same (no hydration mismatch).
  const buildTimeRaw = process.env.NEXT_PUBLIC_BUILD_TIME;
  let buildTimeFormatted = 'unknown';

  if (buildTimeRaw) {
    const date = new Date(buildTimeRaw);
    if (!Number.isNaN(date.getTime())) {
      buildTimeFormatted = date.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
    }
  }

  // === APPLICATION INFORMATION ===
  // Now using required props directly - no fallback to unreliable process.env

  // === CLIENT-SIDE ENVIRONMENT VARIABLES ===
  // These are available in the browser and can be accessed via process.env
  // They are injected at build time by Next.js/Vercel

  // Next.js replaces process.env.* at build time; non-public variables are undefined on client
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV;
  const vercelGitCommitRef = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
  const vercelGitCommitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const vercelRegion = process.env.NEXT_PUBLIC_VERCEL_REGION;

  // === COMPUTED VALUES ===
  // These are derived from the environment variables above

  const isProduction = vercelEnv === 'production';
  const isPreview = vercelEnv === 'preview';
  const isDevelopment = vercelEnv === 'development' || nodeEnv === 'development';

  const shortCommitSha =
    vercelGitCommitSha && vercelGitCommitSha.length >= 8
      ? vercelGitCommitSha.substring(0, 8)
      : undefined;
  const branchName = vercelGitCommitRef || undefined;

  // Determine deployment type (use labels when provided)
  let deploymentType: string;
  if (isProduction) {
    deploymentType = labels.production ?? 'Production';
  } else if (isPreview) {
    deploymentType = labels.preview ?? 'Preview';
  } else if (isDevelopment) {
    deploymentType = labels.development ?? 'Development';
  } else {
    deploymentType = labels.unknown ?? 'Unknown';
  }

  const debugPanelClassName = clsx(
    'p-4 rounded-lg shadow text-xs font-mono max-w-sm',
    'text-ink bg-canvas',
    className,
  );

  return (
    <div className={debugPanelClassName}>
      <div className="font-bold mb-3">
        🔧 {labels.debugInfo} ({deploymentType})
      </div>

      <div className="space-y-2">
        {/* Application Information */}
        <div>
          <span className="opacity-70">{labels.app}:</span>{' '}
          <span className="font-bold">{appName}</span>
        </div>

        <div>
          <span className="opacity-70">{labels.version}:</span> <span>{appVersion}</span>
        </div>

        {/* Environment Information */}
        <div>
          <span className="opacity-70">{labels.environment}:</span>{' '}
          <span className="font-bold">{nodeEnv}</span>
        </div>

        <div>
          <span className="opacity-70">{labels.vercelEnv}:</span>{' '}
          <span className="font-bold">{vercelEnv || labels.local}</span>
        </div>

        {/* Git Information */}
        <div>
          <span className="opacity-70">{labels.branch}:</span>{' '}
          <span>{branchName ?? labels.unavailableOnClient}</span>
        </div>

        <div>
          <span className="opacity-70">{labels.commit}:</span>{' '}
          <span>{shortCommitSha ?? labels.unavailableOnClient}</span>
        </div>

        {/* Deployment Information */}
        {vercelUrl && (
          <div>
            <span className="opacity-70">{labels.url}:</span>{' '}
            <span className="break-all">{vercelUrl}</span>
          </div>
        )}

        {vercelRegion && (
          <div>
            <span className="opacity-70">{labels.region}:</span> <span>{vercelRegion}</span>
          </div>
        )}

        {/* Detailed Information (when showDetailed is true) */}
        {showDetailed && (
          <>
            {/* Runtime Information */}
            <div className="pt-2 border-t">
              <div>
                <span className="opacity-70">{labels.userAgent}:</span>{' '}
                <span className="text-xs break-all">
                  {(globalThis as unknown as { window?: { navigator: Navigator } }).window ===
                  undefined
                    ? labels.serverSide
                    : `${(globalThis as unknown as { window: { navigator: Navigator } }).window.navigator.userAgent.substring(0, 50)}...`}
                </span>
              </div>

              <div>
                <span className="opacity-70">{labels.platform}:</span>{' '}
                <span>
                  {(globalThis as unknown as { window?: { navigator: Navigator } }).window ===
                  undefined
                    ? labels.server
                    : getNavigatorPlatform(
                        (globalThis as unknown as { window: { navigator: Navigator } }).window
                          .navigator,
                      )}
                </span>
              </div>

              <div>
                <span className="opacity-70">{labels.language}:</span>{' '}
                <span>
                  {(globalThis as unknown as { window?: { navigator: Navigator } }).window ===
                  undefined
                    ? labels.server
                    : (globalThis as unknown as { window: { navigator: Navigator } }).window
                        .navigator.language}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Build Information */}
        <div className="pt-2 border-t">
          <div>
            <span className="opacity-70">{labels.buildTime}:</span>{' '}
            <span className="text-xs">{buildTimeFormatted}</span>
          </div>

          <div className="opacity-70 text-xs mt-2">
            <div>💡 Environment variables are injected at build time</div>
            <div>🔒 Sensitive data is not exposed to client</div>
          </div>
        </div>
      </div>
    </div>
  );
}
