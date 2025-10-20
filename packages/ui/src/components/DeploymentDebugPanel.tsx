'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

/**
 * DeploymentDebugPanel Component Props
 */
interface DeploymentDebugPanelProps {
  /** Application name (required for proper debugging) */
  appName: string;
  /** Application version (required for proper debugging) */
  appVersion: string;
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
export function DeploymentDebugPanel({
  appName,
  appVersion,
  showDetailed = false,
  className,
}: DeploymentDebugPanelProps) {
  // === CLIENT-SIDE TIME HANDLING ===
  // Fix hydration mismatch by using useState/useEffect for client-side time
  const [clientTime, setClientTime] = useState<string | null>(null);

  useEffect(() => {
    // This runs only on the client, after hydration
    setClientTime(new Date().toISOString());
  }, []);

  // === APPLICATION INFORMATION ===
  // Now using required props directly - no fallback to unreliable process.env

  const buildTime = (() => {
    try {
      return process.env.BUILD_TIME || clientTime || 'loading...';
    } catch {
      return clientTime || 'loading...';
    }
  })();

  // === CLIENT-SIDE ENVIRONMENT VARIABLES ===
  // These are available in the browser and can be accessed via process.env
  // They are injected at build time by Next.js/Vercel

  const nodeEnv = (() => {
    try {
      return process.env.NODE_ENV;
    } catch {
      return 'development';
    }
  })();

  const vercelEnv = (() => {
    try {
      return process.env.VERCEL_ENV;
    } catch {
      return undefined;
    }
  })();

  const vercelGitCommitRef = (() => {
    try {
      return process.env.VERCEL_GIT_COMMIT_REF;
    } catch {
      return undefined;
    }
  })();

  const vercelGitCommitSha = (() => {
    try {
      return process.env.VERCEL_GIT_COMMIT_SHA;
    } catch {
      return undefined;
    }
  })();

  const vercelUrl = (() => {
    try {
      return process.env.VERCEL_URL;
    } catch {
      return undefined;
    }
  })();

  const vercelRegion = (() => {
    try {
      return process.env.VERCEL_REGION;
    } catch {
      return undefined;
    }
  })();

  // === SERVER-SIDE ONLY VARIABLES ===
  // These are only available during server-side rendering or in API routes
  // They won't be available in the browser due to security restrictions

  const _vercelGitCommitMessage = (() => {
    try {
      return process.env.VERCEL_GIT_COMMIT_MESSAGE;
    } catch {
      return undefined;
    }
  })();

  const vercelGitRepoOwner = (() => {
    try {
      return process.env.VERCEL_GIT_REPO_OWNER;
    } catch {
      return undefined;
    }
  })();

  const vercelGitRepoSlug = (() => {
    try {
      return process.env.VERCEL_GIT_REPO_SLUG;
    } catch {
      return undefined;
    }
  })();

  const vercelGitPullRequestNumber = (() => {
    try {
      return process.env.VERCEL_GIT_PULL_REQUEST_NUMBER;
    } catch {
      return undefined;
    }
  })();

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

  const debugPanelClassName = clsx(
    'fixed bottom-4 right-4 p-4 rounded-lg shadow text-xs font-mono max-w-sm',
    'text-ink bg-canvas',
    className,
  );

  return (
    <div className={debugPanelClassName}>
      <div className="font-bold mb-3">🔧 Debug Info ({deploymentType})</div>

      <div className="space-y-2">
        {/* Application Information */}
        <div>
          <span className="opacity-70">App:</span> <span className="font-bold">{appName}</span>
        </div>

        <div>
          <span className="opacity-70">Version:</span> <span>{appVersion}</span>
        </div>

        {/* Environment Information */}
        <div>
          <span className="opacity-70">Environment:</span>{' '}
          <span className="font-bold">{nodeEnv}</span>
        </div>

        <div>
          <span className="opacity-70">Vercel Env:</span>{' '}
          <span className="font-bold">{vercelEnv || 'local'}</span>
        </div>

        {/* Git Information */}
        <div>
          <span className="opacity-70">Branch:</span> <span>{branchName}</span>
        </div>

        <div>
          <span className="opacity-70">Commit:</span> <span>{shortCommitSha}</span>
        </div>

        {/* Deployment Information */}
        {vercelUrl && (
          <div>
            <span className="opacity-70">URL:</span> <span className="break-all">{vercelUrl}</span>
          </div>
        )}

        {vercelRegion && (
          <div>
            <span className="opacity-70">Region:</span> <span>{vercelRegion}</span>
          </div>
        )}

        {/* PR Information (Preview deployments only) */}
        {vercelGitPullRequestNumber && (
          <div>
            <span className="opacity-70">PR:</span> <span>#{vercelGitPullRequestNumber}</span>
          </div>
        )}

        {/* Repository Information */}
        {vercelGitRepoOwner && vercelGitRepoSlug && (
          <div>
            <span className="opacity-70">Repo:</span>{' '}
            <span>
              {vercelGitRepoOwner}/{vercelGitRepoSlug}
            </span>
          </div>
        )}

        {/* Detailed Information (when showDetailed is true) */}
        {showDetailed && (
          <>
            {/* Runtime Information */}
            <div className="pt-2 border-t">
              <div>
                <span className="opacity-70">User Agent:</span>{' '}
                <span className="text-xs break-all">
                  {typeof window !== 'undefined'
                    ? `${window.navigator.userAgent.substring(0, 50)}...`
                    : 'Server-side'}
                </span>
              </div>

              <div>
                <span className="opacity-70">Platform:</span>{' '}
                <span>{typeof window !== 'undefined' ? window.navigator.platform : 'Server'}</span>
              </div>

              <div>
                <span className="opacity-70">Language:</span>{' '}
                <span>{typeof window !== 'undefined' ? window.navigator.language : 'Server'}</span>
              </div>
            </div>
          </>
        )}

        {/* Build Information */}
        <div className="pt-2 border-t">
          <div>
            <span className="opacity-70">Build:</span>{' '}
            <span className="text-xs">
              {buildTime === 'loading...' ? 'loading...' : new Date(buildTime).toLocaleString()}
            </span>
          </div>

          <div className="opacity-70 text-xs mt-2">
            <div>💡 Environment variables are injected at build time</div>
            <div>🌐 Some variables are server-side only</div>
            <div>🔒 Sensitive data is not exposed to client</div>
          </div>
        </div>
      </div>
    </div>
  );
}
