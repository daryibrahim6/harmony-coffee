# Rules Compliance Audit

> Audit date: 25 Jul 2026
> Scope: Full codebase vs 7 rules in `.devin/rules/`
> Mode: Audit only, no changes executed.

---

## Rule 1: design-taste.md

**Area yang dicek:** `app/(frontend)/layout.tsx`, `features/home/components/*`, `features/products/components/ProductModal.tsx`, `styles.css`

### Temuan

1. **Inter font as default** - `layout.tsx:3` uses `Inter` as primary font. Rule 4.1 discourages Inter as default, recommends `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`, or brand-appropriate serif first. **Severity: minor** (override path exists if brand demands it, but no explicit justification present).

2. **`<img>` instead of `next/image`** - `Hero.tsx:15`, `About.tsx:33`, `GreenBean.tsx:20,27,40`, `Roasted.tsx:62`, `Footer.tsx:21,53,66,80,94,108`, `ProductModal.tsx:162,191,204`. Rule 4.8 and Section 6.D require `next/image` for lazy loading and auto-format. All images use raw `<img>` tags. **Severity: signifikan** (affects Core Web Vitals: LCP, CLS).

3. **`window.addEventListener('scroll', ...)` in Navbar** - `Navbar.tsx:48`. Rule 5.D explicitly bans `window.addEventListener("scroll", ...)`. Should use Motion's `useScroll()`, GSAP ScrollTrigger, or IntersectionObserver. **Severity: signifikan** (perf impact on mobile, explicit hard ban in rules).

4. **No `prefers-reduced-motion` handling in components** - `Navbar.tsx` scroll handler, `Roasted.tsx` hover interactions, `ProductModal.tsx` modal animations. Rule 6.B mandates `prefers-reduced-motion` honor for any motion above intensity 3. The `gsap-init.js` file has it, but that file is legacy and not used in the Next.js app. **Severity: signifikan**.

5. **No dark mode support** - `layout.tsx` and all components have no `dark:` variants or CSS variables for dark mode. Rule 6.C mandates dual-mode design for consumer-facing pages. The page uses `data-theme` attributes for section-level theme switching, but this is not the same as system-level dark mode. **Severity: minor** (the site has a deliberate dark/light section alternation pattern which may be intentional brand design, but system `prefers-color-scheme` is not respected).

6. **Em-dash usage in code** - `GreenBean.tsx:42` contains `·` (middle dot) in "Unroasted · Specialty Grade". Rule 9.F rationes middle-dot usage to max 1 per line. This is 1 per line, so it passes. No em-dashes found in component code. **Severity: pass**.

7. **Hero uses `<br>` to split title** - `Hero.tsx:24` splits title with `<br />`. Rule 9.F bans `<br>`-broken-and-italicized headlines as default design move. This is a `<br>` without italic, so it's borderline. **Severity: minor**.

8. **Eyebrow/badge on every section** - `About.tsx:13` ("OUR STORY"), `Standard.tsx:10` ("WHY CHOOSE US"), `Roasted.tsx:19` ("ROASTED BEAN"), `GreenBean.tsx:36` ("GREEN BEAN"), `Testimonials.tsx:10` ("TESTIMONIALS"), `CTA.tsx:21` (preheading). Rule 4.7 EYEBROW RESTRAINT mandates max 1 eyebrow per 3 sections. 6 sections all have eyebrows. **Severity: signifikan**.

9. **Section layout repetition** - Multiple sections use the same `section-header` + `badge` + `grid` pattern. Rule 4.7 Section-Layout-Repetition Ban requires at least 4 different layout families for 8 sections. Current sections share very similar header patterns. **Severity: minor** (CSS may differentiate them visually, but structurally they repeat).

10. **No Tailwind CSS** - `styles.css` is a 78KB monolithic CSS file. Rule 3.A defaults to Tailwind v4. The project uses vanilla CSS with BEM-like naming. **Severity: minor** (existing project convention, migration would be large effort).

