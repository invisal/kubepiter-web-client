import { TextInput, Button, Grid, Column, Loading } from "@carbon/react";
import { useRouter } from "next/router";
import { GqlApp } from "../../../../src/generated/graphql";
import MasterLayout from "../../../../src/layout/MasterLayout";
import AppLayout from "../../../../src/layout/AppLayout";
import LinkGitRepoEditor from "../../../../src/components/LinkGitRepoEditor";
import RegistryListCombo from "../../../../src/components/RegistryListCombo";
import { useState } from "react";
import useApiUpdateApp from "../../../../src/hooks/useApiUpdateApp";
import NodeGroupListCombo from "../../../../src/components/NodeGroupListCombo";

function AppBody({ data }: { data: GqlApp }) {
  const [update, { loading }] = useApiUpdateApp({ refetchQueries: ["app"] });
  const [imagePullSecret, setImagePullScret] = useState(
    data.imagePullSecret || ""
  );
  const [image, setImage] = useState(data.image || "");
  const [folderName, setFolderName] = useState(data.folderName || "");
  const [nodeGroup, setNodeGroup] = useState(data.nodeGroup || "");

  const onSaveClicked = () => {
    update({
      variables: {
        id: data.id || "",
        value: {
          image,
          imagePullSecret,
          folderName,
          nodeGroup,
        },
      },
    });
  };

  return (
    <div>
      {loading && <Loading />}

      <Grid narrow style={{ padding: 0 }}>
        <Column lg={{ span: 10 }} md={{ span: 5 }}>
          <TextInput
            id="name"
            labelText="Name"
            readOnly
            value={data?.name || ""}
            autoCorrect="off"
            spellCheck={false}
          />
        </Column>
        <Column lg={{ offset: 10, span: 6 }} md={{ offset: 5, span: 3 }}>
          <TextInput
            id="folder"
            labelText="Folder Name (Optional)"
            helperText="It is used for grouping the app"
            onChange={(e) => setFolderName(e.currentTarget.value)}
            value={folderName || ""}
            autoCorrect="off"
            spellCheck={false}
          />
        </Column>
      </Grid>

      <br />
      <br />

      <h4>Deployment</h4>
      <br />
      <TextInput
        id="image_repository"
        labelText="Image Repository"
        spellCheck={false}
        value={image}
        onChange={(e) => setImage(e.currentTarget.value)}
      />

      <Grid narrow style={{ padding: 0, marginTop: "1rem" }}>
        <Column lg={{ span: 8 }} md={{ span: 8 }}>
          <RegistryListCombo
            value={imagePullSecret}
            onChange={(e) => setImagePullScret(e || "")}
          />
        </Column>
        <Column lg={{ offset: 8, span: 8 }} md={{ offset: 8, span: 8 }}>
          <NodeGroupListCombo
            value={nodeGroup}
            onChange={(e) => setNodeGroup(e || "")}
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
