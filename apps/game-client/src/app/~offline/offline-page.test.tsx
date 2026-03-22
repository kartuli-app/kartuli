import { RouterProvider } from '@game-client/router-outlet/router-context';
import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OfflinePage } from './offline-page';

function renderOfflinePage(initialPath = '/en') {
  globalThis.history.replaceState(null, '', initialPath);
  return render(
    <RouterProvider initialPath={initialPath}>
      <OfflinePage />
    </RouterProvider>,
  );
}

describe('Game Client Offline Page', () => {
  it('renders Offline heading', () => {
    const { container } = renderOfflinePage();
    expect(document.contains(within(container).getByRole('heading', { name: /offline/i }))).toBe(
      true,
    );
  });
});
