# Laporan Praktikum : Dynamic Routing & Static Generation (CSR, SSR, SSG)

**Mata Kuliah:** Pemrograman Framework  
**Topik:** Detail Produk menggunakan Dynamic Routing pada Next.js  

---



## Bagian 1 – Membuat Dynamic Route

### Penjelasan Singkat
Dynamic Routing pada Next.js digunakan untuk membuat halaman dinamis berdasarkan parameter URL.  
Pada praktikum ini dibuat file **`[product].tsx`** sehingga setiap produk memiliki halaman detail yang berbeda berdasarkan **ID produk** pada URL.

Ketika pengguna mengklik produk pada halaman daftar produk, aplikasi akan mengarahkan ke halaman detail sesuai parameter produk.

### Gambar
![Dynamic Route](Media/Praktikum_11/js%2011%20langkah%201.gif)

---

# Bagian 2 – Implementasi CSR (Client Side Rendering)

### Penjelasan Singkat
Pada metode **CSR**, data produk diambil dari API setelah halaman dimuat di browser.

Pengambilan data dilakukan menggunakan:

- `useRouter()` untuk mengambil parameter URL
- `useSWR` atau `fetch` untuk mengambil data dari API

Karena data diambil setelah halaman dirender, maka biasanya muncul **loading state** sebelum data ditampilkan.

### Gambar

Response API produk:

![API Response](media/Praktikum_11/2_2.png)

Tampilan halaman detail produk:

![Detail Produk](media/Praktikum_11/js%2011%20langkah%202_3.gif)

---

# Bagian 3 – Implementasi SSR (Server Side Rendering)

### Penjelasan Singkat
Pada metode **SSR**, data produk diambil di server menggunakan fungsi **getServerSideProps** sebelum halaman dikirim ke browser.

Dengan metode ini:

- Data sudah tersedia saat halaman dimuat
- Tidak membutuhkan loading state
- Lebih baik untuk SEO

### Gambar

Tampilan halaman SSR:

![SSR Produk](media/Praktikum_11/js%2011%20langkah%203.gif)

---

# Bagian 4 – Implementasi Static Site Generation (SSG)

### Penjelasan Singkat
Metode **SSG** membuat halaman statis saat proses **build** menggunakan:

- `getStaticProps`
- `getStaticPaths`

Halaman akan dibuat saat build sehingga performanya sangat cepat.

Namun jika ada produk baru di database, halaman tidak akan muncul sampai dilakukan **build ulang**.

### Gambar

Tampilan halaman detail produk SSG:

![SSG Produk](media/Praktikum_11/4.png)

---

# Tugas Praktikum

## Tabel Perbandingan Rendering

| Aspek | CSR | SSR | SSG |
|------|------|------|------|
| Loading | Ada loading | Tidak ada loading | Tidak ada loading |
| Build Required | Tidak | Tidak | Ya |
| SEO | Kurang optimal | Baik | Baik |
| Perubahan Data | Real-time | Real-time | Perlu build ulang |

---

# Dokumentasi


### Screenshot Halaman
![Halaman Produk](images/produk-page.png)

### Network Tab (CSR)
![Network Tab](images/network-tab.png)


---

# Pertanyaan Analisis

### 1. Mengapa getStaticPaths wajib pada dynamic SSG?
Karena Next.js harus mengetahui daftar parameter halaman yang akan dibuat saat proses build.  
`getStaticPaths` digunakan untuk menentukan halaman mana saja yang akan digenerate secara statis.

---

### 2. Mengapa CSR membutuhkan loading state?
Karena data diambil setelah halaman dirender di browser. Selama proses pengambilan data berlangsung, halaman belum memiliki data sehingga perlu menampilkan loading.

---

### 3. Mengapa SSG tidak menampilkan produk baru tanpa build ulang?
Karena halaman statis dibuat saat proses build. Jika ada produk baru setelah build selesai, halaman tersebut belum digenerate.

---

### 4. Mana metode terbaik untuk halaman detail e-commerce?
Biasanya **SSR**, karena data selalu terbaru dan tetap memiliki SEO yang baik.

---

### 5. Apa risiko menggunakan SSG untuk produk yang sering berubah?
Risikonya adalah **data tidak selalu update**, karena perubahan data tidak langsung tercermin pada halaman tanpa melakukan build ulang.

---

# Kesimpulan

Dynamic Routing pada Next.js memungkinkan pembuatan halaman detail produk secara dinamis.  
Terdapat tiga metode rendering yang dapat digunakan:

- **CSR**: Data diambil di browser
- **SSR**: Data diambil di server
- **SSG**: Halaman dibuat statis saat build

Setiap metode memiliki kelebihan dan kekurangan tergantung kebutuhan aplikasi.