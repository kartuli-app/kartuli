import { appendFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function shortWorkspaceName(packageName) {
  const parts = packageName.split('/');
  return parts.length >= 2 ? parts[1] : packageName;
}

function uniqueSorted(names) {
  return [...new Set(names)].sort((a, b) => a.localeCompare(b));
}

function readStdin() {
  return readFileSync(0, 'utf8').trim();
}

function parseArgs(argv) {
  let configPath = join(__dirname, 'workflow-targets.json');
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--config' && argv[i + 1]) {
      configPath = argv[i + 1];
      i++;
    }
  }
  return { configPath };
}

function requireWorkflowTargetsBucket(config, configPath, key) {
  if (!Object.hasOwn(config, key)) {
    throw new Error(
      `map-affected-to-workflows: ${configPath}: missing required key "${key}" (must be an array of package names)`,
    );
  }
  const value = config[key];
  if (!Array.isArray(value)) {
    throw new TypeError(
      `map-affected-to-workflows: ${configPath}: "${key}" must be an array, got ${typeof value}`,
    );
  }
  return value;
}

function targetsForBucket(affectedSet, packageNames) {
  const shortNames = packageNames
    .filter((name) => affectedSet.has(name))
    .map((name) => shortWorkspaceName(name));
  return uniqueSorted(shortNames);
}

function bulletList(items) {
  if (items.length === 0) {
    return '_None_\n';
  }
  const lines = items.map((p) => `- \`${p}\``);
  return `${lines.join('\n')}\n`;
}

function writeGithubArtifacts(out) {
  const ghOutput = process.env.GITHUB_OUTPUT;
  if (ghOutput) {
    const lines = [
      `packages=${JSON.stringify(out.affected)}`,
      `nextjs_targets=${JSON.stringify(out.nextjs_targets)}`,
      `nextjs_matrix=${JSON.stringify(out.nextjs_matrix)}`,
      `web_docs_targets=${JSON.stringify(out.web_docs_targets)}`,
      `storybook_targets=${JSON.stringify(out.storybook_targets)}`,
    ];
    appendFileSync(ghOutput, `${lines.join('\n')}\n`, 'utf8');
  }

  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) {
    return;
  }

  let md = '## Affected packages (build)\n\n';
  if (out.affected.length === 0) {
    md += 'No packages would run `build` for this change.\n\n';
  } else {
    md += 'Packages that would run `build`:\n\n';
    md += bulletList(out.affected);
    md += '\n';
  }

  md += '### Workflow targets\n\n';
  md += '**Next.js:**\n\n';
  md += bulletList(out.nextjs_targets);
  md += '\n**Web docs:**\n\n';
  md += bulletList(out.web_docs_targets);
  md += '\n**Storybook:**\n\n';
  md += bulletList(out.storybook_targets);

  if (out.unmapped.length > 0) {
    md += '\n### Affected but not mapped to a workflow bucket\n\n';
    md += bulletList(out.unmapped);
  }

  md += '\n*Mapped with `workflow-targets.json`.*\n';
  appendFileSync(summaryPath, md, 'utf8');
}

try {
  const { configPath } = parseArgs(process.argv);
  const raw = readStdin();
  if (!raw) {
    process.stderr.write('map-affected-to-workflows: expected JSON array on stdin\n');
    process.exit(1);
  }

  const affected = JSON.parse(raw);
  if (!Array.isArray(affected)) {
    process.stderr.write('map-affected-to-workflows: stdin must be a JSON array\n');
    process.exit(1);
  }

  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  if (config === null || typeof config !== 'object' || Array.isArray(config)) {
    throw new Error(
      `map-affected-to-workflows: ${configPath}: root value must be a JSON object with nextjs, webDocs, and storybook arrays`,
    );
  }
  const nextjsPkgs = requireWorkflowTargetsBucket(config, configPath, 'nextjs');
  const webDocsPkgs = requireWorkflowTargetsBucket(config, configPath, 'webDocs');
  const storybookPkgs = requireWorkflowTargetsBucket(config, configPath, 'storybook');

  const nextjsShortNamesAll = uniqueSorted(nextjsPkgs.map((name) => shortWorkspaceName(name)));
  if (!Object.hasOwn(config, 'nextjsPaths')) {
    throw new Error(
      `map-affected-to-workflows: ${configPath}: missing required key "nextjsPaths" (object: short name -> path like /en or /)`,
    );
  }
  const nextjsPaths = config.nextjsPaths;
  if (nextjsPaths === null || typeof nextjsPaths !== 'object' || Array.isArray(nextjsPaths)) {
    throw new TypeError(
      `map-affected-to-workflows: ${configPath}: "nextjsPaths" must be a plain object`,
    );
  }
  for (const name of nextjsShortNamesAll) {
    if (!Object.hasOwn(nextjsPaths, name)) {
      throw new Error(
        `map-affected-to-workflows: ${configPath}: nextjsPaths missing key "${name}"`,
      );
    }
    const p = nextjsPaths[name];
    if (typeof p !== 'string' || !p.startsWith('/')) {
      throw new Error(
        `map-affected-to-workflows: ${configPath}: nextjsPaths["${name}"] must be a string starting with /`,
      );
    }
  }

  const configured = new Set([...nextjsPkgs, ...webDocsPkgs, ...storybookPkgs]);
  const affectedSet = new Set(affected);
  const unmapped = uniqueSorted([...affectedSet].filter((p) => !configured.has(p)));

  const nextjs_targets = targetsForBucket(affectedSet, nextjsPkgs);
  /** @type {{ target: string; deploy_target: string; lighthouse_path: string }[]} */
  const nextjs_matrix = [];
  for (const target of nextjs_targets) {
    const lighthouse_path = nextjsPaths[target];
    for (const deploy_target of ['local', 'vercel']) {
      nextjs_matrix.push({ target, deploy_target, lighthouse_path });
    }
  }

  const out = {
    affected: uniqueSorted([...affected]),
    nextjs_targets,
    nextjs_matrix,
    web_docs_targets: targetsForBucket(affectedSet, webDocsPkgs),
    storybook_targets: targetsForBucket(affectedSet, storybookPkgs),
    unmapped,
  };

  writeGithubArtifacts(out);
  process.stdout.write(`${JSON.stringify(out)}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