11. **Hand-rolled SVG icons** - `Footer.tsx` uses `<img src="/assets/icons/wa.svg">` etc. Rule 3.C says "NEVER hand-roll SVG icons" and recommends icon libraries (Phosphor, HugeIcons, Radix, Tabler). However, these are brand-specific social icons (WhatsApp, Instagram, TikTok, Shopee, Tokopedia) which may not exist in standard icon libraries. **Severity: minor** (justified exception for brand-specific icons).

---

## Rule 2: feature-architecture.md

**Area yang dicek:** `features/`, `app/`, `lib/`, `payload.config.ts`

### Temuan

1. **Feature folder structure incomplete** - `features/media/schema/` is empty (0 items). `Media` collection is imported in `payload.config.ts:12` from `./features/media/schema/media` but the file doesn't exist in the listing. **Severity: signifikan** (build would fail if file is truly missing, but it was working before - needs verification).

2. **No `/hooks` folders in any feature** - Rules 5 mandates hooks in `/hooks`. No feature has a hooks folder. **Severity: minor** (no hooks needed yet since there are no client-side data fetching patterns with TanStack Query).

3. **No `/create` or `/detail` folders** - Rules specify these for form/detail flows. Not present in any feature. **Severity: minor** (no create/detail flows built yet).

4. **`features/home/` contains product-related component** - `page.tsx:10` imports `ProductModal` from `features/products/components/`. This is cross-feature import which Rule 9 discourages. However, the home page composes multiple features, which is the job of the page. The import is from `app/(frontend)/page.tsx`, not from within `features/home/`, so this is acceptable. **Severity: pass**.

5. **Schema files don't have corresponding `types.ts`** - Rule 3 says each feature wajib punya `schema.ts` (Zod) dan `types.ts` (TypeScript) di `/schema`. Current schema files are Payload collection definitions (not Zod), and no `types.ts` files exist. **Severity: minor** (Payload generates types into `payload-types.ts` at root, which is the Payload convention. Zod schemas not yet needed since validation is handled by Payload).

6. **`app/(frontend)/page.tsx` is composition-only** - Rule 7 says page.tsx should only contain routing, metadata, composition. Current page.tsx does exactly this: imports from features, composes components, no business logic. **Severity: pass**.

7. **README.md exists for each feature** - Rule 10 requires README.md per feature. `features/home/README.md`, `features/products/README.md`, `features/media/README.md`, `features/auth/README.md` all exist. **Severity: pass**.

8. **Data fetching pattern** - Home page uses Server Component + direct Payload query (via services). Rule table says "Public read-only pages, query ringan" can use Server Component + direct query. `getProductsByGroup` does 2 queries (group lookup + products), which is borderline "query berat". **Severity: minor** (acceptable for now, but if product list grows, should move to API route).

9. **API routes have no auth/role check or pagination** - Rules 3, 4 in Data Fetching say API routes WAJIB punya auth check + role check, and list routes WAJIB punya pagination. The only API route is `app/(payload)/api/[...slug]/route.ts` which is Payload's built-in REST API (handles its own auth). No custom API routes exist yet. **Severity: pass** (no custom API routes to violate this).

---

## Rule 3: lib-architecture.md

**Area yang dicek:** `lib/`

### Temuan

1. **`lib/utils.ts`** - Contains `formatPrice`, `slugify`, `buildWhatsAppLink`. All pure functions, no imports from `/features/`, no business logic. Matches "Good" example in rules. **Severity: pass**.

2. **`lib/constants.ts`** - Contains `APP_NAME`, `DEFAULT_WA_NUMBER`, `DEFAULT_PAGE_SIZE`. All cross-cutting global config. Matches rules. **Severity: pass**.

3. **Neither file is imported anywhere** - 0 imports across project source. Not a violation of architecture rules, but dead code. **Severity: minor** (see Cleanup section).

