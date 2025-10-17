import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { processDocs } from './docs-processor.js';

console.log('🤖 Generating LLM documentation bundle...');

// Process all documentation using shared utility
const { orderedDocuments } = processDocs();

// Generate the bundle
let bundle = `# Kartuli Documentation Bundle

> **Generated**: ${new Date().toISOString()}
> 
> This file contains all Kartuli documentation in a single markdown file for LLM context.
> The documents are ordered as they appear in the documentation sidebar.

---

`;

// Add table of contents
bundle += '## Table of Contents\n\n';
orderedDocuments.forEach(({ section, items }) => {
  bundle += `### ${section}\n`;
  items.forEach((item) => {
    if (item.items) {
      bundle += `- **${item.text}**\n`;
      item.items.forEach((subItem) => {
        bundle += `  - ${subItem.text}\n`;
      });
    } else {
      bundle += `- ${item.text}\n`;
    }
  });
  bundle += '\n';
});

bundle += '---\n\n';

// Add document contents
orderedDocuments.forEach(({ section, items }) => {
  bundle += `# ${section}\n\n`;

  items.forEach((item) => {
    if (item.items) {
      bundle += `## ${item.text}\n\n`;
      item.items.forEach((subItem) => {
        // Use processed content from shared utility
        bundle += `${subItem.processedContent}\n\n`;
        bundle += '---\n\n';
      });
    } else {
      // Use processed content from shared utility
      bundle += `${item.processedContent}\n\n`;
      bundle += '---\n\n';
    }
  });
});

// Write the bundle to docs directory for git tracking
const outputPath = join(import.meta.dirname, '../../../docs', 'kartuli-llm.txt');
writeFileSync(outputPath, bundle, 'utf-8');

console.log('✅ LLM bundle generated successfully:', outputPath);
console.log(`📊 Total sections: ${orderedDocuments.length}`);
console.log(`📄 Bundle size: ${(bundle.length / 1024).toFixed(2)} KB`);