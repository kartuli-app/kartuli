import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { processDocs } from './docs-processor.js';

console.info('🤖 [generate-llm-bundle] 🤖 Generating LLM documentation bundle...');

// Process all documentation using shared utility
const { orderedDocuments } = processDocs();

const docsBaseUrl = 'https://kartuli-app.github.io';
const docsBasePath = '/kartuli';

function shouldSkipDoc(doc) {
  if (!doc?.link) return true;

  // Future-proof explicit frontmatter skip marker support.
  if (typeof doc.content === 'string' && /(?:^|\n)llm:\s*skip(?:\n|$)/i.test(doc.content)) {
    return true;
  }

  return false;
}

function toSiteUrl(link) {
  const normalized = link.startsWith('/') ? link : `/${link}`;
  const route = normalized.replace(/\.html$/, '');
  return `${docsBaseUrl}${docsBasePath}${route}`;
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

orderedDocuments.forEach(({ section, items }) => {
  bundle += `### ${section}\n\n`;

  items.forEach((item) => {
    if (item.items) {
      bundle += `- **${item.text}**\n`;
      item.items.forEach((subItem) => {
        if (shouldSkipDoc(subItem)) return;
        const desc = subItem.description ? ` - ${subItem.description}` : '';
        bundle += `  - [${subItem.text}](${toSiteUrl(subItem.link)})${desc}\n`;
      });
      return;
    }

    if (shouldSkipDoc(item)) return;
    const desc = item.description ? ` - ${item.description}` : '';
    bundle += `- [${item.text}](${toSiteUrl(item.link)})${desc}\n`;
  });

  bundle += '\n';
});

// Write the bundle to docs directory for git tracking
const configDir = fileURLToPath(new URL('.', import.meta.url));
const outputPath = join(configDir, '../../../docs', 'kartuli-llm.txt');
writeFileSync(outputPath, bundle, 'utf-8');

console.info('🤖 [generate-llm-bundle] 🤖 LLM bundle generated successfully:', outputPath);
console.info(`🤖 [generate-llm-bundle] 🤖 Total sections: ${orderedDocuments.length}`);
console.info(`🤖 [generate-llm-bundle] 🤖 Bundle size: ${(bundle.length / 1024).toFixed(2)} KB`);
