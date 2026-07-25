---
trigger: always_on
---

# Feature-Based Architecture

Setiap fitur di project ini disusun di dalam folder `/features/<feature-name>`. Struktur ini memisahkan kode berdasarkan domain/fungsi, bukan berdasarkan jenis file (lib, components, hooks, dll).

## Struktur Folder per Fitur

```
/features/<feature-name>
  /hooks           # React hooks spesifik fitur (useQuery, useMutations, useForm helpers)
  /services        # API calls, business logic, data fetching (biasakan async function)
  /schema          # Zod schemas + TypeScript types khusus fitur
  /create          # Form / flow untuk membuat resource baru (bisa page.tsx, Form.tsx, dll)
  /detail          # Detail view / tampilan satu resource
  /components      # UI components reusable di dalam fitur (bukan shared)
  page.tsx         # Entry page / listing / main page untuk fitur ini
  README.md        # (opsional) Penjelasan fitur, flow, catatan khusus
```

## Aturan yang Wajib Dipakai

### 1. Satu fitur, satu folder
Jangan membuat file di `lib/`, `components/`, `app/`, atau `hooks/` tanpa folder feature. Jika fitur belum ada, buat folder feature-nya dulu.

### 2. Shared resources hanya untuk hal yang benar-benar cross-cutting
File yang dipakai lebih dari 1 fitur boleh disimpan di `lib/` atau `components/ui/` (base UI), tapi jangan terlalu banyak. Contoh shared:
- `lib/utils.ts` — format, slugify, maskName
- `lib/api-client.ts` — base fetch client (jika dibutuhkan)
- `components/ui/` — button, input, card, rating stars (bukan business UI)

### 3. Schema & Types di `/schema`
Setiap fitur wajib punya `schema.ts` (Zod) dan `types.ts` (TypeScript) di dalam folder `/schema`. Jangan gabung semua schema di `lib/schemas.ts`.

### 4. Services di `/services`
Semua API call/fetching data dari fitur dipisahkan di `/services`. Gunakan naming jelas: `getConsultants.ts`, `registerConsultant.ts`, `searchConsultants.ts`, dll.

### 5. Hooks di `/hooks`
React hooks yang membungkus services atau state spesifik fitur diletakkan di `/hooks`. Contoh: `useConsultants.ts`, `useConsultantDetail.ts`.

### 6. Components di `/components` (fitur lokal)
Komponen yang hanya dipakai di satu fitur di dalam `/features/<feature>/components/`. Komponen yang dipakai lintas fitur baru masuk ke `components/ui/` atau `components/shared/`.

### 7. App Router meng-import dari feature
File di `app/[path]/page.tsx` sebaiknya hanya berisi routing, metadata, dan composition. Business logic, schema, data fetching di-import dari `/features/<feature>/...`.

### 8. Naming convention
- Folder: kebab-case atau camelCase (konsisten dengan app route), contoh: `consultants`, `consultant-management`, `auth`, `booking`
- File: PascalCase untuk components, camelCase untuk hooks/services/schemas
- Zod schema: `<featureName>Schema`, contoh: `consultantRegisterSchema`
- TypeScript type: `<featureName>`, contoh: `Consultant`, `ConsultantDetail`

### 9. Jangan ada circular dependency antar fitur
Fitur A boleh import shared resources, tapi jangan import dari `features/b` kecuali benar-benar tidak bisa dihindari. Jika butuh data lintas fitur, pindahkan ke shared module.

### 10. Dokumentasi fitur
Setiap fitur baru minimal punya file `README.md` satu paragraf yang menjelaskan: fitur ini apa, halaman/page yang termasuk, dan catatan penting.

## Contoh Mapping dari App ke Features

```
app/                          →  features/
────────────────────────────────────────────────────
app/page.tsx                  →  features/home/page.tsx
app/[category]/page.tsx       →  features/categories/page.tsx
app/[category]/[slug]         →  features/consultants/detail/
app/search/page.tsx           →  features/consultants/page.tsx (search mode)
app/login/page.tsx            →  features/auth/page.tsx
app/dashboard/admin/...       →  features/consultants-admin/
app/api/consultants/...       →  features/consultants/services/ (route handlers)
```

## Contoh Isi Feature Folder

```
/features/consultants
  /hooks
    useConsultants.ts
    useConsultantDetail.ts
  /services
    getConsultants.ts
    getConsultantBySlug.ts
    registerConsultant.ts
  /schema
    consultant.ts
  /create
    ConsultantRegisterForm.tsx
    page.tsx
  /detail
    page.tsx
  /components
    ConsultantCard.tsx
    PackagePricingCard.tsx
    ReviewList.tsx
  page.tsx
  README.md
```

## Migrasi Bertahap

Project ini masih dalam proses migrasi dari struktur monolithic (`lib/`, `components/`, `app/`) ke feature-based. Jika menambahkan fitur baru, wajib pakai struktur `/features`. Jika menyentuh fitur lama, migrasikan file-file terkait ke `/features` sesuai domain-nya.

## Data Fetching Pattern

| Pattern | Kapan dipakai | Contoh |
|---------|--------------|--------|
| Server Component + direct Prisma query | Public read-only pages, query ringan | Home, consultant detail, article |
| API Route + TanStack Query | Dashboard/admin pages, halaman dengan auth | Admin dashboard, consultant dashboard, bookings list |
| Server Actions | Mutations dari app UI | Form submit, approve/reject, refund |
| Route Handlers | External clients, webhooks | Payment webhook, cron, upload |

### Aturan Data Fetching
1. Dashboard/admin pages WAJIB pakai API Route + TanStack Query. JANGAN query Prisma langsung di server component dashboard/admin.
2. Public pages BOLEH query langsung di Server Component asal tidak berat (single record lookup, simple filter). Query berat (aggregate, multi-join, count) wajib pindah ke API Route.
3. API routes WAJIB punya auth check + role check.
4. API routes untuk list WAJIB punya pagination.
5. Date fields diserialisasi ke ISO string sebelum dikirim ke client.
6. Setelah mutation (create/update/delete), invalidate relevant TanStack Query keys, jangan pakai `window.location.reload()`.