4. **No legacy barrel files** - `lib/schemas.ts` and `lib/types.ts` don't exist. Rules say these are optional for backward compat. **Severity: pass**.

---

## Rule 4: nextjs-build-cicd-optimization.md

**Area yang dicek:** `app/(frontend)/page.tsx`, `app/(frontend)/layout.tsx`, `app/(frontend)/sitemap.ts`, `next.config.mjs`, `payload.config.ts`, all services

### Temuan

1. **`force-dynamic` on home page** - `page.tsx:16` uses `export const dynamic = 'force-dynamic'`. Rule 1 says dynamic rendering is only for real-time per-request data or auth-dependent pages. Home page content is semi-static (CMS-managed but not real-time). Rule 1 recommends ISR + on-demand revalidation as default for CMS-managed content. **Severity: signifikan** (was set as workaround for empty DB during build, but should be replaced with proper ISR + `revalidatePath` hooks in Payload afterChange, or at minimum `revalidate: 3600`).

2. **Build-time database access** - `page.tsx` calls `getSiteSettings()`, `getProductsByGroup()`, `getTestimonials()`, `getStandards()` which all query Payload/SQLite directly at render time. With `force-dynamic`, these run at request time, not build time. This is compliant with Rule 2 which says "Server component yang di-render saat build time TIDAK BOLEH query database langsung." Since `force-dynamic` prevents build-time rendering, this is technically safe. **Severity: pass** (but fragile - if someone removes `force-dynamic`, build will hit the DB).

3. **No `try-catch` fallback in services** - `getSiteSettings.ts`, `getTestimonials.ts`, `getStandards.ts`, `getProductsByGroup.ts` all do direct Payload queries with no error handling. Rule 2 says "WAJIB ada error handling graceful (try-catch dengan fallback data kosong/default)." If DB is unreachable, the page will crash. **Severity: signifikan**.

4. **Sitemap is static** - `sitemap.ts` returns only the home page URL. No dynamic product/category pages. Rule 1 says sitemap should use `force-dynamic` to generate at request time. Current sitemap is static (no DB query), so it works at build time. **Severity: minor** (incomplete, but not breaking).

5. **No `next/image` configuration for remote images** - `next.config.mjs` only configures `formats: ['image/webp']`. If product images come from Payload uploads, they may need `images.domains` or `remotePatterns` config. **Severity: minor** (currently all images are local `/assets/` paths, but once CMS uploads are used, this will break).

6. **No `engines` field in `package.json`** - Rule 5 says Node version should be consistent. No `engines` field present. **Severity: minor**.

7. **`graphql` dependency unused** - `package.json:20` lists `graphql` as dependency. Payload may use it internally, but worth checking if it's needed. **Severity: minor**.

---

## Rule 5: ponytail.md

**Area yang dicek:** All source files, project structure

### Temuan

1. **Dead code: `lib/utils.ts` and `lib/constants.ts`** - Neither file is imported anywhere. Ponytail rule: "Deletion over addition." These should either be deleted or connected to usage. **Severity: minor**.

2. **Legacy static site files at root** - `index.html`, `script.js`, `gsap-init.js`, `coffee-data.js` are the old static HTML/JS site. They're not used by the Next.js app. Ponytail: "No boilerplate nobody asked for." **Severity: signifikan** (cluttering, should be deleted or moved to archive).

3. **Duplicate `assets/` folder** - `assets/` at project root and `public/assets/` have identical structure (same subfolders, same README.md). Next.js serves from `public/`, so root `assets/` is dead duplicate. **Severity: signifikan** (wastes space, confuses).

4. **`wp-theme/` folder** - Complete WordPress theme (PHP files, template parts). Project has migrated to Next.js + Payload. This is dead code. **Severity: signifikan**.

