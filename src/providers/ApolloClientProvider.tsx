import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";
import { PropsWithChildren, useMemo } from "react";
import { useSessionToken } from "./SessionTokenProvider";

function createApolloClient(token: string | null) {
  const { publicRuntimeConfig } = getConfig();

  const client = new ApolloClient({
    uri: `${publicRuntimeConfig.endpoint}/graphql`,
    cache: new InMemoryCache(),
    headers: token
      ? {
          Authorization: "Bearer " + token,
        }
      : {},
    ssrMode: false,
  });

  return client;
}

export function ApolloClientProvider(props: PropsWithChildren<unknown>) {
  const { token } = useSessionToken();
  const client = useMemo(() => createApolloClient(token), [token]);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
