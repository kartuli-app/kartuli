import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { processDocs } from './docs-processor.js';

const root = fileURLToPath(new URL('../../../docs/', import.meta.url));
const documents = Object.values(processDocs().sections).flat();
assert.equal(Object.keys(processDocs().mergedSections).length, 12);
for (const doc of documents) {
  assert.ok(doc.description, `Missing description: ${doc.filePath}`);
  const withoutCode = doc.content.replace(/```[\s\S]*?```/g, '');
  for (const match of withoutCode.matchAll(/\]\(([^\s)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^(?:[a-z]+:|\/)/i.test(target)) continue;
    assert.ok(existsSync(resolve(dirname(doc.filePath), target)), `${doc.filePath}: ${target}`);
  }
}
const bundle = readFileSync(resolve(root, 'kartuli-llm.txt'), 'utf8');
for (const doc of documents) {
  if (/(?:^|\n)llm:\s*skip(?:\n|$)/i.test(doc.content)) continue;
  assert.ok(bundle.includes(`https://kartuli-app.github.io/kartuli${doc.link}`), doc.link);
}
const publicBundle = readFileSync(
  new URL('../public/assets/kartuli-llm.txt', import.meta.url),
  'utf8',
);
assert.equal(publicBundle, bundle);
if (process.argv.includes('--built')) {
  const output = new URL('../.vitepress/dist/assets/kartuli-llm.txt', import.meta.url);
  assert.equal(readFileSync(output, 'utf8'), bundle);
}
console.info(
  `Validated ${documents.length} indexed pages, descriptions, local file links and index copies.`,
);
