# Rules: QA Audit, QC Testing & Status Tracking Workflow

Rules ini berlaku always-on untuk semua task yang berhubungan dengan business gap analysis, penulisan test scenario, dan eksekusi testing di project ini.

## Definisi Istilah (Wajib Dipahami Sebelum Kerja)

- **QA (Quality Assurance)** = proses pencegahan. Analisis kode mendalam untuk menemukan flow/fitur yang BELUM ada atau belum lengkap (business gap), sebelum ditest. Contoh: "sistem tidak punya flow refund padahal ada skenario dimana itu dibutuhkan" → ini temuan QA.
- **QC (Quality Control)** = verifikasi hasil jadi. Menulis skenario test dan menjalankannya untuk memastikan flow yang SUDAH ada berjalan benar sesuai spesifikasi. Ini baru dilakukan SETELAH gap dari QA sudah diputuskan/di-fix.

**JANGAN PERNAH mencampur kedua mode ini dalam satu batch kerja.** Audit gap analysis dan test execution adalah dua task terpisah dengan tujuan berbeda — mencampurnya menyebabkan hasil dangkal di keduanya.

## Struktur Folder Wajib

Semua report harus disimpan dengan struktur berikut, TIDAK BOLEH digabung jadi satu file besar:

```
reports/
├── STATUS.md                    ← index utama, wajib selalu up to date
├── audit/
│   └── [nama-flow].md           ← satu file per flow/critical path
├── test-scenarios/
│   └── [nama-flow].md           ← satu file per flow, skenario test detail
└── test-results/
    └── [nama-flow].md           ← satu file per flow, hasil eksekusi test
```

Penamaan `[nama-flow]` harus konsisten di ketiga folder untuk flow yang sama (misal: `booking-flow.md`, `payment-flow.md`, `auth-flow.md`).

## STATUS.md — Single Source of Truth

`STATUS.md` adalah file WAJIB yang harus selalu mencerminkan kondisi terkini seluruh project. Formatnya tabel:

| Flow | Audit (Gap Analysis) | Test Scenario Ditulis | Test Dijalankan | Status Akhir |
|---|---|---|---|---|
| [nama flow] | Done / In Progress / Belum | Done / Sebagian / Belum | Passed semua / Sebagian gagal / Belum | AMAN / IN PROGRESS / ADA ISU |

**Setiap kali ada progress pada flow manapun (audit selesai, scenario ditulis, test dijalankan, bug difix), `STATUS.md` WAJIB di-update di kesempatan yang sama.** Jangan biarkan file ini basi/tidak sinkron dengan kondisi report per-flow yang sebenarnya.

## Alur Kerja Per Flow (Wajib Diikuti Berurutan)

Kerjakan **satu flow dalam satu waktu**, jangan langsung semua flow sekaligus (untuk menghindari analisis dangkal/halusinasi).

### Tahap 1 — QA: Audit & Gap Analysis (Analysis Only)
1. Analisis kode mendalam untuk flow yang dipilih, telusuri behavior aktual (bukan asumsi dari nama fitur/komponen).
2. Cari gap dengan kerangka pertanyaan: "kalau sistem ini dipakai oleh banyak user dalam jangka waktu lama (bertahun-tahun), hal apa yang bisa gagal atau belum terhandle di titik ini?" — termasuk edge case kecil (elemen UI duplikat dengan behavior beda, redirect/URL tidak sesuai, state tidak ter-reset, notifikasi yang seharusnya ada tapi tidak dikirim).
3. Jangan batasi diri ke kategori yang sudah ditentukan sebelumnya — eksplorasi bebas dari hasil analisis kode.
4. **Sebelum declare audit ini selesai, lakukan self-recheck dulu:** baca ulang temuan yang sudah dikumpulkan, tanya ke diri sendiri "apa ada sudut yang saya lewatkan — failure case, dampak ke role lain, UI/redirect/state?" Kalau nemu tambahan, masukkan dulu sebelum lapor final.
5. Simpan hasil ke `reports/audit/[nama-flow].md` dengan format berikut untuk SETIAP temuan:

   - **Skenario**: deskripsi gap yang ditemukan
   - **Status sekarang**: sudah dihandle / belum dihandle / kurang lengkap
   - **Bukti dari code**: file + behavior
   - **Risiko**: dampak kalau dibiarkan
   - **Opsi Solusi** (WAJIB minimal 2 opsi kalau gap ini butuh keputusan produk/arsitektur, bukan cuma bug kecil yang solusinya jelas tunggal):
     - **Opsi A — [nama pendekatan]**: penjelasan, trade-off (kelebihan/kekurangan, effort, dampak ke bagian lain)
     - **Opsi B — [nama pendekatan]**: penjelasan, trade-off
     - **Opsi C** (kalau ada): sama
     - **Rekomendasi Devin**: opsi mana yang menurut analisis paling sesuai untuk kebutuhan project ini, dan kenapa — tapi tetap sebagai REKOMENDASI, bukan keputusan final.

   Untuk gap yang solusinya memang tunggal/jelas (misal bug kecil, typo, validasi yang jelas kurang), tidak perlu dipaksakan multi-opsi — cukup satu solusi dengan penjelasan singkat.

   **Kenapa harus multi-opsi:** user perlu bahan diskusi konkret untuk dibawa ke mentor/pihak lain, bukan cuma menerima satu rekomendasi mentah. Kalau nanti mentor punya preferensi beda dari rekomendasi Devin, user bisa langsung tau posisi rekomendasi itu dibanding opsi lain yang sudah dipertimbangkan — bukan mulai diskusi dari nol.
