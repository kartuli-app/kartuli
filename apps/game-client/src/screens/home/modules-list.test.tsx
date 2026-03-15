import { createBundledLibraryRepository, getDefaultRepository } from '@game-client/core/library';
import { RootQueryClientProvider } from '@game-client/root-layout/root-query-client-provider';
import { RouterProvider } from '@game-client/router-outlet/router-context';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createRepoThatThrows,
  createRepoWithEmptyModules,
} from '../../core/library/repository-fakes';
import { ModulesList } from './modules-list';

vi.mock('@game-client/core/library', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@game-client/core/library')>();
  return {
    ...mod,
    getDefaultRepository: vi.fn(),
  };
});

const mockedGetDefaultRepository = vi.mocked(getDefaultRepository);

function renderModulesList(initialPath = '/en') {
  return render(
    <RootQueryClientProvider>
      <RouterProvider initialPath={initialPath}>
        <ModulesList />
      </RouterProvider>
    </RootQueryClientProvider>,
  );
}

describe('ModulesList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetDefaultRepository.mockReturnValue(createBundledLibraryRepository());
  });

  afterEach(() => {
    cleanup();
  });

  it('shows loading then modules list when repo returns data', async () => {
    renderModulesList();
    expect(document.body.textContent).toContain('Loading');
    const lessonButton = await screen.findByRole(
      'button',
      { name: 'The Five Vowels' },
      { timeout: 5000 },
    );
    expect(document.contains(lessonButton)).toBe(true);
  });

  it('shows loading then error state when repo throws', async () => {
    mockedGetDefaultRepository.mockReturnValue(createRepoThatThrows(new Error('Network error')));
    renderModulesList();
    expect(document.body.textContent).toContain('Loading');
    const errorText = await screen.findByText('Error loading content', {}, { timeout: 5000 });
    expect(document.contains(errorText)).toBe(true);
  });

  it('shows loading then empty state when repo returns no modules', async () => {
    mockedGetDefaultRepository.mockReturnValue(createRepoWithEmptyModules());
    renderModulesList();
    expect(document.body.textContent).toContain('Loading');
    const emptyText = await screen.findByText('No content found', {}, { timeout: 5000 });
    expect(document.contains(emptyText)).toBe(true);
  });

  it('navigates to learn page when lesson is clicked', async () => {
    const pushStateSpy = vi.spyOn(globalThis.history, 'pushState');
    const user = userEvent.setup();
    renderModulesList();
    const lessonButton = await screen.findByRole(
      'button',
      { name: 'The Five Vowels' },
      { timeout: 5000 },
    );
    await user.click(lessonButton);
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/en/learn/lesson-alphabet-vowels');
    pushStateSpy.mockRestore();
  });
});
