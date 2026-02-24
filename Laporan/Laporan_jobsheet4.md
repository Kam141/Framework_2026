# Laporan Praktikum:  Catch-All Routing, Linking & Navigating - Next.js

**Mata Kuliah:** Pemrograman Framework  
**Topik:** Catch-All Route, Navigation, Redirect  
**Nama:** Kamila Habiba Putri Ananta  
**NIM:** 2341720175  

---

# Langkah 1 – Menjalankan Project

Menjalankan server Next.js menggunakan perintah:

```bash
npm run dev
```

Akses di browser:
```
http://localhost:3000
```

---

# Langkah 2 – Membuat Catch-All Route

Membuat file:

```
pages/category/[...slug].js
```

Digunakan untuk menangkap banyak segmen URL dan menyimpannya dalam bentuk array.

### Hasil
![Langkah 2](Media/Praktikum_4/Screenshot%202026-02-23%20212127.png)


### Cek di console
![Langkah 2](Media/Praktikum_4/Screenshot%202026-02-23%20212145.png)


### Modifikasi query untuk menampilkan nilai query   
![Langkah 2](Media/Praktikum_4/Screenshot%202026-02-23%20213111.png)

---

# Langkah 3 – Pengujian Catch-All Route

![Langkah 3](Media/Praktikum_4/Screenshot%202026-02-23%20213607.png)
![Langkah 3](Media/Praktikum_4/Screenshot%202026-02-23%20213624.png)
![Langkah 3](Media/Praktikum_4/Screenshot%202026-02-23%20213638.png)

Jika dilihat ada yang terbaca undifined dan ada yang tidak terbaca ini dikarena segmennya dibatasi 
Cuma array[0] dan array[1]. Oleh karena itu modifikasi `[…slug].tsx` agar berapapun banyaknya segmen tetap terbaca

### Hasil
![Langkah 3](Media/Praktikum_4/Screenshot%202026-02-23%20214221.png)

---

# Langkah 4 –  Optional Catch-All Route 

Jika menggunakan `[...slug].js` maka ketika mengakses shop akan terjadi error. Solusinya adalah dengan Rename file: `[...slug].js` menjadi `[[...slug]].js `

### Hasil
![Langkah 4](Media/Praktikum_4/Screenshot%202026-02-23%20214258.png)

![Langkah 4](Media/Praktikum_4/Screenshot%202026-02-23%20224956.png)

![Langkah 4](Media/Praktikum_4/Screenshot%202026-02-23%20225010.png)

---

# Langkah 5 – Validasi Parameter
Menambahkan validasi agar tidak error saat slug kosong

### Hasil
![Langkah 5](Media/Praktikum_4/Screenshot%202026-02-23%20225516.png)
![Langkah 5](Media/Praktikum_4/Screenshot%202026-02-23%20225527.png)

---

# Langkah 6 – – Membuat Halaman Login & Register 


### Hasil
![Langkah 6](Media/Praktikum_4/js%204%20langkah%205.gif)

---

# Langkah 7 – Navigasi Imperatif (router.push)

Menambahkan tombol login yang akan mengarahkan ke halaman `/produk` menggunakan navigasi imperatif.
Navigasi terjadi saat tombol diklik tanpa melakukan reload halaman.

### Hasil
![Langkah 7](Media/Praktikum_4/js%204%20langkah%207.gif)

---

# Langkah 8 – Simulasi Redirect (Belum Login)

Pada halaman `/produk`, ditambahkan pengecekan status login menggunakan `localStorage`.

Jika user belum login, maka otomatis diarahkan ke halaman login.

```javascript
useEffect(() => {
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    router.replace("/auth/login");
  }
}, []);
```

Redirect menggunakan `replace()` agar tidak bisa kembali ke halaman sebelumnya dengan tombol back.

### Hasil
![Langkah 8](Media/Praktikum_4/js%204%20langkah%208.gif)

---

#  Tugas Praktikum

## Tugas 1 (Wajib)

Membuat catch-all route:

```
/category/[...slug].js
```

Menampilkan seluruh parameter URL dalam bentuk list.

### Hasil
![Tugas 1](Media/Praktikum_4/js%204%20tugas%201.gif)

---

## Tugas 2 (Wajib)

Membuat navigasi:

- Login → Product (Imperatif menggunakan `router.push`)
- Login ↔ Register (Menggunakan `Link`)

### Hasil
![Tugas 2](Media/Praktikum_4/js%204%20tugas%202.gif)

---

## Tugas 3 (Pengayaan)

Menerapkan redirect otomatis ke login jika user belum login saat mengakses halaman product.


### Hasil
![Tugas 3](Media/Praktikum_4/js%204%20tugas%203.gif)

---

#  Pertanyaan Evaluasi

### 1. Apa perbedaan `[id].js` dan `[...slug].js`?

- `[id].js` digunakan untuk menangkap **satu parameter saja** pada URL.  
  Contoh:  
  ```
  /product/1
  ```
  Maka `id = 1`.

- `[...slug].js` digunakan untuk menangkap **banyak segmen URL sekaligus** dan hasilnya berbentuk array.  
  Contoh:  
  ```
  /shop/clothes/tops/t-shirt
  ```
  Maka `slug = ["clothes", "tops", "t-shirt"]`.

---

### 2. Mengapa `slug` berbentuk array?

Karena catch-all route (`[...slug].js`) dirancang untuk menangkap lebih dari satu segmen URL.  
Setiap bagian URL yang dipisahkan dengan `/` akan disimpan sebagai elemen dalam array.

Contoh:
```
/category/makanan/minuman
```

Maka:
```javascript
slug = ["makanan", "minuman"]
```

---

### 3. Kapan sebaiknya menggunakan `Link` dan `router.push()`?

- `Link` digunakan untuk navigasi biasa antar halaman (deklaratif), seperti menu atau navbar.
- `router.push()` digunakan untuk navigasi berdasarkan aksi atau kondisi tertentu (imperatif), seperti setelah login atau submit form.

---

### 4. Mengapa navigasi Next.js tidak me-refresh halaman?

Karena Next.js menggunakan **client-side routing**.  
Perpindahan halaman dilakukan oleh JavaScript tanpa meminta ulang seluruh halaman ke server, sehingga prosesnya lebih cepat dan tidak terjadi reload.

---
