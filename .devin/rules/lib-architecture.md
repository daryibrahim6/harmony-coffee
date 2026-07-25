---
trigger: always_on
---
# Lib Architecture Rules

Folder `lib/` adalah shared layer di mana kode yang benar-benar cross-cutting dan tidak terikat domain/fitur disimpan. Tujuan utamanya: utility, helper, base client, formatter, dan konstanta global yang bisa dipakai banyak fitur tanpa circular dependency.

## Prinsip Utama

1. **Domain/fitur jangan di lib/**. Business logic, schema, types, komponen, dan service khusus fitur harus di `/features/<feature>/`. Lihat `feature-architecture.md`.
2. **lib/ = generic & stateless**. File di sini tidak boleh mengimport dari `/features/`, karena itu akan menciptakan circular dependency.
3. **Satu tanggung jawab per file**. Jangan campur format, request, business rule, dan helper khusus domain dalam satu file.
4. **Barrel export saat dibutuhkan**. Gunakan `index.ts` hanya untuk modul kecil yang memang satu domain generic, bukan semua file.
5. **Minimal & tanpa boilerplate**. Hanya buat file di lib/ jika benar-benar dipakai lebih dari 1 fitur atau platform-level.

## Struktur Folder

```
lib/
  utils.ts              # pure functions: format, slugify, mask, parse, validate regex
  api-client.ts         # base fetch client (misal: header, timeout, error handling)
  constants.ts          # konstanta global, config, enum string, map static
  schemas/              # (legacy barrel) re-export dari features untuk backward compat
  types/                # (legacy barrel) re-export dari features untuk backward compat
  helpers/              # small utilities that are bigger than utils but still generic
  mocks/                # data fake/mock yang dipakai banyak fitur (sementara)
  README.md             # petunjuk ringkas dan contoh
```

> Di project ini, `lib/schemas.ts` dan `lib/types.ts` sengaja dipertahankan sebagai **barrel re-export** dari `/features/*/schema/` untuk backward compatibility. Jangan tambahkan schema/type baru di lib/; semua baru harus di fitur masing-masing.

## Kategori File

### 1. `utils.ts` — Pure Functions

Hanya boleh berisi pure function, tanpa side effect, tanpa API call, tanpa state.

**Boleh di sini:**
- `formatPrice`, `formatDate`, `slugify`, `maskName`, `clamp`, `camelToKebab`, `cn`
- Parsing string, regex, date, number coercion
- Helper TypeScript generic (`assertNever`, `typedEntries`, `pick`)

**Jangan di sini:**
- Fetch API, database, localStorage, cookies
- Business rule spesifik konsultan, booking, atau pembayaran
- Fungsi yang mengimport data/mock

### 2. `api-client.ts` — Base HTTP Client

Tempatkan base fetch wrapper dan error handling global. Jangan tempatkan endpoint-specific logic di sini.

**Boleh di sini:**
- `fetchAPI<T>(url, options)` dengan default headers dan JSON parsing
- Error class `ApiError` dengan status & message
- Retry logic, timeout, atau request interceptor sederhana

**Jangan di sini:**
- `getConsultants`, `getCategories`, `registerConsultant` — itu milik feature services
- URL path hardcoded untuk resource tertentu
- Schema validation (dilakukan di feature service/route)

### 3. `helpers/` — Generic Helper Modules

Helper yang lebih besar dari utilitas satu baris, tapi masih generic. Pisahkan per domain helper.

```
lib/helpers/
  date.ts          # date comparison, range, formatting helper
  string.ts        # capitalize, truncate, kebabCase, generateInitials
  validation.ts    # regex, validators generic (phone, email, password strength)
```

Aturan: setiap file helper harus bisa dihapus tanpa merusak feature. Jika helper hanya dipakai 1 fitur, pindahkan ke `/features/<feature>/services/` atau `/features/<feature>/utils/`.

### 4. `constants.ts` — Konfigurasi & Map Static

Tempatkan konstanta yang dipakai banyak tempat.

**Boleh di sini:**
- `APP_NAME`, `DEFAULT_PAGE_SIZE`, `SUPPORTED_CURRENCIES`
- Map `sessionModeLabel` untuk mode yang benar-benar cross-cutting
- Error message generic, regex generic

**Jangan di sini:**
- List kategori, spesialisasi, atau mock data — itu di feature/mocks
- Config yang harus rahasia (API key, secrets) — gunakan environment variable

### 5. `mocks/` — Data Palsu (sementara)

Saat milestone mock data masih aktif, data palsu disimpan di `lib/mocks/` dan diekspor ke feature service yang membutuhkannya. Setiap domain mock dipisah file.

```
lib/mocks/
  categories.ts
  consultants.ts
  reviews.ts
  index.ts
```

Ketika database sudah diintegrasikan, file mock harus dihapus atau dipindah ke test fixtures, bukan dibiarkan di lib/.

### 6. `schemas.ts` & `types.ts` — Legacy Barrel Only

Dua file ini hanya boleh berisi re-export dari feature schemas. Contoh:

```ts
// lib/schemas.ts
export { consultantRegisterSchema, loginSchema } from "@/features/...";

// lib/types.ts
export type { Consultant, LoginInput } from "@/features/...";
```

**Larangan:**
- Menulis definisi Zod atau TypeScript baru langsung di sini
- Mengimport dari fitur A ke fitur B via lib/

## Aturan Penamaan File

- `camelCase.ts` untuk utilitas, helper, client, constants
- `index.ts` hanya untuk barrel export di subfolder (helpers/, mocks/)
- Hindari file `utils.ts` yang terlalu besar; pecah ke `lib/helpers/` jika sudah > 5 function berbeda domain

## Contoh Good vs Bad

**Good:**
```ts
// lib/utils.ts
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(amount);
}

// lib/api-client.ts
export async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// features/consultants/services.ts
import { fetchAPI } from "@/lib/api-client";
export async function getConsultants() { return fetchAPI<...>("/api/consultants"); }
```

**Bad:**
```ts
// lib/utils.ts (terlalu banyak tanggung jawab)
export function formatPrice(...) { ... }
export function getConsultants() { ... }        // ❌ business logic di lib/
export function searchConsultants(...) { ... }  // ❌ business logic di lib/
export function calculateTax(...) { ... }       // ❌ domain-specific
```

## Checklist Sebelum Menambah File ke lib/

- [ ] Apakah ini benar-benar dipakai lebih dari 1 fitur?
- [ ] Apakah ini tidak mengimport dari `/features/`?
- [ ] Apakah ini tidak mengandung business logic fitur tertentu?
- [ ] Apakah nama file sudah mencerminkan isinya (tidak `helpers.ts` tapi `dateHelpers.ts`)?
- [ ] Apakah lebih baik disimpan di feature karena hanya dipakai 1 tempat?
