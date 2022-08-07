declare module "@carbon/react" {
  export * from "carbon-components-react";

  interface TabListProps {
    activation?: "automatic" | "manual";
    contained?: boolean;
  }
  export const TabList: React.FC<PropsWithChildren<TabListProps>>;

  interface TabPanelsProps {}
  export const TabPanels: React.FC<TabPanelsProps>;

  interface TabPanelProps {}
  export const TabPanel: React.FC<TabPanelProps>;

  interface TabsProps {
    selectedIndex?: number;
  }
  export const Tabs: React.FC<PropsWithChildren<TabsProps>>;

  interface FlexGridProps {}
  export const FlexGrid: React.FC<FlexGridProps>;
}
