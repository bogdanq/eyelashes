import { get, child, ref, set, remove, update } from "firebase/database";
import { nanoid } from "nanoid";
import { database } from "../../api/config";
import { Client } from "./types";

const getCLient = async (id: string): Promise<Client> => {
  const data = await get(child(ref(database), `clients/${id}`))

  return data.val() as Client
};

const addClient = async (client: Omit<Client, 'createdAt' | 'id'>): Promise<Client> => {
  const id = nanoid()

  await set(
    child(ref(database), `clients/${id}`),{ ...client, createdAt: new Date().toISOString(), id }
  ) 
  
  return client as Client
};

const deleteClient = async (id: string): Promise<string> => {
  await remove(child(ref(database), `clients/${id}`))

  return id
};

const updateClient = async (client: Client): Promise<Client> => {

  await update(child(ref(database), `clients/${client.id}`), client)

  return client
};

export const clientApi = {
  addClient,
  deleteClient,
  updateClient,
  getCLient
};
