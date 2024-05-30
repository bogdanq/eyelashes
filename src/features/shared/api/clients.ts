import { get, child, ref } from "firebase/database";
import { database } from "../../../api/config";
import type { Client } from "../../clients";

const getClientList = async <Result = Client[]>(
  transform: (p: Client[]) => Result = (p) => p as Result,
): Promise<Result> => {
  const data = await  get(child(ref(database), "clients"))

  return transform(Object.values(data.val()) as Client[])
};

export const clientSharedApi = {
  getClientList,
};
