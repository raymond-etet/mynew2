
import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }:any) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default MainLayout;
