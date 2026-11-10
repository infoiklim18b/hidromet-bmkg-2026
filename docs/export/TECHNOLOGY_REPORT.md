# Laporan teknologi dan framework

## Identitas sumber

Site Hidromet BMKG 2026 versi 1. Commit eeb5c1c7f079f0a793596359fe67c6d6cbb2d058 sesuai sumber versi diterbitkan. Seluruh 123 file Git-tracked diekspor; aplikasi tidak direkonstruksi dari HTML hasil build.

## Teknologi nyata dalam proyek

| Lapisan | Teknologi dan versi terkunci | Peran |
| --- | --- | --- |
| Bahasa | TypeScript 5.9.3 | TSX, route API, types dan konfigurasi |
| UI | React 19.2.6 dan React DOM 19.2.6 | Interaksi, state dan komponen |
| Framework runtime | Vinext 1.0.0-beta.5 | Menjalankan konvensi Next App Router di Vite/Workers |
| Kompatibilitas | Next 16.3.4 | Dependency dan API konvensi Next; bukan perintah build utama |
| Build | Vite 8.0.13 | Bundle client, RSC, SSR dan worker |
| Styling | Tailwind CSS 4.2.1 dan CSS authored | Global CSS, responsif, fonts, SVG |
| Ikon | lucide-react 1.31.0 | Ikon antarmuka |
| Runtime hosting | Cloudflare Workers, Wrangler 4.92.0 | Worker fetch handler dan dev emulator |
| Integrasi build Workers | @cloudflare/vite-plugin 1.37.1 | Build client/server dan bindings lokal |
| Komponen cadangan | Base UI, Radix, shadcn-style components | Source starter dipertahankan lengkap |
| Grafik aktif | SVG kustom | Grafik signed SPI dan curah hujan; Recharts terpasang sebagai dependency starter |
| Peta aktif | SVG path + GeoJSON lokal | Pan/zoom, markers, layer, opacity dan comparison |
| Scaffold data | Drizzle ORM 0.45.2 dan drizzle-kit 0.31.10 | Tersedia tetapi database belum digunakan |
| Package manager | npm, package-lock.json v3 | Dependency tree reproduktif |

Daftar lengkap dependency langsung beserta versi locked, declared, dan lisensi yang tercatat ada pada DEPENDENCIES_LOCKED.json. Dependency transitif tetap utuh pada package-lock.json. Tidak ada pemangkasan dependency untuk ekspor ini.

## Penyimpanan dan layanan

| Komponen | Status saat ekspor | Lokasi atau catatan |
| --- | --- | --- |
| D1 | Tidak terikat | .openai/hosting.json d1=null; schema kosong |
| R2 | Tidak terikat | .openai/hosting.json r2=null |
| PostgreSQL/PostGIS | Belum terhubung | Hanya disebut sebagai target dalam System Design |
| Ceph/S3/GeoServer | Belum terhubung | Tidak ada kredensial atau endpoint produksi |
| Data contoh | Aktif | lib/data.ts, 16 wilayah, 6 produk, 3 warning |
| State workspace | Browser localStorage | hidromet-demo-jobs-v1, scoped per origin/profil |
| Masukan | Browser localStorage | hidromet-demo-feedback |
| Unggah CSV simulasi | Browser memory | Diperiksa dan di-hash, byte file tidak disimpan di server |
| Dokumen unduhan | File statis | public/documents/*.pdf dan *.doc ikut ZIP |
| Font dan geometri | File statis lokal | public/fonts, public/indonesia.geo.json, lib/indonesia.ts |

## API dan integrasi eksternal

GET /api/v1/products dan GET /api/v1/warnings/active adalah API lokal/Worker milik aplikasi. Keduanya membaca lib/data.ts, merespons JSON demonstrasi, dan tidak memanggil API BMKG produksi. UI mengaksesnya dengan URL same-origin.

Helper connector dan auxiliary preview Worker tersedia karena starter, tetapi tidak ada plugin/connector aktif yang dideklarasikan pada manifest Site dan tidak ada pemanggilan connector pada UI bisnis. Tautan bmkg.go.id dan GitHub world.geo.json bukan integrasi pengambilan data saat runtime.

Gerbang autentikasi dan kebijakan akses Site merupakan layanan platform di luar repository. Header auth helper bukan server SSO yang dapat dipindah begitu saja. Server mandiri harus memiliki autentikasi sendiri jika diperlukan; role dropdown tetap simulasi browser.

## Halaman yang dipertahankan

Ringkasan, Monitoring, Peringatan dini, Geospasial, Dokumen, Informasi, SIH3/API, Kontak, Workspace; pencarian global; detail wilayah/produk/warning; unduhan CSV/JSON/PDF/DOC; workflow peran dan keputusan wajib; registrasi CSV dan checksum; reset simulasi dan feedback lokal.

Kode aplikasi asli terkonsentrasi di app/page.tsx. Komponen UI lainnya tetap disertakan meskipun belum dipakai. Source peta, favicon, dua font, dokumen rancangan, seluruh installer dan konfigurasi framework juga dipertahankan.

## Lisensi

Lisensi pihak ketiga yang sudah ada dipertahankan di vendor dan scripts/vite. Paket npm membawa lisensi masing-masing saat instalasi. Tidak ada lisensi menyeluruh baru yang diasumsikan untuk dokumen, identitas BMKG atau font lokal. Referensi geometri tetap dicantumkan pada aplikasi.
