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
      imagePullSecret
      folderName
      nodeGroup
      gitWebhook
      ingress {
        host
        path
      }
      env {
        name
        value
      }
      git {
        url
        branch
        hasAuth
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
