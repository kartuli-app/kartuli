// /[language]/[...catchAll]/page.tsx catches all not found pages
// this page will be shown when the page is not found

import { NotFoundPageClient } from './not-found-page-client';

export function NotFoundPage() {
  return (
    <div>
      <h2>Not Found Page</h2>
      <NotFoundPageClient />
    </div>
  );
}
