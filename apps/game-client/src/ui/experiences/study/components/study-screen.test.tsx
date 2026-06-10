import type { LetterItem } from '@game-client/learning-content/library/library';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StudyScreen } from './study-screen';

const TEST_VIEWPORT_WIDTH = 600;

let currentPathname = '/en/study/lesson/lesson-1';
let currentSearchParams = new URLSearchParams();

const routerPushMock = vi.fn((href: string) => {
  const nextUrl = new URL(href, 'http://localhost');
  currentPathname = nextUrl.pathname;
  currentSearchParams = new URLSearchParams(nextUrl.search);
});

function setMockRoute(href: string) {
  const nextUrl = new URL(href, 'http://localhost');
  currentPathname = nextUrl.pathname;
  currentSearchParams = new URLSearchParams(nextUrl.search);
}

function createStudyScreenTestKey() {
  const nextQueryString = currentSearchParams.toString();
  return nextQueryString === '' ? currentPathname : `${currentPathname}?${nextQueryString}`;
}

function renderStudyScreen() {
  return render(<StudyScreen key={createStudyScreenTestKey()} items={items} />);
}

function hasExactTextContent(expectedText: string) {
  return (_unusedContent: string, element: Element | null) => element?.textContent === expectedText;
}

vi.mock('next/navigation', () => ({
  usePathname: () => currentPathname,
  useRouter: () => ({ push: routerPushMock }),
  useSearchParams: () => currentSearchParams,
}));

vi.mock('motion/react', async () => {
  const React = await import('react');

  type MockMotionDivProps = React.HTMLAttributes<HTMLDivElement> & {
    drag?: unknown;
    dragConstraints?: unknown;
    dragDirectionLock?: unknown;
    dragElastic?: unknown;
    dragMomentum?: unknown;
    onDragEnd?: unknown;
    onDragStart?: unknown;
    style?: React.CSSProperties & { x?: unknown };
  };

  function getMockMotionDivDomProps(
    props: Omit<MockMotionDivProps, 'children' | 'style'>,
  ): React.HTMLAttributes<HTMLDivElement> {
    const domProps: Omit<MockMotionDivProps, 'children' | 'style'> = { ...props };

    delete domProps.drag;
    delete domProps.dragConstraints;
    delete domProps.dragDirectionLock;
    delete domProps.dragElastic;
    delete domProps.dragMomentum;
    delete domProps.onDragEnd;
    delete domProps.onDragStart;

    return domProps;
  }

  function getMockMotionDivStyle(
    style?: MockMotionDivProps['style'],
  ): React.CSSProperties | undefined {
    if (!style) return undefined;

    const domStyle: React.CSSProperties & { x?: unknown } = { ...style };
    delete domStyle.x;
    return domStyle;
  }

  class MockMotionValue {
    private value: number;

    constructor(initialValue: number) {
      this.value = initialValue;
    }

    get() {
      return this.value;
    }

    set(nextValue: number) {
      this.value = nextValue;
    }
  }

  const MotionDiv = React.forwardRef<HTMLDivElement, MockMotionDivProps>(
    ({ children, style, ...props }, ref) => {
      const domProps = getMockMotionDivDomProps(props);
      const domStyle = getMockMotionDivStyle(style);

      return (
        <div ref={ref} style={domStyle} {...domProps}>
          {children}
        </div>
      );
    },
  );

  return {
    animate: (
      value: MockMotionValue,
      target: number,
      options?: {
        onComplete?: () => void;
      },
    ) => {
      value.set(target);
      options?.onComplete?.();

      return {
        stop() {},
      };
    },
    motion: {
      div: MotionDiv,
    },
    useMotionValue: (initialValue: number) => {
      const motionValueRef = React.useRef(new MockMotionValue(initialValue));
      return motionValueRef.current;
    },
  };
});

class MockResizeObserver {
  constructor(private readonly callback: ResizeObserverCallback) {}

