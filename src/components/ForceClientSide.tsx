import { PropsWithChildren } from "react";

export default function ForceClientSide(props: PropsWithChildren<unknown>) {
  if (typeof window === "undefined") return <div />;
  return <>{props.children}</>;
}
