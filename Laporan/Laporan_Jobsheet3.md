#  Laporan Praktikum: Routing & Layouting pada Next.js
**Mata Kuliah:** Pemrograman Framework

**Topik:** Pages Router (Static, Nested, Dynamic Routing & Layouting)

**Program Studi:** D4 Sarjana Terapan 

**Nama:** Kamila Habiba Putri Ananta

---

## 1. Routing Dasar (Static Routing)
Membuat file rute statis di dalam folder `pages/
- `pages/index.tsx` (Home) 
- `pages/about.tsx` (Halaman About) 

### Hasil & Penjelasan
![hasil](media/Praktikum_3/Screenshot%202026-02-19%20214242.png)
**Penjelasan:** Next.js secara otomatis memetakan file di dalam folder `pages/` menjadi rute URL tanpa konfigurasi tambahan.

---

## 2. Routing Menggunakan Folder
Mengubah struktur file `about.tsx` menjadi folder
- `pages/about/index.tsx` 

### Hasil & Penjelasan
![hasil](media/Praktikum_3/Screenshot%202026-02-19%20222945.png)
**Penjelasan:** File `index.tsx` di dalam sebuah folder mewakili root rute dari folder tersebut, membuat struktur proyek lebih rapi.

---

## 3. Nested Routing (Rute Bersarang)
Membuat folder bertingkat untuk fitur pengaturan
- `pages/setting/user.tsx` 
- `pages/setting/app.tsx` 

### Hasil
![hasil](Media/Praktikum_3/Screenshot%202026-02-22%20014905.png)

![hasil](media/Praktikum_3/Screenshot%202026-02-22%20014849.png)

Modifikasi struktur folder pages dengan menambahkan folder user dan user.tsx pada setting dipindah ke folder user dan rubah file user.tsx menjadi index.tsx 

### Hasil
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20015345.png)


Lalu dikembangkan lebih dalam menjadi
- `pages/setting/user/password/index.tsx` 

![hasil](media/Praktikum_3/Screenshot%202026-02-22%20015650.png)

---

## 4️. Dynamic Routing (Rute Dinamis)
**a. Membuat Halaman Produk** 

Memodifikasi index.tsx dan [id].tsx. Lalu Buka browser http://localhost:3000/produk/sepatu tambahkan segment sepatu

### Hasil
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20020605.png)

Melakukan pengecekan melalui console.log
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20020945.png)

**b. Modifikasi [id].tsx agar dapat mengambil nilai dari id**
- `pages/produk/[id].tsx` 

Menggunakan `useRouter` untuk menangkap parameter
```tsx
import { useRouter } from "next/router";

const HalamanProduk = () => {
  const { query } = useRouter();
  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk: {query.id}</p>
    </div>
  );
};
export default HalamanProduk;
```

### Hasil
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20021441.png)
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20021514.png)
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20021528.png)

----
## 5. Membuat Komponen Navbar

a. Membuat navbar hanya akan muncul pada index page, pada page lainnya  navbar tidak akan muncul.
- Halaman index.tsx
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20023728.png)

- halaman lainya
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20023746.png)

**b. Modifikasi navbar agar tampil di semua page**
- Halaman index.tsx
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20024419.png)

- halaman lainya
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20024433.png)
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20024455.png)
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20024517.png)

---
## 6. Membuat Layout Global (App Shell)

### Hasil

![hasil](media/Praktikum_3/Screenshot%202026-02-22%20030749.png)

---
## 7. Implementasi Layout di _app.tsx 

### Hasil

![hasil](media/Praktikum_3/Screenshot%202026-02-22%20030759.png)

---
## Tugas
**Tugas 1 – Routing** 
 ![hasil](media/Praktikum_3/js%203.gif)

**Tugas 2 – Dynamic Routing**
![hasil](media/Praktikum_3/js%203%20tugas%202.gif) 

**Tugas 3 – Layout** 
![hasil](media/Praktikum_3/Screenshot%202026-02-22%20195553.png)