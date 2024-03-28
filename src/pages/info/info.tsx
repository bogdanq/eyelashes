import { Tabs } from "antd";
import { InfoImages, InfoText } from "../../features/info";

export const InfoPage = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Оттенки",
            children: <InfoText />,
          },
          {
            key: "2",
            label: "Изображения бровей",
            children: <InfoImages />,
          },
        ]}
      />
    </div>
  );
};
