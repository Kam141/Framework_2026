

# **LAPORAN PRAKTIKUM**



* Mata Kuliah: Pemrograman Framework
* Topik: Incremental Static Regeneration (ISR)
* Tujuan: Update halaman static tanpa build ulang





## **Langkah Praktikum**

### **C. Implementasi ISR Otomatis**

Menambahkan `revalidate` pada `getStaticProps`.

![gambar](Media/Praktikum_12/1_1_1.gif)
(Kode menunjukkan `revalidate: 10` artinya halaman diperbarui setiap 10 detik)

Penjelasan:

* Setiap 10 detik data akan dicek ulang
* Jika ada perubahan → cache diperbarui

---

### **2. Pengujian ISR**

Langkah:

1. Jalankan:

   * `npm run build`
   * `npm run start`
2. Tambahkan data baru di database Firebase

![gambar](Media/Praktikum_12/1_1_2.png)**


Hasil:

* Sebelum 10 detik → data lama
![gambar](Media/Praktikum_12/1_1_3.png)

* Setelah 10 detik → data baru muncul
![gambar](Media/Praktikum_12/1_2_1.gif)



---

## **D. On-Demand Revalidation**

Digunakan untuk update tanpa menunggu waktu revalidate.

### **1. Membuat API Revalidate**

![gambar](Media/Praktikum_12/2_1_1.png)

Penjelasan:

* Endpoint digunakan untuk trigger update manual
* Menggunakan `res.revalidate()`

---

### **2. Menambahkan Parameter**

![gambar](Media/Praktikum_12/2_1_2.png)

Contoh:

```
http://localhost:3000/api/revalidate?data=produk
```

Hasil:

* Jika benar → `revalidated: true`
![gambar](Media/Praktikum_12/2_2_1.png)

* Jika salah → error
![gambar](Media/Praktikum_12/2_2_2.png)


---

### **3. Menambahkan Token Security**

![gambar](Media/Praktikum_12/TOKEN.png)

Penjelasan:

* Token digunakan untuk keamanan endpoint
* Mencegah akses sembarangan

---

## **E. Pengujian Manual**

Akses:

```
http://localhost:3000/api/revalidate?data=products&token=12345678
```

![gambar](Media/Praktikum_12/2_3_1.png)
→ `revalidated: true`

![gambar](Media/Praktikum_12/2_3_2.png)
→ `revalidated: false`

---

## **G. Perbandingan SSG dan ISR**

| Aspek       | SSG               | ISR                |
| ----------- | ----------------- | ------------------ |
| Update Data | Harus build ulang | Otomatis / trigger |
| Cache       | Static permanen   | Static + refresh   |
| Cocok       | Konten tetap      | Semi-dinamis       |


---

## **G. Tugas Praktikum**

1. Tambahkan lagi produk pada firebase
[![Lihat Demo](Media/Praktikum_12/2_1_1.png)](https://drive.google.com/file/d/1Cmivds-nqzRsXFK9JyLWwLofdLM2JgFj/view?usp=sharing)

2. Implementasikan ISR dengan revalidate: 10.
![gambar](Media/Praktikum_12/revalidate.png)
Hasilnya:
![gambar](Media/Praktikum_12/1_1_1.gif)

3. Tambahkan endpoint On-Demand Revalidation.

![gambar](Media/Praktikum_12/on-demand.png)


4. Tambahkan validasi token.

5. Uji dengan:

- Token benar:
    
    ![gambar](Media/Praktikum_12/2_3_1.png)


- Token salah
![gambar](Media/Praktikum_12/2_3_2.png)


- Tanpa token
![gambar](Media/Praktikum_12/tugas_5.png)
---

## **H. Analisis**


1. **Mengapa ISR lebih fleksibel dibanding SSG?**
   
   **Jawab:** ISR lebih fleksibel karena halaman bisa diperbarui tanpa perlu build ulang. Data dapat berubah otomatis setelah waktu tertentu atau saat di-trigger.

2. **Apa perbedaan revalidate waktu dan on-demand?**
   
   **Jawab:** Revalidate waktu berjalan otomatis sesuai interval, sedangkan on-demand dilakukan manual melalui API saat dibutuhkan.


3. **Mengapa endpoint revalidation harus diamankan?**
   
   **Jawab:** Agar tidak disalahgunakan oleh pihak luar yang bisa memicu update sembarangan.


4. **Apa risiko jika token tidak digunakan?**
   
   **Jawab:** Endpoint bisa diakses siapa saja, sehingga rawan spam dan manipulasi data.

5. **Kapan ISR lebih cocok dibanding SSR?**
   
   **Jawab:** Saat data tidak perlu real-time, tapi tetap perlu update berkala dengan performa cepat.


---
