import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import Script from "next/script";

// Dynamic import
const Navbar = dynamic(() => import("../navbar"), {
  loading: () => <p>Loading Navbar...</p>,
});

const Footer = dynamic(() => import("../footer"), {
  loading: () => <p>Loading Footer...</p>,
});

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

type AppShellProps = {
  children: React.ReactNode;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main className={roboto.className}>
      
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NQHQKRW7Q8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NQHQKRW7Q8');
        `}
      </Script>

      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
      <Footer />
    </main>
  );
};

export default AppShell;