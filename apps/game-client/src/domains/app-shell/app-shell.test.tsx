import { render, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as browser from '@/domains/utils/browser';
import { AppShell } from './app-shell';

vi.mock('@/domains/utils/browser', () => ({
  getLocationPathname: vi.fn(),
  getBrowserGlobal: vi.fn(() => ({
    location: { pathname: '' },
    history: { pushState: vi.fn(), back: vi.fn() },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
  navigateBack: vi.fn(),
  getServiceWorkerContainer: vi.fn(() => null),
  reloadWindow: vi.fn(),
  setDocumentLang: vi.fn(),
}));

function renderShell(initialPath: string) {
  vi.mocked(browser.getLocationPathname).mockReturnValue(initialPath);
  return render(<AppShell initialPath={initialPath} />);
}

describe('AppShell', () => {
  it('renders HomePage for /en', () => {
    const { container } = renderShell('/en');
    expect(document.contains(within(container).getByTestId('game-home'))).toBe(true);
  });

  it('renders DebugPage for /en/debug', () => {
    const { container } = renderShell('/en/debug');
    expect(document.contains(within(container).getByTestId('game-debug'))).toBe(true);
  });

  it('renders LearnPage for /en/learn/lesson-1', () => {
    const { container } = renderShell('/en/learn/lesson-1');
    expect(document.contains(within(container).getByTestId('game-learn'))).toBe(true);
    expect(within(container).getByTestId('learn-lesson-id').textContent).toContain('lesson-1');
  });

  it('renders GamePage for /en/game/lesson-2', () => {
    const { container } = renderShell('/en/game/lesson-2');
    expect(document.contains(within(container).getByTestId('game-game'))).toBe(true);
    expect(within(container).getByTestId('game-lesson-id').textContent).toContain('lesson-2');
  });

  it('renders UserPage for /en/user', () => {
    const { container } = renderShell('/en/user');
    expect(document.contains(within(container).getByTestId('game-user'))).toBe(true);
  });

  it('renders HomePage for /ru', () => {
    const { container } = renderShell('/ru');
    expect(document.contains(within(container).getByTestId('game-home'))).toBe(true);
  });

  it('renders DebugPage for /ru/debug', () => {
    const { container } = renderShell('/ru/debug');
    expect(document.contains(within(container).getByTestId('game-debug'))).toBe(true);
  });

  it('renders UserPage for /ru/user', () => {
    const { container } = renderShell('/ru/user');
    expect(document.contains(within(container).getByTestId('game-user'))).toBe(true);
  });

  it('renders GamePage for /ru/game/:id', () => {
    const { container } = renderShell('/ru/game/lesson-1');
    expect(document.contains(within(container).getByTestId('game-game'))).toBe(true);
    expect(within(container).getByTestId('game-lesson-id').textContent).toContain('lesson-1');
  });

  it('falls back to HomePage for unknown path', () => {
    const { container } = renderShell('/en/unknown/segment');
    expect(document.contains(within(container).getByTestId('game-home'))).toBe(true);
  });
});
