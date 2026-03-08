# Laporan Praktikum
## Static Site Generation (SSG)

**Mata Kuliah:** Pemrograman Berbasis Framework  
**Topik:** Perbandingan CSR vs SSR vs SSG  

---




## 2.2 Static Site Generation (SSG)

Static Site Generation adalah metode rendering dimana HTML halaman dibuat pada saat proses **build aplikasi**, sehingga halaman yang dikirim ke browser sudah berupa file statis.

### Alur kerja SSG

```bash
npm run build
↓
Next.js mengambil data
↓
Generate HTML statis
↓
Disimpan sebagai file statik
↓
Dikirim ke browser saat request
```

Data pada halaman SSG **tidak akan berubah sampai dilakukan build ulang aplikasi**.

---

## 2.3 Perbandingan CSR, SSR, dan SSG

| Aspek | CSR | SSR | SSG |
|------|------|------|------|
| Waktu Fetch | Client | Runtime | Build Time |
| Skeleton | Ada | Tidak | Tidak |
| Update Data | Real-time | Real-time | Harus build ulang |
| Cocok untuk | Dashboard | E-commerce | Landing Page |

Dari tabel tersebut dapat disimpulkan bahwa setiap metode rendering memiliki karakteristik dan penggunaan yang berbeda tergantung kebutuhan aplikasi.

---

# 3. Praktikum

## 3.1 Bagian 1 — Setup Halaman Static

Pada tahap ini dibuat halaman **Static Site Generation** menggunakan Next.js.

### Gambar Hasil Setup

![gambar](Media/Praktikum_10/1.png)

### Penjelasan

Halaman static dibuat menggunakan method **getStaticProps()** yang berfungsi mengambil data saat proses build. Data produk kemudian dikirim sebagai props ke komponen halaman untuk ditampilkan.

Perbedaan utama dengan SSR adalah **nama method yang digunakan**, dimana SSR menggunakan `getServerSideProps` sedangkan SSG menggunakan `getStaticProps`.

---

# 3.2 Bagian 2 — Build Production Mode

Setelah halaman static dibuat, langkah selanjutnya adalah melakukan build aplikasi.

### Langkah yang dilakukan

1. Memindahkan beberapa folder seperti:

```bash
views
utils
styles
```

agar berada di luar folder pages untuk menghindari error.

2. Menjalankan perintah:

```bash
npm run build
```

3. Menjalankan aplikasi production:

```bash
npm run start
```

### Gambar Build

![Halaman](Media/Praktikum_10/2.png)

### Penjelasan

Perintah `npm run build` akan membuat versi production dari aplikasi.  
Pada tahap ini Next.js akan melakukan **pre-render halaman SSG menjadi file HTML statis**.

File HTML tersebut kemudian disimpan dan akan dikirim langsung ke browser saat halaman diakses.

---

# 3.3 Bagian 3 — Akses Halaman Static

Setelah build berhasil dilakukan, halaman dapat diakses melalui:

```bash
http://localhost:3000/products/static
```

### Gambar Halaman Static

![gambar](Media/Praktikum_10/3.png)

### Penjelasan

Halaman ini menampilkan daftar produk yang diambil dari API pada saat proses build. Data yang ditampilkan tidak berubah secara otomatis ketika database mengalami perubahan.

---

# 3.4 Bagian 4 — Pengujian Perubahan Data

Pada tahap ini dilakukan pengujian dengan menambahkan data baru pada database Firebase.

### Gambar Penambahan Data

```
Masukkan screenshot penambahan data di Firebase
```

### Hasil Pengujian

#### CSR
![gambar](Media/Praktikum_10/4_CSR_skeleton.png)
#### SSR
![gambar](Media/Praktikum_10/4_SSR.png)
#### SSG
![gambar](Media/Praktikum_10/4_ssg.png)

| Halaman | Metode | Hasil |
|------|------|------|
| /products | CSR | Data bertambah | 
| /products/server | SSR | Data bertambah |
| /products/static | SSG | Data tidak berubah |

