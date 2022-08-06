import { ApolloClient } from "@apollo/client";
import type { AppProps } from "next/app";
import { ApolloClientProvider } from "../src/providers/ApolloClientProvider";
import { SessionTokenProvider } from "../src/providers/SessionTokenProvider";
import { UserProvider } from "../src/providers/UserProvider";
import "./../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionTokenProvider>
      <ApolloClientProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ApolloClientProvider>
    </SessionTokenProvider>
  );
}

export default MyApp;
