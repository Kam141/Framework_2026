import {useRouter} from "next/router";
import Navbar from "../navbar";
import Footer from "../footer";

const disableNavbar = ["/auth/login", "/auth/register"];

type AppShellProps = {
  children: React.ReactNode;
}

const AppShell = (props:AppShellProps) => {
  const { children } = props;
  const {pathname} = useRouter();
  console.log(pathname);
  return (
  <main>
    {!disableNavbar.includes(pathname) && <Navbar />}
    {children}
    <Footer />
  </main>

  );
};

export default AppShell;