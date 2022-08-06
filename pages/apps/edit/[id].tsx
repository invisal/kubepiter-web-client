import {
  Loading,
  TextInput,
  FormLabel,
  Button,
  Grid,
  Column,
  ComboBox,
  Accordion,
} from "@carbon/react";
import * as Icons from "@carbon/icons-react";
import { useRouter } from "next/router";
import {
  GqlApp,
  GqlAppEnvironmentVariable,
} from "../../../src/generated/graphql";
import useApiApp from "../../../src/hooks/useApiApp";
import MasterLayout from "../../../src/layout/MasterLayout";

function EnvironmentVariableEditor({
  envs,
}: {
  envs: GqlAppEnvironmentVariable[];
}) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h4 style={{ marginBottom: "1rem" }}>Environment Variables</h4>

      <Grid>
        <Column
          sm={{ span: 4 }}
          md={{ span: 3 }}
          lg={{ span: 5 }}
          style={{ marginTop: "0.5rem" }}
        >
          <strong>Name</strong>
        </Column>
        <Column
          sm={{ span: 4 }}
          md={{ offset: 3, span: 5 }}
          lg={{ offset: 5, span: 11 }}
          style={{ marginTop: "0.5rem" }}
        >
          <strong>Value</strong>
        </Column>
        {envs.map((env) => {
          return (
            <>
              <Column
                sm={{ span: 4 }}
                md={{ span: 3 }}
                lg={{ span: 5 }}
                style={{ marginTop: "0.5rem" }}
              >
                <TextInput
                  id="name"
                  labelText=""
                  value={env.name || ""}
                  autoCorrect="off"
                  spellCheck={false}
                />
              </Column>
              <Column
                sm={{ span: 4 }}
                md={{ offset: 3, span: 5 }}
                lg={{ offset: 5, span: 11 }}
                style={{ marginTop: "0.5rem" }}
              >
                <TextInput
                  id="name"
                  labelText=""
                  value={env.value || ""}
                  autoCorrect="off"
                  spellCheck={false}
                />
              </Column>
            </>
          );
        })}
      </Grid>
    </div>
  );
}

function AppBody({ data }: { data: GqlApp }) {
  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>{data.name}</h1>

      <TextInput
        id="name"
        labelText="Name"
        readOnly
        value={data?.name || ""}
        autoCorrect="off"
        spellCheck={false}
      />
      <br />
      <br />

      <h4>Deployment</h4>
      <br />
      <Grid>
        <Column lg={{ span: 10 }} md={{ span: 5 }}>
          <TextInput
            id="image_repository"
            labelText="Image Repository"
            spellCheck={false}
            value={data.image || ""}
          />
        </Column>
        <Column lg={{ offset: 10, span: 6 }} md={{ offset: 5, span: 3 }}>
          <ComboBox
            spellCheck={false}
            id="registry_secret"
            items={["groupin-reg"]}
            placeholder=""
            titleText="Container Registry"
          />
        </Column>
      </Grid>

      <div style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Source Code</strong>
        </div>

        <p style={{ marginBottom: "0.5rem" }}>
          <FormLabel>
            Provide us with your Git repository. We will build the image from
            your source code and push to above image repository
          </FormLabel>
        </p>

        <Button kind="tertiary" renderIcon={Icons.Edit}>
          <Icons.LogoGithub size={24} style={{ marginRight: "1rem" }} />
          <strong>git://invisal.com</strong>
        </Button>
      </div>

      <EnvironmentVariableEditor
        envs={(data.env || []).filter(Boolean) as GqlAppEnvironmentVariable[]}
      />

      <div style={{ marginTop: "2rem" }}>
        <Button>Save</Button>
      </div>
    </div>
  );
}

export default function AppEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useApiApp(id as string);

  return (
    <MasterLayout>
      {data ? (
        data.app ? (
          <AppBody data={data.app} />
        ) : (
          <div>Application does not exist</div>
        )
      ) : (
        <Loading />
      )}
    </MasterLayout>
  );
}