### Penjelasan

Setelah data ditambahkan ke database, dilakukan pengecekan pada tiga halaman berbeda.

Hal ini terjadi karena **SSG hanya mengambil data saat proses build**, sehingga perubahan database tidak langsung ditampilkan.

---

# 3.5 Uji Build Ulang

Untuk menampilkan data terbaru pada halaman SSG dilakukan proses build ulang.

### Langkah

```bash
npm run build
npm run start
```

Setelah halaman direfresh, data baru akan muncul pada halaman static.

### Gambar Hasil Setelah Build

![gambar](Media/Praktikum_10/4_BuildUlang.png)

### Penjelasan

Proses build ulang menyebabkan Next.js mengambil kembali data terbaru dari API dan membuat ulang file HTML statis sehingga halaman menampilkan data terbaru.

---

# Tugas Praktikum

Pada tugas ini dibuat tiga jenis halaman dengan metode rendering berbeda.

### Halaman yang dibuat

1. CSR (Client Side Rendering)
![tugas](Media/Praktikum_10/tugas1_CSR.png)

2. SSR (Server Side Rendering)
![tugas](Media/Praktikum_10/tugas1_server.png)

3. SSG (Static Site Generation)
![tugas](Media/Praktikum_10/tugas1_static.png)

### Pengujian yang dilakukan

1. Menambahkan data pada database

    - CSR
    ![tugas](Media/Praktikum_10/tugas2_CSR_tambah.png)

    - SSR
    ![tugas](Media/Praktikum_10/tugas2_SSR_tambah.png)

    - SSG
    ![tugas](Media/Praktikum_10/tugas2_SSG_tambah.png)

2. Menghapus data pada database
    - CSR
    ![tugas](Media/Praktikum_10/tugas2_CSR_kurang.png)

    - SSR
    ![tugas](Media/Praktikum_10/tugas2_SSR_kurang.png)

    - SSG
    ![tugas](Media/Praktikum_10/tugas2_SSG_kurang.png)

3. Membandingkan hasil perubahan data pada masing-masing metode rendering

### Hasil Pengujian

| Metode | Hasil Perubahan Data |
|------|------|
| CSR | Data berubah secara langsung |
| SSR | Data berubah setiap request |
| SSG | Data tidak berubah sebelum build ulang |

---

# Studi Analisis

## 1. Mengapa SSG tidak menampilkan data terbaru?

Karena pada metode SSG data diambil saat proses **build aplikasi**. Setelah halaman dibangun menjadi file HTML statis, halaman tersebut tidak akan mengambil data baru dari server sampai dilakukan build ulang.

---

## 2. Mengapa SSG lebih cepat?

SSG lebih cepat karena halaman sudah berupa **file HTML statis** yang siap dikirim ke browser. Server tidak perlu memproses data atau merender halaman setiap request sehingga waktu respon menjadi lebih cepat.

---

## 3. Kapan SSG tidak cocok digunakan?

SSG tidak cocok digunakan pada aplikasi yang membutuhkan data **real-time atau sering berubah**, seperti dashboard admin, sistem monitoring, atau aplikasi yang memerlukan update data secara langsung.

---

## 4. Mengapa e-commerce tidak cocok menggunakan SSG murni?

Pada e-commerce data seperti stok produk, harga, dan promo dapat berubah sewaktu-waktu. Jika menggunakan SSG murni, perubahan tersebut tidak langsung terlihat oleh pengguna sehingga dapat menyebabkan informasi yang ditampilkan tidak akurat.

---

## 5. Apa perbedaan build mode dan development mode?

### Development Mode

- Digunakan saat proses pengembangan
- Menyediakan hot reload
- Tidak dioptimasi untuk performa

### Production / Build Mode

- Digunakan untuk deployment aplikasi
- Kode sudah dioptimasi
- Halaman SSG sudah di-generate menjadi HTML statis

---