
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
