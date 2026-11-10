# Panduan hosting mandiri

## Konfigurasi asli tetap ada

.openai/hosting.json mempertahankan project_id asal dan d1/r2 null. Project ID adalah identitas, bukan API key atau izin deploy. Nilai ini tidak menghubungkan GitHub baru secara otomatis dan tidak menyertakan policy akses, token, atau sesi ChatGPT.

vite.config.ts, worker/index.ts, scripts/vite/* dan seluruh runtime helpers asli tetap dipertahankan. Clean checkout memilih profile portable; tidak perlu plugin ChatGPT atau akses ke /workspace untuk menjalankan npm run dev/build.

## Cloudflare Workers pada akun sendiri

1. Jalankan npm ci dan npm run build.
2. Miliki akun Cloudflare sendiri dan login menggunakan Wrangler jika ingin deploy.
3. Periksa nama worker pada wrangler.selfhost.example.jsonc dan sesuaikan bila diperlukan.
4. Uji paket tanpa menerbitkan:

```bash
npx wrangler deploy --config wrangler.selfhost.example.jsonc --dry-run
```

5. Jika memang hendak menerbitkan ke akun sendiri:

```bash
npx wrangler login
npx wrangler deploy --config wrangler.selfhost.example.jsonc
```

Perintah deploy tidak dijalankan oleh proses ekspor. Credential dan account ID diisi melalui akun/CI Anda sendiri. Auth gate ChatGPT Sites tidak ikut otomatis pada Workers mandiri. API dan dokumen akan mengikuti perlindungan akses yang Anda konfigurasikan.

## VPS Ubuntu

Source menggunakan Cloudflare Workers API dan Vite Cloudflare plugin. Build ini tidak boleh diasumsikan sebagai paket Next.js Node server biasa. Untuk pengembangan pada VPS, gunakan dev server atau emulator lokal pada loopback dan tunnel yang Anda kelola. Jangan menganggap npm run start/Wrangler dev sebagai deployment produksi.

Untuk server Node/Docker produksi diperlukan penyesuaian adapter/runtime yang diuji terpisah, termasuk dependency cloudflare:workers dan wrapper connector. Penyesuaian itu tidak dilakukan dalam ekspor karena tujuan paket adalah mempertahankan source asli. Untuk jalur yang paling dekat dengan runtime asli, gunakan Cloudflare Workers pada akun sendiri.

## GitHub

Repository GitHub hanya menyimpan source. Hosting aplikasi full-stack tidak tersedia hanya melalui GitHub Pages tanpa perubahan arsitektur karena terdapat dua route API dan runtime Worker. GitHub Actions dapat membangun/deploy ke hosting pilihan dengan credential pada repository secrets, bukan file .env yang di-commit.
