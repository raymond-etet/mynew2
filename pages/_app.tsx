
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
