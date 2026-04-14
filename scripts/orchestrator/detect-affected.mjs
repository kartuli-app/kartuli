import { spawnSync } from "node:child_process";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  return result;
}

function packagesFromTurboJson(turboJson) {
  const tasks = Array.isArray(turboJson?.tasks) ? turboJson.tasks : [];
  return [...new Set(tasks.map((task) => task?.package).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );
}

function parseMode() {
  const pr = process.argv.includes("--pr");
  const prod = process.argv.includes("--prod");
  if (pr === prod) {
    process.stderr.write("Usage: node detect-affected.mjs (--pr | --prod)\n");
    process.exit(1);
  }
  return pr ? "pr" : "prod";
}

function resolveTurboScmBase(mode) {
  if (mode === "pr") {
    run("git", ["fetch", "origin", "main"], { stdio: "ignore" });
    return "origin/main";
  }

  const baseRevisionResult = run("git", ["rev-parse", "HEAD^"]);
  if (baseRevisionResult.status !== 0) {
    if (baseRevisionResult.stderr) {
      process.stderr.write(baseRevisionResult.stderr);
    }
    process.exit(baseRevisionResult.status ?? 1);
  }

  const baseRevision = (baseRevisionResult.stdout || "").trim();
  if (!baseRevision) {
    process.stderr.write("Unable to resolve base revision from HEAD^.\n");
    process.exit(1);
  }

  return baseRevision;
}

try {
  const mode = parseMode();
  const turboScmBase = resolveTurboScmBase(mode);

  const turbo = run(
    "pnpm",
    ["exec", "turbo", "run", "build", "--dry=json", "--affected"],
    {
      env: { ...process.env, TURBO_SCM_BASE: turboScmBase },
    },
  );

  if (turbo.status !== 0) {
    if (turbo.stderr) {
      process.stderr.write(turbo.stderr);
    }
    process.exit(turbo.status ?? 1);
  }

  const turboJson = JSON.parse(turbo.stdout || "{}");
  const packages = packagesFromTurboJson(turboJson);
  process.stdout.write(`${JSON.stringify(packages)}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
