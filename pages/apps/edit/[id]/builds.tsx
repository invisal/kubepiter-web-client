import { useRouter } from "next/router";
import { GqlApp } from "../../../../src/generated/graphql";
import AppLayout from "../../../../src/layout/AppLayout";
import MasterLayout from "../../../../src/layout/MasterLayout";

function AppBuildLogBody({ data }: { data: GqlApp }) {
  return <div>Build Log</div>;
}

export default function AppBuildLogPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MasterLayout withoutInnerContent>
      <AppLayout id={id as string} bodyComponent={AppBuildLogBody} />
    </MasterLayout>
  );
}
