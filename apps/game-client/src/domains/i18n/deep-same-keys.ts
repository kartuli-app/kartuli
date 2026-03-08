/**
 * Ensures the same key structure as T at every level of nesting.
 */
export type DeepSameKeys<T> = T extends object ? { [K in keyof T]: DeepSameKeys<T[K]> } : unknown;
