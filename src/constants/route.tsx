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
    path: "/",
    title: "Главная",
    icon: <CalendarOutlined />,
  },
  price: {
    path: "/price",
    title: "Услуги",
    icon: <FileTextOutlined />,
  },
  clients: {
    path: "/clients",
    title: "Клиенты",
    icon: <TeamOutlined />,
  },
  statistics: {
    path: "/statistics",
    title: "Статистика",
    icon: <BarChartOutlined />,
  },
  info: {
    path: "/info",
    title: "Инфомация",
    icon: <InfoCircleOutlined />,
  },
  exist: {
    path: "/exist",
    title: "Выход",
    icon: <LogoutOutlined />,
  },
};

export const GuestRoutes = {
  login: {
    path: "/login",
    title: "Вход",
  },
};
