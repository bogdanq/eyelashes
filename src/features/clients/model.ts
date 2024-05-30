import {
  createStore,
  createEffect,
  sample,
  createEvent,
  combine,
} from "effector";
import { createGate } from "effector-react";
import { clientSharedApi } from "../shared/api/clients";
import { clientApi } from "./api";
import { Client } from "./types";

export const clientGate = createGate("clients gate");

export const searchClient = createEvent<string>();

export const getClientListFx = createEffect<void, Client[], void>(async () =>
  clientSharedApi.getClientList(),
);

export const addClientFx = createEffect<Client, Client, void>((client) =>
  clientApi.addClient(client),
);

export const deleteClientFx = createEffect<string, string, void>((id) =>
  clientApi.deleteClient(id),
);

export const updateClientFx = createEffect<Client, Client, void>((client) =>
  clientApi.updateClient(client),
);

export const $clientList = createStore<Client[]>([])
  .on(getClientListFx.doneData, (_, list) => list)
  .on(addClientFx.done, (list, { params }) => [params, ...list])
  .on(updateClientFx.done, (list, { params }) => {
    return list.map((client) => (client.id === params.id ? params : client));
  })
  .on(deleteClientFx.done, (list, { params }) =>
    list.filter((client) => client.id !== params),
  );

export const $search = createStore("").on(searchClient, (_, value) => value);

export const $searchClientList = combine([$clientList, $search]).map(
  ([list, search]) => {
    return list.filter((client) => client.name.includes(search.trim()));
  },
);

sample({
  clock: clientGate.open,
  target: getClientListFx,
});
