import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const pdfFileName = 'kartuli-alphabet-poster.pdf';
const chromeCandidates = ['/usr/bin/google-chrome', 'google-chrome', 'chrome'];

export const runtime = 'nodejs';

async function renderPdf(printableUrl: string, outputPath: string) {
  const chromeArgs = [
    '--headless=new',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--no-pdf-header-footer',
    '--print-to-pdf-no-header',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=15000',
    '--window-size=1600,1067',
    `--print-to-pdf=${outputPath}`,
    printableUrl,
  ];

  let lastError: unknown = null;

  for (const command of chromeCandidates) {
    try {
      await execFileAsync(command, chromeArgs, {
        timeout: 120_000,
        maxBuffer: 10 * 1024 * 1024,
      });
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error('Chrome executable not available.');
}

export async function GET(request: Request) {
  const tempDirectory = await mkdtemp(path.join(tmpdir(), 'kartuli-poster-'));
  const pdfPath = path.join(tempDirectory, pdfFileName);
  const printableUrl = new URL('/poster?print=1', request.url);

  try {
    await renderPdf(printableUrl.toString(), pdfPath);

    const pdfBuffer = await readFile(pdfPath);
    return new Response(pdfBuffer, {
      headers: {
        'cache-control': 'no-store',
        'content-disposition': `attachment; filename="${pdfFileName}"`,
        'content-type': 'application/pdf',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Chrome failed to generate the poster PDF.';

    return Response.json(
      {
        error: message,
      },
      { status: 500 },
    );
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
  }
}
