export type EventServer = {
  id: string;
  clientId: string;
  serviceId: string;
  desc?: string;
  start: string;
  end: string;
};

export type Event = {
  id: string;
  client: {
    label: string;
    value: string;
  };
  service: {
    label: string;
    value: string;
  };
  desc?: string;
  start: Date;
  end: Date;
};
