import { TextInput, Button, Grid, Column, ComboBox } from "@carbon/react";
import { useRouter } from "next/router";
import {
  GqlApp,
  GqlAppEnvironmentVariable,
} from "../../../../src/generated/graphql";
import MasterLayout from "../../../../src/layout/MasterLayout";
import AppLayout from "../../../../src/layout/AppLayout";
import LinkGitRepoEditor from "../../../../src/components/LinkGitRepoEditor";

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

      <LinkGitRepoEditor id={data.id || ""} git={data.git} />

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

  return (
    <MasterLayout withoutInnerContent>
      <AppLayout id={id as string} bodyComponent={AppBody} />
    </MasterLayout>
  );
}
