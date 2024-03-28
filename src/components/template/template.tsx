import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Routes } from "../../constants/route";
import styles from "./template.module.scss";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  to: string,
  icon?: React.ReactNode,
): MenuItem {
  return {
    key: to,
    icon: <Link to={to}>{icon}</Link>,
    label,
    title: "",
  } as MenuItem;
}

const items: MenuItem[] = Object.values(Routes).map((route) =>
  getItem(route.title, route.path, route.icon),
);

export const Template = () => {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          className={styles.menu}
          theme="light"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className={styles.header}
          style={{ borderRadius: borderRadiusLG }}
        >
          <div>{Routes[location.pathname.split("/")[1] || "home"]?.title}</div>
        </Header>

        <Content
          style={{
            margin: "0 5px",
            display: "flex",
            flexGrow: 1,
            maxHeight: "100%",
            overflowY: "hidden",
          }}
        >
          <div
            className={styles.container}
            style={{
              padding: 12,
              minHeight: 360,
              margin: "7px 0 5px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
