import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { useEffect, useState } from "react"; // Tambahkan ini

// Perbaikan 1: Gunakan SSR: false jika komponen navbar sangat berat 
// atau biarkan default tapi tangani state mounting-nya.
const Navbar = dynamic(() => import("../navbar"), {
  ssr: true, // Tetap true agar SEO bagus
});

const Footer = dynamic(() => import("../footer"), {
  ssr: true,
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
  
  // Perbaikan 2: Gunakan state mounted untuk mencegah perbedaan render server vs client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={roboto.className}>
      {/* Google Analytics - Aman di sini */}
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

      {/* Perbaikan 3: Navbar hanya dirender setelah mounted atau pastikan logic-nya konsisten */}
      {mounted && !disableNavbar.includes(pathname) && <Navbar />}
      
      {children}
      
      {mounted && <Footer />}
    </main>
  );
};

export default AppShell;