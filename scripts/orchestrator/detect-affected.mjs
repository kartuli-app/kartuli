import { spawnSync } from 'node:child_process';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  return result;
}

function packagesFromTurboJson(turboJson) {
  const tasks = Array.isArray(turboJson?.tasks) ? turboJson.tasks : [];
  return [
    ...new Set(
      tasks
        // Turbo includes graph-only nodes for missing scripts; they should not
        // be reported as affected packages.
        .filter((task) => task?.package && task?.command !== '<NONEXISTENT>')
        .map((task) => task.package),
    ),
  ].sort((a, b) => a.localeCompare(b));
}

function parseMode() {
  const pr = process.argv.includes('--pr');
  const prod = process.argv.includes('--prod');
  if (pr === prod) {
    process.stderr.write('Usage: node detect-affected.mjs (--pr | --prod)\n');
    process.exit(1);
  }
  return pr ? 'pr' : 'prod';
}

function resolveTurboScmBase(mode) {
  if (mode === 'pr') {
    const fetchResult = run('git', ['fetch', 'origin', 'main'], {
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    if (fetchResult.status !== 0) {
      if (fetchResult.stderr) {
        process.stderr.write(fetchResult.stderr);
      } else {
        process.stderr.write(
          'git fetch origin main failed; cannot refresh origin/main for affected detection.\n',
        );
      }
      process.exit(fetchResult.status ?? 1);
    }
    return 'origin/main';
  }

  const baseRevisionResult = run('git', ['rev-parse', 'HEAD^']);
  if (baseRevisionResult.status !== 0) {
    if (baseRevisionResult.stderr) {
      process.stderr.write(baseRevisionResult.stderr);
    }
    process.exit(baseRevisionResult.status ?? 1);
  }

  const baseRevision = (baseRevisionResult.stdout || '').trim();
  if (!baseRevision) {
    process.stderr.write('Unable to resolve base revision from HEAD^.\n');
    process.exit(1);
  }

  return baseRevision;
}

try {
  const mode = parseMode();
  const turboScmBase = resolveTurboScmBase(mode);

  const turbo = run('pnpm', ['exec', 'turbo', 'run', 'build', '--dry=json', '--affected'], {
    env: { ...process.env, TURBO_SCM_BASE: turboScmBase },
  });

  if (turbo.status !== 0) {
    if (turbo.stderr) {
      process.stderr.write(turbo.stderr);
    }
    process.exit(turbo.status ?? 1);
  }

  const turboJson = JSON.parse(turbo.stdout || '{}');
  const packages = packagesFromTurboJson(turboJson);
  process.stdout.write(`${JSON.stringify(packages)}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
