import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, SVGProps } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { AppBar } from './app-bar/app-bar';
import { Dock } from './dock/dock';
import { DockItem } from './dock/dock-item';
import { AppShell } from './shell/app-shell';
import { ShellRail } from './shell/shell-rail';

afterEach(cleanup);

function TestLink({ children, ...props }: ComponentProps<'a'>) {
  return <a {...props}>{children}</a>;
}

function DefaultIcon(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="default-icon" {...props} />;
}

function ActiveIcon(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="active-icon" {...props} />;
}

describe('shared layout', () => {
  it('renders the app shell with optional start and end rail content', () => {
    render(
      <AppShell
        appBar={<div>App bar</div>}
        startRailContent={<div>Start navigation</div>}
        endRailContent={<div>End decoration</div>}
      >
        Page content
      </AppShell>,
    );

    expect(screen.getByText('App bar')).toBeTruthy();
    expect(screen.getByText('Start navigation')).toBeTruthy();
    expect(screen.getByText('End decoration')).toBeTruthy();
    expect(screen.getByText('Page content')).toBeTruthy();
  });

  it('does not render an empty shell rail', () => {
    const { container } = render(<ShellRail placement="start" />);

    expect(container.firstChild).toBeNull();
  });

  it('renders generic app-bar slots without owning their content', () => {
    render(
      <AppBar
        leading={<button type="button">Back</button>}
        title={<div>Title composition</div>}
        trailingPrimary={<button type="button">Action</button>}
      />,
    );

    expect(screen.getByRole('banner')).toBeTruthy();
    expect(screen.getByText('Title composition')).toBeTruthy();
  });

  it('labels dock navigation and delegates DockItem links to the injected component', () => {
    render(
      <Dock ariaLabel="Primary navigation">
        <DockItem
          href="/overview"
          label="Overview"
          icon={DefaultIcon}
          activeIcon={ActiveIcon}
          active
          linkComponent={TestLink}
        />
      </Dock>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    const link = screen.getByRole('link', { name: 'Overview' });

    expect(navigation.contains(link)).toBe(true);
    expect(link.getAttribute('href')).toBe('/overview');
    expect(link.getAttribute('aria-current')).toBe('page');
    expect(screen.queryByTestId('default-icon')).toBeNull();
    expect(screen.getByTestId('active-icon')).toBeTruthy();
  });
});
