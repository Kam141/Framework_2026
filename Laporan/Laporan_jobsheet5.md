# Laporan Praktikum: Styling pada Next.js

**Mata Kuliah:** Pemrograman Framework  
**Topik:** Styling pada Next.js
**Nama:** Kamila Habiba Putri Ananta  
**NIM:** 2341720175
---

## 1. Global CSS
Penerapan style yang berlaku untuk seluruh aplikasi melalui file `globals.css`.

* **Penjelasan:** Digunakan untuk reset CSS dasar seperti `box-sizing`, `margin`, dan `padding`, serta styling elemen umum seperti tag `body` atau `a`.
* **Gambar:**
![Global CSS Screenshot](url_gambar_anda_disini)

---

## 2. CSS Module (Local Scope)
Styling yang bersifat lokal sehingga tidak akan bentrok antar class di komponen yang berbeda.

* **Penjelasan:** Setiap komponen memiliki file CSS sendiri (misalnya `navbar.module.css`) yang di-import sebagai objek `styles` untuk memastikan scope lokal[cite: 120, 190, 225].
* **Gambar:**
![CSS Module Screenshot](url_gambar_anda_disini)

---

## 3. Conditional Rendering Navbar
Teknik untuk menyembunyikan Navbar pada halaman tertentu seperti Login dan Register[cite: 310].

* **Penjelasan:** Menggunakan `useRouter` untuk mengecek `pathname`. Jika rute termasuk dalam daftar `disableNavbar`, maka komponen Navbar tidak akan dirender[cite: 312, 313, 317].
* **Gambar:**
![Conditional Rendering Screenshot](url_gambar_anda_disini)

---

## 4. Refactoring Struktur Project (Best Practice)
Memindahkan logika UI dari folder `pages` ke folder `views` agar proyek lebih rapi dan mudah dikembangkan.

* **Penjelasan:** Folder `pages` hanya digunakan untuk mendefinisikan routing, sedangkan tampilan visual dan logika UI dikelola di dalam folder `src/views`.
* **Gambar:**
![Refactoring Structure Screenshot](url_gambar_anda_disini)

---

## 5. Inline Styling (CSS-in-JS)
Pemberian style langsung pada elemen JSX menggunakan atribut `style`.

* **Penjelasan:** Menggunakan format *camelCase* (seperti `borderRadius`) dan sangat cocok untuk styling yang bersifat kecil atau dinamis.
* **Gambar:**
![Inline Styling Screenshot](url_gambar_anda_disini)

---

## 6. SCSS (SASS)
Manajemen style yang lebih kompleks menggunakan fitur variabel dan nesting.

* **Penjelasan:** Menggunakan variabel `$schema` untuk menyimpan palet warna global agar manajemen warna tetap konsisten di seluruh proyek.
* **Gambar:**
![SCSS Screenshot](url_gambar_anda_disini)

---

## 7. Tailwind CSS
Framework CSS utility-first untuk proses styling yang cepat dan konsisten.

* **Penjelasan:** Styling dilakukan dengan menerapkan kelas-kelas utilitas langsung pada elemen JSX, seperti `text-3xl`, `font-bold`, dan `text-blue-600`.
* **Gambar:**
![Tailwind CSS Screenshot](url_gambar_anda_disini)

---

## Tugas Praktikum Selesai

* **Tugas 1**: Membuat halaman Register menggunakan pendekatan **CSS Module** untuk styling lokal.
* **Tugas 2**: Melakukan **Refactor** pada halaman Produk dengan memindahkan tampilannya ke dalam folder `views`.
* **Tugas 3**: Membuat **Hero Section** dan **Main Section** yang terpisah dengan menerapkan **Tailwind CSS** minimal 5 utility class.