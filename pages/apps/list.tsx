import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  Link as CarbonLink,
} from "@carbon/react";
import { Maybe } from "graphql/jsutils/Maybe";
import type { NextPage } from "next";
import Link from "next/link";
import { GqlApp } from "../../src/generated/graphql";
import useApiAppList from "../../src/hooks/useApiAppList";
import MasterLayout from "../../src/layout/MasterLayout";

function renderAppList(apps: Maybe<GqlApp>[]) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Version</TableHeader>
          <TableHeader>Replicas</TableHeader>
          <TableHeader>Last Deployed</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {apps.map((app) => (
          <TableRow key={app?.id}>
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
  );
}

const Home: NextPage = () => {
  const { data } = useApiAppList();

  return (
    <MasterLayout>
      <h1 style={{ marginBottom: "2rem" }}>Applications</h1>

      {data?.apps ? renderAppList(data.apps || []) : <div></div>}
    </MasterLayout>
  );
};

export default Home;
