# Google form API Sample Node-js
### Pembuatan Google Cloud Console API untuk Gform API dengan Credentials OAuth

**Langkah 1: Membuat Project Google Cloud**

1. Buka https://console.cloud.google.com/.
2. Buat project baru atau pilih project yang sudah ada.
3. Buka menu **APIs & Services** > **Credentials**.
4. Klik **Create Credentials** > **OAuth client ID**.
5. Pilih **Web application** sebagai **Application type**.
6. Masukkan nama untuk client ID.
7. Klik **Create**.

**Langkah 2: Mengaktifkan Google Forms API**

1. Buka menu **APIs & Services** > **Library**.
2. Cari **Google Forms API** dan klik **Enable**.

**Langkah 3: Mendapatkan Credentials OAuth**

1. Kembali ke halaman **Credentials**.
2. Pilih client ID yang baru dibuat.
3. Klik tab **OAuth 2.0 client secrets**.
4. simpan clientid dan client secret

## Menjalankan Project NodeJS

1. **Instal Dependensi:**
   - Buka terminal dan masuk ke folder project NodeJS Anda.
   - Jalankan perintah:

     ```bash
     npm install
     ```

2. **Konfigurasi Variabel Environment:**
   - Buat salinan file `.env.example` dan beri nama `.env`.
   - Edit file `.env` dan isikan nilai untuk tiap variabel, contoh:

     ```
     CLIENT_ID=
     CLIENT_SECRET=
     JWT_SECRET="isi bebas"
     ```

3. **Menjalankan Project:**
   - Jalankan perintah di terminal:

     ```bash
     node app.js
     ```
