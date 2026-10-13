import { E2eConfigError } from './errors.ts';
import { E2E_IDENTITY_FILE } from './targets.ts';

export function parseHttpUrl(value: string): URL {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new E2eConfigError('The --url value is empty. Pass an absolute http(s) URL.');
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new E2eConfigError(
      `Invalid --url "${value}". Pass an absolute http(s) URL, for example http://localhost:3000.`,
    );
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new E2eConfigError(`Invalid --url "${value}". Only http and https URLs are supported.`);
  }
  if (!url.hostname) {
    throw new E2eConfigError(`Invalid --url "${value}". The URL needs a host.`);
  }
  return url;
}

function withoutTrailingSlashes(pathname: string): string {
  let end = pathname.length;
  while (end > 1 && pathname.charAt(end - 1) === '/') {
    end -= 1;
  }
  return pathname.slice(0, end);
}

/** Canonical Playwright baseURL. Origin-only URLs stay without a trailing slash. */
export function normalizeBaseUrl(value: string): string {
  const url = parseHttpUrl(value);
  url.hash = '';
  if (url.pathname.length > 1) {
    url.pathname = withoutTrailingSlashes(url.pathname);
  }
  if (url.pathname === '/' && url.search === '') {
    return url.origin;
  }
  return url.toString();
}

export function identityUrlForBase(baseUrl: string): string {
  const url = new URL(normalizeBaseUrl(baseUrl));
  const directory = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
  url.pathname = `${directory}${E2E_IDENTITY_FILE}`;
  url.search = '';
  url.hash = '';
  return url.toString();
}
