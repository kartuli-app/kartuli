import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { join as posixJoin } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

/** @type {Record<string, string>} Old relative markdown targets → new paths under docs/ (empty if none). */
const linkFixes = {};

const ORDERED_NAME = /^(\d{2})-(.+)$/;

/** @param {string} rel */
function toPosixPath(rel) {
  return rel.replaceAll('\\', '/');
}

/** @param {string} rel */
function posixDirname(rel) {
  const seg = toPosixPath(rel).split('/').filter(Boolean);
  if (seg.length <= 1) return '';
  return seg.slice(0, -1).join('/');
}

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
 * @param {string} content - The markdown content
 * @returns {string} - Content with fixed links
 */
function fixDeadLinks(content) {
  let fixedContent = content;
  for (const [badLink, goodLink] of Object.entries(linkFixes)) {
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
 * @param {string} slug - Remainder after optional NN- prefix
 * @returns {string} - Title-style label
 */
function humanizeSlug(slug) {
  return slug.replaceAll('-', ' ').replaceAll(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * @param {string} segment - Single path segment (folder name)
 * @returns {{ order: number, label: string }}
 */
function parseOrderedSegment(segment) {
  const m = ORDERED_NAME.exec(segment);
  if (m) {
    return { order: Number.parseInt(m[1], 10), label: humanizeSlug(m[2]) };
  }
  return { order: 99, label: humanizeSlug(segment) };
}

/**
 * @param {string} file - Basename e.g. 02-vercel.md
 * @returns {{ order: number, slug: string }}
 */
function parseOrderedFileBase(file) {
  const stem = file.replace(/\.md$/i, '');
  const m = ORDERED_NAME.exec(stem);
  if (m) {
    return { order: Number.parseInt(m[1], 10), slug: m[2] };
  }
  return { order: 99, slug: stem };
}

/**
 * @param {string} relativePath - Path from docs root using / (no trailing slash)
 * @returns {{ sectionKey: string, folderOrders: number[] }}
 */
function derivePathMeta(relativePath) {
  if (!relativePath) {
    return { sectionKey: 'Documentation', folderOrders: [999] };
  }
  const segments = toPosixPath(relativePath).split('/').filter(Boolean);
  const labels = [];
  /** @type {number[]} */
  const folderOrders = [];
  for (const seg of segments) {
    const { order, label } = parseOrderedSegment(seg);
    folderOrders.push(order);
    labels.push(label);
  }
  return { sectionKey: labels.join('/'), folderOrders };
}

/**
 * Directories that contain exactly one .md file, no subdirectories, and that file is not index.md.
 * Collapse that folder in the nav (file label only).
 * @param {string} docsPath
 * @returns {Set<string>}
 */
function collectSingletonDocFolders(docsPath) {
  /** @type {Set<string>} */
  const singleton = new Set();

  function walk(rel = '') {
    const abs = join(docsPath, rel);
    let entries;
    try {
      entries = readdirSync(abs, { withFileTypes: true });
    } catch {
      return;
    }
    const mdFiles = entries.filter((e) => e.isFile() && e.name.endsWith('.md')).map((e) => e.name);
    const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    const relPosix = toPosixPath(rel);
    if (mdFiles.length === 1 && dirs.length === 0) {
      const only = mdFiles[0];
      if (only !== 'index.md') {
        singleton.add(relPosix);
      }
    }
    for (const d of dirs) {
      walk(rel ? join(rel, d) : d);
    }
  }

  walk('');
  return singleton;
}

/**
 * Strip trailing path segments while each is a singleton doc folder (disk layout → flatter nav).
 * @param {string} relativePath - folder containing the markdown file
 * @param {string} file
 * @param {Set<string>} singletonSet
 */
function effectiveRelativePathForSectioning(relativePath, file, singletonSet) {
  let rp = toPosixPath(relativePath);
  if (file === 'index.md') return rp;
  while (rp && singletonSet.has(rp)) {
    rp = posixDirname(rp);
  }
  return rp;
}

/**
 * Lexicographic compare of numeric order paths (shorter padded with 99).
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */
export function compareFolderOrderArrays(a, b) {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const av = a[i] ?? 99;
    const bv = b[i] ?? 99;
    if (av !== bv) return av - bv;
  }
  return 0;
}

/**
 * @param {{ items?: Object[], sortFolderOrders?: number[], folderOrders?: number[], fileSortOrder?: number, isHub?: boolean }} entry
 * @returns {number[]}
 */
function siblingOrderTuple(entry) {
  if (entry.items) {
    const it = entry.items[0];
    const fo = it.sortFolderOrders ?? it.folderOrders ?? [];
    return [...fo, it.fileSortOrder ?? 99];
  }
  const fo = entry.sortFolderOrders ?? entry.folderOrders ?? [];
  return [...fo, entry.fileSortOrder ?? 99];
}

/**
 * Sort docs or sidebar peers: hub first, then full path order (folders + file NN-).
 * @param {Object} a
 * @param {Object} b
 * @returns {number}
 */
function compareHubPathThenText(a, b) {
  if (a.isHub && !b.isHub) return -1;
  if (!a.isHub && b.isHub) return 1;
  const c = compareFolderOrderArrays(siblingOrderTuple(a), siblingOrderTuple(b));
  if (c !== 0) return c;
  return a.text.localeCompare(b.text);
}

export const compareDocItems = compareHubPathThenText;
export const compareSidebarSiblings = compareHubPathThenText;

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
 * @returns {string} - Display name for nav (from filename; no title in front matter)
 */
function getDisplayNameFromFile(file) {
  const { slug } = parseOrderedFileBase(file);
  return humanizeSlug(slug);
}

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---/;

const DESCRIPTION_LINE_PREFIX = 'description:';

/**
 * First `description:` line at column 0 (YAML-style), value after optional spaces; O(n) in frontmatter size.
 * @param {string} frontmatter
 * @returns {string}
 */
function extractDescriptionFromFrontmatter(frontmatter) {
  for (const line of frontmatter.split(/\r?\n/)) {
    if (!line.startsWith(DESCRIPTION_LINE_PREFIX)) continue;
    return line.slice(DESCRIPTION_LINE_PREFIX.length).trimStart().trim();
  }
  return '';
}

/**
 * @param {string} content - Full file content
 * @param {string} relPathForWarn - Relative path for warnings
 * @returns {{ description: string }}
 */
function parseFrontmatter(content, relPathForWarn) {
  const frontmatterMatch = FRONTMATTER_REGEX.exec(content);
  if (!frontmatterMatch) {
    console.warn(`[docs-processor] Missing frontmatter (description required): ${relPathForWarn}`);
    return { description: '' };
  }

  const frontmatter = frontmatterMatch[1];
  const description = extractDescriptionFromFrontmatter(frontmatter);
  if (!description) {
    console.warn(`[docs-processor] Missing or empty description: ${relPathForWarn}`);
  }

  return { description };
}

/**
 * @param {Object} sections - Mutable sections map
 * @param {string} dirPath - Absolute dir path
 * @param {string} relativePath - Relative path from docs root
 * @param {string} file - Basename
 * @param {Set<string>} singletonSet
 */
function addMarkdownFileToSections(sections, dirPath, relativePath, file, singletonSet) {
  const filePath = join(dirPath, file);
  const content = readFileSync(filePath, 'utf-8');
  const linkPath = relativePath ? posixJoin(relativePath, file) : file;
  const link = getLinkForPath(linkPath);
  const displayName = getDisplayNameFromFile(file);
  const relForWarn = relativePath ? `${relativePath}/${file}` : file;
  const meta = parseFrontmatter(content, relForWarn);

  const relPosix = toPosixPath(relativePath);
  const origMeta = derivePathMeta(relPosix);
  const effRel = effectiveRelativePathForSectioning(relPosix, file, singletonSet);
  const effMeta = derivePathMeta(effRel);
  const { order: fileSortOrder } = parseOrderedFileBase(file);

  const sectionKey = effMeta.sectionKey;
  if (!sections[sectionKey]) sections[sectionKey] = [];
  sections[sectionKey].push({
    text: displayName,
    link,
    isHub: file === 'index.md',
    description: meta.description,
    filePath,
    content,
    processedContent: processMarkdownContent(content),
    folderOrders: effMeta.folderOrders,
    sortFolderOrders: origMeta.folderOrders,
    fileSortOrder,
  });
}

/**
 * Generate navigation data by scanning docs folder
 * @returns {Object} - Navigation data with sections and items
 */
function generateNavigation() {
  const sections = {};

  const configDir = fileURLToPath(new URL('.', import.meta.url));
  const docsPath = join(configDir, '../../../docs');
  const singletonSet = collectSingletonDocFolders(docsPath);

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

        if (!relativePath && file === 'index.md') continue;

        if (!relativePath && file === 'kartuli-llm.md') continue;

        addMarkdownFileToSections(sections, dirPath, relativePath, file, singletonSet);
      }
    } catch (error) {
      console.error(`💀 [docs-processor] 💀 Error scanning directory ${dirPath}:`, error);
    }
  }

  try {
    scanDirectory(docsPath);
    return sections;
  } catch (error) {
    console.error('💀 [docs-processor] 💀 Error scanning docs:', error);
    return {};
  }
}

