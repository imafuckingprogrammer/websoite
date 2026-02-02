# Sriracha Creative - Next.js

This is the Next.js 15 version of the Sriracha Creative landing page, migrated from Create React App for better SEO and performance.

## What Changed?

- **Framework**: Create React App → Next.js 15 (App Router)
- **SEO**: All metadata is now server-side rendered
- **Performance**: Faster builds, better Core Web Vitals
- **Everything else**: IDENTICAL - all components, styles, and animations are exactly the same

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SEO metadata
│   └── page.tsx          # Home page (main landing page)
├── src/
│   ├── components/        # All React components (UNCHANGED)
│   ├── contexts/          # React contexts (minor Next.js adjustments)
│   ├── assets/           # Images, icons, etc.
│   └── index.css         # Global styles
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
└── next.config.js        # Next.js configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## SEO Improvements

- ✅ Server-side rendered HTML with all meta tags
- ✅ Open Graph tags for social media previews
- ✅ JSON-LD structured data for search engines
- ✅ Proper canonical URLs
- ✅ Optimized Core Web Vitals

## Notes

- All your original components are **completely unchanged**
- All Framer Motion animations work exactly the same
- Dark mode toggle works identically
- ThemeContext has minimal changes for Next.js SSR compatibility
