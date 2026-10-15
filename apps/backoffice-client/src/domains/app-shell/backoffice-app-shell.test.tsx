import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { BackofficeAppShell } from './backoffice-app-shell';

let currentPathname = '/en';

vi.mock('next/navigation', () => ({
  usePathname: () => currentPathname,
}));

vi.mock('next/link', () => ({
  default: ({ children, ...props }: ComponentProps<'a'>) => <a {...props}>{children}</a>,
}));

describe('Backoffice application shell', () => {
  it('composes the shared shell with Backoffice-owned title and navigation', () => {
    render(
      <BackofficeAppShell>
        <div>Page content</div>
      </BackofficeAppShell>,
    );

    expect(screen.getByRole('banner')).toBeTruthy();
    expect(screen.getByText('kartuli.app')).toBeTruthy();
    expect(screen.getByText('Backoffice')).toBeTruthy();
    expect(screen.getByText('Page content')).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('href')).toBe('/en');
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/en/about');
  });

  it('marks Home active only on the Home route', () => {
    currentPathname = '/en';
    render(
      <BackofficeAppShell>
        <div>Home content</div>
      </BackofficeAppShell>,
    );

    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('aria-current')).toBeNull();
    expect(screen.getByTestId('home-active-icon')).toBeTruthy();
    expect(screen.getByTestId('about-icon')).toBeTruthy();
  });

  it('marks About active only on the About route', () => {
    currentPathname = '/en/about';
    render(
      <BackofficeAppShell>
        <div>About content</div>
      </BackofficeAppShell>,
    );

    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByTestId('home-icon')).toBeTruthy();
    expect(screen.getByTestId('about-active-icon')).toBeTruthy();
  });
});
