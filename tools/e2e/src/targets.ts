import path from 'node:path';
import { E2eConfigError } from './errors.ts';
import { repoRoot } from './paths.ts';

export const E2E_IDENTITY_FILE = 'kartuli-e2e-target.json';

/** Cold production builds, especially docs and Storybook, can take several minutes. */
const SERVER_READY_TIMEOUT_MS = 900_000;

export const E2E_TARGET_IDS = [
  'game-client',
  'backoffice-client',
  'storybook',
  'web-docs-client',
] as const;

export type E2eTargetId = (typeof E2E_TARGET_IDS)[number];

export interface E2eTarget {
  id: E2eTargetId;
  testDir: string;
  /** Absent when the target must not run in production workflows. */
  productionTestDir?: string;
  localBaseUrl: string;
  port: number;
  serverCommand: string;
  serverTimeoutMs: number;
  identityFile: string;
}

interface E2eTargetDefinition {
  testDir: string;
  productionTestDir?: string;
  localBaseUrl: string;
  port: number;
  serverCommand: string;
  identityFile: string;
}

const targetDefinitions: Record<E2eTargetId, E2eTargetDefinition> = {
  'game-client': {
    testDir: 'tests/game-client',
    productionTestDir: 'tests/game-client/production',
    localBaseUrl: 'http://localhost:3000',
    port: 3000,
    serverCommand: 'pnpm --filter @kartuli/game-client run preview',
    identityFile: 'apps/game-client/public/kartuli-e2e-target.json',
  },
  'backoffice-client': {
    testDir: 'tests/backoffice-client',
    productionTestDir: 'tests/backoffice-client/production',
    localBaseUrl: 'http://localhost:3001',
    port: 3001,
    serverCommand: 'pnpm --filter @kartuli/backoffice-client run preview',
    identityFile: 'apps/backoffice-client/public/kartuli-e2e-target.json',
  },
  storybook: {
    testDir: 'tests/storybook',
    localBaseUrl: 'http://localhost:6006',
    port: 6006,
    serverCommand:
      'pnpm --filter @kartuli/storybook run build && pnpm --filter @kartuli/storybook run preview',
    identityFile: 'tools/storybook/public/kartuli-e2e-target.json',
  },
  'web-docs-client': {
    testDir: 'tests/web-docs-client',
    productionTestDir: 'tests/web-docs-client',
    localBaseUrl: 'http://localhost:4173/kartuli',
    port: 4173,
    serverCommand: 'pnpm --filter @kartuli/web-docs-client run preview',
    identityFile: 'tools/web-docs-client/public/kartuli-e2e-target.json',
  },
};

export function isE2eTargetId(value: string): value is E2eTargetId {
  return Object.hasOwn(targetDefinitions, value);
}

export function listE2eTargetIds(): E2eTargetId[] {
  return [...E2E_TARGET_IDS];
}

export function getE2eTarget(id: E2eTargetId): E2eTarget {
  const definition = targetDefinitions[id];
  return {
    id,
    testDir: definition.testDir,
    productionTestDir: definition.productionTestDir,
    localBaseUrl: definition.localBaseUrl,
    port: definition.port,
    serverCommand: definition.serverCommand,
    serverTimeoutMs: SERVER_READY_TIMEOUT_MS,
    identityFile: path.join(repoRoot, definition.identityFile),
  };
}

export function requireE2eTarget(id: string): E2eTarget {
  if (!isE2eTargetId(id)) {
    throw new E2eConfigError(
      `Unknown E2E target "${id}". Expected one of: ${listE2eTargetIds().join(', ')}.`,
    );
  }
  return getE2eTarget(id);
}

export function testDirForSuite(target: E2eTarget, production: boolean): string {
  if (!production) {
    return target.testDir;
  }
  if (!target.productionTestDir) {
    throw new E2eConfigError(
      `Target "${target.id}" has no production-safe suite. Omit --production.`,
    );
  }
  return target.productionTestDir;
}
