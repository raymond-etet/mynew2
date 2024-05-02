const fs = require("fs");
const path = require("path");

const rootDir = "/Users/raymond/Documents/next/next_v1";

// 创建 components 目录
const componentsDir = path.join(rootDir, "src/components");
fs.mkdirSync(componentsDir, { recursive: true });

// 创建 Layout 组件
const layoutComponentContent = `
import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default MainLayout;
`;
fs.writeFileSync(path.join(componentsDir, "Layout.tsx"), layoutComponentContent);

// 创建 utils 目录
const utilsDir = path.join(rootDir, "src/utils");
fs.mkdirSync(utilsDir, { recursive: true });

// 创建 auth.ts 工具文件
const authUtilContent = `
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth/login');
    }
  }, []);
};
`;
fs.writeFileSync(path.join(utilsDir, "auth.ts"), authUtilContent);

// 创建 404 页面
const notFoundPageContent = `
import React from 'react';
import { useAuthRedirect } from '@/utils/auth';

const NotFoundPage = () => {
  useAuthRedirect();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
`;
fs.writeFileSync(path.join(rootDir, "pages/404.tsx"), notFoundPageContent);

// 更新 _app.tsx
const appContent = `
import 'uno.css';
import '@/styles/global.css'; 
import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '../theme/themeConfig';
import MainLayout from '@/components/Layout';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </ConfigProvider>
);

export default App;
`;
fs.writeFileSync(path.join(rootDir, "pages/_app.tsx"), appContent);

// 更新 user/index.tsx
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
  const [openKeys, setOpenKeys] = useState(["1"]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useAuthRedirect();

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout>
      <Sider className="uno-w-300px uno-h-100vh uno-fixed uno-left-0 uno-bg-white">
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          className="uno-w-300px"
          items={items}
        />
      </Sider>
      <Content className="uno-ml-300px uno-p-24px">
        <h1>Welcome, {user.username}!</h1>
      </Content>
    </Layout>
  );
};

export default UserCenter;
`;
fs.writeFileSync(path.join(rootDir, "pages/user/index.tsx"), userIndexContent);

console.log("项目架构优化完成！");