/**
 * Merge sections for consistent navigation logic
 * @param {Object} sections - Raw sections data
 * @returns {Object} - Merged sections with standalone, nested, sectionOrder
 */
function mergeSections(sections) {
  /** @type {Record<string, { standalone: Object[], nested: Record<string, Object[]>, sectionOrder: number }>} */
  const mergedSections = {};

  Object.entries(sections).forEach(([sectionName, items]) => {
    const topOrder = items[0]?.folderOrders?.[0] ?? 99;

    if (sectionName.includes('/')) {
      const [parentSection, ...subSectionParts] = sectionName.split('/');
      const subSection = subSectionParts.join('/');

      if (mergedSections[parentSection]) {
        mergedSections[parentSection].sectionOrder = Math.min(
          mergedSections[parentSection].sectionOrder,
          topOrder,
        );
      } else {
        mergedSections[parentSection] = { standalone: [], nested: {}, sectionOrder: topOrder };
      }
      const sorted = items.toSorted(compareDocItems);
      sorted.nestedSortOrders = items[0]?.sortFolderOrders?.slice(1) ?? [];
      mergedSections[parentSection].nested[subSection] = sorted;
    } else {
      if (mergedSections[sectionName]) {
        mergedSections[sectionName].sectionOrder = Math.min(
          mergedSections[sectionName].sectionOrder,
          topOrder,
        );
      } else {
        mergedSections[sectionName] = { standalone: [], nested: {}, sectionOrder: topOrder };
      }
      mergedSections[sectionName].standalone = items.toSorted(compareDocItems);
    }
  });

  return mergedSections;
}

