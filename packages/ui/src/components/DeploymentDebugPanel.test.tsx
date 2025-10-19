import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DeploymentDebugPanel } from './DeploymentDebugPanel';

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  cleanup(); // Clean up any previous renders
  process.env = {
    ...originalEnv,
    NODE_ENV: 'test',
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_REF: 'feature/test-branch',
    VERCEL_GIT_COMMIT_SHA: 'abc123def456',
    VERCEL_URL: 'test-app.vercel.app',
  };
});

afterEach(() => {
  cleanup(); // Clean up after each test
  process.env = originalEnv;
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

    // Should show build time information
    expect(screen.getByText(/Build:/)).toBeInTheDocument();

    // Should show a formatted date (either from BUILD_TIME env var or client time)
    const buildTimeContainer = screen.getByText(/Build:/).parentElement;
    expect(buildTimeContainer?.textContent).toMatch(
      /\d+\/\d+\/\d+, \d+:\d+:\d+ [AP]M|loading\.\.\./,
    );
  });
});
