export type ItemActivityState = {
  id: string;
  ownerId: string;
  deviceId: string;
  itemId: string;
  viewCount: number;
  firstViewAt: string | null;
  lastViewAt: string | null;
  successCount: number;
  firstSuccessAt: string | null;
  lastSuccessAt: string | null;
  failCount: number;
  firstFailAt: string | null;
  lastFailAt: string | null;
  updatedAt: string;
};
