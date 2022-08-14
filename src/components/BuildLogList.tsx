import {
  InlineLoading,
  InlineLoadingStatus,
  Loading,
  OverflowMenu,
  OverflowMenuItem,
  SkeletonText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import * as Icons from "@carbon/icons-react";
import useApiBuildLogList from "../hooks/useApiBuildLogList";
import NextLink from "./NextLink";
import useApiRollbackApp from "src/hooks/useApiRollbackApp";

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

export default function BuildLogList({
  appId,
  showAction,
  currentVersion,
}: {
  appId?: string;
  showAction?: boolean;
  currentVersion?: number;
}) {
  const [rollback, { loading }] = useApiRollbackApp();
  const { data } = useApiBuildLogList({ appId }, 10000);

  if (!data) return renderLoading();
  if (!data.buildLogs) return renderLoading();

  return (
    <TableContainer title="Build Logs" description="View all build logs">
      {loading && <Loading />}
      <Table>
        <TableHead>
          <TableRow>
            {currentVersion && (
              <TableHeader style={{ width: 30 }}></TableHeader>
            )}
            <TableHeader style={{ width: 30 }}></TableHeader>
            <TableHeader style={{ width: 350 }}>Build</TableHeader>
            <TableHeader>App</TableHeader>
            <TableHeader style={{ width: 30 }}>Ver</TableHeader>
            {showAction && <TableHeader style={{ width: 30 }}></TableHeader>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.buildLogs.map((item) => (
            <TableRow key={item?.id}>
              {currentVersion && (
                <TableCell>
                  {currentVersion === Number(item?.version) &&
                    item?.status === "SUCCESS" && (
                      <Icons.ArrowRight aria-label="Current Version" />
                    )}
                </TableCell>
              )}
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
              {showAction && (
                <TableCell>
                  {item?.status === "SUCCESS" && (
                    <OverflowMenu
                      size="lg"
                      renderIcon={Icons.OverflowMenuHorizontal}
                      iconDescription="More"
                      light
                    >
                      <OverflowMenuItem
                        itemText="Rollback"
                        onClick={() => {
                          rollback({
                            variables: {
                              appId: item.appId || "",
                              version: Number(item.version),
                            },
                            refetchQueries: ["app"],
                          })
                            .then()
                            .catch();
                        }}
                      />
                    </OverflowMenu>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
