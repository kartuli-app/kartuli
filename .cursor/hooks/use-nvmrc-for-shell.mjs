import fs from "node:fs";

try {
  const raw = fs.readFileSync(0, "utf8");
  if (!raw.trim()) {
    process.stdout.write('{"permission":"allow"}\n');
    process.exit(0);
  }

  const payload = JSON.parse(raw);
  if (payload?.tool_name !== "Shell") {
    process.stdout.write('{"permission":"allow"}\n');
    process.exit(0);
  }

  const toolInput = payload.tool_input ?? {};
  const command = toolInput.command;
  if (typeof command !== "string" || !command.trim()) {
    process.stdout.write('{"permission":"allow"}\n');
    process.exit(0);
  }

  if (command.includes("__cursor_nvmrc_wrapper__")) {
    process.stdout.write('{"permission":"allow"}\n');
    process.exit(0);
  }

  const shell = process.env.SHELL ?? "";
  const isPosixLikeShell =
    process.platform !== "win32" &&
    ((/(ba|z|da|k)?sh$/).test(shell) || shell.includes("/sh"));

  if (!isPosixLikeShell) {
    process.stdout.write('{"permission":"allow"}\n');
    process.exit(0);
  }

  const prefix =
    'export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"; ' +
    'if [ -s "$NVM_DIR/nvm.sh" ]; then ' +
    '. "$NVM_DIR/nvm.sh"; ' +
    "nvm use --silent >/dev/null 2>&1 || true; " +
    "fi; " +
    "export __cursor_nvmrc_wrapper__=1";

  const response = {
    permission: "allow",
    updated_input: {
      ...toolInput,
      command: `${prefix}; ${command}`,
    },
  };
  process.stdout.write(`${JSON.stringify(response)}\n`);
} catch {
  process.stdout.write('{"permission":"allow"}\n');
}
