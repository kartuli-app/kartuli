import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vitepress';

const title = 'Kartuli Docs';
const description = 'Kartuli Web Docs Client';
const srcDir = '../../docs/';
const llmBundleUrl = 'https://github.com/rocescoca/kartuli/blob/main/docs/kartuli-llm.txt';

// Function to recursively scan docs folder and generate navigation
function generateNavigation() {
  console.log('🔍 Scanning docs folder...');

  const navItems: Array<{ text: string; link: string; date?: string }> = [];
  const sections: Record<string, Array<{ text: string; link: string; date?: string }>> = {};

  function scanDirectory(dirPath: string, relativePath: string = '') {
    try {
      const files = readdirSync(dirPath);
      console.log(`📂 Scanning directory: ${dirPath}`);

      files.forEach((file) => {
        const filePath = join(dirPath, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(filePath, join(relativePath, file));
        } else if (file.endsWith('.md')) {
          const content = readFileSync(filePath, 'utf-8');

          // Generate link path (remove .md extension and handle subdirectories)
          const linkPath = relativePath ? join(relativePath, file) : file;
          const link = `/${linkPath.replace('.md', '')}`;

          // Generate display name (capitalize and replace dashes)
          const displayName = file
            .replace('.md', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

          // Simple frontmatter parsing (basic version)
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

          if (frontmatterMatch) {
            console.log(`📄 ${filePath} frontmatter:`, frontmatterMatch[1]);

            // Parse frontmatter to get section, title, and date
            const frontmatter = frontmatterMatch[1];
            const sectionMatch = frontmatter.match(/section:\s*(.+)/);
            const titleMatch = frontmatter.match(/title:\s*(.+)/);
            const dateMatch = frontmatter.match(/date:\s*(.+)/);

            const section = sectionMatch ? sectionMatch[1].trim() : 'Other';
            const title = titleMatch ? titleMatch[1].trim() : displayName;
            const date = dateMatch ? dateMatch[1].trim() : undefined;

            // Add to nav if it's not index.md
            if (file !== 'index.md') {
              navItems.push({ text: title, link, date });
            }

            // Add to section
            if (!sections[section]) {
              sections[section] = [];
            }
            sections[section].push({ text: title, link, date });
          } else {
            console.log(`📄 ${filePath}: No frontmatter found`);

            // Add to nav if it's not index.md
            if (file !== 'index.md') {
              navItems.push({ text: displayName, link });
            }

            // Add to Other section
            if (!sections.Other) {
              sections.Other = [];
            }
            sections.Other.push({ text: displayName, link });
          }
        }
      });
    } catch (error) {
      console.error(`❌ Error scanning directory ${dirPath}:`, error);
    }
  }

  try {
    // Use the same path resolution as VitePress srcDir
    const configDir = import.meta.dirname; // Current config file directory
    const docsPath = join(configDir, '../../../docs'); // Go up 3 levels: .vitepress -> web-docs-client -> tools -> root, then docs
    console.log('📂 Root docs path:', docsPath);

    scanDirectory(docsPath);

    console.log('🧭 Generated nav items:', navItems);
    console.log('📋 Generated sections:', sections);

    return { navItems, sections };
  } catch (error) {
    console.error('❌ Error scanning docs:', error);
    return { navItems: [], sections: {} };
  }
}

// Generate navigation data
const { sections } = generateNavigation();

// Create clean navbar with only top-level sections
const topLevelSections = new Set<string>();
const sectionFirstItems: Record<string, { text: string; link: string }> = {};

// Merge sections for consistent navigation logic
const mergedSectionsForNav: Record<string, any> = {};

Object.entries(sections).forEach(([sectionName, items]) => {
  if (sectionName.includes('/')) {
    const [parentSection] = sectionName.split('/');

    if (!mergedSectionsForNav[parentSection]) {
      mergedSectionsForNav[parentSection] = [];
    }

    // Sort items by date (if available), then alphabetically
    const sortedItems = items.sort((a, b) => {
      if (a.date && b.date) {
        return a.date.localeCompare(b.date); // Sort by date chronologically
      }
      if (a.date && !b.date) return -1; // Items with dates come first
      if (!a.date && b.date) return 1;
      return a.text.localeCompare(b.text); // Fallback to alphabetical
    });

    mergedSectionsForNav[parentSection].push(...sortedItems);
  } else {
    if (!mergedSectionsForNav[sectionName]) {
      mergedSectionsForNav[sectionName] = [];
    }

    // Sort items by date (if available), then alphabetically
    const sortedItems = items.sort((a, b) => {
      if (a.date && b.date) {
        return a.date.localeCompare(b.date); // Sort by date chronologically
      }
      if (a.date && !b.date) return -1; // Items with dates come first
      if (!a.date && b.date) return 1;
      return a.text.localeCompare(b.text); // Fallback to alphabetical
    });

    mergedSectionsForNav[sectionName].push(...sortedItems);
  }
});

// Now determine first items for navigation
Object.entries(mergedSectionsForNav).forEach(([sectionName, allItems]) => {
  topLevelSections.add(sectionName);

  // Sort all items together by date, then alphabetically
  const sortedAllItems = allItems.sort((a, b) => {
    if (a.date && b.date) {
      return a.date.localeCompare(b.date); // Sort by date chronologically
    }
    if (a.date && !b.date) return -1; // Items with dates come first
    if (!a.date && b.date) return 1;
    return a.text.localeCompare(b.text); // Fallback to alphabetical
  });

  if (sortedAllItems.length > 0) {
    sectionFirstItems[sectionName] = sortedAllItems[0];
  }
});

const nav = [
  { text: 'Home', link: '/' },
  ...Array.from(topLevelSections)
    .filter((sectionName) => sectionName !== 'Home') // Exclude Home from navbar
    .sort()
    .map((sectionName) => ({
      text: sectionName,
      link: sectionFirstItems[sectionName]?.link || '#',
    })),
  {
    text: 'LLM Bundle',
    link: llmBundleUrl,
  },
];

// Convert sections to sidebar format with nested structure
const sidebar: Array<{ text: string; items: any[] }> = [];
const _processedSections = new Set<string>();

// First, merge standalone sections with their nested counterparts
const mergedSections: Record<string, any> = {};

Object.entries(sections).forEach(([sectionName, items]) => {
  if (sectionName.includes('/')) {
    const [parentSection, subSection] = sectionName.split('/');

    if (!mergedSections[parentSection]) {
      mergedSections[parentSection] = { standalone: [], nested: {} };
    }

    // Sort items by date (if available), then alphabetically
    const sortedItems = items.sort((a, b) => {
      if (a.date && b.date) {
        return a.date.localeCompare(b.date); // Sort by date chronologically
      }
      if (a.date && !b.date) return -1; // Items with dates come first
      if (!a.date && b.date) return 1;
      return a.text.localeCompare(b.text); // Fallback to alphabetical
    });

    mergedSections[parentSection].nested[subSection] = sortedItems;
  } else {
    if (!mergedSections[sectionName]) {
      mergedSections[sectionName] = { standalone: [], nested: {} };
    }

    // Sort items by date (if available), then alphabetically
    const sortedItems = items.sort((a, b) => {
      if (a.date && b.date) {
        return a.date.localeCompare(b.date); // Sort by date chronologically
      }
      if (a.date && !b.date) return -1; // Items with dates come first
      if (!a.date && b.date) return 1;
      return a.text.localeCompare(b.text); // Fallback to alphabetical
    });

    mergedSections[sectionName].standalone = sortedItems;
  }
});

// Now build the sidebar from merged sections
Object.entries(mergedSections)
  .sort(([a], [b]) => a.localeCompare(b)) // Sort sections alphabetically
  .forEach(([sectionName, { standalone, nested }]) => {
    const _sidebarItems: any[] = [];

    // Collect all items (standalone + nested) and sort by date
    const allItems: any[] = [];

    // Add standalone items
    allItems.push(...standalone);

    // Add nested subsections as items
    Object.entries(nested)
      .sort(([a], [b]) => a.localeCompare(b)) // Sort subsections alphabetically
      .forEach(([subSectionName, subItems]) => {
        allItems.push({
          text: subSectionName,
          items: subItems,
        });
      });

    // Sort all items by date (if available), then alphabetically
    const sortedAllItems = allItems.sort((a, b) => {
      // For nested items, use the first item's date
      const aDate = a.date || a.items?.[0]?.date;
      const bDate = b.date || b.items?.[0]?.date;

      if (aDate && bDate) {
        return aDate.localeCompare(bDate); // Sort by date chronologically
      }
      if (aDate && !bDate) return -1; // Items with dates come first
      if (!aDate && bDate) return 1;
      return a.text.localeCompare(b.text); // Fallback to alphabetical
    });

    sidebar.push({
      text: sectionName,
      items: sortedAllItems,
    });
  });

// Add LLM Bundle to sidebar
sidebar.push({
  text: 'LLM Bundle',
  items: [
    {
      text: 'Kartuli LLM',
      link: llmBundleUrl,
    },
  ],
});

const socialLinks = [{ icon: 'github', link: 'https://github.com/rocescoca/kartuli' }];

const search = {
  provider: 'local' as const,
};

const themeConfig = {
  nav,
  sidebar,
  socialLinks,
  search,
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title,
  description,
  srcDir,
  themeConfig,
});
