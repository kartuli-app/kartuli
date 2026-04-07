const LAYERS = [
  'proxy',
  'database',
  'identifiers',
  'integration',
  'library',
  'page',
  'i18n',
  'query',
] as const;

export type LogLayer = (typeof LAYERS)[number];

/** Toggle layers here during development; only affects `logger.log`. */
export const layerEnabled: Record<LogLayer, boolean> = {
  proxy: true,
  database: true,
  identifiers: true,
  integration: true,
  library: true,
  page: true,
  i18n: true,
  query: true,
};

function isDev(): boolean {
  // Spell `process.env.NODE_ENV` literally so Next/webpack can inline it in client
  // bundles. Indirect reads (e.g. `globalThis.process?.env`) are often left as
  // runtime lookups where `NODE_ENV` is missing, so dev logs never appear locally.
  if (typeof process !== 'undefined') {
    return process.env.NODE_ENV === 'development';
  }
  const globalProcess = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process;
  return globalProcess?.env?.NODE_ENV === 'development';
}

function log(layer: LogLayer, text: string, ...args: unknown[]): void {
  if (!isDev() || !layerEnabled[layer]) {
    return;
  }
  console.info(`[${layer}]`, text, ...args);
}

function error(layer: LogLayer, text: string, cause?: unknown): void {
  console.info(`[${layer}]`, text);
  if (cause !== undefined) {
    console.error(cause);
  }
}

export const logger = { log, error };
