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
 * Escape special regex characters
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
function escapeRegex(str) {
  return str.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

/**
 * Fix dead links in content
 * @param {string} content - The content to fix
 * @returns {string} - Content with fixed links
 */
function fixDeadLinks(content) {
  let fixedContent = content;
  for (const [badLink, goodLink] of Object.entries(linkFixes)) {
    // Only replace links within markdown () syntax to prevent corrupting code blocks
    const pattern = new RegExp(String.raw`\((?:\s*)${escapeRegex(badLink)}(?:\s*)\)`, 'g');
    fixedContent = fixedContent.replace(pattern, `(${goodLink})`);
  }
  return fixedContent;
}

/**
 * Remove frontmatter from markdown content
 * @param {string} content - The markdown content
 * @returns {string} - Content without frontmatter
 */
function removeFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
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
 * Sort documentation items with hub/index pages first, then by date, then by title.
 * @param {Object} a - First item
 * @param {Object} b - Second item
 * @returns {number} - Sort order
 */
function compareDocItems(a, b) {
  if (a.isHub && !b.isHub) return -1;
  if (!a.isHub && b.isHub) return 1;
  if (a.date && b.date) return a.date.localeCompare(b.date);
  if (a.date && !b.date) return -1;
  if (!a.date && b.date) return 1;
  return a.text.localeCompare(b.text);
}

/**
 * @param {string} linkPath - POSIX path to the doc file
 * @returns {string} - URL path for the doc
 */
function getLinkForPath(linkPath) {
  if (linkPath === 'index.md') return '/';
  if (linkPath.endsWith('/index.md')) return `/${linkPath.replaceAll('/index.md', '/')}`;
  return `/${linkPath.replaceAll('.md', '')}`;
}

/**
 * @param {string} file - Basename of the file (e.g. 'my-doc.md')
 * @returns {string} - Display name for nav
 */
function getDisplayNameFromFile(file) {
  return file
    .replaceAll('.md', '')
    .replaceAll(/-/g, ' ')
    .replaceAll(/\b\w/g, (l) => l.toUpperCase());
}

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;

/**
 * @param {string} content - Full file content
 * @param {string} displayName - Fallback title
 * @param {string} fileName - Basename (e.g. 'index.md')
 * @returns {{ section: string, title: string, type?: string, date?: string, description?: string, isHub: boolean } | null}
 */
function parseFrontmatter(content, displayName, fileName) {
  const frontmatterMatch = content.match(FRONTMATTER_REGEX);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const sectionMatch = frontmatter.match(/section:\s*(.+)/);
  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  const typeMatch = frontmatter.match(/type:\s*(.+)/);
  const dateMatch = frontmatter.match(/date:\s*(.+)/);
  const descriptionMatch = frontmatter.match(/description:\s*(.+)/);

  const section = sectionMatch ? sectionMatch[1].trim() : 'Other';
  const title = titleMatch ? titleMatch[1].trim() : displayName;
  const type = typeMatch ? typeMatch[1].trim() : undefined;
  const date = dateMatch ? dateMatch[1].trim() : undefined;
  const description = descriptionMatch ? descriptionMatch[1].trim() : undefined;
  const isHub = fileName === 'index.md' || type === 'hub';

  return { section, title, type, date, description, isHub };
}

/**
 * @param {Object} sections - Mutable sections map
 * @param {string} dirPath - Absolute dir path
 * @param {string} relativePath - Relative path from docs root
 * @param {string} file - Basename
 */
function addMarkdownFileToSections(sections, dirPath, relativePath, file) {
  const filePath = join(dirPath, file);
  const content = readFileSync(filePath, 'utf-8');
  const linkPath = relativePath ? posixJoin(relativePath, file) : file;
  const link = getLinkForPath(linkPath);
  const displayName = getDisplayNameFromFile(file);
  const meta = parseFrontmatter(content, displayName, file);
  if (!meta) return;

  if (!sections[meta.section]) sections[meta.section] = [];
  sections[meta.section].push({
    text: meta.title,
    link,
    type: meta.type,
    isHub: meta.isHub,
    date: meta.date,
    description: meta.description,
    filePath,
    content,
    processedContent: processMarkdownContent(content),
  });
}

/**
 * Generate navigation data by scanning docs folder
 * @returns {Object} - Navigation data with sections and items
 */
function generateNavigation() {
  const sections = {};

  function scanDirectory(dirPath, relativePath = '') {
    try {
      const files = readdirSync(dirPath);

      for (const file of files) {
        const filePath = join(dirPath, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
          scanDirectory(filePath, join(relativePath, file));
          continue;
        }
        if (!file.endsWith('.md')) continue;

        // Keep docs root index as landing page only; exclude from generated section listings.
        if (!relativePath && file === 'index.md') continue;

        addMarkdownFileToSections(sections, dirPath, relativePath, file);
      }
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
      const [parentSection, ...subSectionParts] = sectionName.split('/');
      const subSection = subSectionParts.join('/');

      if (!mergedSections[parentSection]) {
        mergedSections[parentSection] = { standalone: [], nested: {} };
      }

      mergedSections[parentSection].nested[subSection] = items.toSorted(compareDocItems);
    } else {
      if (!mergedSections[sectionName]) {
        mergedSections[sectionName] = { standalone: [], nested: {} };
      }

      mergedSections[sectionName].standalone = items.toSorted(compareDocItems);
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

      const sortedAllItems = allItems.toSorted((a, b) => {
        if (a.isHub && !b.isHub) return -1;
        if (!a.isHub && b.isHub) return 1;
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
  const sections = generateNavigation();
  const mergedSections = mergeSections(sections);
  const orderedDocuments = buildOrderedDocuments(mergedSections);

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
