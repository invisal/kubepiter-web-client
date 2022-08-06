import type { NextPage } from "next";
import MasterLayout from "../src/layout/MasterLayout";

const Home: NextPage = () => {
  return (
    <MasterLayout>
      <h1>This is content</h1>
    </MasterLayout>
  );
};

export default Home;
