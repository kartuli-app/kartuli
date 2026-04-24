import { defineConfig } from 'vitepress';
import { configureDiagramsPlugin } from 'vitepress-plugin-diagrams';
import {
  compareDocItems,
  compareSidebarSiblings,
  getSortedMergedSectionEntries,
  getSortedNestedEntries,
  processDocs,
} from '../scripts/docs-processor.js';

const title = 'Kartuli Docs';
const description = 'Kartuli Web Docs Client';
const srcDir = '../../docs/';
const llmBundleUrl = '/kartuli/assets/kartuli-llm.txt';

const { mergedSections } = processDocs();

type DocItem = {
  text: string;
  link: string;
  isHub?: boolean;
  fileSortOrder?: number;
  folderOrders?: number[];
  sortFolderOrders?: number[];
};

type SidebarItem = {
  text: string;
  link?: string;
  isHub?: boolean;
  collapsed?: boolean;
  items?: SidebarItem[];
};

type MergedSection = {
  standalone: DocItem[];
  nested: Record<string, DocItem[]>;
  sectionOrder: number;
};

const mergedSectionsTyped = mergedSections as Record<string, MergedSection>;

function addNestedGroup(rootItems: SidebarItem[], path: string, subItems: DocItem[]) {
  const segments = path.split('/').filter(Boolean);
  let currentLevel = rootItems;

  for (const segment of segments) {
    let node = currentLevel.find((item) => item.text === segment && Array.isArray(item.items));
    if (!node) {
      node = { text: segment, collapsed: true, items: [] };
      currentLevel.push(node);
    }
    currentLevel = node.items ?? [];
  }

  const mappedItems: SidebarItem[] = [...subItems].sort(compareDocItems).map((item: DocItem) => ({
    text: item.text,
    link: item.link,
    isHub: item.isHub,
  }));

  currentLevel.push(...mappedItems);
}

const sectionFirstItems: Record<string, { text: string; link: string }> = {};

getSortedMergedSectionEntries(mergedSectionsTyped).forEach(([sectionName, merged]) => {
  const { standalone, nested } = merged as MergedSection;
  const allFlat: DocItem[] = [...standalone];
  getSortedNestedEntries(nested).forEach(([, subItems]) => {
    allFlat.push(...subItems);
  });
  allFlat.sort(compareDocItems);
  if (allFlat.length > 0) {
    sectionFirstItems[sectionName] = allFlat[0];
  }
});

const nav = [
  ...getSortedMergedSectionEntries(mergedSectionsTyped).map(([sectionName]) => ({
    text: sectionName,
    link: sectionFirstItems[sectionName]?.link || '/',
  })),
  {
    text: 'llms.txt',
    link: llmBundleUrl,
  },
];

const sidebar: SidebarItem[] = [];

getSortedMergedSectionEntries(mergedSectionsTyped).forEach(([sectionName, merged]) => {
  const { standalone, nested } = merged as MergedSection;
  type Entry = ({ kind: 'doc' } & DocItem) | { kind: 'group'; text: string; items: DocItem[] };

  const entries: Entry[] = [
    ...standalone.map((item) => ({ kind: 'doc' as const, ...item })),
    ...getSortedNestedEntries(nested).map(([name, items]) => ({
      kind: 'group' as const,
      text: name,
      items,
    })),
  ];

  entries.sort((a, b) =>
    compareSidebarSiblings(
      a.kind === 'doc'
        ? {
            text: a.text,
            link: a.link,
            isHub: a.isHub,
            fileSortOrder: a.fileSortOrder,
            folderOrders: a.folderOrders,
            sortFolderOrders: a.sortFolderOrders,
          }
        : { text: a.text, items: a.items },
      b.kind === 'doc'
        ? {
            text: b.text,
            link: b.link,
            isHub: b.isHub,
            fileSortOrder: b.fileSortOrder,
            folderOrders: b.folderOrders,
            sortFolderOrders: b.sortFolderOrders,
          }
        : { text: b.text, items: b.items },
    ),
  );

  const allItems: SidebarItem[] = [];
  for (const e of entries) {
    if (e.kind === 'doc') {
      allItems.push({
        text: e.text,
        link: e.link,
        isHub: e.isHub,
      });
    } else {
      addNestedGroup(allItems, e.text, e.items);
    }
  }

  sidebar.push({
    text: sectionName,
    collapsed: true,
    items: allItems,
  });
});

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

const ignoreDeadLinksList = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4173',
  'http://localhost:6006',
];

export default defineConfig({
  title,
  description,
  srcDir,
  base: '/kartuli/',
  ignoreDeadLinks: ignoreDeadLinksList,
  vite: {
    publicDir: '../tools/web-docs-client/public',
  },
  themeConfig,
  markdown: {
    config: (md) => {
      configureDiagramsPlugin(md, {
        diagramsDir: 'public/diagrams',
        publicPath: '/kartuli/diagrams',
      });
    },
  },
});
