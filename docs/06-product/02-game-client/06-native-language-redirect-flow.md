### Native Language Redirect Flow
- Root path `/` permanently redirects to `/en/ka` (landing) via static Next.js redirect handled at the CDN/edge; no runtime cost
- When a student changes the native language, the selected language is stored on the device
- Info pages:
  - When a student visits a page with a different native language than the selected one, show a small non-intrusive banner that suggests visiting the selected language version of the current page
  - Students can dismiss the banner
- App pages:
  - When a student visits an app page with a different native language than the selected one, show a redirect modal that informs about the redirection to the selected language and performs the redirect after three seconds
  - Students can cancel the suggested redirect to keep the current native language
