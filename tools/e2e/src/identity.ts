import { E2eConfigError } from './errors.ts';
import { E2E_IDENTITY_FILE } from './targets.ts';
import { identityUrlForBase } from './urls.ts';

export type IdentityProbe =
  | { status: 'unreachable'; identityUrl: string }
  | { status: 'timed-out'; identityUrl: string }
  | { status: 'missing'; identityUrl: string }
  | { status: 'redirected'; identityUrl: string }
  | { status: 'invalid'; identityUrl: string; detail: string }
  | { status: 'identified'; identityUrl: string; targetId: string };

const IDENTITY_BODY_LIMIT = 4_096;
const UNREACHABLE_CODES = new Set(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function collectErrorCodes(error: unknown, seen = new Set<unknown>()): string[] {
  if (!error || typeof error !== 'object' || seen.has(error)) {
    return [];
  }
  seen.add(error);
  const codes: string[] = [];
  if ('code' in error && typeof error.code === 'string') {
    codes.push(error.code);
  }
  if ('cause' in error) {
    codes.push(...collectErrorCodes(error.cause, seen));
  }
  if ('errors' in error && Array.isArray(error.errors)) {
    for (const nested of error.errors) {
      codes.push(...collectErrorCodes(nested, seen));
    }
  }
  return codes;
}

function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
    return true;
  }
  return collectErrorCodes(error).includes('ETIMEDOUT');
}

function isUnreachableError(error: unknown): boolean {
  return collectErrorCodes(error).some((code) => UNREACHABLE_CODES.has(code));
}

async function classifyIdentityResponse(
  response: Response,
  identityUrl: string,
): Promise<IdentityProbe> {
  if (response.status >= 300 && response.status < 400) {
    return { status: 'redirected', identityUrl };
  }
  if (response.status === 404 || response.status === 410) {
    return { status: 'missing', identityUrl };
  }
  if (!response.ok) {
    return { status: 'invalid', identityUrl, detail: `HTTP ${response.status}` };
  }

  const text = await response.text();
  if (text.length > IDENTITY_BODY_LIMIT) {
    return { status: 'invalid', identityUrl, detail: 'identity response is too large' };
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return { status: 'invalid', identityUrl, detail: 'identity response was not JSON' };
  }
  if (!isRecord(body) || typeof body.target !== 'string' || body.target.length === 0) {
    return {
      status: 'invalid',
      identityUrl,
      detail: 'identity response must be JSON with a string target field',
    };
  }
  return { status: 'identified', identityUrl, targetId: body.target };
}

export async function probeTargetIdentity(
  appUrl: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 3_000,
): Promise<IdentityProbe> {
  const identityUrl = identityUrlForBase(appUrl);
  try {
    const response = await fetchImpl(identityUrl, {
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
    });
    return await classifyIdentityResponse(response, identityUrl);
  } catch (error) {
    if (isTimeoutError(error)) {
      return { status: 'timed-out', identityUrl };
    }
    if (isUnreachableError(error)) {
      return { status: 'unreachable', identityUrl };
    }
    const detail = error instanceof Error ? error.message : 'request failed';
    return { status: 'invalid', identityUrl, detail };
  }
}

export function assertIdentifiedTarget(
  probe: IdentityProbe,
  expectedTargetId: string,
  appUrl: string,
): void {
  if (probe.status === 'identified' && probe.targetId === expectedTargetId) {
    return;
  }

  if (probe.status === 'identified') {
    throw new E2eConfigError(
      `Expected E2E target "${expectedTargetId}" at ${appUrl}, but the server identified as "${probe.targetId}".`,
    );
  }
  if (probe.status === 'unreachable') {
    throw new E2eConfigError(
      `E2E target "${expectedTargetId}" is not reachable at ${appUrl}. Nothing accepted a connection.`,
    );
  }
  if (probe.status === 'timed-out') {
    throw new E2eConfigError(
      `E2E target "${expectedTargetId}" did not respond at ${appUrl} before the identity check timed out.`,
    );
  }
  if (probe.status === 'missing') {
    throw new E2eConfigError(
      `E2E target "${expectedTargetId}" did not serve ${E2E_IDENTITY_FILE} at ${probe.identityUrl}. The process may be a different service, or this build is missing the target marker.`,
    );
  }
  if (probe.status === 'redirected') {
    throw new E2eConfigError(
      `The identity check for "${expectedTargetId}" was redirected from ${probe.identityUrl}. The server is not exposing the target marker.`,
    );
  }
  throw new E2eConfigError(
    `E2E target "${expectedTargetId}" at ${appUrl} did not identify itself (${probe.detail}). Check ${probe.identityUrl}.`,
  );
}

export function decideLocalServer(
  probe: IdentityProbe,
  expectedTargetId: string,
  appUrl: string,
  reuseServer: boolean,
): 'start' | 'reuse' {
  if (probe.status === 'unreachable') {
    if (reuseServer) {
      throw new E2eConfigError(
        `Cannot reuse ${expectedTargetId} at ${appUrl} because nothing is listening. Start that server and retry, or omit --reuse-server so the runner can build and preview it.`,
      );
    }
    return 'start';
  }

  if (probe.status === 'timed-out') {
    throw new E2eConfigError(
      `${appUrl} did not respond before the readiness check timed out. Stop the process using that port, or pass --reuse-server once it identifies as ${expectedTargetId}.`,
    );
  }

  if (probe.status === 'identified' && probe.targetId === expectedTargetId) {
    if (!reuseServer) {
      throw new E2eConfigError(
        `${expectedTargetId} is already running at ${appUrl}. Pass --reuse-server to test it, or stop it so the runner can start a production preview.`,
      );
    }
    return 'reuse';
  }

  if (probe.status === 'identified') {
    throw new E2eConfigError(
      `${appUrl} identified as "${probe.targetId}", not "${expectedTargetId}". Stop the other service before running this target.`,
    );
  }

  const detail =
    probe.status === 'missing'
      ? `it did not serve ${E2E_IDENTITY_FILE}`
      : probe.status === 'redirected'
        ? 'the identity URL redirected'
        : probe.detail;
  throw new E2eConfigError(
    `${appUrl} did not identify as ${expectedTargetId} (${detail}). Another service may be using this port.`,
  );
}
