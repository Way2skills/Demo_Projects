# THEMO TILES — Premium tile showroom

A Next.js App Router website for Themo Tiles in Namakkal. The site uses TypeScript for its routes and shared data, Tailwind CSS, Framer Motion, Lucide React, and the Next.js Image component. Existing showroom styling and media are retained.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` — Home
- `/about` — About Us
- `/product` — Tile collections and inspiration
- `/showroom` — Showroom details
- `/contact` — Contact information and enquiry form

## Verify and build

```powershell
npm run lint
npm run typecheck
npm run build
npm start
```

The contact form validates and forwards enquiries to a Google Apps Script Web App for customer acknowledgement emails when configured. Interior photography is loaded from Unsplash and configured for Next.js image optimization. Hero videos and the showroom poster are served from `public/videos/`.

To enable contact enquiries and customer acknowledgement emails, configure the Google Apps Script Web App and the server-only environment variables described in [Google Apps Script enquiry email setup](./GOOGLE_APPS_SCRIPT_SETUP.md). Until configured, the form reports that the enquiry service is unavailable rather than showing a false success.
