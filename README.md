# Hidromet BMKG 2026 Full Project Export

Source code asli Site **Hidromet BMKG 2026**, versi diterbitkan **1**, diekspor pada **10 November 2026**. Website tidak dibuat ulang dan Site yang aktif tidak diubah.

- Site asal: https://hidromet-bmkg-2026.diseminasi-6395.chatgpt.site
- Project ID: `appgprj_6af1de701e24819191831b3d35beeeb4`
- Commit sumber: `eeb5c1c7f079f0a793596359fe67c6d6cbb2d058`
- **123 file sumber terlacak tercakup.** Seluruh kode aplikasi, desain, aset, package.json, dan package-lock.json dipertahankan byte-per-byte.
- README dan .gitignore pada akar diberi panduan ekspor. Versi asli keduanya disimpan di `docs/export/ORIGINAL_README.md` dan `docs/export/ORIGINAL_GITIGNORE.txt`.
- `EXPORT_MANIFEST.json` memetakan semua file sumber asli ke lokasi ekspornya beserta SHA-256. Dokumen dan helper ekspor merupakan tambahan, bukan pengganti aplikasi.

## Mulai di VS Code

Prasyarat: **Node.js >=22.13.0** dan npm. Node 22 LTS yang memenuhi minimum tersebut atau Node 24 dapat dipakai. Ekspor diverifikasi pada Linux dengan Node 24.22.1 dan npm 11.9.0. Windows dan macOS belum diuji langsung.

1. Ekstrak ZIP ke direktori lokal dengan hak tulis.
2. Buka folder `Hidromet_BMKG_2026_Full_Project` di VS Code.
3. Buka Terminal lalu jalankan:

```bash
node --version
npm --version
npm ci
npm run dev
```

Buka **http://localhost:5173**. Hentikan server dengan `Ctrl+C`. Jika port dipakai, hentikan proses yang menggunakannya terlebih dahulu.

`npm ci` menginstal versi yang dikunci dalam package-lock.json. Jangan mengganti lockfile atau menjalankan upgrade massal saat pertama kali memverifikasi hasil ekspor. Direktori node_modules tidak dimasukkan ke ZIP dan harus diinstal ulang untuk OS Anda.

Jika `npm ci` dihentikan di tengah proses, jalankan kembali. Alternatif installer lintas platform yang sudah ada pada source: `npm run install:ci`. Pada clean checkout, installer memilih jalur portable, tidak memerlukan utilitas Bash milik lingkungan managed.

## Environment

**Tidak ada API key atau environment variable wajib untuk fitur demonstrasi yang ada.** `.env.example` menjelaskan variabel opsional tanpa nilai rahasia. Tidak perlu menyalinnya untuk mulai.

Bila kelak diperlukan, salin menjadi `.env.local`:

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Linux atau macOS:

```bash
cp .env.example .env.local
```

Jangan commit .env.local, token, credential Cloudflare, credential Git, atau file .dev.vars. Nilai contoh yang masih dikomentari tidak mengonfigurasi integrasi apa pun.

## Memeriksa dan membangun

```bash
node scripts/export/verify-original.mjs
npx tsc --noEmit
npm run build
```

Build Vinext menghasilkan `dist/client` dan `dist/server/index.js`. Direktori tersebut merupakan hasil build, bukan source, sehingga tidak dimasukkan ke ZIP.

Untuk menjalankan hasil build dengan emulator Cloudflare Workers lokal:

```bash
npm run start
```

Buka **http://127.0.0.1:8787**. `npm run start` memerlukan build yang sudah berhasil. Server ini emulator lokal, bukan server produksi Internet.

Untuk menguji respons API dari PowerShell setelah dev server berjalan:

```powershell
Invoke-RestMethod http://localhost:5173/api/v1/products
Invoke-RestMethod http://localhost:5173/api/v1/warnings/active
```

Linux atau macOS dapat menggunakan:

```bash
curl http://localhost:5173/api/v1/products
curl http://localhost:5173/api/v1/warnings/active
```

Keduanya mengembalikan JSON berlabel `DEMONSTRASI`.

## Halaman dan routing

UI asli berada pada `app/page.tsx` dan memakai **hash routing**:

| Alamat | Tampilan |
| --- | --- |
| `/#beranda` | Ringkasan nasional |
| `/#monitoring` | Filter, peta, grafik, tabel dan CSV |
| `/#peringatan` | Peringatan contoh, filter dan detail |
| `/#geospasial` | Peta, zoom/pan, layer, opacity, basemap dan perbandingan |
| `/#dokumen` | Katalog dan unduhan PDF/DOC/CSV |
| `/#informasi` | Panduan dan katalog produk |
| `/#sih3` | Referensi API dan percobaan endpoint |
| `/#kontak` | Masukan lokal pada browser |
| `/#workspace` | Simulasi QC, approval dan publikasi |

Semua tampilan tersebut dipertahankan. Tidak ada sembilan page.tsx terpisah karena situs asli menggunakan satu halaman dengan state dan hash. Route API fisik tersedia di `app/api/v1/`.

## Source dan aset

