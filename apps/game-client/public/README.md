# SEO Assets Guide

This directory contains all the necessary assets for optimal SEO performance and social media sharing.

## Required Images

### 1. Open Graph Image (`/og-image.png`)
- **Size**: 1200x630 pixels
- **Format**: PNG
- **Purpose**: Facebook, LinkedIn, and other social media platforms
- **Content**: Should include your logo, app name, and a compelling visual
- **Text**: Keep text minimal and readable at small sizes

### 2. Twitter Image (`/twitter-image.png`)
- **Size**: 1200x630 pixels (same as OG image, or 1200x600 for Twitter-specific)
- **Format**: PNG
- **Purpose**: Twitter Cards
- **Content**: Similar to OG image but optimized for Twitter's display

### 3. Favicon Set
You need to create multiple favicon sizes from your main logo:

#### Required Files:
- `/favicon.ico` - 16x16, 32x32, 48x48 (multi-size ICO file)
- `/favicon-16x16.png` - 16x16 pixels
- `/favicon-32x32.png` - 32x32 pixels
- `/apple-touch-icon.png` - 180x180 pixels (for iOS)
- `/safari-pinned-tab.svg` - Monochrome SVG for Safari pinned tabs

### 4. Additional Assets (Optional but Recommended)
- `/browserconfig.xml` - For Windows tile configuration
- `/manifest.json` - For PWA support (future implementation)

## How to Generate These Assets

### Option 1: Online Tools
1. **Favicon Generator**: Use [favicon.io](https://favicon.io/) or [realfavicongenerator.net](https://realfavicongenerator.net/)
2. **OG Image Generator**: Use [og-image.vercel.app](https://og-image.vercel.app/) or similar tools
3. **Social Media Image Creator**: Canva, Figma, or Adobe Express

### Option 2: Design Tools
1. **Figma/Sketch**: Create templates for consistent branding
2. **Adobe Creative Suite**: Professional design tools
3. **Canva**: User-friendly online design platform

### Option 3: Automated Generation
Consider using Next.js's built-in image generation:
- `opengraph-image.tsx` - Dynamic OG image generation
- `twitter-image.tsx` - Dynamic Twitter image generation
- `icon.tsx` - Dynamic favicon generation

## File Structure
```
apps/game-client/public/
├── og-image.png              # 1200x630 - Social media sharing
├── twitter-image.png         # 1200x630 - Twitter cards
├── favicon.ico               # Multi-size favicon
├── favicon-16x16.png         # 16x16 favicon
├── favicon-32x32.png         # 32x32 favicon
├── apple-touch-icon.png      # 180x180 - iOS home screen
├── safari-pinned-tab.svg     # Monochrome SVG for Safari
├── browserconfig.xml         # Windows tile configuration
└── manifest.json             # PWA manifest (future)
```

## Design Guidelines

### Colors
- Use your brand colors consistently
- Ensure good contrast for accessibility
- Consider both light and dark mode appearances

### Typography
- Use readable fonts at small sizes
- Keep text minimal on social images
- Ensure text is legible when image is scaled down

### Branding
- Include your logo prominently
- Maintain consistent visual identity
- Use high-quality graphics

## Testing Your Assets

### 1. Social Media Debuggers
- **Facebook**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 2. Favicon Testing
- **Favicon Checker**: [realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker)
- **Browser Testing**: Test in Chrome, Firefox, Safari, Edge

### 3. SEO Tools
- **Google Rich Results Test**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- **Lighthouse**: Run Lighthouse audits for SEO scoring

## Current Status

✅ **Implemented**: Basic favicon (icon.svg)  
❌ **Missing**: All other SEO assets listed above  
📋 **Next Steps**: Generate and add the missing assets

## Notes

- All paths in this guide are relative to the `public/` directory
- Next.js automatically serves files from the `public/` directory
- The `icon.svg` file is already handled by Next.js automatically
- Consider creating a design system for consistent asset generation
- Update the metadata configuration after adding new assets
