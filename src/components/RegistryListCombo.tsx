import { TextInputSkeleton, ComboBox } from "@carbon/react";
import useApiRegistryList from "../hooks/useApiRegistryList";

export default function RegistryListCombo({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string | undefined) => void;
}) {
  const { data } = useApiRegistryList();

  if (!data) return <TextInputSkeleton />;
  if (!data.registries) return <TextInputSkeleton />;

  const items = data.registries.map((item) => item?.name || "");

  return (
    <ComboBox
      spellCheck={false}
      id="registry_secret"
      items={items}
      value={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e.selectedItem ? e.selectedItem : undefined);
        }
      }}
      placeholder=""
      titleText="Container Registry"
    />
  );
}
