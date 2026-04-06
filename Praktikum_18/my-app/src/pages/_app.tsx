import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/AppShell";
import Navbar from "@/components/layouts/navbar";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>

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

      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  );
}