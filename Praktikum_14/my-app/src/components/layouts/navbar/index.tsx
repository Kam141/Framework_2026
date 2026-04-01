import style from './navbar.module.css';
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  return (
  <div className={style.navbar}>
    <div className="big">
      Navbar Component 
    </div>
 
    <button onClick={() => signIn()}>Sign In</button>
    
  </div>
  );
};

export default Navbar;