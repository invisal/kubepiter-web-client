import type { AppProps } from "next/app";
import ForceClientSide from "../src/components/ForceClientSide";
import { ApolloClientProvider } from "../src/providers/ApolloClientProvider";
import { SessionTokenProvider } from "../src/providers/SessionTokenProvider";
import { UserProvider } from "../src/providers/UserProvider";
import "chart.js/auto";
import "./../styles/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kubepiter - Control Panel</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/brands.min.css"
        />
      </Head>
      <ForceClientSide>
        <SessionTokenProvider>
          <ApolloClientProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </ApolloClientProvider>
        </SessionTokenProvider>
      </ForceClientSide>
    </>
  );
}

export default MyApp;
