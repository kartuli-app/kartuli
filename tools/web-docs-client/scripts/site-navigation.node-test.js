import assert from 'node:assert/strict';
import test from 'node:test';
import { processDocs } from './docs-processor.js';
import { buildSiteNavigation } from './site-navigation.js';

const compareLinks = (a, b) => a.localeCompare(b);

test('a hub-only section is a direct link without an Index child or dropdown', () => {
  const { sectionLinks, sidebar } = buildSiteNavigation([
    { text: 'Packages', link: '/02-packages/', isHub: true },
  ]);
  assert.deepEqual(sectionLinks, [{ text: 'Packages', link: '/02-packages/' }]);
  assert.deepEqual(sidebar, [{ text: 'Packages', link: '/02-packages/' }]);
});

test('nested hubs retain their destination while children remain independently reachable', () => {
  const { sidebar } = buildSiteNavigation([
    { text: 'Apps', link: '/01-apps/', isHub: true },
    { text: 'Game Client', link: '/01-apps/01-game-client/', isHub: true },
    { text: 'Routes', link: '/01-apps/01-game-client/02-routes', isHub: false },
  ]);
  const app = sidebar[0];
  assert.equal(app.link, '/01-apps/');
  assert.equal(app.items[0].link, '/01-apps/01-game-client/');
  assert.equal(app.items[0].items[0].text, 'Routes');
  assert.equal(app.items[0].items.length, 1);
});

test('Testing has one clickable overview containing all four guides at their existing URLs', () => {
  const docs = Object.values(processDocs().sections).flat();
  const { sidebar } = buildSiteNavigation(docs);
  const quality = sidebar.find((item) => item.link === '/06-quality/');
  const testing = quality.items.filter((item) => item.text === 'Testing');
  assert.equal(testing.length, 1);
  assert.equal(testing[0].link, '/06-quality/01-testing');
  assert.equal(testing[0].items.length, 4);
  assert.ok(testing[0].items.every((item) => item.link.startsWith('/06-quality/04-testing/')));
});

test('every published page has exactly one sidebar destination with no Index labels', () => {
  const docs = Object.values(processDocs().sections).flat();
  const navigation = buildSiteNavigation(docs);
  const links = [];
  function visit(item) {
    assert.notEqual(item.text, 'Index');
    if (item.link) links.push(item.link);
    for (const child of item.items ?? []) visit(child);
  }
  assert.ok(Array.isArray(navigation.sidebar), 'Use a global sidebar, including the root page');
  assert.equal(navigation.sidebar.length, 12);
  assert.deepEqual(
    navigation.sidebar.map(({ text, link }) => ({ text, link })),
    navigation.sectionLinks,
  );
  navigation.sidebar.forEach(visit);
  assert.equal(navigation.sectionLinks.length, 12);
  assert.deepEqual(
    links.toSorted(compareLinks),
    docs.map((doc) => doc.link).toSorted(compareLinks),
  );
});
