function toItem(node) {
  if (node.doc) return { text: node.doc.text, link: node.doc.link };
  const items = [...node.children.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, child]) => toItem(child));
  const text = node.hub?.text ?? node.text.replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    text,
    ...(node.hub ? { link: node.hub.link } : {}),
    ...(items.length ? { collapsed: true, items } : {}),
  };
}

/** Build a shared sidebar for the home page and every section; folder hubs become clickable group headings. */
export function buildSiteNavigation(documents) {
  const root = { children: new Map() };
  for (const doc of documents) {
    const segments = doc.link.split('/').filter(Boolean);
    const folders = doc.isHub ? segments : segments.slice(0, -1);
    let parent = root;
    for (const segment of folders) {
      if (!parent.children.has(segment)) {
        parent.children.set(segment, {
          text: segment.replace(/^\d{2}-/, '').replaceAll('-', ' '),
          children: new Map(),
        });
      }
      parent = parent.children.get(segment);
    }
    if (doc.isHub) {
      parent.hub = doc;
    } else {
      parent.children.set(segments.at(-1), { doc, children: new Map() });
    }
  }

  const sections = [...root.children.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([segment, node]) => ({ segment, item: toItem(node) }));
  return {
    sectionLinks: sections.map(({ item }) => ({ text: item.text, link: item.link })),
    sidebar: sections.map(({ item }) => item),
  };
}
