import Link from "next/link";
import {useRouter} from "next/router";
// import styles from "./login.module.css";
import styles from "./login.module.scss";

const TampilanLogin = () => {
  const {push} = useRouter();
  const handlerLogin = () => {
    localStorage.setItem("isLogin", "true");
    push("/produk");
  }
  return (
    <div className={styles.login}>
      <h1 >Halaman Login</h1>

      {/*Login → Product (imperatif) */}
      <button onClick={handlerLogin}>Login</button> <br />
      {/* <button onClick={() => push('/produk') }>Login</button> <br /> */}
      <h1 style={{ color: "red",border: "1px solid red",borderRadius: "5px",padding: "5px",}}> Belum Punya Akun</h1>
      {/* <button onClick={() => handlerLogin()}>Login</button> <br /> */}

      {/*Login ↔ Register (Link)  */}
      <Link href="/auth/register">Ke Halaman Register</Link>
    </div>
  );
};

export default TampilanLogin;