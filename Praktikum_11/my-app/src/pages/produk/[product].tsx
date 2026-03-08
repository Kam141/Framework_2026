import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const HalamanProduk = () => {
  // const Router = useRouter();
  // console.log(Router);

  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    `/api/products/${query.product}`,
    fetcher
  );

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk: {query.product}</p>
    </div>
  );
};

export default HalamanProduk;