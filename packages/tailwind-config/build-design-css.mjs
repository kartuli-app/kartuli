import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.resolve(__dirname, '../../generated/design.tokens.json');
const outputPath = path.resolve(__dirname, 'shared-styles.css');

function exitForInvalidInput(message) {
  process.stderr.write(
    `${message}\nRun \`pnpm run design:build\` from the repo root to generate it again.\n`,
  );
  process.exit(1);
}

let tokens;
try {
  const rawTokens = fs.readFileSync(inputPath, 'utf8').trim();
  if (!rawTokens) {
    exitForInvalidInput(`Error: ${inputPath} is empty.`);
  }
  tokens = JSON.parse(rawTokens);
} catch (error) {
  if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
    exitForInvalidInput(`Error: ${inputPath} not found.`);
  }
  if (error instanceof SyntaxError) {
    exitForInvalidInput(`Error: ${inputPath} contains invalid JSON.`);
  }
  throw error;
}

function isMetaKey(key) {
  return key.startsWith('$');
}

function readColor(token) {
  const value = token?.$value;
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && typeof value.hex === 'string') return value.hex;
  return undefined;
}

function readDimension(tokenOrValue) {
  const value = tokenOrValue?.$value ?? tokenOrValue;
  if (typeof value === 'string') return value;
  if (
    value &&
    typeof value === 'object' &&
    value.value !== undefined &&
    typeof value.unit === 'string'
  ) {
    return `${value.value}${value.unit}`;
  }
  return undefined;
}

function readRaw(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return undefined;
}

// The @google/design.md DTCG exporter strips the px unit from lineHeight,
// emitting a bare number (e.g. 28 instead of "28px"). Re-attach px here.
function readLineHeight(value) {
  if (typeof value === 'number') return `${value}px`;
  return readDimension(value) ?? readRaw(value);
}

function cssVar(name) {
  return `var(--${name})`;
}

const header = [
  '/* Generated from generated/design.tokens.json. */',
  '/* Do not edit manually. Update DESIGN.md, then run pnpm design:build. */',
  '',
];

const tokenLines = [':root {'];
const tailwindLines = ['@theme static {'];

for (const [name, token] of Object.entries(tokens.color ?? {})) {
  if (isMetaKey(name)) continue;
  const value = readColor(token);
  if (!value) continue;
  tokenLines.push(`  --${name}: ${value};`);
  tailwindLines.push(`  --color-${name}: ${cssVar(name)};`);
}

for (const [name, token] of Object.entries(tokens.spacing ?? {})) {
  if (isMetaKey(name)) continue;
  const value = readDimension(token);
  if (!value) continue;
  tokenLines.push(`  --${name}: ${value};`);
  tailwindLines.push(`  --spacing-${name}: ${cssVar(name)};`);
}

for (const [name, token] of Object.entries(tokens.rounded ?? {})) {
  if (isMetaKey(name)) continue;
  const value = readDimension(token);
  if (!value) continue;
  tokenLines.push(`  --${name}: ${value};`);
  tailwindLines.push(`  --radius-${name}: ${cssVar(name)};`);
}

for (const [name, token] of Object.entries(tokens.typography ?? {})) {
  if (isMetaKey(name)) continue;
  const value = token?.$value;
  if (!value || typeof value !== 'object') continue;

  const fontFamily = readRaw(value.fontFamily);
  const fontSize = readDimension(value.fontSize);
  const fontWeight = readRaw(value.fontWeight);
  const letterSpacing = readDimension(value.letterSpacing);
  const lineHeight = readLineHeight(value.lineHeight);

  if (fontFamily) {
    const varName = `${name}-font-family`;
    tokenLines.push(`  --${varName}: ${fontFamily};`);
    tailwindLines.push(`  --font-${name}: ${cssVar(varName)};`);
  }
  if (fontSize) {
    const varName = `${name}-font-size`;
    tokenLines.push(`  --${varName}: ${fontSize};`);
    tailwindLines.push(`  --text-${name}: ${cssVar(varName)};`);
  }
  if (fontWeight) {
    const varName = `${name}-font-weight`;
    tokenLines.push(`  --${varName}: ${fontWeight};`);
    tailwindLines.push(`  --text-${name}--font-weight: ${cssVar(varName)};`);
  }
  if (letterSpacing) {
    const varName = `${name}-letter-spacing`;
    tokenLines.push(`  --${varName}: ${letterSpacing};`);
    tailwindLines.push(`  --text-${name}--letter-spacing: ${cssVar(varName)};`);
  }
  if (lineHeight) {
    const varName = `${name}-line-height`;
    tokenLines.push(`  --${varName}: ${lineHeight};`);
    tailwindLines.push(`  --text-${name}--line-height: ${cssVar(varName)};`);
  }
}

tokenLines.push('}');
tailwindLines.push('}');

const output = [...header, ...tokenLines, '', ...tailwindLines, ''].join('\n');
fs.writeFileSync(outputPath, output);
process.stdout.write(`Generated ${outputPath}\n`);
