import { Tabs, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useUnit, useGate } from "effector-react";
import { combine } from "effector";
import {
  CreateEventModal,
  Calendar,
  $events,
  eventsGate,
  getEventsListFx,
  createEventFx,
  editEventFx,
  deleteEventFx,
  editOrUpdateEvent,
} from "../../features/schedule";

const $state = combine({
  events: $events,
  pendingGetList: getEventsListFx.pending,
  pendingCreateEvent: createEventFx.pending,
  pendingEditEvent: editEventFx.pending,
  pendingDeleteEvent: deleteEventFx.pending,
});

export const SchedulePage = () => {
  const [isOpenEventModal, setOpenEventModal] = useState<string | null>(null);

  const state = useUnit($state);

  useGate(eventsGate);

  useEffect(() => editEventFx.done.watch(() => setOpenEventModal(null)), []);
  useEffect(() => createEventFx.done.watch(() => setOpenEventModal(null)), []);
  useEffect(() => deleteEventFx.done.watch(() => setOpenEventModal(null)), []);

  const event = useMemo(
    () => state.events.find((event) => event.id === isOpenEventModal) || null,
    [isOpenEventModal, state.events],
  );

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Календарь",
            children: (
              <Spin spinning={state.pendingGetList}>
                <Calendar
                  setOpenEventModal={setOpenEventModal}
                  events={state.events}
                />
              </Spin>
            ),
          },
          {
            key: "2",
            label: "Список",
            children: "Будут события ввиде списка",
          },
        ]}
      />

      <CreateEventModal
        isLoading={state.pendingCreateEvent || state.pendingEditEvent}
        pendingDeleteEvent={state.pendingDeleteEvent}
        open={!!isOpenEventModal}
        event={event}
        deleteEvent={(id) => {
          deleteEventFx(id);
        }}
        onSubmit={(event, isEditingMode) => {
          editOrUpdateEvent({ event, isEditingMode });
        }}
        closeModal={() => {
          setOpenEventModal(null);
        }}
      />
    </div>
  );
};
