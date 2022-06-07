import Head from "next/head";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import "~/styles/globals.css";
import AppLayout from "~/layout/AppLayout";
import { AuthProvider } from "~/context/AuthContext";
import { NextPageLayoutType } from "~/types/nextMod";
import NextNProgress from "nextjs-progressbar";

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

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <AuthProvider>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </AuthProvider>
      </QueryClientProvider>
      <NextNProgress
        options={{
          showSpinner: false,
        }}
      />
    </>
  );
}

export default MyApp;
