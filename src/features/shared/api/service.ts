import { get, child, ref } from "firebase/database";
import { database } from "../../../api/config";
import type { Service } from "../../price";

const getServiceList = async <Result = Service[]>(
  transform: (p: Service[]) => Result = (p) => p as Result,
): Promise<Result> => {
  const data = await  get(child(ref(database), "servise"))

  return transform(Object.values(data.val()) as Service[])
};

export const serviceSharedApi = {
  getServiceList,
};
