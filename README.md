# BabyHunt - Premium Baby Essentials Store

A modern, production-ready e-commerce web application for **BabyHunt**, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Highlights & Key Features

- **Next.js 16 App Router**: 100% built on Next.js App Router with server/client boundaries, dynamic routes, and fast Turbopack compilation.
- **100% TypeScript**: Strictly typed data models, props, hooks, contexts, and utility functions with zero type errors.
- **Tailwind CSS v4**: Beautiful, responsive styling for mobile, tablet, and desktop with a consistent warm pastel baby palette.
- **Micro-Interactions & Animations**: Smooth page transitions, hover shine effects, card lifts, and floating badges using Framer Motion.
- **Reactive State Management**:
  - `CartContext`: Full persistent shopping cart with drawer preview, free shipping progress bar, quantity modifiers, and coupon application (`BABY15`).
  - `WishlistContext`: Persistent saved items list with quick slide-over drawer and instant move-to-cart.
  - Cross-tab synchronization via `localStorage` and custom events.
- **Smart Typo-Tolerant Search**: Levenshtein distance and synonym-aware search engine matching baby clothing, toys, and nursery essentials.
- **Rich Product Catalog**: Over 100 baby products with category, subcategory, gender, age-range, price filters, and color variants.
- **Complete Customer Journey**:
  - Home showcase with animated hero, category cards, and trending picks
  - Full shop catalog with desktop sidebar & mobile drawer filters
  - Detailed product page with image gallery, size selector, pincode delivery checker, care tabs, and related picks
  - Interactive cart & single-page checkout supporting Cash on Delivery (COD), UPI, and Cards
  - Order success confirmation, order history (`/my-orders`), and visual 4-step delivery tracker (`/track-order`)
  - Informational pages: About Us, Contact with message form & store hours, FAQs with accordion topics, and legal policies.

---

## 📁 Project Architecture

```
babyhunt/
├── public/                 # Static assets, SVG icons, and 140+ product images
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout with Cart & Wishlist providers
│   │   ├── page.tsx        # Modular Home page
│   │   ├── globals.css     # Tailwind CSS theme & core keyframe animations
│   │   ├── about/          # Brand story, mission, and values
│   │   ├── account/        # User profile and order overview
│   │   ├── cart/           # Full cart page with coupon and summary
│   │   ├── checkout/       # Address form and payment selector
│   │   ├── contact/        # Contact form, store address, and hours
│   │   ├── faq/            # Searchable accordion FAQs
│   │   ├── my-orders/      # Past order history with status filters
│   │   ├── order-success/  # Order confirmation and delivery summary
│   │   ├── privacy-policy/ # Privacy policy
│   │   ├── products/[id]/  # Product details, sizing, and pincode checker
│   │   ├── return-policy/  # 7-day exchange and return policy
│   │   ├── shipping-policy/# Delivery speeds and free delivery policy
│   │   ├── shop/           # Shop catalog with smart filters & sorting
│   │   ├── terms/          # Terms of service
│   │   ├── track-order/    # Live delivery status timeline
│   │   └── wishlist/       # Saved items grid
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Header, Footer, CartDrawer, WishlistDrawer, ProductCard, etc.
│   │   ├── home/           # HeroSection, BenefitsSection, CategoriesSection, etc.
│   │   ├── shop/           # FilterSidebar, MobileFilterDrawer, QuickViewModal, etc.
│   │   └── product-detail/ # ProductGallery, PincodeChecker, ProductTabs
│   ├── context/            # CartContext and WishlistContext
│   ├── hooks/              # useCart, useWishlist, useDebounce, useMediaQuery
│   ├── data/               # Strongly-typed products, categories, and FAQs
│   ├── types/              # TypeScript interfaces (Product, Cart, Order, User, etc.)
│   ├── constants/          # Brand config, storage keys, navigation links
│   └── utils/              # Class merger (cn), formatters, storage guards, fuzzy search
├── package.json            # Scripts & cleaned dependencies
├── tsconfig.json           # Strict TypeScript configuration
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration for Tailwind
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested with Node 20 / 22 / 24)
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Compile and build the production bundle
npm run build

# Start the production server
npm run start
```
