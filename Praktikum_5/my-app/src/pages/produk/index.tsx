import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProdukView from "../../views/produk";

const produk = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     push("/auth/login");
  //   }
  // }, []);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      push("/auth/login"); // Redirect otomatis
    }
  }, []);


  return (
    // <div>Produk User Page</div>
    <ProdukView />
  );
};

export default produk;