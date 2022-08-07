import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren, useMemo } from "react";
import { useSessionToken } from "./SessionTokenProvider";

function createApolloClient(token: string | null) {
  const client = new ApolloClient({
    uri: `${(window as any).envs.endpoint}/graphql`,
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
