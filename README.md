# Crueze TimeLine

Crueze TimeLine is a luxury, multi-brand watch showroom and digital catalogue built with Next.js. Visitors can explore Indian and international watchmakers, browse curated timepiece collections, filter and search the catalogue, save watches to a wishlist, and contact the showroom.

## Project Overview

The Next.js application is in [`nextjs-app/`](./nextjs-app/). It uses the App Router and a warm champagne, ivory, and charcoal visual theme. Catalogue content is provided by local JavaScript data files, and product images are served from the app's `public/images/` directory.

## Features

- Homepage hero carousel, editorial sections, featured watches, and watchmaker showcases.
- Brand and category landing pages, plus curated Kids, Couples, and showroom experiences.
- Watch catalogue search, filtering, sorting, product details, specifications, and image galleries.
- Shopping bag and wishlist state persisted in the browser with local storage.
- Responsive navigation, shopping-bag and wishlist drawers, and contact FAQs.
- Enquiry form routed through a Next.js API endpoint to the existing Google Apps Script deployment.
- Checkout demonstration flow; it does not process payments or create backend orders.
- Scroll and entrance animations respect reduced-motion preferences.

## Technology Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4 with `@tailwindcss/turbopack`
- JavaScript
- Geist Sans and Geist Mono via `next/font`
- ESLint 9 with the Next.js ESLint configuration

## Project Structure

```text
watch-ecommerce/
├── README.md
└── nextjs-app/
    ├── package.json
    ├── package-lock.json
    ├── next.config.mjs
    ├── eslint.config.mjs
    ├── jsconfig.json
    ├── public/
    │   └── images/              # Watch, brand, category, contact, and showroom assets
    └── src/
        ├── app/                 # App Router pages, layouts, styles, and API routes
        ├── components/          # Shared UI and page components
        ├── data/                # Brand, category, watch, and source records
        └── utils/               # Filtering, formatting, and shared helpers
```

## Installation and Setup

Requirements:

- Node.js 20.9 or newer
- npm

From the repository root, install the locked dependencies:

```bash
cd nextjs-app
npm ci
```

On Windows PowerShell, use `npm.cmd` if `npm` does not resolve:

```powershell
npm.cmd ci
```

## Running the Application

From `nextjs-app/`, start the development server:

```bash
npm run dev
```

On Windows PowerShell:

```powershell
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Scripts

Run these commands from `nextjs-app/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Start the production server after building. |

## API Routes and Integrations

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/inquire` | `POST` | Validate a contact enquiry and forward it to the existing Google Apps Script Web App. |

The other application routes are Next.js pages under `nextjs-app/src/app/`, including the homepage, showroom, watches, brands, categories, contact, cart, wishlist, and checkout.

## Enquiry Email Integration (Google Apps Script)

The contact form in `nextjs-app/src/components/contact/ContactForm.js` sends URL-encoded `name`, `email`, and `message` fields to the same-origin `POST /api/inquire` route. The subject and optional phone number are included in the formatted message.

The server-side route in `nextjs-app/src/app/api/inquire/route.js` validates the fields and forwards them to the project's existing Google Apps Script Web App deployment. The deployment address is configured in that route; no local environment variable or `.env.local` file is required. Do not copy deployment credentials or secrets into documentation.

The Apps Script source is maintained separately and is not included in this repository. A cloned project can use the existing deployment without creating or redeploying an Apps Script project, provided that deployment remains available and accepts the application's request. The API reports success only when it receives a JSON response with boolean `success: true`; errors or unconfirmed responses are returned to the form as failures.

Google-side deployment permissions, the live response format, and actual email delivery cannot be verified from this repository alone. Confirm those settings with the deployment owner before relying on live customer email delivery. No test email is sent by the setup commands.

## Important Notes

- Shopping bag and wishlist data are stored in the user's browser; this project does not provide a backend order system.
- Checkout is for demonstration and does not process payments.
- Product and watchmaker catalogue information is provided for showcase purposes and does not establish official brand partnerships, authorized-dealer status, or confirmed inventory.
- The app-local README is the setup guide for the Next.js application; this root README consolidates its setup and integration instructions with the project overview.
