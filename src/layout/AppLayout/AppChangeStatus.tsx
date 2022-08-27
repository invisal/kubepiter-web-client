import { Button } from "@carbon/react";
import { useRouter } from "next/router";
import { GqlApp } from "src/generated/graphql";
import useApiDeployApp from "src/hooks/useApiDeployApp";

export default function AppChangeStatus({ app }: { app: GqlApp }) {
  const router = useRouter();
  const [deployApp] = useApiDeployApp({
    refetchQueries: ["app"],
    onQueryUpdated: async (observableQuery) => {
      // Delay for 1 second. The hasChange requires a small delay
      // to update its status after deploy. Refetch instantly will
      // not cause it to change
      await new Promise((r) => setTimeout(r, 1000));
      observableQuery.refetch();
    },
  });

  const onRebuildClicked = () => {
    deployApp({
      variables: {
        id: app.id || "",
        build: true,
        deploy: true,
      },
      onCompleted: () => {
        router.push(`/apps/edit/${app.id}/builds`);
      },
    })
      .then()
      .catch();
  };

  const onDeployClicked = () => {
    deployApp({
      variables: {
        id: app.id || "",
        build: false,
        deploy: true,
      },
    })
      .then()
      .catch();
  };

  return (
    <div className="mb-4 bg-support-warning p-4">
      <h4>App Changed</h4>
      <div className="mt-3 mb-3 text-sm">
        You have changed some app configuration. You may need to re-deploy to
        apply the change
      </div>
      <Button size="sm" onClick={onDeployClicked}>
        Deploy
      </Button>
      &nbsp;
      <Button size="sm" onClick={onRebuildClicked}>
        Build and Deploy
      </Button>
    </div>
  );
}
