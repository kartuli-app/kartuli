import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { join as posixJoin } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

// Centralized link fixes configuration
const linkFixes = {
  './code-conventions.md': './tech/development/code-conventions.md',
  './github-workflow.md': './tech/development/github-workflow.md',
  './ai-assisted-workflow.md': './tech/development/ai-assisted-workflow.md',
};

/**
 * Fix dead links in content
 * @param {string} content - The content to fix
 * @returns {string} - Content with fixed links
 */
function fixDeadLinks(content) {
  let fixedContent = content;
  for (const [badLink, goodLink] of Object.entries(linkFixes)) {
    // Use a regex to replace all occurrences of the bad link
    fixedContent = fixedContent.replace(new RegExp(badLink.replace('.', '\\.'), 'g'), goodLink);
  }
  return fixedContent;
}

/**
 * Remove frontmatter from markdown content
 * @param {string} content - The markdown content
 * @returns {string} - Content without frontmatter
 */
function removeFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n/, '');
}

/**
 * Process markdown content (remove frontmatter and fix links)
 * @param {string} content - The markdown content
 * @returns {string} - Processed content
 */
function processMarkdownContent(content) {
  let processed = removeFrontmatter(content);
  processed = fixDeadLinks(processed);
  return processed;
}

/**
 * Generate navigation data by scanning docs folder
 * @returns {Object} - Navigation data with sections and items
 */
function generateNavigation() {
  console.log('🔍 Scanning docs folder...');

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
          // Use POSIX join to ensure forward slashes in URLs across all platforms
          const linkPath = relativePath ? posixJoin(relativePath, file) : file;
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
              sections[section].push({
                text: title,
                link,
                date,
                filePath,
                content,
                processedContent: processMarkdownContent(content),
              });
            }
          }
        }
      });
    } catch (error) {
      console.error(`❌ Error scanning directory ${dirPath}:`, error);
    }
  }

  try {
    const configDir = fileURLToPath(new URL('.', import.meta.url)); // ESM-safe directory resolution
    const docsPath = join(configDir, '../../../docs');
    scanDirectory(docsPath);
    return sections;
  } catch (error) {
    console.error('❌ Error scanning docs:', error);
    return {};
  }
}

/**
 * Merge sections for consistent navigation logic
 * @param {Object} sections - Raw sections data
 * @returns {Object} - Merged sections with standalone and nested items
 */
function mergeSections(sections) {
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

  return mergedSections;
}

/**
 * Build ordered list of documents for LLM bundle
 * @param {Object} mergedSections - Merged sections data
 * @returns {Array} - Ordered documents array
 */
function buildOrderedDocuments(mergedSections) {
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

  return orderedDocuments;
}

/**
 * Main function to process all documentation
 * @returns {Object} - Processed documentation data
 */
export function processDocs() {
  console.log('🤖 Processing documentation...');

  const sections = generateNavigation();
  const mergedSections = mergeSections(sections);
  const orderedDocuments = buildOrderedDocuments(mergedSections);

  console.log('✅ Documentation processing complete');
  console.log(`📊 Total sections: ${orderedDocuments.length}`);

  return {
    sections,
    mergedSections,
    orderedDocuments,
    linkFixes,
    processMarkdownContent,
    removeFrontmatter,
    fixDeadLinks,
  };
}
