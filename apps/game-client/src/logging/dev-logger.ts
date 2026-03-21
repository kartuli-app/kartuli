const LAYERS = ['database', 'identifiers', 'integration', 'page', 'i18n', 'query'] as const;

export type LogLayer = (typeof LAYERS)[number];

/** Toggle layers here during development; only affects `logger.log`. */
export const layerEnabled: Record<LogLayer, boolean> = {
  database: true,
  identifiers: true,
  integration: true,
  page: true,
  i18n: true,
  query: true,
};

function isDev(): boolean {
  // `process` may be absent in some runtimes (e.g. service workers) if the bundler
  // does not polyfill it; avoid throwing when reading NODE_ENV.
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
  console.warn(`[${layer}]`, text, ...args);
}

function error(layer: LogLayer, text: string, cause?: unknown): void {
  console.warn(`[${layer}]`, text);
  if (cause !== undefined) {
    console.error(cause);
  }
}

export const logger = { log, error };
