import { TextInput, Button, Grid, Column, Loading } from "@carbon/react";
import { useRouter } from "next/router";
import { GqlApp } from "../../../../src/generated/graphql";
import MasterLayout from "../../../../src/layout/MasterLayout";
import AppLayout from "../../../../src/layout/AppLayout";
import LinkGitRepoEditor from "../../../../src/components/LinkGitRepoEditor";
import RegistryListCombo from "../../../../src/components/RegistryListCombo";
import { useState } from "react";
import useApiUpdateApp from "../../../../src/hooks/useApiUpdateApp";

function AppBody({ data }: { data: GqlApp }) {
  const [update, { loading }] = useApiUpdateApp();
  const [imagePullSecret, setImagePullScret] = useState(
    data.imagePullSecret || ""
  );
  const [image, setImage] = useState(data.image || "");

  const onSaveClicked = () => {
    update({
      variables: {
        id: data.id || "",
        value: {
          image,
          imagePullSecret,
        },
      },
    });
  };

  return (
    <div>
      {loading && <Loading />}

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
            value={image}
            onChange={(e) => setImage(e.currentTarget.value)}
          />
        </Column>
        <Column lg={{ offset: 10, span: 6 }} md={{ offset: 5, span: 3 }}>
          <RegistryListCombo
            value={imagePullSecret}
            onChange={(e) => setImagePullScret(e || "")}
          />
        </Column>
      </Grid>

      <LinkGitRepoEditor id={data.id || ""} git={data.git} />

      <div style={{ marginTop: "2rem" }}>
        <Button onClick={onSaveClicked}>Save</Button>
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
