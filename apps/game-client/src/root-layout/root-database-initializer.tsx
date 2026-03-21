'use client';
import { getItemActivityDeviceStateDatabase } from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state-database';
import { getOrCreateDeviceId } from '@game-client/core/student/identifiers/device-id';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
import { logger } from '@game-client/logging/dev-logger';
import { useEffect } from 'react';

async function estimateStorageQuota(): Promise<{ usage: number; quota: number } | string> {
  if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
    return 'StorageManager API not supported in this browser.';
  }

  try {
    const estimate = await navigator.storage.estimate();
    // Quota and usage are reported in bytes
    const totalSpace = estimate.quota ?? 0;
    const usedSpace = estimate.usage ?? 0;

    logger.log('database', `Approx total allocated space: ${totalSpace} bytes`);
    logger.log('database', `Approx used space: ${usedSpace} bytes`);
    logger.log('database', `Free space: ${totalSpace - usedSpace} bytes`);

    return { usage: usedSpace, quota: totalSpace };
  } catch (error) {
    logger.error('database', 'Error estimating storage:', error);
    return 'Error estimating storage.';
  }
}

export function RootDatabaseInitializer() {
  useEffect(() => {
    getOrCreateDeviceId();
    getOrCreateOwnerId();
    void (async () => {
      await getItemActivityDeviceStateDatabase();
    })();
    if (process.env.NODE_ENV === 'development') {
      void estimateStorageQuota();
    }
  }, []);

  return null;
}
