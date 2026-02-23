import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DeploymentDebugPanel } from './DeploymentDebugPanel';

// Mock environment variables
const ENV_KEYS = [
  'NODE_ENV',
  'VERCEL_ENV',
  'VERCEL_GIT_COMMIT_REF',
  'VERCEL_GIT_COMMIT_SHA',
  'VERCEL_URL',
] as const;

type EnvKey = (typeof ENV_KEYS)[number];
const originalEnvValues: Partial<Record<EnvKey, string | undefined>> = {};

beforeEach(() => {
  cleanup();
  // snapshot
  for (const key of ENV_KEYS) {
    originalEnvValues[key] = process.env[key];
  }
  // set test values
  process.env.NODE_ENV = 'test';
  process.env.VERCEL_ENV = 'preview';
  process.env.VERCEL_GIT_COMMIT_REF = 'feature/test-branch';
  process.env.VERCEL_GIT_COMMIT_SHA = 'abc123def456';
  process.env.VERCEL_URL = 'test-app.vercel.app';
});

afterEach(() => {
  cleanup();
  // restore snapshot
  for (const key of ENV_KEYS) {
    const val = originalEnvValues[key];
    if (val === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = val;
    }
  }
});

describe('DeploymentDebugPanel', () => {
  const defaultProps = {
    appName: 'test-app',
    appVersion: '1.0.0',
  };

  it('renders with required props', () => {
    render(<DeploymentDebugPanel {...defaultProps} />);

    expect(screen.getByText('🔧 Debug Info (Preview)')).toBeInTheDocument();
    expect(screen.getByText('test-app')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('preview')).toBeInTheDocument();
  });

  it('displays custom app name when provided', () => {
    render(<DeploymentDebugPanel appName="custom-app" appVersion="1.0.0" />);

    expect(screen.getByText('custom-app')).toBeInTheDocument();
  });

  it('displays custom app version when provided', () => {
    render(<DeploymentDebugPanel appName="test-app" appVersion="1.2.3" />);

    expect(screen.getByText('1.2.3')).toBeInTheDocument();
  });

  it('displays both custom app name and version when provided', () => {
    render(<DeploymentDebugPanel appName="my-app" appVersion="2.0.0" />);

    expect(screen.getByText('my-app')).toBeInTheDocument();
    expect(screen.getByText('2.0.0')).toBeInTheDocument();
  });

  it('shows detailed information when showDetailed is true', () => {
    render(<DeploymentDebugPanel {...defaultProps} showDetailed={true} />);

    // Should show runtime information
    expect(screen.getByText('User Agent:')).toBeInTheDocument();
    expect(screen.getByText('Platform:')).toBeInTheDocument();
    expect(screen.getByText('Language:')).toBeInTheDocument();
  });

  it('does not show detailed information when showDetailed is false', () => {
    render(<DeploymentDebugPanel {...defaultProps} showDetailed={false} />);

    // Should not show runtime information section
    expect(screen.queryByText('User Agent:')).not.toBeInTheDocument();
    expect(screen.queryByText('Language:')).not.toBeInTheDocument();
    expect(screen.queryByText('Platform:')).not.toBeInTheDocument();
  });

  it('displays deployment type correctly for production', () => {
    process.env.VERCEL_ENV = 'production';
    render(<DeploymentDebugPanel {...defaultProps} />);

    expect(screen.getByText('🔧 Debug Info (Production)')).toBeInTheDocument();
  });

  it('displays deployment type correctly for development', () => {
    process.env.VERCEL_ENV = 'development';
    render(<DeploymentDebugPanel {...defaultProps} />);

    expect(screen.getByText('🔧 Debug Info (Development)')).toBeInTheDocument();
  });

  it('displays build time information', () => {
    render(<DeploymentDebugPanel {...defaultProps} />);

    // Should show build time information (static: NEXT_PUBLIC_BUILD_TIME or "unknown")
    expect(screen.getByText(/Build:/)).toBeInTheDocument();

    const buildTimeContainer = screen.getByText(/Build:/).parentElement;
    // Anchored regex with fixed quantifiers to avoid ReDoS; matches full line (Build: <date> or Build: unknown)
    expect(buildTimeContainer?.textContent?.trim()).toMatch(
      /^Build: (\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} [AP]M|unknown)$/,
    );
  });
});
