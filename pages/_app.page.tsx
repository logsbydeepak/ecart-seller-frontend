import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Head>
          <title>Ecart Seller</title>
        </Head>
        <Navbar auth={false} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
