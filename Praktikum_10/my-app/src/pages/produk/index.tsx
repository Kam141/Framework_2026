import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import  TampilanProduk from "@/views/produk"
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";
// import styles from "./produk.module.css";

// type ProductType = {
//   id: string;
//   category: string;
//   image: string;
//   name: string;
//   price: number;
// };

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const kategori = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const { push } = useRouter();

  const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//   try {
//     const response = await fetch("/api/produk");
//     const responsedata = await response.json();
//     setProducts(responsedata.data);
//   } catch (error) {
//     console.error("Error fetching produk:", error);
//   }
// };

  const {data, error, isLoading} = useSWR("/api/produk", fetcher);
  
  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data} />
    </div>
  );
  
};

export default kategori;