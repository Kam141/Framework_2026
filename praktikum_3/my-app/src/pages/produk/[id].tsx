import { useRouter } from "next/router";

const ProdukDetail = () => {
  const router = useRouter();
//   const { id } = router.query;

  return (
    <div>
      <h1>Detail Produk</h1>
      <p>Produk: </p>
    </div>
  );
};

export default ProdukDetail;