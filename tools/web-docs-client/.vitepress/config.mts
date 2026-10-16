import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withMermaid } from '@aether-labs/vitepress-mermaid';
import { defineConfig } from 'vitepress';
import { processDocs } from '../scripts/docs-processor.js';
import { buildSiteNavigation } from '../scripts/site-navigation.js';

const title = 'Kartuli Docs';
const description = 'Kartuli Web Docs Client';
const srcDir = '../../docs/';
const llmBundleUrl = '/kartuli/assets/kartuli-llm.txt';
const webDocsNodeModules = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../node_modules',
);

const { sections } = processDocs();
const { sectionLinks, sidebar } = buildSiteNavigation(Object.values(sections).flat());
const nav = [
  ...sectionLinks,
  // Open the text asset as a document, not through the client-side page router.
  { text: 'kartuli-llm.txt', link: llmBundleUrl, target: '_blank', rel: 'noopener' },
];

const socialLinks = [{ icon: 'github', link: 'https://github.com/kartuli-app/kartuli' }];

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

export default withMermaid(
  defineConfig({
    title,
    description,
    srcDir,
    base: '/kartuli/',
    ignoreDeadLinks: ignoreDeadLinksList,
    vite: {
      optimizeDeps: {
        include: ['mermaid'],
      },
      resolve: {
        alias: {
          mermaid: path.resolve(webDocsNodeModules, 'mermaid/dist/mermaid.esm.mjs'),
        },
      },
      publicDir: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public'),
    },
    themeConfig,
  }),
  {
    runtime: {
      securityLevel: 'strict',
    },
  },
);
