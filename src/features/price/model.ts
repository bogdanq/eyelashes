import { createStore, createEffect, sample } from "effector";
import { createGate } from "effector-react";
import { serviceSharedApi } from "../shared/api/service";
import { serviceApi } from "./api";
import { Service } from "./types";

export const priceGate = createGate("price gate");

export const getServiceListFx = createEffect<void, Service[], void>(() =>
  serviceSharedApi.getServiceList(),
);

export const addServiceFx = createEffect<Service, Service, void>((service) =>
  serviceApi.addService(service),
);

export const deleteServiceFx = createEffect<string, string, void>((id) =>
  serviceApi.deleteService(id),
);

export const updateServiceFx = createEffect<Service, Service, void>((service) =>
  serviceApi.updateService(service),
);

export const $serviceList = createStore<Service[]>([])
  .on(getServiceListFx.doneData, (_, list) => list)
  .on(addServiceFx.done, (list, { params }) => [params, ...list])
  .on(updateServiceFx.done, (list, { params }) => {
    return list.map((service) => (service.id === params.id ? params : service));
  })
  .on(deleteServiceFx.done, (list, { params }) =>
    list.filter((service) => service.id !== params),
  );

sample({
  clock: priceGate.open,
  target: getServiceListFx,
});
