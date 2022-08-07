import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { GqlMutation } from "../generated/graphql";

const MUTATION_DEPLOY_APP = gql`
  mutation deployApp($id: ID!) {
    deployApp(id: $id, build: true, deploy: true) {
      message
    }
  }
`;

interface DeployApiVariable {
  id: string;
}

export default function useApiDeployApp(
  options?: MutationHookOptions<GqlMutation, DeployApiVariable>
) {
  return useMutation<GqlMutation, DeployApiVariable>(
    MUTATION_DEPLOY_APP,
    options
  );
}
