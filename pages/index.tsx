import { Column, FormLabel, Grid } from "@carbon/react";
import type { NextPage } from "next";
import { Doughnut } from "react-chartjs-2";
import Card from "../src/components/Card";
import { GqlKubeNode, Maybe } from "../src/generated/graphql";
import useApiNodeList from "../src/hooks/useApiNodeList";
import MasterLayout from "../src/layout/MasterLayout";

function Stats({ nodes }: { nodes: Maybe<GqlKubeNode>[] }) {
  const memoryTotalCapacity =
    nodes.reduce((a, b) => a + Number(b?.memoryUsage?.capacity), 0) /
    1073741824;
  const memoryTotalRequest =
    nodes.reduce((a, b) => a + Number(b?.memoryUsage?.request), 0) / 1073741824;

  const cpuTotalCapacity = nodes.reduce(
    (a, b) => a + Number(b?.cpuUsage?.capacity),
    0
  );
  const cpuTotalRequest = nodes.reduce(
    (a, b) => a + Number(b?.cpuUsage?.request),
    0
  );

  return (
    <Grid>
      <Column lg={{ span: 8 }}>
        <Card>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormLabel>Memory Capacity</FormLabel>
            <h3>{memoryTotalCapacity.toFixed(2)} GB</h3>
          </div>

          <div
            style={{
              width: 300,
              marginTop: "2rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Doughnut
              data={{
                labels: ["Request", "Unused"],
                datasets: [
                  {
                    label: "Request",
                    data: [
                      memoryTotalRequest,
                      memoryTotalCapacity - memoryTotalRequest,
                    ],
                    backgroundColor: ["#e74c3c", "#bdc3c7"],
                  },
                ],
              }}
              options={{
                responsive: true,
              }}
            />
          </div>
        </Card>
      </Column>

      <Column lg={{ span: 8 }}>
        <Card>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormLabel>CPU Capacity</FormLabel>
            <h3>{cpuTotalCapacity.toFixed(2)}</h3>
          </div>

          <div
            style={{
              width: 300,
              marginTop: "2rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Doughnut
              data={{
                labels: ["Request", "Unused"],
                datasets: [
                  {
                    label: "Request",
                    data: [
                      cpuTotalCapacity,
                      cpuTotalCapacity - cpuTotalRequest,
                    ],
                    backgroundColor: ["#e74c3c", "#bdc3c7"],
                  },
                ],
              }}
              options={{
                responsive: true,
              }}
            />
          </div>
        </Card>
      </Column>
    </Grid>
  );
}

const Home: NextPage = () => {
  const { data } = useApiNodeList();

  return (
    <MasterLayout>
      {data && data.nodes && <Stats nodes={data.nodes} />}
    </MasterLayout>
  );
};

export default Home;
