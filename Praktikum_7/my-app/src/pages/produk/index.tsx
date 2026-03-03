import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./produk.module.css";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
};

const kategori = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const { push } = useRouter();

  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
  try {
    const response = await fetch("/api/produk");
    const responsedata = await response.json();
    setProducts(responsedata.data);
  } catch (error) {
    console.error("Error fetching produk:", error);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daftar Produk</h1>

      <button onClick={fetchProducts} className={styles.button}>
        Refresh Data
      </button>

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <h2 className={styles.productName}>{product.name}</h2>
            <p>Kategori: {product.category}</p>
            <p>Harga: Rp {product.price}</p>
            <p>Ukuran: {product.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default kategori;