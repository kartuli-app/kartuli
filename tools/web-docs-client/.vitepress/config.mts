import { defineConfig } from 'vitepress';
import { processDocs } from '../scripts/docs-processor.js';

const title = 'Kartuli Docs';
const description = 'Kartuli Web Docs Client';
const srcDir = '../../docs/';
const llmBundleUrl = '/kartuli/assets/kartuli-llm.txt';

// Process all documentation using shared utility
const { mergedSections } = processDocs();

// Create clean navbar with only top-level sections
const topLevelSections = new Set<string>();
const sectionFirstItems: Record<string, { text: string; link: string }> = {};

// Determine first items for navigation
Object.entries(mergedSections).forEach(([sectionName, { standalone, nested }]) => {
  topLevelSections.add(sectionName);

  // Collect all items and find the first one
  const allItems = [...standalone];
  
  Object.values(nested).forEach((subItems: Array<{ text: string; link: string; date?: string }>) => {
    allItems.push(...subItems);
  });

  if (allItems.length > 0) {
    sectionFirstItems[sectionName] = allItems[0];
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

// Convert merged sections to sidebar format with nested structure
const sidebar: Array<{ text: string; items: Array<{ text: string; link: string; date?: string; items?: Array<{ text: string; link: string; date?: string }> }> }> = [];

Object.entries(mergedSections)
  .sort(([a], [b]) => a.localeCompare(b)) // Sort sections alphabetically
  .forEach(([sectionName, { standalone, nested }]) => {
    // Collect all items (standalone + nested) and sort by date
    const allItems: Array<{ text: string; link: string; date?: string; items?: Array<{ text: string; link: string; date?: string }> }> = [];

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
  base: '/kartuli/',
  themeConfig,
  vite: {
    build: {
      rollupOptions: {
        // VitePress v2 handles Vue dependencies internally
      },
    },
  },
});