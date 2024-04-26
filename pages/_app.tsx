
import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '../theme/themeConfig';
import Login from './auth/login';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    {Component === Login ? <Login /> : <Component {...pageProps} />}
  </ConfigProvider>
);

export default App;