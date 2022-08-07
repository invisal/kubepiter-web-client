import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  SkeletonText,
  TableContainer,
  InlineLoading,
  InlineLoadingStatus,
} from "@carbon/react";
import type { NextPage } from "next";
import NextLink from "../../src/components/NextLink";
import { GqlBuildJob, Maybe } from "../../src/generated/graphql";
import useApiBuildLogList from "../../src/hooks/useApiBuildLogList";
import MasterLayout from "../../src/layout/MasterLayout";

function BuildLogList({ data }: { data: Maybe<GqlBuildJob>[] }) {
  return (
    <TableContainer title="Build Logs" description="View all build logs">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader style={{ width: 30 }}></TableHeader>
            <TableHeader style={{ width: 350 }}>Build</TableHeader>
            <TableHeader>App</TableHeader>
            <TableHeader style={{ width: 30 }}>Ver</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>
                <InlineLoading
                  status={
                    ({
                      SUCCESS: "finished",
                      FAIL: "error",
                      PENDING: "inactive",
                      RUNNING: "active",
                    }[item?.status || ""] || "active") as InlineLoadingStatus
                  }
                />
              </TableCell>
              <TableCell>
                <NextLink href={`/build_logs/view/${item?.id}`}>
                  <code>{item?.id}</code>
                </NextLink>
              </TableCell>
              <TableCell>
                <div>
                  <strong>{item?.appId}</strong>
                </div>
              </TableCell>
              <TableCell>{item?.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function renderLoading() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader style={{ width: 90 }}></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <SkeletonText />
          </TableCell>
          <TableCell>
            <SkeletonText />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

const BuildLogsPage: NextPage = () => {
  const { data } = useApiBuildLogList({}, 10000);

  return (
    <MasterLayout>
      {data ? <BuildLogList data={data?.buildLogs || []} /> : renderLoading()}
    </MasterLayout>
  );
};

export default BuildLogsPage;
