import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouterProvider } from '../app-shell/router-context';
import { OfflinePage } from './offline-page';

function renderOfflinePage(initialPath = '/en') {
  return render(
    <RouterProvider initialPath={initialPath}>
      <OfflinePage />
    </RouterProvider>,
  );
}

describe('Game Client Offline Page', () => {
  it('renders Offline heading', () => {
    const { container } = renderOfflinePage();
    expect(within(container).getByRole('heading', { name: /offline/i })).toBeInTheDocument();
  });
});