5. **Root-level migration docs** - `DEEP_AUDIT_REPORT.md`, `MIGRATION_PLAN.md`, `PHASE2_FAST_TRACK.md`, `UPLOAD_READY_CHECKLIST.md`, `WP_DATA_MODEL.json`, `WP_TEMPLATE_SPLIT_MAP.md` are all WordPress migration planning docs. Migration is done (to Next.js+Payload, not WordPress). These are stale reference docs. **Severity: minor** (historical value, but cluttering root).

6. **No `ponytail:` comments in code** - Rule says mark intentional simplifications with `ponytail:` comment. None found. The `as any` casts in components (e.g., `About.tsx:3` `paragraphs: any[]`) are intentional simplifications but unmarked. **Severity: minor**.

7. **No tests** - Rule says "non-trivial logic leaves ONE runnable check behind." `ProductModal.tsx` has non-trivial logic (focus trap, event listeners, state machine) but no test. `Navbar.tsx` has scroll logic with no test. **Severity: minor** (project is early stage, but rule is explicit).

8. **`as any` casts in schema files** - Previous session cast `req` to `any` in `Products.ts` and `SiteSettings.ts` for `req.next` access. Ponytail says be "not lazy about" understanding the problem. These casts are workarounds for type mismatches. **Severity: minor** (documented in previous session, acceptable for now).

---

## Rule 6: pre-flight-checklist.md

**Area yang dicek:** Project structure, `milestones/milestones.md`, `reports/STATUS.md`

### Temuan

1. **`milestones/milestones.md` does not exist** - Rule Step 1.1 says read this file before every task. File not found. **Severity: signifikan** (process violation - either create it or update rules to remove the requirement).

2. **`reports/STATUS.md` does not exist** - Rule Step 1.2 says read this file. File not found. `reports/` directory doesn't exist at all. **Severity: signifikan** (process violation - QA/QC workflow cannot function without this).

3. **`reports/AUDIT_FRAMEWORK.md` does not exist** - Fallback mentioned in rules also missing. **Severity: signifikan**.

4. **No `reports/` directory at all** - The `qa-qc-workflow-and-status-tracking.md` rules require a structured `reports/` folder with `audit/`, `test-scenarios/`, `test-results/` subdirectories. None exist. **Severity: signifikan**.

---

## Rule 7: qa-qc-workflow-and-status-tracking.md

**Area yang dicek:** `reports/` directory, project processes

### Temuan

1. **No `reports/` directory structure** - Rules require:
   ```
   reports/
   ├── STATUS.md
   ├── audit/[nama-flow].md
   ├── test-scenarios/[nama-flow].md
   └── test-results/[nama-flow].md
   ```
   None of this exists. **Severity: signifikan**.

2. **No QA audit performed for any flow** - No audit files exist for home page flow, product modal flow, navigation flow, etc. **Severity: signifikan** (project has functional flows but no QA documentation).

3. **No test scenarios written** - No test scenario files exist. **Severity: signifikan**.

4. **No test execution** - No test result files exist. No Vitest or Playwright tests found. **Severity: signifikan**.

5. **No unit tests (Vitest) for utility functions** - `lib/utils.ts` has `formatPrice`, `slugify`, `buildWhatsAppLink` which are pure functions that should have unit tests per rules. **Severity: minor** (functions are simple, but rule is explicit).

---

## Kontradiksi Antar Rules

### Kontradiksi 1: `force-dynamic` vs ISR

- **nextjs-build-cicd-optimization.md** Rule 1: Recommends ISR + on-demand revalidation for CMS-managed content. Says `force-dynamic` is "hanya untuk data yang benar-benar harus real-time."
- **Previous session context**: `force-dynamic` was set because build was crashing with empty DB (prerender error). This was a pragmatic fix.
- **feature-architecture.md** Data Fetching Pattern: Says "Public pages BOLEH query langsung di Server Component asal tidak berhat."
- **Konflik**: `force-dynamic` makes every request hit the DB. ISR would cache and only revalidate on demand. The rules prefer ISR, but the current implementation uses `force-dynamic` as a workaround. Not a contradiction between rules themselves, but between rules and implementation.

