# Data yang perlu dipindahkan terpisah

## Yang sudah ikut ZIP

Semua data contoh di lib/data.ts, path peta lib/indonesia.ts, GeoJSON asli, font lokal, favicon, serta dokumen PDF dan DOC di public/documents. Tidak ada database SQL atau bucket aktif sehingga tidak ada SQL dump/bucket export yang hilang dari paket.

## Data browser

Perubahan workspace dan masukan hanya ada pada localStorage browser yang digunakan saat membuka Site. Data milik browser pengguna tidak dapat diambil dari Git/source. ZIP tidak menggabungkan data dari pengguna atau browser lain.

Key yang digunakan:

| Key | Isi |
| --- | --- |
| hidromet-demo-jobs-v1 | Data product simulasi, status, checksum dan catatan keputusan |
| hidromet-demo-feedback | Masukan lokal termasuk nama/topik/pesan bila pernah disimpan |

Untuk memindahkannya, buka Site asal pada browser/profil yang memiliki data, buka DevTools > Console, telaah lalu jalankan isi scripts/export/local-storage-export.js. Script hanya membaca dua key tersebut dan mengunduh JSON ke komputer. Script tidak membaca cookie, credential atau key lain dan tidak mengirim data ke jaringan.

Pada origin lokal http://localhost:5173, buka DevTools > Console lalu jalankan isi scripts/export/local-storage-import.js. Pilih JSON yang dihasilkan exporter. Script memvalidasi bentuk key dan record, lalu meminta konfirmasi sebelum mengganti dua key tujuan. Muat ulang halaman setelah selesai. Jalankan pada halaman aplikasi yang tepat, bukan halaman login.

Ini adalah helper ekspor tambahan yang dijalankan sendiri melalui DevTools. Helper tidak dipasang ke UI dan tidak mengubah file aplikasi. File JSON backup dapat memuat nama dan isi masukan; simpan sebagai data lokal dan tidak perlu dimasukkan ke repository source.

## Berkas CSV yang dipilih pada registrasi

Simulasi membaca CSV pada browser, memeriksa header wilayah/nilai/unit dan menghitung SHA-256. Byte berkas tidak diunggah atau disimpan sebagai objek server. localStorage hanya mempertahankan record/status/hash, bukan salinan CSV lengkap. Bila ingin menyimpan input aslinya, salin berkas CSV asli dari komputer pembuat secara terpisah.

## Layanan yang tidak ikut source

Domain, pengaturan akses platform, sesi/login ChatGPT, token deployment, credential Git, cache runtime dan data akun Cloudflare bukan bagian source aplikasi. D1/R2 belum aktif dan schema database masih kosong. Bila di masa depan Anda mengaktifkan database/storage, ekspor database dan objek melalui layanan tersebut sebelum memindahkan hosting.
