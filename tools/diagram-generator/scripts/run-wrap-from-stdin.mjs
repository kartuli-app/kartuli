/**
 * Pipe stdin to dependency-cruiser's wrap-stream-in-html (stdin = dot, stdout = HTML).
 * Resolves the bin next to this package's dependency-cruiser install (exports do not expose bin/).
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const wrapPath = path.join(scriptDir, '../node_modules/dependency-cruiser/bin/wrap-stream-in-html.mjs');

const child = spawn(process.execPath, [wrapPath], {
  stdio: ['pipe', 'inherit', 'inherit'],
});

const childResult = new Promise((resolve, reject) => {
  child.on('error', reject);
  child.on('exit', (code, signal) => {
    if (signal) reject(new Error(String(signal)));
    else if (code) reject(new Error(`wrap-stream-in-html exited with ${code}`));
    else resolve();
  });
});

await pipeline(process.stdin, child.stdin);
await childResult;
