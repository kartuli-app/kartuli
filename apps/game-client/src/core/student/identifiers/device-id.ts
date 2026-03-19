const DEVICE_ID_STORAGE_KEY = 'kartuli.deviceId';

let cachedDeviceId: string | null = null;

export function getOrCreateDeviceId(): string {
  if (cachedDeviceId) {
    return cachedDeviceId;
  }

  if (globalThis.window === undefined) {
    throw new Error('💀 [device-id] 💀 deviceId can only be used in the browser');
  }

  const existing = globalThis.window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (existing) {
    cachedDeviceId = existing;
    return existing;
  }

  const newDeviceId = crypto.randomUUID();
  globalThis.window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, newDeviceId);
  console.info('💾 [device-id] 💾 device id created:', newDeviceId);
  cachedDeviceId = newDeviceId;
  return newDeviceId;
}
