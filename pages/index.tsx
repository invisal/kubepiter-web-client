import type { NextPage } from "next";
import useApiVersion from "../src/hooks/useApiVersion";
import MasterLayout from "../src/layout/MasterLayout";

const Home: NextPage = () => {
  const { data } = useApiVersion();
  console.log(data);

  return (
    <MasterLayout>
      <h1>This is content</h1>
    </MasterLayout>
  );
};

export default Home;
