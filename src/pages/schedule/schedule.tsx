import { Tabs } from "antd";
import { CreateEventModal, Calendar } from "../../features/schedule";
import { useState } from "react";

export const SchedulePage = () => {
  const [isOpenEventModal, setOpenEventModal] = useState(false);

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Календарь",
            children: <Calendar setOpenEventModal={setOpenEventModal} />,
          },
          {
            key: "2",
            label: "Список",
            children: "Будут события ввиде списка",
          },
        ]}
      />

      <CreateEventModal
        open={isOpenEventModal}
        closeModal={() => {
          setOpenEventModal(false);
        }}
        onSubmit={() => {}}
      />
    </div>
  );
};
