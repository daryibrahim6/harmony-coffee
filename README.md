# D'Harmony Coffee Beans and Roastery

Landing page untuk **D'Harmony Coffee Beans and Roastery** — specialty coffee roastery. Dibangun dengan Next.js 15 + Payload CMS 3, feature-based architecture.

## Fitur

- **Product Modal System:** Sistem menu produk interaktif (Troupe -> Menu Grid -> Detail View) dengan focus trap & keyboard navigation.
- **Dynamic Navbar:** Tema navbar (gelap/terang) berubah berdasarkan section yang sedang tampil.
- **CMS-Managed:** Semua konten (produk, testimonials, standards, site settings) dikelola via Payload CMS admin panel.
- **Aksesibilitas:** Keyboard navigation, ARIA labels, focus trapping dalam modal.

## Tech Stack

- **Next.js 15** (App Router, Server Components)
- **Payload CMS 3** (SQLite adapter, Lexical editor)
- **React 19**
- **TypeScript 5**
- **ESLint 8** (eslint-config-next)

## Struktur Project

```
Harmony/
├── app/
│   ├── (frontend)/        # Public-facing routes (home, sitemap, robots)
│   └── (payload)/         # Payload CMS admin & API routes
├── features/
│   ├── home/              # Landing page components, schema, services
│   ├── products/          # Product schema, components, services
│   ├── media/             # Media collection schema
│   └── auth/              # Users collection schema
├── lib/                   # Shared utilities & constants
├── public/assets/         # Images, icons, logos, mascots
├── reports/               # QA/QC audit & status tracking
├── scripts/               # Seed scripts
├── styles.css             # Global stylesheet
├── payload.config.ts      # Payload CMS configuration
└── package.json
```

## Setup Lokal

```bash
npm install
cp .env.example .env      # Edit jika perlu
npm run dev               # http://localhost:3000
```

## Scripts

| Command | Deskripsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Jalankan production build |
| `npm run lint` | ESLint check |
| `npm run seed` | Seed database dengan konten awal |
| `npm run generate-types` | Generate Payload TypeScript types |

## Payload Admin

Akses admin panel di `/admin`. Default credentials di-setup via seed script.
