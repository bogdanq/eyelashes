import { createEffect, createStore, sample } from "effector";
import { createGate } from "effector-react";
import type { Client } from "../../clients";
import { clientSharedApi } from "../api/clients";

type Select = { label: string; value: string };

export const clientsGate = createGate("clients select gate");

const transformlistToSelect = (clients: Client[]): Select[] => {
  console.log("clients11", clients);
  return clients.map((client) => ({ label: client.name, value: client.id }));
};

export const getClientsListFx = createEffect<void, Select[], void>(() => {
  return clientSharedApi.getClientList(transformlistToSelect);
});

export const $clients = createStore<Select[]>([]).on(
  getClientsListFx.doneData,
  (_, clients) => clients,
);

sample({
  clock: clientsGate.open,
  target: getClientsListFx,
});
