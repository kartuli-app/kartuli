import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DeploymentDebugPanel } from './DeploymentDebugPanel';

beforeEach(() => {
  cleanup();
  vi.stubEnv('NODE_ENV', 'test');
  vi.stubEnv('VERCEL_ENV', 'preview');
  vi.stubEnv('VERCEL_GIT_COMMIT_REF', 'feature/test-branch');
  vi.stubEnv('VERCEL_GIT_COMMIT_SHA', 'abc123def456');
  vi.stubEnv('VERCEL_URL', 'test-app.vercel.app');
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe('DeploymentDebugPanel', () => {
  const defaultProps = {
    appName: 'test-app',
    appVersion: '1.0.0',
  };

  it('renders with required props', () => {
    render(<DeploymentDebugPanel {...defaultProps} />);

    expect(document.contains(screen.getByText('🔧 Debug Info (Preview)'))).toBe(true);
    expect(document.contains(screen.getByText('test-app'))).toBe(true);
    expect(document.contains(screen.getByText('1.0.0'))).toBe(true);
    expect(document.contains(screen.getByText('test'))).toBe(true);
    expect(document.contains(screen.getByText('preview'))).toBe(true);
  });

  it('displays custom app name when provided', () => {
    render(<DeploymentDebugPanel appName="custom-app" appVersion="1.0.0" />);

    expect(document.contains(screen.getByText('custom-app'))).toBe(true);
  });

  it('displays custom app version when provided', () => {
    render(<DeploymentDebugPanel appName="test-app" appVersion="1.2.3" />);

    expect(document.contains(screen.getByText('1.2.3'))).toBe(true);
  });

  it('displays both custom app name and version when provided', () => {
    render(<DeploymentDebugPanel appName="my-app" appVersion="2.0.0" />);

    expect(document.contains(screen.getByText('my-app'))).toBe(true);
    expect(document.contains(screen.getByText('2.0.0'))).toBe(true);
  });

  it('shows detailed information when showDetailed is true', () => {
    render(<DeploymentDebugPanel {...defaultProps} showDetailed={true} />);

    // Should show runtime information
    expect(document.contains(screen.getByText('User Agent:'))).toBe(true);
    expect(document.contains(screen.getByText('Platform:'))).toBe(true);
    expect(document.contains(screen.getByText('Language:'))).toBe(true);
  });

  it('does not show detailed information when showDetailed is false', () => {
    render(<DeploymentDebugPanel {...defaultProps} showDetailed={false} />);

    // Should not show runtime information section
    expect(screen.queryByText('User Agent:')).toBeNull();
    expect(screen.queryByText('Language:')).toBeNull();
    expect(screen.queryByText('Platform:')).toBeNull();
  });

  it('displays deployment type correctly for production', () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    render(<DeploymentDebugPanel {...defaultProps} />);

    expect(document.contains(screen.getByText('🔧 Debug Info (Production)'))).toBe(true);
  });

  it('displays deployment type correctly for development', () => {
    vi.stubEnv('VERCEL_ENV', 'development');
    render(<DeploymentDebugPanel {...defaultProps} />);

    expect(document.contains(screen.getByText('🔧 Debug Info (Development)'))).toBe(true);
  });

  it('displays build time information', () => {
    render(<DeploymentDebugPanel {...defaultProps} />);

    // Should show build time information (static: NEXT_PUBLIC_BUILD_TIME or "unknown")
    expect(document.contains(screen.getByText(/Build:/))).toBe(true);

    const buildTimeContainer = screen.getByText(/Build:/).parentElement;
    // Anchored regex with fixed quantifiers to avoid ReDoS; matches full line (Build: <date> or Build: unknown)
    expect(buildTimeContainer?.textContent?.trim()).toMatch(
      /^Build: (\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} [AP]M|unknown)$/,
    );
  });
});
