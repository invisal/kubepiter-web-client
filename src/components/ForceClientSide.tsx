import { PropsWithChildren, useEffect, useState } from "react";

export default function ForceClientSide(props: PropsWithChildren<unknown>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  if (isClient) {
    return <div>{props.children}</div>;
  }

  return <div />;
}
