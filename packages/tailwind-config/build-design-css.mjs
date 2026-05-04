import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.resolve(__dirname, '../../generated/design.tokens.json');
const outputPath = path.resolve(__dirname, 'shared-styles.css');

const tokens = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

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
    typeof value.value !== 'undefined' &&
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
  const lineHeight = readDimension(value.lineHeight) ?? readRaw(value.lineHeight);

  if (fontFamily) {
    tokenLines.push(`  --${name}-font-family: ${fontFamily};`);
    tailwindLines.push(`  --font-${name}: ${cssVar(`${name}-font-family`)};`);
  }
  if (fontSize) {
    tokenLines.push(`  --${name}-font-size: ${fontSize};`);
    tailwindLines.push(`  --text-${name}: ${cssVar(`${name}-font-size`)};`);
  }
  if (fontWeight) {
    tokenLines.push(`  --${name}-font-weight: ${fontWeight};`);
    tailwindLines.push(`  --text-${name}--font-weight: ${cssVar(`${name}-font-weight`)};`);
  }
  if (letterSpacing) {
    tokenLines.push(`  --${name}-letter-spacing: ${letterSpacing};`);
    tailwindLines.push(`  --text-${name}--letter-spacing: ${cssVar(`${name}-letter-spacing`)};`);
  }
  if (lineHeight) {
    tokenLines.push(`  --${name}-line-height: ${lineHeight};`);
    tailwindLines.push(`  --text-${name}--line-height: ${cssVar(`${name}-line-height`)};`);
  }
}

tokenLines.push('}');
tailwindLines.push('}');

const output = [...header, ...tokenLines, '', ...tailwindLines, ''].join('\n');
fs.writeFileSync(outputPath, output);
process.stdout.write(`Generated ${outputPath}\n`);
