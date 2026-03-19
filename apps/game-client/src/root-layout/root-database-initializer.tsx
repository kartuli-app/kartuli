'use client';
import { getOrCreateDeviceId } from '@game-client/core/student/identifiers/device-id';
import { getOrCreateOwnerId } from '@game-client/core/student/identifiers/owner-id';
import { getItemActivityStateDatabase } from '@game-client/core/student/item-activity-state/item-activity-state-database';
import { useEffect } from 'react';

export function RootDatabaseInitializer() {
  useEffect(() => {
    getOrCreateDeviceId();
    getOrCreateOwnerId();
    getItemActivityStateDatabase();
  }, []);

  return null;
}
