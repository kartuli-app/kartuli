'use client';
import { getItemActivityDeviceStateDatabase } from '@game-client/core/student/device/item-activity-device-states-collection/item-activity-device-state-database';
import { getOrCreateDeviceId } from '@game-client/core/student/identifiers/device-id';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
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

    console.info(
      `💾 [root-database-initializer] 💾 Approx total allocated space: ${totalSpace} bytes`,
    );
    console.info(`💾 [root-database-initializer] 💾 Approx used space: ${usedSpace} bytes`);
    console.info(`💾 [root-database-initializer] 💾 Free space: ${totalSpace - usedSpace} bytes`);

    return { usage: usedSpace, quota: totalSpace };
  } catch (error) {
    console.error('💀 [root-database-initializer] 💀 Error estimating storage:', error);
    return 'Error estimating storage.';
  }
}

export function RootDatabaseInitializer() {
  useEffect(() => {
    getOrCreateDeviceId();
    getOrCreateOwnerId();
    getItemActivityDeviceStateDatabase();
    if (process.env.NODE_ENV === 'development') {
      estimateStorageQuota();
    }
  }, []);

  return null;
}
