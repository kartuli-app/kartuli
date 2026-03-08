/**
 * Ensures the same key structure as T at every level of nesting.
 * Leaf content is only strings (no number/boolean in i18n values). Objects and arrays
 * are preserved by structure; arrays use same element shape (no recursion into array keys).
 */
export type DeepSameKeys<T> = T extends null | undefined
  ? T
  : T extends readonly (infer U)[]
    ? readonly DeepSameKeys<U>[]
    : T extends object
      ? { [K in keyof T]: DeepSameKeys<T[K]> }
      : string;
