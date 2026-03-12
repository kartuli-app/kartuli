import { vi } from 'vitest';
import { SERVICE_WORKER_SCRIPT_URL } from '../service-worker-script-url';

export function createMockRegistration(overrides: { waiting?: unknown } = {}) {
  return {
    installing: null,
    waiting: overrides.waiting ?? null,
    active: {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

export type MockRegistration = ReturnType<typeof createMockRegistration>;

export function createMockSwContainer(registration: MockRegistration | null) {
  return {
    getRegistration: vi.fn((url: string) =>
      Promise.resolve(url === SERVICE_WORKER_SCRIPT_URL ? registration : null),
    ),
    getRegistrations: vi.fn(() => Promise.resolve(registration ? [registration] : [])),
    ready: Promise.resolve(registration ?? undefined),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}
