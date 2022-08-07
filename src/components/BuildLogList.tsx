import {
  InlineLoading,
  InlineLoadingStatus,
  Loading,
  SkeletonText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import useApiBuildLogList from "../hooks/useApiBuildLogList";
import NextLink from "./NextLink";

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

export default function BuildLogList({ appId }: { appId?: string }) {
  const { data } = useApiBuildLogList({ appId }, 10000);

  if (!data) return renderLoading();
  if (!data.buildLogs) return renderLoading();

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
          {data.buildLogs.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>
                <InlineLoading
                  status={
                    ({
                      SUCCESS: "finished",
                      FAILED: "error",
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
