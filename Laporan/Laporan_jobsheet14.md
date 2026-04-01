

# LAPORAN PRAKTIKUM


* Mata Kuliah: Pemrograman Framework
* Topik: istem Autentikasi & Proteksi Route (NextAuth)


---



## LANGKAH PRAKTIKUM

### 1. Install NextAuth

Menginstall library NextAuth untuk kebutuhan autentikasi.

![Image](Media/Praktikum_14/bagian_1.png)

---

### 2. Konfigurasi API Auth

Membuat file `[...nextauth].ts` sebagai backend autentikasi.


---

### 3. Menambahkan Secret

Menambahkan `NEXTAUTH_SECRET` untuk keamanan JWT.


---

### 4. Session Provider

Digunakan agar frontend bisa mengakses session user.

---

### 5. Login & Logout

Menambahkan tombol login dan logout menggunakan NextAuth.

![Image](Media/Praktikum_14/js14_bagian5.gif)

![Image](Media/Praktikum_14/bagian5.png)
![Image](Media/Praktikum_14/js14_bagian5_3.gif)

---

### 6. Menampilkan Session

Mengambil data session menggunakan `useSession()`.

![Image](Media/Praktikum_14/bagian5.png)

---

### 7. Menambahkan Full Name

Menambahkan data tambahan (fullname) ke JWT dan session.

!![Image](Media/Praktikum_14/js14_menambahkan%20data.gif)

---

### 8. Halaman Profile

Menampilkan halaman profile yang berisi data user login.

![Image](Media/Praktikum_14/js%2014_profile.png)

---

### 9. Proteksi Route (Middleware)

Menggunakan middleware untuk membatasi akses halaman tertentu.

---

### 10. Pengujian

* Belum login → redirect
![Image](Media/Praktikum_14/js14_uji_1.gif)
* Sudah login → bisa akses
![Image](Media/Praktikum_14/js14_uji_2.gif)
* Logout → tidak bisa akses lagi 
![Image](Media/Praktikum_14/js14_uji_3.gif)

---

## TUGAS PRAKTIKUM

### 1. Implementasi Credentials Provider

Login berhasil menggunakan email dan password.
![Image](Media/Praktikum_14/js14_bagian5_3.gif)

### 2. Tambah Full Name

Field fullname ditambahkan pada proses login.
![Image](Media/Praktikum_14/js14_bagian5_3.gif)

### 3. Menampilkan Full Name

Nama user berhasil ditampilkan di navbar dan profile.
![Image](Media/Praktikum_14/js14_menambahkan%20data.gif)
![Image](Media/Praktikum_14/js%2014_profile.png)

### 4. Halaman Profile

Halaman profile berhasil dibuat dan menampilkan data user.
![Image](Media/Praktikum_14/js%2014_profile.png)

### 5. Proteksi Halaman

Halaman profile hanya bisa diakses saat login.
![Image](Media/Praktikum_14/js14_uji_1.gif)
![Image](Media/Praktikum_14/js14_uji_2.gif)

### 6. Dokumentasi

* Screenshot login 
![Image](Media/Praktikum_14/js14_bagian5_3.gif)
* Screenshot session 
![Image](Media/Praktikum_14/bagian5.png)
* Screenshot middleware 
![Image](Media/Praktikum_14/js14_uji_1.gif)
![Image](Media/Praktikum_14/js14_uji_2.gif)
![Image](Media/Praktikum_14/js14_uji_3.gif)

---

## PERTANYAAN ANALISIS

 1. Mengapa session menggunakan JWT?

    **Jawab**:
Karena JWT bersifat **stateless**, sehingga tidak perlu menyimpan session di server dan lebih efisien untuk aplikasi modern.


 2. Perbedaan authorize() dan jwt()
    
    **Jawab**:
    * `authorize()` → validasi login user
    * `jwt()` → menyimpan data user ke dalam token



 3. Mengapa middleware perlu getToken()?

    **Jawab**:
Untuk **mengecek apakah user sudah login atau belum** sebelum mengakses halaman tertentu.



 4. Risiko jika NEXTAUTH_SECRET tidak digunakan?

    **Jawab**:
    * Token bisa dimanipulasi
    * Session tidak aman
    * Bisa menyebabkan error autentikasi


 5. Perbedaan autentikasi dan otorisasi

    **Jawab**:
    * Autentikasi → verifikasi identitas user
    * Otorisasi → menentukan hak akses user

---

##  KESIMPULAN

NextAuth mempermudah implementasi sistem login pada Next.js dengan:

* Credentials login
* Session berbasis JWT
* Middleware untuk proteksi halaman

Sehingga aplikasi menjadi **lebih aman dan terstruktur**.

---

