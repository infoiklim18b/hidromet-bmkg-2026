# Hasil verifikasi ekspor

Tanggal: 10 November 2026. Sumber: Site versi 1, commit `eeb5c1c7f079f0a793596359fe67c6d6cbb2d058`.

| Pemeriksaan | Hasil |
| --- | --- |
| Asal source | Commit lokal bersih sesuai source commit versi Site diterbitkan |
| Cakupan source | 123 dari 123 file Git-tracked tercakup; 121 tetap di path asli dengan byte identik, README/.gitignore asli disimpan pada docs/export |
| Source aplikasi dan desain | Tidak diubah; seluruh app/components/styles/assets/dependencies dipertahankan |
| Instalasi clean export | npm ci berhasil; 687 paket terinstal untuk platform Linux |
| Dependency tarballs | 887 URL resolved dalam lockfile seluruhnya memakai registry.npmjs.org |
| TypeScript | npx tsc --noEmit berhasil |
| Build portable | npm run build berhasil tanpa .sites-runtime/execution-profile.json managed |
| Output build | dist/client dan dist/server/index.js terbentuk |
| Dokumen PDF/DOC | Kedua file terbawa ke output build dan identik dengan public/documents |
| Konfigurasi mandiri | Wrangler dry-run berhasil; 38 modul tambahan, tanpa binding database/storage |
| Helper tambahan | Ketiga script ekspor lolos node --check |
| Secrets | Pengecualian file runtime/credentials dan scan pola literal credential, private key, JWT, GitHub/AWS/Sites token dilakukan; tidak ada temuan pola pada file ekspor |
| ZIP | CRC, daftar file, SHA-256 dan seluruh 123 hash source diperiksa setelah pembentukan arsip |
| Platform verifikasi | Linux, Node 24.22.1, npm 11.9.0 |
| Windows dan macOS | Instruksi disediakan; belum diuji langsung pada OS tersebut |
| Site aktif | Tidak diubah, tidak dipublish ulang; repository sumber tetap bersih |

## Isi dan pengecualian

Paket final berisi 138 file. Tambahan hanya dokumentasi, .env.example, konfigurasi hosting contoh, manifest integritas dan helper ekspor opsional. README dan .gitignore root diperluas untuk distribusi; versi asal keduanya ikut paket.

node_modules, dist, .git, tsbuildinfo, cache, log, environment nyata, credential dan localStorage pengguna tidak dikemas. Build dapat dihasilkan ulang melalui package.json dan lockfile asli. ZIP adalah snapshot source, bukan backup akun atau container runtime.

## Batas pengujian

Ekspor tidak mengubah aplikasi sehingga tidak ada pengujian ulang visual/browser pada ekspor ini. Pemeriksaan berfokus pada byte source, kelengkapan, instalasi clean, TypeScript, build portable dan dry-run hosting. Perintah dev/start didokumentasikan dari runner asli; server pada Windows/macOS belum dijalankan pada pengujian ekspor.

Scan pola bukan jaminan universal terhadap semua jenis informasi sensitif. File nyata environment/credential dan metadata Git sengaja tidak disertakan. Fixtures identitas lokal pada Vite plugin adalah mock bawaan, bukan akun atau credential nyata.

Jalankan `node scripts/export/verify-original.mjs` untuk menguji hash source kembali. FILE_CHECKSUMS.sha256 memuat hash seluruh file dalam ZIP kecuali dirinya sendiri.
