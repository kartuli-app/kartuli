import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const srcDir = '../../../docs/';

console.log('🤖 Generating LLM documentation bundle...');

// Function to recursively scan docs folder and generate navigation
function generateNavigation() {
  const sections = {};

  function scanDirectory(dirPath, relativePath = '') {
    try {
      const files = readdirSync(dirPath);

      files.forEach((file) => {
        const filePath = join(dirPath, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
          scanDirectory(filePath, join(relativePath, file));
        } else if (file.endsWith('.md')) {
          const content = readFileSync(filePath, 'utf-8');
          const linkPath = relativePath ? join(relativePath, file) : file;
          const link = `/${linkPath.replace('.md', '')}`;
          const displayName = file
            .replace('.md', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const sectionMatch = frontmatter.match(/section:\s*(.+)/);
            const titleMatch = frontmatter.match(/title:\s*(.+)/);
            const dateMatch = frontmatter.match(/date:\s*(.+)/);

            const section = sectionMatch ? sectionMatch[1].trim() : 'Other';
            const title = titleMatch ? titleMatch[1].trim() : displayName;
            const date = dateMatch ? dateMatch[1].trim() : undefined;

            if (file !== 'index.md') {
              if (!sections[section]) sections[section] = [];
              sections[section].push({ text: title, link, date, filePath, content });
            }
          }
        }
      });
    } catch (error) {
      console.error(`❌ Error scanning directory ${dirPath}:`, error);
    }
  }

  try {
    const configDir = import.meta.dirname;
    const docsPath = join(configDir, srcDir);
    scanDirectory(docsPath);
    return sections;
  } catch (error) {
    console.error('❌ Error scanning docs:', error);
    return {};
  }
}

// Generate navigation data
const sections = generateNavigation();

// Merge sections for sidebar ordering
const mergedSections = {};

Object.entries(sections).forEach(([sectionName, items]) => {
  if (sectionName.includes('/')) {
    const [parentSection, subSection] = sectionName.split('/');

    if (!mergedSections[parentSection]) {
      mergedSections[parentSection] = { standalone: [], nested: {} };
    }

    const sortedItems = items.sort((a, b) => {
      if (a.date && b.date) return a.date.localeCompare(b.date);
      if (a.date && !b.date) return -1;
      if (!a.date && b.date) return 1;
      return a.text.localeCompare(b.text);
    });

    mergedSections[parentSection].nested[subSection] = sortedItems;
  } else {
    if (!mergedSections[sectionName]) {
      mergedSections[sectionName] = { standalone: [], nested: {} };
    }

    const sortedItems = items.sort((a, b) => {
      if (a.date && b.date) return a.date.localeCompare(b.date);
      if (a.date && !b.date) return -1;
      if (!a.date && b.date) return 1;
      return a.text.localeCompare(b.text);
    });

    mergedSections[sectionName].standalone = sortedItems;
  }
});

// Build ordered list of documents
const orderedDocuments = [];

Object.entries(mergedSections)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([sectionName, { standalone, nested }]) => {
    const allItems = [];

    allItems.push(...standalone);

    Object.entries(nested)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([subSectionName, subItems]) => {
        allItems.push({
          text: subSectionName,
          items: subItems,
        });
      });

    const sortedAllItems = allItems.sort((a, b) => {
      const aDate = a.date || a.items?.[0]?.date;
      const bDate = b.date || b.items?.[0]?.date;

      if (aDate && bDate) return aDate.localeCompare(bDate);
      if (aDate && !bDate) return -1;
      if (!aDate && bDate) return 1;
      return a.text.localeCompare(b.text);
    });

    orderedDocuments.push({ section: sectionName, items: sortedAllItems });
  });

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
        // Remove frontmatter from content
        let contentWithoutFrontmatter = subItem.content.replace(/^---\n[\s\S]*?\n---\n/, '');

        // Fix dead links
        contentWithoutFrontmatter = contentWithoutFrontmatter
          .replace(/\.\/code-conventions\.md/g, './tech/development/code-conventions.md')
          .replace(/\.\/github-workflow\.md/g, './tech/development/github-workflow.md')
          .replace(/\.\/ai-assisted-workflow\.md/g, './tech/development/ai-assisted-workflow.md');

        bundle += `${contentWithoutFrontmatter}\n\n`;
        bundle += '---\n\n';
      });
    } else {
      // Remove frontmatter from content
      let contentWithoutFrontmatter = item.content.replace(/^---\n[\s\S]*?\n---\n/, '');

      // Fix dead links
      contentWithoutFrontmatter = contentWithoutFrontmatter
        .replace(/\.\/code-conventions\.md/g, './tech/development/code-conventions.md')
        .replace(/\.\/github-workflow\.md/g, './tech/development/github-workflow.md')
        .replace(/\.\/ai-assisted-workflow\.md/g, './tech/development/ai-assisted-workflow.md');

      bundle += `${contentWithoutFrontmatter}\n\n`;
      bundle += '---\n\n';
    }
  });
});

// Write the bundle to docs directory for git tracking
const outputPath = join(import.meta.dirname, srcDir, 'kartuli-llm.txt');
writeFileSync(outputPath, bundle, 'utf-8');

console.log('✅ LLM bundle generated successfully:', outputPath);
console.log(`📊 Total sections: ${orderedDocuments.length}`);
console.log(`📄 Bundle size: ${(bundle.length / 1024).toFixed(2)} KB`);
