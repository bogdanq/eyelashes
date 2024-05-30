import { Event } from "./types";

const getEventsLis = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "2",
          client: {
            label: "name client 1",
            value: "1",
          },
          service: {
            label: "service  1",
            value: "1",
          },
          desc: "Big conference for important people",
          start: new Date(2024, 4, 23, 10, 30),
          end: new Date(2024, 4, 23, 12, 30),
        },
        {
          id: "14",
          client: {
            label: "name client 2",
            value: "2",
          },
          service: {
            label: "service  2",
            value: "2",
          },
          desc: "Big conference for important people",
          start: new Date(2024, 4, 23, 10, 30),
          end: new Date(2024, 4, 23, 11, 30),
        },
      ]);
    }, 1000);
  });
};

const createEvent = async (event: Event): Promise<Event> => {
  console.log("create api", event);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(event);
    }, 1000);
  });
};

const editEvent = async (event: Event): Promise<Event> => {
  console.log("edit api", event);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(event);
    }, 1000);
  });
};

const deleteEvent = async (eventId: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventId);
    }, 1000);
  });
};

export const calendarApi = {
  getEventsLis,
  createEvent,
  editEvent,
  deleteEvent,
};
