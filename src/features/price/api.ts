import { Service } from "./types";

const addService = (service: Service): Promise<Service> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(service);
    }, 1000);
  });
};

const getServiceList = async (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Наращивание ресниц 1",
          price: 2000,
          profit: 120,
          description: "Какое то описание",
        },
        { id: "2", title: "Наращивание ресниц 2", price: 2200, profit: 1500 },
        { id: "3", title: "Наращивание ресниц 3", price: 10, profit: 4 },
        { id: "4", title: "Наращивание ресниц 4", price: 1000, profit: 500 },
      ]);
    }, 1000);
  });
};

const deleteService = (id: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 1000);
  });
};

const updateService = (service: Service): Promise<Service> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(service);
    }, 1000);
  });
};

export const serviceApi = {
  addService,
  getServiceList,
  deleteService,
  updateService,
};
