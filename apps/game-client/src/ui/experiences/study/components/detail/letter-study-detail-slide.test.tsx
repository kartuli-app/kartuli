import type { LetterItem } from '@game-client/learning-content/library/library';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LetterStudyDetailSlide } from './letter-study-detail-slide';

const item: LetterItem = {
  id: 'letter-ani',
  targetScript: 'ა',
  transliteration: 'a',
  notes: [
    {
      kind: 'pronunciation_hint',
      highlight: 'a',
      examples: ['father', 'spa'],
    },
  ],
  soundCategory: 'vowel',
  type: 'letter',
  commonSource: 'common',
  localizedSource: 'localized',
};

const otherItem: LetterItem = {
  id: 'letter-bani',
  targetScript: 'ბ',
  transliteration: 'b',
  notes: [
    {
      kind: 'pronunciation_hint',
      highlight: 'b',
      examples: ['bed', 'bubble'],
    },
  ],
  soundCategory: 'stop',
  type: 'letter',
  commonSource: 'common',
  localizedSource: 'localized',
};

class MockAudio {
  public currentTime = 0;
  public readonly pause = vi.fn(() => {
    return undefined;
  });
  public readonly play = vi.fn(async () => {
    return undefined;
  });
  private readonly listeners = new Map<string, Set<() => void>>();

  constructor(public readonly src: string) {}

  addEventListener(type: string, listener: () => void) {
    const listenersForType = this.listeners.get(type) ?? new Set<() => void>();
    listenersForType.add(listener);
    this.listeners.set(type, listenersForType);
  }

  removeEventListener(type: string, listener: () => void) {
    this.listeners.get(type)?.delete(listener);
  }

  dispatch(type: string) {
    for (const listener of this.listeners.get(type) ?? []) {
      listener();
    }
  }
}

const audioInstances: MockAudio[] = [];

class MockAudioElement extends MockAudio {
  constructor(src: string) {
    super(src);
    audioInstances.push(this);
  }
}

describe('LetterStudyDetailSlide', () => {
  beforeEach(() => {
    audioInstances.length = 0;
    vi.stubGlobal('Audio', MockAudioElement);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('renders the meta bar and handles audio playback and favorite states', async () => {
    render(<LetterStudyDetailSlide item={item} />);

    expect(audioInstances).toHaveLength(1);
    expect(audioInstances[0]?.src).toBe('/sounds/speech/letters/letter-ani.mp3');

    expect(screen.getByText('New')).not.toBeNull();
    expect(screen.getAllByText('ა').length).toBeGreaterThan(0);
    expect(screen.getAllByText('a').length).toBeGreaterThan(0);

    const audioButton = screen.getByRole('button', { name: 'Play audio' });
    expect(audioButton.className).toContain('bg-s-color-panel-action-secondary-bg');

    fireEvent.click(audioButton);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Stop audio' })).not.toBeNull();
    });
    expect(audioInstances[0]?.play).toHaveBeenCalledTimes(1);

    audioInstances[0]?.dispatch('ended');
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Play audio' })).not.toBeNull();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Play audio' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Stop audio' })).not.toBeNull();
    });
    fireEvent.click(screen.getByRole('button', { name: 'Stop audio' }));
    expect(audioInstances[0]?.pause).toHaveBeenCalledTimes(1);
    expect(audioInstances[0]?.currentTime).toBe(0);

    const favoriteButton = screen.getByRole('button', { name: 'Add favorite' });
    expect(favoriteButton.className).toContain('bg-s-color-panel-action-secondary-bg');
    fireEvent.click(favoriteButton);
    expect(screen.getByRole('button', { name: 'Remove favorite' })).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Remove favorite' }).className).toContain(
      'text-s-color-panel-content-favorite',
    );
    expect(screen.getByText('Letter ა added to favorites')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Remove favorite' }));
    expect(screen.getByRole('button', { name: 'Add favorite' })).not.toBeNull();
    expect(screen.getByText('Letter ა removed from favorites')).not.toBeNull();
  });

  it('stops playback when the slide unmounts', async () => {
    const { unmount } = render(<LetterStudyDetailSlide item={item} />);

    fireEvent.click(screen.getByRole('button', { name: 'Play audio' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Stop audio' })).not.toBeNull();
    });

    unmount();

    expect(audioInstances[0]?.pause).toHaveBeenCalledTimes(1);
    expect(audioInstances[0]?.currentTime).toBe(0);
  });

  it('stops the previous audio and creates a new instance when the item changes', async () => {
    const { rerender } = render(<LetterStudyDetailSlide item={item} />);

    fireEvent.click(screen.getByRole('button', { name: 'Play audio' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Stop audio' })).not.toBeNull();
    });

    rerender(<LetterStudyDetailSlide item={otherItem} />);

    expect(audioInstances[0]?.pause).toHaveBeenCalledTimes(1);
    expect(audioInstances[0]?.currentTime).toBe(0);
    expect(audioInstances).toHaveLength(2);
    expect(audioInstances[1]?.src).toBe('/sounds/speech/letters/letter-bani.mp3');
  });
});
