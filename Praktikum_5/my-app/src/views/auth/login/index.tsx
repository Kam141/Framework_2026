import Link from "next/link";
import {useRouter} from "next/router";
import styles from "./login.module.css";


const TampilanLogin = () => {
  const {push} = useRouter();
  const handlerLogin = () => {
    localStorage.setItem("isLogin", "true");
    push("/produk");
  }
  return (
    <div className={styles.login}>
      <h1>Halaman Login</h1>

      {/*Login → Product (imperatif) */}
      {/* <button onClick={handlerLogin}>Login</button> <br /> */}
      {/* <button onClick={() => push('/produk') }>Login</button> <br /> */}
      <button onClick={() => handlerLogin()}>Login</button> <br />

      {/*Login ↔ Register (Link)  */}
      {/* <Link href="/auth/register">Ke Halaman Register</Link> */}
    </div>
  );
};

export default TampilanLogin;