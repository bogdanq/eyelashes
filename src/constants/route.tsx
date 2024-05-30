import {
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export const Routes = {
  home: {
    path: "/eyelashes/",
    title: "Главная",
    icon: <CalendarOutlined />,
  },
  price: {
    path: "/eyelashes/price",
    title: "Услуги",
    icon: <FileTextOutlined />,
  },
  clients: {
    path: "/eyelashes/clients",
    title: "Клиенты",
    icon: <TeamOutlined />,
  },
  statistics: {
    path: "/eyelashes/statistics",
    title: "Статистика",
    icon: <BarChartOutlined />,
  },
  info: {
    path: "/eyelashes/info",
    title: "Инфомация",
    icon: <InfoCircleOutlined />,
  },
  exist: {
    path: "/eyelashes/exist",
    title: "Выход",
    icon: <LogoutOutlined />,
  },
};

export const GuestRoutes = {
  login: {
    path: "/eyelashes/login",
    title: "Вход",
  },
};
