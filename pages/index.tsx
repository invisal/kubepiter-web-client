import type { NextPage } from "next";
import useApiVersion from "../src/hooks/useApiVersion";
import MasterLayout from "../src/layout/MasterLayout";

const Home: NextPage = () => {
  const { data } = useApiVersion();
  console.log(data);

  return (
    <MasterLayout>
      <span>Coming Soon</span>
    </MasterLayout>
  );
};

export default Home;