  observe(target: Element) {
    Object.defineProperty(target, 'clientWidth', {
      configurable: true,
      value: TEST_VIEWPORT_WIDTH,
    });

    this.callback(
      [
        {
          contentRect: {
            width: TEST_VIEWPORT_WIDTH,
          },
        } as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver,
    );
  }

  disconnect() {
    return undefined;
  }
}

const items: LetterItem[] = [
  {
    id: 'letter-ani',
    targetScript: 'ა',
    name: 'ani',
    slug: 'ani',
    transliteration: 'a',
    notes: [
      {
        kind: 'pronunciation_hint',
        highlight: 'a',
        examples: ['father', 'spa'],
      },
    ],
    soundCategory: 'vowel',
    audioKey: 'letter-ani',
    type: 'letter' as const,
    commonSource: 'common',
    localizedSource: 'localized',
  },
  {
    id: 'letter-bani',
    targetScript: 'ბ',
    name: 'bani',
    slug: 'bani',
    transliteration: 'b',
    notes: [
      {
        kind: 'pronunciation_hint',
        highlight: 'b',
        examples: ['bed', 'bubble'],
      },
    ],
    soundCategory: 'consonant',
    audioKey: 'letter-bani',
    type: 'letter' as const,
    commonSource: 'common',
    localizedSource: 'localized',
  },
  {
    id: 'letter-p-prime-ari',
    targetScript: 'პ',
    name: 'p’ari',
    slug: 'p-prime-ari',
    transliteration: 'p’',
    notes: [
      {
        kind: 'pronunciation_hint',
        highlight: 'p',
        examples: ['spin', 'speak'],
      },
    ],
    soundCategory: 'ejective',
    audioKey: 'letter-p-prime-ari',
    type: 'letter' as const,
    commonSource: 'common',
    localizedSource: 'localized',
  },
];

describe('StudyScreen', () => {
  beforeEach(() => {
    setMockRoute('/en/study/lesson/lesson-1');
    routerPushMock.mockClear();
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
  });

  it('renders summary as slide 0 and hides inactive slides', async () => {
    const { container } = render(<StudyScreen items={items} />);

    await waitFor(() => {
      expect(container.querySelectorAll('[data-study-slide-index]')).toHaveLength(items.length + 1);
    });

    const slides = Array.from(container.querySelectorAll<HTMLElement>('[data-study-slide-index]'));

    expect(slides[0]?.dataset.active).toBe('true');
    expect(slides[0]?.getAttribute('aria-hidden')).toBe('false');
    expect(slides[0]?.hasAttribute('inert')).toBe(false);
    expect(slides[1]?.dataset.active).toBe('false');
    expect(slides[1]?.getAttribute('aria-hidden')).toBe('true');
    expect(slides[1]?.hasAttribute('inert')).toBe(true);
    expect(screen.getAllByText(hasExactTextContent('3 letters')).length).toBeGreaterThan(0);
  });

  it('updates the visible slide and status text through navigation controls', async () => {
    const user = userEvent.setup();
    const initialRender = renderStudyScreen();

    await user.click(within(initialRender.container).getAllByRole('button', { name: 'Next' })[0]);

    expect(routerPushMock).toHaveBeenLastCalledWith('/en/study/lesson/lesson-1?item=letter-ani', {
      scroll: false,
    });

    initialRender.unmount();
    setMockRoute('/en/study/lesson/lesson-1?item=letter-ani');
    const detailRender = renderStudyScreen();

    await waitFor(() => {
      expect(
        within(detailRender.container).getAllByText(hasExactTextContent('1/3')).length,
      ).toBeGreaterThan(0);
    });

    let slides = Array.from(
      detailRender.container.querySelectorAll<HTMLElement>('[data-study-slide-index]'),
    );
    expect(slides[1]?.dataset.active).toBe('true');
    expect(slides[0]?.hasAttribute('inert')).toBe(true);

    await user.click(within(detailRender.container).getAllByRole('button', { name: 'Next' })[0]);

    expect(routerPushMock).toHaveBeenLastCalledWith('/en/study/lesson/lesson-1?item=letter-bani', {
      scroll: false,
    });

    detailRender.unmount();
    setMockRoute('/en/study/lesson/lesson-1?item=letter-bani');
    const secondDetailRender = renderStudyScreen();

    await waitFor(() => {
      expect(
        within(secondDetailRender.container).getAllByText(hasExactTextContent('2/3')).length,
      ).toBeGreaterThan(0);
    });

    await user.click(
      within(secondDetailRender.container).getAllByRole('button', { name: 'Summary' })[0],
    );

    expect(routerPushMock).toHaveBeenLastCalledWith('/en/study/lesson/lesson-1', {
      scroll: false,
    });

    secondDetailRender.unmount();
    setMockRoute('/en/study/lesson/lesson-1');
    const summaryRender = renderStudyScreen();

    await waitFor(() => {
      expect(
        within(summaryRender.container).getAllByText(hasExactTextContent('3 letters')).length,
      ).toBeGreaterThan(0);
    });

    slides = Array.from(
      summaryRender.container.querySelectorAll<HTMLElement>('[data-study-slide-index]'),
    );
    expect(slides[0]?.dataset.active).toBe('true');
  });

  it('jumps directly to the selected summary item URL state', async () => {
    const user = userEvent.setup();
    const initialRender = renderStudyScreen();

    await user.click(within(initialRender.container).getAllByRole('button', { name: 'Open პ' })[0]);

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenLastCalledWith(
      '/en/study/lesson/lesson-1?item=letter-p-prime-ari',
      {
        scroll: false,
      },
    );

    initialRender.unmount();
    setMockRoute('/en/study/lesson/lesson-1?item=letter-p-prime-ari');
    const detailRender = renderStudyScreen();

    await waitFor(() => {
      const slides = Array.from(
        detailRender.container.querySelectorAll<HTMLElement>('[data-study-slide-index]'),
      );

      expect(
        within(detailRender.container).getAllByText(hasExactTextContent('3/3')).length,
      ).toBeGreaterThan(0);
      expect(slides[3]?.dataset.active).toBe('true');
    });
  });
});