5. **JANGAN eksekusi perubahan apapun di tahap ini.** Tunggu review/approval user, terutama untuk temuan yang butuh keputusan produk (seperti "apakah refund perlu ada atau tidak").
6. Update `STATUS.md` — kolom Audit untuk flow ini jadi "Done".

### Tahap 2 — Fix Gap Prioritas (kalau ada)
Setelah user approve rekomendasi dari audit, gap yang perlu di-fix dikerjakan dulu SEBELUM menulis test scenario. Jangan menulis test scenario untuk behavior yang statusnya masih akan berubah.

### Tahap 3 — QC: Penulisan Test Scenario
1. Tulis skenario test yang meng-cover flow ini secara menyeluruh — termasuk assertion yang ketat (cek URL berubah sesuai state, cek elemen duplikat satu-satu, cek state setelah aksi, bukan cuma "apakah halaman tidak crash").
2. Simpan ke `reports/test-scenarios/[nama-flow].md`.
3. Update `STATUS.md` — kolom Test Scenario untuk flow ini jadi "Done".

### Tahap 4 — QC: Eksekusi Test
1. Jalankan test scenario yang sudah ditulis.
2. **Kalau ada yang error, diagnosis dulu root cause-nya sebelum melakukan perubahan apapun. Ada 3 kemungkinan, bukan cuma 2:**
   - **App code memang bug** (logic salah, tidak sesuai flow seharusnya) → fix app code.
   - **Test menulis expectation berdasarkan flow lama** yang sudah sengaja diubah → update test.
   - **Elemen/fitur yang ditest memang belum ada sama sekali** (bukan bug, bukan test salah — skenarionya valid tapi implementasinya belum dibangun) → treatment beda, lihat poin 3 di bawah.
3. **Untuk kategori "belum ada sama sekali", pisahkan lagi jadi dua level:**
   - **Trivial** (elemen UI kecil yang jelas seharusnya ada dan tidak butuh keputusan produk — tombol yang lupa ditambahkan, label kosong, link yang belum diarahkan, dll): boleh langsung difix + tambahkan, TIDAK perlu approval dulu. Laporkan di hasil test apa yang ditambahkan dan kenapa.
   - **Signifikan** (flow/fitur yang belum ada sama sekali dan butuh keputusan produk/bisnis — contoh: fitur refund, flow reschedule, mekanisme dispute): JANGAN langsung diimplementasi. Treatment-nya SAMA seperti temuan audit (lihat Tahap 1) — laporkan sebagai gap dengan minimal 2 opsi solusi dan trade-off-nya, simpan juga ke `reports/audit/[nama-flow].md` kalau belum pernah tercatat di sana (berarti ini gap yang lolos dari audit awal), lalu tunggu approval user sebelum eksekusi.
   - Kalau ragu suatu temuan itu trivial atau signifikan, defaultnya perlakukan sebagai **signifikan** (lebih aman nanya dulu daripada nambah fitur yang ternyata butuh keputusan bisnis tanpa sepengetahuan user).
4. **JANGAN PERNAH memodifikasi test code hanya untuk memaksa hasil passed tanpa root cause yang jelas.** Ini berlaku untuk ketiga kategori di atas — termasuk jangan melonggarkan assertion supaya "elemen belum ada" itu jadi keliatan PASS.
5. Laporkan hasil dalam bahasa manusia/naratif per skenario (contoh: "user login dengan email yang tidak terdaftar → FAIL, alasan: ..."), bukan cuma code diff. Untuk temuan kategori "belum ada", laporkan eksplisit itu bukan bug tapi gap fitur, dan trivial/signifikan.
6. Simpan ke `reports/test-results/[nama-flow].md`.
7. Update `STATUS.md` — kolom Test Dijalankan dan Status Akhir untuk flow ini. Kalau ada gap signifikan yang masih menunggu approval, status flow ini TIDAK BOLEH "AMAN" dulu — tetap "ADA ISU" sampai gap itu diputuskan.

