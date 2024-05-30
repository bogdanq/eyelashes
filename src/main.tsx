import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Template } from "./components";
import { Routes, GuestRoutes } from "./constants/route";
import {
  PricePage,
  StatisticsPage,
  ClientsPage,
  SchedulePage,
  LoginPage,
  InfoPage,
} from "./pages";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/eyelashes",
    element: <Template />,
    errorElement: <h1>404 page</h1>,
    children: [
      {
        path: Routes.home.path,
        element: <SchedulePage />,
      },
      {
        path: Routes.price.path,
        element: <PricePage />,
      },
      {
        path: Routes.clients.path,
        element: <ClientsPage />,
      },
      {
        path: Routes.statistics.path,
        element: <StatisticsPage />,
      },
      {
        path: Routes.info.path,
        element: <InfoPage />,
      },
    ],
  },
  {
    path: GuestRoutes.login.path,
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
);
