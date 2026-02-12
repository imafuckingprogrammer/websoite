# PWA Icons

The SVG icons are currently being used. For better compatibility with older devices:

## TODO: Generate PNG versions

You should generate PNG versions of the icons from the circular favicon design:

- icon-192x192.png (192x192px)
- icon-512x512.png (512x512px)
- apple-touch-icon.png (180x180px)

Design: Circular white background with black circle in center

## How to Generate:

1. Open `/public/favicon.svg` in an image editor (Photoshop, Figma, etc.)
2. Export as PNG at the required sizes
3. Save in this directory
4. Update `/public/manifest.json` to reference the PNG files

Alternatively, use an online converter like:
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/
- Or imagemagick: `convert favicon.svg -resize 192x192 icon-192x192.png`
