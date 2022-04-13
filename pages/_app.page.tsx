import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "next-themes";

import "../styles/globals.css";
import "../styles/nprogress.css";
import { AuthProvider } from "../utils/Context/AuthContext";
import Layout from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const { themes } = useTheme();
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
