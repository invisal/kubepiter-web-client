import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  Link as CarbonLink,
  TableContainer,
} from "@carbon/react";
import * as Icons from "@carbon/icons-react";
import { Maybe } from "graphql/jsutils/Maybe";
import type { NextPage } from "next";
import Link from "next/link";
import { GqlApp } from "../../src/generated/graphql";
import useApiAppList from "../../src/hooks/useApiAppList";
import MasterLayout from "../../src/layout/MasterLayout";

function renderAppList(folderName: string | null, apps: Maybe<GqlApp>[]) {
  return (
    <TableContainer
      title={folderName || "Unnamed"}
      style={{ marginBottom: "1rem" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader style={{ width: "1rem" }}></TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader style={{ width: "3rem" }}>Version</TableHeader>
            <TableHeader style={{ width: "3rem" }}>Replicas</TableHeader>
            <TableHeader style={{ width: "8rem" }}>Last Deployed</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app?.id}>
              <TableCell>
                <Icons.ApplicationVirtual />
              </TableCell>
              <TableCell>
                <Link href={`/apps/edit/${app?.id}`} passHref>
                  <CarbonLink>{app?.name}</CarbonLink>
                </Link>
              </TableCell>
              <TableCell>{app?.version}</TableCell>
              <TableCell>{app?.replicas}</TableCell>
              <TableCell>N/A</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function renderAppGroup(apps: Maybe<GqlApp>[]) {
  const folderList = Array.from(new Set(apps.map((app) => app?.folderName)));

  return (
    <>
      {folderList.map((folder) => {
        const appsInFolder = apps.filter((app) => app?.folderName === folder);
        return (
          <div key={folder}>{renderAppList(folder || null, appsInFolder)}</div>
        );
      })}
    </>
  );
}

const Home: NextPage = () => {
  const { data } = useApiAppList();

  return (
    <MasterLayout>
      <h1 style={{ marginBottom: "2rem" }}>Applications</h1>

      {data?.apps ? <>{renderAppGroup(data.apps || [])}</> : <div></div>}
    </MasterLayout>
  );
};

export default Home;
