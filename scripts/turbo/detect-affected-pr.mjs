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

function printAffectedPackages(turboJson) {
  const tasks = Array.isArray(turboJson?.tasks) ? turboJson.tasks : [];
  const packages = [...new Set(tasks.map((task) => task?.package).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );
  if (packages.length > 0) {
    process.stdout.write(`${packages.join("\n")}\n`);
  }
}

try {
  // Best effort fetch of main for PR comparisons. Continue even if it fails.
  run("git", ["fetch", "origin", "main"], { stdio: "ignore" });

  const turbo = run(
    "pnpm",
    ["exec", "turbo", "run", "build", "--dry=json", "--affected"],
    {
      env: { ...process.env, TURBO_SCM_BASE: "origin/main" },
    },
  );

  if (turbo.status !== 0) {
    if (turbo.stderr) {
      process.stderr.write(turbo.stderr);
    }
    process.exit(turbo.status ?? 1);
  }

  const turboJson = JSON.parse(turbo.stdout || "{}");
  printAffectedPackages(turboJson);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
