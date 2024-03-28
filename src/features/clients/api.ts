import { Client } from "./types";

const addClient = (client: Client): Promise<Client> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(client);
    }, 1000);
  });
};

const getClientList = async (): Promise<Client[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Иванов иван иванович",
          phone: "8-900-590-44-36",
          visited: 10,
          canceled: 2,
          moved: 4,
          createdAt: new Date("03.26.2024").toDateString(),
        },
        {
          id: "1",
          name: "Иванов иван петрович",
          phone: "8-900-590-44-36",
          visited: 10,
          canceled: 2,
          moved: 4,
          createdAt: new Date("03.27.2024").toDateString(),
        },
        {
          id: "2",
          name: "Петров Андрей  2",
          phone: "8-900-590-44-36",
          visited: 10,
          canceled: 2,
          moved: 4,
          createdAt: new Date("03.28.2024").toDateString(),
        },
        {
          id: "3",
          name: "Сергеев Сергей",
          phone: "8-900-590-44-36",
          visited: 10,
          canceled: 2,
          moved: 4,
          createdAt: new Date("03.29.2024").toDateString(),
        },
        {
          id: "4",
          name: "Сидоров иван иванович 4",
          phone: "8-900-590-44-36",
          visited: 10,
          canceled: 2,
          moved: 4,
          createdAt: new Date("03.30.2024").toDateString(),
        },
      ]);
    }, 1000);
  });
};

const deleteClient = (id: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 1000);
  });
};

const updateClient = (client: Client): Promise<Client> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(client);
    }, 1000);
  });
};

export const clientApi = {
  addClient,
  getClientList,
  deleteClient,
  updateClient,
};
