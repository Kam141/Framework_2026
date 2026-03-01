import { useRouter } from "next/router";

const ProdukDetail = () => {
//   const router = useRouter();
  const { query } = useRouter();
// console.log(router);

  return (
    <div>
      <h1>Detail Produk</h1>
      <p>Produk:  {query.id}</p>
    </div>
  );
};

export default ProdukDetail;