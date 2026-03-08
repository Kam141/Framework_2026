import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "@/views/DetailProduk";

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
      <DetailProduk products={isLoading ? [] : data?.data || []} />
    </div>
  );
};

export default HalamanProduk;