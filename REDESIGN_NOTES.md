# BabyHunt — redesign notes

This is an update to the supplied BabyHunt project, not a replacement application.

## Visual and UX updates

- Reworked the global visual language around warm ivory, champagne, forest green, sage, cocoa and muted caramel; removed the previous blush/pink palette from the supplied UI styles.
- Updated shared buttons, navigation, announcement bar, product cards, section headings, footer, form focus states and responsive breakpoints.
- Changed the header to a sticky layout and added a responsive Discover mega-menu with category imagery, plus a direct account shortcut.
- Kept the existing Home, Shop, product, cart, checkout, wishlist, account, order, contact and policy routes in place.
- Preserved the existing homepage hero, promotional image, category/product data, and video story; added a poster fallback and changed video preload to metadata.
- Updated root metadata and retained the current Next.js App Router setup and dependency versions.
- Added reduced-motion handling to the shared finishing styles.

## Existing functionality retained

The existing product/category data files, local cart and wishlist storage/events, checkout/order pages, and the Contact page's existing Google Apps Script form integration were left in place. No dummy product records, API endpoints, or replacement backend were introduced.

## Project limitations found in the supplied ZIP

- The archive contains no `src/app/api` routes, database schema, admin panel, or standalone category route pages. Category discovery remains connected to the existing Shop/search experience.
- Only one video asset was included (`public/videos/babymom.mp4`), so the existing video story is retained rather than duplicating one clip to simulate multiple videos.
- Newsletter subscription and social links were not connected to a new service because no provider integration was included in the archive.

## Validation

- Parsed all 28 TypeScript/TSX source files successfully with the TypeScript transpiler.
- Parsed both CSS files successfully with PostCSS.
- A full `tsc` check and Next.js production build could not be completed in this environment because project dependencies were not installed. `npm ci` timed out, and offline installation reported a missing package in the local npm cache. Run `npm ci` and `npm run build` in an environment with npm registry access before deployment.

## Run locally

```bash
npm ci
npm run dev
```