## Definisi "Selesai" untuk Satu Flow

Satu flow baru dianggap benar-benar selesai (status "AMAN" di STATUS.md) kalau:
- Audit sudah dilakukan mendalam (termasuk failure/interrupt case, bukan cuma happy path)
- Semua gap prioritas tinggi dari audit sudah di-fix
- Semua skenario test sudah ditulis dengan assertion ketat
- Semua test sudah dijalankan dan PASSED (atau kalau ada yang gagal, sudah didiagnosis jelas dan dilaporkan ke user, bukan dipaksa passed)
- User sudah melakukan spot-check terhadap 2-3 temuan/hasil test paling kritis

## Unit Test (Vitest) vs E2E Test (Playwright) — Wajib Dibedakan

Selama ini rules dan template prompt cuma fokus ke E2E (Playwright). Ini menyebabkan unit test (Vitest) sering di-skip karena tidak ada instruksi eksplisit kapan harus dipakai. Ke depan, WAJIB dibedakan:

**Unit Test (Vitest)** — testing fungsi/logic murni secara terisolasi, TANPA browser, TANPA koneksi database/API asli (kalau butuh data, di-mock).

WAJIB ditulis untuk:
- Kalkulasi (harga, komisi, diskon, refund amount, dll)
- Validasi input (format email, password strength, business rule validation)
- Utility function (format tanggal/timezone, parsing, transformasi data)
- Business logic yang bisa diuji tanpa UI (state machine transition logic, permission/role checking logic)

**E2E Test (Playwright)** — testing alur user LENGKAP lewat browser (klik, isi form, navigasi, integrasi antar komponen).

WAJIB ditulis untuk:
- User flow lintas halaman (booking, checkout, login, dst — yang sudah dicover di workflow Tahap 1-4 di atas)
- Interaksi UI yang tidak bisa diuji tanpa render browser (drag-drop, modal, form multi-step)

**Aturan wajib:** Setiap kali audit (Tahap 1) menemukan business logic/fungsi kalkulasi/validasi yang kritis, WAJIB dicatat juga apakah logic itu punya unit test coverage — kalau belum ada, itu jadi temuan gap tersendiri, terpisah dari gap E2E flow. Jangan asumsikan E2E test yang mencakup flow tersebut sudah cukup — E2E menguji "apakah hasil akhirnya benar dari sudut pandang user", bukan "apakah logic kalkulasinya benar di semua kemungkinan input", yang lebih presisi diuji lewat unit test.

**Kalau Devin melaporkan suatu logic "tidak perlu unit test", WAJIB kasih alasan eksplisit kenapa** (misal: logic-nya trivial/satu baris, atau sudah tercover cukup oleh E2E) — jangan diterima sebagai keputusan default tanpa penjelasan.



Tidak semua temuan/perubahan butuh proses selengkap di atas (audit multi-opsi, self-report checkpoint, update STATUS.md). Pakai panduan ini:

**Proses LENGKAP (semua tahap 1-4 + checkpoint) — WAJIB untuk:**
- Business logic, data/booking/payment flow, auth, apapun yang menyentuh keputusan produk atau uang.
- Perubahan yang berdampak ke lebih dari satu flow/halaman.

**Proses RINGKAS (boleh langsung fix + laporan singkat, skip audit multi-opsi) — untuk:**
- Perubahan UI kecil murni (typo, warna, spacing, teks tombol) yang tidak menyentuh logic/data.
- Bug yang sudah jelas root cause dan solusinya tunggal (tidak ambigu, tidak butuh keputusan produk).

**Kalau ragu masuk kategori mana, default ke proses LENGKAP** — lebih aman kelamaan dikit daripada kelewat gap yang sebenarnya penting.

Ini bukan alasan untuk skip self-report checkpoint sepenuhnya — checkpoint tetap dipakai di proses ringkas, cuma versinya boleh lebih singkat (tidak perlu breakdown opsi solusi kalau memang tidak relevan).

Sebelum melaporkan sebuah flow sebagai "AMAN" di `STATUS.md`, lakukan langkah berikut:
1. Re-cek temuan-temuan sebelumnya terhadap kondisi code TERKINI (bukan asumsi dari laporan lama — kondisi code bisa berubah karena fix di flow lain).
2. Jangan klaim "aman" tanpa bukti eksplisit di setiap sub-bagian — user butuh bisa cross-check sendiri ke code, bukan kesimpulan sepihak.