// /Users/raymond/Documents/next/next_v1/pages/user/index.tsx
import React from "react";
import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

const UserCenter = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Layout>
      {/* ... */}
      <Content style={{ padding: "24px" }}>
        <h1>Welcome, {user.username}!</h1>
        {/* ... */}
      </Content>
    </Layout>
  );
};
export default UserCenter;
