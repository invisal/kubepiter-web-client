import { ComponentType, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import InnerContent from "../../components/InnerContent";
import { Loading, Tab, TabList, Tabs } from "@carbon/react";
import { GqlApp } from "../../generated/graphql";
import useApiApp from "../../hooks/useApiApp";
import { useRouter } from "next/router";

export default function AppLayout(
  props: PropsWithChildren<{
    id: string;
    bodyComponent: ComponentType<{ data: GqlApp }>;
  }>
) {
  const router = useRouter();
  const { data } = useApiApp(props.id);

  if (!data) return <Loading />;
  if (!data.app) return <Loading />;

  let selectIndex = 0;
  const pathSplit = router.pathname.split("/");
  const pathLastToken = pathSplit[pathSplit.length - 1];

  if (pathLastToken === "ingress") selectIndex = 1;
  if (pathLastToken === "builds") selectIndex = 2;

  return (
    <div>
      <div className={styles.banner}>
        <InnerContent>
          <h1>{data.app.name}</h1>
        </InnerContent>
      </div>
      <div className={styles.tabs}>
        <InnerContent>
          <Tabs selectedIndex={selectIndex}>
            <TabList aria-label="App" activation="manual" contained>
              <Tab onClick={() => router.push(`/apps/edit/${props.id}`)}>
                Application
              </Tab>
              <Tab
                onClick={() => router.push(`/apps/edit/${props.id}/ingress`)}
              >
                Ingress
              </Tab>
              <Tab onClick={() => router.push(`/apps/edit/${props.id}/builds`)}>
                Build Log
              </Tab>
              <Tab>Monitor</Tab>
            </TabList>
          </Tabs>
        </InnerContent>
      </div>
      <InnerContent>
        <props.bodyComponent data={data.app} />
      </InnerContent>
    </div>
  );
}
