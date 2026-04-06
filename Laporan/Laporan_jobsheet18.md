# LAPORAN PRAKTIKUM

**Mata Kuliah:** Pemrograman Framework
**Topik:** Optimasi Performa Aplikasi Menggunakan Next.js

---

# PRAKTIKUM 1 – Image Optimization

## A. Optimasi Gambar Lokal

![Image](Media/Praktikum_18/error.png)


### Langkah:

* Membuka file `src/pages/404.tsx`
* Mengganti tag `<img>` menjadi `<Image>` dari Next.js
* Menambahkan atribut `width` dan `height`


Penggunaan `next/image` membuat gambar lebih optimal karena otomatis melakukan kompresi dan lazy loading.

---

## B. Optimasi Gambar Remote

![Image](Media/Praktikum_18/adidas.png)

### Langkah:

* Membuka file `views/product/index.tsx`
* Mengganti `<img>` dengan `<Image>`
* Menambahkan konfigurasi di `next.config.js`


Gambar dari URL eksternal harus didaftarkan di `next.config.js` agar bisa dioptimasi oleh Next.js. 

---

#  PRAKTIKUM 2 – Font Optimization

![Image](Media/Praktikum_18/font.png)

### Langkah:

* Membuka file `Appshell/index.tsx`
* Import font dari `next/font/google`
* Menggunakan font pada elemen utama


Font dimuat langsung oleh Next.js tanpa CDN sehingga lebih cepat dan tidak menyebabkan render blocking. 

---

# PRAKTIKUM 3 – Script Optimization

### Langkah:

* Membuka file `layouts/Navbar/index.tsx`
* Menambahkan `<Script>` dari Next.js
* Menggunakan strategy `lazyOnload`


Script dijalankan setelah halaman selesai dimuat sehingga tidak menghambat loading awal. 

---

# PRAKTIKUM 4 – Optimasi Avatar

![Image](Media/Praktikum_18/optimasi_avatar.png)
### Langkah:

* Mengganti `<img>` avatar menjadi `<Image>`
* Menambahkan domain Google pada `next.config.js`


Avatar dari Google perlu dikonfigurasi agar bisa di-load dan dioptimasi oleh Next.js.

---

# TUGAS PRAKTIKUM

### 1. Optimasi semua image
![Image](Media/Praktikum_18/optimasi_img_2.png)
![Image](Media/Praktikum_18/optimasi_img.png)

Menggunakan `next/image` agar lebih hemat bandwidth dan otomatis lazy loading.

### 2. Menggunakan font
![Image](Media/Praktikum_18/font.png)
Menggunakan minimal 1 font dari `next/font` untuk performa lebih baik.

### 3. Menambahkan Google Analytics
![Image](Media/Praktikum_18/3_1.png)
![Image](Media/Praktikum_18/3_2.png)
Menggunakan `next/script` agar script tidak blocking.

### 4. Dynamic Import
![Image](Media/Praktikum_18/4.png)
Menggunakan `dynamic import` untuk lazy loading komponen.

### 5. Dokumentasi performa
![Image](Media/Praktikum_18/5.png)
Menggunakan Lighthouse untuk melihat peningkatan performa.

---

# REFLEKSI & DISKUSI

### 1. Mengapa `<img>` biasa tidak optimal?

Karena tidak memiliki optimasi otomatis seperti lazy loading dan kompresi gambar.

### 2. Perbedaan font CDN dan next/font?

* CDN: load dari server luar, bisa blocking
* next/font: dioptimasi langsung oleh Next.js, lebih cepat

### 3. Mengapa script bisa membuat website lambat?

Karena script dapat blocking rendering jika dimuat di awal.

### 4. Kapan menggunakan dynamic import?

Saat komponen tidak perlu dimuat di awal (lazy loading).

### 5. Dampak bundle size terhadap UX?

Semakin besar bundle size, semakin lama loading sehingga UX menurun.
