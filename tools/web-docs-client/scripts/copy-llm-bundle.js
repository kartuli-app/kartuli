import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

console.log('📋 Copying LLM bundle to assets folder...');

try {
  // Read the generated LLM bundle
const configDir = fileURLToPath(new URL('.', import.meta.url));
const sourcePath = join(configDir, '../../../docs/kartuli-llm.txt');
  const bundleContent = readFileSync(sourcePath, 'utf-8');

  // Create assets directory in dist
  const assetsDir = join(configDir, '../.vitepress/dist/assets');
  mkdirSync(assetsDir, { recursive: true });

  // Write the bundle to assets folder
  const destPath = join(assetsDir, 'kartuli-llm.txt');
  writeFileSync(destPath, bundleContent, 'utf-8');

  console.log('✅ LLM bundle copied to assets:', destPath);
} catch (error) {
  console.error('❌ Error copying LLM bundle:', error);
  process.exit(1);
}
