import { createStore, createEffect, sample, createEvent } from "effector";
import { createGate } from "effector-react";
import { Event } from "./types";
import { calendarApi } from "./api";

export const eventsGate = createGate();

export const $events = createStore<Event[]>([]);

export const editOrUpdateEvent = createEvent<{
  event: Event;
  isEditMode: boolean;
}>();

export const getEventsListFx = createEffect<void, Event[], void>(() =>
  calendarApi.getEventsLis(),
);

export const createEventFx = createEffect<Event, Event, void>((event) =>
  calendarApi.createEvent(event),
);

export const editEventFx = createEffect<Event, Event, void>((event) =>
  calendarApi.editEvent(event),
);

export const deleteEventFx = createEffect<string, string, void>((eventId) =>
  calendarApi.deleteEvent(eventId),
);

sample({
  clock: editOrUpdateEvent,
  filter: (params) => params.isEditMode,
  target: editEventFx.prepend(
    (p: { event: Event; isEditMode: boolean }) => p.event,
  ),
});

sample({
  clock: editOrUpdateEvent,
  filter: (params) => params.isEditMode,
  target: createEventFx.prepend(
    (p: { event: Event; isEditMode: boolean }) => p.event,
  ),
});

$events
  .on(getEventsListFx.doneData, (_, events) => {
    return events;
  })
  .on(createEventFx.done, (events, { params }) => [...events, params])
  .on(editEventFx.done, (events, { params }) =>
    events.map((event) =>
      event.id === params.id ? { ...event, ...params } : event,
    ),
  )
  .on(deleteEventFx.done, (events, { params }) =>
    events.filter((event) => event.id !== params),
  );

sample({
  clock: eventsGate.open,
  target: getEventsListFx,
});
