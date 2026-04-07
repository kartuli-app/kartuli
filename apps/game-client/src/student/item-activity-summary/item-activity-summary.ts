export type ItemActivitySummary = {
  id: string;
  ownerId: string;
  itemId: string;

  totalViewCount: number;
  totalSuccessCount: number;
  totalFailCount: number;

  // Stored in IndexedDB as ISO strings (see `ItemActivityDeviceStateRow`).
  firstSeenAt: string | null;
  lastSeenAt: string | null;
  lastSuccessAt: string | null;
  lastFailAt: string | null;

  updatedAt: string;
};
