import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthProvider } from "../utils/Context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ecart Seller</title>
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system">
        <div className="font-inter text-base font-medium dark:text-slate-100">
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
