import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { processDocs } from './docs-processor.js';

console.log('🤖 Generating LLM documentation bundle...');

// Process all documentation using shared utility
const { orderedDocuments } = processDocs();

const docsBaseUrl = 'https://kartuli-app.github.io';
const docsBasePath = '/kartuli';
const sectionOrder = {
  Gamarjoba: 0,
  Home: 0,
  'Start Here': 1,
  'Start here': 1,
  Backlog: 2,
  Product: 3,
  Tech: 4,
  Providers: 5,
  Apps: 6,
  Tools: 7,
  Packages: 8,
};

const excludedPathPatterns = [
  // Add path fragments to exclude low-value utility pages if needed.
];

function shouldSkipDoc(doc) {
  if (!doc?.link) return true;

  // Future-proof explicit frontmatter skip marker support.
  if (typeof doc.content === 'string' && /(?:^|\n)llm:\s*skip(?:\n|$)/i.test(doc.content)) {
    return true;
  }

  if (excludedPathPatterns.some((pattern) => doc.filePath?.includes(pattern))) {
    return true;
  }

  return false;
}

function toSiteUrl(link) {
  const normalized = link.startsWith('/') ? link : `/${link}`;
  const route = normalized.replace(/\.html$/, '');
  return `${docsBaseUrl}${docsBasePath}${route}`;
}

function sortSections(a, b) {
  const aRank = sectionOrder[a.section] ?? 50;
  const bRank = sectionOrder[b.section] ?? 50;
  if (aRank !== bRank) return aRank - bRank;
  return a.section.localeCompare(b.section);
}

// Generate the bundle (index-links mode)
let bundle = `# kartuli-llm.txt

> Generated: ${new Date().toISOString()}
>
> Links-only index for Kartuli documentation.
> Use this file to discover relevant docs pages and fetch only what you need.

---

## Documentation Index

`;

const sortedDocuments = [...orderedDocuments].sort(sortSections);
sortedDocuments.forEach(({ section, items }) => {
  bundle += `### ${section}\n\n`;

  items.forEach((item) => {
    if (item.items) {
      bundle += `- **${item.text}**\n`;
      item.items.forEach((subItem) => {
        if (shouldSkipDoc(subItem)) return;
        const desc = subItem.description ? ` — ${subItem.description}` : '';
        bundle += `  - [${subItem.text}](${toSiteUrl(subItem.link)})${desc}\n`;
      });
      return;
    }

    if (shouldSkipDoc(item)) return;
    const desc = item.description ? ` — ${item.description}` : '';
    bundle += `- [${item.text}](${toSiteUrl(item.link)})${desc}\n`;
  });

  bundle += '\n';
});

// Write the bundle to docs directory for git tracking
const configDir = fileURLToPath(new URL('.', import.meta.url));
const outputPath = join(configDir, '../../../docs', 'kartuli-llm.txt');
writeFileSync(outputPath, bundle, 'utf-8');

console.log('✅ LLM bundle generated successfully:', outputPath);
console.log(`📊 Total sections: ${orderedDocuments.length}`);
console.log(`📄 Bundle size: ${(bundle.length / 1024).toFixed(2)} KB`);
