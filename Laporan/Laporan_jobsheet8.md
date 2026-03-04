# Laporan Praktikum — Client Side Rendering & Data Fetching (Next.js + SWR)



## Bagian 1 — Setup Data Produk (Firebase + API)


Siapkan data produk minimal punya `id, name, category, price, image`, dan buat endpoint **/api/products**. 
![Global CSS Screenshot](Media/Praktikum_8/1.png)

---

## Bagian 2 — Implementasi CSR dengan useEffect

![Struktur field di Firebase](Media/Praktikum_8/2.png)
Data diambil setelah halaman dirender di client, jadi butuh state loading + conditional rendering.

![Struktur field di Firebase](Media/Praktikum_8/2_1.png)
Menambahkan tampilan menggunakan `produk.module.scss`

---

## Bagian 3 — Skeleton Loading + Animasi

![Struktur field di Firebase](Media/Praktikum_8/js%208%20langkah%203.gif)
Skeleton tampil saat isLoading === true agar UX tidak kosong, lalu diganti konten asli saat data sudah ada. 

![Struktur field di Firebase](Media/Praktikum_8/js%208%20langkah%203%20bagian%202.gif)
Jika dijalankan akan muncul skeletonnya terlebih dahulu setelah itu muncul gambar
dan informasinya

---

## Bagian 5 — – Implementasi SWR
![Struktur field di Firebase](Media/Praktikum_8/js%208%20langkah%205.gif)
SWR mempermudah data fetching (loading/error) dan caching otomatis.

---

# Tugas 

## Tugas 1 

CSR (Client Side Rendering): Render awal minim, data diambil di browser setelah load → cocok app interaktif, ada delay awal.

SSR (Server Side Rendering): Render HTML di server tiap request → lebih SEO & konten cepat tampil, beban server lebih besar.

SSG (Static Site Generation): HTML dibuat saat build time → paling cepat, cocok konten jarang berubah.

## Tugas 2
Buat halaman produk dengan:

    o Skeleton loading
    o Animasi

Menaruh kode berikut pada `produk.module.scss`
```ts
&__skeleton {
      width: 200px;
      padding: 16px;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      display: flex;
      flex-direction: column;
      align-items: center;

      animation: identifier 1.5s infinite ease-in-out;
}
```
menghasilkan tampilan
![Struktur field di Firebase](Media/Praktikum_8/js%208%20langkah%203%20bagian%202.gif)



## Tugas 3
Refactor kode dari useEffect menjadi SWR!

useEffect manual diganti SWR agar fetch lebih rapi (loading/error) dan caching.

``` ts
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default fetcher;
```

hasilnya
![Struktur field di Firebase](Media/Praktikum_8/js%208%20langkah%205.gif)
