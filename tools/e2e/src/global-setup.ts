import { assertIdentifiedTarget, probeTargetIdentity } from './identity.ts';
import { selectionFromEnv } from './runner-env.ts';

const IDENTITY_TIMEOUT_MS = 15_000;

export default async function globalSetup(): Promise<void> {
  const selection = selectionFromEnv(process.env);
  const probe = await probeTargetIdentity(selection.appUrl, fetch, IDENTITY_TIMEOUT_MS);
  assertIdentifiedTarget(probe, selection.targetId, selection.appUrl);
}
