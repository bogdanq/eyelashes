import { child, ref, set, remove, update } from "firebase/database";
import { nanoid } from "nanoid";
import { database } from "../../api/config";
import { Service } from "./types";

const addService =async  (service: Service): Promise<Service> => {
  const id = nanoid()

  await set(
    child(ref(database), `servise/${id}`),{ ...service, id }
  )

  return service
};

const deleteService = async (id: string): Promise<string> => {
  await remove(child(ref(database), `servise/${id}`))

  return id
};

const updateService = async (service: Service): Promise<Service> => {
  await update(child(ref(database), `servise/${service.id}`), service)

  return service
};

export const serviceApi = {
  addService,
  deleteService,
  updateService,
};
