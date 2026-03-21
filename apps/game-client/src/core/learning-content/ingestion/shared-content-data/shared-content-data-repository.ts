import type { SharedContentData } from './shared-content-data';

export interface SharedContentDataRepository {
  get(): Promise<SharedContentData>;
}
