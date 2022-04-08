import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    setAuth(storedAuth === "true");
    setAppReady(true);
  }, [auth]);

  return (
    <>
      {appReady && (
        <ThemeProvider attribute="class" defaultTheme="system">
          <Head>
            <title>Ecart Seller</title>
          </Head>
          <Navbar auth={false} />
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </>
  );
}

export default MyApp;
