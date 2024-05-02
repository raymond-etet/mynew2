const fs = require("fs");
const path = require("path");
const rootDir = "/Users/raymond/Documents/next/next_v1";

// 删除 MainLayout.tsx
fs.unlinkSync(path.join(rootDir, "src/components/Layout.tsx"));

// 修改 _app.tsx
const appContent = `
import 'uno.css';
import '@/styles/global.css';
import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '../theme/themeConfig';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
`;
fs.writeFileSync(path.join(rootDir, "pages/_app.tsx"), appContent);

// 修改 user/index.tsx
const userIndexContent = `
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useAuthRedirect } from '@/utils/auth';

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Profile", "1", <MailOutlined />, [
    getItem(<Link href="/user/profile">Profile</Link>, "1"),
  ]),
  getItem("Settings", "2", <AppstoreOutlined />, [
    getItem(<Link href="/user/settings">Settings</Link>, "2"),
  ]),
  getItem("Notifications", "3", <SettingOutlined />, [
    getItem(<Link href="/user/notifications">Notifications</Link>, "3"),
  ]),
];

const rootSubmenuKeys = ["1", "2", "3"];

const UserCenter = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useAuthRedirect();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <h1>Welcome, {user.username}!</h1>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserCenter;
`;
fs.writeFileSync(path.join(rootDir, "pages/user/index.tsx"), userIndexContent);

console.log("项目已更新完成。");
