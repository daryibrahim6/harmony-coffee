# D'Harmony Coffee Beans and Roastery

Selamat datang di repositori frontend statis untuk **D'Harmony Coffee Beans and Roastery**. Proyek ini merupakan *landing page* premium yang dirancang untuk menonjolkan produk kopi *specialty* menggunakan antarmuka modern, performa tinggi, dan interaksi yang kaya.

## 🚀 Fitur Utama
- **Global Two-Tier Modal:** Sistem menu produk interaktif (Mascot -> Menu Grid -> Detail View) yang dirancang secara khusus untuk menggantikan navigasi halaman tradisional.
- **GSAP Animations:** Menggunakan GreenSock (GSAP) untuk animasi masuk (*fade-up*), *scroll-trigger*, dan efek *parallax* yang halus.
- **Dynamic Navbar:** Tema navbar (gelap/terang) berubah secara otomatis berdasarkan deteksi *intersection* dari *section* yang sedang digulir (Scroll state).
- **Aksesibilitas (A11y):** Dukungan penuh untuk *keyboard navigation*, *focus trapping* dalam modal, dan tag ARIA (`aria-expanded`, `aria-hidden`, dll).
- **Performa Tinggi:** Tidak bergantung pada *framework* JavaScript berat (seperti React/Vue) di *client-side*. Murni Vanilla HTML5, CSS3, dan ES6 JS.

## 🛠 Teknologi yang Digunakan
- **HTML5:** Struktur semantik dan aksesibel.
- **CSS3:** Menggunakan metodologi BEM (Block Element Modifier), CSS Variables untuk konsistensi tema, dan Flexbox/Grid.
- **JavaScript (ES6+):** Logika modal, navigasi dinamis, dan manipulasi DOM ringan.
- **GSAP (GreenSock):** Library animasi utama (`gsap.min.js`, `ScrollTrigger.min.js`, `ScrollToPlugin.min.js`).

## 📁 Struktur Folder
```text
/Harmony
├── /assets/              # Semua gambar, font, dan panduan aset (Squoosh)
│   ├── /logo/
│   ├── /mascot/
│   ├── /photos/
│   ├── /products/
│   ├── /decorative/
│   └── README.md         # Panduan crop & resize gambar untuk desainer
├── index.html            # Entry point halaman utama
├── styles.css            # Stylesheet utama (>2000 baris)
├── script.js             # Logika interaksi inti (Navigasi & Modal)
└── gsap-init.js          # Inisialisasi animasi GSAP
```

## 💻 Cara Menjalankan Secara Lokal
Proyek ini sepenuhnya statis. Anda tidak perlu *build tools* seperti npm atau webpack.
1. Clone repositori ini atau *download* foldernya.
2. Buka folder `Harmony/`.
3. Buka file `index.html` langsung di browser pilihan Anda, ATAU gunakan ekstensi seperti **Live Server** (di VSCode) untuk pengalaman yang lebih baik.

## 📝 Catatan Konversi ke WordPress / PHP (Masa Depan)
Kode saat ini sudah dibersihkan dari *dead code* dan siap untuk dikonversi menjadi *theme* dinamis:
- Data kopi di dalam `script.js` (`coffeeDB`) dirancang agar mudah diganti dengan *fetch request* atau di-render via PHP.
- Gaya sebaris (*inline styles*) pada SVG telah dipindahkan ke kelas CSS eksternal.
- Struktur kelas HTML siap dipecah menjadi `header.php`, `footer.php`, dan *template parts*.

## 📞 Kontak
Untuk pertanyaan terkait pengembangan website ini, silakan hubungi tim pengembang via D'Harmony.
