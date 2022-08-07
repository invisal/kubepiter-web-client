import { InlineLoading, Loading } from "@carbon/react";
import { useRouter } from "next/router";
import { GqlBuildJob } from "../../../src/generated/graphql";
import useApiBuildLog from "../../../src/hooks/useApiBuildLog";
import MasterLayout from "../../../src/layout/MasterLayout";
import ReactAnsi from "react-ansi";
import Card from "../../../src/components/Card";

function BuildLogBody({ data }: { data: GqlBuildJob }) {
  return (
    <div>
      <Card>
        <h1 style={{ marginBottom: "0.5rem" }}>Build Log</h1>
        <div
          style={{
            lineHeight: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          <strong>Application</strong>
          <br />
          {data.appId} (version: {data.version})
          <br />
          {data.id}
          <br />
          <InlineLoading status="error" description="Running" />
        </div>
      </Card>

      <ReactAnsi
        log={data?.logs || ""}
        logStyle={{ height: "600px" }}
        autoScroll
        bodyStyle={{ height: "100%", overflowY: "auto", fontSize: "14px" }}
      />
    </div>
  );
}

export default function AppEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useApiBuildLog(id as string);

  return (
    <MasterLayout>
      {data ? (
        data.buildLog ? (
          <BuildLogBody data={data.buildLog} />
        ) : (
          <div>Application does not exist</div>
        )
      ) : (
        <Loading />
      )}
    </MasterLayout>
  );
}
