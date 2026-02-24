import Link from "next/link";
import {useRouter} from "next/router";

const halamanLogin = () => {
  const {push} = useRouter();
  const handlerLogin = () => {
    
    push("/produk");
  }
  return (
    <div>
      <h1>Halaman Login</h1>

      {/*Login → Product (imperatif) */}
      <button onClick={handlerLogin}>Login</button> <br />
      {/* <button onClick={() => push('/produk') }>Login</button> <br /> */}
      {/* <button onClick={() => handlerLogin()}>Login</button> <br /> */}

      {/*Login ↔ Register (Link)  */}
      <Link href="/auth/register">Ke Halaman Register</Link>
    </div>
  );
};

export default halamanLogin;