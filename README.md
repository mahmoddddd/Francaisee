# City Hub — Franchise Landing Page

Bilingual (AR/EN), premium landing page for **City Hub** — an F&B management and franchise group. Built with Next.js 14 App Router, Tailwind CSS, Framer Motion, next-intl, and MongoDB/Mongoose.

## Stack

- **Next.js 14** (App Router, RSC)
- **TypeScript + Tailwind CSS**
- **next-intl** (AR/EN with RTL)
- **Framer Motion** (scroll reveals + hero animations)
- **MongoDB + Mongoose** (lead capture)
- **Zod + React Hook Form** (typed validation)

## Setup

```bash
# 1. Install deps
npm install

# 2. Configure MongoDB
cp .env.example .env.local
# then edit MONGODB_URI (MongoDB Atlas free tier works)

# 3. Run dev
npm run dev
# open http://localhost:3000 → redirects to /ar
```

## Scripts

| Script           | What it does                           |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Dev server on :3000                    |
| `npm run build`  | Production build                       |
| `npm run start`  | Start built server                     |
| `npm run lint`   | ESLint                                 |
| `npm run typecheck` | `tsc --noEmit`                      |

## Structure

```
src/
  app/
    [locale]/
      layout.tsx        # html/body + fonts + dir + i18n provider
      page.tsx          # home — composes all sections
    api/leads/route.ts  # POST /api/leads → Mongo
    globals.css
    layout.tsx          # root passthrough (required by Next.js)
  components/
    layout/             # Navbar, Footer, LanguageSwitcher, BrandMark
    ui/                 # Container, Button, Reveal, SectionEyebrow
  sections/             # Hero, About, Services, Brands, Why, Process, Investment, Support, Contact, ClosingBanner
  i18n/                 # routing + request config
  messages/             # ar.json, en.json
  lib/
    db/                 # mongo connection + Lead model
    schemas/            # zod schemas
    brands.ts           # brand metadata (colors, slugs, instagram)
    utils.ts            # cn helper
  middleware.ts         # locale routing
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import on Vercel.
3. Add environment variable `MONGODB_URI` in Vercel project settings.
4. Deploy — that's it.

MongoDB Atlas is recommended. Create a free cluster, whitelist `0.0.0.0/0` (Vercel serverless), and copy the connection string.

## Adding / swapping brand assets

- Hero building render: [public/images/hero/cityhub-place.png](public/images/hero/cityhub-place.png)
- Shake N Cake photos: [public/images/shakencake/](public/images/shakencake/) (01–12)
- Brand accents, slugs and Instagram links live in [src/lib/brands.ts](src/lib/brands.ts) — update `image`, `accent`, `bgFrom`, `bgTo` per brand.

## Translations

- English: [src/messages/en.json](src/messages/en.json)
- Arabic: [src/messages/ar.json](src/messages/ar.json)

Default locale is `ar`. The root `/` redirects to `/ar`.

## Lead capture

Leads are validated with Zod and stored in the `leads` collection with schema:

```ts
{ fullName, email, phone, city, budget, brand, message, locale, status, ip, userAgent, createdAt }
```

See [src/lib/db/models/Lead.ts](src/lib/db/models/Lead.ts).

## Notes

- **Premium design** — dark theme (ink palette) with gold sheen accents; subtle noise + radial gradients; all copy follows the brand tone (bilingual, pulled from the client's spec).
- **Fonts** — Montserrat (Latin) + Alexandria (Arabic) via `next/font/google` — zero CLS.
- **Motion** — staged Hero entrance + scroll-triggered `Reveal` wrapper used throughout; automatically disables if the OS has "reduced motion" enabled.
- **RTL-aware** — uses logical properties (`start`/`end`, `ms/me`) so the layout flips cleanly in Arabic.
