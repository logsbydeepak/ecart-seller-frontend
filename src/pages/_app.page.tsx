import Head from "next/head";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";

import "~/styles/globals.css";
import AppLayout from "~/layout/AppLayout";
import { AuthProvider } from "~/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextPageLayoutType } from "~/types/nextMod";

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
    </>
  );
}

export default MyApp;