| Lokasi | Isi |
| --- | --- |
| `app/` | UI asli, global CSS, layout, helper auth dan route API |
| `components/` | Seluruh komponen asli termasuk komponen UI starter yang belum dipakai |
| `hooks/` | Hook React |
| `lib/data.ts` | 16 contoh wilayah, 6 produk dan 3 peringatan |
| `lib/indonesia.ts` | Path SVG geometri Indonesia |
| `public/` | GeoJSON, favicon, font lokal, dokumen PDF dan DOC |
| `db/`, `drizzle/`, `examples/d1/` | Scaffold database dan contoh opt-in, belum aktif |
| `worker/` | Entrypoint Cloudflare Worker |
| `scripts/` | Installer, runner, Vite plugin dan helper asli |
| `vendor/` | Stylesheet vendored dan lisensinya |
| `.openai/hosting.json` | Konfigurasi hosting Site asli, d1/r2 null |
| `docs/export/` | Laporan teknologi, data, direktori dan verifikasi ekspor |

Daftar lengkap setiap file: `docs/export/DIRECTORY_STRUCTURE.md` dan `EXPORT_MANIFEST.json`. Versi dependency: `package-lock.json` dan `docs/export/DEPENDENCIES_LOCKED.json`.

## Database storage dan integrasi

Saat diekspor, **tidak ada database server aktif, D1 binding, R2 bucket, PostgreSQL, Ceph, S3, GeoServer, atau API BMKG operasional yang dipakai aplikasi**. Hal-hal tersebut tercantum sebagai arsitektur target pada dokumen System Design, bukan layanan yang sudah dibangun pada Site ini.

- Data cuaca/warning contoh berada di `lib/data.ts` dan ikut ZIP.
- Dua API JSON membaca data contoh yang sama dan tidak membutuhkan backend eksternal.
- File PDF dan DOC asli di public/documents ikut ZIP.
- Peta dan font berada lokal; tidak membutuhkan tile server atau CDN font.
- `db/schema.ts` masih kosong; contoh D1 disimpan di examples dan tidak menjadi route aktif.
- Wrapper connector tersedia sebagai scaffold. Site tidak mendeklarasikan plugin/connector aktif dan UI tidak memanggil layanan app eksternal.
- Tautan ke bmkg.go.id dan repo geometri merupakan tautan informasi, bukan integrasi API.

**Data browser tidak ikut ZIP.** Perubahan workspace berada pada key `hidromet-demo-jobs-v1`, dan masukan pada `hidromet-demo-feedback`. Nilai ini berbeda pada tiap browser/profil/origin. Gunakan petunjuk `docs/export/DATA_MIGRATION.md` bila perlu memindahkannya. Berkas CSV yang dipilih saat registrasi tidak disimpan sebagai berkas upload; aplikasi menyimpan metadata dan hash saja. Simpan berkas input aslinya secara terpisah.

## Autentikasi dan hosting mandiri

Gerbang akses ChatGPT/Sites disediakan oleh platform hosting dan **tidak menjadi layanan login mandiri hanya dengan menyalin source**. `app/chatgpt-auth.ts` adalah helper header; UI saat ini tidak memanggilnya untuk melindungi route. Pilihan role pada workspace hanya simulasi dan tidak boleh dianggap sebagai RBAC produksi.

Clean checkout memakai profile `portable` karena `.sites-runtime/execution-profile.json` tidak diekspor. Pertahankan konfigurasi Vite dan Worker asli. Jangan menggantinya dengan `next dev`, `next build`, atau `next start`: runtime build proyek ini adalah **Vinext**, walaupun memakai konvensi Next App Router.

Pilihan deployment dijelaskan di `docs/export/HOSTING.md`. Tersedia `wrangler.selfhost.example.jsonc` sebagai konfigurasi mandiri opsional. Tidak ada deployment atau perubahan akses terhadap Site asal yang dilakukan oleh proses ekspor.

## Menyimpan di GitHub

ZIP tidak menyertakan direktori .git, remote credentials, atau riwayat commit. Inisialisasi repository baru:

```bash
git init
git add .
git status
git commit -m "Import original Hidromet BMKG 2026 source"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Ganti USERNAME/REPOSITORY dengan repository milik Anda yang sudah dibuat. Gunakan autentikasi GitHub milik sendiri melalui Git Credential Manager/SSH; jangan menaruh token di kode atau URL remote. Repository GitHub belum dibuat atau dipush oleh ekspor ini.

## Bukti kelengkapan

`EXPORT_MANIFEST.json` mengandung hash file asal. `node scripts/export/verify-original.mjs` memeriksa bahwa semua 123 file asli tetap ada dan sesuai hash, dengan README/.gitignore asli di arsip dokumentasi. `docs/export/VERIFICATION.md` memuat hasil pengujian clean export, pengecekan lockfile, build, dan pengecualian paket.

Yang tidak dimasukkan: node_modules, dist, .git, environment berisi secrets, cache/build state, log, credential dan data localStorage pengguna. Semua itu bukan file source yang terlacak pada commit asal atau merupakan state yang harus dikelola terpisah.
