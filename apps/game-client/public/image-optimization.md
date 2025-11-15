## Image Optimization

1. Identify the actual render size of the asset in the UI (for example, the mascot shows at ~52 px). Always resize close to that target so we aren’t shipping unnecessary pixels.
2. Use ImageMagick’s `convert` (installed via `imagemagick` package) to downscale from the original high‑resolution PNG:
   - `convert mascot.png -resize 64x64 mascot-64.png`
3. Convert the downsized PNG to WebP (keeps transparency, smaller transfer):
   - `convert mascot-64.png -quality 80 mascot-64.webp`
4. Place both files under `public/` so we keep the source PNG for fallbacks or future exports, while serving the `.webp` by default.

Optional:
- Use a `<picture>` tag or Next’s `<Image>` to serve WebP with PNG fallback when needed.
- When adding service worker caching, include the optimized assets in the precache list for instant offline access.

