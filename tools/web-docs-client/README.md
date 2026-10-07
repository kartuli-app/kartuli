# @kartuli/web-docs-client

The canonical [Web Docs operating guide](../../docs/03-tools/03-web-docs-client.md) covers dev/build/preview, the local LLM index, navigation, checks and troubleshooting.

From the repository root:

```bash
pnpm run c:dev:web-docs-client
pnpm run c:preview:web-docs-client
```

Dev generates the index before starting. Preview builds before serving; it does not start if the build fails. At the usual preview port, the index is `http://localhost:4173/kartuli/assets/kartuli-llm.txt`. Its page entries use canonical published URLs.

Restart dev after adding/renaming pages or changing H1 navigation labels. Rerun `pnpm --filter @kartuli/web-docs-client run generate-llm-bundle` after content edits to refresh the text index. See the canonical guide for validation and the existing Kroki dependency.
