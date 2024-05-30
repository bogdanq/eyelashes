import { Select } from "antd";
import { useGate, useUnit } from "effector-react";
import { combine } from "effector";
import { clientsGate, $clients, getClientsListFx } from "./model";

type Props = {
  onSelect: (client: { label: string; value: string }, field: string) => void;
};

const $state = combine({
  clients: $clients,
  pending: getClientsListFx.pending,
});

export const ClientsSelect = ({ onSelect, ...r }: Props) => {
  const { clients, pending } = useUnit($state);

  console.log("clients", clients);

  useGate(clientsGate);

  return (
    <Select
      {...r}
      loading={pending}
      disabled={pending}
      onSelect={(e, client) => {
        onSelect(client, "client");
      }}
      placeholder="Выберите клиента"
      options={clients}
    />
  );
};
