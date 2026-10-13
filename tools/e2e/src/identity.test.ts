import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { E2eConfigError } from './errors.ts';
import {
  assertIdentifiedTarget,
  decideLocalServer,
  type IdentityProbe,
  probeTargetIdentity,
} from './identity.ts';
import { E2E_IDENTITY_FILE, getE2eTarget, listE2eTargetIds } from './targets.ts';
import { identityUrlForBase, normalizeBaseUrl } from './urls.ts';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function refusedFetch(): typeof fetch {
  return () => {
    const cause = new Error('connect ECONNREFUSED');
    Object.assign(cause, { code: 'ECONNREFUSED' });
    throw new TypeError('fetch failed', { cause });
  };
}

describe('target identity URLs', () => {
  it('joins the marker onto origin and base-path targets', () => {
    expect(identityUrlForBase('http://localhost:3000')).toBe(
      `http://localhost:3000/${E2E_IDENTITY_FILE}`,
    );
    expect(identityUrlForBase('http://localhost:4173/kartuli')).toBe(
      `http://localhost:4173/kartuli/${E2E_IDENTITY_FILE}`,
    );
    expect(identityUrlForBase('https://kartuli-app.github.io/kartuli/')).toBe(
      `https://kartuli-app.github.io/kartuli/${E2E_IDENTITY_FILE}`,
    );
  });

  it('normalizes origin URLs and trailing slashes', () => {
    expect(normalizeBaseUrl('http://localhost:3000/')).toBe('http://localhost:3000');
    expect(normalizeBaseUrl('http://localhost:4173/kartuli/')).toBe(
      'http://localhost:4173/kartuli',
    );
    expect(normalizeBaseUrl('http://localhost:4173/kartuli///')).toBe(
      'http://localhost:4173/kartuli',
    );
  });

  it('rejects malformed URLs', () => {
    expect(() => normalizeBaseUrl('')).toThrow(E2eConfigError);
    expect(() => normalizeBaseUrl('/relative')).toThrow(/absolute http/);
    expect(() => normalizeBaseUrl('ftp://example.com')).toThrow(/http and https/);
  });
});

describe('probeTargetIdentity', () => {
  it('reports connection refusal as unreachable', async () => {
    const probe = await probeTargetIdentity('http://localhost:3000', refusedFetch());
    expect(probe.status).toBe('unreachable');
  });

  it('reads a matching target id', async () => {
    const fetchImpl: typeof fetch = async () => jsonResponse({ target: 'game-client' });
    const probe = await probeTargetIdentity('http://localhost:3000', fetchImpl);
    expect(probe).toMatchObject({ status: 'identified', targetId: 'game-client' });
  });

  it('treats redirects, missing files and non-JSON bodies as failures', async () => {
    const redirected = await probeTargetIdentity('http://localhost:3000', async () => {
      return new Response(null, { status: 307 });
    });
    const missing = await probeTargetIdentity('http://localhost:3000', async () => {
      return new Response('nope', { status: 404 });
    });
    const html = await probeTargetIdentity('http://localhost:3000', async () => {
      return new Response('<html></html>', { status: 200 });
    });
    expect(redirected.status).toBe('redirected');
    expect(missing.status).toBe('missing');
    expect(html.status).toBe('invalid');
  });

  it('reports timeouts separately from a closed port', async () => {
    const fetchImpl: typeof fetch = async () => {
      throw new DOMException('timed out', 'TimeoutError');
    };
    const probe = await probeTargetIdentity('http://localhost:3000', fetchImpl);
    expect(probe.status).toBe('timed-out');
  });
});

describe('local server decisions', () => {
  const appUrl = 'http://localhost:3000';
  const identityUrl = identityUrlForBase(appUrl);

  function probe(status: IdentityProbe['status'], targetId?: string): IdentityProbe {
    if (status === 'identified') {
      return { status, identityUrl, targetId: targetId ?? 'game-client' };
    }
    if (status === 'invalid') {
      return { status, identityUrl, detail: 'HTTP 500' };
    }
    return { status, identityUrl };
  }

  it('starts when the port is closed and reuse was not requested', () => {
    expect(decideLocalServer(probe('unreachable'), 'game-client', appUrl, false)).toBe('start');
  });

  it('reuses only a server that identifies as the selected target', () => {
    expect(decideLocalServer(probe('identified'), 'game-client', appUrl, true)).toBe('reuse');
  });

  it('refuses to start over a server that is already the right target', () => {
    expect(() => decideLocalServer(probe('identified'), 'game-client', appUrl, false)).toThrow(
      /--reuse-server/,
    );
  });

  it('refuses the wrong target on the expected port', () => {
    expect(() =>
      decideLocalServer(probe('identified', 'storybook'), 'game-client', appUrl, true),
    ).toThrow(/storybook/);
  });

  it('does not treat a timeout or missing marker as an invitation to start another server', () => {
    expect(() => decideLocalServer(probe('timed-out'), 'game-client', appUrl, false)).toThrow(
      /did not respond/,
    );
    expect(() => decideLocalServer(probe('missing'), 'game-client', appUrl, false)).toThrow(
      /did not identify/,
    );
    expect(() => decideLocalServer(probe('unreachable'), 'game-client', appUrl, true)).toThrow(
      /nothing is listening/,
    );
  });
});

describe('assertIdentifiedTarget', () => {
  it('accepts the expected target and explains mismatches', () => {
    const identityUrl = identityUrlForBase('http://localhost:3001');
    expect(() =>
      assertIdentifiedTarget(
        { status: 'identified', identityUrl, targetId: 'backoffice-client' },
        'backoffice-client',
        'http://localhost:3001',
      ),
    ).not.toThrow();
    expect(() =>
      assertIdentifiedTarget(
        { status: 'identified', identityUrl, targetId: 'game-client' },
        'backoffice-client',
        'http://localhost:3001',
      ),
    ).toThrow(/identified as "game-client"/);
    expect(() =>
      assertIdentifiedTarget(
        { status: 'missing', identityUrl },
        'backoffice-client',
        'http://localhost:3001',
      ),
    ).toThrow(/did not serve/);
  });
});

describe('checked-in target markers', () => {
  it('matches every target id', () => {
    for (const targetId of listE2eTargetIds()) {
      const target = getE2eTarget(targetId);
      const marker = JSON.parse(readFileSync(target.identityFile, 'utf8')) as { target: string };
      expect(marker).toEqual({ target: targetId });
    }
  });
});
