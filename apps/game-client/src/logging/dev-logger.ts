const LAYERS = ['database', 'identifiers', 'integration', 'page', 'i18n', 'sw', 'query'] as const;

export type LogLayer = (typeof LAYERS)[number];

/** Toggle layers here during development; only affects `logger.log`. */
export const layerEnabled: Record<LogLayer, boolean> = {
  database: true,
  identifiers: true,
  integration: true,
  page: true,
  i18n: true,
  sw: true,
  query: true,
};

function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
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
