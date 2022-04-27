import Head from "next/head";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ReactElement, ReactNode } from "react";

import "~/styles/globals.css";
import AppLayout from "~/layout/AppLayout";
import { AuthProvider } from "~/utils/Context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextPageLayoutType } from "~/utils/types";

type AppPropsWithLayout = AppProps & {
  Component: NextPageLayoutType;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Ecart Seller</title>
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
