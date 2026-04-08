import DetailProduk from "@/views/DetailProduk";
import { ProductType } from "@/types/product.type";
import { GetServerSideProps } from "next";

// Komponen utama tetap simpel karena data sudah di-fetch di server
const HalamanProduk = ({ products }: { products: ProductType }) => {
  return (
    <div>
      {/* Pastikan prop yang dikirim ke DetailTodo sesuai dengan nama yang diharapkan di views */}
      <DetailProduk products={products} />
    </div>
  );
};

export default HalamanProduk;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Ambil parameter 'id' dari URL (sesuai nama file [id].tsx)
  const id = params?.id;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/id/${id}`);
    const response = await res.json();

    // LOGIKA PERBAIKAN:
    // Jika API mengembalikan array, kita ambil index ke-0 saja.
    // Jika API langsung mengembalikan objek, gunakan response.data.
    const dataDetail = Array.isArray(response.data) ? response.data[0] : response.data;

    if (!dataDetail) {
      return {
        notFound: true, // Menampilkan halaman 404 jika data kosong
      };
    }

    return {
      props: {
        products: dataDetail, // Kirim satu objek saja ke komponen
      },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      notFound: true,
    };
  }
};