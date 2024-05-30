import { Select } from "antd";

type Props = {
  onSelect: (client: { label: string; value: string }, field: string) => void;
};

export const ServicesSelect = ({ onSelect, ...r }: Props) => {
  return (
    <Select
      {...r}
      onSelect={(e, service) => {
        onSelect(service, "service");
      }}
      placeholder="Выберите услугу"
      options={[
        { label: "Услуга 1", value: "1" },
        { label: "Услуга 2", value: "2" },
      ]}
    />
  );
};
