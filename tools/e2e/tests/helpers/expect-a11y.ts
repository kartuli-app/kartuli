import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

/**
 * The axe tag set we enforce on every scan.
 *
 * Engineering target: WCAG 2.0–2.2 AA-style rules via axe’s `wcag2*`,
 * `wcag21*`, and `wcag22*` tags (plus `best-practice`). Legal conformance
 * depends on jurisdiction and the applicable standard (for example ADA Title II,
 * Section 508, and the European Accessibility Act each reference specific WCAG
 * versions/levels — they are not identical to “axe’s wcag22 tags”).
 * AAA is NOT a recommended blanket target (even W3C advises against it, since some AAA
 * criteria can't be met on all content) but individual AAA rules can be
 * opted into per-scan via `includeTags`.
 *
 * Included:
 * - `wcag2a` / `wcag2aa`:   WCAG 2.0 levels A & AA (color contrast 4.5:1 lives here)
 * - `wcag21a` / `wcag21aa`: WCAG 2.1 additions (pointer gestures, orientation, reflow)
 * - `wcag22a` / `wcag22aa`: WCAG 2.2 additions (focus appearance, target size 24×24, dragging)
 * - `best-practice`:        axe's opinionated-but-useful rules not tied to WCAG:
 *                           `region`, `landmark-one-main`, `page-has-heading-one`,
 *                           `heading-order`, `aria-dialog-name`, etc. We already
 *                           pass all of these on the home page, and they catch
 *                           real UX regressions.
 *
 * Deliberately NOT included:
 * - `wcag2aaa` / `wcag21aaa` / `wcag22aaa`: AAA — too restrictive (e.g. 7:1 contrast,
 *   no interaction animations, reading level constraints). Opt in per-scan if needed.
 * - `experimental`: unstable, not ready for CI.
 * - `section508`:   subset of WCAG 2.0 AA, redundant with our other tags.
 * - `ACT`:          W3C conformance rules, mostly overlap with the wcag tags.
 */
const DEFAULT_TAGS = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22a',
  'wcag22aa',
  'best-practice',
];

/**
 * Selectors for DOM elements we cannot own or fix, and that axe flags as false positives.
 * Kept as narrow as possible so we don't silently hide real issues in our own code.
 *
 * - `[data-base-ui-focus-guard]`: Base UI's internal focus-trap sentinel spans
 *   (`tabindex=0 aria-hidden=true`). This is the classic focus-trap pattern used
 *   by `focus-trap`, `react-focus-lock`, Headless UI, MUI, older Radix, and
 *   floating-ui-react (which Base UI builds on). Axe rule `aria-hidden-focus` flags
 *   these correctly per the ARIA spec, but they are 1×1 px trampolines that
 *   receive focus for microseconds before redirecting. There is no Base UI prop
 *   to opt out; see node_modules/@base-ui/react/esm/utils/FocusGuard.js. Radix
 *   migrated away from this pattern toward the HTML `inert` attribute in 2024;
 *   Base UI has not (yet).
 */
const DEFAULT_EXCLUDE = ['[data-base-ui-focus-guard]'];

export interface ExpectA11yOptions {
  /**
   * Extra axe tags to include beyond the default WCAG-style + best-practice tag set.
   * Use this to opt into AAA rules for specific scans, e.g.
   *   `includeTags: ['wcag22aaa']` for enhanced contrast on marketing content.
   */
  includeTags?: string[];
  /** Rule IDs to disable for this scan (e.g. known false positives from third-party components). */
  disableRules?: string[];
  /** CSS selectors to exclude from the scan (e.g. a third-party widget root). */
  exclude?: string[];
  /**
   * Optional label used in the failure message to identify which scan failed.
   * Useful when a single test scans multiple states (e.g. "drawer open").
   */
  label?: string;
}

/**
 * Run axe-core against the current DOM and fail the test if any violations are found.
 * For each violation we log its rule id, impact, help text, help URL, and the first
 * failing node’s target selector. Raw node HTML is omitted in CI by default (logs are
 * retained broadly; HTML can contain user or account data). Set `DEBUG_AXE_HTML=1`
 * to include HTML locally or in CI when debugging. Additional failing nodes for the
 * same rule are summarised as a count when axe finds many duplicates.
 */
export async function expectA11y(page: Page, options: ExpectA11yOptions = {}): Promise<void> {
  const { includeTags = [], disableRules = [], exclude = [], label } = options;
  const isCi = process.env.CI === 'true' || process.env.CI === '1';
  const includeNodeHtml = process.env.DEBUG_AXE_HTML === '1' || !isCi;

  let builder = new AxeBuilder({ page }).withTags([...DEFAULT_TAGS, ...includeTags]);

  if (disableRules.length > 0) {
    builder = builder.disableRules(disableRules);
  }

  for (const selector of [...DEFAULT_EXCLUDE, ...exclude]) {
    builder = builder.exclude(selector);
  }

  const { violations } = await builder.analyze();

  const header = label ? `a11y violations at "${label}"` : 'a11y violations';

  if (violations.length > 0) {
    const summary = violations
      .map((v) => {
        const [firstNode] = v.nodes;
        let nodeSummary: string;
        if (firstNode) {
          const htmlLine = includeNodeHtml
            ? `      ${firstNode.html}`
            : '      (html omitted in CI; set DEBUG_AXE_HTML=1 to log node HTML)';
          nodeSummary = `    - ${firstNode.target.join(' ')}\n${htmlLine}`;
        } else {
          nodeSummary = '    (no node reported)';
        }
        const extraNodes =
          v.nodes.length > 1 ? `\n    …and ${v.nodes.length - 1} more node(s)` : '';
        return `  • [${v.impact ?? 'n/a'}] ${v.id}: ${v.help}\n${nodeSummary}${extraNodes}\n    ${v.helpUrl}`;
      })
      .join('\n');
    console.error(`\n${header} (${violations.length}):\n${summary}\n`);
  }

  const violationIds = violations.map((v) => v.id).sort();
  expect(violationIds, header).toEqual([]);
}
