'use strict';

const fs = require('node:fs');
const path = '.lighthouseci/links.json';

if (!fs.existsSync(path)) {
  process.exit(0);
}

const map = JSON.parse(fs.readFileSync(path, 'utf8'));
const values = Object.values(map).filter(Boolean);
const url =
  values.find((v) => String(v).includes('storage.googleapis.com')) || values[0];

process.stdout.write(url ? String(url) : '');
