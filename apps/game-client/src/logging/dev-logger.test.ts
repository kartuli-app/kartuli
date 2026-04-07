import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type LogLayer, layerEnabled, logger } from './dev-logger';

describe('dev-logger', () => {
  const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  const savedLayers: Record<LogLayer, boolean> = { ...layerEnabled };

  beforeEach(() => {
    vi.clearAllMocks();
    for (const key of Object.keys(layerEnabled) as LogLayer[]) {
      layerEnabled[key] = savedLayers[key];
    }
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('logger.error', () => {
    it('calls console.info with layer and text, then console.error with cause', () => {
      const err = new Error('boom');
      logger.error('database', 'failed', err);

      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(infoSpy).toHaveBeenCalledWith('[database]', 'failed');
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(err);
    });

    it('calls only console.info when cause is omitted', () => {
      logger.error('database', 'reason only');

      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(infoSpy).toHaveBeenCalledWith('[database]', 'reason only');
      expect(errorSpy).not.toHaveBeenCalled();
    });
  });

  describe('logger.log', () => {
    it('logs with console.info when NODE_ENV is development and layer is enabled', () => {
      vi.stubEnv('NODE_ENV', 'development');
      logger.log('page', 'hello', { x: 1 });

      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(infoSpy).toHaveBeenCalledWith('[page]', 'hello', { x: 1 });
    });

    it('does not log when NODE_ENV is not development', () => {
      vi.stubEnv('NODE_ENV', 'production');
      logger.log('page', 'silent');

      expect(infoSpy).not.toHaveBeenCalled();
    });

    it('does not log when layer is disabled', () => {
      vi.stubEnv('NODE_ENV', 'development');
      layerEnabled.page = false;
      logger.log('page', 'muted');

      expect(infoSpy).not.toHaveBeenCalled();
    });
  });
});
