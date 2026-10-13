import path from 'node:path';

const sourceDirectory = import.meta.dirname;

export const e2ePackageRoot = path.resolve(sourceDirectory, '..');
export const repoRoot = path.resolve(sourceDirectory, '../../..');
