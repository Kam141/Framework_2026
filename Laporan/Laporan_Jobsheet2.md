# Laporan Praktikum: Setup Project Next.js (Pages Router)

**Mata Kuliah:** Pemrograman Framework

**Program Studi:** D4 Sarjana Terapan 

**Topik:** Setup Project Next.js menggunakan Pages Router 

**Nama:** Kamila Habiba Putri Ananta

---

## Langkah 1. Persiapan Lingkungan
Sebelum memulai project, dilakukan pengecekan versi perangkat lunak untuk memastikan lingkungan pengembangan siap digunakan.
![Hasil Persiapan](media/praktikum_1/Screenshot%202026-02-16%20175018.png)

---

## Langkah 2. Pembuatan Project 
Project dibuat menggunakan perintah `npx create-next-app@13.4.7` untuk memastikan penggunaan versi yang spesifik sesuai panduan
* **Nama Project:** `my-app` 
* **Konfigurasi:** Menggunakan `src/ directory` dan memilih **No** pada opsi App Router untuk menggunakan **Pages Router**

![Hasil Praktikum](media/praktikum_1/Screenshot%202026-02-16%20203710.png)

---

## Langkah 3. Menjalankan Server Development
Aplikasi dijalankan melalui terminal dengan perintah `npm run dev`
* **Akses Lokal:** `http://localhost:3000` 

**Hasil Tampilan Awal:**
![Hasil Praktikum](media/praktikum_1/Screenshot%202026-02-16%20203944.png)


---

## Langkah 4. Struktur Folder
Struktur utama project terdiri dari:
* `pages/`: Tempat utama untuk routing berbasis file
* `public/`: Untuk menyimpan aset statis seperti gambar/ikon
* `styles/`: Berisi file konfigurasi CSS global dan module
* `package.json`: Pengaturan dependensi dan script project


---

## Langkah 5. Modifikasi Halaman Utama
Melakukan perubahan pada file `pages/index.tsx` untuk menampilkan identitas praktikum

**Potongan Kode:**
```javascript
export default function Home() {
  return (
    <div>
      <h1>Praktikum Next.js Pages Router</h1>
      <p>Mahasiswa D4 Pengembangan Web</p>
    </div>
  )
}
``` 
**Hasil Modifikasi:**
![alt text](media/praktikum_1/Screenshot%202026-02-16%20204903.png)

---

## Langkah 6. Modifikasi API 
Mengubah file `api/hello.ts` untuk mengembalikan data JSON berupa nama dan alamat.

**Hasil Output API:**
![JSON Output](media/praktikum_1/Screenshot%202026-02-16%20205218.png)

![JSON Output](media/praktikum_1/Screenshot%202026-02-16%20205615.png)


---

## 7. Modifikasi Background & Global Styles 
Melakukan modifikasi pada file `_app.tsx` untuk mengatur tampilan global aplikasi[cite: 303, 308]. Dalam langkah ini, impor CSS global dinonaktifkan untuk melihat perubahan dasar.
![Hasil Praktikum](media/praktikum_1/Screenshot%202026-02-16%20205940.png)

---

## Tugas Praktikum 
### Tugas 1: Membuat Halaman About 
Membuat file `pages/about.js` yang menampilkan:
![Hasil Praktikum](Media/praktikum_1/Screenshot%202026-02-17%20205218.png)

### Tugas 2: Navigasi
Menambahkan komponen `<Link>` dari Next.js pada halaman utama untuk memudahkan navigasi ke halaman About.
![Hasil Praktikum](Media/praktikum_1/Recording%202026-02-17%20211025.gif)

---

## Refleksi
1. Mengapa Pages Router disebut routing berbasis file?

    Karena sistem routing ditentukan langsung dari nama dan struktur file dalam folder pages/.

2. Apa perbedaan Next.js dengan React standar (CRA)?

    Next.js memiliki fitur bawaan seperti routing otomatis dan optimasi performa, sedangkan CRA memerlukan konfigurasi tambahan.

3. Apa fungsi npm run dev?

    Untuk menjalankan server development untuk pengembangan aplikasi secara lokal.

4. Apa perbedaan npm run dev dan npm run build?

    - npm run dev → Mode pengembangan
    - npm run build → Build aplikasi untuk produksi