### Kontradiksi 2: Server Component DB query

- **nextjs-build-cicd-optimization.md** Rule 2: "Server component yang di-render saat build time (SSG/ISR) TIDAK BOLEH query database langsung."
- **feature-architecture.md** Data Fetching: "Public pages BOLEH query langsung di Server Component asal tidak berhat."
- **Konflik**: These can coexist if the page is `force-dynamic` (not build-time). But if someone switches to ISR, the feature-architecture rule would conflict with the build-cicd rule. The build-cicd rule is more specific and should take precedence.

### Kontradiksi 3: `data-theme` section switching vs dark mode

- **design-taste.md** Rule 6.C: "Design for both modes from the start. Never ship light-only or dark-only."
- **Current implementation**: Uses `data-theme="dark"` and `data-theme="light"` on sections for visual alternation. This is not system dark mode, it's deliberate section-level theme switching.
- **Konflik**: Not a contradiction between rules, but the implementation satisfies a different goal (section alternation) while missing the rule's intent (system dark mode). Both could coexist if the site supported both section alternation AND `prefers-color-scheme`.

---

## Cleanup: File yang Tidak Terpakai / Harus Dihapus

| File/Folder | Alasan | Rekomendasi |
|---|---|---|
| `index.html` | Legacy static HTML, replaced by Next.js app | Hapus |
| `script.js` | Legacy vanilla JS, replaced by React components | Hapus |
| `gsap-init.js` | Legacy GSAP init, replaced by React (but not yet implemented) | Hapus |
| `coffee-data.js` | Legacy mock data, replaced by Payload CMS | Hapus |
| `assets/` (root) | Duplikat dari `public/assets/`, Next.js hanya baca `public/` | Hapus |
| `wp-theme/` | WordPress theme, project sudah migrasi ke Next.js+Payload | Hapus |
| `DEEP_AUDIT_REPORT.md` | Audit WP lama, tidak relevan lagi | Hapus atau pindah ke `docs/archive/` |
| `MIGRATION_PLAN.md` | Plan migrasi WP->Next.js, sudah selesai | Hapus atau pindah ke `docs/archive/` |
| `PHASE2_FAST_TRACK.md` | WP migration steps, sudah selesai | Hapus atau pindah ke `docs/archive/` |
| `UPLOAD_READY_CHECKLIST.md` | Checklist upload WP, tidak relevan | Hapus atau pindah ke `docs/archive/` |
| `WP_DATA_MODEL.json` | Data model WP, digantikan Payload schema | Hapus atau pindah ke `docs/archive/` |
| `WP_TEMPLATE_SPLIT_MAP.md` | Template split map WP, tidak relevan | Hapus atau pindah ke `docs/archive/` |
| `lib/utils.ts` | 0 import di project | Biarkan (siap dipakai) atau hapus |
| `lib/constants.ts` | 0 import di project | Biarkan (siap dipakai) atau hapus |

---

## Summary per Rule

| Rule | Severity tertinggi | Jumlah temuan signifikan | Jumlah temuan minor |
|---|---|---|---|
| design-taste.md | signifikan | 3 (img tags, scroll listener, eyebrow overuse) | 5 |
| feature-architecture.md | signifikan | 1 (media/schema kosong) | 4 |
| lib-architecture.md | pass | 0 | 1 |
| nextjs-build-cicd-optimization.md | signifikan | 2 (force-dynamic, no error handling) | 4 |
| ponytail.md | signifikan | 3 (legacy files, duplicate assets, wp-theme) | 4 |
| pre-flight-checklist.md | signifikan | 4 (missing milestones, STATUS, reports) | 0 |
| qa-qc-workflow-and-status-tracking.md | signifikan | 4 (no reports, no audit, no tests) | 1 |
