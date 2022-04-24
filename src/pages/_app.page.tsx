import Head from "next/head";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ReactElement, ReactNode } from "react";

import "~/styles/globals.css";
import { AuthProvider } from "~/utils/Context/AuthContext";
import AppLayout from "~/layout/AppLayout";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Ecart Seller</title>
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system">
        <AuthProvider>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
