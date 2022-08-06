import { gql, useQuery } from "@apollo/client";
import { GqlQuery } from "../generated/graphql";

const QUERY_APP = gql`
  query app($id: ID!) {
    app(id: $id) {
      id
      version
      replicas
      name
      image
      env {
        name
        value
      }
      lastBuildJob {
        id
        status
      }
    }
  }
`;

export default function useApiApp(id: string) {
  return useQuery<GqlQuery>(QUERY_APP, {
    variables: { id },
  });
}
