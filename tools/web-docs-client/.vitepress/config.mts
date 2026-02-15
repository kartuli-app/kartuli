import { defineConfig } from 'vitepress';
import { processDocs } from '../scripts/docs-processor.js';

const title = 'Kartuli Docs';
const description = 'Kartuli Web Docs Client';
const srcDir = '../../docs/';
const llmBundleUrl = '/kartuli/assets/kartuli-llm.txt';

// Process all documentation using shared utility
const { mergedSections } = processDocs();

type DocItem = {
  text: string;
  link: string;
  date?: string;
  isHub?: boolean;
};

type SidebarItem = {
  text: string;
  link?: string;
  date?: string;
  isHub?: boolean;
  collapsed?: boolean;
  items?: SidebarItem[];
};

type MergedSection = {
  standalone: DocItem[];
  nested: Record<string, DocItem[]>;
};

const mergedSectionsTyped = mergedSections as Record<string, MergedSection>;

function compareDocItems(
  a: { text: string; date?: string; isHub?: boolean },
  b: { text: string; date?: string; isHub?: boolean },
) {
  if (a.isHub && !b.isHub) return -1;
  if (!a.isHub && b.isHub) return 1;
  if (a.date && b.date) return a.date.localeCompare(b.date);
  if (a.date && !b.date) return -1;
  if (!a.date && b.date) return 1;
  return a.text.localeCompare(b.text);
}

const sectionOrder: Record<string, number> = {
  Home: 0,
  Gamarjoba: 1,
  'Start Here': 1,
  'Start here': 1,
  Product: 3,
  Tech: 4,
  Providers: 5,
  Apps: 6,
  Tools: 7,
  Packages: 8,
  Backlog: 9,
  'llms.txt': 10,
};

function compareTopLevelSections(a: string, b: string) {
  const aRank = sectionOrder[a] ?? 50;
  const bRank = sectionOrder[b] ?? 50;
  if (aRank !== bRank) return aRank - bRank;
  return a.localeCompare(b);
}

function addNestedGroup(rootItems: SidebarItem[], path: string, subItems: DocItem[]) {
  const segments = path.split('/').filter(Boolean);
  let currentLevel = rootItems;

  for (const segment of segments) {
    let node = currentLevel.find((item) => item.text === segment && Array.isArray(item.items));
    if (!node) {
      node = { text: segment, collapsed: true, items: [] };
      currentLevel.push(node);
    }
    currentLevel = node.items as SidebarItem[];
  }

  const mappedItems: SidebarItem[] = [...subItems].sort(compareDocItems).map((item) => ({
    text: item.text,
    link: item.link,
    date: item.date,
    isHub: item.isHub,
  }));

  currentLevel.push(...mappedItems);
}

// Create clean navbar with only top-level sections
const topLevelSections = new Set<string>();
const sectionFirstItems: Record<string, { text: string; link: string }> = {};

// Determine first items for navigation
Object.entries(mergedSectionsTyped).forEach(([sectionName, { standalone, nested }]) => {
  topLevelSections.add(sectionName);

  const allItems: DocItem[] = [...standalone];

  Object.values(nested).forEach((subItems: DocItem[]) => {
    allItems.push(...subItems);
  });

  // Ensure deterministic order: hub first, then by date (if available), then text
  allItems.sort(compareDocItems);

  if (allItems.length > 0) {
    sectionFirstItems[sectionName] = allItems[0];
  }
});

const nav = [
  ...Array.from(topLevelSections)
    .filter(
      (sectionName) =>
        sectionName !== 'Home' &&
        sectionName !== 'Start Here' &&
        sectionName !== 'Start here' &&
        sectionName !== 'Gamarjoba',
    )
    .sort(compareTopLevelSections)
    .map((sectionName) => ({
      text: sectionName,
      link: sectionFirstItems[sectionName]?.link || '/',
    })),
  {
    text: 'llms.txt',
    link: llmBundleUrl,
  },
];

// Convert merged sections to sidebar format with nested structure
const sidebar: SidebarItem[] = [];

Object.entries(mergedSectionsTyped)
  .sort(([a], [b]) => compareTopLevelSections(a, b))
  .forEach(([sectionName, { standalone, nested }]) => {
    const allItems: SidebarItem[] = [];

    // Add standalone items
    allItems.push(
      ...[...standalone].sort(compareDocItems).map((item: DocItem) => ({
        text: item.text,
        link: item.link,
        date: item.date,
        isHub: item.isHub,
      })),
    );

    // Add nested subsections as nested groups (supports paths like Development/Documentation)
    Object.entries(nested)
      .sort(([a], [b]) => a.localeCompare(b)) // Sort subsections alphabetically
      .forEach(([subSectionName, subItems]) => {
        addNestedGroup(allItems, subSectionName, subItems as DocItem[]);
      });

    sidebar.push({
      text: sectionName,
      collapsed: true,
      items: allItems,
    });
  });

// Add LLM Bundle as a direct sidebar link (not a section)
sidebar.push({
  text: 'llms.txt',
  link: llmBundleUrl,
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
  outline: [2, 4] as [number, number],
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title,
  description,
  srcDir,
  base: '/kartuli/',
  themeConfig,
});
