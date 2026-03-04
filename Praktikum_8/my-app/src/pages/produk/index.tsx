import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import  TampilanProduk from "@/pages/views/produk"
// import styles from "./produk.module.css";

// type ProductType = {
//   id: string;
//   category: string;
//   image: string;
//   name: string;
//   price: number;
// };

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

  useEffect(() => {
  fetch("/api/produk")
    .then((response) => response.json())
    .then((responsedata) => {
      setProducts(responsedata.data);
      // console.log("Data produk:", responsedata.data);
    })
    .catch((error) => {
      console.error("Error fetching produk:", error);
    });
}, []);
  
  return (
    <div>
      <TampilanProduk products={products} />
    </div>
  );
  
};

export default kategori;