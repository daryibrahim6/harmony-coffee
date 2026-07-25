# D'Harmony Assets Guide (Updated)

Dokumen ini disesuaikan dengan struktur aset aktual di proyek.

## Format Utama
- Gunakan **WEBP** untuk logo, foto, mascot, dekoratif, dan galeri produk.
- Gunakan **SVG** untuk ikon vector (`assets/icons`) dan dekoratif line-art bila relevan.

## Struktur Folder Aktif
- `assets/logo/`
  - `favicon.webp`
  - `logo-icon.webp`
  - `logo-full.webp`
  - `logo-full-light.webp`
- `assets/mascot/`
  - `pose1.webp`
  - `pose2.webp`
  - `pose3.webp`
- `assets/photos/`
  - `hero-bg.webp`
  - `company.webp`
- `assets/products/`
  - `gayo-arabica.webp`
  - `krama/1.webp` ... `7.webp`
  - `house-blend/1.webp` ... `7.webp`
  - `sticky-grape/1.webp` ... `7.webp`
  - `luwak-outlaw/1.webp` ... `7.webp`
  - `whiskey-hazel/1.webp` ... `7.webp`
  - `sweet-funk/1.webp` ... `7.webp`
- `assets/decorative/`
  - `arabica-cradle.svg`
  - `decorator1.webp`
  - `decorator2.webp`
  - `decorator3.webp`
- `assets/icons/`
  - `wa.svg`, `ig.svg`, `tiktok.svg`, `shopee.svg`, `tokped.svg`, `star.svg`

## Konvensi Penggantian Aset
- Pertahankan nama file yang sudah dipakai oleh `index.html`, `styles.css`, dan `script.js`.
- Jika ingin ganti nama file, update semua referensi sekaligus agar tidak terjadi broken image.
- Untuk galeri produk, tetap ikuti pola urutan angka (`1.webp` s.d. `7.webp`) supaya rendering carousel tidak rusak.

## Workflow Optimasi Singkat
1. Optimasi gambar di [Squoosh](https://squoosh.app) dengan output WEBP.
2. Gunakan ukuran sumber yang cukup untuk desktop, tapi hindari file terlalu besar.
3. Replace file di folder yang sama agar path tidak berubah.
4. Cek ulang halaman utama + modal produk setelah replace.

## Catatan
- Nomor WhatsApp dikelola di `script.js` (`window.DHarmony.config.whatsapp`).
- Ukuran visual komponen ditentukan di `styles.css`.