/**
 * @param {Record<string, { standalone: Object[], nested: Record<string, Object[]>, sectionOrder: number }>} mergedSections
 * @returns {[string, { standalone: Object[], nested: Record<string, Object[]>, sectionOrder: number }][]}
 */
export function getSortedMergedSectionEntries(mergedSections) {
  return Object.entries(mergedSections).toSorted(([nameA, a], [nameB, b]) => {
    const orderA = a.sectionOrder ?? 99;
    const orderB = b.sectionOrder ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return nameA.localeCompare(nameB);
  });
}

/**
 * @param {Record<string, Object[]>} nested
 * @returns {[string, Object[]][]}
 */
export function getSortedNestedEntries(nested) {
  return Object.entries(nested).toSorted(([keyA, itemsA], [keyB, itemsB]) => {
    const ordA = itemsA.nestedSortOrders ?? [];
    const ordB = itemsB.nestedSortOrders ?? [];
    const c = compareFolderOrderArrays(ordA, ordB);
    if (c !== 0) return c;
    return keyA.localeCompare(keyB);
  });
}

/**
 * Build ordered list of documents for LLM bundle
 * @param {Object} mergedSections - Merged sections data
 * @returns {Array} - Ordered documents array
 */
function buildOrderedDocuments(mergedSections) {
  const orderedDocuments = [];

  getSortedMergedSectionEntries(mergedSections).forEach(([sectionName, { standalone, nested }]) => {
    const allItems = [];

    allItems.push(...standalone);

    getSortedNestedEntries(nested).forEach(([subSectionName, subItems]) => {
      allItems.push({
        text: subSectionName,
        items: subItems,
      });
    });

    const sortedAllItems = allItems.toSorted(compareSidebarSiblings);

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
    getSortedMergedSectionEntries,
    getSortedNestedEntries,
    compareFolderOrderArrays,
    compareDocItems,
    compareSidebarSiblings,
  };
}
