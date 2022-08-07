import {
  Column,
  TextInput,
  Grid,
  Button,
  Loading,
  OverflowMenu,
  OverflowMenuItem,
} from "@carbon/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { GqlApp } from "../../../../src/generated/graphql";
import AppLayout from "../../../../src/layout/AppLayout";
import MasterLayout from "../../../../src/layout/MasterLayout";
import * as Icons from "@carbon/icons-react";
import useApiUpdateApp from "../../../../src/hooks/useApiUpdateApp";

function AppEnvBody({ data }: { data: GqlApp }) {
  const [update, { loading }] = useApiUpdateApp({
    refetchQueries: ["app"],
  });

  const [envList, setEnvList] = useState([
    ...(data.env || []).map((env, idx) => ({
      key: idx,
      name: env?.name || "",
      value: env?.value || "",
    })),
    { name: "", value: "", key: (data.env || []).length },
  ]);

  const onValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "name" | "value",
    idx: number
  ) => {
    // Clone the object and make change
    let tmp = envList.map((ing) => ({ ...ing }));
    tmp[idx][field] = e.currentTarget.value;

    // Clean up empty env
    tmp = tmp.filter((ing) => ing.name || ing.value);

    // If there is no empty env at the end, append one
    const last = tmp[tmp.length - 1];
    if (last.name || last.value) {
      tmp.push({
        name: "",
        value: "",
        key: Math.max(...tmp.map((ing) => ing.key)) + 1,
      });
    }

    setEnvList(tmp);
  };

  const onSaveClicked = () => {
    // Clean up empty env
    let tmp = envList
      .filter((ing) => ing.name || ing.value)
      .map((ing) => ({
        name: ing.name,
        value: ing.value || "/",
      }));

    update({
      variables: {
        id: data.id || "",
        value: {
          env: tmp,
        },
      },
    })
      .then()
      .catch();
  };

  const onSortByNameClicked = () => {
    const newEnvList = envList
      .filter((env) => env.name && env.value)
      .sort((a, b) => a.name.localeCompare(b.name));

    setEnvList([
      ...newEnvList,
      {
        value: "",
        name: "",
        key: Math.max(...newEnvList.map((env) => env.key)) + 1,
      },
    ]);
  };

  return (
    <div>
      {loading && <Loading />}

      <div style={{ marginBottom: "1rem" }}>
        <OverflowMenu renderIcon={Icons.TaskTools} iconDescription="More">
          <OverflowMenuItem
            itemText="Sort by name"
            onClick={onSortByNameClicked}
          />
          <OverflowMenuItem itemText="Bulk edit" />
        </OverflowMenu>
      </div>

      {envList.map((ing, idx) => {
        return (
          <div key={ing.key} style={{ marginBottom: "1rem" }}>
            <Grid style={{ padding: 0, marginBottom: "0.5rem" }} narrow>
              <Column md={{ span: 2 }} lg={{ span: 6 }}>
                <TextInput
                  id="env_name"
                  labelText=""
                  placeholder="Environment Name"
                  value={ing?.name || ""}
                  onChange={(e) => onValueChange(e, "name", idx)}
                  autoComplete="false"
                  autoCorrect="false"
                  spellCheck={false}
                />
              </Column>
              <Column md={{ span: 6, offset: 2 }} lg={{ span: 10, offset: 6 }}>
                <TextInput
                  id="env_value"
                  labelText=""
                  placeholder="Environment Value"
                  value={ing?.value || ""}
                  onChange={(e) => onValueChange(e, "value", idx)}
                  autoComplete="false"
                  autoCorrect="false"
                  spellCheck={false}
                />
              </Column>
            </Grid>
          </div>
        );
      })}

      <div>
        <Button renderIcon={Icons.Save} onClick={onSaveClicked}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default function AppIngressPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MasterLayout withoutInnerContent>
      <AppLayout id={id as string} bodyComponent={AppEnvBody} />
    </MasterLayout>
  );
}
